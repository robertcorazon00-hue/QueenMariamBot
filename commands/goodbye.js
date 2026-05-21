const config = require("../config");
module.exports = async (sock, from, participant) => {
    await sock.sendMessage(from, { text: `👋 𝑨𝒖 𝒓𝒆𝒗𝒐𝒊𝒓 @${participant.split("@")[0]} ! 😢\n𝑵𝒐𝒖𝒔 𝒕𝒆 𝒓𝒆𝒈𝒓𝒆𝒕𝒕𝒐𝒏𝒔 💔${config.signature}`, mentions: [participant] });
};
