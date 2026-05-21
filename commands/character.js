const config = require("../config");
const chars = ["🧝 𝑬𝒍𝒇𝒆","🧙 𝑺𝒐𝒓𝒄𝒊𝒆𝒓","🦸 𝑺𝒖𝒑𝒆𝒓𝒉é𝒓𝒐𝒔","🧛 𝑽𝒂𝒎𝒑𝒊𝒓𝒆","🧜 𝑺𝒊𝒓è𝒏𝒆","🦊 𝑹𝒆𝒏𝒂𝒓𝒅","🐉 𝑫𝒓𝒂𝒈𝒐𝒏","👸 𝑷𝒓𝒊𝒏𝒄𝒆𝒔𝒔𝒆","🤴 𝑷𝒓𝒊𝒏𝒄𝒆","🦅 𝑮𝒖𝒆𝒓𝒓𝒊𝒆𝒓"];
module.exports = async (sock, msg, from) => {
    await sock.sendMessage(from, { text: `🎭 *𝑷𝑬𝑹𝑺𝑶𝑵𝑵𝑨𝑮𝑬 𝑨𝑳É𝑨𝑻𝑶𝑰𝑹𝑬*\n\n${chars[Math.floor(Math.random()*chars.length)]}${config.signature}` }, { quoted: msg });
};
