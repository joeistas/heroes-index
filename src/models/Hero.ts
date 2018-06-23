import Item from './Item'

export default interface Hero extends Item {
  icon: string
  role: string
  universe: string
  title: string
  description: string
}
