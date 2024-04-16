export const get_json = async (url:string,headers:any) => {
    let response = null;
    response = await fetch(url);
    let data = await response.text();
    return JSON.parse(data);
}

export const post_json = async (url:string,reqdata:any) => {
    let response = null;
    response = await fetch(url,reqdata);
    let data = await response.json();
    return data;
}
