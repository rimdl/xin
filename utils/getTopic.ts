import {type topicsInter} from "~/types";

export const getTopic = (html:string) => {

    let structuredData:topicsInter[] = [];
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    let headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(function (heading:HTMLHeadingElement|Element,key:number){
            if ('innerText' in heading){
                heading.id = heading.innerText;
            }
    })
    headings.forEach(function(heading) {
        if (heading.id) {
            let item = {
                id: heading.id,
                level: parseInt(heading.tagName[1])
            };
            structuredData.push(item);
        }
    });
    return structuredData;
}