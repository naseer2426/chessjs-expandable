import { Board, Move, EMPTY_SQUARE, NON_EXISTENT_SQUARE, MoveType, Square } from "../types";

export const horizontalAndVerticalMoves = (origin: string, board:Board):Move[] => {
    return [
        ...horizontalMoves(origin, board, 1), // right
        ...horizontalMoves(origin, board, -1), // left
        ...verticalMoves(origin, board, 1), // up
        ...verticalMoves(origin, board, -1), // down
    ]
}

export const diagonalMoves = (origin: string, board:Board):Move[] => {
    return [
        ...simpleDiagonalMoves(origin, board, {x:1, y:1}), // bottom right
        ...simpleDiagonalMoves(origin, board, {x:1, y:-1}), // top right
        ...simpleDiagonalMoves(origin, board, {x:-1, y:1}), // bottom left
        ...simpleDiagonalMoves(origin, board, {x:-1, y:-1}), // top left
    ]
}

const verticalMoves = (origin: string, board:Board, direction:1|-1):Move[] => {
    const originIdx = board.locationToIdx[origin];
    const originSquare = board.rows[originIdx.row][originIdx.col];
    const piece = originSquare.piece;
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE) {
        return [];
    }
    const distToEdge = direction === 1 ? board.rows.length - originIdx.row : originIdx.row;
    const moves:Move[] = [];
    for (let i = 1; i <= distToEdge; i++) {
        const newSqIdx = {
            row: originIdx.row + i * direction,
            col: originIdx.col
        }
        const newSq = board.rows[newSqIdx.row][newSqIdx.col];
        if (canPieceMoveToSquare(piece, newSq)) {
            moves.push({
                moveType:MoveType.MOVE,
                sourceSquare:origin,
                targetSquare:`${newSq.file}${newSq.rank}`,
                piece:piece,
            } as Move);
        }
        if (newSq.piece === EMPTY_SQUARE) {
            continue;
        }
        return moves;
    }
    return moves;
}

const horizontalMoves = (origin: string, board:Board, direction:1|-1):Move[] => {
    const originIdx = board.locationToIdx[origin];
    const originSquare = board.rows[originIdx.row][originIdx.col];
    const piece = originSquare.piece;
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE) {
        return [];
    }
    const distToEdge = direction === 1 ? board.rows[0].length - originIdx.col : originIdx.col;
    const moves:Move[] = [];
    for (let i = 1; i <= distToEdge; i++) {
        const newSqIdx = {
            row: originIdx.row,
            col: originIdx.col + i * direction
        }
        const newSq = board.rows[newSqIdx.row][newSqIdx.col];
        if (canPieceMoveToSquare(piece, newSq)) {
            moves.push({
                moveType:MoveType.MOVE,
                sourceSquare:origin,
                targetSquare:`${newSq.file}${newSq.rank}`,
                piece:piece,
            } as Move);
        }
        if (newSq.piece === EMPTY_SQUARE) {
            continue;
        }
        return moves;
    }
    return moves;
}

const simpleDiagonalMoves = (origin: string, board:Board, direction:{x:1|-1, y:1|-1}):Move[] => {
    const originIdx = board.locationToIdx[origin];
    const originSquare = board.rows[originIdx.row][originIdx.col];
    const piece = originSquare.piece;
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE
    ) {
        return [];
    }

    let distToVerticalEdge = board.rows.length - originIdx.row;
    if (direction.y === -1) {
        distToVerticalEdge = originIdx.row;
    }
    let distToHorizontalEdge = board.rows[0].length - originIdx.col;
    if (direction.x === -1) {
        distToHorizontalEdge = originIdx.col;
    }
    const smallerDist = Math.min(distToVerticalEdge, distToHorizontalEdge);
    const moves:Move[] = [];
    for (let i = 1; i <= smallerDist; i++) {
        const newSqIdx = {
            row: originIdx.row + i * direction.y,
            col: originIdx.col + i * direction.x
        }
        const newSq = board.rows[newSqIdx.row][newSqIdx.col];
        if (canPieceMoveToSquare(piece, newSq)) {
            moves.push({
                moveType:MoveType.MOVE,
                sourceSquare:origin,
                targetSquare:`${newSq.file}${newSq.rank}`,
                piece:piece,
            } as Move);
        }
        if (newSq.piece === EMPTY_SQUARE) {
            continue;
        }
        return moves;
    }
    return moves;
}

export function pieceColor(piece:string):string {
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE) {
        return "";
    }
    return piece.slice(0,1);
}

export function getSquare(row:number, col:number, board:Board):Square|null {
    if (row < 0 || row >= board.rows.length || col < 0 || col >= board.rows[0].length) {
        return null;
    }
    return board.rows[row][col];
}

export function canPieceMoveToSquare(piece:string, targetSquare:Square):boolean {
    if (targetSquare.piece === NON_EXISTENT_SQUARE) {
        return false;
    }
    if (targetSquare.piece === EMPTY_SQUARE) {
        return true;
    }
    if (pieceColor(targetSquare.piece) === pieceColor(piece)) {
        return false;
    }
    return true;
}
