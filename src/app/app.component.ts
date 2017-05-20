import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage,
  BrandPage,
  CartPage,
  TabsPage,
ProductAllPage } from '../pages';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any }>;
  rootPage: any = TabsPage;
  
  private homePage;
  private brandPage;
  private cartPage;
  private productPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  

    this.brandPage = BrandPage;
    this.homePage = HomePage;
    this.cartPage = CartPage;
    this.productPage = ProductAllPage;

  }
  openPage(p) {
    this.rootPage = p;
  }
  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }
  showSubmenu: boolean = false;

}

