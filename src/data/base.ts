import { Observable, from } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import FetchError from '../models/FetchError'

export const BASE_API_URL = process.env.NODE_ENV === 'production' ?
  "https://api.heroesindex.com/v1" : "https://j23w5y612a.execute-api.us-east-1.amazonaws.com/dev/v1"

export const BASE_ASSET_URL = process.env.NODE_ENV === 'production' ?
  "https://assets.heroesindex.com" : "https://s3.amazonaws.com/istastech.heroesindex.assets.dev"

export function buildApiUrl(path: string): string {
  return [ BASE_API_URL, path ].join("/")
}

export function buildAssetUrl(assetPath: string, versionNumber: number | string) {
  assetPath = assetPath.replace(".dds", ".png")
  return [ BASE_ASSET_URL, versionNumber, assetPath ].join("/")
}

export function fetchJson(path: string): Observable<any> {
  return from(fetch(path)).pipe(
    map(response => {
      if(response.ok) {
        return response
      }

      throw new FetchError(response)
    }),
    mergeMap(response => response.json())
  )
}
