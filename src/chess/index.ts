import { 
    Board, 
    AddUnit, 
    CastlingRights, 
    Move, 
    GameStatus,
    MoveType,
    EMPTY_SQUARE,
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
import {boardMoveToNotation, notationToBoardMove} from "./notation"
import {areAllSqNonExistent} from "./squares"
import { 
    castlingRightUpdates, 
    getEnPassantPawnIdx, 
    getEnPassantTargetSq, 
    getRookMoveForCastle, 
    isCastleMove, 
    isEnPassantMove, 
    isMoveCapture, 
    isPawnMove
} from "./move-utils"

export class Chess {
    private board: Board;
    private turn: "w" | "b";
    private castlingRights: CastlingRights;
    private enPassantTarget: string | null; // e.g. "e3"
    private halfmoveClock: number;// how many moves both players have made since the last pawn advance or piece capture
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

    public moveFromBoard(move:Move):boolean {
        if (!this.isLegalMove(move)) {
            return false;
        }
        const isCapture = isMoveCapture(move, this.board);
        this.doLegalMove(move);
        this.recordMoveMetrics(move, isCapture);
        this.setGameStatus();
        return true;
    }

    private isLegalMove(move:Move):boolean {
        return true;
    }

    public moveFromNotation(notation:string):boolean {
        const boardMove = notationToBoardMove(notation);
        return this.moveFromBoard(boardMove);
    }

    public getGameStatus():GameStatus {
        //TODO: implement
        return GameStatus.IN_PROGRESS;
    }

    private setGameStatus():void {
        //TODO: implement
        return;
    }

    public getMoveHistory():string[] {
        return this.moveHistory;
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

    private doLegalMove(move:Move):void {
        if (move.moveType === MoveType.EXTEND) {
            this.board.locationToUnitSqIdxs[move.expandLocation!].forEach(sqIdx => {
                this.board.rows[sqIdx.row][sqIdx.col].piece = EMPTY_SQUARE;
            })
            return;
        }
        if (isCastleMove(move)) {
            this.doCastleMove(move);
            return;
        }
        
        if (isEnPassantMove(move, this.enPassantTarget)) {
            this.doEnPassantMove(move);
            return;
        }
        
        this.doSimpleMove(move);
    }

    private recordMoveMetrics(move:Move, isCapture:boolean):void {
        // history
        this.moveHistory.push(boardMoveToNotation(move));

        // castling rights
        this.castlingRights = {
            ...this.castlingRights,
            ...castlingRightUpdates(move)
        }

        // fullmove number
        if (this.turn === "b") {
            this.fullmoveNumber++;
        }

        // turn
        this.turn = this.turn === "w" ? "b" : "w";

        // halfmove clock
        if (isPawnMove(move) || isCapture) {
            this.halfmoveClock = 0;
        } else {
            this.halfmoveClock++;
        }

        // en passant target
        this.enPassantTarget = getEnPassantTargetSq(move, this.board);
    }

    private doCastleMove(move:Move):void {
        // king move
        this.doSimpleMove(move);
        //rook move
        const rookMove = getRookMoveForCastle(move);
        this.doSimpleMove(rookMove);
    }

    private doSimpleMove(move:Move):void {
        if (move.moveType !== MoveType.MOVE) {
            return;
        }
        const sourceIdx = this.board.locationToIdx[move.sourceSquare!];
        const targetIdx = this.board.locationToIdx[move.targetSquare!];
        this.board.rows[sourceIdx.row][sourceIdx.col].piece = EMPTY_SQUARE;
        this.board.rows[targetIdx.row][targetIdx.col].piece = move.piece!;
    }

    // this function assumes you are passing a valid en passant move
    private doEnPassantMove(move:Move):void {
        this.doSimpleMove(move);
        const pawnIdx = getEnPassantPawnIdx(move, this.board);
        this.board.rows[pawnIdx.row][pawnIdx.col].piece = EMPTY_SQUARE;
    }

    // used for testing
    public getBoard():Board {
        return this.board;
    }
    
}
