import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { GeckoCoinListModel } from '../models/gecko-coin-list.model'

export const GECKO_BASEURL = 'https://api.coingecko.com/api/v3/'
export const GECKO_GET_COIN_MARKET_DATA = 'coins/markets'
export const GECKO_GET_COIN_LIST = 'coins/list'

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private httpClient: HttpClient) {}

  public getCoinsListWithMarketData(page?: number, ids?: string, vsCurrency?: string) {
    vsCurrency = vsCurrency ? vsCurrency : 'usd'
    page = page ? page : 1
    const maxQuantity = 100
    const order = 'market_cap_desc'
    let url =
      GECKO_BASEURL +
      GECKO_GET_COIN_MARKET_DATA +
      `?vs_currency=${vsCurrency}&order=${order}&per_page=${maxQuantity}&page=${page}&sparkline=false`

    if (ids !== undefined) {
      url = url.concat(`&ids=${ids}`)
    }

    return this.httpClient.get(url)
  }

  public getCoinsList() {
    const url = GECKO_BASEURL + GECKO_GET_COIN_LIST
    return this.httpClient.get(url)
  }

  public getIdsFromCoins(coins: GeckoCoinListModel[]) {
    let search = ''
    coins.forEach((coin, index) => {
      if (coin.id) {
        let coinId = coin.id
        if (coins.length !== index + 1) {
          coinId = coinId.concat(',')
        }
        search = search.concat(coinId)
      }
    })
    return search
  }
}
