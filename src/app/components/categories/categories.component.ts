import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private _CategoriesService:CategoriesService){}

  categoryItems:any = [];

  ngOnInit(): void {
      
    this._CategoriesService.getAllCategoury().subscribe({
      next:(response)=>{
        this.categoryItems = response.data
      }
    })
  }

}
