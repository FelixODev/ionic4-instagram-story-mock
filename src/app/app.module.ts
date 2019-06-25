import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import { ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import 'web-photo-filter';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
//declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      // override hammerjs default configuration
      'pinch': { 
        enable: true,
        direction: Hammer.DIRECTION_ALL,
      }
  }

  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-x pan-y',
          inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
          recognizers: [
            [Hammer.Pinch, {
              enable: true,
              direction: Hammer.DIRECTION_ALL
            }]
          ]
    });
    mc.get('pinch').set({ enable: true });
    return mc;
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: MyHammerConfig 
    }
  ],
  bootstrap: [AppComponent],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
