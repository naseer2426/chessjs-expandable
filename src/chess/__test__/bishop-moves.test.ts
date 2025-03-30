import {Chess} from "..";
import { bishopMoves } from "../moves/pieces";
import { MoveType } from "../types";

describe("Bishop Moves", () => {
    test("starting position",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = bishopMoves("f1", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f1",
                    targetSquare: "e2",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f1",
                    targetSquare: "d3",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f1",
                    targetSquare: "c4",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f1",
                    targetSquare: "b5",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "f1",
                    targetSquare: "a6",
                    piece: "wB"
                },
            ]
        ))
    })

    test("attacking other pieces",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = bishopMoves("c4", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "b3",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "d3",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "e2",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "f1",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "b5",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "a6",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "d5",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "e6",
                    piece: "wB"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "f7",
                    piece: "wB"
                },
            ]
        ))
    })
})
