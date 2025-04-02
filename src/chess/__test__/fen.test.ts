import {Chess, Move, MoveType} from ".."

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
            "E$EEEEEEEEE/#E$rnbqkbnrE/E$ppppppppE/E$8E/E$8E/E$8E/E$8E/E$PPPPPPPPE/E$RNBQKBNRE/E$EEEEEEEEE w KQkq - 0 1"
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
            "E$EEEEEEEEE/#E$rnbqkbnrE/E$pppppp2E/E$6ppE/E$8E/E$8E/E$8E/E$PPPPPPPPE/E$RNBQKBNRE/E$EEEEEEEEE w KQkq - 0 1"
        );
    })

    test("fen after extend",()=>{
        const chess = new Chess(
            "8/8/8/5K2/2P5/3k4/8/8 b - - 0 1",
            1,1,
            {x:1, y:1},
            {x:1, y:1}
        );
        expect(chess.moveFromBoard({
            moveType: MoveType.EXTEND,
            expandLocation: "A1",
        } as Move)).toBe(true);

        expect(chess.getCurrentFen()).toBe(
            "E$EEEEEEEEE/#E$8E/E$8E/E$8E/E$5K2E/E$2P5E/E$3k4E/E$8E/1$8E/E$EEEEEEEEE w - - 1 2"
        );
    })
})
