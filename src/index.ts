type PickByValue<T, K = keyof any> = Pick<
  T,
  {
    [P in keyof T]: T[P] extends K ? P : never
  }[keyof T]
>

type TreeObject<T> = T & { children?: TreeObject<T>[] }

export default class Utils {
  public static mergeArrays<T extends Record<string, any>>(
    key: keyof PickByValue<T, string | number>,
    ...arrs: T[][]
  ): T[] {
    const map: Map<keyof T, T> = new Map()
    for (const arr of arrs) {
      for (let item of arr) {
        if (map.has(item[key])) item = { ...map.get(item[key]), ...item }
        map.set(item[key], item)
      }
    }
    return [...map.values()]
  }

  public static arrToTree<T>(
    arr: T[],
    key: keyof PickByValue<T>,
    parantKey: keyof PickByValue<T>,
  ): TreeObject<T>[] {
    const map: Map<keyof PickByValue<T>, TreeObject<T>> = new Map()
    const res = []
    for (const item of arr) {
      map.set(item[key], item)
    }
    arr.forEach((item) => {
      const parentItem = map.get(item[parantKey])
      if (parentItem) {
        if (parentItem.children) {
          parentItem.children.push(item)
        } else {
          parentItem.children = [item]
        }
      } else {
        res.push(map.get(item[key]))
      }
    })
    return res
  }
}