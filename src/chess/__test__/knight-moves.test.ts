import {Chess} from ".."
import { knightMoves } from "../moves/pieces"
import { MoveType } from "../types";

describe("Knight Moves", () => {
    test("knight starting position", () => {
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = knightMoves("b1", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "b1",
                    targetSquare: "c3",
                    piece: "wN"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "b1",
                    targetSquare: "a3",
                    piece: "wN"
                }
            ]
        ))
    })

    test("knight in centre of board", () => {
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/4N3/8/8/PPPPPPPP/R1BQKBNR w KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = knightMoves("e5", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "d7",
                    piece: "wN"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "f7",
                    piece: "wN"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "c6",
                    piece: "wN"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "g6",
                    piece: "wN"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "c4",
                    piece: "wN"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "g4",
                    piece: "wN"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "d3",
                    piece: "wN"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e5",
                    targetSquare: "f3",
                    piece: "wN"
                }
            ]
        ))
    })
})
