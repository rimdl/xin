export const getPapers = async (url: string,headers: any) => {
    let response = null;
    response = await fetch(url);
    let data = await response.json();
    return data;
}