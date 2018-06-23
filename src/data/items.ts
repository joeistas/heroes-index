import { Observable } from 'rxjs'

import { fetchJson } from "./base"
import { Params } from './params'
import { buildRealmVersionsApiUrl } from './versions'
import Item from '../models/Item'

export function buildItemApiUrl(params: Params, versionNumber: number, item: Item) {
  const path = [
    buildRealmVersionsApiUrl(params.realm, versionNumber),
    params.itemType,
    item.id.toLowerCase(),
    params.profile,
  ].join("/")

  return path
}

export function fetchItemJSON(params: Params, versionNumber: number, item: Item): Observable<any> {
  console.log('hello')
  console.log(buildItemApiUrl(params, versionNumber, item))
  return fetchJson(buildItemApiUrl(params, versionNumber, item))
}
