function renderDashboard() {
  return `
<div class="page-head">
  <div>
    <div class="page-head-title">Good morning, Admin 👋</div>
    <div class="page-head-sub">Friday, May 22 2026 — Here's what's happening today</div>
  </div>
  <button class="btn btn-ghost">Export Report</button>
</div>

<div class="grid-4">
  <div class="metric">
    <div class="metric-label">Calls Today</div>
    <div class="metric-value" style="color:var(--blue)">847</div>
    <div class="metric-delta up">↑ 12% vs yesterday</div>
    <div class="fs-11 text-3 mt-4">Target: 1,500</div>
    <div class="progress mt-8"><div class="progress-fill" style="width:56%;background:var(--blue)"></div></div>
  </div>
  <div class="metric">
    <div class="metric-label">Meetings Booked</div>
    <div class="metric-value" style="color:var(--teal)">18</div>
    <div class="metric-delta up">↑ 6% vs yesterday</div>
    <div class="fs-11 text-3 mt-4">Target: 30</div>
    <div class="progress mt-8"><div class="progress-fill" style="width:60%;background:var(--teal)"></div></div>
  </div>
  <div class="metric">
    <div class="metric-label">Deals Closed</div>
    <div class="metric-value" style="color:var(--green)">4</div>
    <div class="metric-delta up">↑ on track</div>
    <div class="fs-11 text-3 mt-4">Target: 6</div>
    <div class="progress mt-8"><div class="progress-fill" style="width:66%;background:var(--green)"></div></div>
  </div>
  <div class="metric">
    <div class="metric-label">Revenue Today</div>
    <div class="metric-value" style="color:var(--amber)">$14,200</div>
    <div class="metric-delta up">↑ 22% vs avg</div>
    <div class="fs-11 text-3 mt-4">MRR: $48,500</div>
    <div class="progress mt-8"><div class="progress-fill" style="width:78%;background:var(--amber)"></div></div>
  </div>
</div>

<div class="grid-2-1 mt-20">
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">Pipeline Snapshot</div>
      <span class="badge badge-accent">$284,000 total</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${[
        { stage:'Lead', count:312, value:'$186k', color:'var(--text3)', w:100 },
        { stage:'Contacted', count:98, value:'$64k', color:'var(--blue)', w:65 },
        { stage:'Meeting', count:30, value:'$38k', color:'var(--teal)', w:42 },
        { stage:'Proposal', count:15, value:'$22k', color:'var(--accent)', w:28 },
        { stage:'Negotiating', count:8, value:'$14k', color:'var(--amber)', w:18 },
        { stage:'Closed Won', count:6, value:'$11k', color:'var(--green)', w:12 }
      ].map(s => `
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:90px;font-size:12px;color:var(--text2);flex-shrink:0">${s.stage}</div>
          <div style="flex:1;height:6px;background:var(--bg4);border-radius:4px;overflow:hidden;">
            <div style="height:100%;width:${s.w}%;background:${s.color};border-radius:4px;"></div>
          </div>
          <div style="width:28px;font-size:11px;color:var(--text3);text-align:right">${s.count}</div>
          <div style="width:40px;font-size:11px;color:var(--text2);text-align:right;font-family:var(--mono)">${s.value}</div>
        </div>
      `).join('')}
    </div>
  </div>
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">Finance Snapshot</div>
      <span class="badge badge-green">Healthy</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${[
        { label:'MRR', value:'$48,500', color:'var(--green)' },
        { label:'Expenses', value:'$18,200', color:'var(--red)' },
        { label:'Net Profit', value:'$30,300', color:'var(--teal)' },
        { label:'Margin', value:'62.5%', color:'var(--amber)' },
        { label:'At Risk MRR', value:'$4,200', color:'var(--red)' }
      ].map(f => `
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);padding-bottom:10px;">
          <span style="font-size:12px;color:var(--text2)">${f.label}</span>
          <span style="font-size:14px;font-weight:600;color:${f.color};font-family:var(--mono)">${f.value}</span>
        </div>
      `).join('')}
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:12px;color:var(--text2)">3-month Forecast</span>
        <span style="font-size:14px;font-weight:600;color:var(--accent2);font-family:var(--mono)">$156k</span>
      </div>
    </div>
  </div>
</div>

<div class="card mt-20">
  <div class="card-header">
    <div class="card-title-lg">Team Leaderboard</div>
    <span class="fs-11 text-3">This Month</span>
  </div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>#</th><th>Name</th><th>Role</th><th>Meetings</th><th>Closes</th><th>Revenue</th><th>Score</th></tr></thead>
      <tbody>
        ${[
          { rank:1, name:'Sara K.', role:'Caller', meetings:24, closes:6, revenue:'$28k', score:'A', sc:'badge-green' },
          { rank:2, name:'James M.', role:'Caller', meetings:19, closes:4, revenue:'$18k', score:'A', sc:'badge-green' },
          { rank:3, name:'Lena T.', role:'Outreach', meetings:15, closes:3, revenue:'$14k', score:'B', sc:'badge-blue' },
          { rank:4, name:'Omar A.', role:'Caller', meetings:12, closes:2, revenue:'$9k', score:'B', sc:'badge-blue' },
          { rank:5, name:'Priya S.', role:'Outreach', meetings:8, closes:1, revenue:'$5k', score:'C', sc:'badge-amber' },
          { rank:6, name:'Kevin L.', role:'Caller', meetings:4, closes:0, revenue:'$0', score:'D', sc:'badge-red' }
        ].map(p => `
          <tr>
            <td style="color:var(--text3);font-size:11px">${p.rank}</td>
            <td><div style="display:flex;align-items:center;gap:8px;"><div class="avatar avatar-sm" style="background:${['var(--accent)','var(--teal)','var(--pink)','var(--amber)','var(--blue)','var(--red)'][p.rank-1]}">${p.name[0]}</div><span style="font-size:12px;font-weight:500">${p.name}</span></div></td>
            <td><span class="badge badge-gray">${p.role}</span></td>
            <td style="font-family:var(--mono);font-size:12px">${p.meetings}</td>
            <td style="font-family:var(--mono);font-size:12px">${p.closes}</td>
            <td style="font-family:var(--mono);font-size:12px;color:var(--green)">${p.revenue}</td>
            <td><span class="badge ${p.sc}">${p.score}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>
`;
}
