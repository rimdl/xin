export const getUserInfoFromGitee = async (access_token:string) => {
    let url = "https://gitee.com/api/v5/user?access_token="+access_token;
    let userInfo = null


    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }
        userInfo = await response.json();
        return userInfo
    } catch (err) {
            // @ts-ignore
        console.log(err.message);
    }
}