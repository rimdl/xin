<template>
<div class="h-full">
  <Transition name="page" mode="out-in">
  <div v-if="!showRegister" class="hero h-fit bg-base-100">
    <div class="hero-content text-center">
      <div>
        <h1 class="text-5xl font-bold">请登录</h1>
        <div class="py-6 space-y-4">
          <label class="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" class="grow" placeholder="邮箱" v-model="email"/>
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
            <input :type="showPassword?'text':'password'" class="grow" placeholder="密码" v-model="password"/>
            <Transition name="my_bounce" mode="out-in">
              <svg @click="showPassword = true" v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-70 cursor-pointer" viewBox="0 0 256 256"><path fill="currentColor" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 168a40 40 0 1 1 40-40a40 40 0 0 1-40 40"/></svg>
              <svg @click="showPassword = false" v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-70 cursor-pointer" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"/></svg>
            </Transition>
          </label>
          <div class="flex justify-between items-center">
            <label class="input input-bordered flex items-center gap-2">
              <input type="text" class="grow" v-model="captchaCode" placeholder="输入验证码" />
              <img class="h-10 cursor-pointer" :src="captchaUrl" alt="" @click="refreshCaptcha" title="点击刷新验证码">
            </label>

          </div>
        </div>
        <div class="flex justify-between w-full p-2 items-center">
          <button class="btn btn-primary w-1/2" @click="login">登录</button>
          <a class="link" @click="showRegister = true">没有账号？</a>
        </div>
      </div>
    </div>
  </div>
    <div v-else class="hero h-fit bg-base-100">
      <div class="hero-content text-center">
        <div>
          <h1 class="text-5xl font-bold">开始注册</h1>
          <div class="py-6 space-y-4">
            <Transition name="my_bounce" mode="out-in">
              <p class="text-error" v-if="tips">
                {{tips}}
              </p>
            </Transition>
            <label class="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="email" class="grow" placeholder="用户名" v-model="username"/>
            </label>
            <label class="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="email" class="grow" placeholder="邮箱" v-model="email" @input="checkEmail"/>
            </label>
            <label class="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
              <input :type="showPassword?'text':'password'" class="grow" placeholder="密码" v-model="password"/>
              <Transition name="my_bounce" mode="out-in">
                <svg @click="showPassword = true" v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-70 cursor-pointer" viewBox="0 0 256 256"><path fill="currentColor" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 168a40 40 0 1 1 40-40a40 40 0 0 1-40 40"/></svg>
                <svg @click="showPassword = false" v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-70 cursor-pointer" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"/></svg>
              </Transition>
            </label>
            <label class="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
              <input :type="showPassword?'text':'password'" class="grow" placeholder="请再次输入密码" v-model="confirm_password"/>
              <Transition name="my_bounce" mode="out-in">
                <svg @click="showPassword = true" v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-70 cursor-pointer" viewBox="0 0 256 256"><path fill="currentColor" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 168a40 40 0 1 1 40-40a40 40 0 0 1-40 40"/></svg>
                <svg @click="showPassword = false" v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-70 cursor-pointer" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"/></svg>
              </Transition>
            </label>
            <div class="flex justify-between items-center">
              <label class="input input-bordered flex items-center gap-2">
                <input type="text" class="grow" v-model="captchaCode" placeholder="输入验证码" />
                <img class="h-10 cursor-pointer" :src="captchaUrl" alt="" @click="refreshCaptcha" title="点击刷新验证码">
              </label>

            </div>
          </div>
          <div class="flex justify-between w-full p-2 items-center">
            <button class="btn btn-secondary w-1/2" @click="userRegister" v-if="allow_next">注册</button>
            <button class="btn btn-secondary w-1/2 btn-disabled" v-else>注册</button>
            <a class="link" @click="showRegister = false">已有账号？</a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</div>
</template>

<script setup lang="ts">
import {ref,onMounted,onBeforeMount} from "vue";
import {post_json,get_json} from "~/utils/fetch_tools";
import config from "~/public/config.json";
import {useAdminStore} from "~/stores/adminStore";
import {useRouter} from "vue-router";
import {getPayload} from "~/utils/tokenTool";
import {useSystemStore} from "~/stores/systemStore";

const systemStore = useSystemStore();
const adminStore = useAdminStore();

const baseUrl = config.baseUrl;

const username = ref("");
const email = ref("");
const password = ref("");
const captchaCode = ref("");
const confirm_password = ref("");
const showRegister = ref(false);
const showPassword = ref(false);
const captchaUrl = ref("");
const tips = ref("");
const allow_next = ref(false);
const cacheid = ref(0)


const router = useRouter();

const login = () => {
  post_json(baseUrl+"/adminLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      captcha:{
        id:cacheid.value,
        code:captchaCode.value
      }
    })
  }).then((res)=>{
    if(res){
      const payload = getPayload(res.token)
      const token = {"token":res.token,"exp":payload.exp,"role":payload.role};
      const refresh_token = res.refresh_token
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("refresh_token",refresh_token);
      systemStore.setToken(token);
      systemStore.setRefreshToken(refresh_token);
      router.push("/admin")
    }
    else {
      tips.value = res.msg;
    }
  })
}


onMounted(()=>{
  cacheid.value = Date.now();
  captchaUrl.value = baseUrl+"/api/login/captcha?id="+cacheid.value;
})

const refreshCaptcha = () => {
  cacheid.value = Date.now();
  captchaUrl.value = baseUrl+"/api/login/captcha?id="+cacheid.value;
}

watch(()=>password.value,()=>{
  if(confirm_password.value.length > 0){
    if(password.value !== confirm_password.value){
      tips.value = "两次密码不一致";
      allow_next.value = false
    }
    else {
      tips.value = ""
      allow_next.value = true;
    }
  }
})
watch(()=>confirm_password.value,()=>{
  if(password.value.length > 0){
    if(password.value !== confirm_password.value){
      tips.value = "两次密码不一致";
      allow_next.value = false
    }
    else {
      tips.value = ""
      allow_next.value = true;
    }
  }
})

watch(()=>showRegister.value,()=>{
  refreshCaptcha()
})
const checkEmail = async ()=>{
  let reg = /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if(!reg.test(email.value)){
    tips.value = "请输入正确的邮箱";
  }
  else {
    tips.value = "";
    const data = await get_json(baseUrl+"/api/users/checkuserbyemail?email="+email.value,{})
    if(data.msg == "Registered"){
      tips.value = "该邮箱已注册";
      allow_next.value = false;
    }
    else {
      allow_next.value = true;
    }
  }
}

const userRegister = async () =>{
  const res = await post_json(baseUrl+"/api/users/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      username:username.value,
      email:email.value,
      password:password.value,
      captcha:{
        id:cacheid.value,
        code:captchaCode.value
      }
    })
  })
  if (res['msg'] === "Wrong captcha"){
    tips.value = "验证码错误"
    refreshCaptcha()
  }
  else if(res['msg'] == "Registered"){
    tips.value = "该邮箱已注册"
    allow_next.value = false
  }
  else{
    showRegister.value = false
    password.value = ""
  }
}
</script>

<style scoped>

</style>