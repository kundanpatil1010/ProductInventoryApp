import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  model: Product = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  saveProduct(): void {
    if (this.model.productId === 0) {
      this.productService.add(this.model).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    } else if (this.model.productId !== undefined) {
      this.productService.update(this.model.productId, this.model).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    }
  }

  editProduct(product: Product): void {
    this.model = { ...product };
  }

deleteProduct(product: Product): void {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to delete "${product.name}" permanently?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productService.delete(product.productId).subscribe(() => {
        this.loadProducts();
        Swal.fire('Deleted!', `"${product.name}" has been deleted.`, 'success');
      });
    }
  });
}


  resetForm(): void {
    this.model = {
      productId: 0,
      name: '',
      description: '',
      price: 0,
      quantity: 0
    };
  }
}
