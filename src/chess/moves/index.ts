import { Board, CastlingRights, Move, MoveType } from "../types";
import { pieceColor } from "./common";
import { 
    pawnMoves,
    knightMoves,
    bishopMoves,
    rookMoves,
    queenMoves,
    kingMoves
} from "./pieces";
import { doLegalMove } from "./do-moves";
import { getKingLocation } from "./utils";

export function allLegalPieceMovesFromSource(
    source: string,
    board:Board,
    locationToPiece: {[key: string]: string},
    enPassantSq:string|null,
    castlingRights:CastlingRights,
):Move[] {
    const piece = locationToPiece[source];
    if (!piece) {
        return [];
    }
    const color = pieceColor(piece);
    if (color === "") { // source square is empty or non existent
        return [];
    }
    const allMoves = getAllPieceMovesFromSource(board, locationToPiece, source, enPassantSq, castlingRights);
    const legalMoves = allMoves.filter((move)=>{
        if (isKingExposedAfterMove(move, board, locationToPiece, enPassantSq, color)) {
            return false;
        }
        return true;
    })
    return legalMoves
}

export function isKingExposedAfterMove(
    move:Move,
    board:Board,
    locationToPiece: {[key: string]: string},
    enPassantTarget: string|null,
    moverColor: "w" | "b",
): boolean {
    
    const {newBoard, newLocationToPiece} = doLegalMove(move, board, locationToPiece, enPassantTarget);
    return isKingInCheck(
        newBoard, 
        newLocationToPiece, 
        enPassantTarget, 
        moverColor,
    );
}

export function isKingInCheck(
    board:Board,
    locationToPiece: {[key: string]: string},
    enPassantTarget: string|null,
    color: "w" | "b",
):boolean {
    const opponentColor = color === "w" ? "b" : "w";
    const opponentMoves = getAllMoves(
        board, 
        locationToPiece, 
        opponentColor, 
        enPassantTarget, 
        /*
            opponent may have castling rights, but a castle cannot be the move that takes your king, so setting all to false
            to avoid calling getAllMoves again for isCastleLegal
        */
        {K:false, Q:false, k:false, q:false},
    );
    const kingLocation = getKingLocation(locationToPiece, color);
    const exposingMove = opponentMoves.find((move)=>{
        if (move.moveType !== MoveType.MOVE) {
            return false;
        }
        return move.targetSquare === kingLocation;
    })
    return !!exposingMove;
}

export function isCastleLegal(
    board:Board, 
    locationToPiece: {[key: string]: string}, 
    castlingRights:CastlingRights,
    color: "w" | "b",
    kingSide: boolean
):boolean {
    const castlingAllowed = haveCastlingRights(castlingRights, color, kingSide);
    if (!castlingAllowed) {
        return false;
    }
    const sqauresToCheck = squaresToCheckForCastle(color, kingSide);
    const opponentColor = color === "w" ? "b" : "w";
    const opponentMoves = getAllMoves(
        board, 
        locationToPiece, 
        opponentColor, 
        /* 
            there may be en passant possible but it can never block castle so passing null
            so passing null to prevent passing en passant target in the whole callchain
        */
        null, 
        /*
            opponent may have castling rights, but checking if opponent can castle here will trigger infinite recursion.
            oppenents castling can never block our castling, so we can safely pass false for castling rights
        */
        {K:false, Q:false, k:false, q:false},
    );
    let isLegal = true;
    // check if there are other pieces in caste squares
    sqauresToCheck.forEach((square)=>{
        if (locationToPiece[square]) {
            isLegal = false;
        }
    })
    // check if opponent pieces attack caste squares
    opponentMoves.forEach((move) => {
        if (move.moveType !== MoveType.MOVE) {
            return
        }
        if (sqauresToCheck.includes(move.targetSquare!)) {
            isLegal = false;
        }
        return;
    })
    return isLegal;
}

function haveCastlingRights(
    castlingRights:CastlingRights,
    color: "w" | "b",
    kingSide: boolean
):boolean {
    if (color === "w") {
        kingSide ? castlingRights.K : castlingRights.Q;
    }
    return kingSide ? castlingRights.k : castlingRights.q;
}

function squaresToCheckForCastle(
    color: "w" | "b",
    kingSide: boolean
):string[] {
    if (color === "w") {
        return kingSide ? ["f1", "g1"] : ["d1", "c1"];
    }
    return kingSide ? ["f8", "g8"] : ["d8", "c8"];
}

function getAllPieceMovesFromSource(
    board:Board,
    locationToPiece: {[key: string]: string},
    source: string,
    enPassantSq:string|null,
    castlingRights:CastlingRights,
):Move[] {

    if (!locationToPiece[source]) {
        return [];
    }
    const pieceType = locationToPiece[source].slice(1);
    const color = pieceColor(locationToPiece[source]);
    if (color === "") { // empty or non existent square
        return [];
    }

    const moves:Move[] = [];
    switch (pieceType) {
        case "P":
            moves.push(...pawnMoves(source, board, enPassantSq));
            break;
        case "N":
            moves.push(...knightMoves(source, board));
            break;
        case "B":
            moves.push(...bishopMoves(source, board));
            break;
        case "R":
            moves.push(...rookMoves(source, board));
            break;
        case "Q":
            moves.push(...queenMoves(source, board));
            break;
        case "K":
            moves.push(...kingMoves(source, board));
            break;
    }
    if (pieceType === "K" && isCastleLegal(board, locationToPiece, castlingRights, color, true /*kingSide*/)) {
        moves.push({
            sourceSquare: source,
            targetSquare: color === "w" ? "g1" : "g8",
            piece: `${color}K`,
            moveType: MoveType.MOVE
        })
    }
    if (pieceType === "K" && isCastleLegal(board, locationToPiece, castlingRights, color, false /*kingSide*/)) {
        moves.push({
            sourceSquare: source,
            targetSquare: color === "w" ? "c1" : "c8",
            piece: `${color}K`,
            moveType: MoveType.MOVE
        })
    }
    return moves;
}

function getAllMoves(
    board:Board,
    locationToPiece: {[key: string]: string},
    color: "w" | "b",
    enPassantSq:string|null,
    castlingRights:CastlingRights,
):Move[] {
    const moves:Move[] = [];
    for (const [location, piece] of Object.entries(locationToPiece)) {
        if (pieceColor(piece) !== color) {
            continue;
        }
        moves.push(...getAllPieceMovesFromSource(board, locationToPiece, location, enPassantSq, castlingRights));
    }
    return moves
}
