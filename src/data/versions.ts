import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import { buildApiUrl, fetchJson } from "./base"
import Version from '../models/Version'
import VersionDetail from '../models/VersionDetail'

const REALMS = [ 'live', 'ptr' ]

export function buildRealmVersionsApiUrl(realm: string, versionNumber?: number | string) {
  let path = realm
  if(versionNumber) {
    path += "/" + versionNumber
  }
  return buildApiUrl(path)
}

export function convertVersionFromJSON(version: any): Version {
  version.releaseDate = new Date(version.releaseDate)
  return version
}

export function fetchVersions(realm: string): Observable<[ string, Version[] ]> {
  return fetchJson(buildRealmVersionsApiUrl(realm)).pipe(
    map(json => [ realm, json.versions ] as [ string, Version[] ])
  )
}


export function fetchAllVersions(): Observable<{ [realm: string]: Version[] }> {
  return combineLatest(REALMS.map(realm => fetchVersions(realm))).pipe(
    map(versionData => {
      return versionData.reduce((result, [ realm, versions ]) => {
        result[realm] = versions.map(convertVersionFromJSON)
        return result
      }, {} as { [realm: string]: Version[] })
    })
  )
}

export function fetchVersion(realm: string, versionNumber: number | string): Observable<VersionDetail> {
  return fetchJson(buildRealmVersionsApiUrl(realm, versionNumber))
}
