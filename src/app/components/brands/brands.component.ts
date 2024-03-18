import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/shared/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{


  constructor(private _BrandsService:BrandsService){}

  allBrands:any = [];

ngOnInit(): void {
    
  this._BrandsService.getAllBrands().subscribe({
    next:(response)=>{
      this.allBrands = response.data
    }
  })
}

}
