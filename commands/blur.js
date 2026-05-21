const config = require("../config");
const fs = require("fs");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);
module.exports = async (sock, msg, from) => {
    const imgMsg = msg.message?.imageMessage;
    if (!imgMsg) return sock.sendMessage(from, { text: `❌ 𝑬𝒏𝒗𝒐𝒚𝒆𝒛 𝒖𝒏𝒆 𝒊𝒎𝒂𝒈𝒆 𝒂𝒗𝒆𝒄 *.blur*${config.signature}` }, { quoted: msg });
    try {
        const stream = await sock.downloadMediaMessage(msg);
        const tmpIn = `/tmp/blur_in_${Date.now()}.jpg`;
        const tmpOut = `/tmp/blur_out_${Date.now()}.jpg`;
        fs.writeFileSync(tmpIn, stream);
        await execPromise(`ffmpeg -i ${tmpIn} -vf boxblur=10:1 ${tmpOut}`);
        await sock.sendMessage(from, { image: fs.readFileSync(tmpOut), caption: `✅ *𝑰𝒎𝒂𝒈𝒆 𝒇𝒍𝒐𝒖𝒕é𝒆 !*${config.signature}` });
        fs.unlinkSync(tmpIn); fs.unlinkSync(tmpOut);
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝒃𝒍𝒖𝒓 !${config.signature}` }); }
};
