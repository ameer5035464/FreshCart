import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPostService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _RegisterPostService:RegisterPostService , private _Router:Router){}

  errmsg:string='';

  spinnerstatus:boolean = false;

  registerForm:FormGroup = new FormGroup({

    name: new FormControl(null , Validators.required),
    email: new FormControl(null , [Validators.required, Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
    rePassword: new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
    phone: new FormControl(null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  subform():void{
    // console.log(this.registerForm);
    this.spinnerstatus=true;

    
    if (this.registerForm.valid) {
      this._RegisterPostService.postForm(this.registerForm.value).subscribe({

        next:(response)=>{
          this.spinnerstatus = false;
          console.log(response);
          if(response.message == 'success'){
            this._Router.navigate(['/login'])
          }
        },

        error:(err:HttpErrorResponse)=>{
          this.spinnerstatus = false;
          
          if(err.error.message=="fail"){
            this.errmsg='enter valid data';
            
          }
          else
          this.errmsg=err.error.message;
        }

      })
      
    }
      
    
    else{
      this.spinnerstatus=false;
      this.registerForm.markAllAsTouched();
    }
    
    
  }

}
