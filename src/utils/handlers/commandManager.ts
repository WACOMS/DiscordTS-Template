import { Command } from "../types/types";
import { glob } from 'glob';
import { promisify } from "util";
import { Collection } from "discord.js";
const pGlob = promisify(glob);

export class CommandManager {

    public commands: Collection<string, Command>;

    constructor () {
        this.commands = new Collection();
    }

    public async loadCommands(): Promise<void> {
        (await pGlob(`${process.cwd()}/build/commands/*/*.js`)).map(async cmdFile => {
            const command: Command = new(require(cmdFile).default);
            this.registerCommand(command);
        });
    }

    public registerCommand(command: Command): void {
        this.commands.set(command.name, command);
    }
}