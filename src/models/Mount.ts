import Item from './Item'

export default interface Mount extends Item {
  description: string
  rarity: string
  category: string
}
