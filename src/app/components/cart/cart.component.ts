import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private _CartService:CartService ,  private toastr: ToastrService , private _FormBuilder:FormBuilder){}

  cartItems:any = {};
  cartId:any = '';

  checkoutForm:FormGroup = this._FormBuilder.group({
    details:[''],
    phone:[''],
    city:['']
  });

  checoutCart(){

    this._CartService.checkout(this.cartId,this.checkoutForm.value).subscribe({
      next:(response)=>{
      window.open(response.session.url , '_self')        
      }
    })

  }

  updateItem(id:string , count:number){
    if (count > 0) {
      this._CartService.updateCart(id,count).subscribe({
        next:(response)=>{
          
          this.cartItems = response
          this.toastr.success('Product Updated');
        }
      })
    }
  }

  removeItem(id:string){
    this._CartService.deleteCartItem(id).subscribe({
      next:(response)=>{
       this.cartItems = response 
        this._CartService.numCartItems.next(response.numOfCartItems)
       this.toastr.error('Product Removed');

      }
    })
  }
  
  ngOnInit(): void {

      this._CartService.getCart().subscribe({
        next:(response)=>{
          // console.log(response);
          // console.log(response.data._id);
          this.cartId = response.data._id;
          this.cartItems = response;
        }
      })

  }






}