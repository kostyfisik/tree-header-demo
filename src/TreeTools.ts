export interface TreeNode {
  VerticalSpan: number
  Color: string
  Value: string
  Children: TreeNode[]
}

export interface Tree {
  Name: string
  Children: TreeNode[]
}

export interface TableCell {
  node: TreeNode | undefined
  xLocal: number
  yLocal: number
}

export interface Table {
  data: TableCell[][]
}

export interface TableCellPrint {
  s: string | undefined
  h: number | undefined
  v: number | undefined
  color: string | undefined
  x: number
  y: number
}

export interface TablePrint {
  data: TableCellPrint[][]
}

export function ToPrint(table: Table): TablePrint {
  const rows = table.data.length
  const cols = table.data[0].length
  const tablePrint: TablePrint = { data: [] }
  for (let i = 0; i < rows; i++) {
    tablePrint.data[i] = []
    for (let j = 0; j < cols; j++) {
      tablePrint.data[i][j] = {
        s: table.data[i][j].node?.Value,
        h: table.data[i][j].node?.Children.length,
        v: table.data[i][j].node?.VerticalSpan,
        color: table.data[i][j].node?.Color,
        x: table.data[i][j].xLocal,
        y: table.data[i][j].yLocal,
      }
    }
  }
  return tablePrint
}

export function ConvertTreeToTable(tree: TreeNode): Table {
  const table: Table = { data: [] }
  const initColsCount = tree.Children.length
  table.data[0] = []
  for (let i = 0; i < initColsCount; i++) {
    table.data[0][i] = {
      node: tree.Children[i],
      xLocal: 0,
      yLocal: 0,
    }
  }
  return table
}

export function RenumberLastRowXLocal(table: Table) {
  // Only needed if last row is actually missing
  const rows = table.data.length
  const cols = table.data[0].length
  const i = rows - 1
  let currentValue = table.data[i][0].node?.Value
  let x = -1
  for (let j = 0; j < cols; j++) {
    if (currentValue === table.data[i][j].node?.Value) {
      x += 1
    }
    else {
      currentValue = table.data[i][j].node?.Value
      x = 0
    }
    table.data[i][j].xLocal = x
  }
}
export function ColumnAddLeft(table: Table, index: number) {
  const rows = table.data.length
  const cols = table.data[0].length
  if (index > cols)
    throw new Error('invalid ColumnAddLeft index')

  for (let i = 0; i < rows; i++) {
    const currentCell = JSON.parse(JSON.stringify(table.data[i][index]))
    table.data[i].splice(index, 0, currentCell)
  }

  RenumberLastRowXLocal(table)
}

export function ColumnAddMissing(table: Table) {
  const rows = table.data.length
  let cols = table.data[0].length
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cols = table.data[0].length
      const curr = table.data[i][j]
      const next = table.data[i][j + 1]
      if (next && curr.node?.Value === next.node?.Value)
        continue
      if (curr.node && curr.node.Children.length === 0)
        continue
      if (curr.node && curr.xLocal === curr.node.Children.length - 1)
        continue
      ColumnAddLeft(table, j)
      j = -1
    }
  }
}

export function isRowNeeded(table: Table): boolean {
  const rows = table.data.length
  const cols = table.data[0].length
  const i = rows - 1
  for (let j = 0; j < cols; j++) {
    const curr = table.data[i][j]
    if (!curr.node)
      continue
    if (curr.node.Children.length !== 0)
      return true
    if (curr.node.VerticalSpan > curr.yLocal + 1)
      return true
  }
  return false
}

export function TableAddEmptyRow(table: Table) {
  const cols = table.data[0].length
  const emptyRow: TableCell[] = []
  for (let j = 0; j < cols; j++) {
    emptyRow.push({
      node: undefined,
      xLocal: -1,
      yLocal: -1,
    })
  }
  table.data.push(JSON.parse(JSON.stringify(emptyRow)))
}

export function TableFillLastRow(table: Table) {
  if (table.data.length < 2)
    throw new Error('not enough rows in table...')
  const last = table.data.length - 1
  const prev = last - 1
  const cols = table.data[0].length
  for (let j = 0; j < cols; j++) {
    const prevCell = table.data[prev][j]
    const prevNode = prevCell.node
    const currentCell = table.data[last][j]
    if (!prevNode)
      throw new Error('broken table')

    if (prevNode.VerticalSpan > prevCell.yLocal + 1) {
      currentCell.node = prevCell.node
      currentCell.xLocal = prevCell.xLocal
      currentCell.yLocal = prevCell.yLocal + 1
      continue
    }

    if (prevNode.Children.length > 0) {
      currentCell.node = prevNode.Children[
        prevCell.xLocal
      ]
      currentCell.xLocal = 0
      currentCell.yLocal = 0
      continue
    }
  }
}

export function TableAddMissingCells(table: Table) {
  while (isRowNeeded(table)) {
    ColumnAddMissing(table)
    TableAddEmptyRow(table)
    TableFillLastRow(table)
    if (table.data.length > 2)
      break
  }
}
