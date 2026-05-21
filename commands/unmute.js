const config = require("../config");
module.exports = async (sock, msg, from) => {
    await sock.groupSettingUpdate(from, "not_announcement");
    await sock.sendMessage(from, { text: `🔊 *𝑮𝒓𝒐𝒖𝒑𝒆 𝒐𝒖𝒗𝒆𝒓𝒕 !*\n𝑻𝒐𝒖𝒕 𝒍𝒆 𝒎𝒐𝒏𝒅𝒆 𝒑𝒆𝒖𝒕 é𝒄𝒓𝒊𝒓𝒆.${config.signature}` });
};
