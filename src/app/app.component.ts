import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
templateUrl: './app.component.html',

  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  model = {
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  saveProduct() {
    this.productService.add(this.model).subscribe(() => {
      this.model = { name: '', description: '', price: 0, quantity: 0 };
      this.loadProducts();
    });
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
