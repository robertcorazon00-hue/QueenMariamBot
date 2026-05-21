const config = require("../config");
const fs = require("fs");
module.exports = async (sock, msg, from) => {
    const img = config.botImages[Math.floor(Math.random() * config.botImages.length)];
    const text = `╔══════════════════════════════╗\n║  💫 𝑱𝒆 𝒔𝒖𝒊𝒔 𝒆𝒏 𝒗𝒊𝒆 ! 💫\n╚══════════════════════════════╝\n🌟 𝙌𝙪𝙚𝙚𝙣 𝙈𝙖𝙧𝙞𝙖𝙢 𝙈𝘿 𝒆𝒔𝒕 𝒂𝒄𝒕𝒊𝒇 !\n⚡ 𝑫𝒊𝒔𝒑𝒐𝒏𝒊𝒃𝒍𝒆 𝟐𝟒/𝟕 🕐\n✨ 𝑻𝒂𝒑𝒆𝒛 .menu 𝒑𝒐𝒖𝒓 𝒍𝒆𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒆𝒔${config.signature}`;
    if (fs.existsSync(img)) await sock.sendMessage(from, { image: fs.readFileSync(img), caption: text }, { quoted: msg });
    else await sock.sendMessage(from, { text }, { quoted: msg });
};
