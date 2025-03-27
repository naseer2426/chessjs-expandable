import {BoardMove, MoveType} from "./types"

// assumption here is that this function is always called after validating the move
export const boardMoveToNotation = (move:BoardMove):string=>{
    /* 
        when we save game history in the backend, unlike usual implementations,
        where we save the list of move notations, we will also save the starting
        fen of the game, which will include the add units and extend limits.

        this is why we dont add them in the extend board notation here.
    */
    if (move.moveType === MoveType.EXTEND) {
        return `[${move.expandLocation}]`
    }
    /*
        this is not the standard algebraic notation but the logic to generate move
        notations is much simpler this way since I dont have to worry about checks,
        checkmates and disambiguity.
    */
   
    const piece = boardMovePieceToPiece(move.piece!);
    const sourceSquare = move.sourceSquare!;
    const targetSquare = move.targetSquare!;

    return `${piece}|${sourceSquare}|${targetSquare}`
}

export const notationToBoardMove = (notation:string):BoardMove=>{

    if (notation.includes("[")) {
        return {
            moveType: MoveType.EXTEND,
            expandLocation: notation.slice(1, -1)
        }
    }
    
    const [piece, sourceSquare, targetSquare] = notation.split("|");

    return {
        moveType: MoveType.MOVE,
        piece: pieceToBoardMovePiece(piece),
        sourceSquare,
        targetSquare
    }
}

export const boardMovePieceToPiece = (piece:string):string=>{
    if (piece.startsWith("w")) {
        return piece.slice(1);
    }
    return piece.slice(1).toLowerCase();
}

const pieceToBoardMovePiece = (piece:string):string=>{
    if (piece.toLowerCase() === piece) {
        return `b${piece.toUpperCase()}`
    }
    return `w${piece}`;
}

