<script setup lang="ts">
/* eslint-disable no-console */
import type { TreeNode } from '../TreeTools'
import {
  ColumnAddLeft,
  ConvertTreeToTable,
  TableAddMissingCells,
  ToPrint, isRowNeeded,
} from '../TreeTools'

const initTree: TreeNode = {
  VerticalSpan: 1,
  Color: 'White',
  Value: 'Table',
  Children: [
    {
      VerticalSpan: 1,
      Color: 'Orange',
      Value: '1',
      Children: [
        {
          VerticalSpan: 1,
          Color: 'Green',
          Value: '4',
          Children: [{ VerticalSpan: 1, Color: 'Purple', Value: '7', Children: [] }],
        },
        {
          VerticalSpan: 1,
          Color: 'Green',
          Value: '5',
          Children: [{ VerticalSpan: 1, Color: 'Purple', Value: '8', Children: [] }],
        },
      ],
    },
    {
      VerticalSpan: 1,
      Color: 'Orange',
      Value: '2',
      Children: [{ VerticalSpan: 2, Color: 'Green', Value: '6', Children: [] }],
    },
    {
      VerticalSpan: 2,
      Color: 'Orange',
      Value: '3',
      Children: [
        { VerticalSpan: 1, Color: 'Purple', Value: '9', Children: [] },
        { VerticalSpan: 1, Color: 'Purple', Value: '10', Children: [] },
      ],
    },
  ],
}

const table = ConvertTreeToTable(initTree)
TableAddMissingCells(table)
// ColumnAddLeft(table, 0)
console.log('after all', table.data)

// console.log(table)
</script>

<template>
  <div><ShowTable :table="ToPrint(table)" /></div>

  is row needed = {{ isRowNeeded(table) }}
</template>

<route lang="yaml">
meta:
  layout: home
</route>
