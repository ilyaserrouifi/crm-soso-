function renderPipeline() {
  const stages = [
    { id:'lead', label:'Lead', color:'var(--text3)', deals:[
      { co:'TechVibe', val:'$6,400', person:'Sara K.', days:1, niche:'SaaS' },
      { co:'BlueOcean', val:'$3,200', person:'James M.', days:2, niche:'Ecom' }
    ]},
    { id:'contacted', label:'Contacted', color:'var(--blue)', deals:[
      { co:'Ripple Inc', val:'$7,200', person:'Lena T.', days:3, niche:'Finance' }
    ]},
    { id:'meeting', label:'Meeting', color:'var(--teal)', deals:[
      { co:'Skyline HQ', val:'$5,600', person:'James M.', days:2, niche:'Agency' }
    ]},
    { id:'qualified', label:'Qualified', color:'var(--accent)', deals:[
      { co:'Apex Labs', val:'$8,800', person:'Sara K.', days:2, niche:'SaaS' }
    ]},
    { id:'proposal', label:'Proposal', color:'var(--pink)', deals:[
      { co:'TrueNorth', val:'$12,000', person:'Omar A.', days:5, niche:'Finance' }
    ]},
    { id:'negotiating', label:'Negotiating', color:'var(--amber)', deals:[
      { co:'VaultBrand', val:'$9,600', person:'James M.', days:3, niche:'Agency' }
    ]},
    { id:'won', label:'Closed Won', color:'var(--green)', deals:[
      { co:'StackFusion', val:'$4,800', person:'Sara K.', days:0, niche:'SaaS' }
    ]},
    { id:'lost', label:'Closed Lost', color:'var(--red)', deals:[
      { co:'OldCorp', val:'$2,400', person:'Kevin L.', days:8, niche:'Retail' }
    ]}
  ];
  return `
<div class="page-head">
  <div><div class="page-head-title">Sales Pipeline</div><div class="page-head-sub">8 stages · 13 active deals · $68,200 total value</div></div>
  <div style="display:flex;gap:8px;"><button class="btn btn-ghost">Filter</button><button class="btn btn-primary">+ Add Lead</button></div>
</div>
<div class="grid-4 mt-16" style="grid-template-columns:repeat(8,1fr)">
  ${stages.map(s => `<div class="card-sm" style="text-align:center;border-top:2px solid ${s.color}"><div style="font-size:18px;font-weight:600;color:${s.color}">${s.deals.length}</div><div style="font-size:10px;color:var(--text3);margin-top:2px">${s.label}</div></div>`).join('')}
</div>
<div class="kanban mt-20">
  ${stages.map(s => `
    <div class="kanban-col">
      <div class="kanban-col-header"><div class="kanban-col-title" style="color:${s.color}">${s.label}</div><div class="kanban-col-count">${s.deals.length}</div></div>
      ${s.deals.map(d => `
        <div class="kanban-card">
          <div class="kanban-card-title">${d.co}</div>
          <div style="display:flex;justify-content:space-between;margin-top:6px;"><span style="font-size:12px;font-weight:600;color:${s.color}">${d.val}</span><span class="badge badge-gray" style="font-size:10px">${d.niche}</span></div>
          <div style="display:flex;justify-content:space-between;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);"><span style="font-size:11px;color:var(--text3)">${d.person}</span><span style="font-size:10px;color:var(--text3)">${d.days}d</span></div>
        </div>
      `).join('')}
      <div style="margin-top:6px;padding:8px;border:1px dashed var(--border2);border-radius:var(--r);text-align:center;font-size:11px;color:var(--text3);cursor:pointer;">+ Add deal</div>
    </div>
  `).join('')}
</div>`;
}
