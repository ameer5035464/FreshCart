import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPostService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  

  constructor(private _RegisterPostService:RegisterPostService , private _Router:Router){}

  spanstatus:boolean = false;

  errmsg:string= '';

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)])
  })

  handleForm():void{

    
if (this.loginForm.valid) {
  this.spanstatus =true;

  this._RegisterPostService.postLog(this.loginForm.value).subscribe({
    next:(response)=>{
      this.spanstatus=false;
      if(response.message=='success'){

        localStorage.setItem('eToken',response.token);

        this._RegisterPostService.saveUserData();

        this._Router.navigate(['/home'])
      }
    },
    error:(err:HttpErrorResponse)=>{
      this.spanstatus=false;
     if(err.error.message=='fail'){
      this.errmsg='Incorrect email or password';
     }
     else
      this.errmsg = err.error.message;
      
    }
  })
  
}

else{
  this.loginForm.markAllAsTouched();
}
    

  
}
}
