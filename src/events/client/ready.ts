import { Client } from 'discord.js';
import { DiscordTS } from '../../bot';
import { Event } from "../../utils/types/types";

export default class Ready implements Event {
    
    public eventName: string = "ready";
    public once: boolean = true;

    public async trigger (this: DiscordTS, client: Client): Promise<void> {
        const devGuild = await client.guilds.cache.get('1011735684995874876');
        devGuild?.commands.set(this.commandManager.commands.map(cmd => cmd));
        console.log(this.config.settings.app.readyMessage);
    }
}