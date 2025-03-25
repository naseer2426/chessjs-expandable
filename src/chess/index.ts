import { BoardState, AddUnit, CastlingRights } from "./types"
import { fenToBoardState } from "./board"
import { 
    fenToTurn, 
    fenToCastlingRights, 
    fenToEnPassantTarget, 
    fenToHalfmoveClock, 
    fenToFullmoveNumber
} from "./extra"
export class Chess {
    private boardState: BoardState;
    private turn: "w" | "b";
    private castlingRights: CastlingRights;
    private enPassantTarget: string | null; // e.g. "e3"
    private halfmoveClock: number;
    private fullmoveNumber: number;

    constructor(
        fen:string,
        horizontalExtendLimit: number,
        verticalExtendLimit: number,
        horizontalAddUnit: AddUnit,
        verticalAddUnit: AddUnit
    ) {
        this.boardState = fenToBoardState(
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
    }
}
