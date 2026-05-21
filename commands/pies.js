const config = require("../config");
module.exports = async (sock, msg, from) => {
    const r = Math.floor(Math.random()*6)+1;
    const e = ["⚀","⚁","⚂","⚃","⚄","⚅"];
    await sock.sendMessage(from, { text: `🎲 *𝑫É*\n\n${e[r-1]} 𝑹é𝒔𝒖𝒍𝒕𝒂𝒕 : *${r}*${config.signature}` }, { quoted: msg });
};
