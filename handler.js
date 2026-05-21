const config = require("./config");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// ✦ Charger toutes les commandes
const cmds = {};
const cmdDir = path.join(__dirname, "commands");
fs.readdirSync(cmdDir).filter(f => f.endsWith(".js")).forEach(f => {
    cmds[f.replace(".js","")] = require(path.join(cmdDir, f));
});

const db = { warns: {}, mariages: {} };
const sig = config.signature;
const isOwner = (jid) => jid.includes(config.ownerNumber);
const isAdmin = async (sock, gJid, uJid) => {
    try {
        const meta = await sock.groupMetadata(gJid);
        return meta.participants.find(p => p.id === uJid)?.admin != null;
    } catch { return false; }
};
const sendImg = async (sock, from, text, msg) => {
    const img = config.botImages[Math.floor(Math.random() * config.botImages.length)];
    if (fs.existsSync(img)) await sock.sendMessage(from, { image: fs.readFileSync(img), caption: text }, { quoted: msg });
    else await sock.sendMessage(from, { text }, { quoted: msg });
};

async function handleMessage(sock, msg) {
    try {
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || msg.message?.imageMessage?.caption || msg.message?.videoMessage?.caption || "";
        if (!body.startsWith(config.prefix)) return;

        const args = body.slice(config.prefix.length).trim().split(/\s+/);
        const cmd = args.shift().toLowerCase();
        const text = args.join(" ");
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const adminOnly = isGroup && !await isAdmin(sock, from, sender);

        console.log(`📨 𝑪𝒎𝒅: ${cmd} | 𝑫𝒆: ${sender.split("@")[0]}`);

        // ════════════ MENU ════════════
        if (cmd === "menu") {
            await sendImg(sock, from,
`╔══════════════════════════════╗
║  🎀👑 𝙌𝙪𝙚𝙚𝙣 𝙈𝙖𝙧𝙞𝙖𝙢 𝙈𝘿 🎀✨  ║
╚══════════════════════════════╝
⋆｡°✩ 𝑩𝒐𝒏𝒋𝒐𝒖𝒓 ! 𝑱𝒆 𝒔𝒖𝒊𝒔 𝒑𝒓ê𝒕 𝒑𝒐𝒖𝒓 𝒗𝒐𝒖𝒔 ✩°｡⋆

━━━━━ 📋 𝑮É𝑵É𝑹𝑨𝑳 ━━━━━
  ◈ .menu .ping .info .alive
  ◈ .uptime .groupe .groupinfo

━━━━━ 🎵 𝑴𝑼𝑺𝑰𝑸𝑼𝑬 & 𝑽𝑰𝑫É𝑶 ━━━━━
  ◈ .song .ytmp3 .ytmp4
  ◈ .tiktok .instagram .facebook .pinterest
  ◈ .sticker .blur .removbg .vv
  ◈ .img .ss .tourl .getpp

━━━━━ 🤖 𝑰𝑵𝑻𝑬𝑳𝑳𝑰𝑮𝑬𝑵𝑪𝑬 𝑨𝑹𝑻𝑰𝑭𝑰𝑪𝑰𝑬𝑳𝑳𝑬 ━━━━━
  ◈ .chatgpt .claude .deepseek
  ◈ .imagine .realism .github

━━━━━ ❤️ 𝑺𝑶𝑪𝑰𝑨𝑳 ━━━━━
  ◈ .mariage .divorce .câlin
  ◈ .gifle .bisou .ami .ennemi .ship

━━━━━ 🎮 𝑱𝑬𝑼𝑿 & 𝑭𝑼𝑵 ━━━━━
  ◈ .pies .pile .blague .trivia
  ◈ .character .take .react .jsencrypt

━━━━━ 👑 𝑨𝑫𝑴𝑰𝑵 𝑮𝑹𝑶𝑼𝑷𝑬 ━━━━━
  ◈ .kick .add .mute .unmute
  ◈ .tagall .hidetag .autotag
  ◈ .warn .promote .demote
  ◈ .promoteall .demoteall
  ◈ .dk4 .dk4all .kickdk4
  ◈ .antilink .antispam .antidelete .antimedia
  ◈ .resetlink .setpp .setprefix .topmember

━━━━━ ⚙️ 𝑷𝑹𝑶𝑷𝑹𝑰É𝑻𝑨𝑰𝑹𝑬 ━━━━━
  ◈ .broadcast .reboot
${sig}`, msg);
        }

        // ════════════ PING ════════════
        else if (cmd === "ping") {
            const ms = Date.now();
            await sock.sendMessage(from, { text: `🏓 𝑷𝑶𝑵𝑮 !\n⚡ *${Date.now()-ms}ms*\n✅ 𝑩𝒐𝒕 𝒂𝒄𝒕𝒊𝒇 !${sig}` }, { quoted: msg });
        }

        // ════════════ INFO ════════════
        else if (cmd === "info") {
            await sendImg(sock, from, `╔══════════════════════════════╗\n║  🎀👑 𝙌𝙪𝙚𝙚𝙣 𝙈𝙖𝙧𝙞𝙖𝙢 𝙈𝘿 🎀✨  ║\n╚══════════════════════════════╝\n◈ 🤖 ${config.botName}\n◈ 👨‍💻 ${config.madeBy}\n◈ ⚙️ 𝑷𝒓é𝒇𝒊𝒙𝒆: ${config.prefix}\n◈ 📱 +${config.ownerNumber}\n◈ 🔗 ${config.groupLink}${sig}`, msg);
        }

        // ════════════ GROUPE ════════════
        else if (cmd === "groupe" || cmd === "lien") {
            await sendImg(sock, from, `╔══════════════════════════════╗\n║  🔗 𝑮𝑹𝑶𝑼𝑷𝑬 𝑶𝑭𝑭𝑰𝑪𝑰𝑬𝑳 🔗\n╚══════════════════════════════╝\n👑 𝑹𝒆𝒋𝒐𝒊𝒈𝒏𝒆𝒛-𝒏𝒐𝒖𝒔 !\n🌐 ${config.groupLink}\n✨ 𝑵𝒐𝒖𝒔 𝒗𝒐𝒖𝒔 𝒂𝒕𝒕𝒆𝒏𝒅𝒐𝒏𝒔 🎉${sig}`, msg);
        }

        // ════════════ IA ════════════
        else if (["chatgpt","claude","ai","gpt4"].includes(cmd)) {
            if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .${cmd} 𝒒𝒖𝒊 𝒆𝒔𝒕 𝑬𝒊𝒏𝒔𝒕𝒆𝒊𝒏 ?${sig}` }, { quoted: msg });
            const label = {chatgpt:"🟡 𝑪𝒉𝒂𝒕𝑮𝑷𝑻", claude:"🔵 𝑪𝒍𝒂𝒖𝒅𝒆", ai:"🤖 𝑰𝑨", gpt4:"🟡 𝑮𝑷𝑻-𝟒"};
            await sock.sendMessage(from, { text: `${label[cmd]}\n❓ ${text}\n⏳ 𝑻𝒓𝒂𝒊𝒕𝒆𝒎𝒆𝒏𝒕...${sig}` }, { quoted: msg });
            try {
                const res = await axios.get(`https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(text)}`, { timeout: 25000 });
                const reply = res.data?.data || res.data?.result || "𝑷𝒂𝒔 𝒅𝒆 𝒓é𝒑𝒐𝒏𝒔𝒆.";
                await sock.sendMessage(from, { text: `╔══════════════════╗\n║ ${label[cmd]}\n╚══════════════════╝\n❓ *𝑸:* ${text}\n\n💬 *𝑹é𝒑𝒐𝒏𝒔𝒆:*\n${reply}${sig}` }, { quoted: msg });
            } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝑰𝑨 !${sig}` }, { quoted: msg }); }
        }

        // ════════════ SOCIAL ════════════
        else if (cmd === "mariage") {
            const t = mentioned[0];
            if (!t) return sock.sendMessage(from, { text: `❌ 𝑴𝒆𝒏𝒕𝒊𝒐𝒏𝒏𝒆𝒛 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏 !${sig}` });
            db.mariages[sender] = t;
            await sock.sendMessage(from, { text: `💍 @${sender.split("@")[0]} 𝒅𝒆𝒎𝒂𝒏𝒅𝒆 @${t.split("@")[0]} 𝒆𝒏 𝒎𝒂𝒓𝒊𝒂𝒈𝒆 !\n💌 𝑶𝑼𝑰 𝒐𝒖 𝑵𝑶𝑵 ?${sig}`, mentions: [sender,t] }, { quoted: msg });
        }
        else if (cmd === "divorce") {
            delete db.mariages[sender];
            await sock.sendMessage(from, { text: `💔 𝑫𝒊𝒗𝒐𝒓𝒄𝒆 𝒑𝒓𝒐𝒏𝒐𝒏𝒄é !${sig}` }, { quoted: msg });
        }
        else if (cmd === "câlin") {
            const t = mentioned[0]; if (!t) return sock.sendMessage(from, { text: `❌ 𝑴𝒆𝒏𝒕𝒊𝒐𝒏𝒏𝒆𝒛 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏 !${sig}` });
            await sock.sendMessage(from, { text: `🤗 @${sender.split("@")[0]} → 𝒄â𝒍𝒊𝒏 → @${t.split("@")[0]} 💕${sig}`, mentions: [sender,t] }, { quoted: msg });
        }
        else if (cmd === "gifle") {
            const t = mentioned[0]; if (!t) return sock.sendMessage(from, { text: `❌ 𝑴𝒆𝒏𝒕𝒊𝒐𝒏𝒏𝒆𝒛 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏 !${sig}` });
            await sock.sendMessage(from, { text: `👋 𝑷𝑨𝑭 ! @${sender.split("@")[0]} → 𝒈𝒊𝒇𝒍𝒆 → @${t.split("@")[0]} 😄${sig}`, mentions: [sender,t] }, { quoted: msg });
        }
        else if (cmd === "bisou") {
            const t = mentioned[0]; if (!t) return sock.sendMessage(from, { text: `❌ 𝑴𝒆𝒏𝒕𝒊𝒐𝒏𝒏𝒆𝒛 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏 !${sig}` });
            await sock.sendMessage(from, { text: `😘 @${sender.split("@")[0]} → 𝒃𝒊𝒔𝒐𝒖 → @${t.split("@")[0]} 💋${sig}`, mentions: [sender,t] }, { quoted: msg });
        }
        else if (cmd === "ami") {
            const t = mentioned[0]; if (!t) return sock.sendMessage(from, { text: `❌ 𝑴𝒆𝒏𝒕𝒊𝒐𝒏𝒏𝒆𝒛 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏 !${sig}` });
            await sock.sendMessage(from, { text: `🤝 @${sender.split("@")[0]} & @${t.split("@")[0]} 𝒔𝒐𝒏𝒕 𝒂𝒎𝒊𝒔 ! 💚${sig}`, mentions: [sender,t] }, { quoted: msg });
        }
        else if (cmd === "ennemi") {
            const t = mentioned[0]; if (!t) return sock.sendMessage(from, { text: `❌ 𝑴𝒆𝒏𝒕𝒊𝒐𝒏𝒏𝒆𝒛 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏 !${sig}` });
            await sock.sendMessage(from, { text: `⚔️ @${sender.split("@")[0]} ⚔️ @${t.split("@")[0]} 𝒆𝒔𝒕 𝒆𝒏𝒏𝒆𝒎𝒊 !${sig}`, mentions: [sender,t] }, { quoted: msg });
        }

        // ════════════ FUN ════════════
        else if (cmd === "pile") {
            await sock.sendMessage(from, { text: `🪙 *${Math.random()>.5?"𝑷𝑰𝑳𝑬":"𝑭𝑨𝑪𝑬"}*${sig}` }, { quoted: msg });
        }
        else if (cmd === "blague") {
            const b = ["𝑷𝒐𝒖𝒓𝒒𝒖𝒐𝒊 𝒍𝒆𝒔 𝒑𝒍𝒐𝒏𝒈𝒆𝒖𝒓𝒔 𝒑𝒍𝒐𝒏𝒈𝒆𝒏𝒕 𝒆𝒏 𝒂𝒓𝒓𝒊è𝒓𝒆 ? 𝑺𝒊𝒏𝒐𝒏 𝒊𝒍𝒔 𝒕𝒐𝒎𝒃𝒆𝒓𝒂𝒊𝒆𝒏𝒕 𝒅𝒂𝒏𝒔 𝒍𝒆 𝒃𝒂𝒕𝒆𝒂𝒖 ! 😄","𝑸𝒖'𝒆𝒔𝒕-𝒄𝒆 𝒒𝒖'𝒖𝒏 𝒄𝒂𝒏𝒊𝒇 ? 𝑼𝒏 𝒑𝒆𝒕𝒊𝒕 𝒇𝒊𝒆𝒏 ! 😂","𝑸𝒖'𝒆𝒔𝒕-𝒄𝒆 𝒒𝒖'𝒖𝒏 𝒄𝒓𝒐𝒄𝒐𝒅𝒊𝒍𝒆 ? 𝑼𝒏 𝒔𝒂𝒄 à 𝒅𝒆𝒏𝒕𝒔 ! 😆","𝑷𝒐𝒖𝒓𝒒𝒖𝒐𝒊 𝑺𝒖𝒑𝒆𝒓𝒎𝒂𝒏 𝒑𝒐𝒓𝒕𝒆 𝒔𝒐𝒏 𝒔𝒍𝒊𝒑 𝒑𝒂𝒓-𝒅𝒆𝒔𝒔𝒖𝒔 ? 𝑷𝒐𝒖𝒓 𝒍𝒆𝒔 𝒗𝒆𝒏𝒕𝒐𝒖𝒔𝒆𝒔 ! 🤣"];
            await sock.sendMessage(from, { text: `😂 *𝑩𝒍𝒂𝒈𝒖𝒆*\n\n${b[Math.floor(Math.random()*b.length)]}${sig}` }, { quoted: msg });
        }

        // ════════════ ADMIN ════════════
        else if (cmd === "warn") {
            if (!isGroup || adminOnly) return sock.sendMessage(from, { text: `❌ 𝑨𝒅𝒎𝒊𝒏𝒔 𝒔𝒆𝒖𝒍𝒆𝒎𝒆𝒏𝒕 !${sig}` });
            const t = mentioned[0]; if (!t) return;
            if (!db.warns[t]) db.warns[t] = 0;
            db.warns[t]++;
            if (db.warns[t] >= config.maxWarn) {
                await sock.groupParticipantsUpdate(from, [t], "remove");
                await sock.sendMessage(from, { text: `🚫 @${t.split("@")[0]} 𝒃𝒂𝒏𝒏𝒊 (${db.warns[t]}/${config.maxWarn} 𝒂𝒗𝒆𝒓𝒕.) !${sig}`, mentions: [t] });
                db.warns[t] = 0;
            } else {
                await sock.sendMessage(from, { text: `⚠️ 𝑨𝒗𝒆𝒓𝒕𝒊𝒔𝒔𝒆𝒎𝒆𝒏𝒕 *${db.warns[t]}/${config.maxWarn}* @${t.split("@")[0]}${sig}`, mentions: [t] });
            }
        }

        // ════════════ OWNER ════════════
        else if (cmd === "broadcast") {
            if (!isOwner(sender)) return sock.sendMessage(from, { text: `❌ 𝑷𝒓𝒐𝒑𝒓𝒊é𝒕𝒂𝒊𝒓𝒆 𝒔𝒆𝒖𝒍𝒆𝒎𝒆𝒏𝒕 !${sig}` });
            await sock.sendMessage(from, { text: `📣 *𝑩𝑹𝑶𝑨𝑫𝑪𝑨𝑺𝑻*\n\n${text}${sig}` });
        }
        else if (cmd === "reboot") {
            if (!isOwner(sender)) return sock.sendMessage(from, { text: `❌ 𝑷𝒓𝒐𝒑𝒓𝒊é𝒕𝒂𝒊𝒓𝒆 𝒔𝒆𝒖𝒍𝒆𝒎𝒆𝒏𝒕 !${sig}` });
            await sock.sendMessage(from, { text: `🔄 *𝑹𝒆𝒅é𝒎𝒂𝒓𝒓𝒂𝒈𝒆...*${sig}` });
            setTimeout(() => process.exit(0), 2000);
        }

        // ════════════ COMMANDES MODULES ════════════
        else if (cmds[cmd]) {
            // Vérif admin si nécessaire
            const adminCmds = ["kick","add","mute","unmute","tagall","hidetag","autotag","promote","demote","promoteall","demoteall","dk4","dk4all","kickdk4","antilink","antispam","antidelete","antimedia","resetlink","setpp","setprefix","topmember"];
            if (adminCmds.includes(cmd) && isGroup && adminOnly) return sock.sendMessage(from, { text: `❌ 𝑨𝒅𝒎𝒊𝒏𝒔 𝒔𝒆𝒖𝒍𝒆𝒎𝒆𝒏𝒕 !${sig}` });
            await cmds[cmd](sock, msg, from, text || sender, mentioned);
        }

        // ════════════ INCONNU ════════════
        else {
            await sock.sendMessage(from, { text: `❌ 𝑪𝒐𝒎𝒎𝒂𝒏𝒅𝒆 *${cmd}* 𝒊𝒏𝒄𝒐𝒏𝒏𝒖𝒆 !\n✨ 𝑻𝒂𝒑𝒆𝒛 *.menu*${sig}` }, { quoted: msg });
        }

    } catch (err) {
        console.error("❌ 𝑬𝒓𝒓𝒆𝒖𝒓:", err.message);
    }
}

module.exports = { handleMessage };
