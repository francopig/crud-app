(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const w="/crud-app/assets/javascript-8dac5379.svg",L=`<div class="modal-dialog">\r
    <form novalidate>\r
        <span>User</span>\r
        <input type="text" name="firstName" placeholder="First Name" />\r
        <input type="text" name="lastName" placeholder="Last Name" />\r
        <input type="number" name="balance" placeholder="Balance" />\r
\r
        <div>\r
            <input type="checkbox" id="is-active" name="isActive" checked/>\r
            <label for="is-active">is active?</label>\r
        </div>\r
\r
        <button type="submit">\r
            Save\r
        </button>\r
\r
    </form>\r
\r
</div>`;class y{constructor({id:t,isActive:n,balance:a,avatar:r,firstName:s,lastName:c,gender:m}){this.id=t,this.isActive=n,this.balance=a,this.avatar=r,this.firstName=s,this.lastName=c,this.gender=m}}const f=e=>{const{avatar:t,balance:n,first_name:a,gender:r,id:s,isActive:c,last_name:m}=e;return new y({avatar:t,balance:n,firstName:a,gender:r,id:s,isActive:c,lastName:m})},P=async e=>{const t=`http://localhost:3001/users/${e}`,a=await(await fetch(t)).json(),r=f(a);return console.log({user:r}),r};let i,d,g={};const b=async e=>{if(i==null||i.classList.remove("hide-modal"),g={},!e)return;const t=await P(e);T(t)},v=()=>{i==null||i.classList.add("hide-modal"),d==null||d.reset()},T=e=>{d.querySelector("[name=firstName]").value=e.firstName,d.querySelector("[name=lastName]").value=e.lastName,d.querySelector("[name=balance]").value=e.balance,d.querySelector("[name=isActive]").checked=e.isActive,g=e},S=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=L,i.className="modal-container hide-modal",d=i.querySelector("form"),i.addEventListener("click",n=>{n.target.className==="modal-container"&&v()}),d.addEventListener("submit",async n=>{n.preventDefault();const a=new FormData(d),r={...g};a.get("isActive")||a.append("isActive","off");for(const[s,c]of a){if(s==="balance"){r[s]=Number(c);continue}if(s==="isActive"){r[s]=c==="on";continue}r[s]=c}await t(r),v()}),e.append(i))};const E=e=>{const t=document.createElement("button");t.innerText="+",t.classList.add("fab-button"),e.append(t),t.addEventListener("click",()=>{b()})},p=async(e=1)=>{const t=`http://localhost:3001/users?_page=${e}`;return(await(await fetch(t)).json()).map(f)},o={currentPage:0,users:[]},$=async()=>{const e=await p(o.currentPage+1);e.length!=0&&(o.currentPage+=1,o.users=e)},N=async()=>{if(o.currentPage===1)return;const e=await p(o.currentPage-1);o.users=e,o.currentPage-=1},A=e=>{let t=!1;o.users=o.users.map(n=>n.id===e.id?(t=!0,e):n),o.users.length<10&&!t&&o.users.push(e)},U=async()=>{const e=await p(o.currentPage);if(e.length==0){await N();return}o.users=e},l={loadNextPage:$,loadPreviousPage:N,onUserChanged:A,reloadPage:U,getUsers:()=>[...o.users],getCurrentPage:()=>o.currentPage};const x=async e=>{const t=`http://localhost:3001/users/${e}`,a=await(await fetch(t,{method:"DELETE"})).json();return console.log({deleteResult:a}),!0};let u;const k=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;const n=document.createElement("tbody");return e.append(t,n),e},B=e=>{const t=e.target.closest(".select-user");if(!t)return;const n=t.getAttribute("data-id");b(n)},M=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const n=t.getAttribute("data-id");try{await x(n),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),h()}catch(a){alert("No se puedo eliminar"),console.log(a)}},h=e=>{const t=l.getUsers();u||(u=k(),e.append(u),u.addEventListener("click",a=>B(a)),u.addEventListener("click",a=>M(a)));let n="";t.forEach(a=>{n+=`
        <tr>
            <td>${a.id}</td>
            <td>${a.balance}</td>
            <td>${a.firstName}</td>
            <td>${a.lastName}</td>
            <td>
                <a href="#" class="select-user" data-id="${a.id}">Select</a>
                |
                <a href="#" class="delete-user" data-id="${a.id}">Delete</a>
            </td>
            <td>Actions</td>
        </tr>
        `}),u.querySelector("tbody").innerHTML=n};const q=e=>{const t=document.createElement("button");t.innerText="Next >";const n=document.createElement("button");n.innerText="< Prev";const a=document.createElement("span");a.id="current-page",a.innerText=l.getCurrentPage(),e.append(n,a,t),t.addEventListener("click",async()=>{await l.loadNextPage(),a.innerText=l.getCurrentPage(),h(e)}),n.addEventListener("click",async()=>{await l.loadPreviousPage(),a.innerText=l.getCurrentPage(),h(e)})},j=e=>{const{avatar:t,balance:n,firstName:a,gender:r,id:s,isActive:c,lastName:m}=e;return{avatar:t,balance:n,first_name:a,gender:r,id:s,isActive:c,last_name:m}},C=async e=>{const t=new y(e);if(!t.firstName||!t.lastName)throw"First name and last name are required";const n=j(t);let a;return t.id?a=await D(n):a=await H(n),f(a)},H=async e=>{const a=await(await fetch("http://localhost:3001/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log(a),a},D=async e=>{const t=`http://localhost:3001/users/${e.id}`,a=await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({updatedUser:a}),a},F=async e=>{await l.loadNextPage(),h(e),q(e),E(e),S(e,async t=>{const n=await C(t);l.onUserChanged(n),h()})};document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${w}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      
    </div>
  </div>
`;const O=document.querySelector(".card");F(O);
