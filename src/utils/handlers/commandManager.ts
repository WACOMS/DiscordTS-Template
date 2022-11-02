import { categoryName, Command } from "../types/types";
import { glob } from 'glob';
import { promisify } from "util";
import { Collection } from "discord.js";
const pGlob = promisify(glob);

export class CommandManager {

    public commands: Collection<string, Command>;
    private onCommandLoadedMessage: string;

    constructor (onCommandLoadedMessage: string) {
        this.commands = new Collection();
        this.onCommandLoadedMessage = onCommandLoadedMessage;
    }

    public async loadCommands(): Promise<void> {
        (await pGlob(`${process.cwd()}/build/commands/*/*.js`)).map(cmdFile => {
            const command: Command = new(require(cmdFile).default);
            const commandCategory = cmdFile.split("/").at(-2) as keyof typeof categoryName;            
            command.category = categoryName[commandCategory];
            this.registerCommand(command);
        });
    }

    public registerCommand (command: Command): void {
        this.commands.set(command.name, command);
        console.log(this.onCommandLoadedMessage.replace('{name}', command.name));
    }

    public getLoadedCommandByName (commandName: string): Command | undefined {
        return this.commands.filter(cmd => cmd.name === commandName).first();
    }

    public getLoadedCommands (): Command[] {
        return [...this.commands.map(cmd => cmd)];
    }
}