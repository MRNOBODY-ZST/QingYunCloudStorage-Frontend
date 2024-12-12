<template>
    <div class="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img :src="piggyHappy" alt="Piggy Happy" class="mx-auto h-32 w-auto" />
            <h2 class="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                登录网盘账户
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
                <form class="space-y-2" @submit.prevent="handleSubmit">
                    <div>
                        <label class="block text-sm/6 font-medium text-gray-900" for="username"
                            >邮箱</label
                        >
                        <div class="mt-2">
                            <input
                                id="username"
                                v-model="username"
                                autocomplete="username"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                name="username"
                                placeholder="Username"
                                required
                                type="text"
                            />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm/6 font-medium text-gray-900" for="password"
                            >密码</label
                        >
                        <div class="mt-2">
                            <input
                                id="password"
                                v-model="password"
                                autocomplete="current-password"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                name="password"
                                placeholder="Password"
                                required
                                type="password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                        >
                            登录
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import piggyHappy from '@/assets/image/piggy/piggy_happy.gif'
import { useUserStore } from '@/stores/userStore.ts'
import { useRouter } from 'vue-router'

const router = useRouter();
const userStore = useUserStore();

// 定义表单数据
const username = ref('');
const password = ref('');

// 提交表单处理函数
const handleSubmit = async () => {
    try {
        const token_response = await axios.post('http://localhost:8080/api/user/login', null, {
            params: {
                username: username.value,
                password: password.value,
            },
        })
        if(token_response.data.message == "success"){
            console.log(token_response.data.data)
            userStore.setToken("Bearer " + token_response.data.data)
            console.log(userStore.token)
            const user_response = await axios.get("http://localhost:8080/api/user",{
                headers: {
                    Authorization: userStore.token
                }
            })
            console.log(user_response.data.data!)
            userStore.setUser(user_response.data.data!)
            console.log(userStore.token)
            console.log("Indexing to home")
            await router.push("/home")
        } else {

        }
    } catch (error) {
        console.error('Error:', error)
    }
}
</script>
