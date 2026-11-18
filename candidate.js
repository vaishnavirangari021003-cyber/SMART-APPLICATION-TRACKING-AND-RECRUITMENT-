let D=db(),jobId=null;
const head='<meta charset="utf-8">';
function fillDepts(){const ds=[...new Set(D.jobs.filter(j=>j.open).map(j=>j.dept))];$('#dept').innerHTML='<option value="">All departments</option>'+ds.map(d=>`<option>${esc(d)}</option>`).join('')}
function renderJobs(){
  const q=$('#q').value.toLowerCase(),d=$('#dept').value;
  const L=D.jobs.filter(j=>j.open&&(!d||j.dept===d)&&(j.title+' '+j.skills).toLowerCase().includes(q));
  $('#jobList').innerHTML=L.length?L.map(j=>`<article class="card"><h3>${esc(j.title)}</h3>
  <span class="chip">${esc(j.dept)}</span><span class="chip">${esc(j.loc)}</span><span class="chip">${esc(j.type)}</span>
  <p>Skills: ${esc(j.skills)}</p><button class="btn" data-id="${j.id}">Apply now</button></article>`).join(''):'<p class="empty">No jobs match your search. Try a different keyword or department.</p>';
}
function renderApps(){
  const e=$('#email').value.trim().toLowerCase();
  if(!e){$('#appList').innerHTML='<p class="empty">Enter the email you applied with to see your applications.</p>';return}
  const L=D.apps.filter(a=>a.email.toLowerCase()===e);
  $('#appList').innerHTML=L.length?L.map(a=>{const j=D.jobs.find(x=>x.id===a.jobId)||{title:'Closed role'};const i=STAGES.indexOf(a.stage);
  return `<article class="card" style="margin-bottom:14px"><div class="row"><div><h3>${esc(j.title)}</h3><p style="margin:4px 0 0">Applied on ${esc(a.date)}</p></div><span class="pill" data-s="${a.stage}">${a.stage}</span></div>
  ${a.stage==='Rejected'?'<p>Thank you for applying. We will not move forward with this application.</p>':`<div class="steps">${STAGES.slice(0,5).map((s,k)=>`<span class="${k<=i?'done':''}">${s}</span>`).join('')}</div>`}</article>`}).join(''):'<p class="empty">No applications found for this email. Apply to an open job to get started.</p>';
}
tabs();fillDepts();renderJobs();renderApps();
$('#q').oninput=renderJobs;$('#dept').onchange=renderJobs;
$('#lookup').onclick=renderApps;
$('#email').onkeydown=e=>{if(e.key==='Enter')renderApps()};
$('#jobList').onclick=e=>{const b=e.target.closest('button[data-id]');if(!b)return;jobId=+b.dataset.id;$('#jt').textContent='Apply for '+D.jobs.find(j=>j.id===jobId).title;$('#form').reset();$('#dlg').showModal()};
$('#cancel').onclick=()=>$('#dlg').close();
$('#form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),em=f.get('email').trim();
  const dup=D.apps.some(a=>a.jobId===jobId&&a.email.toLowerCase()===em.toLowerCase());
  if(dup){toast('You have already applied for this job.');return}
  D.apps.push({id:Date.now(),jobId,name:f.get('name').trim(),email:em,phone:f.get('phone').trim(),resume:(f.get('resume')&&f.get('resume').name)||'resume.pdf',note:f.get('note').trim(),stage:'Applied',date:new Date().toISOString().slice(0,10)});
  save(D);$('#dlg').close();$('#email').value=em;renderApps();document.querySelector('[data-t=apps]').click();toast('Application submitted.')};
