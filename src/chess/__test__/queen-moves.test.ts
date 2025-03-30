import {Chess} from "..";
import { queenMoves } from "../moves/pieces";
import { MoveType } from "../types";

describe("Queen Moves", () => {
    test("starting position", ()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = queenMoves("d1", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d1",
                    targetSquare: "e2",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d1",
                    targetSquare: "f3",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d1",
                    targetSquare: "g4",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "d1",
                    targetSquare: "h5",
                    piece: "wQ"
                }
            ]
        ))
    })

    test("attacking other pieces",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/4P3/5Q2/PPPP1PPP/RNB1KBNR w KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = queenMoves("f3", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "e2",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "d1",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "e3",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "d3",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "c3",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "b3",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "a3",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "g3",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "h3",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "f4",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "f5",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "f6",
                    piece: "wQ"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f3",
                    targetSquare: "f7",
                    piece: "wQ"
                }
            ]
        ))
    })
})
