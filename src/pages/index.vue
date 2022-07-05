<script setup lang="ts">
import { cloneDeep } from 'lodash'
import {
  AddNodeBeforeCol,
  ConvertTreeToTable,
  ToPrint,
} from '../TreeTools'
import { initTree } from '../initTree'
import type { TreeNode } from './TreeTools'

const updatedTree = ref(initTree)

const table = ConvertTreeToTable(initTree)
const isAddCol = ref(true)
const isAddRow = ref(true)
const col = ref(0)
const row = ref(0)

function newTree(initTree: TreeNode) {
  const copy = cloneDeep(initTree)
  if (isAddCol.value)
    return AddNodeBeforeCol(copy, col.value)
  //   if (isAddCol.value)
  //     return AddNodeBeforeCol(initTree, col.value)
  return initTree
}
</script>

<template>
  <ShowTable :table="ToPrint(table)" />
  <AddControls
    v-model:isAddCol="isAddCol" v-model:isAddRow="isAddRow"
    v-model:col="col" v-model:row="row"
    :max-col="table.data[0].length - 1"
    :max-row="table.data.length - 1"
  />
  <ShowTable :table="ToPrint(ConvertTreeToTable(newTree(initTree)))" />
  <div>
    <pre class="text-left">
{{ JSON.stringify(updatedTree, null, 2) }}
    </pre>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
