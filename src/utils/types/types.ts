import { ApplicationCommandOptionChoiceData, ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction, Client } from "discord.js"
import { Bot } from "../../bot";

export type YAMLConfig = {
    client: {
        token: string,
    },
    app: {
        readyMessage: string,
        loader: {
            commandLoadedMessage: string
        }
    }
};

export interface Event {
    readonly eventName: string,
    readonly once: boolean,
    readonly trigger: (client: Client, ...args: any[]) => void
};

export interface Command {
    readonly name: string,
    readonly description: string,
    readonly permissions: bigint | null,
    readonly usage: string,
    category?: string,
    readonly run: (client: Client, interaction: ChatInputCommandInteraction) => void
    readonly onAutocomplete?: (this: Bot, client: Client, interaction: AutocompleteInteraction) => Promise<void>
};

export type SlashOptions = [{
    readonly name: string,
    readonly description: string,
    readonly type: ApplicationCommandOptionType,
    readonly required: boolean,
    readonly choices?: ApplicationCommandOptionChoiceData[],
    readonly autocomplete?: boolean
    readonly minValue?: number,
    readonly maxValue?: number,
    readonly minLength?: number,
    readonly maxLength?: number
}];

export const categoryName = {
    'utils': 'Utilitaires'
};