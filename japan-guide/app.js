(function () {
  const $ = id => document.getElementById(id);
  const KEY = "japan-guide-v1";
  const state = JSON.parse(localStorage.getItem(KEY) || "{}");
  state.profile = state.profile || null;
  state.done = state.done || {};
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));

  const FIELDS = ["status", "employment", "age", "arrival", "expiry", "plan"];
  const BOOLS = ["spouse", "children", "drive", "car"];

  function readProfile() {
    const p = {};
    FIELDS.forEach(f => (p[f] = $(f).value));
    p.age = parseInt(p.age, 10) || 0;
    BOOLS.forEach(f => (p[f] = $(f).checked));
    return p;
  }
  function fillProfile(p) {
    FIELDS.forEach(f => { if (p[f] !== undefined) $(f).value = p[f]; });
    BOOLS.forEach(f => ($(f).checked = !!p[f]));
  }
  const fmt = d => d.toISOString().slice(0, 10);
  function addDays(s, n) { const d = new Date(s + "T00:00:00"); d.setDate(d.getDate() + n); return d; }

  function dueInfo(item, p) {
    const d = item.due;
    if (d.type === "text") return { label: d.text, date: null };
    if (d.type === "arrival") {
      if (!p.arrival) return { label: d.days === 0 ? "入境当天" : `入境后 ${d.days} 天内`, date: null };
      const dt = addDays(p.arrival, d.days);
      return { label: `${fmt(dt)} 前(入境后 ${d.days} 天)`, date: dt };
    }
    if (d.type === "expiry") {
      if (!p.expiry) return { label: "在留期限前约3个月起(请填写在留期限)", date: null };
      const dt = addDays(p.expiry, d.days);
      return { label: `${fmt(dt)} 起可申请(期限 ${p.expiry})`, date: dt };
    }
    return { label: "", date: null };
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  function render() {
    const p = state.profile;
    if (!p) return;
    const q = $("q").value.trim().toLowerCase();
    const items = GUIDE_ITEMS.filter(i => i.cond(p));
    const doneCount = items.filter(i => state.done[i.id]).length;
    $("progress").textContent = `(${doneCount}/${items.length})`;
    $("barfill").style.width = items.length ? (doneCount / items.length * 100) + "%" : "0";
    const today = new Date();
    let html = "";
    GUIDE_CATEGORIES.forEach(cat => {
      const list = items.filter(i => i.cat === cat.key &&
        (!q || (i.title + i.what + i.where).toLowerCase().includes(q)));
      if (!list.length) return;
      html += `<div class="card"><h3>${cat.icon} ${cat.name}</h3>`;
      list.forEach(i => {
        const di = dueInfo(i, p);
        const overdue = di.date && i.due.type === "arrival" && di.date < today && !state.done[i.id];
        html += `<details class="item ${state.done[i.id] ? "done" : ""}">
          <summary><input type="checkbox" data-id="${i.id}" ${state.done[i.id] ? "checked" : ""}>
          <span class="t">${esc(i.title)}</span>
          <span class="due ${overdue ? "overdue" : ""}">${esc(di.label)}${overdue ? " ⚠️已过期" : ""}</span></summary>
          <p>${esc(i.what)}</p>
          ${i.docs.length ? `<p><b>所需材料:</b>${i.docs.map(esc).join("、")}</p>` : ""}
          <p><b>办理地点:</b>${esc(i.where)}${i.official ? ` · <a href="${esc(i.official)}" target="_blank" rel="noopener">官方信息</a>` : ""}</p>
        </details>`;
      });
      html += "</div>";
    });
    $("list").innerHTML = html || '<div class="card">没有匹配的条目</div>';
    document.querySelectorAll("#list input[type=checkbox]").forEach(cb => {
      cb.addEventListener("click", e => e.stopPropagation());
      cb.addEventListener("change", () => {
        state.done[cb.dataset.id] = cb.checked;
        save(); render();
      });
    });
  }

  $("gen").onclick = () => {
    state.profile = readProfile();
    save();
    $("result").hidden = false;
    render();
    $("result").scrollIntoView({ behavior: "smooth" });
  };
  $("q").oninput = render;
  $("print").onclick = () => {
    document.querySelectorAll("details").forEach(d => (d.open = true));
    window.print();
  };
  $("reset").onclick = () => {
    if (confirm("清除所有已勾选进度和个人信息?")) {
      localStorage.removeItem(KEY);
      location.reload();
    }
  };
  $("disclaimer").textContent = `${GUIDE_META.disclaimer}(数据整理于 ${GUIDE_META.updated};所有数据仅保存在你的浏览器本地。)`;

  if (state.profile) { fillProfile(state.profile); $("result").hidden = false; render(); }
  else $("arrival").value = fmt(new Date());
})();
