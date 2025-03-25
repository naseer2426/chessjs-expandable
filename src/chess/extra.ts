import { CastlingRights } from "./types";

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
