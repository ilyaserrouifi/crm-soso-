function renderPipeline() {
  const deals = JSON.parse(localStorage.getItem('crm_deals') || '[]');
  
  const leadCount = deals.filter(d => d.stage === 'lead').length;
  const contactedCount = deals.filter(d => d.stage === 'contacted').length;
  const meetingCount = deals.filter(d => d.stage === 'meeting').length;
  const proposalCount = deals.filter(d => d.stage === 'proposal').length;
  const wonCount = deals.filter(d => d.stage === 'won').length;
  const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
  
  return `
<div class="pipeline-container">
  <div class="page-header">
    <div>
      <h1>Pipeline des ventes</h1>
      <p>${deals.length} transactions · Valeur totale: ${totalValue.toLocaleString()} €</p>
    </div>
    <button class="btn-primary" onclick="addDeal()">+ Nouveau deal</button>
  </div>
  
  <div class="stats-row">
    <div class="stat-mini"><span>Leads</span><strong>${leadCount}</strong></div>
    <div class="stat-mini"><span>Contactés</span><strong>${contactedCount}</strong></div>
    <div class="stat-mini"><span>Rendez-vous</span><strong>${meetingCount}</strong></div>
    <div class="stat-mini"><span>Propositions</span><strong>${proposalCount}</strong></div>
    <div class="stat-mini"><span>Gagnés</span><strong>${wonCount}</strong></div>
  </div>
  
  <div class="kanban-board">
    ${[
      { stage:'lead', label:'Lead', color:'#38bdf8', deals: deals.filter(d => d.stage === 'lead') },
      { stage:'contacted', label:'Contacté', color:'#8b5cf6', deals: deals.filter(d => d.stage === 'contacted') },
      { stage:'meeting', label:'Rendez-vous', color:'#f59e0b', deals: deals.filter(d => d.stage === 'meeting') },
      { stage:'proposal', label:'Proposition', color:'#10b981', deals: deals.filter(d => d.stage === 'proposal') },
      { stage:'won', label:'Gagné', color:'#ec4899', deals: deals.filter(d => d.stage === 'won') }
    ].map(s => `
      <div class="kanban-col">
        <div class="kanban-col-header" style="background:${s.color}20; border-top:3px solid ${s.color}">
          <span>${s.label}</span>
          <span class="count">${s.deals.length}</span>
        </div>
        <div class="kanban-cards">
          ${s.deals.map(d => `
            <div class="kanban-card" onclick="viewDeal('${d.id}')">
              <div class="card-title">${d.company || '—'}</div>
              <div class="card-value">${d.value ? d.value.toLocaleString() + ' €' : '—'}</div>
              <div class="card-footer">
                <span>👤 ${d.assigned || '—'}</span>
                <span>📅 ${new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          `).join('')}
          ${s.deals.length === 0 ? '<div class="empty-card">Aucun deal</div>' : ''}
        </div>
        <div class="add-card" onclick="addDealToStage(\'' + s.stage + '\')">+ Ajouter</div>
      </div>
    `).join('')}
  </div>
</div>

<style>
.pipeline-container { padding: 24px 32px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
.page-header p { color: var(--text-tertiary); font-size: 13px; }
.btn-primary { background: var(--accent); color: #fff; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; }
.stats-row { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
.stat-mini { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 12px; padding: 12px 20px; display: flex; gap: 12px; align-items: baseline; }
.stat-mini span { font-size: 12px; color: var(--text-tertiary); }
.stat-mini strong { font-size: 20px; font-weight: 700; }
.kanban-board { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; }
.kanban-col { min-width: 280px; background: var(--bg-tertiary); border-radius: 16px; overflow: hidden; }
.kanban-col-header { padding: 14px 16px; display: flex; justify-content: space-between; font-weight: 600; }
.kanban-cards { min-height: 300px; padding: 12px; }
.kanban-card { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 12px; padding: 12px; margin-bottom: 10px; cursor: pointer; transition: all 0.2s; }
.kanban-card:hover { border-color: var(--accent); transform: translateY(-1px); }
.card-title { font-weight: 600; margin-bottom: 6px; }
.card-value { font-size: 14px; color: var(--accent); font-weight: 600; margin-bottom: 8px; }
.card-footer { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-tertiary); }
.empty-card { text-align: center; padding: 30px; color: var(--text-tertiary); font-size: 12px; }
.add-card { padding: 12px; text-align: center; border-top: 1px solid var(--border-medium); color: var(--accent); font-size: 13px; cursor: pointer; }
.add-card:hover { background: var(--accent-glow); }
</style>

<script>
function addDeal() { alert('Formulaire ajout deal'); }
function addDealToStage(stage) { alert('Ajouter à ' + stage); }
function viewDeal(id) { alert('Voir deal ' + id); }
</script>
  `;
}
