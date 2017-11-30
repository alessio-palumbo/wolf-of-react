import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
})

export function loadQuoteForStock(symbol) {
  return api.get(`/stock/${symbol}/quote`)
    .then(res => res.data)
}

export function loadCompanyLogo(symbol) {
  return api.get(`/stock/${symbol}/logo`)
    .then(res => res.data.url)
}

export function loadNews(symbol) {
  return api.get(`/stock/${symbol}/news/last`) //${range}
    .then(res => res.data)
}

export function loadSixMonths(symbol) {
  return api.get(`/stock/${symbol}/chart/6m`)
    .then(res => res.data)
}

