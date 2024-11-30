const { Telegraf } = require("telegraf");
require("dotenv").config();
const { apiUrl } = require("../data/urls.json")



const bot = new Telegraf(process.env.token)

bot.start((msg) => msg.reply("Welcome"))

bot.help((msg) => msg.reply("/exch sum from to - повертається курс з валюти from у валюті to"))


bot.command("exch", async (msg) => {
    const { text } = msg.message
    const [_, sum, from, to] = text.split(" ");
    const response = await fetch(`${apiUrl}/v6/${process.env.apiKey}/latest/${from}`)
    const { conversion_rates } = await response.json()

    msg.reply(sum * conversion_rates[to])
})

bot.launch(() => console.log("Start"))
