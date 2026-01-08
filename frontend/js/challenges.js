// ==========================================
// 挑戰列表頁 JavaScript (Challenges Page Scripts)
// ==========================================

// Toggle Grid/List View
function setView(mode) {
    const container = document.getElementById('challenges-container');
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');
    
    if (mode === 'grid') {
        container.classList.remove('view-list', 'grid-cols-1');
        container.classList.add('grid-cols-1', 'md:grid-cols-2');
        gridBtn.classList.add('bg-primary', 'text-white');
        gridBtn.classList.remove('text-gray-400');
        listBtn.classList.remove('bg-primary', 'text-white');
        listBtn.classList.add('text-gray-400');
    } else {
        container.classList.add('view-list', 'grid-cols-1');
        container.classList.remove('md:grid-cols-2');
        listBtn.classList.add('bg-primary', 'text-white');
        listBtn.classList.remove('text-gray-400');
        gridBtn.classList.remove('bg-primary', 'text-white');
        gridBtn.classList.add('text-gray-400');
    }
}

// Toggle Filter Logic
function toggleFilter(listId, iconId) {
    const list = document.getElementById(listId);
    const icon = document.getElementById(iconId);
    list.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}
