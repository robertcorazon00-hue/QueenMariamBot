const config = require("../config");
const fs = require("fs");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);
module.exports = async (sock, msg, from) => {
    const imgMsg = msg.message?.imageMessage || msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;
    if (!imgMsg) return sock.sendMessage(from, { text: `❌ 𝑬𝒏𝒗𝒐𝒚𝒆𝒛 𝒖𝒏𝒆 𝒊𝒎𝒂𝒈𝒆 𝒂𝒗𝒆𝒄 *.sticker*${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `⏳ 𝑪𝒓é𝒂𝒕𝒊𝒐𝒏 𝒔𝒕𝒊𝒄𝒌𝒆𝒓...${config.signature}` }, { quoted: msg });
    try {
        const stream = await sock.downloadMediaMessage(msg);
        const tmpIn = `/tmp/sin_${Date.now()}.jpg`;
        const tmpOut = `/tmp/sout_${Date.now()}.webp`;
        fs.writeFileSync(tmpIn, stream);
        await execPromise(`ffmpeg -i ${tmpIn} -vf scale=512:512 ${tmpOut}`);
        await sock.sendMessage(from, { sticker: fs.readFileSync(tmpOut) });
        fs.unlinkSync(tmpIn); fs.unlinkSync(tmpOut);
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝒔𝒕𝒊𝒄𝒌𝒆𝒓 ! 𝑰𝒏𝒔𝒕𝒂𝒍𝒍𝒆𝒛 ffmpeg.${config.signature}` }); }
};
