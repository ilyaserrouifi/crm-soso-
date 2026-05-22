function renderPeople() {
  const callers = [
    { name:'Sara K.', phone:'+1 555-0101', gmail:'sara@agency.com', start:'Jan 2026', niche:'SaaS', salary:'$1,200/mo', calls:52, pickups:18, meetings:3, score:'A', sc:'badge-green' },
    { name:'James M.', phone:'+1 555-0102', gmail:'james@agency.com', start:'Feb 2026', niche:'Ecom', salary:'$1,000/mo', calls:47, pickups:14, meetings:2, score:'A', sc:'badge-green' },
    { name:'Omar A.', phone:'+1 555-0103', gmail:'omar@agency.com', start:'Mar 2026', niche:'Agency', salary:'$900/mo', calls:31, pickups:9, meetings:1, score:'B', sc:'badge-blue' },
    { name:'Kevin L.', phone:'+1 555-0104', gmail:'kevin@agency.com', start:'Apr 2026', niche:'SaaS', salary:'$800/mo', calls:18, pickups:4, meetings:0, score:'D', sc:'badge-red' }
  ];
  return `
<div class="page-head"><div><div class="page-head-title">People</div><div class="page-head-sub">Manage callers, outreachers and freelancers</div></div><button class="btn btn-primary">+ Add Member</button></div>
<div class="grid-4">
  <div class="metric"><div class="metric-label">Total Callers</div><div class="metric-value" style="color:var(--blue)">${callers.length}</div></div>
  <div class="metric"><div class="metric-label">Avg Calls/Day</div><div class="metric-value" style="color:var(--teal)">37</div></div>
  <div class="metric"><div class="metric-label">Avg Pickup Rate</div><div class="metric-value" style="color:var(--green)">31%</div></div>
  <div class="metric"><div class="metric-label">Meetings This Week</div><div class="metric-value" style="color:var(--amber)">6</div></div>
</div>
<div class="card mt-16"><div class="card-header"><div class="card-title-lg">Caller Profiles & KPIs</div></div>
<div class="table-wrap"></table><thead><tr><th>Name</th><th>Niche</th><th>Calls</th><th>Pickups</th><th>Meetings</th><th>Salary</th><th>Score</th></tr></thead>
<tbody>${callers.map(c => `<tr><td><div style="display:flex;align-items:center;gap:8px;"><div class="avatar avatar-sm" style="background:var(--accent)">${c.name[0]}</div><div><div style="font-size:12px;font-weight:500">${c.name}</div><div style="font-size:10px;color:var(--text3)">${c.gmail}</div></div></div></td>
<td><span class="badge badge-gray">${c.niche}</span></td><td style="font-family:var(--mono)">${c.calls}</td><td><div style="display:flex;align-items:center;gap:6px;"><span>${c.pickups}</span><span style="font-size:10px;color:var(--text3)">(${Math.round(c.pickups/c.calls*100)}%)</span></div></td>
<td>${c.meetings}</td><td style="color:var(--green)">${c.salary}</td><td><span class="badge ${c.sc}">${c.score}</span></td></tr>`).join('')}</tbody></table></div></div>`;
}
