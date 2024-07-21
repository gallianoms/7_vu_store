import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product-button',
  templateUrl: './create-product-button.component.html',
  styleUrl: './create-product-button.component.scss'
})
export class CreateProductButtonComponent {

  private router = inject(Router);

  redirectToCreateProduct() {
    this.router.navigate(['/products/create']);
  }
}
