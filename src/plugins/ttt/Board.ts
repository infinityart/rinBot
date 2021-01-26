import {GameInstance} from "./GameInstance.ts";
import {possibleMove, SymbolOption} from "./types.ts";

export class Board {
    gameInstance?: GameInstance

    constructor(gameInstance?: GameInstance) {
        this.gameInstance = gameInstance;
    }

    generateBoard = (): string => {
        if (!this.gameInstance) {
            return (`
        :white_large_square::regional_indicator_a::regional_indicator_b::regional_indicator_c:
        :one::purple_square::purple_square::purple_square:
        :two::purple_square::purple_square::purple_square:
        :three::purple_square::purple_square::purple_square:
        `)
        }

        const board: any = {}

        this.gameInstance.players.forEach(player => {
            player.usedMoves.forEach(usedMove => board[usedMove] = player.symbol)
        });

        this.gameInstance.possibleMoves.forEach(possibleMove => board[possibleMove] = "")

        return `:white_large_square::regional_indicator_a::regional_indicator_b::regional_indicator_c:
        :one:${this.textToIcon(board.a1)}${this.textToIcon(board.b1)}${this.textToIcon(board.c1)}   
        :two:${this.textToIcon(board.a2)}${this.textToIcon(board.b2)}${this.textToIcon(board.c2)}
        :three:${this.textToIcon(board.a3)}${this.textToIcon(board.b3)}${this.textToIcon(board.c3)}`
    }

    textToIcon = (name: SymbolOption) => {
        switch (name) {
            case "cross":
                return ":x:";
            case "circle":
                return ":o:";
            default:
                return ":purple_square:"
        }
    }
}