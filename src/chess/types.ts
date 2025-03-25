export const NON_EXISTENT_SQUARE = 'E';
export const EMPTY_SQUARE = 'e';

// This is the unit of squares player can add to the board.
//
// if x = 1, y = 1, then the unit is 1 square
// if x = 2, y = 2, then the unit is 4 squares (2x2)
// if x = 2, y = 1, then unit is a 2 squares as a 2x1 rectangle
export type AddUnit = {
    x: number;
    y: number;
}

export type Square = {
    piece: string; // could be a piece or empty/non-existent square
    rank: string;
    file: string;
}

export type Row = Square[]
export type Col = Square[]
export type Idx = {
    row: number;
    col: number;
}

export type BoardState = {
    rows: Row[]
    locationToIdx: {
        [key: string]: Idx
    }
    locationToUnitSqIdxs: {
        [key: string]: Idx[]
    }
};
