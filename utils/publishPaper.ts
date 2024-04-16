export const publishPaper = async (url: string,options: any) => {
    let response = null;
    response = await fetch(url,options);
    let data = await response.json();
    return data;
}