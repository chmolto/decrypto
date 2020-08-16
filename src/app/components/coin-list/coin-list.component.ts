import { Component } from '@angular/core'
import { GeckoCoinMarketModel } from 'src/app/models/gecko-coin-market.model'
import { ApiRequestsService } from '../../services/api-requests.service'

@Component({
  selector: 'dec-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent {
  public coins: GeckoCoinMarketModel[] = []

  constructor(private apiRequestsService: ApiRequestsService) {
    this.apiRequestsService.getCoinsListWithMarketData(1).subscribe((coins: GeckoCoinMarketModel[]) => {
      this.coins = coins
    })
  }
}
