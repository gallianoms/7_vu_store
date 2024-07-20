import { Product } from '@/app/core/interfaces/product/product.interface';
import { GenericService } from '@/app/core/services/generic.service';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product?: Product;
  private subscription: Subscription = new Subscription();

  private route = inject(ActivatedRoute);
  private genericService = inject(GenericService);

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const productSubscription = this.genericService.getOne('products/', productId).subscribe((product: Product) => {
        this.product = product;
      });
      this.subscription.add(productSubscription);
    }
  }
  handleAddToCart(productId: number) {
    console.log(`Product with id ${productId} added to cart.`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
