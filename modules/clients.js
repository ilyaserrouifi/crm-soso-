function renderClients() {
  const clients = JSON.parse(localStorage.getItem('crm_clients') || '[]');
  const totalMrr = clients.reduce((sum, c) => sum + (c.mrr || 0), 0);
  
  return `
<div class="clients-container">
  <div class="page-header">
    <div>
      <h1>Clients</h1>
      <p>${clients.length} clients actifs · MRR: ${totalMrr.toLocaleString()} €</p>
    </div>
    <button class="btn-primary" onclick="addClient()">+ Nouveau client</button>
  </div>
  
  <div class="stats-row">
    <div class="stat-card"><div class="stat-value">${clients.length}</div><div class="stat-label">Total clients</div></div>
    <div class="stat-card"><div class="stat-value">${clients.filter(c => c.status === 'active').length}</div><div class="stat-label">Actifs</div></div>
    <div class="stat-card"><div class="stat-value">${totalMrr.toLocaleString()} €</div><div class="stat-label">MRR total</div></div>
  </div>
  
  <div class="clients-list">
    ${clients.map(c => `
      <div class="client-card" onclick="viewClient('${c.id}')">
        <div class="client-avatar" style="background:var(--accent)">${c.name?.charAt(0) || 'C'}</div>
        <div class="client-info">
          <div class="client-name">${c.name || '—'}</div>
          <div class="client-contact">${c.email || ''}</div>
        </div>
        <div class="client-mrr">${c.mrr ? c.mrr.toLocaleString() + ' €' : '—'}</div>
        <div class="client-status"><span class="badge-green">${c.status === 'active' ? 'Actif' : 'Inactif'}</span></div>
      </div>
    `).join('')}
    ${clients.length === 0 ? '<div class="empty-state">Aucun client. Cliquez sur + Nouveau client</div>' : ''}
  </div>
</div>

<style>
.clients-container { padding: 24px 32px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header h1 { font-size: 24px; font-weight: 700; }
.page-header p { color: var(--text-tertiary); font-size: 13px; margin-top: 4px; }
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
.stat-card { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 16px; padding: 20px; text-align: center; }
.stat-card .stat-value { font-size: 28px; font-weight: 700; }
.stat-card .stat-label { font-size: 12px; color: var(--text-tertiary); margin-top: 4px; }
.clients-list { display: flex; flex-direction: column; gap: 12px; }
.client-card { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.2s; }
.client-card:hover { border-color: var(--accent); transform: translateX(4px); }
.client-avatar { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: #fff; }
.client-info { flex: 1; }
.client-name { font-weight: 600; margin-bottom: 4px; }
.client-contact { font-size: 12px; color: var(--text-tertiary); }
.client-mrr { font-weight: 600; color: var(--accent); }
.badge-green { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 4px 10px; border-radius: 20px; font-size: 11px; }
.empty-state { text-align: center; padding: 50px; color: var(--text-tertiary); }
</style>

<script>
function addClient() { alert('Ajouter client'); }
function viewClient(id) { alert('Voir client ' + id); }
</script>
  `;
}
