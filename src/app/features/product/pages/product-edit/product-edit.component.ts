import { Category } from '@/app/core/interfaces/product/category.interface';
import { Product } from '@/app/core/interfaces/product/product.interface';
import { GenericService } from '@/app/core/services/generic.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {

  editForm: FormGroup;
  productId: number;
  categories: Category[] = [];

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private genericService = inject(GenericService);
  private router = inject(Router);

  constructor() {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.productId = 0;
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.genericService.getOne('products/', this.productId).subscribe((product: Product) => {
      this.editForm.patchValue({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category.id
      });
    });
    this.loadCategories();
  }

  loadCategories(): void {
    this.genericService.getAll('categories').subscribe((categories : Category[]) => {
      this.categories = categories;
    });
  }
  onSubmit(): void {
    if (this.editForm.valid) {
      const categoryId = Number(this.editForm.value.category); 
      console.log('Selected Category ID:', categoryId);

      console.log('Categories Array:', this.categories);  

      const selectedCategory = this.categories.find(category => {
        console.log(`Checking category: ${category.id} (${typeof category.id}) === ${categoryId} (${typeof categoryId})`);
        return category.id === categoryId;
      });

      console.log('Selected Category:', selectedCategory);

      if (!selectedCategory) {
        console.error(`Category with id ${categoryId} not found`);
        return;
      }

      const updatedProduct = {
        title: this.editForm.value.title,
        price: this.editForm.value.price,
        description: this.editForm.value.description,
        category: {
          id: selectedCategory.id,
          name: selectedCategory.name
        }
      };

      console.log('Updated Product:', updatedProduct);
      this.genericService.update('products/', this.productId, updatedProduct).subscribe(() => {
        this.router.navigate(['products']);
      });
    }
  }

}