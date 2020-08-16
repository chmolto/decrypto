import { CoinListComponent } from './components/coin-list/coin-list.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: 'list', component: CoinListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: CoinListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
