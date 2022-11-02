import { Client, Interaction } from "discord.js";
import { Bot } from "../../bot";
import { Command, Event } from "../../utils/types/types";

export default class InteractionEvent extends Bot implements Event {

    public eventName: string = 'interactionCreate';
    public once: boolean = false;

    public async trigger (client: Client, interaction: Interaction): Promise<any> {
        if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
            const cmd: Command | undefined = this.commandManager.commands.get(interaction.commandName);
            if (interaction.isChatInputCommand()) {
                if (!cmd) return interaction.reply(this.config.client.commands.commandNotFoundMessage);
                cmd.run.bind(this)(client, interaction);
            } else {
                cmd?.onAutocomplete?.bind(this)(client, interaction);
            }
        }
    }
}