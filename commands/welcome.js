const config = require("../config");
module.exports = async (sock, msg, from, participant) => {
    const img = config.botImages[Math.floor(Math.random() * config.botImages.length)];
    const text = `╔══════════════════════╗\n║  🎀 𝑩𝑰𝑬𝑵𝑽𝑬𝑵𝑼𝑬 ! 🎀\n╚══════════════════════╝\n✨ 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒖(𝒆) @${participant.split("@")[0]} !\n👑 𝑵𝒐𝒖𝒔 𝒔𝒐𝒎𝒎𝒆𝒔 𝒉𝒆𝒖𝒓𝒆𝒖𝒙 𝒅𝒆 𝒕'𝒂𝒗𝒐𝒊𝒓 !\n✨ 𝑻𝒂𝒑𝒆 .menu 𝒑𝒐𝒖𝒓 𝒍𝒆𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒆𝒔${config.signature}`;
    const fs = require("fs");
    if (fs.existsSync(img)) await sock.sendMessage(from, { image: fs.readFileSync(img), caption: text, mentions: [participant] });
    else await sock.sendMessage(from, { text, mentions: [participant] });
};
