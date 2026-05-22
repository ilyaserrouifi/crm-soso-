function renderPeople() {
  // جلب البيانات الحقيقية
  const callers = JSON.parse(localStorage.getItem('crm_callers') || '[]');
  const outreachers = JSON.parse(localStorage.getItem('crm_outreachers') || '[]');
  const freelancers = JSON.parse(localStorage.getItem('crm_freelancers') || '[]');
  
  const totalCallers = callers.length;
  const totalOutreachers = outreachers.length;
  const totalFreelancers = freelancers.length;
  
  return `
<div class="page-head">
  <div>
    <div class="page-head-title">Gestion des personnes</div>
    <div class="page-head-sub">${totalCallers + totalOutreachers + totalFreelancers} membres d'équipe</div>
  </div>
  <button class="btn btn-primary" onclick="addPerson()">+ Ajouter</button>
</div>

<div class="grid-4">
  <div class="metric"><div class="metric-label">Appeleurs</div><div class="metric-value" style="color:var(--blue)">${totalCallers}</div></div>
  <div class="metric"><div class="metric-label">Démarchage</div><div class="metric-value" style="color:var(--teal)">${totalOutreachers}</div></div>
  <div class="metric"><div class="metric-label">Freelances</div><div class="metric-value" style="color:var(--green)">${totalFreelancers}</div></div>
  <div class="metric"><div class="metric-label">Total</div><div class="metric-value" style="color:var(--amber)">${totalCallers + totalOutreachers + totalFreelancers}</div></div>
</div>

<div class="card mt-16">
  <div class="card-header"><div class="card-title-lg">Liste des membres</div></div>
  <div class="table-wrap">
    <table style="width:100%">
      <thead><tr><th>Nom</th><th>Rôle</th><th>Contact</th><th>Statut</th><th></th></tr></thead>
      <tbody>
        ${[...callers.map(c => ({...c, role: 'Appeleur'})), ...outreachers.map(o => ({...o, role: 'Démarchage'})), ...freelancers.map(f => ({...f, role: 'Freelance'}))].map(p => `
          <tr>
            <td><span style="font-weight:500">${p.name || '—'}</span></td>
            <td><span class="badge badge-gray">${p.role}</span></td>
            <td style="color:var(--text3)">${p.email || p.phone || '—'}</td>
            <td><span class="badge badge-green">Actif</span></td>
            <td><button class="btn btn-ghost" style="padding:4px 10px">✏️</button></td>
          </tr>
        `).join('')}
        ${(callers.length + outreachers.length + freelancers.length) === 0 ? '<tr><td colspan="5" style="text-align:center;color:var(--text3);padding:40px">Aucun membre pour le moment.<br>Cliquez sur "Ajouter" pour commencer.</td></tr>' : ''}
      </tbody>
    </table>
  </div>
</div>

<script>
function addPerson() {
  alert('Formulaire d\'ajout - à venir');
}
</script>
  `;
}
