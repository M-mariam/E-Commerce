import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from "../../shared/ui/alert/alert.component";

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
   cartId: string = ""
   isLoading: boolean = false

private readonly _formbuilder = inject(FormBuilder)
private readonly _OrderService = inject (OrderService)
private readonly _Route = inject (ActivatedRoute)
address:FormGroup = this._formbuilder.group({
  details: [null],
  phone: [null],
  city: [null]
})

payment=()=>{
  this.isLoading = true
  this._OrderService.checkOutSession(this.cartId, this.address.value).subscribe({
    next:(res)=>{
      window.location.href = res.session.url
      console.log(res)
    }
  })
}
ngOnInit(): void{
this._Route.paramMap.subscribe({
  next:(params) =>{
    this.cartId = params.get('id')!
  }
})
}
}
