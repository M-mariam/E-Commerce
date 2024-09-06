import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CartService } from '../../core/services/cart.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly _cartService = inject(CartService)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

   cartNumber:any
  ngOnInit(): void {
    initFlowbite();
    this._cartService.cartItemNumber.subscribe({
      next:(res) =>{
      this.cartNumber = res
      }
    })
}
logout(){
  localStorage.removeItem('token')
  this._Router.navigate(['/login'])
  this._AuthService.userData.next(null)
}
}