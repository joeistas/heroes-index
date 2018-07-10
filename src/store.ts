import VueRouter, { Route } from 'vue-router'
import { Observable, concat, of } from 'rxjs'
import {
  pluck,
  map,
  switchMap,
  delay,
  catchError
} from 'rxjs/operators'

import { buildStore, Mutation } from './observable-store'
import { fetchVersion, fetchAllVersions } from "./data/versions"
import { Params, RealmType, sanitizeParams } from "./data/params"
import { fetchItemJSON } from "./data/items"
import Version from "./models/Version"
import VersionDetail from "./models/VersionDetail"
import Item from "./models/Item"
import NotFoundError from "./models/NotFoundError"

export function createStore(router: VueRouter) {
  return buildStore(mutations(router))
}

function mutations(router: VueRouter): Mutation[] {
  const route$ = createRouteObservable(router)

  return [
    paramsMutation(route$),
    allVersionsMutation(),
    versionsMutation(),
    selectedVersionMutation(),
    versionDetailsMutation(),
    selectedItemMutation(),
    selectedItemJSONMutation(),
  ]
}

function paramsMutation(route$: Observable<Route>): Mutation {
  return {
    key: 'params',
    mutator: (): Observable<Params> => {
      return route$.pipe(
        pluck('params'),
        map(params => {
          try {
            return sanitizeParams(params)
          }
          catch(error) {
            return error
          }
        }),
        delay(100)
      )
    }
  }
}

function createRouteObservable(router: VueRouter): Observable<Route> {
  return new Observable(observer => {
    const handler = (to: any) => observer.next(to)

    router.onReady(() => handler(router.currentRoute))
    router.afterEach(handler)
  })
}

function allVersionsMutation(): Mutation {
  return {
    key: 'allVersions',
    mutator: () => {
      return fetchAllVersions().pipe(
        catchError(error => of(error))
      )
    }
  }
}

function versionsMutation(): Mutation {
  return {
    key: 'versions',
    mutator: (observable$: Observable<[ Params, Observable<{ [realm: string]: Version[] }> ]>): Observable<Version[]> => {
      return observable$.pipe(
        map(([ params, allVersions ]) => [ params.realm, allVersions ]),
        map(([ realm, allVersions ]: [ RealmType, { [realm: string]: Version[] } ]) => allVersions[realm]),
      )
    },
    dependencies: [
      'params',
      'allVersions'
    ]
  }
}

function selectedVersionMutation(): Mutation {
  return {
    key: 'selectedVersion',
    mutator: (observable$: Observable<[ Params, Version[] ]>): Observable<Version | Error> => {
      return observable$.pipe(
        map(([ params, versions ]) => [ params.version, versions ] as [ number, Version[] ]),
        map(([ buildNumber, versions ]) => {
          if(buildNumber) {
            const version = versions.find(version => version.buildNumber === buildNumber)
            if(!version) {
              return new NotFoundError(`Version ${ buildNumber } was not found`, 'version')
            }

            return version
          }

          return versions[0]
        }),
      )
    },
    dependencies: [
      'params',
      'versions',
    ]
  }
}

function versionDetailsMutation(): Mutation {
  return {
    key: 'versionDetails',
    mutator: (observable$: Observable<Version>): Observable<VersionDetail> => {
      return observable$.pipe(
        map(version => [ version.buildNumber, version.realm ]),
        switchMap(([ buildNumber, realm ]) => concat(
          of(null),
          fetchVersion(realm as string, buildNumber).pipe(
            map(details => {
              const sortByName = (a: Item, b: Item) => {
                return a.name < b.name ? -1 :
                  a.name > b.name ? 1 : 0
              }
              details.heroes.sort(sortByName)
              details.mounts.sort(sortByName)
              return details
            }),
            catchError(error => of(error))
          )
        )),
      )
    },
    dependencies: [
      'selectedVersion',
    ]
  }
}

function selectedItemMutation(): Mutation {
  return {
    key: 'selectedItem',
    mutator: (observable$: Observable<[ Params, VersionDetail ]>): Observable<Item | Error> => {
      return observable$.pipe(
        map(([ params, versionDetail ]) => {
          if(versionDetail === null) {
            return null
          }

          const itemType = params.itemType
          const itemId = params.itemId
          let items: Item[] = itemType === 'heroes' ? versionDetail.heroes : versionDetail.mounts

          if(itemId) {
            const item = items.find(i => i.id.toLowerCase() === itemId)
            if(!item) {
              return new NotFoundError(`Item ${ itemType }:${ itemId } does not exist`, 'itemId')
            }
            return item
          }

          return items[0]
        }),
      )
    },
    dependencies: [
      'params',
      'versionDetails',
    ]
  }
}

function selectedItemJSONMutation(): Mutation {
  return {
    key: 'itemJSON',
    mutator: (observable$: Observable<[ Params, Version, Item ]>): Observable<any> => {
      return observable$.pipe(
        switchMap(([ params, selectedVersion, selectedItem ]) => {
          if(selectedVersion === null || selectedItem === null) {
            return of(null)
          }

          return concat(
            of(null),
            fetchItemJSON(params, selectedVersion.buildNumber, selectedItem).pipe(
              catchError(error => of(error)),
            )
          )
        })
      )
    },
    dependencies: [
      'params',
      'selectedVersion',
      'selectedItem',
    ]
  }
}
