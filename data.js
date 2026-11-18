const KEY='talenttrack_v1';
const STAGES=['Applied','Screening','Interview','Offer','Hired','Rejected'];
const SEED={jobs:[
{id:1,title:'Frontend Developer',dept:'Engineering',loc:'Nagpur',type:'Full-time',skills:'HTML, CSS, JavaScript',open:true},
{id:2,title:'Backend Developer Intern',dept:'Engineering',loc:'Remote',type:'Internship',skills:'Node.js, SQL, REST APIs',open:true},
{id:3,title:'UI/UX Designer',dept:'Design',loc:'Pune',type:'Full-time',skills:'Figma, Prototyping, Research',open:true},
{id:4,title:'HR Executive',dept:'People',loc:'Nagpur',type:'Full-time',skills:'Screening, Communication',open:true}],
apps:[
{id:1,jobId:1,name:'Aarav Mehta',email:'aarav@example.com',phone:'9800000001',resume:'aarav_cv.pdf',note:'',stage:'Interview',date:'2026-11-10'},
{id:2,jobId:2,name:'Sneha Patil',email:'sneha@example.com',phone:'9800000002',resume:'sneha_resume.pdf',note:'',stage:'Screening',date:'2026-11-12'},
{id:3,jobId:3,name:'Rohan Verma',email:'rohan@example.com',phone:'9800000003',resume:'rohan_portfolio.pdf',note:'',stage:'Applied',date:'2026-11-15'},
{id:4,jobId:1,name:'Isha Kulkarni',email:'isha@example.com',phone:'9800000004',resume:'isha_cv.pdf',note:'',stage:'Hired',date:'2026-11-02'}]};
function db(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&d.jobs)return d}catch(e){}const s=JSON.parse(JSON.stringify(SEED));save(s);return s}
function save(d){try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2400)}
const $=s=>document.querySelector(s);
function tabs(){document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('main section[id]').forEach(s=>s.hidden=s.id!==b.dataset.t)})}
