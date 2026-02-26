# 前端 UI 樣式調整紀錄

> 對齊 reference：https://1219demo.pages.dev/
> 本次調整**僅涉及樣式（CSS / Tailwind class）**，未變動任何頁面架構、JavaScript 邏輯或資料流。

---

## 一、全站共用調整

### 1. 全站字體放大
| 項目 | 調整前 | 調整後 |
|------|--------|--------|
| html 根字體 | 瀏覽器預設 16px | `17px`（common.css） |

### 2. 全站陰影加深（tailwind-config.js）
| 項目 | 調整前 | 調整後 |
|------|--------|--------|
| shadow-md | `0 4px 6px rgba(0,0,0,0.07)` | `0 4px 12px rgba(0,0,0,0.08)` |
| shadow-lg | `0 10px 15px rgba(0,0,0,0.07)` | `0 10px 25px rgba(0,0,0,0.1)` |

### 3. Navbar（header.js）
| 項目 | 調整前 | 調整後 |
|------|--------|--------|
| 頂部資訊列字體 | `text-[11px]` | `text-xs` |
| 品牌副標題 | `text-[10px]` | `text-[11px]` |
| 品牌名稱 | `text-xl` | `text-2xl` |
| 導航連結 | `text-sm` | `text-base` |
| 會員登入顏色 | `text-primary`（深藍） | `text-secondary`（青色） |
| 品牌連結 | `href="index.html"` | `href="home.html"`（修正 404） |

---

## 二、首頁（home.html）

### 1. 搜尋列重新設計
| 項目 | 調整前 | 調整後 |
|------|--------|--------|
| 搜尋按鈕形狀 | 圓形 `w-10 h-10 rounded-full` | 長方形 `px-8`，與容器同高 |
| 「找挑戰」按鈕 | 較小 | `px-7 py-4 min-w-[120px] text-base` |
| 輸入框 | `px-4 py-3 text-sm` | `px-5 py-4 text-base` |
| 容器 | 內部有 padding | `items-stretch overflow-hidden`，無間隙 |

### 2. 五個 icon 快捷按鈕
| 項目 | 調整前 | 調整後 |
|------|--------|--------|
| 排列方式 | `grid grid-cols-5` 分散 | `flex gap-10` 集中 |
| icon 圓圈大小 | `w-14 h-14` | `w-[84px] h-[84px]` |
| 邊框粗細 | `border-2` | `border-4` |
| icon 大小 | `text-xl` | `text-[2rem]` |
| 文字標籤 | `text-xs` | `text-base font-bold` |
| hover 顏色 | `bg-primary`（深藍） | `bg-secondary`（青色） |

### 3. 入口卡片（我是新創/團隊、我是機關/企業）
| 項目 | 調整前 | 調整後 |
|------|--------|--------|
| CTA 按鈕位置 | 右側獨立 flex 子元素 | 描述文字下方（在 content div 內） |
| icon 形狀 | `w-20 h-20 rounded-xl`（方形） | `w-[120px] h-[120px] rounded-full`（圓形） |
| 卡片圓角 | `rounded-lg` | `rounded-xl` |
| 新創卡片左邊框 | `border-primary`（深藍） | `border-l-secondary`（青色） |
| hover 位移 | `-translate-y-1` | `-translate-y-[3px]` |
| 卡片間距 | `gap-6`（24px） | `gap-8`（32px） |

### 4. 其他字體放大
| 區域 | 調整前 | 調整後 |
|------|--------|--------|
| 熱門關鍵字 | `text-xs` | `text-sm` |
| 領域卡片項目 | `text-xs` | `text-sm` |
| 新手上路說明 | `text-sm` | `text-base` |
| 影片描述 | `text-sm` | `text-base` |
| Footer 標題 | `text-sm` | `text-base` |
| Footer 連結 | `text-xs` | `text-sm` |

---

## 三、尋找挑戰頁（challenges.html）

| 項目 | 調整前 | 調整後 |
|------|--------|--------|
| 卡片網格 | `md:grid-cols-2`（兩欄） | `md:grid-cols-2 lg:grid-cols-3`（大螢幕三欄） |
| 搜尋列 | 同首頁舊版 | 同首頁新版（長方形搜尋按鈕） |
| 卡片描述字體 | `text-xs` | `text-sm` |
| 排序下拉字體 | `text-xs` | `text-sm` |
| Footer 標題 | `text-sm` | `text-base` |
| Footer 連結 | `text-xs` | `text-sm` |

---

## 四、計畫時程頁（calendar.html + calendar.css）

| 項目 | 調整前 | 調整後 |
|------|--------|--------|
| 主色調 | `#003366` 深藍 | `#0089A7` 青色 |
| 表頭背景 | `background-color: #003366` | `background-color: #0089A7` |
| 篩選選中文字 | `color: #003366` | `color: #0089A7` |
| 查詢按鈕 | `bg-primary` | `bg-secondary` |
| 下載/檢視按鈕 | `bg-primary` | `bg-secondary` |
| 側欄標題 | `text-primary` | `text-secondary` |
| hover 效果 | `group-hover:text-primary` | `group-hover:text-secondary` |

---

## 五、其他頁面

| 頁面 | 調整內容 |
|------|---------|
| challenge-detail.html | Footer 字體加大、麵包屑 `index.html` → `home.html` |
| challenge-apply.html | 「您正在申請」字體 `text-xs` → `text-sm` |
| case1.html | 加入 common.css、版權列字體加大、麵包屑連結修正 |
| proposal-success.html | 加入 common.css、麵包屑連結修正 |

---

## 六、Bug 修正

| 問題 | 修正 |
|------|------|
| 點擊「實證媒合平台」品牌名 404 | 全站 `href="index.html"` → `href="home.html"`（共 6 處） |

---

## 涉及檔案清單（15 個）

```
frontend/home.html
frontend/challenges.html
frontend/challenge-detail.html
frontend/challenge-apply.html
frontend/calendar.html
frontend/case1.html
frontend/proposal-success.html
frontend/css/common.css
frontend/css/calendar.css
frontend/css/challenge-apply.css
frontend/css/challenge-detail.css
frontend/css/challenges.css
frontend/js/header.js
frontend/js/tailwind-config.js
```
