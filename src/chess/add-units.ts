import { Row, AddUnit, Idx, NON_EXISTENT_SQUARE } from "./types"

export function createLocationToUnitSqIdxs(
    rows: Row[], 
    horizontalAddUnit: AddUnit, 
    verticalAddUnit: AddUnit
): { [key: string]: Idx[] } {
    const locationToUnitSqIdxs: { [key: string]: Idx[] } = {};
    rows.forEach((row, rowIdx) => {
        row.forEach((square, colIdx) => {
            if (square.piece !== NON_EXISTENT_SQUARE) {
                return;
            }
            const addUnit = getAddUnitByLocPrioVert(square.file, square.rank, horizontalAddUnit, verticalAddUnit);
            const unitSqIdxs = computeUnitSqIdxs({ row: rowIdx, col: colIdx }, rows, addUnit);
            locationToUnitSqIdxs[`${square.file}${square.rank}`] = unitSqIdxs;
        });
    });
    return locationToUnitSqIdxs;
}

function getAddUnitByLoc(file: string, rank: string, horizontalAddUnit: AddUnit, verticalAddUnit: AddUnit): AddUnit {
    if (file.charCodeAt(0) < 97 && file.charCodeAt(0) > 65) { // capital letters
        return horizontalAddUnit;
    }
    if (file.charCodeAt(0) > 68) { // letters beyond small h
        return horizontalAddUnit;
    }
    return verticalAddUnit;
}

function getAddUnitByLocPrioVert(file: string, rank: string, horizontalAddUnit: AddUnit, verticalAddUnit: AddUnit): AddUnit {
    if (parseInt(rank, 10) > 8 || parseInt(rank, 10) < 1) {
        return verticalAddUnit;
    }
    return horizontalAddUnit;
}

const computeUnitSqIdxs = (idx: Idx, rows: Row[], addUnit: AddUnit): Idx[] => {
    const allPossibleUnits = getAllPossibleUnits(idx, addUnit);
    const validUnits = allPossibleUnits.filter(unit => isUnitValid(rows, unit));
    if (validUnits.length === 0) {
        return []
    }
    return validUnits[0];
}

const isUnitValid = (rows: Row[], unit: Idx[]): boolean => {
    return unit.every(idx => {
        const row = rows[idx.row];
        if (!row) {
            return false
        }
        const sq = row[idx.col];
        if (!sq) {
            return false
        }
        return sq.piece === NON_EXISTENT_SQUARE;
    });
}

function getAllPossibleUnits(idx: Idx, addUnit: AddUnit): Idx[][] {
    if (addUnit.x == 1 && addUnit.y == 1) {
        return [[idx]]
    }
    return [
        getUnitUsingIdx(idx, { horizontal: 1, vertical: 1 }, addUnit),
        getUnitUsingIdx(idx, { horizontal: 1, vertical: -1 }, addUnit),
        getUnitUsingIdx(idx, { horizontal: -1, vertical: 1 }, addUnit),
        getUnitUsingIdx(idx, { horizontal: -1, vertical: -1 }, addUnit),
    ]
}

function getUnitUsingIdx(idx: Idx, direction: { horizontal: 1 | -1, vertical: 1 | -1 }, addUnit: AddUnit): Idx[] {
    const unit: Idx[] = [];
    for (let i = 0; i < addUnit.x; i++) {
        for (let j = 0; j < addUnit.y; j++) {
            unit.push({ row: idx.row + j * direction.vertical, col: idx.col + i * direction.horizontal });
        }
    }
    return unit;
}
