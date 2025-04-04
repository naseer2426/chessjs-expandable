import {Board, Move, CastlingRights, EMPTY_SQUARE, MoveType, NON_EXISTENT_SQUARE} from "../types"

// needs to be called before move is done on the board
export const isMoveCapture = (move:Move, board:Board):boolean=>{
    if (move.moveType === MoveType.MOVE) {
        const targetIdx = board.locationToIdx[move.targetSquare!];
        const targetSquare = board.rows[targetIdx.row][targetIdx.col];
        return targetSquare.piece !== EMPTY_SQUARE && targetSquare.piece!==NON_EXISTENT_SQUARE;
    }
    return false;
}

export const isPawnMove = (move:Move):boolean => {
    if (move.moveType !== MoveType.MOVE) {
        return false;
    }
    return move.piece!.slice(1) === "P";
}

export const isCastleMove = (move:Move):boolean => {
    if (move.moveType !== MoveType.MOVE) {
        return false;
    }
    if (move.piece!.slice(1).toLowerCase() !== "k") {
        return false;
    }
    if (move.sourceSquare! === "e1" && (move.targetSquare! === "g1" || move.targetSquare! === "c1")) {
        return true;
    }
    if (move.sourceSquare! === "e8" && (move.targetSquare! === "g8" || move.targetSquare! === "c8")) {
        return true;
    }
    return false;
}

export const getRookMoveForCastle = (move:Move):Move => {
    const isKingSide = move.targetSquare!.includes("g");
    const isWhite = move.piece!.includes("w");
    
    return {
        moveType: MoveType.MOVE,
        sourceSquare: getCastleRookSourceSq(isKingSide, isWhite),
        targetSquare: getCastleRookTargetSq(isKingSide, isWhite),
        piece: isWhite ? "wR" : "bR"
    }
}

export const getEnPassantTargetSq = (move:Move, board:Board):string|null => {
    if (move.moveType !== MoveType.MOVE) {
        return null;
    }
    if (!isPawnMove(move)) {
        return null;
    }
    const sourceIdx = board.locationToIdx[move.sourceSquare!];
    const targetIdx = board.locationToIdx[move.targetSquare!];
    if (Math.abs(sourceIdx.row - targetIdx.row) !== 2) {
        return null;
    }
    const isWhite = move.piece!.includes("w");

    const enPassantSqIdx = {
        col: targetIdx.col,
        row: sourceIdx.row + (isWhite ? -1 : 1)
    }
    const enPassantSq = board.rows[enPassantSqIdx.row][enPassantSqIdx.col];
    return `${enPassantSq.file}${enPassantSq.rank}`;
}

export const castlingRightUpdates = (move:Move):Partial<CastlingRights> => {
    if (move.moveType !== MoveType.MOVE) {
        return {};
    }
    // something may be capturing the rook
    if (move.targetSquare! === "a1") {
        return {Q:false}
    }
    if (move.targetSquare! === "h1") {
        return {K:false}
    }
    if (move.targetSquare! === "a8") {
        return {q:false}
    }
    if (move.targetSquare! === "h8") {
        return {k:false}
    }
    // moving the rook or the queen
    if (move.piece!.slice(1).toLowerCase() !== "r" && move.piece!.slice(1).toLowerCase() !== "k") {
        return {};
    }
    const isWhite = move.piece!.includes("w");
    if (move.piece!.slice(1).toLowerCase() === "k") {
        // king move means you have lost both castling rights
        return isWhite ? {K: false, Q: false} : {k: false, q: false};
    }
    // rook move
    if (move.sourceSquare! === "a1" || move.sourceSquare! === "a8") {
        // queen side rook move means you have lost the queen side castling right
        return isWhite ? {Q: false} : {q: false};
    }
    if (move.sourceSquare! === "h1" || move.sourceSquare! === "h8") {
        // king side rook move means you have lost the king side castling right
        return isWhite ? {K: false} : {k: false};
    }
    return {};
}

const getCastleRookSourceSq = (isKingSide:boolean, isWhite:boolean):string => {
    if (isKingSide) {
        return isWhite ? "h1" : "h8";
    }
    return isWhite ? "a1" : "a8";
}

const getCastleRookTargetSq = (isKingSide:boolean, isWhite:boolean):string => {
    if (isKingSide) {
        return isWhite ? "f1" : "f8";
    }
    return isWhite ? "d1" : "d8";
}

export const isEnPassantMove = (move:Move, enPassantSq:string|null):boolean => {
    if (move.moveType !== MoveType.MOVE) {
        return false;
    }
    if (!isPawnMove(move)) {
        return false;
    }
    if (enPassantSq === null) {
        return false;
    }
    return move.targetSquare! === enPassantSq;
}

// this function assumes you are passing in a valid en passant square
export const getEnPassantPawnIdx = (move:Move, board: Board):{row:number, col:number} => {
    const enPassantSq = move.targetSquare!;
    const enPassantSqIdx = board.locationToIdx[enPassantSq];
    const isAttackerWhite = move.piece!.includes("w");
    const direction = isAttackerWhite ? 1 : -1;
    return {
        row: enPassantSqIdx.row + direction,
        col: enPassantSqIdx.col
    }
}
export const getKingLocation = (locationToPiece: {[key: string]: string}, color: "w" | "b"):string => {
    const piece = `${color}K`;
    return Object.keys(locationToPiece).find(key => locationToPiece[key] === piece)!;
}

export const isTheoreticalDraw = (locationToPiece: {[key: string]: string}):boolean => {
    const numPieces = Object.keys(locationToPiece).length;
    if (numPieces < 3) {
        return true; // two kings
    }
    if (numPieces > 3) {
        /*
            not accouting for 1 king + 2 knights vs 1 king draw because I am lazy
            also not accounting for 1 king + 1 bishop vs 1 king + 1 bishop of the same color draw
        */
        return false
    }
    // 3 pieces
    const bishops = Object.keys(locationToPiece).filter((key)=>locationToPiece[key].includes("B"));
    if (bishops.length === 1) {
        return true;
    }
    const knights = Object.keys(locationToPiece).filter((key)=>locationToPiece[key].includes("N"));
    if (knights.length === 1) {
        return true;
    }
    return false;
}
