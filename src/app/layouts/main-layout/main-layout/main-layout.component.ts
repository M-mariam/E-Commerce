import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CartService } from '../../../core/services/cart.service';
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private readonly _cartService = inject(CartService)
  cartNumber:any
 ngOnInit(): void {
   this._cartService.cartItemNumber.subscribe({
     next:(res) =>{
     this.cartNumber = res
     }
   })
}

}
