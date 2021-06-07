import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StarsCanvasComponent } from './stars-canvas/stars-canvas.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, reducer2 } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    StarsCanvasComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducer2, {
      metaReducers
    }),
    StoreModule.forFeature('test', reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
