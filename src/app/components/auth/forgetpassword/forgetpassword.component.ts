import { Component, inject } from '@angular/core';
import { AlertComponent } from "../../../shared/ui/alert/alert.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [AlertComponent, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetPasswordComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  private readonly _FormBuilder = inject(FormBuilder)
 isLoading: boolean = false
 errorMessage: string = ""
 steps: any = 1
 forgetPassword: FormGroup = this._FormBuilder.group ({
  email:  [null,[Validators.required, Validators.email]],
})
 verifyResetCode: FormGroup= this._FormBuilder.group ({
  resetCode:  [null,[Validators.required]],
})
resetPassword: FormGroup = this._FormBuilder.group ({
   email:  [null,[Validators.required, Validators.email]],
   newPassword:  [null,[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
})
 
submitStep1=()=>{
  this.isLoading = true
  if(this.forgetPassword.valid){
   let email = this.forgetPassword.get('email')?.value
   this.resetPassword.get('email')?.setValue(email)
    this._AuthService.forgetPassword(this.forgetPassword.value).subscribe({
      next:(res)=>

        {
         this.steps = 2
         localStorage.setItem('currentStep', this.steps.toString())
         localStorage.setItem('currentEmail', email)
         this.isLoading = false
      }, error:(err:HttpErrorResponse)=>{
       console.log(err.error.message)
       this.errorMessage = err.error.message
       this.isLoading = false
      }
    })
  }}
submitStep2=()=>{
    this.isLoading = true
    if(this.verifyResetCode.valid){
      this._AuthService.verifyCode(this.verifyResetCode.value).subscribe({
        next:(res)=>
          
          {
           this.steps = 3
           localStorage.setItem('currentStep', this.steps.toString())
           this.isLoading = false
        }, error:(err:HttpErrorResponse)=>{
         console.log(err.error.message)
         this.errorMessage = err.error.message
         this.isLoading = false
        }
      })
    }}

    submitStep3=()=>{
      this.isLoading = true
      if(this.resetPassword.valid){
        this._AuthService.resetPassword(this.resetPassword.value).subscribe({
          next:(res)=>
            
            {
              localStorage.setItem('token',res.token)
              this._AuthService.saveUserData()
               this.isLoading = false
               this._Router.navigate(['/home'])
          }, error:(err:HttpErrorResponse)=>{
           console.log(err.error.message)
           this.errorMessage = err.error.message
           this.isLoading = false
          }
        })
      }
    }
      ngOnInit(): void{
        this.steps = localStorage.getItem('currentStep') || 1
        this.resetPassword.get('email')?.setValue(localStorage.getItem('currentEmail'))

      }
}



