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
    realm: validateEnumParam(params['realm'], [ 'live', 'ptr' ], 'live'),
    version: paramToNumber(params['version']),
    itemType: validateEnumParam(params['item'], [ 'mounts', 'heroes' ], 'heroes'),
    itemId: params['itemId'] ? params['itemId'].toLowerCase() : undefined,
    profile: validateEnumParam(params['profile'], [ 'basic', 'detailed', 'skins', 'vo' ], 'basic')
  }
}

function validateEnumParam<T>(value: T, allowedValues: T[], defaultValue: T): T {
  if(!value) {
    return defaultValue
  }

  if(!allowedValues.includes(value)) {
    //TODO make custom error for error handling
    throw new Error(`Invalid param value ${ value } one of ${ allowedValues.join(', ') }`)
  }

  return value
}

function paramToNumber(version: string): number {
  if(version) {
    return parseInt(version)
  }

  return undefined
}
