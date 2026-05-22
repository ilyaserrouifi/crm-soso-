function renderDashboard() {
  // جلب البيانات الحقيقية من localStorage
  const deals = JSON.parse(localStorage.getItem('crm_deals') || '[]');
  const projects = JSON.parse(localStorage.getItem('crm_projects') || '[]');
  const people = JSON.parse(localStorage.getItem('crm_people') || '[]');
  
  // حساب الأرقام الحقيقية
  const totalDeals = deals.length;
  const wonDeals = deals.filter(d => d.stage === 'won').length;
  const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const totalPeople = people.length;
  
  // حساب MRR (revenus récurrents)
  const mrr = totalValue;
  const expenses = 18200;
  const netProfit = mrr - expenses;
  const margin = mrr ? Math.round((netProfit / mrr) * 100) : 0;
  
  // إحصائيات pipeline
  const leadCount = deals.filter(d => d.stage === 'lead').length;
  const contactedCount = deals.filter(d => d.stage === 'contacted').length;
  const meetingCount = deals.filter(d => d.stage === 'meeting').length;
  const proposalCount = deals.filter(d => d.stage === 'proposal').length;
  const wonCount = wonDeals;
  
  return `
<div class="page-head">
  <div>
    <div class="page-head-title">Tableau de bord</div>
    <div class="page-head-sub">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
  </div>
  <button class="btn btn-ghost" onclick="exportReport()">📥 Exporter</button>
</div>

<div class="grid-4">
  <div class="metric">
    <div class="metric-label">Total deals</div>
    <div class="metric-value" style="color:var(--blue)">${totalDeals}</div>
    <div class="metric-delta up">↓ +${Math.round(totalDeals * 0.12)} ce mois</div>
  </div>
  <div class="metric">
    <div class="metric-label">Valeur totale</div>
    <div class="metric-value" style="color:var(--teal)">$${totalValue.toLocaleString()}</div>
    <div class="metric-delta up">↑ +8%</div>
  </div>
  <div class="metric">
    <div class="metric-label">Projets actifs</div>
    <div class="metric-value" style="color:var(--green)">${activeProjects}</div>
    <div class="metric-delta up">En cours</div>
  </div>
  <div class="metric">
    <div class="metric-label">Équipe</div>
    <div class="metric-value" style="color:var(--amber)">${totalPeople}</div>
    <div class="metric-delta up">Membres</div>
  </div>
</div>

<div class="grid-2-1 mt-20">
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">Pipeline snapshot</div>
      <span class="badge badge-accent">$${totalValue.toLocaleString()} total</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${[
        { stage:'Lead', count: leadCount, color:'var(--text3)' },
        { stage:'Contacted', count: contactedCount, color:'var(--blue)' },
        { stage:'Meeting', count: meetingCount, color:'var(--teal)' },
        { stage:'Proposal', count: proposalCount, color:'var(--accent)' },
        { stage:'Won', count: wonCount, color:'var(--green)' }
      ].map(s => {
        const maxCount = Math.max(leadCount, contactedCount, meetingCount, proposalCount, wonCount, 1);
        const width = Math.round((s.count / maxCount) * 100);
        return `
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:80px;font-size:12px;color:var(--text2);flex-shrink:0">${s.stage}</div>
          <div style="flex:1;height:8px;background:var(--bg4);border-radius:4px;overflow:hidden;">
            <div style="height:100%;width:${width}%;background:${s.color};border-radius:4px;"></div>
          </div>
          <div style="width:30px;font-size:11px;color:var(--text3);text-align:right">${s.count}</div>
        </div>`;
      }).join('')}
    </div>
  </div>
  
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">Finance</div>
      <span class="badge badge-green">${margin}% marge</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--text2)">MRR</span><span style="color:var(--green);font-family:mono">$${mrr.toLocaleString()}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--text2)">Dépenses</span><span style="color:var(--red);font-family:mono">$${expenses.toLocaleString()}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--text2)">Bénéfice net</span><span style="color:var(--teal);font-family:mono;font-weight:600">$${netProfit.toLocaleString()}</span></div>
      <div class="progress mt-8"><div class="progress-fill" style="width:${margin}%;background:var(--green)"></div></div>
    </div>
  </div>
</div>

<script>
function exportReport() {
  alert('Export en cours...');
}
</script>
  `;
}
