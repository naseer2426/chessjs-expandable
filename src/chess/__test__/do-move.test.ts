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
    test("white king side castle",()=>{
        const chess = new Chess(
            "r1bqk1nr/ppppbppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 6",
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
        const move = {
            moveType: MoveType.MOVE,
            piece: "wK",
            sourceSquare: "e1",
            targetSquare: "g1"
        }
        chess.moveFromBoard(move);
        expect(chess.getCurrentFen()).toBe("#E$r1bqk1nrE/E$ppppbpppE/E$2n5E/E$1B2p3E/E$4P3E/E$5N2E/E$PPPP1PPPE/E$RNBQ1RK1E b kq - 1 6");
        expect(chess.getMoveHistory()).toEqual(["wK|e1|g1"]);
    })

    test("black king side castle",()=>{
        const chess = new Chess(
            "rnbqk2r/pppp1ppp/5n2/2b1p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R b kq - 0 3",
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
        const move = {
            moveType: MoveType.MOVE,
            piece: "bK",
            sourceSquare: "e8",
            targetSquare: "g8"
        }
        chess.moveFromBoard(move);
        expect(chess.getCurrentFen()).toBe("#E$rnbq1rk1E/E$pppp1pppE/E$5n2E/E$2b1p3E/E$4P3E/E$2N2N2E/E$PPPP1PPPE/E$R1BQKB1RE w - - 1 4");
        expect(chess.getMoveHistory()).toEqual(["bK|e8|g8"]);
    })

    test("white queen side castle",()=>{
        const chess = new Chess(
            "r3kbnr/pppbqppp/2np4/4p3/3PP3/2N1B3/PPP1QPPP/R3KBNR w KQkq - 0 5",
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
        const move = {
            moveType: MoveType.MOVE,
            piece: "wK",
            sourceSquare: "e1",
            targetSquare: "c1"
        }
        chess.moveFromBoard(move);
        expect(chess.getCurrentFen()).toBe("#E$r3kbnrE/E$pppbqpppE/E$2np4E/E$4p3E/E$3PP3E/E$2N1B3E/E$PPP1QPPPE/E$2KR1BNRE b kq - 1 5");
        expect(chess.getMoveHistory()).toEqual(["wK|e1|c1"]);
    })

    test("black queen side castle",()=>{
        const chess = new Chess(
            "r3kbnr/pppbqppp/2np4/4p3/3PP3/2N1B3/PPP1QPPP/R3KBNR b KQkq - 0 5",
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
        const move = {
            moveType: MoveType.MOVE,
            piece: "bK",
            sourceSquare: "e8",
            targetSquare: "c8"
        }
        chess.moveFromBoard(move);
        expect(chess.getCurrentFen()).toBe("#E$2kr1bnrE/E$pppbqpppE/E$2np4E/E$4p3E/E$3PP3E/E$2N1B3E/E$PPP1QPPPE/E$R3KBNRE w KQ - 1 6");
        expect(chess.getMoveHistory()).toEqual(["bK|e8|c8"]);
    })

    test("move with notation",()=>{
        const chess = new Chess(
            "r3kbnr/pppbqppp/2np4/4p3/3PP3/2N1B3/PPP1QPPP/R3KBNR b KQkq - 0 5",
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
        chess.moveFromNotation("bK|e8|c8");
        expect(chess.getCurrentFen()).toBe("#E$2kr1bnrE/E$pppbqpppE/E$2np4E/E$4p3E/E$3PP3E/E$2N1B3E/E$PPP1QPPPE/E$R3KBNRE w KQ - 1 6");
        expect(chess.getMoveHistory()).toEqual(["bK|e8|c8"]);
    })
})
