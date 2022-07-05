<script setup lang="ts">
import type {
//   TableCellPrint,
  TablePrint,
} from '../TreeTools'
const props = defineProps<{
  table: TablePrint
}>()
function setStyle(table: TablePrint, i: number,
  j: number): string {
  const cell = table.data[i][j]
  let formatString = 'background-color: '
  formatString += cell.color
  formatString += ';'
  const borderWidth = '4px'
  if (j > 0) {
    const cellLeft = table.data[i][j - 1]
    if (JSON.stringify(cell.path) !== JSON.stringify(cellLeft.path)) {
      formatString += '\nborder-left: '
      formatString += borderWidth
      formatString += ' solid black;'
    }
  }
  if (i > 0) {
    const cellUp = table.data[i - 1][j]
    if (JSON.stringify(cell.path) !== JSON.stringify(cellUp.path)) {
      formatString += '\nborder-top: '
      formatString += borderWidth
      formatString += ' solid black;'
    }
  }
  // border: 2px solid gray;

  return formatString
}
// console.log(props.table)
</script>

<template>
  <table class="mx-auto">
    <tr v-for="(row, index1) in props.table.data" :key="index1">
      <td
        v-for="(cell, index2) in row"
        :key="index2"
        :style="setStyle(props.table, index1, index2)"
      >
        <span v-for="(val, key) in cell" :key="key">
          <span
            v-if="key !== 'color'"
            :class=" key === 's' ? 'font-extrabold text-lg' : ''"
          >
            {{ key }}: {{ val }}
          </span>
          <span v-if="key === 's' || key === 'v' || key === 'y'"><br></span>
          <span v-if="key === 'x' || key === 'h'">&nbsp;</span>
        </span>
      </td>
    </tr>
  </table>
</template>

<style>
table, th, td {
  color: black;
  background-color: white;
  padding: 10px;
  margin-left: 20px;
}
</style>
