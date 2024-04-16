export const getDatas = async (url:string,headers:any) => {
    let response = null;
    response = await fetch(url);
    let data = await response.text();
    return JSON.parse(data);
}