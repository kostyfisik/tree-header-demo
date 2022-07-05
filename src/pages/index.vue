<script setup lang="ts">
import {
  AddNodeCol,
  AddSpanForRow,
  ConvertTreeToTable,
  ToPrint,
} from '../TreeTools'
import { initTree } from '../initTree'
import type { TreeNode } from '../TreeTools'

Object.freeze(initTree)
// const updatedTree = ref(initTree)

const table = ConvertTreeToTable(initTree)
const isAddCol = ref(true)
const isAddRow = ref(true)
const isBefore = ref(true)
const col = ref(0)
const row = ref(2)

function newTree(initTree: TreeNode) {
  if (isAddRow.value && isAddCol.value) {
    const newT = AddSpanForRow(initTree, row.value)
    return AddNodeCol(newT, col.value, isBefore.value)

    // // also works
    // const newT = AddNodeBeforeCol(initTree, col.value, isBefore.value)
    // return AddSpanForRow(newT, row.value)
  }

  if (isAddCol.value)
    return AddNodeCol(initTree, col.value, isBefore.value)

  if (isAddRow.value)
    return AddSpanForRow(initTree, row.value)

  return initTree
}
const newT = ref(newTree(initTree))
watch([col, isAddCol, row, isAddRow, isBefore], () => {
  newT.value = newTree(initTree)
})
</script>

<template>
  <ShowTable :table="ToPrint(table)" />
  <AddControls
    v-model:isAddCol="isAddCol" v-model:isAddRow="isAddRow"
    v-model:col="col" v-model:row="row"
    v-model:isBefore="isBefore"
    :max-col="table.data[0].length - 1"
    :max-row="table.data.length - 1"
  />
  <!-- <ShowTable :table="ToPrint(ConvertTreeToTable(newTree(initTree)))" /> -->
  <ShowTable :table="ToPrint(ConvertTreeToTable(newT))" />
  <!-- <ShowTable :table="ToPrint(ConvertTreeToTable(newT2))" /> -->
  <div>
    <pre class="text-left">
{{ JSON.stringify(newT, null, 2) }}
    </pre>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
