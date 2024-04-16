import config from "~/public/config.json";
// @ts-ignore
import {decode as base64Decode} from 'base-64';

const baseUrl = config.baseUrl;
export const refreshToken = async (refresh_token: string) => {
    const response = await fetch(baseUrl + "/refreshToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + refresh_token
        }
    })
    if (response.ok) {
        const data = await response.json()
        const payload = getPayload(data.token)
        const token = {"token": data.token, "exp": payload.exp, "role": payload.role}
        localStorage.setItem("token", JSON.stringify(token))
        console.log("正常刷新token")
        return token
    }
    else {
        console.log(401,"tokenTool")
        return {"msg":"401"}
    }
}

export const checkAndRefreshToken = async (refresh_token:string,storedTokens:{token:string,exp:number,role:string}) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = storedTokens.exp - currentTime;
    if (remainingTime <= 60) { // 仅剩1分钟时触发刷新
        const token = await refreshToken(refresh_token);
        console.log("set new token",token)
        return token
    }
    else {
        console.log(remainingTime, "checkToken...")
        return 0
    }

}

export const getPayload = (token: string) => {
    if (token) {
        const [headerB64, payloadB64, signature] = token.split('.');

        // Base64URL解码payload部分
        const payloadJson = base64Decode(payloadB64, 'utf8'); // 使用base-64库进行解码
        console.log(payloadJson, "payloadJson")
        const payload = JSON.parse(payloadJson);

        // 解码后的过期时间在payload.exp字段
        return payload;
    } else {
        return 120;
    }
}