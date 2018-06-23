import Vue, { VueConstructor } from 'vue'
import { Observable, merge } from 'rxjs'
import { map, scan, shareReplay } from 'rxjs/operators'

export type Store = { [key: string]: any }
export type ObservableStore = Observable<Store>
export type Observables = { [key: string]: Observable<any> }

export interface ObservableStoreInstallOptions {
  store: ObservableStore
}

export function install(_Vue: VueConstructor<Vue>, options: ObservableStoreInstallOptions) {
  _Vue.mixin({
    beforeCreate: function() {
      (this as any)._store = options.store
    }
  })

  Object.defineProperty(_Vue.prototype, '$store', {
    get: function() {
      return this._store
    }
  })
}

export function buildStore(observables: Observables, initialData: { [key: string]: any } = {}): Observable<Store> {
  return merge(
    ...Object.entries(observables).map(([ key, observable ]) => toObjectObserable(key, observable))
  ).pipe(
    scan((store, change) => {
      return {
        ...store,
        ...change,
      }
    }, initialData),
    shareReplay(1)
  )
}

function toObjectObserable<T>(key: string, observable: Observable<T>): Observable<{ [key: string]: T }> {
  return observable.pipe(map(value => { return { [key]: value } }))
}
