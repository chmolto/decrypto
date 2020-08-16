import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { CoinListComponent } from './components/coin-list/coin-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavbarComponent } from './components/navbar/navbar.component'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { SearchInputComponent } from './components/micro-comps/search-input/search-input.component'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  declarations: [AppComponent, CoinListComponent, NavbarComponent, SearchInputComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, NgxSkeletonLoaderModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
