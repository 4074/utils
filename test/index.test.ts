import Utils from '../src'

interface obj {
  id: number,
  name: string,
  parentId: number
}

describe('mergeArrays', () => {
  it('should merge two arrays', () => {
    const input = [
      { id: 1, name: '效率产品组', parentId: 2 },
      { id: 2, name: '数据挖掘部', parentId: 0 },
      { id: 3, name: '数据产品组', parentId: 2 },
      { id: 4, name: '综合设计部', parentId: 0 },
    ]
    const merged = Utils.arrToTree<obj>(input, "id", "parentId")
    expect(merged.length).toEqual(2)
  })
})