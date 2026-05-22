function renderProjects() {
  const projects = [
    { client:'TechCorp', service:'Ads + SEO', start:'May 1', end:'May 31', budget:'$4,800', status:'Active', tasks:[
      { name:'Ad creative set', assignee:'Alex D.', due:'May 24', priority:'High', status:'In Review' },
      { name:'Google Ads audit', assignee:'Rami B.', due:'May 25', priority:'High', status:'In Progress' }
    ]},
    { client:'GrowthLabs', service:'Design + Dev', start:'Apr 15', end:'Jun 15', budget:'$6,400', status:'Active', tasks:[
      { name:'Homepage redesign', assignee:'Alex D.', due:'May 26', priority:'High', status:'In Progress' }
    ]},
    { client:'PulseMedia', service:'Ads', start:'May 10', end:'Jun 10', budget:'$3,600', status:'At Risk', tasks:[
      { name:'Campaign setup', assignee:'Rami B.', due:'May 22', priority:'High', status:'Revision' }
    ]}
  ];
  const statusColor = { 'To Do':'badge-gray', 'In Progress':'badge-blue', 'In Review':'badge-amber', 'Revision':'badge-pink', 'Done':'badge-green' };
  const prioColor = { 'High':'badge-red', 'Medium':'badge-amber', 'Low':'badge-gray' };
  return `
<div class="page-head"><div><div class="page-head-title">Projects</div><div class="page-head-sub">3 active projects · 7 open tasks</div></div><button class="btn btn-primary">+ New Project</button></div>
<div class="grid-4">
  <div class="metric"><div class="metric-label">Active Projects</div><div class="metric-value" style="color:var(--blue)">3</div></div>
  <div class="metric"><div class="metric-label">Open Tasks</div><div class="metric-value" style="color:var(--amber)">7</div></div>
  <div class="metric"><div class="metric-label">Overdue</div><div class="metric-value" style="color:var(--red)">1</div></div>
  <div class="metric"><div class="metric-label">Completed Tasks</div><div class="metric-value" style="color:var(--green)">14</div></div>
</div>
${projects.map(p => `
<div class="card mt-16">
  <div class="card-header">
    <div><div class="card-title-lg">${p.client} — ${p.service}</div><div style="font-size:11px;color:var(--text3);margin-top:3px">${p.start} → ${p.end} · Budget: <span style="color:var(--green);font-family:var(--mono)">${p.budget}</span></div></div>
    <div style="display:flex;align-items:center;gap:8px;"><span class="badge ${p.status==='Active'?'badge-green':'badge-red'}">${p.status}</span><button class="btn btn-ghost" style="padding:4px 10px;font-size:11px">+ Task</button></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:8px;">
    ${p.tasks.map(t => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:var(--bg3);border-radius:var(--r);border:1px solid var(--border);">
        <div style="width:8px;height:8px;border-radius:50%;background:${t.status==='Done'?'var(--green)':t.status==='In Progress'?'var(--blue)':t.status==='Revision'?'var(--pink)':t.status==='In Review'?'var(--amber)':'var(--border2)'};flex-shrink:0"></div>
        <div style="flex:1;font-size:13px;font-weight:500">${t.name}</div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          <span style="font-size:12px;color:var(--text2)">${t.assignee}</span>
          <span class="badge ${prioColor[t.priority]}">${t.priority}</span>
          <span class="badge ${statusColor[t.status]}">${t.status}</span>
          <span style="font-size:11px;color:var(--text3);font-family:var(--mono)">${t.due}</span>
        </div>
      </div>
    `).join('')}
  </div>
</div>`).join('')}`;
}
