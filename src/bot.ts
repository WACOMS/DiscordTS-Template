import { Client, Collection } from 'discord.js';
import * as path from 'path';
import * as YAML from 'yamljs';
import { EventManager } from './utils/handlers/eventManager';
import { CommandManager } from './utils/handlers/commandManager';
import type { YAMLConfig } from './utils/types/types';

export class Bot {

    protected client: Client;
    protected config: YAMLConfig;
    protected eventManager: EventManager;
    protected commandManager: CommandManager;

    constructor () {
        this.client = new Client({ intents: 513 });
        this.config = YAML.load(path.resolve(__dirname, "config.yaml"));
        this.eventManager = new EventManager(this.client);
        this.commandManager = new CommandManager(this.config.app.loader.commandLoadedMessage);
    }

    public async start(): Promise<void> {
        await this.commandManager.loadCommands();
        await this.eventManager.loadEvents.bind(this)(this.eventManager);
        this.client.login(this.config.client.token);
    }
}