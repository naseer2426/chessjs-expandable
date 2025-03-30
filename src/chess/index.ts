import { 
    Board, 
    AddUnit, 
    CastlingRights, 
    Move, 
    GameStatus,
    MoveType,
    NON_EXISTENT_SQUARE,
} from "./types"
import { fenToBoard, createLocationToPiece } from "./board"
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
    getEnPassantTargetSq, 
    isMoveCapture, 
    isPawnMove
} from "./moves/utils"
import { doLegalMove } from "./moves/do-moves"
import { getSquare, pieceColor } from "./moves/common"
import { allLegalPieceMovesFromSource } from "./moves"

export class Chess {
    private board: Board;
    private locationToPiece: {[key: string]: string};
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
        this.locationToPiece = createLocationToPiece(this.board.rows)
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
        if (move.moveType === MoveType.EXTEND) {
            const expandSqIdx = this.board.locationToIdx[move.expandLocation!];
            if (expandSqIdx === null) {
                return false;
            }
            const expandSq = getSquare(expandSqIdx.row, expandSqIdx.col, this.board);
            if (expandSq === null) {
                return false;
            }
            if (expandSq.piece !== NON_EXISTENT_SQUARE) {
                return false;
            }
            return true;
        }
        const color = pieceColor(move.piece!);
        if (color !== this.turn) {
            return false;
        }
        const legalPieceMoves = allLegalPieceMovesFromSource(
            move.sourceSquare!,
            this.board,
            this.locationToPiece,
            this.enPassantTarget,
            this.castlingRights
        )
        const matchingMove = legalPieceMoves.find((m)=>m==move);
        return !!matchingMove;
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
        const {newBoard, newLocationToPiece} = doLegalMove(
            move, 
            this.board, 
            this.locationToPiece, 
            this.enPassantTarget
        );
        this.board = newBoard;
        this.locationToPiece = newLocationToPiece;
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

    // used for testing
    public getBoard():Board {
        return this.board;
    }
    
}
