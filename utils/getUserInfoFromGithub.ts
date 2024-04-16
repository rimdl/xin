export const getUserInfoFromGithub = async (access_token:string) => {
    let url = "https://api.github.com/user";
    let githubUserInfo = null
    let headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ' + access_token,
        'X-GitHub-Api-Version': '2022-11-28'
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }
        githubUserInfo = await response.json();
        return githubUserInfo
    } catch (err) {
        // @ts-ignore
        console.log(err.message);
    }
}