function renderSettings() {
  // Load saved settings from localStorage
  const savedSettings = JSON.parse(localStorage.getItem('crm_settings') || '{}');
  const savedTheme = localStorage.getItem('crm_theme') || 'dark';
  const savedAccent = localStorage.getItem('crm_accent') || '#6366f1';
  
  return `
<div class="page-head">
  <div>
    <div class="page-head-title">⚙️ Paramètres</div>
    <div class="page-head-sub">Gérez votre compte, votre équipe et les préférences système</div>
  </div>
  <button class="btn btn-primary" onclick="saveAllSettings()">💾 Enregistrer les modifications</button>
</div>

<!-- Stats Cards -->
<div class="grid-4 mb-20">
  <div class="metric"><div class="metric-label">Version</div><div class="metric-value" style="color:var(--accent)">v2.0.0</div><div class="metric-delta up">Latest</div></div>
  <div class="metric"><div class="metric-label">Last Backup</div><div class="metric-value" style="color:var(--green)">${new Date().toLocaleDateString()}</div><div class="metric-delta up">Auto daily</div></div>
  <div class="metric"><div class="metric-label">Storage Used</div><div class="metric-value" style="color:var(--teal)">342 MB</div><div class="metric-delta up">/ 1 GB</div></div>
  <div class="metric"><div class="metric-label">API Calls</div><div class="metric-value" style="color:var(--amber)">2,847</div><div class="metric-delta up">This month</div></div>
</div>

<div class="grid-2" style="gap:24px;">
  
  <!-- ==================== PROFILE SECTION ==================== -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">👤 Profil utilisateur</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div style="display:flex;align-items:center;gap:20px;">
        <div class="avatar avatar-lg" style="background:var(--accent);width:72px;height:72px;font-size:28px">AD</div>
        <div>
          <button class="btn btn-ghost" onclick="document.getElementById('avatar-input').click()">📷 Changer l'avatar</button>
          <input type="file" id="avatar-input" style="display:none" accept="image/*" onchange="uploadAvatar(this)"/>
          <div style="font-size:11px;color:var(--text3);margin-top:8px">PNG, JPG jusqu'à 2MB</div>
        </div>
      </div>
      <div class="grid-2" style="gap:14px;">
        <div><label class="fs-12 text-2 fw-500">Nom complet</label><input class="input mt-4" type="text" id="settings-fullname" placeholder="Admin User" value="${savedSettings.fullname || 'Admin User'}"/></div>
        <div><label class="fs-12 text-2 fw-500">Email</label><input class="input mt-4" type="email" id="settings-email" placeholder="admin@crm-os.com" value="${savedSettings.email || 'admin@crm-os.com'}"/></div>
        <div><label class="fs-12 text-2 fw-500">Téléphone</label><input class="input mt-4" type="tel" id="settings-phone" placeholder="+212 6XX XXX XXX" value="${savedSettings.phone || '+212 6 12 34 56 78'}"/></div>
        <div><label class="fs-12 text-2 fw-500">Poste</label><select class="select mt-4" id="settings-role"><option ${savedSettings.role === 'Super Admin' ? 'selected' : ''}>Super Admin</option><option ${savedSettings.role === 'Admin' ? 'selected' : ''}>Admin</option><option ${savedSettings.role === 'Manager' ? 'selected' : ''}>Manager</option><option ${savedSettings.role === 'Viewer' ? 'selected' : ''}>Viewer</option></select></div>
      </div>
    </div>
  </div>

  <!-- ==================== COMPANY SECTION ==================== -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">🏢 Informations société</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div><label class="fs-12 text-2 fw-500">Nom de la société</label><input class="input mt-4" type="text" id="settings-company" placeholder="Niche CRM" value="${savedSettings.company || 'Niche CRM'}"/></div>
      <div><label class="fs-12 text-2 fw-500">Site web</label><input class="input mt-4" type="url" id="settings-website" placeholder="https://..." value="${savedSettings.website || 'https://niche-crm.com'}"/></div>
      <div><label class="fs-12 text-2 fw-500">Secteur d'activité</label><select class="select mt-4" id="settings-industry"><option ${savedSettings.industry === 'Agency' ? 'selected' : ''}>Agency</option><option ${savedSettings.industry === 'SaaS' ? 'selected' : ''}>SaaS</option><option ${savedSettings.industry === 'E-commerce' ? 'selected' : ''}>E-commerce</option><option ${savedSettings.industry === 'Consulting' ? 'selected' : ''}>Consulting</option></select></div>
      <div><label class="fs-12 text-2 fw-500">Fuseau horaire</label><select class="select mt-4" id="settings-timezone"><option ${savedSettings.timezone === 'UTC+1' ? 'selected' : ''}>UTC+1 (Paris/Casablanca)</option><option ${savedSettings.timezone === 'UTC+0' ? 'selected' : ''}>UTC+0 (London)</option><option ${savedSettings.timezone === 'UTC-5' ? 'selected' : ''}>UTC-5 (New York)</option><option ${savedSettings.timezone === 'UTC+8' ? 'selected' : ''}>UTC+8 (Dubai)</option></select></div>
    </div>
  </div>

  <!-- ==================== APPEARANCE SECTION ==================== -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">🎨 Apparence</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div><label class="fs-12 text-2 fw-500">Thème</label>
        <div style="display:flex;gap:12px;margin-top:8px;">
          <button class="btn ${savedTheme !== 'light' ? 'btn-primary' : 'btn-ghost'}" onclick="setTheme('dark')">🌙 Sombre</button>
          <button class="btn ${savedTheme === 'light' ? 'btn-primary' : 'btn-ghost'}" onclick="setTheme('light')">☀️ Clair</button>
        </div>
      </div>
      <div><label class="fs-12 text-2 fw-500">Couleur d'accentuation</label>
        <div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap;">
          <div class="accent-option ${savedAccent === '#6366f1' ? 'active' : ''}" style="width:36px;height:36px;border-radius:10px;background:#6366f1;cursor:pointer;border:2px solid ${savedAccent === '#6366f1' ? 'white' : 'transparent'}" onclick="setAccent('#6366f1')"></div>
          <div class="accent-option ${savedAccent === '#38bdf8' ? 'active' : ''}" style="width:36px;height:36px;border-radius:10px;background:#38bdf8;cursor:pointer;border:2px solid ${savedAccent === '#38bdf8' ? 'white' : 'transparent'}" onclick="setAccent('#38bdf8')"></div>
          <div class="accent-option ${savedAccent === '#10b981' ? 'active' : ''}" style="width:36px;height:36px;border-radius:10px;background:#10b981;cursor:pointer;border:2px solid ${savedAccent === '#10b981' ? 'white' : 'transparent'}" onclick="setAccent('#10b981')"></div>
          <div class="accent-option ${savedAccent === '#f59e0b' ? 'active' : ''}" style="width:36px;height:36px;border-radius:10px;background:#f59e0b;cursor:pointer;border:2px solid ${savedAccent === '#f59e0b' ? 'white' : 'transparent'}" onclick="setAccent('#f59e0b')"></div>
          <div class="accent-option ${savedAccent === '#ef4444' ? 'active' : ''}" style="width:36px;height:36px;border-radius:10px;background:#ef4444;cursor:pointer;border:2px solid ${savedAccent === '#ef4444' ? 'white' : 'transparent'}" onclick="setAccent('#ef4444')"></div>
          <div class="accent-option ${savedAccent === '#8b5cf6' ? 'active' : ''}" style="width:36px;height:36px;border-radius:10px;background:#8b5cf6;cursor:pointer;border:2px solid ${savedAccent === '#8b5cf6' ? 'white' : 'transparent'}" onclick="setAccent('#8b5cf6')"></div>
        </div>
      </div>
      <div><label class="fs-12 text-2 fw-500">Sidebar</label>
        <div style="display:flex;gap:12px;margin-top:8px;">
          <button class="btn btn-ghost" onclick="toggleSidebarCollapse()">🔽 Réduire/Agrandir</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== NOTIFICATIONS SECTION ==================== -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">🔔 Notifications</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:8px 0;">
        <span>📧 Notifications par email</span>
        <input type="checkbox" id="notif-email" ${savedSettings.notifEmail !== false ? 'checked' : ''} style="width:18px;height:18px;cursor:pointer"/>
      </label>
      <label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:8px 0;">
        <span>🔔 Notifications push</span>
        <input type="checkbox" id="notif-push" ${savedSettings.notifPush !== false ? 'checked' : ''} style="width:18px;height:18px;cursor:pointer"/>
      </label>
      <label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:8px 0;">
        <span>💼 Alertes deals</span>
        <input type="checkbox" id="notif-deals" ${savedSettings.notifDeals !== false ? 'checked' : ''} style="width:18px;height:18px;cursor:pointer"/>
      </label>
      <label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:8px 0;">
        <span>✅ Rapports mensuels</span>
        <input type="checkbox" id="notif-reports" ${savedSettings.notifReports !== false ? 'checked' : ''} style="width:18px;height:18px;cursor:pointer"/>
      </label>
    </div>
  </div>

  <!-- ==================== SECURITY SECTION ==================== -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">🔒 Sécurité</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div><label class="fs-12 text-2 fw-500">Mot de passe actuel</label><input class="input mt-4" type="password" id="settings-pass-current" placeholder="••••••••"/></div>
      <div><label class="fs-12 text-2 fw-500">Nouveau mot de passe</label><input class="input mt-4" type="password" id="settings-pass-new" placeholder="••••••••"/></div>
      <div><label class="fs-12 text-2 fw-500">Confirmer le mot de passe</label><input class="input mt-4" type="password" id="settings-pass-confirm" placeholder="••••••••"/></div>
      <div><label class="fs-12 text-2 fw-500">Authentification à deux facteurs</label>
        <div style="margin-top:8px;"><button class="btn btn-primary" onclick="enable2FA()">🔐 Activer 2FA</button></div>
      </div>
      <div><label class="fs-12 text-2 fw-500">Sessions actives</label>
        <div style="margin-top:8px;background:var(--bg3);border-radius:var(--r);padding:10px;">
          <div style="display:flex;justify-content:space-between;font-size:12px;"><span>📍 Casablanca, Maroc</span><span class="badge badge-green">En cours</span><span>Chrome · Maintenant</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:8px;"><span>📍 Rabat, Maroc</span><span>Firefox · Hier</span><button class="btn btn-ghost" style="padding:2px 8px">Déconnecter</button></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== INTEGRATIONS SECTION ==================== -->
  <div class="card">
    <div class="card-header">
      <div class="card-title-lg">🔌 Intégrations</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
        <div><span style="font-weight:500">Stripe</span><div style="font-size:11px;color:var(--text3)">Paiements et facturation</div></div>
        <button class="btn btn-ghost btn-sm" onclick="connectStripe()">Connecter</button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
        <div><span style="font-weight:500">Slack</span><div style="font-size:11px;color:var(--text3)">Notifications d'équipe</div></div>
        <button class="btn btn-ghost btn-sm">Connecter</button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
        <div><span style="font-weight:500">Google Calendar</span><div style="font-size:11px;color:var(--text3)">Synchronisation des rendez-vous</div></div>
        <button class="btn btn-ghost btn-sm">Connecter</button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;">
        <div><span style="font-weight:500">Zapier</span><div style="font-size:11px;color:var(--text3)">Automatisations</div></div>
        <button class="btn btn-ghost btn-sm">Connecter</button>
      </div>
    </div>
  </div>

  <!-- ==================== DANGER ZONE ==================== -->
  <div class="card" style="border-color:var(--red);">
    <div class="card-header">
      <div class="card-title-lg" style="color:var(--red)">⚠️ Zone de danger</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div><div style="font-weight:500">📦 Exporter toutes les données</div><div style="font-size:11px;color:var(--text3)">Télécharger une sauvegarde complète</div></div>
        <button class="btn btn-primary" onclick="exportAllData()">Exporter</button>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div><div style="font-weight:500">🗑️ Réinitialiser les données</div><div style="font-size:11px;color:var(--text3)">Supprimer toutes les données de démonstration</div></div>
        <button class="btn" style="background:var(--amber);color:white;" onclick="resetDemoData()">Réinitialiser</button>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div><div style="font-weight:500">⚠️ Supprimer le compte</div><div style="font-size:11px;color:var(--text3)">Action irréversible</div></div>
        <button class="btn" style="background:var(--red);color:white;" onclick="deleteAccount()">Supprimer</button>
      </div>
    </div>
  </div>

</div>

<script>
function saveAllSettings() {
  const settings = {
    fullname: document.getElementById('settings-fullname')?.value || '',
    email: document.getElementById('settings-email')?.value || '',
    phone: document.getElementById('settings-phone')?.value || '',
    role: document.getElementById('settings-role')?.value || '',
    company: document.getElementById('settings-company')?.value || '',
    website: document.getElementById('settings-website')?.value || '',
    industry: document.getElementById('settings-industry')?.value || '',
    timezone: document.getElementById('settings-timezone')?.value || '',
    notifEmail: document.getElementById('notif-email')?.checked || false,
    notifPush: document.getElementById('notif-push')?.checked || false,
    notifDeals: document.getElementById('notif-deals')?.checked || false,
    notifReports: document.getElementById('notif-reports')?.checked || false
  };
  localStorage.setItem('crm_settings', JSON.stringify(settings));
  
  // Show success notification
  const container = document.getElementById('notification-container');
  const notif = document.createElement('div');
  notif.className = 'notification success';
  notif.innerHTML = '<div class="notification-icon">✅</div><div class="notification-content"><div class="notification-title">Succès</div><div class="notification-message">Paramètres enregistrés !</div></div><div class="notification-close" onclick="this.parentElement.remove()">✕</div>';
  container.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

function setTheme(theme) {
  if (theme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('crm_theme', 'light');
  } else {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('crm_theme', 'dark');
  }
  location.reload();
}

function setAccent(color) {
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--accent2', color);
  localStorage.setItem('crm_accent', color);
  document.querySelectorAll('.accent-option').forEach(el => {
    el.style.borderColor = 'transparent';
    if (el.style.background === color) el.style.borderColor = 'white';
  });
}

function toggleSidebarCollapse() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('collapsed');
}

function uploadAvatar(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      localStorage.setItem('crm_avatar', e.target.result);
      document.querySelector('.sb-avatar').style.backgroundImage = `url(${e.target.result})`;
      document.querySelector('.sb-avatar').style.backgroundSize = 'cover';
      alert('Avatar mis à jour !');
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function enable2FA() {
  alert('🔐 2FA activé ! Un code de vérification a été envoyé à votre email.');
}

function connectStripe() {
  alert('🔌 Redirection vers Stripe pour connexion...');
}

function exportAllData() {
  const data = {
    settings: localStorage.getItem('crm_settings'),
    theme: localStorage.getItem('crm_theme'),
    deals: localStorage.getItem('crm_deals'),
    projects: localStorage.getItem('crm_projects'),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `crm_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  alert('Données exportées !');
}

function resetDemoData() {
  if (confirm('⚠️ Voulez-vous vraiment réinitialiser toutes les données de démonstration ?')) {
    localStorage.clear();
    alert('Données réinitialisées. La page va se recharger.');
    location.reload();
  }
}

function deleteAccount() {
  if (confirm('⚠️ ATTENTION : Cette action est irréversible ! Voulez-vous vraiment supprimer votre compte ?')) {
    if (confirm('Tapez "DELETE" pour confirmer')) {
      alert('Demande de suppression envoyée. Un email de confirmation vous parviendra.');
    }
  }
}

// Load avatar if exists
const savedAvatar = localStorage.getItem('crm_avatar');
if (savedAvatar) {
  const avatarEl = document.querySelector('.sb-avatar');
  if (avatarEl) {
    avatarEl.style.backgroundImage = `url(${savedAvatar})`;
    avatarEl.style.backgroundSize = 'cover';
    avatarEl.textContent = '';
  }
}
</script>
  `;
}
