const config = require("../config");
module.exports = async (sock, msg, from, mentioned) => {
    const t = mentioned[0] || msg.key.remoteJid;
    try {
        const pp = await sock.profilePictureUrl(t, "image");
        const axios = require("axios");
        const res = await axios.get(pp, { responseType: "arraybuffer" });
        await sock.sendMessage(from, { image: Buffer.from(res.data), caption: `📸 *𝑷𝒉𝒐𝒕𝒐 𝒅𝒆 𝒑𝒓𝒐𝒇𝒊𝒍*\n@${t.split("@")[0]}${config.signature}`, mentions: [t] });
    } catch { await sock.sendMessage(from, { text: `❌ 𝑷𝒂𝒔 𝒅𝒆 𝒑𝒉𝒐𝒕𝒐 𝒅𝒆 𝒑𝒓𝒐𝒇𝒊𝒍 !${config.signature}` }); }
};
