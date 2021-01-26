import {Player} from "./Player.ts";
import {possibleMove, PossibleMoveOption} from "./types.ts";

export const gameCollection: GameInstance[] = [];

export class GameInstance {
    players: Player[];
    currentTurn: Player;
    possibleMoves: PossibleMoveOption[];

    constructor(requesterId: string, opponentId: string) {
        const requester = new Player(requesterId, "circle");
        const opponent = new Player(opponentId, "cross");

        this.players = [requester, opponent];
        this.currentTurn = opponent;
        this.possibleMoves = Object.values(possibleMove);
    }

    isTurnOf = (player: Player) => this.currentTurn.id === player.id;
    isPlayerInGame = (playerId: string) => this.players.some( player => player.id === playerId)
    isMovePossible = (move: any) => Object.values(possibleMove).includes(move);
    isMoveUsed = (move: PossibleMoveOption) => this.possibleMoves.includes(move);

    getPlayerById = (playerId: string) => {
        const player = this.players.find(player => player.id === playerId);

        if(!player) throw new Error("Couldn't find player in the collection.");

        return player;
    }

    setMove = (move: PossibleMoveOption) => {
        this.possibleMoves.splice(this.possibleMoves.indexOf(move), 1);
        this.currentTurn.setMove(move)
    }

    nextUser = () => {
        const nextPlayer = this.players.find( player => player.id !== this.currentTurn.id);

        if(!nextPlayer) throw new Error("Can't find the next user.");

        this.currentTurn = nextPlayer;
    }
}
