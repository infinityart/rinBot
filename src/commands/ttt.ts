import {botCache} from "../../mod.ts";
import {sendMessage, botID, logger, avatarURL} from "../../deps.ts";
import {createSubcommand, sendEmbed, sendResponse} from "../utils/helpers.ts";
import {GameCollectionManager} from "../plugins/ttt/GameCollectionManager.ts"
import {gameCollection, GameInstance} from "../plugins/ttt/GameInstance.ts";
import {Embed} from "../utils/Embed.ts";
import {Board} from "../plugins/ttt/Board.ts";
import {possibleMove, PossibleMoveOption} from "../plugins/ttt/types.ts";
import {handleError} from "../utils/errors.ts";

botCache.commands.set('ttt', {
    name: 'ttt',
    guildOnly: true,
    arguments: [
        {
            name: 'subcommand',
            type: 'subcommand',
            defaultValue: "set",
        }
    ]
});

createSubcommand("ttt", {
    name: "new",
    arguments: [
        {
            name: 'opponent',
            type: "member",
            missing: message => sendResponse(message, "you need a real discord member as an opponent :cry:")
        }
    ],
    execute: function (message, args) {
        const gameCollectionManager = new GameCollectionManager();
        const {opponent} = args;
        const opponentId = opponent.user.id;
        const requesterId = message.author.id;

        if (requesterId === opponentId) return sendResponse(message, "you cannot battle yourself, silly :rofl:");
        if (gameCollectionManager.isPlayerInGame(requesterId)) return sendResponse(message, "you are already in a game :frowning:");
        if (gameCollectionManager.isPlayerInGame(opponentId)) return sendMessage(message.channel, `${opponent.mention}, is already in a game :frowning:`);

        gameCollection.push(new GameInstance(requesterId, opponentId));

        const board = new Board();
        const embed = new Embed()
            .setDescription(
                `${opponent.mention}, you make the first move
                ${board.generateBoard()}`
            );

        return sendEmbed(message.channel, embed);
    }
})

createSubcommand("ttt", {
    name: "set",
    arguments: [
        {name: "playedId", type: "number", required: false},
        {name: "move", type: "string"}
    ],
    execute: (message, args) => {
        try {
            const gameCollectionManager = new GameCollectionManager();
            let requesterId = message.author.id;
            const {move, playedId} = args;

            if (playedId) {
                requesterId = playedId.toString();
            }

            const gameInstance = gameCollectionManager.getGameByPlayer(requesterId);

            if (!gameInstance) return sendResponse(message, "you are currently not in a game :open_mouth:");

            const requester = gameInstance.getPlayerById(requesterId);

            if (!gameInstance.isTurnOf(requester)) {
                return sendResponse(message, "it is not your turn :angry:");
            }

            if (!gameInstance.isMovePossible(move)) {
                return sendResponse(message, "invalid move :rolling_eyes:");
            }

            if (!gameInstance.isMoveUsed(move)) {
                return sendResponse(message, "move has already been used :rolling_eyes:");
            }

            gameInstance.setMove(move);
            // bepaal win conditie
            gameInstance.nextUser();

            const board = new Board(gameInstance);
            const embed = new Embed()
                .setDescription(
                    `<@!${gameInstance.currentTurn.id}>, you make the next move.
                    
                ${board.generateBoard()}`
                );

            return sendEmbed(message.channel, embed);
        } catch (e) {
            return sendMessage(message.channel,
                `I am malfunctioning beep boop burp :zany_face:: \`\`\`Reason: \n${e}\`\`\``
            );
        }
    }
})

createSubcommand("ttt", {
    name: "flush",
    execute: () => {
        gameCollection.splice(0, gameCollection.length)
    }
});

createSubcommand("ttt", {
    name: "games",
    execute: (message) => {
        console.log(gameCollection)
        console.log(gameCollection.toString())


        // sendMessage(message.channel, gameCollection.toString());
    }
});