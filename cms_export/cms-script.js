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
                name: "出題公告檢核",
                type: "TypeA", // 版型 A：清單與檢核
                isFixed: true,
                data: {
                    columns: ["工項", "作業內容與日期", "需求文件檢核", "狀態", "說明"],
                    items: [
                        { id: 1, title: "出題須知與公告", date: "2026-01-23", type: "線上", docs: ["(公文)作業手冊公告函", "推動作業手冊"], status: "TRUE", note: "需確認內容定稿" },
                        { id: 2, title: "機關出題申請說明會", date: "2026-02-20", type: "實體", docs: ["說明簡報", "活動展架"], status: "FALSE", note: "於台大醫進行推廣" },
                        { id: 3, title: "機關出題收件與審查", date: "2026-02-27", type: "線上", docs: ["出題計畫書"], status: "FALSE", note: "檢核資格" }
                    ]
                }
            },
            {
                id: "tab-1-2",
                name: "機關出題列表",
                type: "TypeB", // 版型 B：展開明細
                isFixed: true,
                data: {
                    headers: ["案號", "出題單位", "題目摘要", "預算金額", "狀態"],
                    items: [
                        {
                            id: "issue-1",
                            col1: "114-T058",
                            col2: "臺北市政府交通局",
                            col3: "智慧路口：即時交通影像辨識",
                            col4: "NT$ 2,500,000",
                            status: "審核通過",
                            statusClass: "tag-pass",
                            details: [
                                { label: "承辦人", value: "林小明 (專案技正)" },
                                { label: "聯繫電話", value: "02-2720-8889" },
                                { label: "現況痛點", value: "路口回堵嚴重，缺乏車種辨識數據。", fullWidth: true },
                                { label: "技術規格", value: "日間準確率 > 95%，延遲 < 2秒。", fullWidth: true }
                            ]
                        },
                        {
                            id: "issue-2",
                            col1: "114-H012",
                            col2: "衛福部臺北醫院",
                            col3: "AI輔助急診檢傷分類系統",
                            col4: "NT$ 1,800,000",
                            status: "審核中",
                            statusClass: "tag-review",
                            details: [
                                { label: "承辦人", value: "陳大文 (資訊室主任)" },
                                { label: "聯繫電話", value: "02-2276-5566" },
                                { label: "現況痛點", value: "急診檢傷人力不足，判斷標準不一。", fullWidth: true }
                            ]
                        }
                    ]
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
                name: "徵件作業檢核",
                type: "TypeA",
                isFixed: true,
                data: {
                    columns: ["工項", "作業內容與日期", "文件檢核", "狀態", "說明"],
                    items: [
                        { id: 1, title: "新創解題說明會", date: "2026-04-10", type: "實體", docs: ["說明會簡報", "直播連結"], status: "PENDING", note: "預計於 TTA 舉辦" },
                        { id: 2, title: "解題提案收件截止", date: "2026-05-15", type: "線上", docs: ["提案系統"], status: "PENDING", note: "截止時間 17:00" }
                    ]
                }
            },
            {
                id: "tab-2-2",
                name: "新創提案列表",
                type: "TypeB",
                isFixed: true,
                data: {
                    headers: ["編號", "提案團隊", "對應題目", "申請日期", "審查狀態"],
                    items: [
                        {
                            id: "startup-1",
                            col1: "ST-001",
                            col2: "智通科技股份有限公司",
                            col3: "智慧路口解決方案",
                            col4: "2026/05/10",
                            status: "資格符",
                            statusClass: "tag-pass",
                            details: [
                                { label: "統編", value: "12345678" },
                                { label: "負責人", value: "王小明" },
                                { label: "提案摘要", value: "使用 Edge AI 攝影機進行邊緣運算。", fullWidth: true }
                            ]
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
    stages: []
};

// 初始化
function initApp() {
    loadState();
    renderAll();
}

// 讀取狀態 (LocalStorage + Default)
function loadState() {
    const saved = localStorage.getItem('cms_stages_v1');
    if (saved) {
        appState.stages = JSON.parse(saved);
        // 確保固定階段資料不會因為舊 Cache 而遺失 (簡單合併邏輯)
        // 實務上這裡可能需要更複雜的 merge，但在原型中我們假設 LocalStorage 是最新的
    } else {
        appState.stages = JSON.parse(JSON.stringify(DEFAULT_STAGES));
    }
}

// 儲存狀態
function saveState() {
    localStorage.setItem('cms_stages_v1', JSON.stringify(appState.stages));
    renderAll();
}

// ==========================================
// 3. 渲染邏輯 (Rendering)
// ==========================================

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

        // 如果是非固定階段
        if (!stage.isFixed && isActive) {
            // 編輯按鈕：移到名稱右側
            editIconHtml = `
                <i class="fa-solid fa-pen step-edit-btn" 
                   onclick="editStageName(${index}, event)" 
                   title="編輯名稱"></i>
            `;
            
            // 刪除按鈕：維持右上角懸浮
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

    // 新增階段按鈕
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
        
        // 如果是非固定 Tab 且當前選中，顯示編輯筆
        if (!tab.isFixed && isActive) {
            tabContent += ` <i class="fa-solid fa-pen" style="font-size:0.7em; margin-left:5px; opacity:0.5; cursor:pointer;" onclick="editTabName(${index}, event)" title="編輯名稱"></i>`;
        }
        
        el.innerHTML = tabContent;
        container.appendChild(el);
    });

    // 新增頁籤按鈕
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
    // 檢查是否為該階段下的最後一個 Tab
    const isLastTab = currentStage.tabs.length <= 1;

    // 根據版型類型呼叫對應渲染器
    if (currentTab.type === 'TypeA') {
        renderTypeA(container, currentTab, isLastTab);
    } else if (currentTab.type === 'TypeB') {
        renderTypeB(container, currentTab, isLastTab);
    } else {
        container.innerHTML = '未知版型';
    }
}

// ------------------------------------------
// 版型 A：清單與檢核 (Template A)
// ------------------------------------------
function renderTypeA(container, tabData, isLastTab) {
    const data = tabData.data;
    const isDeletable = !tabData.isFixed && !isLastTab; // 非固定且不是最後一個才可刪
    
    let deleteBtnHtml = '';
    if (isDeletable) {
        deleteBtnHtml = `
            <button class="btn btn-outline" style="color:var(--danger-color); border-color:var(--danger-color); margin-right:10px;" onclick="deleteTab(${appState.currentTabIndex})">
                <i class="fa-solid fa-trash-can"></i> 刪除此頁籤
            </button>
        `;
    }

    let html = `
        <div class="content-box">
            <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="color:var(--primary-color); margin:0; cursor:pointer;" onclick="editTabName(${appState.currentTabIndex})" title="點擊編輯名稱">${tabData.name} - 待辦事項</h3>
                <div>
                    ${deleteBtnHtml}
                    <button class="btn btn-add" onclick="addItemTypeA()"><i class="fa-solid fa-plus"></i> 新增工項</button>
                </div>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        ${data.columns.map(col => `<th>${col}</th>`).join('')}
                        <th width="100">動作</th>
                    </tr>
                </thead>
                <tbody>
    `;

    data.items.forEach((item, idx) => {
        const statusColor = item.status === 'TRUE' ? 'green' : (item.status === 'PENDING' ? 'orange' : '#ccc');
        const docsHtml = item.docs ? item.docs.map(d => `<div><input type="checkbox"> ${d}</div>`).join('') : '';
        
        html += `
            <tr>
                <td>${item.id}</td>
                <td contenteditable="true" onblur="updateItemTypeA(${idx}, 'title', this.innerText)">
                    <div style="font-weight:bold;">${item.title}</div>
                    <div style="font-size:0.8rem; color:#888;">${item.date} | ${item.type}</div>
                </td>
                <td>${docsHtml}</td>
                <td><span style="color:${statusColor}; font-weight:bold;">● ${item.status}</span></td>
                <td style="color:#666; font-size:0.9rem;" contenteditable="true" onblur="updateItemTypeA(${idx}, 'note', this.innerText)">${item.note || ''}</td>
                <td>
                    <button class="btn btn-delete" onclick="deleteItemTypeA(${idx})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;
    container.innerHTML = html;
}

// ------------------------------------------
// 版型 B：展開明細 (Template B)
// ------------------------------------------
function renderTypeB(container, tabData, isLastTab) {
    const data = tabData.data;
    const isDeletable = !tabData.isFixed && !isLastTab;

    let deleteBtnHtml = '';
    if (isDeletable) {
        deleteBtnHtml = `
            <button class="btn btn-outline" style="color:var(--danger-color); border-color:var(--danger-color); margin-right:10px;" onclick="deleteTab(${appState.currentTabIndex})">
                <i class="fa-solid fa-trash-can"></i> 刪除此頁籤
            </button>
        `;
    }

    let html = `
        <div class="content-box">
             <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="color:var(--primary-color); margin:0; cursor:pointer;" onclick="editTabName(${appState.currentTabIndex})" title="點擊編輯名稱">${tabData.name} - 詳細資料列表</h3>
                <div>
                    ${deleteBtnHtml}
                    <button class="btn btn-add" onclick="addItemTypeB()"><i class="fa-solid fa-plus"></i> 新增資料</button>
                </div>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        ${data.headers.map(h => `<th>${h}</th>`).join('')}
                        <th width="100">動作</th>
                    </tr>
                </thead>
                <tbody>
    `;

    data.items.forEach((item, idx) => {
        html += `
            <tr>
                <td contenteditable="true" onblur="updateItemTypeB(${idx}, 'col1', this.innerText)">${item.col1}</td>
                <td><div style="font-weight:bold;" contenteditable="true" onblur="updateItemTypeB(${idx}, 'col2', this.innerText)">${item.col2}</div></td>
                <td contenteditable="true" onblur="updateItemTypeB(${idx}, 'col3', this.innerText)">${item.col3}</td>
                <td contenteditable="true" onblur="updateItemTypeB(${idx}, 'col4', this.innerText)">${item.col4}</td>
                <td><span class="${item.statusClass || 'tag'}">${item.status}</span></td>
                <td>
                    <button class="btn btn-outline" onclick="toggleDetailRow('${item.id}')">詳情</button>
                    <button class="btn btn-delete" onclick="deleteItemTypeB(${idx})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
            <tr id="${item.id}" class="hidden-row" style="display:none; background:#fafafa;">
                <td colspan="${data.headers.length + 1}">
                    <div class="detail-info-grid">
                        ${item.details.map(d => `
                            <div class="detail-label">${d.label}</div>
                            <div class="detail-value ${d.fullWidth ? 'full-width' : ''}" contenteditable="true">${d.value}</div>
                        `).join('')}
                    </div>
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;
    container.innerHTML = html;
    
    // 綁定 toggle 事件
    window.toggleDetailRow = function(id) {
        const el = document.getElementById(id);
        if (el.style.display === 'none') {
            el.style.display = 'table-row';
        } else {
            el.style.display = 'none';
        }
    };
}


// ==========================================
// 4. 互動操作 (Actions)
// ==========================================

function switchStage(index) {
    appState.currentStageIndex = index;
    appState.currentTabIndex = 0; // 切換階段時重置 Tab
    renderAll();
}

function switchTab(index) {
    appState.currentTabIndex = index;
    renderContent(); // 這裡只要重繪內容區和 Tab 樣式
    renderTabs();
}

// 修改名稱相關功能
function editStageName(index, event) {
    if(event) event.stopPropagation(); // 防止觸發 switchStage
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
    
    // 新增時先給一個預設的空 Tab，讓使用者進去再刪改或新增
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

// Modal 相關邏輯
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
    // 如果刪到剩0個(不太可能因為有固定的)，或者刪掉當前的，要切換 index
    if(index <= appState.currentStageIndex) {
        appState.currentStageIndex = Math.max(0, appState.currentStageIndex - 1);
    }
    saveState();
}


function deleteTab(index) {
    if(!confirm("確定刪除此頁籤？")) return;
    const currentStage = appState.stages[appState.currentStageIndex];
    currentStage.tabs.splice(index, 1);
    
    // 已刪除邏輯會由 UI 防止 "最後一個被刪掉"，但為了雙重保險：
    if(currentStage.tabs.length === 0) {
         currentStage.tabs.push({ id: `tab-${Date.now()}`, name: "空白", type: "TypeA", isFixed: false, data: {columns:[], items:[]} });
    }
    
    appState.currentTabIndex = 0;
    saveState();
}

// 簡單的資料更新 (ContentEditable 反寫回資料)
function updateItemTypeA(idx, key, value) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    if(currentTab.data.items[idx]) {
        currentTab.data.items[idx][key] = value;
        saveState(); // 不重繪，避免游標跳掉
    }
}
function updateItemTypeB(idx, key, value) {
     const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    if(currentTab.data.items[idx]) {
        currentTab.data.items[idx][key] = value;
        saveState();
    }
}


function addItemTypeA() {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    currentTab.data.items.push({
        id: currentTab.data.items.length + 1,
        title: "新工作項目",
        date: "2026-01-01",
        type: "待定",
        status: "PENDING",
        note: "請編輯"
    });
    saveState();
}

function deleteItemTypeA(idx) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    currentTab.data.items.splice(idx, 1);
    saveState();
}

function addItemTypeB() {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    currentTab.data.items.push({
        id: `new-${Date.now()}`,
        col1: "NEW-001",
        col2: "新資料項目",
        col3: "請點擊詳情編輯內容",
        col4: "-",
        status: "草稿",
        details: [
            { label: "欄位1", value: "內容..." },
            { label: "欄位2", value: "內容..." }
        ]
    });
    saveState();
}

function deleteItemTypeB(idx) {
    const currentTab = appState.stages[appState.currentStageIndex].tabs[appState.currentTabIndex];
    currentTab.data.items.splice(idx, 1);
    saveState();
}

// 啟動
window.onload = initApp;
