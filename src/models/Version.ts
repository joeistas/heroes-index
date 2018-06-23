export default interface Version {
  buildNumber: number
  realm: 'ptr' | 'live'
  name: string
  versionNumber: string
  releaseDate: Date
}
