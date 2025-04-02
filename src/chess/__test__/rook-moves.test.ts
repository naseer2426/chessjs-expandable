import {Chess} from "..";
import { rookMoves } from "../moves/pieces";
import { MoveType } from "../types";

describe("Rook Moves", () => {
    test("rook in the middle of the board",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/R7/1P6/1PPPPPPP/1NBQKBNR w KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = rookMoves("a4", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "a1",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "a2",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "a3",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "a5",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "a6",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "a7",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "b4",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "c4",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "d4",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "e4",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "f4",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "g4",
                    piece: "wR"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "a4",
                    targetSquare: "h4",
                    piece: "wR"
                },
            ]
        ))
    })
})
        