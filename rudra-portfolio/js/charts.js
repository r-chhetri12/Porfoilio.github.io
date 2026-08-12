/* ==========================================================================
   Rudra Chhetri Portfolio - Interactive Chart.js Visualizers
   Renders real interactive charts for projects & live SQL playground outputs
   ========================================================================== */

// Global Chart.js dark theme defaults
if (window.Chart) {
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Outfit', sans-serif";
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.95)';
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.1)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.plugins.tooltip.cornerRadius = 10;
}

window.initProjectCharts = function() {
  // 1. Telecom Churn Chart
  const ctxChurn = document.getElementById('chart-churn');
  if (ctxChurn && !ctxChurn.chartInstance) {
    ctxChurn.chartInstance = new Chart(ctxChurn, {
      type: 'bar',
      data: {
        labels: ['0-1 Month', '1-6 Months', '6-12 Months', '1-2 Years', '2+ Years'],
        datasets: [{
          label: 'Churn Rate (%)',
          data: [62, 42, 28, 18, 9],
          backgroundColor: [
            'rgba(249, 115, 22, 0.85)',
            'rgba(245, 158, 11, 0.85)',
            'rgba(99, 102, 241, 0.85)',
            'rgba(6, 182, 212, 0.85)',
            'rgba(16, 185, 129, 0.85)'
          ],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Telecom Churn Risk by Customer Tenure Bucket', color: '#f8fafc' }
        },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, text: 'Churn %' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // 2. Sales Performance Chart
  const ctxSales = document.getElementById('chart-sales');
  if (ctxSales && !ctxSales.chartInstance) {
    ctxSales.chartInstance = new Chart(ctxSales, {
      type: 'bar',
      data: {
        labels: ['New Zealand', 'USA', 'UK', 'India', 'Australia', 'Canada'],
        datasets: [
          {
            label: 'Sales Revenue ($M)',
            data: [6.2, 5.8, 5.1, 4.7, 4.3, 3.9],
            backgroundColor: 'rgba(6, 182, 212, 0.85)',
            borderRadius: 6
          },
          {
            label: 'Profit ($M)',
            data: [4.1, 3.6, 3.2, 2.9, 2.7, 2.3],
            backgroundColor: 'rgba(16, 185, 129, 0.85)',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Sales Revenue vs Net Profit by Region ($34M Total)', color: '#f8fafc' }
        },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // 3. HR Attrition Chart
  const ctxHR = document.getElementById('chart-hr');
  if (ctxHR && !ctxHR.chartInstance) {
    ctxHR.chartInstance = new Chart(ctxHR, {
      type: 'doughnut',
      data: {
        labels: ['Production / Factory', 'R&D / Technical', 'Sales & Marketing', 'Human Resources', 'Finance / Admin'],
        datasets: [{
          data: [45, 24, 18, 8, 5],
          backgroundColor: [
            '#ef4444',
            '#f59e0b',
            '#6366f1',
            '#06b6d4',
            '#10b981'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' },
          title: { display: true, text: 'Employee Exits by Department (%)', color: '#f8fafc' }
        }
      }
    });
  }

  // 4. Call Center Analytics Chart
  const ctxCall = document.getElementById('chart-callcenter');
  if (ctxCall && !ctxCall.chartInstance) {
    ctxCall.chartInstance = new Chart(ctxCall, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Call Volume',
          data: [1200, 1350, 1420, 1380, 1500, 1850, 1920],
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.15)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'CSAT Rating (out of 5)',
          data: [4.1, 4.2, 4.0, 4.1, 3.9, 3.7, 3.6],
          borderColor: '#38bdf8',
          borderDash: [5, 5],
          yAxisID: 'y1'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Weekly Call Volume vs CSAT Score (Weekend Spike)', color: '#f8fafc' }
        },
        scales: {
          y: { type: 'linear', position: 'left', grid: { color: 'rgba(255,255,255,0.05)' } },
          y1: { type: 'linear', position: 'right', min: 3, max: 5, grid: { display: false } },
          x: { grid: { display: false } }
        }
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.Chart) {
    window.initProjectCharts();
  }
});
