import { Observable } from 'rxjs'
import { pluck, map } from 'rxjs/operators'
import { Route } from 'vue-router'

export function paramObservable(route$: Observable<Route>, param: string) {
  return route$.pipe(pluck('params', param))
}

export function realmObservable(route$: Observable<Route>) {
  return paramObservable(route$, 'realm').pipe(
    map(realm => realm === 'ptr' ? 'ptr' : 'live'),
  )
}

export function gameItemObservable(route$: Observable<Route>) {
  return paramObservable(route$, 'item').pipe(
    map(item => item === 'mounts' ? 'mounts' : 'heroes'),
  )
}
