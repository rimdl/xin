export interface localLoginInter {
    access_token: string;
    expires_in: number;
    loginTime: string;
    login_type: string;
}

export interface sysLoginUserInter {
    id: string,

    [prop: string]: any
}

export interface userInfosInter {
    _id: object,
    userid: string,
    username: string,
    avatar: string,
    email: string,
    role:string,
    password?:string
}

export interface paperInter {
    _id: { $oid:string },
    title: string,
    desc: string,
    date: string,
    content: string,
    cover: string,
    tags: Array<string>,
    category: string,
    words: number,
    author: string,
    checked?:boolean
}

export interface topicsInter {
    id: string,
    text: string,
    level: number
}

export interface commentInter {
    _id: { $oid:string },
    paperid: string,
    commentid: string,
    content: string,
    userid: string,
    ip: string,
    platform: string,
    login: string,
    location: string,
    date: string,
    imgs: Array<string>,
    title:string,
    checked?:boolean,
    hidden?:boolean
}

interface bgCoverInter {
    name: string,
    cover: string
}

interface bgVideoInter {
    name: string,
    cover: string,
    poster: string
}

type rewardInter = {
    "url": string;
    "msg": string;
}

interface adminInfoInter {
    name: string,
    bio: string,
    bgcover: string,
    avatar: string,
    email: string,
    github: string,
    gitee: string,
    weibo: string,
    wechat: string,
    qq: string,
    tiktok: string,
    bilibili: string,
    reward: Array<rewardInter>
}

export interface settingsInter {
    bgCover: Array<bgCoverInter>,
    bgVideo: Array<bgVideoInter>,
    title: string,
    sub_title: string,
    admin_info: adminInfoInter
}

export interface notificationInter {
    msg: string,
    type: string
}

export interface musicInter {
    src: string,
    poster: string,
    lyrics: string,
    title: string,
    artist: string
}

export interface frontMatterInter {
    title: string,
    date: string,
    cover: string,

    [prop: string]: any
}

interface childInter {

    type: string,
    "tagName": string,
    "properties": any,
    "children": Array<childInter>,
    value?: string,
    "position": {
        "start": {
            "line": number,
            "column": number,
            "offset": number
        },
        "end": {
            "line": number,
            "column": number,
            "offset": number
        }
    }
}

export interface treeInter {
    type: string,
    children: Array<childInter>,
    "data": {
        "quirksMode": boolean
    },
    "position": {
        "start": {
            "line": number,
            "column": number,
            "offset": number
        },
        "end": {
            "line": number,
            "column": number,
            "offset": number
        }
    }
}