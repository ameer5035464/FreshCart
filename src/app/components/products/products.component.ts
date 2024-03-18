import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/shared/interfaces/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetProductsService } from 'src/app/shared/services/get-products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private _GetProductsService:GetProductsService , private _CartService:CartService , private toastr: ToastrService){}

  searchPipe:string = '';

  cartData:any = {};


  productDisplay:Products[] = [];

  catDisplay:any[] = [];

  addToCart(id:string):void{
    this._CartService.addCart(id).subscribe({
      next:(response)=>{
        this.cartData = response;
        this._CartService.numCartItems.next(response.numOfCartItems)
          this.toastr.success('Product added successfully to your cart', 'success');
        
      }
    })
  }

  ngOnInit():void{

    this._GetProductsService.getAllProducts().subscribe({
      next:(response)=>{
        
        this.productDisplay = response.data;
      }
    })

    this._GetProductsService.getCategoties().subscribe({
      next:(response)=>{
        this.catDisplay = response.data;
      }
    })
  }
}
