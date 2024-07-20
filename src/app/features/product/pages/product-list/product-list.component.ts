import { Product } from '@/app/core/interfaces/product/product.interface';
import { GenericService } from '@/app/core/services/generic.service';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

private genericService = inject(GenericService);
products$!: Observable<Product[]>
filteredProducts$: Observable<Product[]> | undefined;

ngOnInit(): void {
  this.products$ = this.genericService.getAll('products');
  this.filteredProducts$ = this.products$;
}

handleAddToCart(productId: number) {
  console.log(`Product with id ${productId} added to cart.`);
}

handleSearch(term: string): void {
  this.filteredProducts$ = this.products$.pipe(
    map(products => products.filter(product => 
      product.category?.name?.toLowerCase().includes(term.toLowerCase())
    ))
  );
}

trackByProductId(index: number, product: any): number {
  return product.id;
}

}
