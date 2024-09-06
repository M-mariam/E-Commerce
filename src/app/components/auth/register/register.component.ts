import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../../shared/ui/alert/alert.component";
import { NgClass } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 private readonly _AuthService = inject(AuthService)
 private readonly _Router = inject(Router)
isLoading: boolean = false
errorMessage: string = ""
register = new FormGroup({
  name: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
  email: new FormControl(null,[Validators.required, Validators.email]),
  password: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  rePassword: new FormControl(null),
},this.confirmPass)

confirmPass(g:AbstractControl){
  return g.get('password')?.value == g.get('rePassword')?.value ? null : {mismatch: true}
}
sendData=()=>{
  this.isLoading = true
  if(this.register.valid){
    this._AuthService.signUp(this.register.value).subscribe({
      next:(res)=>
        
        {
          if(res.message=="success"){
            this.isLoading = false
            this._Router.navigate(['/login'])

          }
      }, error:(err:HttpErrorResponse)=>{
       console.log(err.error.message)
       this.errorMessage = err.error.message
       this.isLoading = false
      }
    })
  }}
}
