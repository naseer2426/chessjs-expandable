import { 
    Board, 
    AddUnit, 
    CastlingRights, 
    BoardMove, 
    GameStatus,
    Row,
    EMPTY_SQUARE
} from "./types"
import { fenToBoard } from "./board"
import { 
    fenToTurn, 
    fenToCastlingRights, 
    fenToEnPassantTarget, 
    fenToHalfmoveClock, 
    fenToFullmoveNumber
} from "./extra"
import {areAllSqNonExistent} from "./squares"

export class Chess {
    private board: Board;
    private turn: "w" | "b";
    private castlingRights: CastlingRights;
    private enPassantTarget: string | null; // e.g. "e3"
    private halfmoveClock: number;
    private fullmoveNumber: number;
    private moveHistory: string[]; // move notations
    private defaultFen: string = "#rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    constructor(
        fen:string=this.defaultFen,
        horizontalExtendLimit: number,
        verticalExtendLimit: number,
        horizontalAddUnit: AddUnit,
        verticalAddUnit: AddUnit
    ) {
        this.board = fenToBoard(
            fen, 
            horizontalExtendLimit, 
            verticalExtendLimit, 
            horizontalAddUnit, 
            verticalAddUnit,
        )
        this.turn = fenToTurn(fen)
        this.castlingRights = fenToCastlingRights(fen)
        this.enPassantTarget = fenToEnPassantTarget(fen)
        this.halfmoveClock = fenToHalfmoveClock(fen)
        this.fullmoveNumber = fenToFullmoveNumber(fen)
        this.moveHistory = []
    }

    public moveFromBoard(move:BoardMove):boolean {
        //TODO: implement
        return true;
    }

    public moveFromNotation(notation:string):boolean {
        //TODO: implement
        return true;
    }

    public getGameStatus():GameStatus {
        //TODO: implement
        return GameStatus.IN_PROGRESS;
    }

    public getMoveHistory():string[] {
        return this.moveHistory;
    }

    public getCurrentFen():string {
        return `${this.getBoardFen()} ${this.turn} ${this.getCastlingRightsNotation()} ${this.getEnPassantNotation()} ${this.halfmoveClock} ${this.fullmoveNumber}`
    }

    private getCastlingRightsNotation():string {
        let notation = "";
        if (this.castlingRights.K) notation += "K";
        if (this.castlingRights.Q) notation += "Q";
        if (this.castlingRights.k) notation += "k";
        if (this.castlingRights.q) notation += "q";
        if (notation === "") {
            return "-";
        }
        return notation;
    }

    private getBoardFen():string {
        let boardFen = "";
        this.board.rows.forEach(row => {
            if (areAllSqNonExistent(row)) {
                return;
            }
            boardFen += this.getRowFen(row) + "/";
        })
        return boardFen.slice(0, -1); // to remove the last "/"
    }

    private getRowFen(row:Row):string {
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

    private getEnPassantNotation():string {
        if (this.enPassantTarget === null) {
            return "-";
        }
        return this.enPassantTarget;
    }
    
}
