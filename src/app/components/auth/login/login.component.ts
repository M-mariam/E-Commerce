import { Component, inject } from '@angular/core';
import { AlertComponent } from "../../../shared/ui/alert/alert.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AlertComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
 isLoading: boolean = false
 errorMessage: string = ""
 loginForm = new FormGroup({
   email: new FormControl(null,[Validators.required, Validators.email]),
   password: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
 })
 
 sendData=()=>{
   this.isLoading = true
   if(this.loginForm.valid){
     this._AuthService.logIn(this.loginForm.value).subscribe({
       next:(res)=>
         
         {
           if(res.message=="success"){
            localStorage.setItem('token',res.token)
            this._AuthService.saveUserData()
             this.isLoading = false
             this._Router.navigate(['/home'])
 
           }
       }, error:(err:HttpErrorResponse)=>{
        console.log(err.error.message)
        this.errorMessage = err.error.message
        this.isLoading = false
       }
     })
   }}
}
