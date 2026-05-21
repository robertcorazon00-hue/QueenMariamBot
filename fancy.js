// ============================================
// 🎀 FANCY TEXTS - Queen Mariam MD 🎀
// ============================================

const BOLD = {
  botName:    "🎀👑𝙌𝙪𝙚𝙚𝙣 𝙈𝙖𝙧𝙞𝙖𝙢 𝙈𝘿🎀✨",
  madeBy:     "𝗿𝗼𝗯𝗲𝗿𝘁𝗰𝗼𝗿𝗮𝘇𝗼𝗻💥",
  signature:  "\n\n╰─❥ 🎀👑𝙌𝙪𝙚𝙚𝙣 𝙈𝙖𝙧𝙞𝙖𝙢 𝙈𝘿🎀✨\n      ✦ 𝑴𝒂𝒅𝒆 𝒃𝒚 𝗿𝗼𝗯𝗲𝗿𝘁𝗰𝗼𝗿𝗮𝘇𝗼𝗻💥 ✦",
};

// Textes stylisés réutilisables
const F = {
  line:    "═══════════════════════",
  line2:   "───────────────────────",
  dot:     "✦",
  star:    "✨",
  crown:   "👑",
  bow:     "🎀",
  check:   "✅",
  cross:   "❌",
  warn:    "⚠️",
  arrow:   "❥",
  diamond: "◈",
  flower:  "✿",
  music:   "𝄞",
  heart:   "❤️",
  sparkle: "⋆｡°✩",
};

// Header principal
const header = (title) =>
`╔${F.line}╗
║  ${F.bow}${F.crown} ${title} ${F.crown}${F.bow}
╚${F.line}╝`;

// Section header
const section = (emoji, title) =>
`\n${emoji} ⌜ 𝑴𝒆𝒏𝒖 ${title} ⌟`;

// Item de menu
const item = (cmd, desc) =>
`  ${F.diamond} ${cmd} ⟶ ${desc}`;

// Message de succès
const success = (msg) =>
`${F.check} 𝑺𝒖𝒄𝒄è𝒔 !\n\n${msg}`;

// Message d'erreur
const error = (msg) =>
`${F.cross} 𝑬𝒓𝒓𝒆𝒖𝒓 !\n\n${msg}`;

// Message admin only
const adminOnly = () =>
`${F.cross} 𝑹é𝒔𝒆𝒓𝒗é 𝒂𝒖𝒙 𝒂𝒅𝒎𝒊𝒏𝒔 !`;

// Message owner only
const ownerOnly = () =>
`${F.cross} 𝑹é𝒔𝒆𝒓𝒗é 𝒂𝒖 𝒑𝒓𝒐𝒑𝒓𝒊é𝒕𝒂𝒊𝒓𝒆 !`;

module.exports = { BOLD, F, header, section, item, success, error, adminOnly, ownerOnly };
