const config = require("../config");
module.exports = async (sock, msg, from) => {
    await sock.groupRevokeInvite(from);
    const code = await sock.groupInviteCode(from);
    await sock.sendMessage(from, { text: `🔄 ✅ 𝑳𝒊𝒆𝒏 𝒓é𝒊𝒏𝒊𝒕𝒊𝒂𝒍𝒊𝒔é !\n🔗 https://chat.whatsapp.com/${code}${config.signature}` });
};
