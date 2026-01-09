/**
 * cms-script.js
 * 負責處理「實證案件管理」的動態渲染、資料管理與擴充邏輯
 */

// ==========================================
// 1. 預設資料 (核心固定區)
// ==========================================
const DEFAULT_STAGES = [
    {
        id: "stage-1",
        name: "1. 出題公告階段",
        icon: "fa-bullhorn",
        isFixed: true, // 不可刪除
        tabs: [
            {
                id: "tab-1-1",
                name: "出題公告 (1-6)",
                type: "TypeA", // 版型 A：清單與檢核
                isFixed: true,
                data: {
                    columns: ["工項", "作業內容與日期", "需求文件檢核 (勾選完成)", "發文狀態", "說明"],
                    items: [
                        { id: 1, title: "出題須知與公告", date: "2026-01-23", type: "線上", docs: ["(公文)114年度作業手冊公告函v1", "研發型補助計畫推動作業手冊", "出題申請公告資料0331"], status: "TRUE", note: "需確認作業手冊及申請須知內容已定稿並完成公文簽核" },
                        { id: 2, title: "機關出題申請說明會宣傳", date: "2026-01-23 ~ 2026-02-20", type: "實體", docs: ["114採購_新創政府資源說明簡報", "EDM、FB貼文(0602審核稿)", "活動X展架、Web Banner"], status: "FALSE", note: "於台大醫、北醫等場域進行實證推廣說明" },
                        { id: 3, title: "機關出題收件與資格審查", date: "2026-01-23 ~ 2026-02-27", type: "線上", docs: ["114出題計畫書0425", "113評鑒合格公文證書"], status: "FALSE", note: "檢核申請文件是否齊全及機構資格" },
                        { id: 4, title: "出題審查會議籌備", date: "2026-03-02 ~ 2026-03-11", type: "實體", docs: ["委員名單說明", "機關出題共識會簡報", "開會通知單、議程"], status: "TRUE", note: "確認外聘委員名單並寄送邀請信" }
                    ]
                }
            },
            {
                id: "tab-1-2",
                name: "機關出題列表",
                type: "TypeList", // 改為專用 List 版型
                isFixed: true,
                data: {
                    headers: ["挑戰編號", "出題單位", "挑戰題目摘要", "預算金額", "狀態"],
                    items: [
                        {
                            id: "issue-1",
                            col1: "114-T058-AGCY",
                            col2: `臺北市政府交通局`,
                            col2_sub: `智慧運輸科`,
                            col3: "智慧路口：即時交通影像辨識與分析解決方案",
                            col4: "NT$ 2,500,000",
                            status: "審核通過",
                            statusClass: "tag tag-pass",
                            details: [
                                { label: "出題單位全銜", value: "臺北市政府交通局" },
                                { label: "承辦人/職稱", value: "林小明 (專案技正)" },
                                { label: "聯繫電話", value: "02-2720-8889 #1234" },
                                { label: "電子郵件", value: "lin.xm@gov.taipei" },
                                { label: "挑戰題目", value: "智慧路口：即時交通影像辨識與分析解決方案", fullWidth: true, highlight: true },
                                { label: "技術領域分類", value: "AI 影像辨識 / 5G IoT" },
                                { label: "建議實證場域", value: "臺北市信義區 (基隆路與忠孝東路口)" },
                                { label: "現況問題痛點", value: "目前本市主要幹道於上下班尖峰時刻，常因固定號誌時相無法應對突發性車流，導致路口回堵嚴重。現有之感應線圈維護成本高且數據單一，缺乏車種辨識與人流分析能力，無法作為動態號誌調整之依據。", fullWidth: true },
                                { label: "技術規格要求", value: "1. 需利用路口現有 CCTV 影像進行分析，不額外架設大型硬體為原則。<br>2. 辨識準確率：日間 > 95%，夜間 > 85% (需包含大客車、小客車、機車、行人)。<br>3. 數據延遲：影像分析數據回傳至中控中心延遲需小於 2 秒。<br>4. 介接規範：需提供標準 RESTful API 介接本局交控中心平台。", fullWidth: true },
                                { label: "評選與審查標準", value: "技術創新性 (30%)、場域可行性 (30%)、團隊執行力 (20%)、經費編列合理性 (20%)。", fullWidth: true },
                                { label: "預期實證效益", value: "1. 降低路口尖峰時段平均延滯時間 15% 以上。<br>2. 節省人工車流調查人力成本約 50 萬元/年。<br>3. 建立即時交通戰情儀表板，提供交通決策輔助。", fullWidth: true },
                                { label: "相關參考附件", value: `<a href="#" class="attachment-link"><i class="fa-solid fa-file-pdf"></i> 114年智慧交通徵案簡章.pdf</a>
                                    <a href="#" class="attachment-link"><i class="fa-solid fa-image"></i> 場域現況照片(基隆路口).jpg</a>
                                    <a href="#" class="attachment-link"><i class="fa-solid fa-file-excel"></i> 經費預算表範本(機關版).xlsx</a>`, fullWidth: true }
                            ]
                        },
                        {
                            id: "issue-2",
                            col1: "114-H012-AGCY",
                            col2: `衛生福利部臺北醫院`,
                            col2_sub: `資訊室`,
                            col3: "AI輔助急診檢傷分類系統實證",
                            col4: "NT$ 1,800,000",
                            status: "審核中",
                            statusClass: "tag tag-review",
                            details: [
                                { label: "出題單位全銜", value: "衛生福利部臺北醫院" },
                                { label: "承辦人/職稱", value: "張雅婷 (資訊室主任)" },
                                { label: "聯繫電話", value: "02-2276-5566 #2233" },
                                { label: "電子郵件", value: "yt.chang@tph.mohw.gov.tw" },
                                { label: "挑戰題目", value: "AI輔助急診檢傷分類系統實證", fullWidth: true, highlight: true },
                                { label: "技術領域分類", value: "AI 醫療影像 / 大數據分析" },
                                { label: "建議實證場域", value: "衛生福利部臺北醫院 急診室" },
                                { label: "現況問題痛點", value: "急診檢傷分類目前仰賴護理師人工判斷，尖峰時刻易因人力不足導致壅塞。且不同護理人員判斷標準可能存在細微差異，影響病患分流效率。", fullWidth: true },
                                { label: "技術規格要求", value: "1. 系統需介接醫院 HIS 系統，即時讀取病患生理量測數據。<br>2. AI 模型需基於過去 5 年去識別化病歷進行訓練。<br>3. 檢傷分類預測準確率需達 90% 以上（對比資深護理師判斷）。<br>4. 需符合 HL7 FHIR 標準交換格式。", fullWidth: true },
                                { label: "評選與審查標準", value: "醫療法規合規性 (30%)、AI 模型準確度 (30%)、系統整合可行性 (25%)、資安防護機制 (15%)。", fullWidth: true },
                                { label: "預期實證效益", value: "1. 縮短檢傷分類平均作業時間 20%。<br>2. 提升檢傷分類一致性，降低醫療糾紛風險。<br>3. 減輕急診護理人員行政負擔。", fullWidth: true },
                                { label: "相關參考附件", value: `<a href="#" class="attachment-link"><i class="fa-solid fa-file-pdf"></i> 114年醫療場域實證規範.pdf</a>
                                    <a href="#" class="attachment-link"><i class="fa-solid fa-file-word"></i> 專案計畫書範本.docx</a>`, fullWidth: true }
                            ]
                        }
                    ]
                }
            },
            {
                id: "tab-1-3",
                name: "審查委員名單",
                type: "TypeCommittee", // 改為專用 Committee 版型
                isFixed: true,
                data: {
                    headers: ["#", "姓名", "服務單位 / 職稱", "專長領域", "聯絡資訊", "邀約狀態"],
                    items: [
                        {
                            id: 1,
                            isEdit: true, // 設定第一筆為編輯模式
                            name: "王大明",
                            org: "國立台灣大學 資訊工程學系",
                            pos: "特聘教授",
                            expertise: ["人工智慧", "智慧醫療", "大數據分析"],
                            phone: "02-3366-XXXX",
                            email: "dmwang@ntu.edu.tw",
                            status: "已確認",
                            statusClass: "status-confirmed"
                        },
                        {
                            id: 2,
                            name: "李美華",
                            org: "財團法人資訊工業策進會",
                            pos: "資深組長",
                            expertise: ["雲端技術", "物聯網應用"],
                            phone: "0912-345-678",
                            email: "mhlee@iii.org.tw",
                            status: "已確認",
                            statusClass: "status-confirmed"
                        },
                        {
                            id: 3,
                            name: "張志強",
                            org: "台北醫學大學 附設醫院",
                            pos: "副院長",
                            expertise: ["臨床試驗", "醫療體系管理"],
                            phone: "02-2737-XXXX",
                            email: "strong.c@tmu.edu.tw",
                            status: "邀約中",
                            statusClass: "status-pending"
                        },
                        {
                            id: 4,
                            name: "林小春",
                            org: "科技部 產學合作小組",
                            pos: "外部審查委員",
                            expertise: ["政府補助法規", "技術鑑價"],
                            phone: "0920-111-222",
                            email: "spring.lin@most.gov.tw",
                            status: "已拒絕",
                            statusClass: "status-declined"
                        }
                    ]
                }
            },
            {
                id: "tab-1-4",
                name: "前台展示預覽與發佈",
                type: "TypePreview",
                isFixed: true,
                data: {
                    title: "智慧路口：即時交通影像辨識與分析解決方案",
                    agency: "臺北市政府交通局",
                    date: "115/01/30 (剩餘 42 天)",
                    money: "新台幣 2,500,000 元 (含稅)",
                    timeline: "決標後 6 個月內完成 POC 驗證",
                    req: "本計畫旨在解決尖峰時刻路口壅塞問題，徵求具備邊緣運算能力之 AI 影像辨識方案。\n<ul>\n  <li><b>辨識標題：</b>需能自動區分大客車、小客車、機車、自行車及行人。</li>\n  <li><b>辨識準確率：</b>日間辨識率需達 95% 以上，夜間需達 90% 以上。</li>\n  <li><b>系統介接：</b>需提供標準 RESTful API 介接本局交控中心戰情室。</li>\n  <li><b>環境適應：</b>需能耐受戶外高溫、降雨等氣候環境。</li>\n</ul>",
                    location: "主要實證場域：臺北市信義區基隆路與忠孝東路交叉口。\n備用實證場域：內湖科學園區瑞光路沿線主要路口。"
                }
            }
        ]
    },
    {
        id: "stage-2",
        name: "2. 解題徵件階段",
        icon: "fa-lightbulb",
        isFixed: true,
        tabs: [
            {
                id: "tab-2-1",
                name: "解題徵件 (7-11)",
                type: "TypeA",
                isFixed: true,
                data: {
                    columns: ["工項", "作業內容與日期", "需求文件檢核 (勾選完成)", "發文狀態", "說明"],
                    items: [
                        { id: 7, title: "解題申請說明會", date: "2026-03-24 ~ 2026-04-24", type: "線上", docs: ["解題補助申請須知", "114解題計畫書格式範本", "114採購_0618解題說明會_簡報v2", "經費預算編列注意事項說明會簡報"], status: "FALSE", note: "1. 包含案例分享(新創採購案例簡報)。\n2. 需準備相關說明會簡報與範本文件。" },
                        { id: 8, title: "受理解題申請與收件", date: "2026-03-24 ~ 2026-04-24", type: "線上", docs: ["申請資料(計畫書、營登、繳稅證明)", "機關提案書(如:金門酒廠AI品檢案)", "促案清單(0613v2)"], status: "FALSE", note: "1. 確認廠商資格文件齊全。\n2. 整理出題機關需求與新創解題對應規格。" },
                        { id: 9, title: "解題審查會議(籌備)", date: "2026-04-27 ~ 2026-05-04", type: "線上", docs: ["開會通知單(機關/委員)", "114場域實證-解題審查會議議程", "解題審查會出席名單", "114年度新創採購解題廠商簡報_彙整"], status: "TRUE", note: "1. 需發文通知機關出席。\n2. 聯繫委員確認時間(0707-0710調查)。\n3. 準備保密同意書。" },
                        { id: 10, title: "解題審查會議(執行)", date: "2026-05-07 ~ 2026-05-12", type: "實體", docs: ["簽到表", "審查作業評審保密同意書", "書面審查表(空白/個別委員)", "工作小組簡報", "新創解題審查會審查意見表", "線上評分總表_連動"], status: "FALSE", note: "1. 現場需備座位圖、評分表。\n2. 針對出題機關預期功能進行對焦。" },
                        { id: 11, title: "解題審查結果與修正", date: "2026-05-13 ~ 2026-05-18", type: "線上", docs: ["修正對照表範例(附件2_8)", "已確定入案之新創修正計畫書"], status: "TRUE", note: "1. 需核對廠商修正內容是否符合委員意見。\n2. 確認後續簽約文件準備。" }
                    ]
                }
            },
            {
                id: "tab-2-2",
                name: "入選廠商列表",
                type: "TypeList",
                isFixed: true,
                data: {
                    headers: ["提案編號", "廠商名稱", "解決方案名稱", "預估經費", "狀態"],
                    items: [
                        {
                            id: "detail-1",
                            col1: "114-T058-003",
                            col2: "智通科技股份有限公司",
                            col2_sub: "統編: 12345678",
                            col3: "AI Edge 智慧路口車流偵測系統",
                            col4: "NT$ 2,200,000",
                            status: "已入選",
                            statusClass: "tag tag-blue",
                            details: [
                                { label: "負責人", value: "王大明" },
                                { label: "成立日期", value: "109年 05月 20日" },
                                { label: "聯絡人", value: "李小美 (專案經理)" },
                                { label: "聯絡電話", value: "02-2655-1234" },
                                { label: "電子郵件", value: "contact@smart-tech.com.tw" },
                                { label: "公司網址", value: "www.smart-tech.com.tw" },
                                { label: "通訊地址", value: "台北市內湖區瑞光路999號10樓", fullWidth: true },
                                { label: "應用技術", value: "Edge AI, Computer Vision, 5G", fullWidth: true },
                                { label: "團隊實績", value: "獲獎：2024 台北智慧城市黑客松 金獎、2023 經濟部新創事業獎 優選<br>專利：發明專利 I123456 號 (邊緣運算車流計數)<br>案例：新北市交通局(112)科技執法影像辨識、高雄市政府(111)5G AIoT智慧杆", fullWidth: true },
                                { label: "問題分析", value: "目前目標路口之感應線圈老舊，維護成本高，且無法分辨車種。傳統雲端方案延遲高，無法滿足即時號誌控制需求。", fullWidth: true },
                                { label: "技術架構", value: "採用 NVIDIA Jetson 輕量化 AI 模型部署於路側端。僅回傳去識別化數據（流量、車種、轉向）以保護個資，並提供標準 RESTful API 對接交控中心。", fullWidth: true },
                                { label: "預期效益", value: "1. 辨識準確率 > 95% (日間) / 2. 資料延遲 < 1秒 / 3. 大幅降低影像傳輸頻寬成本。", fullWidth: true }
                            ]
                        },
                        {
                            id: "detail-2",
                            col1: "114-T058-005",
                            col2: "雲端數據應用實驗室",
                            col2_sub: "統編: 87654321",
                            col3: "智慧路燈能耗監測平台",
                            col4: "NT$ 1,800,000",
                            status: "已入選",
                            statusClass: "tag tag-blue",
                            details: []
                        }
                    ]
                }
            },
            {
                id: "tab-2-3",
                name: "審查委員名單",
                type: "TypeCommittee",
                isFixed: true,
                data: {
                    headers: ["#", "姓名", "服務單位 / 職稱", "專長領域", "聯絡資訊", "邀約狀態"],
                    items: [
                        {
                            id: 1,
                            name: "王大明",
                            org: "國立台灣大學 資訊工程學系",
                            pos: "特聘教授",
                            expertise: ["人工智慧", "智慧醫療", "大數據分析"],
                            phone: "02-3366-XXXX",
                            email: "dmwang@ntu.edu.tw",
                            status: "已確認",
                            statusClass: "status-confirmed"
                        },
                        {
                            id: 2,
                            name: "李美華",
                            org: "財團法人資訊工業策進會",
                            pos: "資深組長",
                            expertise: ["雲端技術", "物聯網應用"],
                            phone: "0912-345-678",
                            email: "mhlee@iii.org.tw",
                            status: "已確認",
                            statusClass: "status-confirmed"
                        },
                        {
                            id: 3,
                            name: "張志強",
                            org: "台北醫學大學 附設醫院",
                            pos: "副院長",
                            expertise: ["臨床試驗", "醫療體系管理"],
                            phone: "02-2737-XXXX",
                            email: "strong.c@tmu.edu.tw",
                            status: "邀約中",
                            statusClass: "status-pending"
                        },
                        {
                            id: 4,
                            name: "林小春",
                            org: "科技部 產學合作小組",
                            pos: "外部審查委員",
                            expertise: ["政府補助法規", "技術鑑價"],
                            phone: "0920-111-222",
                            email: "spring.lin@most.gov.tw",
                            status: "已拒絕",
                            statusClass: "status-declined"
                        }
                    ]
                }
            }
        ]
    }
];

// ==========================================
// 2. 狀態管理 (State Management)
// ==========================================
let appState = {
    currentStageIndex: 0,
    currentTabIndex: 0,
    stages: [],
    sortConfig: {
        activeTabId: null,
        columnIndex: null,
        direction: 'asc'
    }
};

// 初始化
function initApp() {
    loadState();
    renderAll();
}

// 讀取狀態 (LocalStorage + Default)
function loadState() {
    const saved = localStorage.getItem('cms_stages_v5'); // 升級版本號強制刷新
    if (saved) {
        appState.stages = JSON.parse(saved);
    } else {
        appState.stages = JSON.parse(JSON.stringify(DEFAULT_STAGES));
    }
}

// 儲存狀態
function saveState() {
    localStorage.setItem('cms_stages_v5', JSON.stringify(appState.stages));
    renderAll();
}

// ==========================================
// 3. 渲染邏輯 (Rendering)
// ==========================================

// 排序相關 helper
function handleSort(columnIndex) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    
    if (appState.sortConfig.activeTabId === currentTab.id && appState.sortConfig.columnIndex === columnIndex) {
        appState.sortConfig.direction = appState.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
        appState.sortConfig.activeTabId = currentTab.id;
        appState.sortConfig.columnIndex = columnIndex;
        appState.sortConfig.direction = 'asc';
    }
    renderContent();
}

function getSortIcon(colIdx) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    if (appState.sortConfig.activeTabId !== currentTab.id || appState.sortConfig.columnIndex !== colIdx) {
        return '<i class="fa-solid fa-sort" style="color:#ccc; font-size:0.8em; margin-left:5px;"></i>';
    }
    return appState.sortConfig.direction === 'asc' 
        ? '<i class="fa-solid fa-sort-up" style="color:var(--primary-color); font-size:0.8em; margin-left:5px;"></i>'
        : '<i class="fa-solid fa-sort-down" style="color:var(--primary-color); font-size:0.8em; margin-left:5px;"></i>';
}

function getSortValue(type, item, colIdx) {
    if (type === 'TypeList') {
        // Headers: ["挑戰編號", "出題單位", "挑戰題目摘要", "預算金額", "狀態"]
        switch(colIdx) {
            case 0: return item.col1;
            case 1: return item.col2;
            case 2: return item.col3;
            case 3: return parseFloat(item.col4.replace(/[^0-9.-]+/g, "")) || 0;
            case 4: return item.status;
            default: return '';
        }
    } else if (type === 'TypeCommittee') {
        // Headers: ["#", "姓名", "服務單位 / 職稱", "專長領域", "聯絡資訊", "邀約狀態"]
        switch(colIdx) {
            case 0: return item.id;
            case 1: return item.name;
            case 2: return item.org;
            case 3: return (Array.isArray(item.expertise) ? item.expertise.join(',') : item.expertise) || '';
            case 4: return item.phone || item.email || '';
            case 5: return item.status;
            default: return '';
        }
    } else if (type === 'TypeA') {
        // Columns: ["工項", "作業內容與日期", "需求文件檢核 (勾選完成)", "發文狀態", "說明"]
        switch(colIdx) {
            case 0: return item.id;
            case 1: return item.date; // 優先排日期，或者可改 title
            case 2: return item.docs.length; // 依照文件數量排序
            case 3: return item.status;
            case 4: return item.note || '';
            default: return '';
        }
    }
    return '';
}

function renderAll() {
    renderStepper();
    renderTabs();
    renderContent();
}

// 渲染進度條 (Stages)
function renderStepper() {
    const container = document.getElementById('stepper-container');
    container.innerHTML = '';

    appState.stages.forEach((stage, index) => {
        const isActive = index === appState.currentStageIndex;
        const el = document.createElement('div');
        el.className = `step ${isActive ? 'active' : ''}`;
        el.onclick = () => switchStage(index);
        
        let nameHtml = stage.name;
        let deleteBtnHtml = '';
        let editIconHtml = '';

        if (!stage.isFixed && isActive) {
            editIconHtml = `
                <i class="fa-solid fa-pen step-edit-btn" 
                   onclick="editStageName(${index}, event)" 
                   title="編輯名稱"></i>
            `;
            deleteBtnHtml = `
                <div class="step-delete-btn" onclick="event.stopPropagation(); deleteStage(${index});" title="刪除此階段">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            `;
        }

        el.innerHTML = `
            ${deleteBtnHtml}
            <i class="fa-solid ${stage.icon || 'fa-folder'} step-icon"></i>
            <div>${nameHtml}${editIconHtml}</div>
        `;
        
        container.appendChild(el);
    });

    const addBtn = document.createElement('div');
    addBtn.className = 'step add-btn';
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> <div style="margin-top:5px; font-size:0.8rem;">新增階段</div>';
    addBtn.onclick = promptAddStage;
    addBtn.style.color = '#999';
    addBtn.style.borderLeft = '1px dashed #ccc';
    addBtn.style.justifyContent = 'center';
    container.appendChild(addBtn);
}

// 渲染頁籤 (Tabs)
function renderTabs() {
    const container = document.getElementById('tabs-container');
    container.innerHTML = '';
    const currentStage = appState.stages[appState.currentStageIndex];

    if (!currentStage) return;

    currentStage.tabs.forEach((tab, index) => {
        const isActive = index === appState.currentTabIndex;
        const el = document.createElement('div');
        el.className = `tab ${isActive ? 'active' : ''}`;
        el.onclick = () => switchTab(index);
        
        let tabContent = tab.name;
        if (!tab.isFixed && isActive) {
            tabContent += ` <i class="fa-solid fa-pen" style="font-size:0.7em; margin-left:5px; opacity:0.5; cursor:pointer;" onclick="editTabName(${index}, event)" title="編輯名稱"></i>`;
        }
        
        el.innerHTML = tabContent;
        container.appendChild(el);
    });

    const addBtn = document.createElement('div');
    addBtn.className = 'tab add-tab-btn';
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    addBtn.onclick = openTypeModal;
    addBtn.style.background = 'transparent';
    addBtn.style.border = 'none';
    container.appendChild(addBtn);
}

// 渲染主要內容
function renderContent() {
    const container = document.getElementById('content-area');
    const currentStage = appState.stages[appState.currentStageIndex];
    if (!currentStage || !currentStage.tabs[appState.currentTabIndex]) {
        container.innerHTML = '<div style="padding:20px; color:#666;">無內容</div>';
        return;
    }

    const currentTab = currentStage.tabs[appState.currentTabIndex];
    
    // Default Sort Logic: If tab changed or init, reset to column 0 ascending
    if (appState.sortConfig.activeTabId !== currentTab.id) {
        appState.sortConfig = {
            activeTabId: currentTab.id,
            columnIndex: 0,
            direction: 'asc'
        };
    }

    const isLastTab = currentStage.tabs.length <= 1;

    switch (currentTab.type) {
        case 'TypeA':
        renderTypeA(container, currentTab, isLastTab);
            break;
        case 'TypeB': // 保留舊的 generic TypeB 以防萬一，但現在主要用 TypeList
        renderTypeB(container, currentTab, isLastTab);
            break;
        case 'TypeList': // 新增 List 專用
            renderTypeList(container, currentTab, isLastTab);
            break;
        case 'TypeCommittee': // 新增 Committee 專用
            renderTypeCommittee(container, currentTab, isLastTab);
            break;
        case 'TypePreview':
            renderTypePreview(container, currentTab, isLastTab);
            break;
        default:
        container.innerHTML = '未知版型';
    }
}

// ------------------------------------------
// 版型 A：清單與檢核 (Template A)
// ------------------------------------------
function renderTypeA(container, tabData, isLastTab) {
    const data = tabData.data;
    const isDeletable = !tabData.isFixed && !isLastTab;
    let deleteBtnHtml = isDeletable ? `<button class="btn btn-outline" style="color:var(--danger-color); border-color:var(--danger-color); margin-right:10px;" onclick="deleteTab(${appState.currentTabIndex})"><i class="fa-solid fa-trash-can"></i> 刪除此頁籤</button>` : '';

    // Sorting Logic
    let displayItems = [...data.items];
    if (appState.sortConfig.activeTabId === tabData.id && appState.sortConfig.columnIndex !== null) {
        const colIdx = appState.sortConfig.columnIndex;
        const dir = appState.sortConfig.direction;
        
        displayItems.sort((a, b) => {
            let valA = getSortValue(tabData.type, a, colIdx);
            let valB = getSortValue(tabData.type, b, colIdx);
            
            if (valA < valB) return dir === 'asc' ? -1 : 1;
            if (valA > valB) return dir === 'asc' ? 1 : -1;
            return 0;
        });
    }

    let html = `
        <div class="content-box">
            <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="color:var(--primary-color); margin:0;">${tabData.name}</h3>
                <div>${deleteBtnHtml}<button class="btn btn-add" onclick="addItemTypeA()"><i class="fa-solid fa-plus"></i> 新增工項</button></div>
            </div>
            <table class="data-table">
                <thead><tr>${data.columns.map((col, idx) => `
                    <th onclick="handleSort(${idx})" style="cursor:pointer; user-select:none;">
                        ${col} ${getSortIcon(idx)}
                    </th>
                `).join('')}<th width="140">動作</th></tr></thead>
                <tbody>
    `;

    displayItems.forEach((item, idx) => {
        // Find original index for deletion/editing if not sorted? 
        // Actually editing/deleting relies on index in array. 
        // If we sort, the index 'idx' here is the display index, not the data index.
        // We need to find the real index in data.items.
        // Assuming 'id' is unique for this tab is safer.
        // Let's check addItemTypeA generates unique IDs? 
        // id: currentTab.data.items.length + 1. This might duplicate if we delete items.
        // Better to use item.id if it's reliable or find index.
        const realIndex = data.items.indexOf(item);

        const docsHtml = item.docs.map(doc => `
            <div class="check-item" style="display:flex; align-items:flex-start; gap:8px; margin-bottom:6px; line-height:1.4;">
                <input type="checkbox" style="margin-top:3px;"> <span>${doc}</span>
            </div>
        `).join('');
        
        html += `
            <tr>
                <td>${item.id}</td>
                <td>
                    <div style="font-weight:bold; color:var(--primary-color)">${item.title}</div>
                    <div style="font-size:0.8rem; color:#888; margin-top:4px;">${item.date}</div>
                    <div style="font-size:0.8rem; margin-top:4px;"><i class="fa-solid fa-location-dot"></i> ${item.type}</div>
                </td>
                <td>${docsHtml}</td>
                <td><span style="color:${item.status==='TRUE'?'green':'#ccc'}; font-weight:bold;">● ${item.status}</span></td>
                <td style="font-size:0.8rem; color:#666; white-space:pre-line;">${item.note || ''}</td>
                <td>
                    <button class="btn btn-edit"><i class="fa-solid fa-pen"></i> 編輯</button>
                    <button class="btn btn-delete" onclick="deleteItemTypeA(${realIndex})"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        `;
    });
    html += `</tbody></table></div>`;
    container.innerHTML = html;
}

// ------------------------------------------
// 版型 List：機關出題與新創提案列表
// ------------------------------------------
function renderTypeList(container, tabData, isLastTab) {
    const data = tabData.data;

    // Sorting Logic
    let displayItems = [...data.items];
    if (appState.sortConfig.activeTabId === tabData.id && appState.sortConfig.columnIndex !== null) {
        const colIdx = appState.sortConfig.columnIndex;
        const dir = appState.sortConfig.direction;
        
        displayItems.sort((a, b) => {
            let valA = getSortValue(tabData.type, a, colIdx);
            let valB = getSortValue(tabData.type, b, colIdx);
            
            if (valA < valB) return dir === 'asc' ? -1 : 1;
            if (valA > valB) return dir === 'asc' ? 1 : -1;
            return 0;
        });
    }

    let html = `
        <div class="content-box">
             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 style="margin: 0; font-size: 1.1rem; color: var(--primary-color);">${tabData.name}</h3>
                <div style="display: flex; gap: 10px;">
                    <input type="text" placeholder="關鍵字搜尋..." style="padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
                    <button class="btn btn-outline"><i class="fa-solid fa-filter"></i> 篩選</button>
                    <button class="btn btn-primary"><i class="fa-solid fa-plus"></i> 新增資料</button>
                </div>
            </div>
            <table class="data-table">
                <thead><tr>${data.headers.map((h, idx) => `
                    <th onclick="handleSort(${idx})" style="cursor:pointer; user-select:none;">
                        ${h} ${getSortIcon(idx)}
                    </th>
                `).join('')}<th width="120">動作</th></tr></thead>
                <tbody>
    `;

    displayItems.forEach((item, idx) => {
        html += `
            <tr>
                <td>${item.col1}</td>
                <td><div style="font-weight:bold;">${item.col2}</div><div style="font-size:0.75rem; color:#888;">${item.col2_sub || ''}</div></td>
                <td>${item.col3}</td>
                <td>${item.col4}</td>
                <td><span class="${item.statusClass}">${item.status}</span></td>
                <td>
                    <button class="btn btn-edit" onclick="toggleDetailRow('${item.id}')"><i class="fa-solid fa-eye"></i> 詳情</button>
                </td>
            </tr>
            <tr id="${item.id}" class="hidden-row" style="display:none; background:#fafafa;">
                <td colspan="${data.headers.length + 1}">
                    <div style="padding: 10px 20px 20px 20px;">
                        <h4 style="border-left: 4px solid var(--primary-color); padding-left: 10px; margin-bottom: 10px; color: var(--primary-color);">機關需求詳細規格書 (挑戰編號: ${item.col1})</h4>
                    ${item.isDetailEdit ? renderDetailEditor(item) : `
                    <div class="detail-info-grid">
                        ${item.details.map(d => `
                            <div class="detail-label">${d.label}</div>
                                <div class="detail-value ${d.fullWidth ? 'full-width' : ''}" style="${d.highlight ? 'font-weight:bold; color:var(--info-color);' : ''}">
                                    ${d.value}
                                </div>
                        `).join('')}
                        </div>
                        <div style="margin-top: 15px; text-align: right;">
                            <button class="btn btn-outline" onclick="toggleDetailRow('${item.id}')">收合詳情</button>
                            <button class="btn btn-info" onclick="toggleEditDetail('${item.id}')"><i class="fa-solid fa-pen-to-square"></i> 編輯出題內容</button>
                            <button class="btn btn-success"><i class="fa-solid fa-paper-plane"></i> 正式發佈公告</button>
                        </div>
                    `}
                    </div>
                </td>
            </tr>
        `;
    });
    html += `</tbody></table></div>`;
    container.innerHTML = html;
    
    window.toggleDetailRow = function(id) {
        const el = document.getElementById(id);
        el.style.display = (el.style.display === 'none') ? 'table-row' : 'none';
        if(el.style.display === 'table-row') el.classList.add('expanded');
        else el.classList.remove('expanded');
    };
}

// ------------------------------------------
// 版型 Committee：審查委員名單 (專用)
// ------------------------------------------
function renderTypeCommittee(container, tabData, isLastTab) {
    const data = tabData.data;

    // Sorting Logic
    let displayItems = [...data.items];
    if (appState.sortConfig.activeTabId === tabData.id && appState.sortConfig.columnIndex !== null) {
        const colIdx = appState.sortConfig.columnIndex;
        const dir = appState.sortConfig.direction;
        
        displayItems.sort((a, b) => {
            let valA = getSortValue(tabData.type, a, colIdx);
            let valB = getSortValue(tabData.type, b, colIdx);
            
            if (valA < valB) return dir === 'asc' ? -1 : 1;
            if (valA > valB) return dir === 'asc' ? 1 : -1;
            return 0;
        });
    }

    let html = `
        <div class="content-box">
            <div style="display:flex; justify-content: space-between; align-items: flex-start;">
                <button class="btn btn-add" onclick="addRowCommittee()"><i class="fa-solid fa-user-plus"></i> 新增審查委員</button>
                <div style="font-size: 0.85rem; color: #666; background: #f9f9f9; padding: 8px 15px; border-radius: 5px; border: 1px solid #eee;">
                    <i class="fa-solid fa-circle-info"></i> 提示：本清單將用於產製「審查評選會議」之開會通知與評分表。
                </div>
            </div>
            <table class="data-table">
                <thead><tr>${data.headers.map((h, idx) => `
                    <th onclick="handleSort(${idx})" style="cursor:pointer; user-select:none;">
                        ${h} ${getSortIcon(idx)}
                    </th>
                `).join('')}<th width="140">動作</th></tr></thead>
                <tbody>
    `;

    displayItems.forEach((item) => {
        if (item.isEdit) {
            // 編輯模式
             html += `
                <tr style="background-color: #fffde7;">
                    <td>${item.id}</td>
                    <td><input type="text" id="m-name-${item.id}" value="${item.name}" style="width:100%"></td>
                    <td>
                        <input type="text" id="m-org-${item.id}" value="${item.org}" placeholder="單位" style="margin-bottom:5px; width:100%">
                        <input type="text" id="m-pos-${item.id}" value="${item.pos}" placeholder="職稱" style="width:100%">
                    </td>
                    <td>
                        <textarea id="m-exp-${item.id}" placeholder="專長領域，請以逗號分隔" rows="3" style="width:100%">${item.expertise.join(',')}</textarea>
                    </td>
                    <td>
                        <input type="text" id="m-phone-${item.id}" value="${item.phone}" placeholder="電話" style="margin-bottom:5px; width:100%">
                        <input type="email" id="m-email-${item.id}" value="${item.email}" placeholder="Email" style="width:100%">
                    </td>
                    <td>
                        <select id="m-status-${item.id}" style="width:100%">
                            <option value="已確認" ${item.status==='已確認'?'selected':''}>已確認</option>
                            <option value="邀約中" ${item.status==='邀約中'?'selected':''}>邀約中</option>
                            <option value="已拒絕" ${item.status==='已拒絕'?'selected':''}>已拒絕</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-save" onclick="saveRowCommittee(${item.id})"><i class="fa-solid fa-check"></i> 儲存</button>
                        <button class="btn btn-outline" style="margin-top:5px" onclick="toggleEditCommittee(${item.id})">取消</button>
                    </td>
                </tr>
            `;
        } else {
            // 檢視模式
            const expHtml = item.expertise.map(exp => `<span class="tag">${exp}</span>`).join('');
            html += `
                <tr>
                    <td>${item.id}</td>
                    <td style="font-weight:bold; color:var(--primary-color)">${item.name}</td>
                    <td>
                        <div>${item.org}</div>
                        <div style="font-size:0.8rem; color:#888;">${item.pos}</div>
                    </td>
                    <td>${expHtml}</td>
                    <td>
                        <div style="font-size:0.85rem;"><i class="fa-solid fa-phone" style="width:18px"></i> ${item.phone}</div>
                        <div style="font-size:0.85rem;"><i class="fa-solid fa-envelope" style="width:18px"></i> ${item.email}</div>
                    </td>
                    <td><span class="status-badge ${item.statusClass}">${item.status}</span></td>
                    <td>
                        <button class="btn btn-edit" onclick="toggleEditCommittee(${item.id})"><i class="fa-solid fa-pen"></i> 編輯</button>
                        <button class="btn btn-delete" style="margin-left:5px" onclick="deleteRowCommittee(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `;
        }
    });
    html += `
                </tbody>
            </table>
            <div class="footer-btns">
                <button class="btn btn-outline"><i class="fa-solid fa-file-export"></i> 匯出委員聯絡清冊</button>
                <button class="btn btn-primary">儲存變更</button>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function toggleEditCommittee(id) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const item = currentTab.data.items.find(i => i.id === id);
    if (item) {
        item.isEdit = !item.isEdit;
    saveState();
    }
}

function saveRowCommittee(id) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const item = currentTab.data.items.find(i => i.id === id);
    
    if (item) {
        item.name = document.getElementById(`m-name-${id}`).value;
        item.org = document.getElementById(`m-org-${id}`).value;
        item.pos = document.getElementById(`m-pos-${id}`).value;
        item.expertise = document.getElementById(`m-exp-${id}`).value.split(',').map(s => s.trim()).filter(s => s !== '');
        item.phone = document.getElementById(`m-phone-${id}`).value;
        item.email = document.getElementById(`m-email-${id}`).value;
        item.status = document.getElementById(`m-status-${id}`).value;
    
    // Update status class
    if(item.status === '已確認') item.statusClass = 'status-confirmed';
    else if(item.status === '已拒絕') item.statusClass = 'status-declined';
    else item.statusClass = 'status-pending';

    item.isEdit = false;
    saveState();
    }
}

function deleteRowCommittee(id) {
    if(!confirm("確定要刪除此委員嗎？")) return;
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const idx = currentTab.data.items.findIndex(i => i.id === id);
    if (idx !== -1) {
    currentTab.data.items.splice(idx, 1);
    saveState();
    }
}

function addRowCommittee() {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const nextId = currentTab.data.items.length > 0 ? Math.max(...currentTab.data.items.map(i => i.id)) + 1 : 1;
    
    currentTab.data.items.push({
        id: nextId,
        isEdit: true,
        name: "",
        org: "",
        pos: "",
        expertise: [],
        phone: "",
        email: "",
        status: "邀約中",
        statusClass: "status-pending"
    });
    saveState();
}

// ------------------------------------------
// 版型 C：前台預覽 (TypePreview) - 完整版
// ------------------------------------------
function renderTypePreview(container, tabData, isLastTab) {
    const d = tabData.data;
    const html = `
        <style>
            .default-cover-option input:checked + img {
                border-color: var(--primary-color) !important;
                box-shadow: 0 0 0 3px rgba(0, 140, 149, 0.2);
                transform: translateY(-2px);
            }
        </style>
        <div class="editor-container">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; padding: 20px 20px 0 20px;">
                <div>
                    <h3 style="margin: 0; color: var(--primary-color);">[編輯模式] 114-T058 智慧路口公告</h3>
                    <p style="font-size: 13px; color: #888; margin: 5px 0 15px 0;">此處設定的內容將直接呈現於「政府場域實證入口網」挑戰詳情頁面。</p>
                </div>
                <div class="mode-switcher">
                    <button class="mode-btn active" id="btn-edit" onclick="switchPreviewMode('edit')"><i class="fa-solid fa-pen-to-square"></i> 內容編輯器</button>
                    <button class="mode-btn" id="btn-preview" onclick="switchPreviewMode('preview')"><i class="fa-solid fa-desktop"></i> 前台即時預覽</button>
                </div>
            </div>

            <div class="editor-grid" style="padding: 0 20px 20px 20px;">
                <!-- 左側：編輯或預覽 -->
                <div class="content-view-area">
                    <!-- 內容編輯器 -->
                    <div class="edit-pane" id="pane-edit" style="display:block;">
                        <div class="form-group">
                            <label>封面圖片設定 (非強制)</label>
                            <div style="font-size: 0.8rem; color: #666; margin-bottom: 8px;">建議尺寸：1200 x 600 px，JPG/PNG 格式。若未上傳將使用預設圖片。</div>
                            
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #eee;">
                                <div style="margin-bottom: 15px;">
                                    <label style="font-weight: normal; cursor: pointer; display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                        <input type="radio" name="cover-option" id="opt-upload" value="upload" onchange="toggleCoverOption()" style="width: auto; margin: 0;"> 
                                        <span>自行上傳圖片</span>
                                    </label>
                                    <div style="padding-left: 24px;">
                                        <input type="file" id="in-cover-upload" accept="image/*" onchange="handleCoverUpload(this)" disabled style="width: auto; padding: 8px; background: white;">
                                    </div>
                                </div>

                                <div style="margin-top: 15px;">
                                    <label style="font-weight: normal; cursor: pointer; display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                        <input type="radio" name="cover-option" id="opt-default" value="default" onchange="toggleCoverOption()" checked style="width: auto; margin: 0;"> 
                                        <span>使用預設圖片 (請選擇)</span>
                                    </label>
                                    
                                    <div id="default-covers-area" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 10px; margin-top: 10px; padding-left: 24px;">
                                        <label class="default-cover-option" style="cursor: pointer; display: block; margin: 0;">
                                            <input type="radio" name="default-cover" value="https://placehold.co/1200x600/008c95/ffffff?text=Default+1" onchange="syncPreviewData()" style="display:none;" checked>
                                            <img src="https://placehold.co/150x80/008c95/ffffff?text=1" style="width: 100%; border-radius: 4px; border: 2px solid transparent; transition: all 0.2s; display: block;">
                                        </label>
                                        <label class="default-cover-option" style="cursor: pointer; display: block; margin: 0;">
                                            <input type="radio" name="default-cover" value="https://placehold.co/1200x600/e91e63/ffffff?text=Default+2" onchange="syncPreviewData()" style="display:none;">
                                            <img src="https://placehold.co/150x80/e91e63/ffffff?text=2" style="width: 100%; border-radius: 4px; border: 2px solid transparent; transition: all 0.2s; display: block;">
                                        </label>
                                        <label class="default-cover-option" style="cursor: pointer; display: block; margin: 0;">
                                            <input type="radio" name="default-cover" value="https://placehold.co/1200x600/2196f3/ffffff?text=Default+3" onchange="syncPreviewData()" style="display:none;">
                                            <img src="https://placehold.co/150x80/2196f3/ffffff?text=3" style="width: 100%; border-radius: 4px; border: 2px solid transparent; transition: all 0.2s; display: block;">
                                        </label>
                                        <label class="default-cover-option" style="cursor: pointer; display: block; margin: 0;">
                                            <input type="radio" name="default-cover" value="https://placehold.co/1200x600/ff9800/ffffff?text=Default+4" onchange="syncPreviewData()" style="display:none;">
                                            <img src="https://placehold.co/150x80/ff9800/ffffff?text=4" style="width: 100%; border-radius: 4px; border: 2px solid transparent; transition: all 0.2s; display: block;">
                                        </label>
                                        <label class="default-cover-option" style="cursor: pointer; display: block; margin: 0;">
                                            <input type="radio" name="default-cover" value="https://placehold.co/1200x600/9c27b0/ffffff?text=Default+5" onchange="syncPreviewData()" style="display:none;">
                                            <img src="https://placehold.co/150x80/9c27b0/ffffff?text=5" style="width: 100%; border-radius: 4px; border: 2px solid transparent; transition: all 0.2s; display: block;">
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>分類標籤 (多選/新增)</label>
                            <div class="tag-editor-box" id="tag-editor-container">
                                <span class="backend-tag">AI <i class="fa-solid fa-xmark" onclick="removeTag(this)"></i></span>
                                <span class="backend-tag">交通 <i class="fa-solid fa-xmark" onclick="removeTag(this)"></i></span>
                                <div class="tag-input-wrapper">
                                    <input type="text" id="tag-input" placeholder="輸入標籤後按 Enter 或點擊新增..." onkeypress="handleTagKey(event)">
                                    <button class="btn-add-tag" onclick="addNewTag()">新增</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>挑戰題目</label>
                            <input type="text" id="in-title" value="${d.title}" oninput="syncPreviewData()">
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="form-group">
                                <label>出題機關</label>
                                <input type="text" id="in-agency" value="${d.agency}" oninput="syncPreviewData()">
                            </div>
                            <div class="form-group">
                                <label>徵件截止日期顯示</label>
                                <input type="text" id="in-date" value="${d.date}" oninput="syncPreviewData()">
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="form-group">
                                <label>實證獎助金金額</label>
                                <input type="text" id="in-money" value="${d.money}" oninput="syncPreviewData()">
                            </div>
                            <div class="form-group">
                                <label>預計執行期程</label>
                                <input type="text" id="in-timeline" value="${d.timeline}" oninput="syncPreviewData()">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>詳細需求與規格內容</label>
                            <div class="rich-editor-tools">
                                <button class="tool-btn"><b>B</b></button>
                                <button class="tool-btn"><i>I</i></button>
                                <button class="tool-btn"><u>U</u></button>
                            </div>
                            <textarea id="in-req" rows="8" oninput="syncPreviewData()">${d.req}</textarea>
                        </div>
                        <div class="form-group">
                            <label>實證場域詳細地點說明</label>
                            <textarea id="in-location" rows="3" oninput="syncPreviewData()">${d.location}</textarea>
                        </div>
                    </div>

                    <!-- 高擬真預覽面板 -->
                    <div class="preview-pane" id="pane-preview">
                        <div class="browser-chrome">
                            <div class="chrome-dots">
                                <span class="dot"></span><span class="dot" style="background:#febc2e"></span><span class="dot" style="background:#28c840"></span>
                            </div>
                            <div class="chrome-address"><i class="fa-solid fa-lock" style="font-size: 11px;"></i> https://innovation.matchmaking.gov.tw/challenge/detail/114-T058</div>
                        </div>
                        <div class="portal-container">
                            <div class="portal-header">
                                <div class="portal-logo"><i class="fa-solid fa-mountain-sun"></i> 政府場域實證平台</div>
                                <div style="grid-column: span 2; margin-top:5px;" id="pv-tags-display">
                                    <span class="portal-tag">AI</span><span class="portal-tag">交通</span>
                                </div>
                            </div>
                            <div class="portal-nav"><span><i class="fa-solid fa-magnifying-glass"></i> 尋找挑戰</span></div>
                            <div class="portal-main">
                                <div class="portal-breadcrumb">首頁 > 挑戰專區 > 挑戰詳情</div>
                                
                                <div id="pv-cover-container" style="margin-bottom: 20px; border-radius: 8px; overflow: hidden; display: none;">
                                    <img id="pv-cover-img" src="" style="width: 100%; height: auto; display: block; object-fit: cover; max-height: 400px;">
                                </div>

                                <div class="portal-spec-card">
                                    <div class="spec-header"><span><i class="fa-solid fa-list-check"></i> 挑戰規格與實證需求</span></div>
                                    <table class="spec-table">
                                        <tr><th>挑戰題目</th><td id="pv-title" class="spec-highlight">${d.title}</td></tr>
                                        <tr><th>出題機關</th><td><span id="pv-agency">${d.agency}</span></td></tr>
                                        <tr><th>徵件截止</th><td id="pv-date" style="color:#d32f2f;">${d.date}</td></tr>
                                        <tr><th>獎助金</th><td id="pv-money">${d.money}</td></tr>
                                        <tr><th>執行期程</th><td id="pv-timeline">${d.timeline}</td></tr>
                                        <tr><th>實證場域</th><td id="pv-location">${d.location}</td></tr>
                                        <tr><th>需求規格</th><td id="pv-req">${d.req.replace(/\n/g, '<br>')}</td></tr>
                                    </table>
                                </div>
                                <div class="portal-sidebar">
                                    <div class="portal-sidebar-box">
                                        <div class="sidebar-title">目前進度</div>
                                        <div class="status-box"><div class="status-text">徵件中</div></div>
                                        <button class="apply-btn">立即提案</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 右側：發佈控制台 -->
                <aside>
                    <div class="publish-console">
                        <div class="console-section">
                            <div class="console-title"><i class="fa-solid fa-earth-asia"></i> 狀態控制</div>
                            <div class="toggle-row"><span class="toggle-label">前台公開顯示</span><label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div>
                            <div class="toggle-row"><span class="toggle-label">開啟線上投件</span><label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div>
                        </div>
                        <div style="margin-top: 20px;">
                            <button class="btn-action btn-save">儲存暫存草稿</button>
                            <button class="btn-action btn-main" onclick="alert('公告內容已成功發佈！')"><i class="fa-solid fa-cloud-arrow-up"></i> 更新發佈至前台</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    `;
    container.innerHTML = html;
    
    window.switchPreviewMode = function(mode) {
        const paneEdit = document.getElementById('pane-edit');
        const panePreview = document.getElementById('pane-preview');
        const btnEdit = document.getElementById('btn-edit');
        const btnPreview = document.getElementById('btn-preview');

        if (mode === 'edit') {
            paneEdit.style.display = 'block';
            panePreview.classList.remove('active');
            btnEdit.classList.add('active');
            btnPreview.classList.remove('active');
        } else {
            paneEdit.style.display = 'none';
            panePreview.classList.add('active');
            btnEdit.classList.remove('active');
            btnPreview.classList.add('active');
            window.syncPreviewData();
        }
    };

    window.syncPreviewData = function() {
        // Image Logic
        const uploadOption = document.getElementById('opt-upload');
        let coverSrc = '';
        
        if (uploadOption.checked) {
            // Check if file input has file (mocking preview)
            // In real world, we need FileReader. Here we just assume if value exists or use a placeholder if valid
            const fileInput = document.getElementById('in-cover-upload');
            if (fileInput.files && fileInput.files[0]) {
                 // Create object URL for preview
                 if (window.currentPreviewUrl) URL.revokeObjectURL(window.currentPreviewUrl);
                 window.currentPreviewUrl = URL.createObjectURL(fileInput.files[0]);
                 coverSrc = window.currentPreviewUrl;
            }
        } else {
             const selectedDefault = document.querySelector('input[name="default-cover"]:checked');
             if (selectedDefault) {
                 coverSrc = selectedDefault.value;
             }
        }

        const pvCoverContainer = document.getElementById('pv-cover-container');
        const pvCoverImg = document.getElementById('pv-cover-img');
        
        if (coverSrc) {
            pvCoverContainer.style.display = 'block';
            pvCoverImg.src = coverSrc;
        } else {
             // Optional: hide if no image
             // pvCoverContainer.style.display = 'none';
             // But requirement says "If no picture, use default image". 
             // If upload is selected but empty, maybe fallback to default or show nothing?
             // User says: "沒圖的話用預設圖". This implies default should be selected by default.
             if (uploadOption.checked) {
                 pvCoverContainer.style.display = 'none'; 
             }
        }

        document.getElementById('pv-title').innerText = document.getElementById('in-title').value;
        document.getElementById('pv-agency').innerText = document.getElementById('in-agency').value;
        document.getElementById('pv-date').innerText = document.getElementById('in-date').value;
        document.getElementById('pv-money').innerText = document.getElementById('in-money').value;
        document.getElementById('pv-timeline').innerText = document.getElementById('in-timeline').value;
        document.getElementById('pv-location').innerText = document.getElementById('in-location').value;
        document.getElementById('pv-req').innerHTML = document.getElementById('in-req').value.replace(/\n/g, '<br>');
        window.syncTagsToPreview();
    };

    window.toggleCoverOption = function() {
        const isUpload = document.getElementById('opt-upload').checked;
        const defaultArea = document.getElementById('default-covers-area');
        const uploadInput = document.getElementById('in-cover-upload');
        
        if (isUpload) {
            defaultArea.style.display = 'none';
            uploadInput.disabled = false;
        } else {
            defaultArea.style.display = 'grid';
            uploadInput.disabled = true;
        }
        window.syncPreviewData();
    };

    window.handleCoverUpload = function(input) {
        window.syncPreviewData();
    };

    window.handleTagKey = function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            window.addNewTag();
        }
    };

    window.addNewTag = function() {
        const input = document.getElementById('tag-input');
        const tagValue = input.value.trim().replace('#', '');
        if (tagValue === '') return;
        const container = document.getElementById('tag-editor-container');
        const newTag = document.createElement('span');
        newTag.className = 'backend-tag';
        newTag.innerHTML = `${tagValue} <i class="fa-solid fa-xmark" onclick="removeTag(this)"></i>`;
        container.insertBefore(newTag, container.querySelector('.tag-input-wrapper'));
        input.value = '';
        window.syncTagsToPreview();
    };

    window.removeTag = function(element) {
        element.parentElement.remove();
        window.syncTagsToPreview();
    };

    window.syncTagsToPreview = function() {
        const backendTags = document.querySelectorAll('.backend-tag');
        const previewContainer = document.getElementById('pv-tags-display');
        previewContainer.innerHTML = '';
        backendTags.forEach(tag => {
            const text = tag.innerText.trim();
            const portalTag = document.createElement('span');
            portalTag.className = 'portal-tag';
            portalTag.innerText = text;
            previewContainer.appendChild(portalTag);
        });
    };
}

// ------------------------------------------
// 通用 TypeB (保留)
// ------------------------------------------
function renderTypeB(container, tabData, isLastTab) {
    // 舊有邏輯，備用
    container.innerHTML = 'Legacy TypeB';
}

// ==========================================
// 4. 互動操作 (Actions)
// ==========================================

function switchStage(index) {
    appState.currentStageIndex = index;
    appState.currentTabIndex = 0;
    renderAll();
}

function switchTab(index) {
    appState.currentTabIndex = index;
    renderContent();
    renderTabs();
}

function editStageName(index, event) {
    if(event) event.stopPropagation();
    const stage = appState.stages[index];
    const newName = prompt("請輸入階段名稱：", stage.name);
    if (newName && newName.trim() !== "") {
        stage.name = newName;
        saveState();
    }
}

function editTabName(index, event) {
    if(event) event.stopPropagation(); 
    const currentStage = appState.stages[appState.currentStageIndex];
    const tab = currentStage.tabs[index];
    const newName = prompt("請輸入頁籤名稱：", tab.name);
    if (newName && newName.trim() !== "") {
        tab.name = newName;
        saveState();
    }
}

function promptAddStage() {
    const name = prompt("請輸入新階段名稱：", "新階段");
    if (!name) return;
    
    appState.stages.push({
        id: `stage-${Date.now()}`,
        name: name,
        icon: "fa-folder-open",
        isFixed: false,
        tabs: [
            {
                id: `tab-${Date.now()}`,
                name: "預設清單",
                type: "TypeA",
                isFixed: false,
                data: { columns: ["項目", "內容", "狀態"], items: [] }
            }
        ]
    });
    saveState();
    switchStage(appState.stages.length - 1);
}

function openTypeModal() {
    document.getElementById('type-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('type-modal').style.display = 'none';
}

function selectType(type) {
    closeModal();
    const name = prompt("請輸入新頁面名稱：", "新功能頁");
    if (!name) return;

    const currentStage = appState.stages[appState.currentStageIndex];
    let newData = {};
    if(type === 'TypeA') {
        newData = { columns: ["工作項目", "日期", "檢核", "狀態", "備註"], items: [] };
    } else {
        newData = { headers: ["編號", "名稱", "摘要", "日期", "狀態"], items: [] };
    }

    currentStage.tabs.push({
        id: `tab-${Date.now()}`,
        name: name,
        type: type,
        isFixed: false,
        data: newData
    });
    
    saveState();
    switchTab(currentStage.tabs.length - 1);
}

function deleteStage(index) {
    if(!confirm("確定要刪除整個階段嗎？")) return;
    appState.stages.splice(index, 1);
    if(index <= appState.currentStageIndex) {
        appState.currentStageIndex = Math.max(0, appState.currentStageIndex - 1);
    }
    saveState();
}

function deleteTab(index) {
    if(!confirm("確定刪除此頁籤？")) return;
    const currentStage = appState.stages[appState.currentStageIndex];
    currentStage.tabs.splice(index, 1);
    if(currentStage.tabs.length === 0) {
         currentStage.tabs.push({ id: `tab-${Date.now()}`, name: "空白", type: "TypeA", isFixed: false, data: {columns:[], items:[]} });
    }
    appState.currentTabIndex = 0;
    saveState();
}

function addItemTypeA() {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    currentTab.data.items.push({
        id: currentTab.data.items.length + 1,
        title: "新工作項目",
        date: "2026-01-01",
        type: "待定",
        status: "FALSE",
        note: "請編輯",
        docs: []
    });
    saveState();
}

function deleteItemTypeA(idx) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    currentTab.data.items.splice(idx, 1);
    saveState();
}

function updateItemTypeA(idx, key, value) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    if(currentTab.data.items[idx]) {
        currentTab.data.items[idx][key] = value;
    saveState();
}
}

// 啟動
window.onload = initApp;

// ==========================================
// 5. 詳細資料編輯功能 (Detail Editor)
// ==========================================

function toggleEditDetail(id) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const item = currentTab.data.items.find(i => i.id === id);
    if (item) {
        if (!item.isDetailEdit) {
            // 進入編輯模式前，先備份一份資料以供取消時還原 (可選，這裡簡化直接切換)
            item.isDetailEdit = true;
        } else {
            // 已經在編輯模式，可能是按錯或切換，這裡假設是切換狀態
            item.isDetailEdit = false;
        }
        saveState();
        
        // 確保展開
        setTimeout(() => {
            const row = document.getElementById(id);
            if(row && row.style.display === 'none') {
                toggleDetailRow(id);
            }
        }, 50);
    }
}

function renderDetailEditor(item) {
    let html = `<div class="detail-editor-box" style="background:#fff3e0; padding:15px; border-radius:6px; border:1px solid #ffe0b2;">`;
    
    html += `<div id="editor-fields-${item.id}">`;
    item.details.forEach((d, idx) => {
        html += `
            <div class="edit-field-row" style="display:flex; gap:10px; margin-bottom:10px; align-items:flex-start;">
                <div style="width: 200px; flex-shrink:0;">
                    <label style="font-size:0.8rem; color:#666;">欄位名稱</label>
                    <input type="text" class="detail-label-input" value="${d.label}" data-idx="${idx}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                </div>
                <div style="flex-grow:1;">
                    <label style="font-size:0.8rem; color:#666;">內容 (支援 HTML)</label>
                    <textarea class="detail-value-input" data-idx="${idx}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; min-height:60px;">${d.value}</textarea>
                    <label style="display:inline-flex; align-items:center; gap:5px; margin-top:5px; font-size:0.8rem; color:#666;">
                        <input type="checkbox" class="detail-full-check" data-idx="${idx}" ${d.fullWidth ? 'checked' : ''}> 寬欄顯示
                    </label>
                    <label style="display:inline-flex; align-items:center; gap:5px; margin-top:5px; margin-left:10px; font-size:0.8rem; color:#666;">
                        <input type="checkbox" class="detail-highlight-check" data-idx="${idx}" ${d.highlight ? 'checked' : ''}> 重點標示
                    </label>
                </div>
                <div style="padding-top: 24px;">
                    <button class="btn btn-outline" style="color:var(--danger-color); border-color:#ffcdd2;" onclick="removeDetailField('${item.id}', ${idx})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    html += `</div>`;

    html += `
        <div style="margin-top:10px; margin-bottom:20px;">
            <button class="btn btn-outline" style="border-style:dashed; width:100%;" onclick="addDetailField('${item.id}')">
                <i class="fa-solid fa-plus"></i> 新增欄位
            </button>
        </div>
        
        <div style="text-align:right; border-top:1px solid #ffe0b2; padding-top:15px;">
            <button class="btn btn-outline" onclick="cancelEditDetail('${item.id}')">取消</button>
            <button class="btn btn-primary" onclick="saveDetail('${item.id}')"><i class="fa-solid fa-floppy-disk"></i> 儲存變更</button>
        </div>
    `;
    
    html += `</div>`;
    return html;
}

function syncDetailFromDOM(id) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const item = currentTab.data.items.find(i => i.id === id);
    if (!item) return;

    const container = document.getElementById(`editor-fields-${id}`);
    if (!container) return;

    const rows = container.getElementsByClassName('edit-field-row');
    const newDetails = [];

    Array.from(rows).forEach(row => {
        const labelInput = row.querySelector('.detail-label-input');
        const valueInput = row.querySelector('.detail-value-input');
        const fullCheck = row.querySelector('.detail-full-check');
        const highlightCheck = row.querySelector('.detail-highlight-check');

        newDetails.push({
            label: labelInput.value,
            value: valueInput.value,
            fullWidth: fullCheck.checked,
            highlight: highlightCheck.checked
        });
    });

    item.details = newDetails;
}

function addDetailField(id) {
    syncDetailFromDOM(id); // 先同步當前輸入
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const item = currentTab.data.items.find(i => i.id === id);
    if(item) {
        item.details.push({ label: "新欄位", value: "", fullWidth: true });
        saveState();
    }
}

function removeDetailField(id, idx) {
    if(!confirm("確定刪除此欄位？")) return;
    syncDetailFromDOM(id); // 先同步當前輸入
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const item = currentTab.data.items.find(i => i.id === id);
    if(item) {
        item.details.splice(idx, 1);
        saveState();
    }
}

function saveDetail(id) {
    syncDetailFromDOM(id);
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const item = currentTab.data.items.find(i => i.id === id);
    if(item) {
        // 自動同步關鍵欄位到外層列表
        const titleDetail = item.details.find(d => d.label === "挑戰題目" || d.label === "題目" || d.label === "挑戰題目摘要");
        if(titleDetail) item.col3 = titleDetail.value;

        const agencyDetail = item.details.find(d => d.label === "出題單位全銜" || d.label === "出題單位");
        if(agencyDetail) item.col2 = agencyDetail.value;

        item.isDetailEdit = false;
        saveState();
    }
}

function cancelEditDetail(id) {
    if(!confirm("確定取消編輯？未儲存的內容將會遺失。")) return;
    // 這裡簡單做：直接重新讀取 state (因為 syncDetailFromDOM 會寫入 state，但如果不 call saveState 其實不會持久化... 
    // 等等，syncDetailFromDOM 直接改了 appState 記憶體物件。
    // 如果要真正取消，應該在進入編輯時 clone 一份。
    // 但因為我們目前架構較簡單，直接 reload state from storage 可能是最快還原法，
    // 前提是中間沒有觸發 saveState。
    // 但 add/remove field 會觸發 saveState。
    // 如果 add/remove 了，就已經存了。
    // 簡單處理：取消就只是退出編輯模式，不做複雜還原，除非我們實作 deep clone undo。
    // 為了使用者體驗，這裏僅退出模式，保留剛才的操作結果 (若有 add/remove)。
    // 若只是改文字沒 save，syncDetailFromDOM 還沒跑，所以直接退出會還原文字。
    
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    const item = currentTab.data.items.find(i => i.id === id);
    if(item) {
        item.isDetailEdit = false;
        // 為了確保文字還原，重新讀取
        loadState(); 
        renderAll();
    }
}
