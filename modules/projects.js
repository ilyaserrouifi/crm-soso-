function renderProjects() {
  const projects = JSON.parse(localStorage.getItem('crm_projects') || '[]');
  
  return `
<div class="projects-container">
  <div class="page-header">
    <div>
      <h1>Projets</h1>
      <p>${projects.length} projets en cours</p>
    </div>
    <button class="btn-primary" onclick="addProject()">+ Nouveau projet</button>
  </div>
  
  <div class="projects-list">
    ${projects.map(p => `
      <div class="project-card" onclick="viewProject('${p.id}')">
        <div class="project-header">
          <div class="project-name">${p.name || '—'}</div>
          <div class="project-status"><span class="badge-blue">${p.status || 'En cours'}</span></div>
        </div>
        <div class="project-client">Client: ${p.client || '—'}</div>
        <div class="project-footer">
          <span>💰 ${p.budget ? p.budget.toLocaleString() + ' €' : '—'}</span>
          <span>📅 ${p.due || '—'}</span>
        </div>
      </div>
    `).join('')}
    ${projects.length === 0 ? '<div class="empty-state">Aucun projet. Cliquez sur + Nouveau projet</div>' : ''}
  </div>
</div>

<style>
.projects-container { padding: 24px 32px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header h1 { font-size: 24px; font-weight: 700; }
.page-header p { color: var(--text-tertiary); font-size: 13px; margin-top: 4px; }
.projects-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
.project-card { background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 16px; padding: 18px; cursor: pointer; transition: all 0.2s; }
.project-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.project-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.project-name { font-weight: 600; font-size: 16px; }
.project-client { font-size: 13px; color: var(--text-tertiary); margin-bottom: 12px; }
.project-footer { display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--border-medium); font-size: 12px; color: var(--accent); }
.badge-blue { background: rgba(56, 189, 248, 0.1); color: #38bdf8; padding: 4px 10px; border-radius: 20px; font-size: 11px; }
.empty-state { text-align: center; padding: 50px; color: var(--text-tertiary); grid-column: 1/-1; }
</style>

<script>
function addProject() { alert('Ajouter projet'); }
function viewProject(id) { alert('Voir projet ' + id); }
</script>
  `;
}
