import { 
    Board, 
    AddUnit, 
    CastlingRights, 
    BoardMove, 
    GameStatus,
} from "./types"
import { fenToBoard } from "./board"
import { 
    fenToTurn, 
    fenToCastlingRights, 
    fenToEnPassantTarget, 
    fenToHalfmoveClock, 
    fenToFullmoveNumber,
    getRowFen,
    getEnPassantNotation,
    getCastlingRightsNotation
} from "./fen"
import {boardMoveToNotation} from "./notation"
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

    private recordBoardMove(move:BoardMove):void {
        this.moveHistory.push(boardMoveToNotation(move));
    }

    public getCurrentFen():string {
        const boardFen = this.getBoardFen();
        const castlingRightsNotation = getCastlingRightsNotation(this.castlingRights);
        const enPassantNotation = getEnPassantNotation(this.enPassantTarget);
        return `${boardFen} ${this.turn} ${castlingRightsNotation} ${enPassantNotation} ${this.halfmoveClock} ${this.fullmoveNumber}`
    }

    private getBoardFen():string {
        let boardFen = "";
        this.board.rows.forEach(row => {
            if (areAllSqNonExistent(row)) {
                return;
            }
            boardFen += getRowFen(row) + "/";
        })
        return boardFen.slice(0, -1); // to remove the last "/"
    }
    
}
