export const upload = async (files:FileList,url: string):Promise<any>=>{
    if (files){
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
        }
        const res = await fetch(url,{method: 'POST',body: formData})
        const data = await res.json()
        console.log("datataa",data)
        return JSON.stringify(data)
    }
}