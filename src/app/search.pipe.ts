import { Pipe, PipeTransform } from '@angular/core';
import { Products } from 'src/app/shared/interfaces/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Products[] , term:string): Products[] {
    return products.filter((product)=>
      product.title.toLowerCase().includes(term.toLowerCase()));
  }

}
