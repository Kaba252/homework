// 手续数据核心:元信息、分类、条件辅助函数。
// 每个条目: id, cat, title, due, what, docs[], where, official, cond(profile)
// due: {type:'arrival', days:N} = 入境/搬入后N天内; {type:'expiry', days:-N} = 在留期限前N天; {type:'text', text}
// 注意:法规与各市区町村做法会变化,请以官方信息为准。
window.GUIDE_META = {
  updated: "2026-10",
  disclaimer: "本工具仅为一般性信息整理,不构成法律意见。具体请以出入国在留管理厅、各市区町村窗口、年金事务所及税务署的最新说明为准,复杂情况请咨询行政书士/税理士。"
};
window.GUIDE_CATEGORIES = [
  { key: "identity", name: "身份·在留", icon: "🪪" },
  { key: "housing", name: "住", icon: "🏠" },
  { key: "life", name: "衣食·生活", icon: "🍱" },
  { key: "transport", name: "行", icon: "🚆" },
  { key: "insurance", name: "保险", icon: "🛡️" },
  { key: "pension", name: "年金", icon: "💴" },
  { key: "tax", name: "税·源泉", icon: "🧾" },
  { key: "medical", name: "医疗", icon: "🏥" },
  { key: "permanent", name: "永住·长期规划", icon: "🌸" }
];
window.GUIDE_ITEMS = [];
window.G = {
  employed: p => p.employment === "employee",
  notEmployed: p => p.employment !== "employee",
  agePension: p => p.age >= 20 && p.age < 60,
  midLong: p => p.status !== "short"
};
