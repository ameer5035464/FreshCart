import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from 'src/app/shared/interfaces/products';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetProductsService } from 'src/app/shared/services/get-products.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private _GetProductsService:GetProductsService , private _CartService:CartService , private toastr: ToastrService){}

  searchPipe:string = '';

  cartData:any = {};

  staticOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:6000,
    autoplayHoverPause:false,
    dots: false,
    navSpeed: 700,
    navText : ["",""],
    items : 1,
    nav: true
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    margin:.5,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:false,
    dots: false,
    navSpeed: 700,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

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
