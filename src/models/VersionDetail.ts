import Version from './Version'
import Hero from './Hero'
import Mount from './Mount'

export default interface VersionDetail extends Version {
  heroes: Hero[]
  mounts: Mount[]
}
