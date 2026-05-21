const config = require("../config");
const fs = require("fs");
module.exports = async (sock, msg, from) => {
    const sp = config.botSongs[Math.floor(Math.random() * config.botSongs.length)];
    await sock.sendMessage(from, { text: `🎵 𝑬𝒏𝒗𝒐𝒊 𝒄𝒉𝒂𝒏𝒔𝒐𝒏 𝑸𝒖𝒆𝒆𝒏 𝑴𝒂𝒓𝒊𝒂𝒎...${config.signature}` }, { quoted: msg });
    if (fs.existsSync(sp)) await sock.sendMessage(from, { audio: fs.readFileSync(sp), mimetype: "audio/mpeg", ptt: false });
};
