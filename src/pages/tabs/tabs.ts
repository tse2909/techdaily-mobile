import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProductAllPage } from '../product-all/product-all';
import { ScrollableTabs } from '../../components/scrollable-tabs/scrollable-tabs';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  productAllRoot = ProductAllPage;
  scrollableTabsopts: any = {};
  constructor(public navParams: NavParams) {
    
  }

    refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };    
  }
}
