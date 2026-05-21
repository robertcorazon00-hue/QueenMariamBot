const config = require("../config");
module.exports = async (sock, msg, from) => {
    const emojis = ["❤️","🔥","😂","😍","👑","✨","🎀","💕","🌟","💯"];
    const emoji = emojis[Math.floor(Math.random()*emojis.length)];
    await sock.sendMessage(from, { react: { text: emoji, key: msg.key } });
};
