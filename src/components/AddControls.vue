<script setup lang="ts">
const props = defineProps<{
  isAddCol: boolean
  isAddRow: boolean
  col: number
  row: number
  maxCol: number
  maxRow: number
  isBefore: boolean
}>()
const emit = defineEmits(['update:isAddCol', 'update:isAddRow',
  'update:col', 'update:row',
  'update:isBefore',
])

const isBefore = ref(true)
watch(isBefore, () => {
  emit('update:isBefore', isBefore.value)
})

const isAddCol = ref(true)
const isAddRow = ref(true)
watch(isAddCol, () => {
  emit('update:isAddCol', isAddCol.value)
})

watch(isAddRow, () => {
  emit('update:isAddRow', isAddRow.value)
})
const colInput = ref('0')
emit('update:col', 0)
const col = computed(() => {
  if (isNaN(parseInt(colInput.value)) || colInput.value === '') {
    emit('update:col', 0)
    return 0
  }
  let init = parseInt(colInput.value)
  if (init > props.maxCol)
    init = props.maxCol
  if (init < 0)
    init = 0
  colInput.value = init.toString()
  emit('update:col', init)
  return init
})

const rowInput = ref('1')
const row = computed(() => {
  if (isNaN(parseInt(rowInput.value)) || rowInput.value === '') {
    emit('update:row', 1)
    return 1
  }
  let init = parseInt(rowInput.value)
  if (init > props.maxRow)
    init = props.maxRow
  if (init < 1)
    init = 1
  rowInput.value = init.toString()
  emit('update:row', init)
  return init
})
</script>

<template>
  <div class="m-4">
    <input v-model="isBefore" type="checkbox">
    <span class="m-4"> column position</span>
  </div>
  <div class="m-4">
    <input v-model="isAddCol" type="checkbox">
    <span class="m-4">
      add column {{ isBefore ? 'before' : 'after' }} position</span>
    <input v-model="colInput" type="number">
  </div>

  <div class="m-4">
    <input v-model="isAddRow" type="checkbox">
    <span class="m-4">
      add row before/after position</span>
    <input v-model="rowInput" type="number">
  </div>

  <div class="text-xl font-extrabold">
    Result:
  </div>
  <div v-show="isAddCol" class="m-4">
    Adding column before position {{ col }} ...
  </div>
  <div v-show="isAddRow" class="m-4">
    Adding row before position {{ row }} ...
  </div>
</template>
