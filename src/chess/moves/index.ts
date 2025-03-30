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
    const allMoves = getAllPieceMovesFromSource(board, locationToPiece, source, enPassantSq, castlingRights);
    const legalMoves = allMoves.filter((move)=>{
        if (isKingExposedAfterMove(move, board, locationToPiece, enPassantSq, castlingRights)) {
            return false;
        }
        return true;
    })
    return legalMoves
}

function isKingExposedAfterMove(
    move:Move,
    board:Board,
    locationToPiece: {[key: string]: string},
    enPassantTarget: string|null,
    castlingRights:CastlingRights,
): boolean {
    if (move.moveType === MoveType.EXTEND) {
        return false;
    }
    const {newBoard, newLocationToPiece} = doLegalMove(move, board, locationToPiece, enPassantTarget);
    const moverColor = pieceColor(move.piece!);
    if (moverColor === "") { // should never happen
        return false;
    }
    const opponentColor = moverColor === "w" ? "b" : "w";
    const opponentMoves = getAllMoves(newBoard, newLocationToPiece, opponentColor, null, castlingRights);
    const kingLocation = getKingLocation(newLocationToPiece, moverColor);
    const exposedMove = opponentMoves.find((move)=>{
        if (move.moveType !== MoveType.MOVE) {
            return false;
        }
        return move.targetSquare === kingLocation;
    })
    return !!exposedMove;
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
        null, // there may be en passant possible but it can never block king side castle so passing null
        castlingRights,
    );
    let isLegal = true;
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
