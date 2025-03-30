import { Board, EMPTY_SQUARE, Move, MoveType, NON_EXISTENT_SQUARE, Square } from "../types";
import { 
    diagonalMoves, 
    horizontalAndVerticalMoves, 
    pieceColor, 
    getSquare,
    canPieceMoveToSquare
} from "./common";

export const queenMoves = (origin: string, board:Board):Move[] => {
    const originIdx = board.locationToIdx[origin];
    const piece = board.rows[originIdx.row][originIdx.col].piece;
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE) {
        return [];
    }
    if (piece.slice(1).toLowerCase() !== "q") {
        return [];
    }
    return [
        ...diagonalMoves(origin, board),
        ...horizontalAndVerticalMoves(origin, board)
    ]
}

export const rookMoves = (origin: string, board:Board):Move[] => {
    const originIdx = board.locationToIdx[origin];
    const piece = board.rows[originIdx.row][originIdx.col].piece;
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE) {
        return [];
    }
    if (piece.slice(1).toLowerCase() !== "r") {
        return [];
    }
    return [
        ...horizontalAndVerticalMoves(origin, board)
    ]
}

export const bishopMoves = (origin: string, board:Board):Move[] => {
    const originIdx = board.locationToIdx[origin];
    const piece = board.rows[originIdx.row][originIdx.col].piece;
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE) {
        return [];
    }
    if (piece.slice(1).toLowerCase() !== "b") {
        return [];
    }
    return [
        ...diagonalMoves(origin, board)
    ]
}

export const pawnMoves = (origin: string, board:Board, enPassantSq:string|null):Move[] => {
    const moves:Move[] = [];
    const originIdx = board.locationToIdx[origin];
    const piece = board.rows[originIdx.row][originIdx.col].piece;
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE) {
        return moves;
    }
    if (piece.slice(1).toLowerCase() !== "p") {
        return moves;
    }
    const color = pieceColor(piece);
    const direction = color === "w" ? -1 : 1;
    const advanceSq = getSquare(originIdx.row + direction, originIdx.col, board);

    if (advanceSq && advanceSq.piece === EMPTY_SQUARE) {
        moves.push({
            moveType:MoveType.MOVE,
            sourceSquare:origin,
            targetSquare:`${advanceSq.file}${advanceSq.rank}`,
            piece:`${color}P`,
        } as Move);
    }

    const advance2Sq = getSquare(originIdx.row + 2 * direction, originIdx.col, board);
    if ((color === "w" && origin.slice(1)=== '2' || color === "b" && origin.slice(1)=== '7') && 
        advance2Sq && advance2Sq.piece === EMPTY_SQUARE) {
        moves.push({
            moveType:MoveType.MOVE,
            sourceSquare:origin,
            targetSquare:`${advance2Sq.file}${advance2Sq.rank}`,
            piece:`${color}P`,
        } as Move);
    }

    const leftAttackSq = getSquare(originIdx.row + direction, originIdx.col - 1, board);
    if (leftAttackSq && canPawnCapture(originIdx, leftAttackSq, board, enPassantSq)) {
        moves.push({
            moveType:MoveType.MOVE,
            sourceSquare:origin,
            targetSquare:`${leftAttackSq.file}${leftAttackSq.rank}`,
            piece:`${color}P`,
        } as Move);
    }
    
    const rightAttackSq = getSquare(originIdx.row + direction, originIdx.col + 1, board);
    if (rightAttackSq && canPawnCapture(originIdx, rightAttackSq, board, enPassantSq)) {
        moves.push({
            moveType:MoveType.MOVE,
            sourceSquare:origin,
            targetSquare:`${rightAttackSq.file}${rightAttackSq.rank}`,
            piece:`${color}P`,
        } as Move);
    }
    return moves;
}

const canPawnCapture = (originIdx:{row:number, col:number}, attackSq:Square, board:Board, enPassantSq:string|null):boolean => {
    if (enPassantSq && enPassantSq === `${attackSq?.file}${attackSq?.rank}`) {
        return true;
    }
    if (pieceColor(attackSq.piece) === "") { // empty or non existent square
        return false;
    }
    const pawnColor = pieceColor(board.rows[originIdx.row][originIdx.col].piece);
    if (pawnColor !== pieceColor(attackSq.piece)) {
        return true;
    }
    return false;
}

export const knightMoves = (origin: string, board:Board):Move[] => {
    const moves:Move[] = [];
    const originIdx = board.locationToIdx[origin];
    const piece = board.rows[originIdx.row][originIdx.col].piece;
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE) {
        return moves;
    }
    if (piece.slice(1).toLowerCase() !== "n") {
        return moves;
    }
    const offsets = [
        {x:2, y:1},
        {x:2, y:-1},
        {x:-2, y:1},
        {x:-2, y:-1},
        {x:1, y:2},
        {x:1, y:-2},
        {x:-1, y:2},
        {x:-1, y:-2},
    ]
    offsets.forEach((offset) => {
        const newSq = getSquare(originIdx.row + offset.y, originIdx.col + offset.x, board);
        if (newSq && canPieceMoveToSquare(piece, newSq)) {
            moves.push({
                moveType:MoveType.MOVE,
                sourceSquare:origin,
                targetSquare:`${newSq.file}${newSq.rank}`,
                piece:piece,
            } as Move);
        }
    })
    return moves;
}

export const kingMoves = (origin: string, board:Board):Move[] => {
    const moves:Move[] = [];
    const originIdx = board.locationToIdx[origin];
    const piece = board.rows[originIdx.row][originIdx.col].piece;
    if (piece === EMPTY_SQUARE || piece === NON_EXISTENT_SQUARE) {
        return moves;
    }
    if (piece.slice(1).toLowerCase() !== "k") {
        return moves;
    }
    const offsets = [
        {x:1, y:0},
        {x:-1, y:0},
        {x:0, y:1},
        {x:0, y:-1},
        {x:1, y:1},
        {x:1, y:-1},
        {x:-1, y:1},
        {x:-1, y:-1},
    ]
    offsets.forEach((offset) => {
        const newSq = getSquare(originIdx.row + offset.y, originIdx.col + offset.x, board);
        if (newSq && canPieceMoveToSquare(piece, newSq)) {
            moves.push({
                moveType:MoveType.MOVE,
                sourceSquare:origin,
                targetSquare:`${newSq.file}${newSq.rank}`,
                piece:piece,
            } as Move);
        }
    })
    //TODO: add castling moves
    return moves;
}
