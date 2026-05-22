function renderDashboard() {
  const deals = JSON.parse(localStorage.getItem('crm_deals') || '[]');
  const wonDeals = deals.filter(d => d.stage === 'won');
  const totalRevenue = wonDeals.reduce((sum, d) => sum + (d.value || 0), 0);
  
  return `
<div class="dashboard-container">
  <!-- Welcome Section -->
  <div class="welcome-section">
    <h1>Tableau de bord</h1>
    <p>Bienvenue sur Niche CRM — Vue d'ensemble de votre activité</p>
  </div>
  
  <!-- Stats Cards -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon">💰</div>
      <div class="stat-value">${totalRevenue.toLocaleString()} €</div>
      <div class="stat-label">Revenus</div>
      <span class="stat-trend up">↑ +12%</span>
    </div>
    <div class="stat-card">
      <div class="stat-icon">👥</div>
      <div class="stat-value">${deals.length}</div>
      <div class="stat-label">Clients</div>
      <span class="stat-trend up">↑ +8%</span>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📁</div>
      <div class="stat-value">${deals.filter(d => d.stage === 'lead').length}</div>
      <div class="stat-label">Leads</div>
      <span class="stat-trend up">↑ +5%</span>
    </div>
    <div class="stat-card">
      <div class="stat-icon">⭐</div>
      <div class="stat-value">${wonDeals.length}</div>
      <div class="stat-label">Deals gagnés</div>
      <span class="stat-trend up">↑ +3</span>
    </div>
  </div>
  
  <!-- Charts Section -->
  <div class="charts-row">
    <div class="chart-card">
      <div class="chart-header">
        <h3>📈 Revenus mensuels</h3>
      </div>
      <div class="chart-body">
        <canvas id="revenueChart" height="250"></canvas>
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-header">
        <h3>🎯 Pipeline</h3>
      </div>
      <div class="chart-body">
        <canvas id="pipelineChart" height="250"></canvas>
      </div>
    </div>
  </div>
  
  <!-- Recent Activity -->
  <div class="activity-card">
    <div class="activity-header">
      <h3>🔄 Activité récente</h3>
      <a href="#">Voir tout →</a>
    </div>
    <div class="activity-list">
      ${deals.slice(0,5).map(d => `
        <div class="activity-item">
          <div class="activity-icon">🎯</div>
          <div class="activity-content">
            <div class="activity-title">Nouveau deal: ${d.company}</div>
            <div class="activity-time">${new Date(d.createdAt).toLocaleDateString()}</div>
          </div>
          <div class="activity-value">${d.value ? d.value.toLocaleString() + ' €' : ''}</div>
        </div>
      `).join('')}
      ${deals.length === 0 ? '<div class="empty-state">Aucune activité récente</div>' : ''}
    </div>
  </div>
</div>

<style>
.dashboard-container { padding: 24px 32px; }
.welcome-section { margin-bottom: 28px; }
.welcome-section h1 { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
.welcome-section p { color: var(--text-tertiary); font-size: 14px; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 28px; }
.stat-card { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 16px; padding: 20px; transition: all 0.2s; }
.stat-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.stat-icon { font-size: 28px; margin-bottom: 12px; }
.stat-value { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
.stat-label { font-size: 13px; color: var(--text-tertiary); }
.stat-trend { font-size: 11px; padding: 2px 8px; border-radius: 20px; display: inline-block; margin-top: 8px; }
.stat-trend.up { background: rgba(16, 185, 129, 0.1); color: #10b981; }

.charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px; }
.chart-card { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 16px; overflow: hidden; }
.chart-header { padding: 16px 20px; border-bottom: 1px solid var(--border-medium); }
.chart-header h3 { font-size: 14px; font-weight: 600; }
.chart-body { padding: 20px; }

.activity-card { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 16px; overflow: hidden; }
.activity-header { padding: 16px 20px; border-bottom: 1px solid var(--border-medium); display: flex; justify-content: space-between; align-items: center; }
.activity-header h3 { font-size: 14px; font-weight: 600; }
.activity-header a { font-size: 12px; color: var(--accent); text-decoration: none; }
.activity-list { padding: 0 20px; }
.activity-item { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--border-medium); }
.activity-item:last-child { border-bottom: none; }
.activity-icon { width: 40px; height: 40px; background: var(--bg-tertiary); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.activity-content { flex: 1; }
.activity-title { font-size: 13px; font-weight: 500; margin-bottom: 2px; }
.activity-time { font-size: 11px; color: var(--text-tertiary); }
.activity-value { font-size: 13px; font-weight: 600; color: var(--accent); }
.empty-state { text-align: center; padding: 40px; color: var(--text-tertiary); }
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
setTimeout(() => {
  const revenueCtx = document.getElementById('revenueChart')?.getContext('2d');
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: 'line',
      data: { labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'], datasets: [{ label: 'Revenus (€)', data: [12500, 14200, 16800, 15400, 18900, ${totalRevenue}], borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.1)', fill: true, tension: 0.3 }] },
      options: { responsive: true, maintainAspectRatio: true }
    });
  }
  const pipelineCtx = document.getElementById('pipelineChart')?.getContext('2d');
  if (pipelineCtx) {
    new Chart(pipelineCtx, {
      type: 'bar',
      data: { labels: ['Lead', 'Contacté', 'Rdv', 'Proposition', 'Gagné'], datasets: [{ label: 'Nombre', data: [${deals.filter(d=>d.stage==='lead').length}, ${deals.filter(d=>d.stage==='contacted').length}, ${deals.filter(d=>d.stage==='meeting').length}, ${deals.filter(d=>d.stage==='proposal').length}, ${deals.filter(d=>d.stage==='won').length}], backgroundColor: '#38bdf8', borderRadius: 8 }] },
      options: { responsive: true, maintainAspectRatio: true }
    });
  }
}, 100);
</script>
  `;
}
