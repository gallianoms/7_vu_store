import { Product } from '@/app/core/interfaces/product/product.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() product:Product | undefined;
@Output() addToCartEvent = new EventEmitter<Product>();

addToCart() {
  this.addToCartEvent.emit();
}
}
