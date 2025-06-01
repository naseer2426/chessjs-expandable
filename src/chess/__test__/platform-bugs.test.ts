import {Chess} from "..";

describe("Bugs found during platform testing",()=>{
    test("castling bug",()=>{
        const chess = new Chess(
            "EE$EEE2EEEEE/EE$EEE2EEEEE/#EE$2kr1bnrEE/EE$ppp1ppppEE/EE$1n6EE/EE$5b2EE/EE$5B2EE/EE$2NP4EE/EE$PPP2PPPEE/EE$R3K1NREE/EE$EEEEEEEEEE/EE$EEEEEEEEEE w KQ - 5 10",
            4,
            2,
            {x:2,y:2},
            {x:2,y:2},
        )
        const valid = chess.moveFromNotation("wK|e1|c1")
        expect(valid).toEqual(true)
    })
    test("stalemate bug",()=>{
        const chess = new Chess(
            "E3$7E2EE/E3$7Ek3/#E2E$8EE1Q/E2E$8K2B/4$P11/4$12/2EE$1P10/4$2P9/4$P11/2EE$8EE2/4$E6E4/4$E6E2EE b - b3 0 71",
            4,
            2,
            {x:2,y:2},
            {x:2,y:2},
        )
        const legalMoves = chess.legalMoves()
        expect(legalMoves.length).toEqual(0)
    })

    test("pawn push 2 squares",()=>{
        const chess = new Chess(
            "EE$EEEEEEEEEE/EE$EEEEEEEEEE/#EE$rnbqkbnrEE/EE$ppppppp1EE/EE$6N1EE/EE$7pEE/EE$8EE/EE$8EE/EE$PPPPPPPPEE/EE$RNBQKB1REE/EE$EEEEEEEEEE/EE$EEEEEEEEEE b KQkq - 1 3",
            4,
            2,
            {x:2,y:2},
            {x:2,y:2},
        )
        const legal = chess.moveFromNotation("bP|g7|g5")
        expect(legal).toBe(false);
    })
})
