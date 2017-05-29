import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductService } from '../providers/product-service';

// NGRX
import { reducer } from '../ngrx/reducers/index';
import { StoreModule } from '@ngrx/store';
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
  ProductDetailPage,
  TabsPage,
  Payment 
} from '../pages';


@NgModule({
  declarations: [
    MyApp,
    // pages
    BrandPage,
    CartPage,
    CheckoutPage,
    HomePage,
    ProductAllPage,
    ProductDetailPage,
    TabsPage,
    Payment,
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
    IonicModule.forRoot(MyApp, { tabsPlacement: 'top', tabsHideOnSubPages: true }),
    StoreModule.provideStore(reducer),
    EffectsModule.run(ShopEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BrandPage,
    CartPage,
    CheckoutPage,
    HomePage,
    ProductAllPage,
    ProductDetailPage,
    Payment
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductService
  ]
})
export class AppModule { }
