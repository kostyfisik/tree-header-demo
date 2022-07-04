<script setup lang="ts">
import type { TablePrint } from '../TreeTools'
const props = defineProps<{
  table: TablePrint
}>()

// console.log(props.table)
</script>

<template>
  <div>
    <tr v-for="(row, index1) in props.table.data" :key="index1">
      <td
        v-for="(cell, index2) in row"
        :key="index2"
        :style="`background-color: ${cell.color};`"
      >
        <span v-for="(val, key) in cell" :key="key">
          <span v-if="key !== 'color'">
            {{ key }}: {{ val }}
          </span>
          <span v-if="key === 's' || key === 'v'"><br></span>
          <span v-if="key === 'x' || key === 'h'">&nbsp;</span>
        </span>
      </td>
    </tr>
    <!-- test table print -->
  </div>
</template>

<style>
table, th, td {
  border: 2px solid gray;
  color: black;
  background-color: white;
  padding: 10px;
  margin-left: 20px;
}
</style>
