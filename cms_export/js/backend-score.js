// 1. 展開/收合功能
function toggleDetails(id) {
    const row = document.getElementById(id);
    row.classList.toggle('hidden-row');
    row.classList.toggle('expanded');
}

// 2. 編輯廠商資料功能
function toggleEditMode(rowId) {
    const container = document.getElementById(rowId);
    const btn = document.getElementById('edit-btn-1');
    const fields = container.querySelectorAll('.detail-value');
    const isEditing = btn.getAttribute('data-editing') === 'true';

    if (!isEditing) {
        fields.forEach(f => { f.contentEditable = true; f.classList.add('editing'); });
        btn.innerHTML = '<i class="fa-solid fa-check"></i> 儲存資料';
        btn.style.backgroundColor = 'var(--success-color)';
        btn.setAttribute('data-editing', 'true');
    } else {
        fields.forEach(f => { f.contentEditable = false; f.classList.remove('editing'); });
        btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> 編輯資料';
        btn.style.backgroundColor = '';
        btn.setAttribute('data-editing', 'false');
        alert('基本資料已暫存！');
    }
}

// 3. 即時評分計算邏輯
// 初始化評分監聽器
document.addEventListener('input', function(e) {
    // 檢查是否為評分輸入框
    if (e.target.classList.contains('score-input')) {
        calculateScores();
        triggerAutoSave();
    }
    // 檢查是否為評語區
    if (e.target.id === 'comment-area') {
        triggerAutoSave();
    }
});

function calculateScores() {
    let grandTotal = 0;
    const rows = document.querySelectorAll('.criteria-row');

    rows.forEach(row => {
        const input = row.querySelector('.score-input');
        const weightedCol = row.querySelector('.weighted-score');
        const weight = parseFloat(input.dataset.weight);
        let val = parseFloat(input.value) || 0;

        if (val > 100) {
            input.classList.add('error');
            val = 0;
        } else {
            input.classList.remove('error');
        }

        const weighted = (val * weight).toFixed(1);
        weightedCol.innerText = weighted;
        grandTotal += parseFloat(weighted);
    });

    document.getElementById('grand-total').innerText = grandTotal.toFixed(1);
}

let saveTimer;
function triggerAutoSave() {
    const statusLabel = document.getElementById('save-status');
    statusLabel.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 同步中...';
    
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        statusLabel.innerHTML = '<i class="fa-solid fa-cloud-check" style="color:var(--success-color)"></i> 已自動暫存';
    }, 800); 
}
