const config = require("../config");
module.exports = async (sock, msg, from) => {
    try {
        const stream = await sock.downloadMediaMessage(msg);
        await sock.updateProfilePicture(from, stream);
        await sock.sendMessage(from, { text: `✅ 𝑷𝒉𝒐𝒕𝒐 𝒅𝒖 𝒈𝒓𝒐𝒖𝒑𝒆 𝒎𝒊𝒔𝒆 à 𝒋𝒐𝒖𝒓 !${config.signature}` });
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒏𝒗𝒐𝒚𝒆𝒛 𝒖𝒏𝒆 𝒊𝒎𝒂𝒈𝒆 𝒂𝒗𝒆𝒄 .setpp !${config.signature}` }); }
};
