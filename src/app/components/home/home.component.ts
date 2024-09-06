import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Product } from '../../core/interfaces/products';
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategoriesSliderComponent } from "../categories-slider/categories-slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProductsService } from '../../core/services/product.service';
import { NgClass } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSliderComponent, CategoriesSliderComponent, RouterLink, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  cartNumber:any

constructor( private token:AuthService, private _productServices: ProductsService,
  private _cartServices: CartService, private _toaster: ToastrService,
  private _WishlistService: WishlistService, private _NgxSpinnerService: NgxSpinnerService
 
)

{
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
addToWishList = (productId:string)=>{
  this._WishlistService.addToWishList(productId).subscribe({
    next:(res)=>{
      console.log(res)
      this._toaster.success(res.message)
    }
  })
}
ngOnInit(): void {
  this.getProducts()
  this._cartServices.cartItemNumber.subscribe({
    next:(res) =>{
    this.cartNumber = res
    

    }
  })
}

}
