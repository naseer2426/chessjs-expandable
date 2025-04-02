import { Chess} from "..";
import { kingMoves } from "../moves/pieces";
import { MoveType } from "../types";

describe("King Moves",()=>{
    test("king starting position",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = kingMoves("e1", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            []
        ))
    })

    test("bong cloud lol",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = kingMoves("e1", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "e1",
                    targetSquare: "e2",
                    piece: "wK"
                },
            ]
        ))
    })

    test("king in centre ignoring check",()=>{
        const chess = new Chess(
            "rnbqkbnr/ppp1pppp/8/2p5/2K1P3/8/PPPP1PPP/RNBQ1BNR w KQkq - 0 1",
            4,
            4,
            {x:1, y:1},
            {x:1, y:1}
        );
        const moves = kingMoves("c4", chess.getBoard());
        expect(moves).toEqual(expect.arrayContaining(
            [
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "b5",
                    piece: "wK"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "c5",
                    piece: "wK"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "d5",
                    piece: "wK"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "b4",
                    piece: "wK"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "d4",
                    piece: "wK"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "b3",
                    piece: "wK"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "c3",
                    piece: "wK"
                },
                {
                    moveType: MoveType.MOVE,
                    sourceSquare: "c4",
                    targetSquare: "d3",
                    piece: "wK"
                },
            ]
        ))
    })
})
