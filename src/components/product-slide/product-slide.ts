import { Component, Input, Output, EventEmitter  } from '@angular/core';

/*
  Generated class for the ProductSlide component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-slide',
  templateUrl: 'product-slide.html'
})
export class ProductSlideComponent {
  @Input() products: any;
  @Input() title: any;
  @Input() filter: any;

  @Output()
  gotoDetails = new EventEmitter<any>();

  @Output()
  gotoProducts = new EventEmitter<any>();

  sortedProducts: any;
  constructor() { }

  ngOnInit() {
    console.log(this.title);
    // this.sortedProducts = this.products.sort(function (a, b) {
    //   return a.total_sales - b.total_sales;
    // });
    // console.log(this.sortProduct);
    // console.log(this.products)
  }

  ngOnChanges() {
    if (this.filter === 'HOT') {
      this.sortedProducts = this.products.sort(function (a, b) {
        return b.total_sales - a.total_sales
      })
    } else if (this.filter === 'NEW') {
      this.sortedProducts = this.products.sort(function (a, b) {
        return b.id - a.id
      })
    }
  }
}
