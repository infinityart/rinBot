import {botCache} from "../../mod.ts";
import {
    cache,
    logger,
    editBotsStatus,
} from "../../deps.ts";
import {configs} from "../../configs.ts";

botCache.eventHandlers.ready = function () {
    editBotsStatus(
        configs.botStatus,
        configs.botStatusText,
        configs.botStatusType,
    );

    logger.info(`Loaded ${botCache.arguments.size} Argument(s)`);
    logger.info(`Loaded ${botCache.commands.size} Command(s)`);
    logger.info(`Loaded ${Object.keys(botCache.eventHandlers).length} Event(s)`);
    logger.info(`Loaded ${botCache.inhibitors.size} Inhibitor(s)`);
    logger.info(`Loaded ${botCache.monitors.size} Monitor(s)`);
    logger.info(`Loaded ${botCache.tasks.size} Task(s)`);

    for (const task of botCache.tasks.values()) {
        setInterval(() => task.execute(), task.interval);
    }

    logger.success(
        `[READY] Bot is online and ready in ${cache.guilds.size} guild(s)!`,
    );
};
