import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPostService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {


  constructor(private _RegisterPostService:RegisterPostService , private _FormBuilder:FormBuilder , private _Router:Router){}

  resetPass:FormGroup = this._FormBuilder.group({
    email:[''],
    newPassword:['']
  })

  resetPassword(){
    this._RegisterPostService.putResetPassword(this.resetPass.value).subscribe({
      next:(response)=>{
        
        this._Router.navigate(['/login'])
        
      }
    })
  }
}
