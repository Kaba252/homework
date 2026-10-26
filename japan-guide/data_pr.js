(function () {
  const PR_URL = "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00046.html";
  window.GUIDE_ITEMS.push(
    { id: "pr_basic", cat: "permanent", title: "永住许可:了解条件", due: { type: "text", text: "入境后尽早规划" },
      what: "一般条件:素行善良、有独立生计、对日本有利(税金、年金、保险按期缴纳)。原则上居住10年以上且就劳资格5年以上,并持当前最长在留期限。日本人/永住者配偶、高度人才等可缩短。近年对税、年金、社保缴纳审查趋严,请保留记录。",
      docs: ["纳税/课税证明", "年金记录", "雇佣证明"], where: "出入国在留管理局", official: PR_URL, cond: p => p.status !== "permanent" },
    { id: "pr_hsp", cat: "permanent", title: "高度人才:最快1~3年永住", due: { type: "text", text: "80分约1年;70分约3年" },
      what: "高度专门职积分达70分(3年)或80分(1年)可申请永住,需提供积分计算表及证明。",
      docs: ["积分计算表", "学历/职历/年收入证明"], where: "出入国在留管理局", official: PR_URL, cond: p => ["hsp", "engineer", "business"].includes(p.status) },
    { id: "pr_spouse", cat: "permanent", title: "日本人/永住者配偶:缩短年限", due: { type: "text", text: "婚姻满3年且在日满1年" },
      what: "实际婚姻3年以上且在日居住1年以上即可申请永住。",
      docs: ["婚姻证明", "住民票", "课税证明"], where: "出入国在留管理局", official: PR_URL, cond: p => p.status === "spouse" },
    { id: "pr_records", cat: "permanent", title: "为永住积累记录", due: { type: "text", text: "每年检查" },
      what: "定期在「ねんきんネット」「マイナポータル」确认缴纳记录;换工作时避免社保/年金断档,避免漏缴、迟缴。",
      docs: ["ねんきんネット账户"], where: "ねんきんネット / マイナポータル", official: "https://www.nenkin.go.jp/n_net/", cond: p => p.status !== "permanent" },
    { id: "pr_naturalize", cat: "permanent", title: "(可选)归化为日本国籍", due: { type: "text", text: "通常在日居住5年以上" },
      what: "通常要求连续居住5年以上、有正当职业、品行良好,并放弃原国籍(日本不承认双重国籍)。向法务局申请,材料多、耗时长。",
      docs: ["各类证明材料"], where: "法务局", official: "https://www.moj.go.jp/MINJI/minji78.html", cond: () => true },
    { id: "pr_after", cat: "permanent", title: "取得永住后的义务", due: { type: "text", text: "取得后" },
      what: "永住者在留卡有效期为7年,须到期前更新卡片;重大违法、不缴税/年金可能影响资格。",
      docs: [], where: "出入国在留管理局", official: "", cond: p => p.status === "permanent" },
    { id: "plan_leave", cat: "permanent", title: "回国/离开日本清单", due: { type: "text", text: "离开前1个月起" },
      what: "迁出届、解约水电煤、手机/网络、银行、国保/年金脱退手续、住民税清算、退房与押金返还。",
      docs: ["在留卡"], where: "各机构 / 市区町村", official: "", cond: p => p.plan !== "settle" }
  );
})();
