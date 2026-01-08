// ==========================================
// 提案申請頁 JavaScript (Challenge Apply Page Scripts)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const proposalForm = document.getElementById('proposal-form');
    
    if (proposalForm) {
        proposalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Redirect to success page
            window.location.href = 'proposal-success.html';
        });
    }
});
