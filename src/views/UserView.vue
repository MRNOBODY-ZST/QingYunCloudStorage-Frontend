<template>
    <div>
        <div class="divide-y divide-gray-200">
            <div
                class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
            >
                <div>
                    <h2 class="text-base/7 font-semibold text-gray-900">个人信息</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">更新您的个人资料信息。</p>
                </div>

                <form class="md:col-span-2" @submit.prevent="updateProfile">
                    <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                        <div class="col-span-full flex items-center gap-x-8">
                            <img
                                :src="userForm.userPict"
                                alt=""
                                class="size-24 flex-none rounded-lg bg-gray-100 object-cover"
                            />
                            <div>
                                <input
                                    ref="fileInput"
                                    accept="image/*"
                                    class="hidden"
                                    type="file"
                                    @change="handleFileChange"
                                />
                                <button
                                    class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    type="button"
                                    @click="triggerFileUpload"
                                >
                                    更换头像
                                </button>
                                <p class="mt-2 text-xs/5 text-gray-600">
                                    JPG, GIF 或 PNG. 最大 1MB.
                                </p>
                                <p
                                    v-if="uploadMessage"
                                    :class="[
                                        'mt-2 text-xs/5',
                                        uploadSuccess ? 'text-green-600' : 'text-red-600',
                                    ]"
                                >
                                    {{ uploadMessage }}
                                </p>
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label class="block text-sm/6 font-medium text-gray-900" for="username"
                                >用户名</label
                            >
                            <div class="mt-2">
                                <input
                                    id="username"
                                    v-model="userForm.username"
                                    class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label class="block text-sm/6 font-medium text-gray-900" for="email"
                                >邮箱地址</label
                            >
                            <div class="mt-2">
                                <input
                                    id="email"
                                    v-model="userForm.email"
                                    class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    type="email"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 flex">
                        <button
                            :disabled="isUpdating"
                            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                        >
                            {{ isUpdating ? '保存中...' : '保存' }}
                        </button>
                        <p
                            v-if="updateMessage"
                            :class="[
                                'ml-4 self-center text-sm',
                                updateSuccess ? 'text-green-600' : 'text-red-600',
                            ]"
                        >
                            {{ updateMessage }}
                        </p>
                    </div>
                </form>
            </div>

            <!-- 其他部分（密码修改等）保持不变 -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { User } from '@/stores/userStore'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

const userStore = useUserStore()
const fileInput = ref<HTMLInputElement | null>(null)
const uploadMessage = ref('')
const uploadSuccess = ref(false)
const updateMessage = ref('')
const updateSuccess = ref(false)
const isUpdating = ref(false)

// 创建用户表单数据
const userForm = reactive<User>({
    id: userStore.user?.id,
    username: userStore.user?.username || '',
    email: userStore.user?.email || '',
    userPict: userStore.user?.userPict || '',
})

// 初始化表单数据
onMounted(() => {
    if (userStore.user) {
        Object.assign(userForm, {
            id: userStore.user.id,
            username: userStore.user.username,
            email: userStore.user.email,
            userPict: userStore.user.userPict,
        })
    }
})

const triggerFileUpload = () => {
    fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files?.length) return

    const file = target.files[0]

    if (file.size > 1024 * 1024) {
        uploadMessage.value = '文件大小不能超过1MB'
        uploadSuccess.value = false
        return
    }

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        uploadMessage.value = '只支持JPG、PNG和GIF格式'
        uploadSuccess.value = false
        return
    }

    try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await axios.post('http://localhost:8080/api/file/avatar', formData, {
            headers: {
                Authorization: userStore.token,
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.data.code === 200) {
            uploadMessage.value = '头像上传成功'
            uploadSuccess.value = true

            // 获取头像访问URL
            const etag = response.data.data
            try {
                const avatarResponse = await axios.get(
                    `http://localhost:8080/api/file/avatar?etag=${etag}`,
                    {
                        headers: {
                            Authorization: userStore.token,
                        },
                    },
                )
                if (avatarResponse.data.code === 200) {
                    userForm.userPict = avatarResponse.data.data
                    // 立即更新用户信息
                    await updateProfile()
                } else {
                    throw new Error(avatarResponse.data.message || '获取头像URL失败')
                }
            } catch (error) {
                uploadMessage.value =
                    '获取头像URL失败: ' + (error instanceof Error ? error.message : '未知错误')
                uploadSuccess.value = false
                return
            }
        } else {
            throw new Error(response.data.message || '上传失败')
        }
    } catch (error) {
        uploadMessage.value = '上传失败: ' + (error instanceof Error ? error.message : '未知错误')
        uploadSuccess.value = false
    }
}

const updateProfile = async () => {
    try {
        isUpdating.value = true
        updateMessage.value = ''

        const response = await axios.patch('http://localhost:8080/api/user', null, {
            headers: {
                Authorization: userStore.token,
            },
            params: {
                id: userForm.id,
                username: userForm.username,
                email: userForm.email,
                userPict: userForm.userPict,
            },
        })

        if (response.data.code === 200) {
            updateMessage.value = '个人信息更新成功'
            updateSuccess.value = true

            // 更新 Pinia store
            userStore.setUser({
                ...userStore.user,
                ...userForm,
            })
        } else {
            throw new Error(response.data.message || '更新失败')
        }
    } catch (error) {
        updateMessage.value = '更新失败: ' + (error instanceof Error ? error.message : '未知错误')
        updateSuccess.value = false
    } finally {
        isUpdating.value = false
    }
}
</script>
