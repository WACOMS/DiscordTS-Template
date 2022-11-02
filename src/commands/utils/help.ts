import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction, Client, Colors, EmbedBuilder } from "discord.js";
import { Bot } from "../../bot";
import { Command, SlashOptions } from "../../utils/types/types";

export default class Help implements Command {

    public name: string = 'help';
    public description: string = "Commande d'aide";
    public permissions: bigint | null = null;
    public usage: string = "<command_name>";

    public options: SlashOptions = [{
        name: 'command_name',
        description: 'Nom de la commande',
        type: ApplicationCommandOptionType.String,
        required: false,
        autocomplete: true
    }];

    public run (this: Bot, client: Client, interaction: ChatInputCommandInteraction): void | Promise<any> {
        const selectedCommandName: string | undefined = interaction.options.get('command_name')?.value as string | undefined;
        const embed = new EmbedBuilder()
            .setColor(Colors.Gold)
            .setTimestamp()
            .setFooter({
                text: this.client.user?.username as string,
                iconURL: this.client.user?.displayAvatarURL()
            });

        if (typeof selectedCommandName === 'string') {
            const selectedCommand: Command | undefined = this.commandManager.getLoadedCommandByName(selectedCommandName);
            if (selectedCommand) {
                if (selectedCommand.permissions && !interaction.memberPermissions?.has(selectedCommand.permissions)) return interaction.reply({
                    content: `Accès à la commande ${selectedCommandName} refusé ! (Permission manquante)`,
                    ephemeral: true
                });
                embed.setTitle(`Aide » ${selectedCommandName}`)
                    .addFields({
                        name: 'Nom',
                        value: selectedCommandName,
                        inline: true
                    }, {
                        name: 'Description',
                        value: selectedCommand.description,
                        inline: true
                    }, {
                        name: 'Usage',
                        value: `*/${selectedCommand.name}* ${selectedCommand.usage}`,
                        inline: true
                    }); 
            } else {
                return interaction.reply({
                    content: `Commande ${selectedCommandName} introuvable !`,
                    ephemeral: true
                });
            }
        } else {
            embed.setTitle(":grey_question: » Liste des commandes")
                .setDescription("Tapez `/help` suivi du nom de la commande afin d'obtenir des informations supplémentaires sur la commande. Par exemple : `/help ping`.");
            const commandsList: {[key: string]: string[]} = {};
            this.commandManager.getLoadedCommands().forEach(cmd => {
                if (cmd.permissions === null || interaction.memberPermissions?.has(cmd.permissions)) {
                    if (cmd.category) {
                        if (!commandsList[cmd.category]) {
                            commandsList[cmd.category] = [];
                        }
                        commandsList[cmd.category].push(`\`${cmd.name}\``);
                    }
                }
            });
            for (const category of Object.keys(commandsList)) {
                embed.addFields({
                    name: category,
                    value: commandsList[category].join(' ')
                });
            }
        }
        interaction.reply({ embeds: [embed] });
    }

    public async onAutocomplete (this: Bot, client: Client, interaction: AutocompleteInteraction): Promise<void> {
        const choices: string[] = [];
        this.commandManager.getLoadedCommands().forEach(cmd => {
            if (cmd.permissions === null || interaction.memberPermissions?.has(cmd.permissions)) {
                choices.push(cmd.name);
            }
        });
        const focusedOption = interaction.options.getFocused(true);
        const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice }))
        );
    }
}