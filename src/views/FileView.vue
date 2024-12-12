<script lang="ts" setup>
import FileDrawerComponent from '@/components/FileDrawerComponent.vue'
import MaterialIconComponent from '@/components/MaterialIconComponent.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore.ts'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ArrowUpTrayIcon, FolderPlusIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const files = ref<File[]>([])
const folders = ref<Folder[]>([])
const currentFile = ref<File | undefined>()
const isDrawerOpen = ref<boolean>(false)

// 右键菜单相关
const showContextMenu = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)

// 文件上传相关
const fileInput = ref<HTMLInputElement | null>(null)

// 新建文件夹相关
const showNewFolderDialog = ref(false)
const newFolderName = ref('')
const isCreatingFolder = ref(false)

const fetchFiles = async (parentId: string) => {
    try {
        const response = await axios.get('http://localhost:8080/api/file/parentId', {
            headers: {
                Authorization: userStore.token,
            },
            params: {
                parentId,
            },
        })
        files.value = response.data.data || []
    } catch (error) {
        console.error('Error fetching files:', error)
    }
}

const fetchFolders = async (parentId: string) => {
    try {
        const response = await axios.get('http://localhost:8080/api/folder/parentId', {
            headers: {
                Authorization: userStore.token,
            },
            params: {
                parentId,
            },
        })
        folders.value = response.data.data || []
    } catch (error) {
        console.error('Error fetching folders:', error)
    }
}

const openDrawer = (file: File) => {
    currentFile.value = {
        ...file,
        createTime: file.createTime ? new Date(file.createTime) : undefined,
        updateTime: file.updateTime ? new Date(file.updateTime) : undefined,
    }
    isDrawerOpen.value = true
}

const closeDrawer = () => {
    isDrawerOpen.value = false
}

const onFileDeleted = () => {
    loadCurrentDirectory()
}

const loadCurrentDirectory = async () => {
    const parentId = (route.params.parentId as string) || '0'
    await Promise.all([fetchFiles(parentId), fetchFolders(parentId)])
}

// 处理右键点击事件
const handleContextMenu = (event: MouseEvent) => {
    showContextMenu.value = true
    contextMenuX.value = event.clientX
    contextMenuY.value = event.clientY
    event.stopPropagation()
}

// 处理点击其他区域关闭右键菜单
const handleClickOutside = (event: MouseEvent) => {
    if (showContextMenu.value) {
        showContextMenu.value = false
    }
}

// 打开新建文件夹弹窗
const openNewFolderDialog = () => {
    showNewFolderDialog.value = true
    showContextMenu.value = false
    newFolderName.value = ''
}

// 创建新文件夹
const createNewFolder = async () => {
    if (!newFolderName.value.trim()) {
        return
    }

    isCreatingFolder.value = true
    try {
        await axios.post('http://localhost:8080/api/folder', null, {
            headers: {
                Authorization: userStore.token,
            },
            params: {
                folderName: newFolderName.value.trim(),
                parentId: route.params.parentId || '0',
            },
        })

        await loadCurrentDirectory()
        showNewFolderDialog.value = false
        newFolderName.value = ''
    } catch (error) {
        console.error('Error creating folder:', error)
    } finally {
        isCreatingFolder.value = false
    }
}

// 触发文件选择
const triggerFileUpload = () => {
    fileInput.value?.click()
    showContextMenu.value = false
}

// 处理文件上传
const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files

    if (files && files.length > 0) {
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('parentId', String(route.params.parentId || '0'))

        try {
            await axios.post('http://localhost:8080/api/file', formData, {
                headers: {
                    Authorization: userStore.token,
                    'Content-Type': 'multipart/form-data',
                },
            })

            await loadCurrentDirectory()

            if (fileInput.value) {
                fileInput.value.value = ''
            }
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }
}

// 监听路由参数变化
watch(
    () => route.params.parentId,
    () => {
        loadCurrentDirectory()
    },
)

onMounted(() => {
    loadCurrentDirectory()
    document.addEventListener('click', handleClickOutside)
})

const contextMenuItems = [
    {
        name: '上传文件',
        icon: ArrowUpTrayIcon,
        action: triggerFileUpload,
    },
    {
        name: '新建文件夹',
        icon: FolderPlusIcon,
        action: openNewFolderDialog,
    },
]

const navigateToFolder = (folderId: string) => {
    router.push(`/file/${folderId}`)
}
</script>

<script lang="ts">
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

export interface Folder {
    id?: string
    userId?: string
    parentId?: string
    folderName?: string
    createTime?: Date
    updateTime?: Date
}

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
    <div class="min-h-screen p-6" @contextmenu.prevent="handleContextMenu">
        <!-- Files and Folders Grid -->
        <ul
            class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8"
            role="list"
        >
            <!-- Folders -->
            <li v-for="folder in folders" :key="folder.folderName" class="relative">
                <div
                    class="group aspect-[10/7] block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                    @click="navigateToFolder(folder.id || '')"
                >
                    <div class="flex items-center justify-center pointer-events-none h-full">
                        <MaterialIconComponent
                            :folder-name="folder.folderName"
                            class="h-1/2 text-gray-600"
                        />
                    </div>
                    <button class="absolute inset-0 focus:outline-none" type="button">
                        <span class="sr-only">查看 {{ folder.folderName }}</span>
                    </button>
                </div>
                <p
                    class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900"
                >
                    {{ folder.folderName }}
                </p>
            </li>

            <!-- Files -->
            <li v-for="file in files" :key="file.etag" class="relative">
                <div
                    class="group aspect-[10/7] block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                    @click="openDrawer(file)"
                >
                    <div class="flex items-center justify-center pointer-events-none h-full">
                        <MaterialIconComponent
                            :file-name="file.objectName"
                            class="h-1/2 text-gray-600"
                        />
                    </div>
                    <button class="absolute inset-0 focus:outline-none" type="button">
                        <span class="sr-only">查看 {{ file.objectName }}</span>
                    </button>
                </div>
                <p
                    class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900"
                >
                    {{ file.objectName }}
                </p>
                <p class="pointer-events-none block text-sm font-medium text-gray-500">
                    {{ formatSize(Number(file.size)) }}
                </p>
            </li>
        </ul>

        <!-- Context Menu -->
        <nav
            v-if="showContextMenu"
            :style="{ left: contextMenuX + 'px', top: contextMenuY + 'px' }"
            aria-label="Context menu"
            class="fixed bg-white shadow-lg rounded-lg py-1 w-56 z-50 ring-1 ring-black ring-opacity-5"
        >
            <ul class="space-y-1" role="list">
                <li v-for="item in contextMenuItems" :key="item.name">
                    <button
                        class="w-full group flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        @click="item.action"
                    >
                        <component
                            :is="item.icon"
                            aria-hidden="true"
                            class="h-5 w-5 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        />
                        {{ item.name }}
                    </button>
                </li>
            </ul>
        </nav>

        <!-- New Folder Dialog -->
        <TransitionRoot :show="showNewFolderDialog" as="template">
            <Dialog as="div" class="relative z-[60]" @close="showNewFolderDialog = false">
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div
                        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                    >
                        <TransitionChild
                            as="template"
                            enter="ease-out duration-300"
                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel
                                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                            >
                                <div>
                                    <div
                                        class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100"
                                    >
                                        <FolderPlusIcon
                                            aria-hidden="true"
                                            class="h-6 w-6 text-indigo-600"
                                        />
                                    </div>
                                    <div class="mt-3 text-center sm:mt-5">
                                        <DialogTitle
                                            as="h3"
                                            class="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            新建文件夹
                                        </DialogTitle>
                                        <div class="mt-4">
                                            <input
                                                v-model="newFolderName"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="请输入文件夹名称"
                                                type="text"
                                                @keyup.enter="createNewFolder"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
                                >
                                    <button
                                        :disabled="isCreatingFolder"
                                        class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        type="button"
                                        @click="createNewFolder"
                                    >
                                        {{ isCreatingFolder ? '创建中...' : '创建' }}
                                    </button>
                                    <button
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                        type="button"
                                        @click="showNewFolderDialog = false"
                                    >
                                        取消
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Hidden File Input -->
        <input ref="fileInput" type="file" class="hidden" @change="handleFileUpload" />

        <!-- File Drawer -->
        <FileDrawerComponent
            :file="currentFile"
            :open="isDrawerOpen"
            @close="closeDrawer"
            @file-deleted="onFileDeleted"
        />
    </div>
</template>

<style scoped>
.hidden {
    display: none;
}
</style>
