let D=db();
const gate=$('#gate');
if(sessionStorage.getItem('tt_admin')==='1')gate.remove();
$('#login').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
  if(f.get('u')==='admin'&&f.get('p')==='admin123'){try{sessionStorage.setItem('tt_admin','1')}catch(x){}gate.remove()}else{$('#err').textContent='Wrong username or password. Use the demo login shown below.'}};
const jt=id=>(D.jobs.find(j=>j.id===id)||{title:'Removed job'}).title;
function stats(){const c=s=>D.apps.filter(a=>a.stage===s).length;
  $('#stats').innerHTML=[[D.jobs.filter(j=>j.open).length,'Open jobs'],[D.apps.length,'Total applicants'],[c('Interview'),'In interview'],[c('Hired'),'Hired']].map(x=>`<div class="stat"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}
function fills(){$('#fj').innerHTML='<option value="">All jobs</option>'+D.jobs.map(j=>`<option value="${j.id}">${esc(j.title)}</option>`).join('');
  $('#fs').innerHTML='<option value="">All stages</option>'+STAGES.map(s=>`<option>${s}</option>`).join('')}
function applicants(){
  const q=$('#q').value.toLowerCase(),fj=$('#fj').value,fs=$('#fs').value;
  const L=D.apps.filter(a=>(!fj||a.jobId==fj)&&(!fs||a.stage===fs)&&(a.name+a.email).toLowerCase().includes(q));
  $('#rows').innerHTML=L.length?L.map(a=>`<tr><td>${esc(a.name)}<small>${esc(a.email)}</small></td><td>${esc(jt(a.jobId))}</td><td>${esc(a.resume)}<small>${esc(a.phone)}</small></td><td>${esc(a.date)}</td>
  <td><select data-id="${a.id}" aria-label="Stage for ${esc(a.name)}">${STAGES.map(s=>`<option${s===a.stage?' selected':''}>${s}</option>`).join('')}</select></td></tr>`).join(''):'<tr><td colspan="5" class="empty">No applicants match these filters.</td></tr>';
}
function jobs(){$('#joblist').innerHTML=D.jobs.map(j=>{const n=D.apps.filter(a=>a.jobId===j.id).length;
  return `<article class="card" style="margin-bottom:12px"><div class="row"><div><h3>${esc(j.title)}</h3><p style="margin:6px 0 0">${esc(j.dept)}, ${esc(j.loc)}, ${esc(j.type)}</p></div><span class="pill" data-s="${j.open?'Hired':'Rejected'}">${j.open?'Open':'Closed'}</span></div>
  <p>${n} applicant${n===1?'':'s'}</p><button class="btn ghost" data-id="${j.id}">${j.open?'Close job':'Reopen job'}</button></article>`}).join('')}
function all(){stats();fills();applicants();jobs()}
tabs();all();
['#q','#fj','#fs'].forEach(s=>$(s).oninput=applicants);
$('#rows').onchange=e=>{const s=e.target.closest('select');if(!s)return;const a=D.apps.find(x=>x.id==s.dataset.id);a.stage=s.value;save(D);stats();toast('Stage updated to '+s.value+'.')};
$('#joblist').onclick=e=>{const b=e.target.closest('button[data-id]');if(!b)return;const j=D.jobs.find(x=>x.id==b.dataset.id);j.open=!j.open;save(D);all();toast(j.open?'Job reopened.':'Job closed.')};
$('#jobForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
  D.jobs.unshift({id:Date.now(),title:f.get('title').trim(),dept:f.get('dept').trim(),loc:f.get('loc').trim(),type:f.get('type'),skills:f.get('skills').trim(),open:true});
  save(D);e.target.reset();all();toast('Job posted.')};
