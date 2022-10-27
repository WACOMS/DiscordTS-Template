import { Client, Collection, Interaction } from "discord.js"

export type YAMLConfig = {
    settings: {
        client: {
            token: string,
            commands: {
                commandNotFoundMessage: string
            }
        },
        app: {
            readyMessage: string
        }
    }
};

export type TSClient<T extends Client> = {
    commands: typeof Collection
};

export interface Event {
    readonly eventName: string,
    readonly once: boolean,
    readonly trigger: (client: Client, ...args: any[]) => void
};

export interface Command {
    readonly name: string,
    readonly description: string,
    readonly run: (client: Client, interaction: Interaction) => void
}