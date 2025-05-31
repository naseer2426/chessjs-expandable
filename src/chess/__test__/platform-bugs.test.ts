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
})
