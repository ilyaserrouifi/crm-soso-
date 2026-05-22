function renderAnalytics() {
  return `
<div class="page-head">
  <div>
    <div class="page-head-title">Analytics</div>
    <div class="page-head-sub">Team performance, revenue trends and conversion funnel</div>
  </div>
  <div style="display:flex;gap:8px;">
    <select id="chart-period" class="select" style="width:100px;" onchange="refreshChart()">
      <option value="6">6 months</option>
      <option value="3">3 months</option>
      <option value="12">12 months</option>
    </select>
    <button class="btn btn-ghost">Export PDF</button>
  </div>
</div>

<div class="grid-2 mt-20" style="gap:20px;">
  <!-- MRR Growth Chart -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">📈 MRR Growth</div>
      <span class="badge badge-accent">+7.1% vs last month</span>
    </div>
    <div class="card-body">
      <canvas id="mrrChart" style="height:250px; width:100%"></canvas>
    </div>
  </div>

  <!-- Revenue by Niche (Pie Chart) -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">🥧 Revenue by Niche</div>
      <span class="badge badge-accent">Total: $48,500</span>
    </div>
    <div class="card-body">
      <canvas id="nicheChart" style="height:250px; width:100%"></canvas>
    </div>
  </div>
</div>

<div class="grid-2 mt-20" style="gap:20px;">
  
  <!-- Conversion Funnel -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">📊 Conversion Funnel</div>
      <span class="badge badge-accent">This Month</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;">
      ${[
        { stage:'Leads Uploaded', count:1500, pct:100, color:'var(--text3)' },
        { stage:'Contacted', count:800, pct:53.3, color:'var(--blue)' },
        { stage:'Meeting Booked', count:30, pct:3.75, color:'var(--teal)' },
        { stage:'Proposal Sent', count:15, pct:50, color:'var(--accent)' },
        { stage:'Closed Won', count:6, pct:40, color:'var(--green)' }
      ].map(s => `
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:110px;font-size:12px;color:var(--text2);text-align:right">${s.stage}</div>
          <div style="flex:1;height:32px;background:var(--bg4);border-radius:var(--r-sm);overflow:hidden;position:relative;">
            <div style="height:100%;width:${s.pct}%;background:${s.color};opacity:.8;border-radius:var(--r-sm);"></div>
            <div style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:12px;font-weight:600;color:#fff;">${s.count.toLocaleString()}</div>
          </div>
          <div style="width:45px;font-size:11px;color:${s.color};text-align:right;font-family:var(--mono)">${s.pct}%</div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Team Leaderboard -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">🏆 Team Leaderboard — May 2026</div>
      <span class="badge badge-accent">Top Performer: Sara K.</span>
    </div>
    <div class="table-wrap">
      <table style="width:100%">
        <thead><tr><th>#</th><th>Name</th><th>Role</th><th>Meetings</th><th>Closes</th><th>Revenue</th><th>Score</th></tr></thead>
        <tbody>
          ${[
            { rank:1, name:'Sara K.', role:'Caller', meetings:24, closes:6, revenue:'$28k', score:'A', sc:'badge-green' },
            { rank:2, name:'James M.', role:'Caller', meetings:19, closes:4, revenue:'$18k', score:'A', sc:'badge-green' },
            { rank:3, name:'Lena T.', role:'Outreach', meetings:15, closes:3, revenue:'$14k', score:'B', sc:'badge-blue' },
            { rank:4, name:'Omar A.', role:'Caller', meetings:12, closes:2, revenue:'$9k', score:'B', sc:'badge-blue' },
            { rank:5, name:'Priya S.', role:'Outreach', meetings:8, closes:1, revenue:'$5k', score:'C', sc:'badge-amber' }
          ].map(p => `
            <tr>
              <td style="color:var(--amber);font-weight:700">${p.rank}</td>
              <td><div style="display:flex;align-items:center;gap:8px;"><div class="avatar avatar-sm" style="background:${['var(--accent)','var(--teal)','var(--pink)','var(--amber)','var(--blue)'][p.rank-1]}">${p.name[0]}</div><span style="font-weight:500">${p.name}</span></div></td>
              <td><span class="badge badge-gray">${p.role}</span></td>
              <td style="font-family:var(--mono)">${p.meetings}</td>
              <td style="font-family:var(--mono)">${p.closes}</td>
              <td style="font-family:var(--mono);color:var(--green)">${p.revenue}</td>
              <td><span class="badge ${p.sc}">${p.score}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Include Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
let mrrChart = null;
let nicheChart = null;

function refreshChart() {
  const period = document.getElementById('chart-period')?.value || 6;
  const monthsData = {
    3: { labels: ['Mar', 'Apr', 'May'], values: [36800, 45300, 48500] },
    6: { labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'], values: [22400, 28400, 31200, 36800, 45300, 48500] },
    12: { labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'], 
          values: [18200, 19800, 21500, 23100, 24800, 26700, 28400, 31200, 34800, 38500, 43400, 48500] }
  };
  const data = monthsData[period] || monthsData[6];
  
  if (mrrChart) mrrChart.destroy();
  const mrrCtx = document.getElementById('mrrChart')?.getContext('2d');
  if (mrrCtx) {
    mrrChart = new Chart(mrrCtx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'MRR ($)',
          data: data.values,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#6366f1',
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { labels: { color: '#7a8499' } },
          tooltip: { callbacks: { label: (ctx) => `MRR: $${ctx.raw.toLocaleString()}` } }
        },
        scales: {
          y: { grid: { color: '#1f2538' }, ticks: { color: '#7a8499', callback: (v) => '$' + v/1000 + 'k' } },
          x: { grid: { display: false }, ticks: { color: '#7a8499' } }
        }
      }
    });
  }
  
  // Niche Pie Chart
  const nicheData = { labels: ['SaaS', 'E-commerce', 'Agency', 'Finance', 'Other'], values: [18400, 12200, 9600, 5800, 2500], colors: ['#6366f1', '#2dd4bf', '#f472b6', '#fbbf24', '#7a8499'] };
  if (nicheChart) nicheChart.destroy();
  const nicheCtx = document.getElementById('nicheChart')?.getContext('2d');
  if (nicheCtx) {
    nicheChart = new Chart(nicheCtx, {
      type: 'doughnut',
      data: {
        labels: nicheData.labels,
        datasets: [{ data: nicheData.values, backgroundColor: nicheData.colors, borderWidth: 0, hoverOffset: 10 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#7a8499', font: { size: 11 } } },
          tooltip: { callbacks: { label: (ctx) => `${ctx.label}: $${ctx.raw.toLocaleString()} (${Math.round(ctx.raw/48500*100)}%)` } }
        }
      }
    });
  }
}

refreshChart();
</script>
  `;
}
