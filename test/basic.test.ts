import { describe, expect, it } from 'vitest'
import {
  AddNodeCol,
  AddSpanForRow,
} from '../src/TreeTools'
import { initTree } from '../src/initTree'
// import type { TreeNode } from '../src/TreeTools'

Object.freeze(initTree)

describe('tests', () => {
  it('should work', () => {
    const withCol = AddNodeCol(initTree, 0, true)
    expect(initTree.Children[1]).toBe(withCol.Children[1])
    expect(initTree.Children[2]).toBe(withCol.Children[2])
    expect(initTree.Children[1] === withCol.Children[1]).toBe(true)
    expect(initTree.Children[0] === withCol.Children[0]).toBe(false)

    const withColAfter = AddNodeCol(initTree, 0, false)
    expect(initTree.Children[1]).toBe(withColAfter.Children[1])
    expect(initTree.Children[2]).toBe(withColAfter.Children[2])
    expect(initTree.Children[1] === withColAfter.Children[1]).toBe(true)
    expect(initTree.Children[0] === withColAfter.Children[0]).toBe(false)

    const withRow = AddSpanForRow(initTree, 0)
    for (let i = 0; i < initTree.Children.length; i++)
      expect(initTree.Children[i]).toBe(withRow.Children[i])
    expect(initTree.Children[1] === withRow.Children[1]).toBe(true)
    expect(initTree === withRow).toBe(false)
  })
})
