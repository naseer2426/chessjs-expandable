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
    piece: string; // could be a piece or empty/non-existent square.
    rank: string;
    file: string;
}

export type Row = Square[]
export type Col = Square[]
export type Idx = {
    row: number;
    col: number;
}

export type Board = {
    horizontalExtendLimit: number;
    verticalExtendLimit: number;
    horizontalAddUnit: AddUnit;
    verticalAddUnit: AddUnit;
    rows: Row[]
    locationToIdx: {
        [key: string]: Idx
    }
    locationToUnitSqIdxs: {
        [key: string]: Idx[]
    }
};

export type CastlingRights = {
    K: boolean; // white king side
    Q: boolean; // white queen side
    k: boolean; // black king side
    q: boolean; // black queen side
}

export enum MoveType {
    MOVE = "move",
    EXTEND = "extend"
}

export enum GameStatus {
    IN_PROGRESS = "in_progress",
    BLACK_WON = "black_won",
    WHITE_WON = "white_won",
    DRAW = "draw"
}

export type Move = {
    moveType: MoveType;

    // ------ Have value when moveType is MOVE ------
    sourceSquare?: string;
    targetSquare?: string;
    /*
        white pieces will have w prefix, black pieces will have b prefix. 
        the piece symbol will always be uppercase.
    */
    piece?: string; 

    // ------ Has value when moveType is EXTEND ------
    expandLocation?: string;
}
