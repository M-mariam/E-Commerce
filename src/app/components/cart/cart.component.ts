import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
 private readonly _CartService = inject(CartService)
  cartItems:any
  productList: any[] | null= []
  ngOnInit():void{
  this.getCartProduct()

 }
 getCartProduct= ()=>{
   this._CartService.getCart().subscribe({
    next:(res)=>{
      this._CartService.cartItemNumber.next(res.numOfCartItems)
      this.cartItems = res.data
      this.productList = res.data.products
      console.log(res.data)
    },
    error:(err)=>{
      console.log(err)
    }
   })
 }
 updateCart =(productId:string,count:number)=>{
  this._CartService.updateCart(productId,count).subscribe({
  next: (res)=>{
    this._CartService.cartItemNumber.next(res.numOfCartItems)
    this.cartItems = res.data
    this.productList = res.data.products
  }
  })
 }
 removeproduct =(productId:string)=>{
  this._CartService.removeItem(productId).subscribe({
    next:(res)=>{
      this._CartService.cartItemNumber.next(res.numOfCartItems)
      this.cartItems = res.data
      this.productList = res.data.products
    },
  })
 }
 clearCartItems = ()=>{
  this._CartService.clearCart().subscribe({
    next:(res)=>{
      this._CartService.cartItemNumber.next(res.numOfCartItems)
     if(res.message == `success`){
      this.cartItems =  ' '
      this.productList = null
     }
    },
  })
 }
}
