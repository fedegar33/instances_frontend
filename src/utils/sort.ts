import { InstanceSizes, InstanceStates } from '../services/instancesService'

export type Order = 'asc' | 'desc'

export function getComparator(order: Order, orderBy: string): (a: any, b: any) => number {
  function comparatorFn(a: any, b: any, orderBy: string) {
    if (orderBy === 'state') {
      return stateComparator(a.state, b.state)
    } else if (orderBy === 'size') {
      return sizeComparator(a.size, b.size)
    }
    return descendingComparator(a, b, orderBy)
  }

  return order === 'desc'
    ? (a, b) => comparatorFn(a, b, orderBy)
    : (a, b) => -comparatorFn(a, b, orderBy)
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stateComparator(a: InstanceStates, b: InstanceStates): number {
  const statePriority = Object.values(InstanceStates).reverse()
  let aIndex = statePriority.findIndex(state => a === state)
  let bIndex = statePriority.findIndex(state => b === state)

  return aIndex - bIndex
}

function sizeComparator(a: InstanceSizes, b: InstanceSizes): number {
  const sizePriority = ['XS', 'S', 'M', 'L', 'XL'].reverse()
  let aIndex = sizePriority.findIndex(size => a === size)
  let bIndex = sizePriority.findIndex(size => b === size)

  return aIndex - bIndex
}
