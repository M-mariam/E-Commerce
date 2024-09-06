import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/interfaces/products';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor( private token:AuthService, private _productServices: ProductsService,
    private _cartServices: CartService, private _toaster: ToastrService,
    private _WishlistService: WishlistService,
  ){
  this.token.saveUserData()
  }
  allProducts:Product[]=[]
  getProducts= ()=>{
    this._productServices.getAllProducts().subscribe({
      next:(res)=>{
        this.allProducts = res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  addproduct = (productId:string)=>{
    this._cartServices.addToCart(productId).subscribe({
      next:(res)=>{
        console.log(res)
        this._toaster.success(res.message)
      }
    })
  }
  addWishlist = (productId:string)=>{
    this._WishlistService.addToWishList(productId).subscribe({
      next:(res)=>{
        console.log(res)
        this._toaster.success(res.message)
      }
    })
  }
  ngOnInit(): void {
    this.getProducts()
  }
}
