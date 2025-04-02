import { 
    Row,
    Square,
    NON_EXISTENT_SQUARE, 
    EMPTY_SQUARE,
    Idx
} from "./types"
import { fenPieceToPiece } from "./notation"
export function modifiedFenToRawRows(fen: string): Row[] {
    // cut off any move, castling, etc info from the end. we're only interested in position information
    fen = fen.replace(/ .+$/, "");
    const fenRows = fen.split("/");

    let currentRowIdx = getFenStartRowIdx(fenRows);
    let rows: Row[] = [];

    fenRows.forEach((fenRow) => {
        const parsedRow = fenRow.match(/\d+|[a-zA-Z]/g); // r10r -> ['r', '10', 'r']
        if (!parsedRow) return;

        let colIdx = getFenStartColIdx(fenRow);
        let row: Row = [];

        //TODO: clean this up later so we wont need so many layers of indentations
        parsedRow.forEach((unit) => {
            if (unit.search(/\d/) !== -1) { // number signifies empty squares
                const numEmptySquares = parseInt(unit, 10);
                for (let i = 0; i < numEmptySquares; i++) {
                    row.push({
                        piece: EMPTY_SQUARE,
                        rank: currentRowIdx.toString(),
                        file: getColumnNotation(colIdx)
                    })
                    colIdx += 1;
                }
            } else if (unit == NON_EXISTENT_SQUARE) {
                row.push({
                    piece: NON_EXISTENT_SQUARE,
                    rank: currentRowIdx.toString(),
                    file: getColumnNotation(colIdx)
                })
                colIdx += 1;
            } else { // if its not empty square or non-existent square, it must be a piece
                row.push({
                    piece: fenPieceToPiece(unit),
                    rank: currentRowIdx.toString(),
                    file: getColumnNotation(colIdx)
                })
                colIdx += 1;
            }
        })

        rows.push(row);
        currentRowIdx -= 1;
    })

    return rows;
}

export function getFenStartRowIdx(rows: string[]): number {
    const eighthRowIdx = rows.findIndex(row => row.startsWith('#'))
    if (eighthRowIdx === -1) return 8;
    return eighthRowIdx + 8;
}

function getFenStartColIdx(row: string): number {
    const aFileIdx = row.indexOf('$')
    if (aFileIdx === -1 || aFileIdx === 0) return 0;

    const beforeMarker = row.substring(0, aFileIdx)
    const beforeMarkerSplit = beforeMarker.match(/\d+|[a-zA-Z]/g)
    if (!beforeMarkerSplit) return 0;

    let squaresBeforeMarker = 0;
    for (let i = 0; i < beforeMarkerSplit.length; i++) {
        if (beforeMarkerSplit[i].search(/\d/) === -1) {
            squaresBeforeMarker += 1;
            continue;
        }
        squaresBeforeMarker += parseInt(beforeMarkerSplit[i], 10)
    }
    return -squaresBeforeMarker;
}

export function getColumnNotation(fenColIdx: number): string {
    if (fenColIdx < 0) {
        return String.fromCharCode(64 + Math.abs(fenColIdx))
    }
    return String.fromCharCode(97 + fenColIdx)
}

export function getFenColIdx(file: string): number {
    let charCode = file.charCodeAt(0)
    if (charCode >= 97) {
        return charCode - 97
    }
    return - (charCode - 64)
}

export function createLocationToIdx(rows: Row[]): {[key: string]: Idx} {
    const locationToIdx: {[key: string]: Idx} = {};

    rows.forEach((row, rowIdx) => {
        row.forEach((square, colIdx) => {
            locationToIdx[`${square.file}${square.rank}`] = {
                row: rowIdx,
                col: colIdx
            }
        })
    })

    return locationToIdx;
}

export function areAllSqNonExistent(row: Square[]): boolean {
    return row.every((square) => square.piece === NON_EXISTENT_SQUARE)
}

export function numNonExistentRowsTopN(rows: Row[], n: number): number {
    return rows.slice(0, n).filter(areAllSqNonExistent).length
}

export function numNonExistentRowsBottomN(rows: Row[], n: number): number {
    return rows.slice(-n).filter(areAllSqNonExistent).length
}

export function nonExistentRow(rowLength: number, startingFenColIdx: number, rank: string): Row {
    const newRow: Row = []
    for (let i = 0; i < rowLength; i++) {
        let fenColIdx = startingFenColIdx + i
        newRow.push({
            piece: NON_EXISTENT_SQUARE,
            rank: rank,
            file: getColumnNotation(fenColIdx)
        })
    }
    return newRow
}
