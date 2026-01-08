// ==========================================
// 時程查詢頁 JavaScript (Calendar Page Scripts)
// ==========================================

// Filter Radio Logic (Custom Style)
const labels = document.querySelectorAll('.filter-radio label');
labels.forEach(label => {
    const input = document.getElementById(label.getAttribute('for'));
    if (input) {
        input.addEventListener('change', () => {
            // Radio button change handling
            // Can add additional logic here if needed
        });
    }
});
