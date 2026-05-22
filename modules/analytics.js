function renderAnalytics() {
  return `
<div class="page-head"><div><div class="page-head-title">Analytics</div><div class="page-head-sub">Team performance, revenue trends and conversion funnel</div></div><button class="btn btn-ghost">Export PDF</button></div>
<div class="card"><div class="card-header"><div class="card-title-lg">Conversion Funnel</div><span class="badge badge-accent">This Month</span></div>
<div style="display:flex;flex-direction:column;gap:6px;">
  ${[
    { stage:'Leads Uploaded', count:1500, pct:100, color:'var(--text3)' },
    { stage:'Contacted', count:800, pct:53.3, color:'var(--blue)' },
    { stage:'Meeting Booked', count:30, pct:3.75, color:'var(--teal)' },
    { stage:'Proposal Sent', count:15, pct:50, color:'var(--accent)' },
    { stage:'Closed Won', count:6, pct:40, color:'var(--green)' }
  ].map(s => `
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:130px;font-size:12px;color:var(--text2);text-align:right">${s.stage}</div>
      <div style="flex:1;height:32px;background:var(--bg4);border-radius:var(--r-sm);overflow:hidden;position:relative;">
        <div style="height:100%;width:${s.pct}%;background:${s.color};opacity:.8;border-radius:var(--r-sm);"></div>
        <div style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:12px;font-weight:600;color:#fff;">${s.count.toLocaleString()}</div>
      </div>
      <div style="width:45px;font-size:11px;color:${s.color};text-align:right;font-family:var(--mono)">${s.pct}%</div>
    </div>
  `).join('')}
</div></div>

<div class="card mt-20"><div class="card-header"><div class="card-title-lg">Revenue by Niche</div></div>
<div style="display:flex;flex-direction:column;gap:10px;">
  ${[
    { niche:'SaaS', rev:'$18,400', pct:38, color:'var(--accent)' },
    { niche:'Ecom', rev:'$12,200', pct:25, color:'var(--teal)' },
    { niche:'Agency', rev:'$9,600', pct:20, color:'var(--pink)' },
    { niche:'Finance', rev:'$5,800', pct:12, color:'var(--amber)' },
    { niche:'Other', rev:'$2,500', pct:5, color:'var(--text3)' }
  ].map(n => `
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="width:6px;height:6px;border-radius:50%;background:${n.color}"></div>
      <div style="width:70px;font-size:12px;color:var(--text2)">${n.niche}</div>
      <div style="flex:1;height:6px;background:var(--bg4);border-radius:4px;overflow:hidden;"><div style="height:100%;width:${n.pct}%;background:${n.color};border-radius:4px;"></div></div>
      <div style="width:55px;font-size:11px;font-family:var(--mono);text-align:right;color:${n.color}">${n.pct}%</div>
      <div style="width:65px;font-size:11px;font-family:var(--mono);text-align:right;color:var(--text2)">${n.rev}</div>
    </div>
  `).join('')}
</div></div>

<div class="card mt-20"><div class="card-header"><div class="card-title-lg">MRR Growth</div></div>
<div style="display:flex;flex-direction:column;gap:8px;">
  ${[
    { month:'Jan', mrr:28400 },
    { month:'Feb', mrr:31200 },
    { month:'Mar', mrr:36800 },
    { month:'Apr', mrr:45300 },
    { month:'May', mrr:48500 }
  ].map(m => {
    const w = Math.round(m.mrr/48500*100);
    return `
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:30px;font-size:11px;color:var(--text3)">${m.month}</div>
        <div style="flex:1;height:24px;background:var(--bg4);border-radius:var(--r-sm);overflow:hidden;position:relative;">
          <div style="height:100%;width:${w}%;background:var(--green);opacity:.7;border-radius:var(--r-sm);"></div>
          <div style="position:absolute;left:8px;top:50%;transform:translateY(-50%);font-size:11px;font-weight:600;font-family:var(--mono)">$${(m.mrr/1000).toFixed(1)}k</div>
        </div>
      </div>
    `;
  }).join('')}
</div></div>`;
}
