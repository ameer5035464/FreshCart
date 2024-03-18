import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { RegisterPostService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(private _RegisterPostService:RegisterPostService, private toastr: ToastrService,private _Router:Router){}

  enterEmail:FormGroup  = new FormGroup({

    email: new FormControl(null)

  })


  sendVerify(){
    this._RegisterPostService.postForgetPass(this.enterEmail.value).subscribe({
      next:(response)=>{
        
        this.toastr.show('check your Email')

        this._Router.navigate(['/resetCode'])
        

      }
    })
  }
}
