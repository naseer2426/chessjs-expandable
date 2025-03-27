import { CastlingRights, EMPTY_SQUARE, Row } from "./types";

export function fenToTurn(fen: string): "w" | "b" {
    const fenSplit = fen.split(" ");
    if (fenSplit.length < 2) {
        return 'w'
    }
    return fenSplit[1] as "w" | "b";
}

export function fenToCastlingRights(fen: string):CastlingRights {
    const fenSplit = fen.split(" ");
    if (fenSplit.length < 3) {
        return {
            K: true,
            Q: true,
            k: true,
            q: true
        }
    }
    const castlingRights = fenSplit[2];
    return {
        K: castlingRights.includes('K'),
        Q: castlingRights.includes('Q'),
        k: castlingRights.includes('k'),
        q: castlingRights.includes('q')
    }
}

export function fenToEnPassantTarget(fen: string): string | null {
    const fenSplit = fen.split(" ");
    if (fenSplit.length < 4) {
        return null;
    }
    if (fenSplit[3] === '-') {
        return null;
    }
    return fenSplit[3] as string;
}

export function fenToHalfmoveClock(fen: string): number {   
    const fenSplit = fen.split(" ");
    if (fenSplit.length < 5) {
        return 0;
    }
    return parseInt(fenSplit[4]);
}

export function fenToFullmoveNumber(fen: string): number {
    const fenSplit = fen.split(" ");
    if (fenSplit.length < 6) {
        return 1;
    }
    return parseInt(fenSplit[5]);
}

export function getRowFen(row: Row): string {
    let rowFen = ""
    if (row[0].rank === "8") {
        rowFen += "#"
    }
    let addFileDisambiguator = false;
    if (row[0].file !== "a") {
        addFileDisambiguator = true;
    }
    let currEmptySqCount = 0;
    row.forEach(square => {
        if (addFileDisambiguator && square.file === "a") {
            rowFen += "$";
        }
        if (square.piece === EMPTY_SQUARE) {
            currEmptySqCount++;
        } else {
            if (currEmptySqCount > 0) {
                rowFen += currEmptySqCount.toString();
                currEmptySqCount = 0;
            }
            rowFen += square.piece;
        }
    })
    if (currEmptySqCount > 0) {
        rowFen += currEmptySqCount.toString();
    }
    return rowFen;
}

export function getEnPassantNotation(enPassantTarget:string|null):string {
    if (enPassantTarget === null) {
        return "-";
    }
    return enPassantTarget;
}

export function getCastlingRightsNotation(castlingRights:CastlingRights):string {
    let notation = "";
    if (castlingRights.K) notation += "K";
    if (castlingRights.Q) notation += "Q";
    if (castlingRights.k) notation += "k";
    if (castlingRights.q) notation += "q";
    if (notation === "") {
        return "-";
    }
    return notation;
}
