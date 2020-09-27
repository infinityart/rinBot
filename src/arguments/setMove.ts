import {botCache} from "../../mod.ts";

botCache.arguments.set("possibleMoves", {
    name: "possibleMoves",
    execute: function (_argument, parameters) {
        const [move] = parameters;
        const y = ["1", "2", "3"];
        const x = ["a", "b", "c"];
        const possibleMoves = x.flatMap(xItem => y.map(yItem => xItem + yItem));

        return possibleMoves.includes(move)
    },
});
