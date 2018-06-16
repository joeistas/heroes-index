import { Observable, from } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import FetchError from '../models/FetchError'

export const BASE_API_URL = "https://sxvwd05sl0.execute-api.us-west-2.amazonaws.com/dev/"

export function buildApiUrl(path: string): string {
  return BASE_API_URL + path
}

export function buildAssetUrl(assetPath: string, versionNumber: number | string, realm: 'ptr' | 'live' = 'live') {
  assetPath = assetPath.replace(".dds", ".png")
  return buildApiUrl([ realm, versionNumber, 'assets', assetPath ].join('/'))
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
