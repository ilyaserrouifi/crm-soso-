function renderClients() {
  const clients = [
    { name:'TechCorp', service:'Ads + SEO', mrr:4800, health:92, pm:'Sara K.', status:'Active', inv:'Paid', roas:'3.2x', leads:47 },
    { name:'GrowthLabs', service:'Design + Dev', mrr:3200, health:78, pm:'James M.', status:'Active', inv:'Paid', roas:'—', leads:12 },
    { name:'NovaBrand', service:'Cold Outreach', mrr:2500, health:64, pm:'Lena T.', status:'At Risk', inv:'Pending', roas:'—', leads:8 },
    { name:'SkylineHQ', service:'SEO', mrr:1800, health:88, pm:'Omar A.', status:'Active', inv:'Paid', roas:'—', leads:22 },
    { name:'PulseMedia', service:'Ads', mrr:3600, health:45, pm:'Sara K.', status:'At Risk', inv:'Overdue', roas:'1.4x', leads:5 }
  ];
  return `
<div class="page-head"><div><div class="page-head-title">Clients</div><div class="page-head-sub">5 active clients · $15,900 MRR</div></div><button class="btn btn-primary">+ Onboard Client</button></div>
<div class="grid-4">
  <div class="metric"><div class="metric-label">Active Clients</div><div class="metric-value" style="color:var(--green)">5</div></div>
  <div class="metric"><div class="metric-label">Total MRR</div><div class="metric-value" style="color:var(--accent2)">$15,900</div></div>
  <div class="metric"><div class="metric-label">At Risk</div><div class="metric-value" style="color:var(--red)">2</div></div>
  <div class="metric"><div class="metric-label">Avg Health</div><div class="metric-value" style="color:var(--amber)">73%</div></div>
</div>
<div class="card mt-20"><div class="card-header"><div class="card-title-lg">All Clients</div><div style="display:flex;gap:8px;"><input class="input" placeholder="Search client..." style="width:180px"/><button class="btn btn-ghost">Filter</button></div></div>
<div class="table-wrap"><table><thead><tr><th>Client</th><th>Service</th><th>MRR</th><th>PM</th><th>Health</th><th>ROAS</th><th>Leads</th><th>Invoice</th><th>Status</th></tr></thead>
<tbody>${clients.map(c => `<tr><td><div style="display:flex;align-items:center;gap:9px;"><div class="avatar avatar-sm" style="background:var(--bg5);color:var(--text2);border:1px solid var(--border2)">${c.name.slice(0,2).toUpperCase()}</div><span style="font-size:13px;font-weight:500">${c.name}</span></div></td>
<td style="font-size:12px;color:var(--text2)">${c.service}</td><td style="font-family:var(--mono);color:var(--green)">$${c.mrr.toLocaleString()}</td><td>${c.pm}</td>
<td><div style="display:flex;align-items:center;gap:7px;"><div class="progress" style="width:55px"><div class="progress-fill" style="width:${c.health}%;background:${c.health>75?'var(--green)':c.health>50?'var(--amber)':'var(--red)'}"></div></div><span class="fs-11 text-3">${c.health}%</span></div></td>
<td style="color:var(--teal)">${c.roas}</td><td>${c.leads}</td><td><span class="badge ${c.inv==='Paid'?'badge-green':c.inv==='Pending'?'badge-amber':'badge-red'}">${c.inv}</span></td>
<td><span class="badge ${c.status==='Active'?'badge-green':'badge-red'}">${c.status}</span></td></tr>`).join('')}</tbody></table></div></div>`;
}
