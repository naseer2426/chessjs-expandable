import {Board, BoardMove, EMPTY_SQUARE, MoveType, NON_EXISTENT_SQUARE} from "../types"

export const isMoveCapture = (move:BoardMove, board:Board):boolean=>{
    if (move.moveType === MoveType.MOVE) {
        const targetIdx = board.locationToIdx[move.targetSquare!];
        const targetSquare = board.rows[targetIdx.row][targetIdx.col];
        return targetSquare.piece !== EMPTY_SQUARE && targetSquare.piece!==NON_EXISTENT_SQUARE;
    }
    return false;
}
