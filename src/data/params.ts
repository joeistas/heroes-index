import NotFoundError from '../models/NotFoundError'

export type RealmType = 'live' | 'ptr'
export type ItemType = 'mounts' | 'heroes'
export type ProfileType = 'basic' | 'detailed' | 'skins' | 'vo'

export interface Params {
  realm: RealmType
  version: number
  itemType: ItemType
  itemId: string
  profile: ProfileType
}

export function sanitizeParams(params: any): Params {
  return {
    realm: validateEnumParam('realm', params['realm'], [ 'live', 'ptr' ], 'live'),
    version: paramToNumber(params['version']) || null,
    itemType: validateEnumParam('item', params['item'], [ 'mounts', 'heroes' ], 'heroes'),
    itemId: params['itemId'] ? params['itemId'].toLowerCase() : null,
    profile: validateEnumParam('profile', params['profile'], [ 'basic', 'detailed', 'skins', 'vo' ], 'basic')
  }
}

function validateEnumParam<T>(name: string, value: T, allowedValues: T[], defaultValue: T): T {
  if(!value) {
    return defaultValue
  }

  if(!allowedValues.includes(value)) {
    throw new NotFoundError(`Invalid param value ${ value } one of ${ allowedValues.join(', ') }`, name)
  }

  return value
}

function paramToNumber(version: string): number {
  if(version) {
    return parseInt(version)
  }

  return undefined
}
