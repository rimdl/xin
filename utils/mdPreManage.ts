
export const mdPreManage = (html:string) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    let headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let pres = doc.querySelectorAll('pre');
    let codes = doc.querySelectorAll('code');
    let imgs = doc.querySelectorAll('img');
    headings.forEach(function (heading:Element|HTMLHeadingElement,key:number,parent:NodeListOf<Element>){
        if ("innerText" in heading) {
            heading.id = heading.innerText;
        }
    })
    pres.forEach(function (pre:HTMLPreElement){
        pre.classList.add('relative','group','w-full');
        let el = document.createElement('div');
        el.innerHTML = `<button class="btn bg-base-100 opacity-0 group-hover:opacity-50 hover:opacity-100 btn-sm transition duration-300 copyBtn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
           </button>`;

        el.classList.add('absolute', 'top-1','right-1','tooltip','tooltip-left');
        el.setAttribute('data-tip', '复制代码');
        pre.appendChild(el)
    })
    codes.forEach(function (code:HTMLElement){
        code.classList.add('rounded','overflow-x-scroll','w-full')
        code.classList.forEach(function (className:string){
            if(className.indexOf('language-') !== -1){
                let langTip = document.createElement('div');
                langTip.classList.add('absolute', 'top-1','left-1','rounded-lg', 'bg-base-100', 'p-1', 'transition', 'duration-300', 'opacity-0', 'group-hover:opacity-100');
                langTip.innerHTML = "<span class='text-base-content'>"+className.replace('language-', '')+"</span>";
                code.parentElement?.appendChild(langTip);
                return;
            }
        })
    })
    // 将带有样式的DOM结构转换回字符串
    return new XMLSerializer().serializeToString(doc.body);
}