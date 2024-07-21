import { Category } from '@/app/core/interfaces/product/category.interface';
import { GenericService } from '@/app/core/services/generic.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {

  createForm: FormGroup;
  categories: Category[] = [];
  
  private fb = inject(FormBuilder);
  private genericService = inject(GenericService);
  private router = inject(Router);

  constructor() {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.genericService.getAll('categories').subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log('Loaded Categories:', this.categories);
    });
  }
  onSubmit(): void {
    if (this.createForm.valid) {
      const categoryId = parseInt(this.createForm.value.category, 10);
      const newProduct = {
        title: this.createForm.value.title,
        price: this.createForm.value.price,
        description: this.createForm.value.description,
        categoryId: categoryId,
        images: [this.createForm.value.image]
      };

      console.log('New Product:', newProduct);

      this.genericService.create('products', newProduct).subscribe(
        response => {
          console.log('Product created successfully:', response);
          this.router.navigate(['products']);
        },
        error => {
          console.error('Error creating product:', error);
        }
      );
    }
  }
}
