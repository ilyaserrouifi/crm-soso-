function renderPipeline() {
  // جلب البيانات الحقيقية
  const deals = JSON.parse(localStorage.getItem('crm_deals') || '[]');
  
  const leadCount = deals.filter(d => d.stage === 'lead').length;
  const contactedCount = deals.filter(d => d.stage === 'contacted').length;
  const meetingCount = deals.filter(d => d.stage === 'meeting').length;
  const proposalCount = deals.filter(d => d.stage === 'proposal').length;
  const negotiatingCount = deals.filter(d => d.stage === 'negotiating').length;
  const wonCount = deals.filter(d => d.stage === 'won').length;
  const lostCount = deals.filter(d => d.stage === 'lost').length;
  
  const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
  
  return `
<div class="page-head">
  <div>
    <div class="page-head-title">Pipeline des ventes</div>
    <div class="page-head-sub">${deals.length} transactions · Valeur totale: $${totalValue.toLocaleString()}</div>
  </div>
  <div style="display:flex;gap:8px;">
    <button class="btn btn-ghost" onclick="filterPipeline()">Filtrer</button>
    <button class="btn btn-primary" onclick="addDeal()">+ Ajouter</button>
  </div>
</div>

<div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
  <div class="card-sm" style="text-align:center;border-top:2px solid var(--text3)"><div style="font-weight:700">${leadCount}</div><div style="font-size:10px">Lead</div></div>
  <div class="card-sm" style="text-align:center;border-top:2px solid var(--blue)"><div style="font-weight:700">${contactedCount}</div><div style="font-size:10px">Contacté</div></div>
  <div class="card-sm" style="text-align:center;border-top:2px solid var(--teal)"><div style="font-weight:700">${meetingCount}</div><div style="font-size:10px">Rendez-vous</div></div>
  <div class="card-sm" style="text-align:center;border-top:2px solid var(--accent)"><div style="font-weight:700">${proposalCount}</div><div style="font-size:10px">Proposition</div></div>
  <div class="card-sm" style="text-align:center;border-top:2px solid var(--amber)"><div style="font-weight:700">${negotiatingCount}</div><div style="font-size:10px">Négociation</div></div>
  <div class="card-sm" style="text-align:center;border-top:2px solid var(--green)"><div style="font-weight:700">${wonCount}</div><div style="font-size:10px">Gagné</div></div>
  <div class="card-sm" style="text-align:center;border-top:2px solid var(--red)"><div style="font-weight:700">${lostCount}</div><div style="font-size:10px">Perdu</div></div>
</div>

<div class="kanban">
  ${[
    { stage:'lead', label:'Lead', color:'var(--text3)', deals: deals.filter(d => d.stage === 'lead') },
    { stage:'contacted', label:'Contacté', color:'var(--blue)', deals: deals.filter(d => d.stage === 'contacted') },
    { stage:'meeting', label:'Rendez-vous', color:'var(--teal)', deals: deals.filter(d => d.stage === 'meeting') },
    { stage:'proposal', label:'Proposition', color:'var(--accent)', deals: deals.filter(d => d.stage === 'proposal') },
    { stage:'won', label:'Gagné', color:'var(--green)', deals: deals.filter(d => d.stage === 'won') }
  ].map(s => `
    <div class="kanban-col">
      <div class="kanban-col-header"><div class="kanban-col-title" style="color:${s.color}">${s.label}</div><div class="kanban-col-count">${s.deals.length}</div></div>
      ${s.deals.slice(0,3).map(d => `
        <div class="kanban-card" onclick="viewDeal('${d.id}')">
          <div class="kanban-card-title">${d.company || '—'}</div>
          <div style="display:flex;justify-content:space-between;margin-top:6px;"><span style="font-size:12px;font-weight:600;color:${s.color}">$${(d.value || 0).toLocaleString()}</span><span class="badge badge-gray">${d.assigned || '—'}</span></div>
        </div>
      `).join('')}
      ${s.deals.length === 0 ? '<div class="empty-state" style="padding:20px;text-align:center;font-size:11px;color:var(--text3)">Aucune transaction</div>' : ''}
      <div style="margin-top:8px;padding:8px;border:1px dashed var(--border2);border-radius:var(--r);text-align:center;font-size:11px;color:var(--text3);cursor:pointer;" onclick="addDealToStage('${s.stage}')">+ Ajouter</div>
    </div>
  `).join('')}
</div>

<script>
function filterPipeline() { alert('Filtres - à venir'); }
function addDeal() { alert('Ajouter un deal'); }
function addDealToStage(stage) { alert('Ajouter à ' + stage); }
function viewDeal(id) { alert('Voir deal ' + id); }
</script>
  `;
}
