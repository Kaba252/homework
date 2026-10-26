# 来日手续清单(japan-guide)

纯静态网页(无需后端、无依赖)。用法:直接用浏览器打开 `index.html`,或 `python3 -m http.server -d japan-guide`。

- 填写在留资格、就业方式、年龄、入境日期等,生成个性化清单,涵盖:身份·在留、住、衣食、行、保险、年金、税·源泉、医疗、永住。
- 按入境日期自动计算截止日并提示逾期;勾选进度保存在浏览器 localStorage,不上传。
- 支持搜索、打印/保存 PDF。

## 扩展
手续数据在 `data_*.js`,每项含 `cond(profile)` 条件、`due`、`docs`、`official` 链接。新增条目只需 `GUIDE_ITEMS.push({...})`。
法规会变,上线前请逐项核对官方来源,并在界面保留免责声明。
