import { Board, Move, EMPTY_SQUARE, NON_EXISTENT_SQUARE } from "../types";

export const diagonalMoves = (origin: string, board:Board):Move[] => {
    const moves:Move[] = [];
    const originIdx = board.locationToIdx[origin];
    const originSquare = board.rows[originIdx.row][originIdx.col];
    return moves;
}

