// 1. 線性趨勢圖 (Trend Chart)
const ctxTrend = document.getElementById('trendChart').getContext('2d');
new Chart(ctxTrend, {
    type: 'line',
    data: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
        datasets: [{
            label: '新創投件數',
            data: [12, 19, 33, 45, 28, 42, 55, 48],
            borderColor: '#00796b',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(0, 121, 107, 0.1)'
        }, {
            label: '機關出題數',
            data: [5, 8, 12, 10, 6, 15, 12, 9],
            borderColor: '#3498db',
            tension: 0.4
        }]
    },
    options: { plugins: { legend: { position: 'bottom' } } }
});

// 2. 圓餅圖 (Pie Chart)
const ctxPie = document.getElementById('pieChart').getContext('2d');
new Chart(ctxPie, {
    type: 'doughnut',
    data: {
        labels: ['人工智慧', '物聯網', '大數據', '資安', '其他'],
        datasets: [{
            data: [40, 25, 15, 10, 10],
            backgroundColor: ['#00796b', '#26a69a', '#4db6ac', '#80cbc4', '#b2dfdb']
        }]
    },
    options: { plugins: { legend: { position: 'bottom' } } }
});

// 3. 條形圖 (Bar Chart)
const ctxBar = document.getElementById('barChart').getContext('2d');
new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['交通局', '衛生局', '環保局', '經發局', '教育局'],
        datasets: [{
            label: '已完成簽約案件',
            data: [5, 3, 4, 2, 6],
            backgroundColor: '#00796b'
        }, {
            label: '審核中案件',
            data: [2, 4, 1, 3, 2],
            backgroundColor: '#ff9800'
        }]
    },
    options: { 
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: 'bottom' } }
    }
});
