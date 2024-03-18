import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterPostService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-number',
  templateUrl: './reset-number.component.html',
  styleUrls: ['./reset-number.component.css']
})
export class ResetNumberComponent {

  constructor(private _RegisterPostService:RegisterPostService , private _FormBuilder:FormBuilder , private _ToastrService:ToastrService , private _Router:Router){}

  verifyResetCode:FormGroup = new FormGroup({
    resetCode: new FormControl(null)
  })

  goToReset(){

    this._RegisterPostService.postVerifyResetCode(this.verifyResetCode.value).subscribe({
      next:(response)=>{
        console.log(response);
        
        if(response.status == 'Success'){
          this._Router.navigate(['/resetPassword'])
        }
        
      },
      error:(err)=>{
        
          this._ToastrService.error('reset code not correct')
        
      }

      
    })
  }
    

}
