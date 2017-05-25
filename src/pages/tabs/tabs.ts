import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage, ProductAllPage } from '../../pages';
// import { ScrollableTabs } from '../../components/scrollable-tabs/scrollable-tabs';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeRoot = HomePage;
  productAllRoot = ProductAllPage;
  scrollableTabsopts: any = {};
  constructor(public navParams: NavParams) {
  }

    refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };    
  }
}
