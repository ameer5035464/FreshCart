import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegisterPostService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent {

  constructor(private _RegisterPostService:RegisterPostService , private _CartService:CartService){}

  crtItems:number = 0;

  hoverIt:string = '';

  shakedIcon(){
    
  }

  ngOnInit(): void {

    this._CartService.numCartItems.subscribe({
      next:(data)=>{
        this.crtItems = data
      }
    })

    this._CartService.getCart().subscribe({
      next:(response)=>{
        this._CartService.numCartItems.next(response.numOfCartItems)
      }
    })

    this._CartService.deleteCartItem

}

  logOut(){
    this._RegisterPostService.signOut();
  }

}
