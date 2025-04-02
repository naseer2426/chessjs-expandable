import { Chess, Move, MoveType } from "../index";

describe("Promotion", () => {
    it("should be able to promote a pawn", () => {
        const chess = new Chess(
            "r7/1P6/8/5K2/8/3k4/8/8 w - - 0 1",
            1,
            1,
            {x:1, y:1},
            {x:1, y:1}
        );
        const promotionMove = {
            moveType: MoveType.MOVE,
            sourceSquare: "b7",
            targetSquare: "a8",
            piece: "wQ",
        } as Move
        expect(chess.moveFromBoard(promotionMove)).toBe(true);//valid move
    });
});
