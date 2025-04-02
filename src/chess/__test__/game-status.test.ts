import {Chess} from "../index";
import {GameStatus} from "../types";

describe("Game Status", ()=>{
    // test("checkmate", ()=>{
    //     const chess = new Chess(
    //         "rnbqkbnr/1ppppQpp/8/8/p1B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 1",
    //         8,
    //         8,
    //         {x:1, y:1},
    //         {x:1, y:1}
    //     );
    //     const status = chess.getGameStatus();
    //     expect(status).toBe(GameStatus.WHITE_WON);
    // })
    // test("draw by king vs king", ()=>{
    //     const chess = new Chess(
    //         "4k3/8/8/8/8/2K5/8/8 w KQkq - 0 1",
    //         8,
    //         8,
    //         {x:1, y:1},
    //         {x:1, y:1}
    //     );
    //     const status = chess.getGameStatus();
    //     expect(status).toBe(GameStatus.DRAW);
    // })
    // test("draw by king + knight vs king", ()=>{
    //     const chess = new Chess(
    //         "4k3/8/8/8/5N2/2K5/8/8 w KQkq - 0 1",
    //         8,
    //         8,
    //         {x:1, y:1},
    //         {x:1, y:1}
    //     );
    //     const status = chess.getGameStatus();
    //     expect(status).toBe(GameStatus.DRAW);
    // })
    // test("draw by king + bishop vs king", ()=>{
    //     const chess = new Chess(
    //         "4k3/8/8/8/5b2/2K5/8/8 w KQkq - 0 1",
    //         8,
    //         8,
    //         {x:1, y:1},
    //         {x:1, y:1}
    //     );
    //     const status = chess.getGameStatus();
    //     expect(status).toBe(GameStatus.DRAW);
    // })
    // test("ongoing game", ()=>{
    //     const chess = new Chess(
    //         "4k3/8/8/8/8/2KP4/8/8 w KQkq - 0 1",
    //         8,
    //         8,
    //         {x:1, y:1},
    //         {x:1, y:1}
    //     );
    //     const status = chess.getGameStatus();
    //     expect(status).toBe(GameStatus.IN_PROGRESS);
    // })
    test("stalemate", ()=>{
        const chess = new Chess(
            "1$9/#1$4k4/1$9/1$9/1$9/1$9/1$9/1$9/1$1q7/K$9 w - - 0 1",
            1,
            1,
            {x:1, y:1},
            {x:1, y:1}
        );
        const status = chess.getGameStatus();
        expect(status).toBe(GameStatus.DRAW);
    })
})
