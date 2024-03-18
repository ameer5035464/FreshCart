import { Component, OnInit } from '@angular/core';
import { RegisterPostService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{

  constructor(private _RegisterPostService:RegisterPostService , private _CartService:CartService){}

  userIdOrders:any = this._RegisterPostService.saveUserData();
  userId:any = this._RegisterPostService.userData

  
  orders:any[] = [];  

  crtItems:object = {};
 
  speceficItem:number = 0;
  
  

  ngOnInit(): void {


    this._CartService.ordersDetails(this.userId.id).subscribe({
      next:(response)=>{
       
        this.orders = response
        this.crtItems = response
        this.speceficItem = this.orders.length-1
        console.log(this.speceficItem);
        
        console.log(this.orders);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
