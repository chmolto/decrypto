import { GeckoCoinMarketModel } from './../../../models/gecko-coin-market.model'
import { Component, OnInit } from '@angular/core'
import { ApiRequestsService as ApiGeckoService } from '../../../services/api-requests.service'
import { filter } from 'lodash'
import { GeckoCoinListModel } from 'src/app/models/gecko-coin-list.model'
import { debounceTime } from 'rxjs/operators'
import { fromEvent } from 'rxjs/internal/observable/fromEvent'

@Component({
  selector: 'dec-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  private allCoins: GeckoCoinListModel[] = []
  public searchedCoins: GeckoCoinMarketModel[] = []
  public showSearchList = true

  constructor(private apiGeckoService: ApiGeckoService) {
    this.apiGeckoService.getCoinsList().subscribe((coins: GeckoCoinListModel[]) => {
      this.allCoins = coins
      this.controlInputEvent()
    })
  }

  ngOnInit() {}

  public controlInputEvent() {
    const searchInput = document.getElementById('search-input')
    const keyup$ = fromEvent(searchInput, 'keyup')
    keyup$.pipe(debounceTime(200)).subscribe((event: any) => {
      const inputValue = event.target.value
      this.onUserSearch(inputValue)
    })
  }

  public onUserSearch(search) {
    if (search) {
      const coins = filter(this.allCoins, (coin: GeckoCoinListModel) => {
        const coinDataString = (coin.symbol + ' ' + coin.name).toLowerCase()
        return coinDataString.includes(search.toLowerCase())
      }).splice(0, 20)

      let ids = this.apiGeckoService.getIdsFromCoins(coins)
      if (ids === '') {
        ids = search
      }
      this.apiGeckoService.getCoinsListWithMarketData(1, ids).subscribe((coins: GeckoCoinMarketModel[]) => {
        this.searchedCoins = coins
        console.log(coins)
      })
    } else {
      this.searchedCoins = []
    }
  }
}
