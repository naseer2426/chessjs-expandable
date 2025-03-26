import {Chess} from "../index"

describe("Fen",()=>{
    test("initialized default fen should match current fen", ()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            8,
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
        expect(chess.getCurrentFen()).toBe(
            "#E$rnbqkbnrE/E$ppppppppE/E$8E/E$8E/E$8E/E$8E/E$PPPPPPPPE/E$RNBQKBNRE w KQkq - 0 1"
        );
    })

    test("initialized updated fen should match current fen", ()=>{
        const chess = new Chess(
            "rnbqkbnr/pppppp2/6pp/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            8,
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
        expect(chess.getCurrentFen()).toBe(
            "#E$rnbqkbnrE/E$pppppp2E/E$6ppE/E$8E/E$8E/E$8E/E$PPPPPPPPE/E$RNBQKBNRE w KQkq - 0 1"
        );
    })
})
