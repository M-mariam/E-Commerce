import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private readonly _WishListService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _toaster = inject(ToastrService)
  productList: any[] = []
  ngOnInit():void{
    
      this._WishListService.getWishlist().subscribe({
       next:(res)=>{
        this._WishListService.wishListNumber.next(res.count)
         this.productList = res.data
         console.log(res.data)
       },
       error:(err)=>{
         console.log(err)
       }
      })
     
   }


   removeproduct =(productId:string)=>{
    this._WishListService.removeItem(productId).subscribe({
      next:(res)=>{
        console.log(res)
        this._toaster.success(res.message)
      },
    })
   }
}
