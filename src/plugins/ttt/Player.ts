import {PossibleMoveOption, SymbolOption} from "./types.ts";

export class Player {
    id: string;
    symbol: SymbolOption;
    usedMoves: PossibleMoveOption[]

    constructor(playerId: string, symbol: SymbolOption) {
        this.id = playerId;
        this.symbol = symbol;
        this.usedMoves = []
    }

    setMove = (move:PossibleMoveOption) => this.usedMoves.push(move);
}