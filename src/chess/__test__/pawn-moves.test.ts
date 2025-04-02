import {Chess} from "..";
import { pawnMoves } from "../moves/pieces";
import { MoveType } from "../types";

describe("Pawn Moves", () => {
    test("white starting position",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = pawnMoves("e2", chess.getBoard(),null);
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e2",
                    targetSquare: "e3",
                    piece: "wP"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e2",
                    targetSquare: "e4",
                    piece: "wP"
                }
            ]
        ))
    })

    test("white attacking other pieces",() => {
        const chess = new Chess(
            "rnbqk2r/pppppppp/8/2n1b3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = pawnMoves("d4", chess.getBoard(),null);
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d4",
                    targetSquare: "d5",
                    piece: "wP"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d4",
                    targetSquare: "c5",
                    piece: "wP"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d4",
                    targetSquare: "e5",
                    piece: "wP"
                }
            ]
        ))
    })

    test("black starting position",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = pawnMoves("e7", chess.getBoard(),null);
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e7",
                    targetSquare: "e6",
                    piece: "bP"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e7",
                    targetSquare: "e5",
                    piece: "bP"
                }
            ]
        ))
    })

    test("black attacking other pieces",()=>{
        const chess = new Chess(
            "rnbqkbnr/ppp1pppp/8/3p4/2N1B3/8/PPPPPPPP/R1BQK1NR b KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = pawnMoves("d5", chess.getBoard(),null);
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d5",
                    targetSquare: "c4",
                    piece: "bP"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d5",
                    targetSquare: "e4",
                    piece: "bP"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d5",
                    targetSquare: "d4",
                    piece: "bP"
                }
            ]
        ))
    })

    test("white en passant",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppp1ppp/8/8/3Pp3/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = pawnMoves("e4", chess.getBoard(),"d3");
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e4",
                    targetSquare: "d3",
                    piece: "bP"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e4",
                    targetSquare: "e3",
                    piece: "bP"
                }
            ]
        ))
    })

    test("black en passant",()=>{
        const chess = new Chess(
            "rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = pawnMoves("e5", chess.getBoard(),"d6");
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "e6",
                    piece: "wP"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "d6",
                    piece: "wP"
                }
            ]
        ))
    })
})
