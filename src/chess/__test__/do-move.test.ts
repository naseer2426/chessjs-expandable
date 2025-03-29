import {Chess} from "../index"
import { MoveType } from "../types";

describe("do move",()=>{
    /*
        TODO: add test cases for castling right updates
    */
    test("simple moves",()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            4,
            4,
            {
                x: 1,
                y: 1
            },
            {
                x: 1,
                y: 1
            }
        );

        // e4
        const move = {
            moveType: MoveType.MOVE,
            piece: "wP",
            sourceSquare: "e2",
            targetSquare: "e4"
        }
        chess.moveFromBoard(move);
        expect(chess.getCurrentFen()).toBe("#E$rnbqkbnrE/E$ppppppppE/E$8E/E$8E/E$4P3E/E$8E/E$PPPP1PPPE/E$RNBQKBNRE b KQkq e3 0 1");
        expect(chess.getMoveHistory()).toEqual(["wP|e2|e4"]);

        //e5
        const move2 = {
            moveType: MoveType.MOVE,
            piece: "bP",
            sourceSquare: "e7",
            targetSquare: "e5"
        }
        chess.moveFromBoard(move2);
        expect(chess.getCurrentFen()).toBe("#E$rnbqkbnrE/E$pppp1pppE/E$8E/E$4p3E/E$4P3E/E$8E/E$PPPP1PPPE/E$RNBQKBNRE w KQkq e6 0 2");
        expect(chess.getMoveHistory()).toEqual(["wP|e2|e4", "bP|e7|e5"]);
    })
})
