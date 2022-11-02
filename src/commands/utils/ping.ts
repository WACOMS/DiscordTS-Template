import { ChatInputCommandInteraction, Client } from "discord.js";
import { Bot } from "../../bot";
import { Command } from "../../utils/types/types";

export default class Ping implements Command {

    public name: string = 'ping';
    public description: string = "Commande de ping";
    public permissions: bigint | null = null;
    public usage: string = "";

    public async run (this: Bot, client: Client, interaction: ChatInputCommandInteraction): Promise<void> {
        const pingReply = await interaction.reply({ content: '_Calcul en cours..._', fetchReply: true });
        await pingReply.edit(`Latence du bot : \`${pingReply.createdTimestamp - interaction.createdTimestamp}ms\`, Websocket Latency: \`${client.ws.ping}ms\``);
    }
}