import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the BrandList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'brand-list',
  templateUrl: 'brand-list.html'
})
export class BrandListComponent {
  @Input() products: any;

  @Output()
  gotoProducts = new EventEmitter<any>();

  public brandsArray: any[] = [];
  public brandList = [];
  groupedBrands = [];
  searchTerm: any = '';
  constructor() { }

  ngOnInit() {
    this.products.map(k => this.brandsArray.push(k.categories[0].name));
    console.log(this.brandsArray);
    // var result = [];
    //this.brandsArray.forEach(function (item) {
    //   if (this.brandList.length === 0){
    //    this.brandList.push(item);
    // console.log(item)
    //   }
    // else if (this.brandList.indexOf(item) < 0){
    //  this.brandList.push(item);
    // }
    //});
    //   console.log(this.brandList);
    for (let i = 0; i < this.brandsArray.length; i++) {
      if (this.brandList.indexOf(this.brandsArray[i]) < 0) {
        this.brandList.push(this.brandsArray[i]);
      }
      console.log(this.brandList)
    }

    this.groupBrands(this.brandList);
  }

  groupBrands(brands) {

    let sortedContacts = brands.sort();
    let currentLetter = false;
    let currentContacts = [];

    sortedContacts.forEach((value, index) => {

      if (value.charAt(0) != currentLetter) {

        currentLetter = value.charAt(0);

        let newGroup = {
          letter: currentLetter,
          contacts: []
        };

        currentContacts = newGroup.contacts;
        this.groupedBrands.push(newGroup);

      }

      currentContacts.push(value);

    });

  }
}

