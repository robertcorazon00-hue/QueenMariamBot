const config = require("../config");
const axios = require("axios");
const FormData = require("form-data");
module.exports = async (sock, msg, from) => {
    const media = msg.message?.imageMessage || msg.message?.videoMessage || msg.message?.audioMessage;
    if (!media) return sock.sendMessage(from, { text: `❌ 𝑬𝒏𝒗𝒐𝒚𝒆𝒛 𝒖𝒏 𝒇𝒊𝒄𝒉𝒊𝒆𝒓 𝒂𝒗𝒆𝒄 *.tourl*${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `⏳ 𝑪𝒐𝒏𝒗𝒆𝒓𝒔𝒊𝒐𝒏 𝒆𝒏 𝒍𝒊𝒆𝒏...${config.signature}` }, { quoted: msg });
    try {
        const stream = await sock.downloadMediaMessage(msg);
        const form = new FormData();
        form.append("file", stream, "file.bin");
        const res = await axios.post("https://api.siputzx.my.id/api/tools/upload", form, { headers: form.getHeaders(), timeout: 30000 });
        const url = res.data?.url || res.data?.data?.url;
        await sock.sendMessage(from, { text: `✅ *𝑳𝒊𝒆𝒏 𝒈é𝒏é𝒓é !*\n🔗 ${url}${config.signature}` });
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝒄𝒐𝒏𝒗𝒆𝒓𝒔𝒊𝒐𝒏 !${config.signature}` }); }
};
