import VueRouter, { Route } from 'vue-router'
import { Observable, combineLatest } from 'rxjs'
import { pluck, map, share, shareReplay, startWith, switchMap, tap, distinctUntilChanged } from 'rxjs/operators'

import { buildStore, Observables } from './observable-store'
import { fetchVersion, fetchAllVersions } from "./data/versions"
import { Params, sanitizeParams } from "./data/params"
import { fetchItemJSON } from "./data/items"
import Version from "./models/Version"
import VersionDetail from "./models/VersionDetail"
import Item from "./models/Item"

export function createStore(router: VueRouter) {
  return buildStore(observables(router))
}

function observables(router: VueRouter): Observables {
  const route$ = createRouteObservable(router)
  const params$ = paramsObservable(route$)

  const versions$ = versionsObservable(params$)
  const selectedVersion$ = selectedVersionObservable(params$, versions$)

  const versionDetails$ = versionDetailsObservable(params$, selectedVersion$)
  const selectedItem$ = selectedItemObservable(params$, versionDetails$)
  return {
    params: params$,
    versions: versions$,
    selectedVersion: selectedVersion$,
    versionDetails: versionDetails$,
    selectedItem: selectedItem$,
    itemJSON: selectedItemJSONObservable(params$, selectedVersion$, selectedItem$)
  }
}

function paramsObservable(route$: Observable<Route>): Observable<Params> {
  return route$.pipe(
    pluck('params'),
    map(sanitizeParams),
    shareReplay(1)
  )
}

function createRouteObservable(router: VueRouter): Observable<Route> {
  return new Observable(observer => {
    const handler = (to: any) => observer.next(to)

    router.onReady(() => handler(router.currentRoute))
    router.afterEach(handler)
  })
}

function versionsObservable(params$: Observable<Params>): Observable<Version[]> {
  return combineLatest(params$.pipe(pluck('realm'), distinctUntilChanged<string>()), fetchAllVersions().pipe(share())).pipe(
    map(([ realm, allVersions ]) => allVersions[realm]),
    shareReplay(1),
  )
}

function selectedVersionObservable(params$: Observable<Params>, versions$: Observable<Version[]>): Observable<Version> {
  return combineLatest(params$.pipe(pluck('version'), distinctUntilChanged<number>()), versions$).pipe(
    map(([ versionNumber, versions ]) => {
      if(versionNumber) {
        const version = versions.find(version => version.buildNumber === versionNumber)
        if(!version) {
          //TODO custom error for detailed error handling
          throw new Error(`Version ${ versionNumber } does not exist`)
        }

        return version
      }

      return versions[0]
    }),
    startWith({} as Version),
    shareReplay(1),
  )
}

function versionDetailsObservable(params$: Observable<Params>, selectedVersion$: Observable<Version>): Observable<VersionDetail> {
  return combineLatest(
      selectedVersion$.pipe(pluck('buildNumber')),
      params$.pipe(pluck('realm'), distinctUntilChanged<string>())
    ).pipe(
      switchMap(([ versionNumber, realm ]) => fetchVersion(realm as string, versionNumber)),
      share(),
    )
}

function selectedItemObservable(params$: Observable<Params>, versionDetails$: Observable<VersionDetail>): Observable<Item> {
  return combineLatest(params$, versionDetails$).pipe(
    map(([ params, versionDetail ]) => {
      const itemType = params.itemType
      const itemId = params.itemId
      let items: Item[] = itemType === 'heroes' ? versionDetail.heroes : versionDetail.mounts

      if(itemId) {
        const item = items.find(i => i.id.toLowerCase() === itemId)
        if(!item) {
          //TODO custom error for detailed error handling
          throw new Error(`Item ${ itemType }:${ itemId } does not exist`)
        }
        return item
      }

      return items[0]
    }),
  )
}


function selectedItemJSONObservable(params$: Observable<Params>, selectedVersion$: Observable<Version>, selectedItem$: Observable<Item>): Observable<any> {
  return combineLatest(params$, selectedVersion$, selectedItem$).pipe(
    switchMap(([ params, selectedVersion, selectedItem ]) => {
      return fetchItemJSON(params, selectedVersion.buildNumber, selectedItem).pipe(tap(value => console.log('json', value)))
    })
  )
}
