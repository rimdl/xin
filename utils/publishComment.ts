export const publishComment = async (url:string,data:any) => {
    let response = null;
    response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    let res_data = await response.json();
    return res_data;
}