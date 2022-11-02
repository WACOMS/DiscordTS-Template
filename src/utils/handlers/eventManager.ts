import { Event } from "../types/types";
import { glob } from 'glob';
import { promisify } from "util";
import { Client } from "discord.js";
import { Bot } from "../../bot";
const pGlob = promisify(glob);

export class EventManager {

    private client: Client;

    constructor (client: Client) {
        this.client = client;
    }

    public async loadEvents (this: Bot, eventManager: EventManager): Promise<void> {
        (await pGlob(`${process.cwd()}/build/events/*/*.js`)).map(async (eventFile: string) => {
            const event: Event =  new(require(eventFile).default);
            eventManager.registerEvent.bind(this)(event);
        });
    }

    public registerEvent (this: Bot, event: Event): void {
        if (event.once) {
            this.client.once(event.eventName, (...args: unknown[]) => event.trigger.bind(this)(this.client, ...args));
        } else {
            this.client.on(event.eventName, (...args: unknown[]) => event.trigger.bind(this)(this.client, ...args));
        }
    }
}