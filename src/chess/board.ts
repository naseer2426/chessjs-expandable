import { 
    Row,
    Col, 
    NON_EXISTENT_SQUARE, 
    AddUnit, 
    Board,
    EMPTY_SQUARE, 
} from "./types"
import { 
    getColumnNotation, 
    getFenColIdx, 
    createLocationToIdx,
    modifiedFenToRawRows,
    areAllSqNonExistent,
    numNonExistentRowsTopN,
    numNonExistentRowsBottomN,
    nonExistentRow
} from "./squares"

import { createLocationToUnitSqIdxs } from "./add-units"

export function fenToBoard(
    fen: string, 
    horizontalExtendLimit: number,
    verticalExtendLimit: number,
    horizontalAddUnit: AddUnit,
    verticalAddUnit: AddUnit
): Board {
    const rawRows = modifiedFenToRawRows(fen)
    return createBoard(
        rawRows, 
        horizontalExtendLimit, 
        verticalExtendLimit,
        horizontalAddUnit, 
        verticalAddUnit,
    )
}

export function createBoard(
    rawRows: Row[],
    horizontalExtendLimit: number,
    verticalExtendLimit: number,
    horizontalAddUnit: AddUnit,
    verticalAddUnit: AddUnit
): Board {
    const toAdd: {
        top: number,
        bottom: number,
        left: number,
        right: number
    } = {
        top: verticalAddUnit.y - numNonExistentRowsTopN(rawRows, verticalAddUnit.y),
        bottom: verticalAddUnit.y - numNonExistentRowsBottomN(rawRows, verticalAddUnit.y),
        left: horizontalAddUnit.x - numNonExistentColsLeftN(rawRows, horizontalAddUnit.x),
        right: horizontalAddUnit.x - numNonExistentColsRightN(rawRows, horizontalAddUnit.x)
    }
    const paddedRows = addNesPaddingToRows(rawRows, toAdd, horizontalExtendLimit, verticalExtendLimit)
    return {
        horizontalExtendLimit,
        verticalExtendLimit,
        horizontalAddUnit,
        verticalAddUnit,
        rows: paddedRows,
        locationToIdx: createLocationToIdx(paddedRows),
        locationToUnitSqIdxs: createLocationToUnitSqIdxs(paddedRows, horizontalAddUnit, verticalAddUnit)
    }
}

function numNonExistentColsLeftN(rows: Row[], n: number): number {
    let cols: Col[] = []
    for (let i = 0; i < n; i++) {
        cols.push(rows.map(row => row[i]))
    }
    return cols.filter(areAllSqNonExistent).length
}

function numNonExistentColsRightN(rows: Row[], n: number): number {
    let cols: Col[] = []
    for (let i = 0; i < n; i++) {
        cols.push(rows.map(row => row[row.length - 1 - i]))
    }
    return cols.filter(areAllSqNonExistent).length
}

function addNesPaddingToRows(rows: Row[], toAdd: {
    top: number,
    bottom: number,
    left: number,
    right: number
}, horizontalExtendLimit: number, verticalExtendLimit: number): Row[] {

    const existingPadding = getExistingPadding(rows)
    const left = getPaddingToAdd(existingPadding.left, toAdd.left, horizontalExtendLimit)
    const right = getPaddingToAdd(existingPadding.right, toAdd.right, horizontalExtendLimit)
    const top = getPaddingToAdd(existingPadding.top, toAdd.top, verticalExtendLimit)
    const bottom = getPaddingToAdd(existingPadding.bottom, toAdd.bottom, verticalExtendLimit)

    const lrPaddedRows = rows.map(row => addLRNesPaddingToRow(row, left, right))
    const paddedRows = addTBNesPaddingToRows(lrPaddedRows, top, bottom)
    
    return paddedRows
}

function getExistingPadding(rows: Row[]): {
    top: number,
    bottom: number,
    left: number,
    right: number
} {
    const eighthRankIdx = rows.findIndex(row => row[0].rank === "8")
    if (eighthRankIdx === -1) {
        // should never happen since we always start off with normal board
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    }
    const aFileIdx = rows[0].findIndex(square => square.file === "a")
    if (aFileIdx === -1) {
        // should never happen since we always start off with normal board
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    }
    return {
        top: eighthRankIdx,
        bottom: rows.length - (8+eighthRankIdx),
        left: aFileIdx,
        right: rows[0].length - (8+aFileIdx)
    }
}

function getPaddingToAdd(existing:number, toAdd: number, limit:number): number {
    const total = existing + toAdd
    if (total > limit) {
        return limit - existing
    }
    return toAdd
}

function addTBNesPaddingToRows(rows: Row[], top: number, bottom: number): Row[] {
    const newRows: Row[] = []
    const rowLength = rows[0].length
    const startingFenColIdx = getFenColIdx(rows[0][0].file)
    const topRank = rows[0][0].rank
    const bottomRank = rows[rows.length - 1][0].rank

    for (let i = 0; i < top; i++) {
        const rank = (parseInt(topRank, 10) + top - i).toString()
        newRows.push(nonExistentRow(rowLength, startingFenColIdx, rank))
    }

    rows.forEach(row => {
        newRows.push(row)
    })

    for (let i = 0; i < bottom; i++) {
        const rank = (parseInt(bottomRank, 10) - i - 1).toString()
        newRows.push(nonExistentRow(rowLength, startingFenColIdx, rank))
    }
    return newRows
}

function addLRNesPaddingToRow(row: Row, left: number, right: number): Row {
    const newRow: Row = []
    for (let i = 0; i < left; i++) {
        const offset = left - i
        const fenColIdx = getFenColIdx(row[0].file) - offset
        newRow.push({
            piece: NON_EXISTENT_SQUARE,
            rank: row[0].rank,
            file: getColumnNotation(fenColIdx)
        })
    }
    row.forEach(square => {
        newRow.push(square)
    })
    for (let i = 0; i < right; i++) {
        const offset = i + 1
        const fenColIdx = getFenColIdx(row[row.length - 1].file) + offset
        newRow.push({
            piece: NON_EXISTENT_SQUARE,
            rank: row[0].rank,
            file: getColumnNotation(fenColIdx)
        })
    }
    return newRow
}

export function createLocationToPiece(rows: Row[]): {[key: string]: string} {
    const locationToPiece: {[key: string]: string} = {}
    rows.forEach(row => {
        row.forEach(square => {
            if (square.piece === NON_EXISTENT_SQUARE || square.piece === EMPTY_SQUARE) {
                return;
            }
            locationToPiece[`${square.file}${square.rank}`] = square.piece
        })
    })
    return locationToPiece
}
