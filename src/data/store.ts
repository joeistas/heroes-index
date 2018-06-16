import Vue from 'vue'
import { Route } from 'vue-router'
import { Observable, combineLatest } from 'rxjs'
import { pluck, map, share, shareReplay, startWith, switchMap, tap } from 'rxjs/operators'

import Version from '../models/Version'
import VersionDetail from '../models/VersionDetail'
import Hero from '../models/Hero'
import Mount from '../models/Mount'
import { fetchAllVersions, fetchVersion } from './versions'

export type RealmType = 'live' | 'ptr'
export type ItemType = 'mounts' | 'heroes'
export type ProfileType = 'basic' | 'detailed' | 'skins' | 'vo'

export function store() {
  const route$: Observable<Route> = this.$watchAsObservable('$route', { immediate: true }).pipe(pluck("newValue"), shareReplay(1))

  const realm$ = realmObservable(route$)
  const versionNumber$ = paramObservable(route$, 'version')
  const itemType$ = gameItemObservable(route$)
  const itemId$ = paramObservable(route$, 'itemId')

  const versions$: Observable<Version[]> = combineLatest(realm$, fetchAllVersions().pipe(share())).pipe(
    map(([ realm, allVersions ]) => allVersions[realm]),
    shareReplay(1),
  )

  const selectedVersion$: Observable<Version> = combineLatest(versionNumber$, versions$).pipe(
    map(([ versionNumber, versions ]) => {
      if(versionNumber) {
        return versions.find(version => version.buildNumber.toString() === versionNumber)
      }

      return versions[0]
    }),
    startWith({} as Version),
    shareReplay(1),
  )

  const selectedVersionNumber$: Observable<number> = selectedVersion$.pipe(pluck("buildNumber"))

  const versionDetails$: Observable<VersionDetail> = combineLatest(selectedVersionNumber$, realm$).pipe(
    switchMap(([ versionNumber, realm ]) => fetchVersion(realm, versionNumber)),
    share()
  )

  const heroes$: Observable<Hero[]> = versionDetails$.pipe(pluck('heroes'), shareReplay(1)) as Observable<Hero[]>
  const mounts$: Observable<Mount[]> = versionDetails$.pipe(pluck('mounts'), shareReplay(1)) as Observable<Mount[]>

  const selectedHero$: Observable<Hero> = combineLatest(heroes$, itemType$, itemId$).pipe(
    map(([ heroes, itemType, itemId ]) => {
      if(itemType !== "heroes") {
        return null
      }

      if(itemId) {
        return heroes.find(hero => hero.id === itemId) || heroes[0]
      }

      return heroes[0]
    }),
    startWith({} as Hero),
    shareReplay(1),
  )

  const selectedMount$: Observable<Mount> = combineLatest(mounts$, itemType$, itemId$).pipe(
    map(([ mounts, itemType, itemId ]) => {
      if(itemType !== "mounts") {
        return null
      }

      if(itemId) {
        return mounts.find(hero => hero.id === itemId)
      }

      return mounts[0]
    }),
    startWith({} as Mount),
    shareReplay(1),
  )

  return {
    route$,
    realm$,
    itemType$,
    versions$,
    selectedVersion$,
    heroes$,
    selectedHero$,
    mounts$,
    selectedMount$,
  }
}

export function getStoreObservable(vm: Vue, key: string) {
  return vm.$root.$observables[key]
}

export function paramObservable(route$: Observable<Route>, param: string): Observable<string> {
  return route$.pipe(pluck('params', param))
}

export function realmObservable(route$: Observable<Route>): Observable<RealmType> {
  return paramObservable(route$, 'realm').pipe(
    map(realm => realm === 'ptr' ? 'ptr' : 'live'),
  )
}

export function gameItemObservable(route$: Observable<Route>): Observable<ItemType> {
  return paramObservable(route$, 'item').pipe(
    map(item => item === 'mounts' ? 'mounts' : 'heroes'),
  )
}

export function profileObservable(route$: Observable<Route>): Observable<ProfileType> {
  return paramObservable(route$, 'profile').pipe(
    map((profile: ProfileType) => !!profile ? profile : 'basic'),
  )
}
