import { Client, Interaction } from "discord.js";
import { Command } from "../../utils/types/types";

export default class Ping implements Command {

    public name: string = 'ping';
    public description: string = "Commande de ping";

    public run (client: Client, interaction: Interaction): any {
        console.log("Dans la commande ping");
        if (interaction.isRepliable()) {
            interaction.reply('Pong !');
        }
    }
}