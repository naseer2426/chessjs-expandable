import { createBoard } from "../board";
import { 
    Board, 
    Move, 
    MoveType,
    EMPTY_SQUARE,
} from "../types"

import {  
    getEnPassantPawnIdx, 
    getRookMoveForCastle, 
    isCastleMove, 
    isEnPassantMove, 
} from "./utils"

export function doLegalMove(move:Move, board:Board, locationToPiece: {[key: string]: string}, enPassantTarget: string|null):{
    newBoard:Board,
    newLocationToPiece: {[key: string]: string}
} {
    if (move.moveType === MoveType.EXTEND) {
        return doExtendMove(move, board, locationToPiece);
    }
    if (isCastleMove(move)) {
        return doCastleMove(move, board, locationToPiece);
    }
    if (isEnPassantMove(move, enPassantTarget)) {
        return doEnPassantMove(move, board, locationToPiece);
    }
    return doSimpleMove(move, board, locationToPiece);
}

function doExtendMove(move:Move, board:Board, locationToPiece: {[key: string]: string}):{
    newBoard:Board,
    newLocationToPiece: {[key: string]: string}
} {
    if (move.moveType !== MoveType.EXTEND) {
        return {
            newBoard: board,
            newLocationToPiece: locationToPiece
        };
    }
    let newBoard = JSON.parse(JSON.stringify(board)) as Board;
    newBoard.locationToUnitSqIdxs[move.expandLocation!].forEach(sqIdx => {
        newBoard.rows[sqIdx.row][sqIdx.col].piece = EMPTY_SQUARE;
    })
    newBoard = createBoard( // add padding to board
        newBoard.rows,
        board.horizontalExtendLimit,
        board.verticalExtendLimit,
        board.horizontalAddUnit,
        board.verticalAddUnit
    )
    return {
        newBoard: newBoard,
        newLocationToPiece: locationToPiece,
    };
}

export function doSimpleMove(move:Move, board:Board, locationToPiece: {[key: string]: string}):{
    newBoard:Board,
    newLocationToPiece: {[key: string]: string}
} {
    if (move.moveType !== MoveType.MOVE) {
        return {
            newBoard: board,
            newLocationToPiece: locationToPiece
        };
    }
    // Create a deep copy of the board
    const newBoard = JSON.parse(JSON.stringify(board)) as Board;
    const newLocationToPiece = {...locationToPiece};
    
    const sourceIdx = newBoard.locationToIdx[move.sourceSquare!];
    const targetIdx = newBoard.locationToIdx[move.targetSquare!];
    
    newBoard.rows[sourceIdx.row][sourceIdx.col].piece = EMPTY_SQUARE;
    delete newLocationToPiece[move.sourceSquare!];

    newBoard.rows[targetIdx.row][targetIdx.col].piece = move.piece!;
    newLocationToPiece[move.targetSquare!] = move.piece!;
    return {
        newBoard: newBoard,
        newLocationToPiece: newLocationToPiece
    }
}

function doCastleMove(move:Move, board:Board, locationToPiece: {[key: string]: string}):{
    newBoard:Board,
    newLocationToPiece: {[key: string]: string}
} {
    // king move
    const result = doSimpleMove(move, board, locationToPiece);
    //rook move
    const rookMove = getRookMoveForCastle(move);
    const {newBoard, newLocationToPiece} = doSimpleMove(rookMove, result.newBoard, result.newLocationToPiece);
    return {
        newBoard: newBoard,
        newLocationToPiece: newLocationToPiece
    }
}

// this function assumes you are passing a valid en passant move
function doEnPassantMove(move:Move, board:Board, locationToPiece: {[key: string]: string}):{
    newBoard:Board,
    newLocationToPiece: {[key: string]: string}
} {
    const result = doSimpleMove(move, board, locationToPiece);
    const pawnIdx = getEnPassantPawnIdx(move, board);
    result.newBoard.rows[pawnIdx.row][pawnIdx.col].piece = EMPTY_SQUARE;
    delete result.newLocationToPiece[`${move.sourceSquare}`];
    return result;
}
