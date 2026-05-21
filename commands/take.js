const config = require("../config");
const soldes = {};
module.exports = async (sock, msg, from, sender, mentioned) => {
    const t = mentioned[0];
    if (!t) return sock.sendMessage(from, { text: `❌ 𝑴𝒆𝒏𝒕𝒊𝒐𝒏𝒏𝒆𝒛 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏 !${config.signature}` });
    const amount = Math.floor(Math.random()*500)+50;
    if (!soldes[t]) soldes[t] = 1000;
    if (!soldes[sender]) soldes[sender] = 1000;
    soldes[sender] += amount;
    soldes[t] -= amount;
    await sock.sendMessage(from, { text: `💰 @${sender.split("@")[0]} 𝒗𝒐𝒍𝒆 *${amount}* 𝒑𝒐𝒊𝒏𝒕𝒔 à @${t.split("@")[0]} !💥${config.signature}`, mentions: [sender, t] });
};
