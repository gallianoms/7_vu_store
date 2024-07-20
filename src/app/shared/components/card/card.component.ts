import { Product } from '@/app/core/interfaces/product/product.interface';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() product?:Product;
@Output() addToCartEvent = new EventEmitter<Product>();
@Input() isDetailView: boolean = false;

private router = inject(Router);

addToCart() {
  this.addToCartEvent.emit();
}

goToDetails(): void {
  if (this.product) {
    this.router.navigate(['/products', this.product.id]);
  }
}
}
