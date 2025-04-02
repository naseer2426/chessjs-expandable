import {Chess} from "../index";
import { MoveType } from "../types";

describe("legal moves", ()=>{
    test("should return the correct legal moves", ()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            8,
            8,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = chess.legalMoves();
        expect(moves.length).toBe(56); // 20 piece moves + 36 extend moves
    })
    test("en passant black pawn legal", ()=>{
        const chess = new Chess(
            "rnbqkbnr/pppp1pp1/7p/3Pp3/8/8/PPP1PPPP/RNBQKBNR w KQkq e6 0 1",
            8,
            8,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = chess.legalMoves();
        const enPassantMove = {
            moveType: MoveType.MOVE,
            piece: "wP",
            sourceSquare: "d5",
            targetSquare: "e6"
        }
        
        expect(moves.some((m)=>{
            return m.moveType === enPassantMove.moveType &&
            m.sourceSquare === enPassantMove.sourceSquare && 
            m.targetSquare === enPassantMove.targetSquare && 
            m.piece === enPassantMove.piece
        })).toBe(true);
    })
})
