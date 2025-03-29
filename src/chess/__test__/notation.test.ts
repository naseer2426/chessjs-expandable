import {notationToBoardMove, boardMoveToNotation} from "../notation"
import {MoveType} from "../types"
describe("notation",()=>{
    test("boardMoveToNotation white pawn move",()=>{
        const move = {
            moveType: MoveType.MOVE,
            piece: "wP",
            sourceSquare: "e4",
            targetSquare: "e5"
        }
        const notation = boardMoveToNotation(move)
        expect(notation).toBe("wP|e4|e5")
    })
    test("boardMoveToNotation black pawn move",()=>{
        const move = {
            moveType: MoveType.MOVE,
            piece: "bP",
            sourceSquare: "e5",
            targetSquare: "e4"
        }
        const notation = boardMoveToNotation(move)
        expect(notation).toBe("bP|e5|e4")
    })
    test("notationToBoardMove white pawn move",()=>{
        const notation = "wP|e4|e5"
        const move = notationToBoardMove(notation)
        expect(move).toEqual({
            moveType: MoveType.MOVE,
            piece: "wP",
            sourceSquare: "e4",
            targetSquare: "e5"
        })
    })
    test("notationToBoardMove black pawn move",()=>{
        const notation = "bP|e5|e4"
        const move = notationToBoardMove(notation)
        expect(move).toEqual({
            moveType: MoveType.MOVE,
            piece: "bP",
            sourceSquare: "e5",
            targetSquare: "e4"
        })
    })
    test("boardMoveToNotation extend board",()=>{
        const move = {
            moveType: MoveType.EXTEND,
            expandLocation: "e4"
        }
        const notation = boardMoveToNotation(move)
        expect(notation).toBe("[e4]")
    })
    test("notationToBoardMove extend board",()=>{
        const notation = "[e4]"
        const move = notationToBoardMove(notation)
        expect(move).toEqual({
            moveType: MoveType.EXTEND,
            expandLocation: "e4"
        })
    })
})
