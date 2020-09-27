import {gameCollection, GameInstance} from "./GameInstance.ts";

export class GameCollectionManager {
    gameCollection: GameInstance[];

    private get inGamePlayers() {
        return gameCollection.flatMap(game => game.players.map(player => player.id))
    }

    constructor() {
        this.gameCollection = gameCollection;
    }

    isPlayerInGame = (playerId: string) => this.inGamePlayers.includes(playerId);
    getGameByPlayer = (playerId: string) => this.gameCollection.find(gameInstance => gameInstance.isPlayerInGame(playerId));
}