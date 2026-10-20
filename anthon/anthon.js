const skills=[["🛠️","Basic Troubleshooting","Identifying and solving common computer problems."],["🖥️","Computer Systems Servicing","Understanding computer hardware, maintenance, and basic servicing."],["🌐","Basic Networking","Learning network connections, configurations, and troubleshooting."],["🧩","Problem-Solving","Analyzing problems and finding practical solutions."],["🤝","Teamwork","Collaborating with classmates to complete projects and assignments."]];
const tech=[["🐍","Python","Learning the basics of programming and logic."],["🌐","HTML","Learning how web pages are structured."],["⚡","JavaScript","Learning how to make web pages interactive."]];
const projects=[{t:"Student Enrollment System",d:"A system designed to manage student enrollment information and records in an organized way.",i:"🎓",c:"var(--peach)",more:["Purpose","Manage student enrollment information and records in an organized way."]},
{t:"Game Concept Design",d:"A creative project focused on developing an original game story, characters, and world.",i:"🎮",c:"var(--yellow)",more:["Purpose","Develop an original game story, characters, and world."]}];
const $=s=>document.querySelector(s),cc=n=>"c"+(n%4);
$("#skillGrid").innerHTML=skills.map((s,i)=>`<article class="card rv ${cc(i)}"><div class="ico ${cc(i)}" aria-hidden="true">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join("");
$("#techGrid").innerHTML=tech.map((s,i)=>`<article class="card rv"><div class="ico ${cc(i+1)}" aria-hidden="true">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p><span class="badge">Learning</span></article>`).join("");
$("#projGrid").innerHTML=projects.map((p,i)=>`<article class="card rv"><div class="art" style="--c:${p.c}" aria-hidden="true">${p.i}</div><h3>${p.t}</h3><p>${p.d}</p><button class="btn" data-p="${i}">View Details</button></article>`).join("");
const dlg=$("#dlg");
document.addEventListener("click",e=>{const b=e.target.closest("[data-p]");if(!b)return;const p=projects[b.dataset.p];$("#dt").textContent=p.t;
const shots=b.dataset.p==0?"Screenshots":"Story, characters, and concept art";
$("#db").innerHTML=`<p>${p.d}</p><h4>${p.more[0]}</h4><p>${p.more[1]}</p><h4>Features</h4><div class="todo">Add your project features here</div><h4>Technologies used</h4><div class="todo">Add the technologies you used here</div><h4>${shots}</h4><div class="todo">📷 Placeholder: add images here</div>`;dlg.showModal()});
dlg.addEventListener("click",e=>{if(e.target===dlg||e.target.closest(".close"))dlg.close()});
/* nav */
const burger=$(".burger"),menu=$("#menu");
burger.onclick=()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)};
menu.onclick=e=>{if(e.target.tagName==="A"){menu.classList.remove("open");burger.setAttribute("aria-expanded",false)}};
const links=[...menu.querySelectorAll("a")];
const spy=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+en.target.id))}}),{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("section[id]").forEach(s=>spy.observe(s));
const rv=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");rv.unobserve(en.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>rv.observe(el));
const topBtn=$("#top");addEventListener("scroll",()=>topBtn.classList.toggle("show",scrollY>500),{passive:true});
topBtn.onclick=()=>scrollTo({top:0});
/* form */
const f=$("#form"),st=$("#status");
f.addEventListener("submit",e=>{e.preventDefault();
const v={n:$("#n").value.trim(),e:$("#e").value.trim(),s:$("#s").value.trim(),m:$("#m").value.trim()},er={};
if(!v.n)er.n="Enter your name.";
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.e))er.e="Enter a valid email address, like name@example.com.";
if(!v.s)er.s="Enter a subject.";
if(v.m.length<10)er.m="Write a message of at least 10 characters.";
document.querySelectorAll(".err").forEach(d=>d.textContent=er[d.dataset.for]||"");
st.className="show";
if(Object.keys(er).length){st.textContent="Please fix the highlighted fields and try again.";return}
const href="mailto:anthonmanulong07@gmail.com?subject="+encodeURIComponent(v.s)+"&body="+encodeURIComponent(v.m+"\n\n— "+v.n+" ("+v.e+")");
st.innerHTML='Looks good! This is a demo, so nothing was sent. <a href="'+href+'"><u>Open in your email app</u></a> to send it.';});
