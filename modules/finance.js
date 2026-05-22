function renderFinance() {
  return `
<div class="page-head"><div><div class="page-head-title">Finance Control</div><div class="page-head-sub">May 2026 · Revenue, expenses and P&L</div></div><button class="btn btn-ghost">Export P&L</button></div>
<div class="grid-4">
  <div class="metric"><div class="metric-label">Net MRR</div><div class="metric-value" style="color:var(--green)">$48,500</div><div class="metric-delta up">↑ +$3,200 vs Apr</div></div>
  <div class="metric"><div class="metric-label">New MRR</div><div class="metric-value" style="color:var(--blue)">$6,300</div><div class="metric-delta up">2 new clients</div></div>
  <div class="metric"><div class="metric-label">Churned MRR</div><div class="metric-value" style="color:var(--red)">$3,100</div><div class="metric-delta down">1 client lost</div></div>
  <div class="metric"><div class="metric-label">MoM Growth</div><div class="metric-value" style="color:var(--amber)">+7.1%</div><div class="metric-delta up">↑ on track</div></div>
</div>
<div class="card mt-20"><div class="card-header"><div class="card-title-lg">P&L Statement — May 2026</div></div>
<div style="max-width:480px;">
  <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);"><span style="font-size:13px;color:var(--text2)">Revenue</span><span style="font-family:var(--mono);color:var(--green)">+$48,500</span></div>
  <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);padding-left:20px"><span style="font-size:13px;color:var(--text2)">Team Costs</span><span style="font-family:var(--mono);color:var(--red)">-$14,300</span></div>
  <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);padding-left:20px"><span style="font-size:13px;color:var(--text2)">Tool Costs</span><span style="font-family:var(--mono);color:var(--red)">-$615</span></div>
  <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);padding-left:20px"><span style="font-size:13px;color:var(--text2)">Other Expenses</span><span style="font-family:var(--mono);color:var(--red)">-$1,285</span></div>
  <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-top:1px solid var(--border2);border-bottom:1px solid var(--border2);"><span style="font-size:14px;font-weight:600">Gross Profit</span><span style="font-family:var(--mono);font-size:16px;font-weight:600;color:var(--teal)">$32,300</span></div>
  <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0"><span style="font-size:13px;color:var(--text2)">Margin</span><span style="font-family:var(--mono);color:var(--amber)">66.6%</span></div>
</div></div>`;
}
