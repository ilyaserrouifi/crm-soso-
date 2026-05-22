function renderPeople() {
  const callers = JSON.parse(localStorage.getItem('crm_callers') || '[]');
  const outreachers = JSON.parse(localStorage.getItem('crm_outreachers') || '[]');
  const freelancers = JSON.parse(localStorage.getItem('crm_freelancers') || '[]');
  
  return `
<div class="people-container">
  <div class="page-header">
    <div>
      <h1>Gestion des personnes</h1>
      <p>Gérez votre équipe commerciale et vos freelances</p>
    </div>
    <button class="btn-primary" onclick="addPerson()">+ Ajouter</button>
  </div>
  
  <div class="stats-row">
    <div class="stat-card"><div class="stat-icon">📞</div><div class="stat-value">${callers.length}</div><div class="stat-label">Appeleurs</div></div>
    <div class="stat-card"><div class="stat-icon">✉️</div><div class="stat-value">${outreachers.length}</div><div class="stat-label">Démarchage</div></div>
    <div class="stat-card"><div class="stat-icon">💻</div><div class="stat-value">${freelancers.length}</div><div class="stat-label">Freelances</div></div>
    <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-value">${callers.length + outreachers.length + freelancers.length}</div><div class="stat-label">Total</div></div>
  </div>
  
  <div class="people-tabs">
    <button class="tab-btn active" onclick="switchTab('callers')">📞 Appeleurs</button>
    <button class="tab-btn" onclick="switchTab('outreachers')">✉️ Démarchage</button>
    <button class="tab-btn" onclick="switchTab('freelancers')">💻 Freelances</button>
  </div>
  
  <div id="callers-tab" class="people-list">
    ${callers.map(c => `
      <div class="person-card">
        <div class="person-avatar" style="background:var(--accent)">${c.name?.charAt(0) || 'C'}</div>
        <div class="person-info">
          <div class="person-name">${c.name || '—'}</div>
          <div class="person-contact">${c.email || ''} ${c.phone || ''}</div>
        </div>
        <div class="person-status"><span class="badge-green">Actif</span></div>
        <div class="person-actions"><button class="btn-icon" onclick="editPerson('${c.id}')">✏️</button></div>
      </div>
    `).join('')}
    ${callers.length === 0 ? '<div class="empty-state">Aucun appelleur. Cliquez sur + Ajouter</div>' : ''}
  </div>
  
  <div id="outreachers-tab" class="people-list" style="display:none">
    ${outreachers.map(o => `
      <div class="person-card">
        <div class="person-avatar" style="background:var(--teal)">${o.name?.charAt(0) || 'O'}</div>
        <div class="person-info">
          <div class="person-name">${o.name || '—'}</div>
          <div class="person-contact">${o.email || ''}</div>
        </div>
        <div class="person-status"><span class="badge-green">Actif</span></div>
        <div class="person-actions"><button class="btn-icon" onclick="editPerson('${o.id}')">✏️</button></div>
      </div>
    `).join('')}
    ${outreachers.length === 0 ? '<div class="empty-state">Aucun démarcheur. Cliquez sur + Ajouter</div>' : ''}
  </div>
  
  <div id="freelancers-tab" class="people-list" style="display:none">
    ${freelancers.map(f => `
      <div class="person-card">
        <div class="person-avatar" style="background:var(--purple)">${f.name?.charAt(0) || 'F'}</div>
        <div class="person-info">
          <div class="person-name">${f.name || '—'}</div>
          <div class="person-contact">${f.skills || ''}</div>
        </div>
        <div class="person-status"><span class="badge-green">Actif</span></div>
        <div class="person-actions"><button class="btn-icon" onclick="editPerson('${f.id}')">✏️</button></div>
      </div>
    `).join('')}
    ${freelancers.length === 0 ? '<div class="empty-state">Aucun freelance. Cliquez sur + Ajouter</div>' : ''}
  </div>
</div>

<style>
.people-container { padding: 24px 32px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
.page-header p { color: var(--text-tertiary); font-size: 13px; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.stat-card { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 16px; padding: 18px; text-align: center; }
.stat-icon { font-size: 28px; margin-bottom: 8px; }
.stat-value { font-size: 28px; font-weight: 700; }
.stat-label { font-size: 12px; color: var(--text-tertiary); margin-top: 4px; }
.people-tabs { display: flex; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid var(--border-medium); padding-bottom: 12px; }
.tab-btn { background: none; border: none; padding: 8px 16px; border-radius: 8px; color: var(--text-secondary); cursor: pointer; font-size: 13px; }
.tab-btn.active { background: var(--accent-glow); color: var(--accent); }
.people-list { display: flex; flex-direction: column; gap: 12px; }
.person-card { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 16px; }
.person-avatar { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: #fff; }
.person-info { flex: 1; }
.person-name { font-weight: 600; margin-bottom: 4px; }
.person-contact { font-size: 12px; color: var(--text-tertiary); }
.badge-green { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 4px 10px; border-radius: 20px; font-size: 11px; }
.btn-icon { background: var(--bg-tertiary); border: 1px solid var(--border-medium); border-radius: 8px; padding: 6px 10px; cursor: pointer; }
.empty-state { text-align: center; padding: 50px; color: var(--text-tertiary); }
</style>

<script>
function addPerson() { alert('Ajouter une personne'); }
function editPerson(id) { alert('Modifier ' + id); }
function switchTab(tab) {
  document.querySelectorAll('.people-list').forEach(el => el.style.display = 'none');
  document.getElementById(tab + '-tab').style.display = 'flex';
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}
</script>
  `;
}
