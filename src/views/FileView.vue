<script lang="ts" setup>
import FileDrawerComponent from '@/components/FileDrawerComponent.vue'
import MaterialIconComponent from '@/components/MaterialIconComponent.vue'
import { ref } from 'vue'

/**
 * 将字节数转换为人类可读的格式（KB、MB、GB、TB）。
 *
 * @param bytes - 文件大小，单位为字节。
 * @param decimals - 保留的小数位数，默认值为 2。
 * @returns 格式化后的文件大小字符串。
 */

export interface File {
    id?: string
    userId?: string
    parentId?: string
    objectName?: string
    etag?: string
    size?: string
    contentType?: string
    createTime?: Date
    updateTime?: Date
}

const files = ref<File[]>([
    {
        id: '1',
        userId: '1',
        parentId: '0',
        objectName: 'IMG_4985.heic',
        etag: '3bbe70393ebd16ee5f9d0133d6957feb',
        size: '60013',
        contentType: 'application/octet-stream',
        createTime: new Date(),
        updateTime: new Date(),
    },
    {
        id: '1',
        userId: '1',
        parentId: '0',
        objectName: 'main.ipynb',
        etag: '3bbe70393ebd16e12357feb',
        size: '60013',
        contentType: 'application/octet-stream',
        createTime: new Date(),
        updateTime: new Date(),
    },
])

const currentFile = ref<File | undefined>(files.value[0])
const isDrawerOpen = ref<boolean>(false)

const openDrawer = (file: File) => {
    currentFile.value = file
    isDrawerOpen.value = true
}

const closeDrawer = () => {
    isDrawerOpen.value = false
}
</script>

<script lang="ts">
export function formatSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

    return `${size} ${sizes[i]}`
}
</script>

<template>
    <ul
        class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-3 lg:grid-cols-6 xl:gap-x-6"
        role="list"
    >
        <li v-for="file in files" :key="file.etag" class="relative">
            <div
                class="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                @click="openDrawer(file)"
            >
                <div
                    class="flex items-center justify-center pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
                >
                    <MaterialIconComponent :file-name="file.objectName" class="h-1/2" />
                </div>
                <button class="absolute inset-0 focus:outline-none" type="button">
                    <span class="sr-only">查看文件详情 {{ file.objectName }}</span>
                </button>
            </div>
            <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                {{ file.objectName }}
            </p>
            <p class="pointer-events-none block text-sm font-medium text-gray-500">
                {{ formatSize(Number(file.size)) }}
            </p>
        </li>
    </ul>
    <FileDrawerComponent :file="currentFile" :open="isDrawerOpen" @close="closeDrawer" />
</template>
