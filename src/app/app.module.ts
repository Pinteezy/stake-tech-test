import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { API_BASE_URL } from './core/tokens/api-base-url.token';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: API_BASE_URL, useValue: 'https://jsonplaceholder.typicode.com' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
