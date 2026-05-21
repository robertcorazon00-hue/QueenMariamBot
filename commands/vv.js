const config = require("../config");
module.exports = async (sock, msg, from) => {
    try {
        const viewOnce = msg.message?.viewOnceMessage?.message || msg.message?.viewOnceMessageV2?.message;
        if (!viewOnce) return sock.sendMessage(from, { text: `👁️ 𝑬𝒏𝒗𝒐𝒚𝒆𝒛 𝒖𝒏 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒗𝒖𝒆 𝒖𝒏𝒊𝒒𝒖𝒆 !${config.signature}` });
        const stream = await sock.downloadMediaMessage({ message: viewOnce });
        const isVideo = !!viewOnce.videoMessage;
        if (isVideo) await sock.sendMessage(from, { video: stream, mimetype: "video/mp4", caption: `👁️ *𝑽𝑼𝑬 𝑼𝑵𝑰𝑸𝑼𝑬* 𝒔𝒂𝒖𝒗𝒆𝒈𝒂𝒓𝒅é𝒆 !${config.signature}` });
        else await sock.sendMessage(from, { image: stream, caption: `👁️ *𝑽𝑼𝑬 𝑼𝑵𝑰𝑸𝑼𝑬* 𝒔𝒂𝒖𝒗𝒆𝒈𝒂𝒓𝒅é𝒆 !${config.signature}` });
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝑽𝑽 !${config.signature}` }); }
};
