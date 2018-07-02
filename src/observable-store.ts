import Vue, { VueConstructor } from 'vue'
import { Observable, merge, combineLatest, empty } from 'rxjs'
import { map, scan, shareReplay, share, filter, debounceTime, startWith, pluck } from 'rxjs/operators'

declare module "vue/types/vue" {
  interface Vue {
    $store: Observable<Store>
    $storeErrors: Observable<Error>
  }
}

export type Store = { [key: string]: any }
export type ObservableStore = Observable<Store>
export type ObservableErrors = Observable<Error>
export type Observables = { [key: string]: Observable<any> }

export interface Mutation {
  key: string
  generator: MutationGenerator
  mutators?: string[]
}

export type MutationGenerator = (observable: Observable<any>) => Observable<any>

export interface ObservableStoreInstallOptions {
  store: ObservableStore,
  errors: ObservableErrors
}

export function install(_Vue: VueConstructor<Vue>, options: ObservableStoreInstallOptions) {
  _Vue.mixin({
    beforeCreate: function() {
      (this as any)._store = options.store;
      (this as any)._storeErrors = options.errors;
    }
  })

  Object.defineProperty(_Vue.prototype, '$store', {
    get: function() {
      return this._store
    }
  })

  Object.defineProperty(_Vue.prototype, '$storeErrors', {
    get: function() {
      return this._storeErrors
    }
  })
}

export function buildStore(mutations: Mutation[], initialData: { [key: string]: any } = {}): ObservableStoreInstallOptions {
  const observables: Observables = {}
  const errors: Observable<Error>[] = []

  for(const mutation of mutations) {
    const observable$ = toObjectObserables<any>(mutation, observables)

    observables[mutation.key] = toStoreObservable(observable$)
    errors.push(toErrorObservable(observable$))
  }

  const store$ = merge(
    ...Object.values(observables)
  ).pipe(
    scan((store, change) => {
      return {
        ...store,
        ...change,
      }
    }, initialData),
    startWith(initialData),
    share(),
  )

  const errors$ = merge(...errors).pipe(share())

  return {
    store: store$,
    errors: errors$,
  }
}

function buildMutationObservable(observables: Observables, keys: string[]) {
  if(keys.length === 0) {
    return empty()
  }

  if(keys.length === 1) {
    const key = keys[0]
    return observables[key].pipe(pluck(key))
  }

  return combineLatest(
    ...keys.map(key => {
      return observables[key].pipe(pluck(key))
    })
  ).pipe(debounceTime(1))
}

function toObjectObserables<T>(mutation: Mutation, observables: Observables): Observable<{ [key: string]: T } | Error> {
  return mutation.generator(buildMutationObservable(observables, mutation.mutators || [])).pipe(
    map(value => {
      return value instanceof Error ? value : { [mutation.key]: value }
    }),
    share(),
  )
}

function toStoreObservable(observable$: Observable<any>) {
  return observable$.pipe(
    filter(value => !(value instanceof Error)),
    shareReplay(1),
  )
}

function toErrorObservable(observable$: Observable<any>): Observable<Error> {
  return observable$.pipe(
    filter(value => value instanceof Error)
  )
}
