import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { Product } from '@/app/core/interfaces/product/product.interface';
import { GenericService } from '@/app/core/services/generic.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  
  private allProducts: Product[] = [];
  private productSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productSubject.asObservable();
  filteredProducts$: Observable<Product[]> = this.products$;
  categories: string[] = [];
  
  private genericService = inject(GenericService);
  private http = inject(HttpClient);
  private route = inject(Router);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.genericService.getAll('products').subscribe((products: Product[]) => {
      this.allProducts = products;
      this.productSubject.next(this.allProducts);
      this.updateCategories(this.allProducts);
    });
  }

  updateCategories(products: Product[]) {
    this.categories = ['All', ...this.getUniqueCategories(products)];
  }

  handleEditProduct(product: Product) {
    this.route.navigate(['products/edit', product.id]); 
  }

  handleDeleteProduct(product: Product) {
    this.http.delete(`https://api.escuelajs.co/api/v1/products/${product.id}`)
      .subscribe(() => {
        this.allProducts = this.allProducts.filter(p => p.id !== product.id);
        this.productSubject.next(this.allProducts);
        this.updateCategories(this.allProducts);
      });
  }

  handleAddToCart(productId: number) {
    console.log(`Product with id ${productId} added to cart.`);
  }

  handleSearch(term: string): void {
    this.filteredProducts$ = this.products$.pipe(
      map(products => products.filter(product => 
        product.title?.toLowerCase().includes(term.toLowerCase())
      ))
    );
  }

  getUniqueCategories(products: Product[]): string[] {
    const categories = products.map(product => product.category?.name).filter((category, index, self) => category && self.indexOf(category) === index);
    return categories;
  }

  handleCategorySelection(category: string): void {
    if (category === 'All') {
      this.filteredProducts$ = this.products$;
    } else {
      this.filteredProducts$ = this.products$.pipe(
        map(products => products.filter(product => 
          product.category?.name === category
        ))
      );
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
