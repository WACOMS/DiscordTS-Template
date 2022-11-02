import { Bot } from "./bot";

process.on('exit', code => { console.error(`The process stopped with the following code:\n${code}`) });
process.on('uncaughtException', (err, origin) => { console.log((`UNCAUGHT_EXCEPTION: ${err}`), `Origin: ${origin}`) });
process.on('unhandledRejection', (reason, promise) => { console.error(`UNHANDLED_REJECTION: ${reason}\n------------\n`, promise) });
process.on('warning', (...args) => console.warn(...args));

const bot: Bot = new Bot();
bot.start();

// TODO: help.ts command not found message
// TODO: index.ts process on messages