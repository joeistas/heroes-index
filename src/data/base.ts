import { Observable, from } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import FetchError from '../models/FetchError'

export const BASE_API_URL = "https://sxvwd05sl0.execute-api.us-west-2.amazonaws.com/dev/"
export const BASE_ASSET_URL = "https://s3-us-west-2.amazonaws.com/istastech.heroesindex.assets"

export function buildApiUrl(path: string): string {
  return BASE_API_URL + path
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
