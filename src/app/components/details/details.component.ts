import { CartService } from 'src/app/shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/shared/interfaces/products';
import { GetProductsService } from 'src/app/shared/services/get-products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute , private _GetProductsService:GetProductsService , private _CartService:CartService ,  private toastr: ToastrService){}

  showProduct:Products = {} as Products;
  
  addToCart(id:string):void{
    this._CartService.addCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._CartService.numCartItems.next(response.numOfCartItems)
        this.toastr.success('Product added successfully to your cart', 'success');
      }
    })
  }

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
         let idProduct=param.get('id')
         this._GetProductsService.getSpecificProduct(idProduct).subscribe({
          next:(respose)=>{
            console.log(respose);
            this.showProduct = respose.data
          }
         })
        }
      })
  }
}
