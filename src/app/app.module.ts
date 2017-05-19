import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';

import { ContactPage } from '../pages/contact/contact';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductService } from '../providers/product-service';

// NGRX
import { reducer } from '../ngrx/reducers/index';
import { cartReducer } from '../ngrx/reducers/cart';
import { productsReducer } from '../ngrx/reducers/products';
import { StoreModule, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { localStorageSync } from 'ngrx-store-localstorage';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ShopEffects } from '../ngrx/effects/shop';

import { BrandListComponent,
  CartButtonComponent,
  CartListComponent,
  ProductItemComponent,
  ProductShowComponent,
  ProductSlideComponent,
  ScrollableTabs } from '../components';


import { BrandPage,
  CartPage,
  CheckoutPage,
  HomePage,
  ProductAllPage,
  ProductDetailPage } from '../pages';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,

    TabsPage,

    // pages
    BrandPage,
    CartPage,
    CheckoutPage,
    HomePage,
    ProductAllPage,
    ProductDetailPage,


    // components
    BrandListComponent,
    CartButtonComponent,
    CartListComponent,
    ProductItemComponent,
    ProductShowComponent,
    ProductSlideComponent,
    ScrollableTabs
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { tabsPlacement: 'top' }),
    StoreModule.provideStore(reducer),
    EffectsModule.run(ShopEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    BrandPage,
    CartPage,
    CheckoutPage,
    HomePage,
    ProductAllPage,
    ProductDetailPage



  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductService
  ]
})
export class AppModule { }
