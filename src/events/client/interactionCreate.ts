import { Client, Interaction } from "discord.js";
import { DiscordTS } from "../../bot";
import { Command, Event } from "../../utils/types/types";

export default class InteractionEvent extends DiscordTS implements Event {

    public eventName: string = 'interactionCreate';
    public once: boolean = false;

    public trigger (client: Client, interaction: Interaction): any {
        if (interaction.isCommand()) {
            const cmd: Command | undefined = this.commandManager.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply(this.config.settings.client.commands.commandNotFoundMessage);
            cmd.run(client, interaction);
        }
    }
}