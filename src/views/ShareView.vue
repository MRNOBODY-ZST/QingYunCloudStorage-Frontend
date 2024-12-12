<template>
    <ul class="divide-y divide-gray-100" role="list">
        <li v-for="share in shares" :key="share.id" class="flex justify-between gap-x-6 py-5">
            <div class="flex min-w-0 gap-x-4">
                <div
                    class="size-12 flex-none rounded-full bg-gray-50 flex items-center justify-center"
                >
                    <ShareIcon class="size-6 text-gray-600" />
                </div>
                <div class="min-w-0 flex-auto">
                    <p class="text-sm/6 font-semibold text-gray-900">Share ID: {{ share.id }}</p>
                    <p class="mt-1 flex text-xs/5 text-gray-500">File ID: {{ share.fileId }}</p>
                </div>
            </div>
            <div class="flex shrink-0 items-center gap-x-6">
                <div class="hidden sm:flex sm:flex-col sm:items-end">
                    <p class="text-sm/6 text-gray-900">Duration: {{ share.duration }}</p>
                    <p class="mt-1 text-xs/5 text-gray-500">
                        Created:
                        <time :datetime="share.createTime">{{
                            formatDateTime(share.createTime)
                        }}</time>
                    </p>
                </div>
                <Menu as="div" class="relative flex-none">
                    <MenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span class="sr-only">Open options</span>
                        <EllipsisVerticalIcon aria-hidden="true" class="size-5" />
                    </MenuButton>
                    <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                        <MenuItems
                            class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                        >
                            <MenuItem v-slot="{ active }">
                                <a
                                    :class="[
                                        active ? 'bg-gray-50 outline-none' : '',
                                        'block px-3 py-1 text-sm/6 text-gray-900',
                                    ]"
                                    href="#"
                                    @click="copyShareLink(share.id)"
                                    >Copy Link</a
                                >
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a
                                    :class="[
                                        active ? 'bg-gray-50 outline-none' : '',
                                        'block px-3 py-1 text-sm/6 text-gray-900',
                                    ]"
                                    href="#"
                                    @click="deleteShare(share.id)"
                                    >Delete</a
                                >
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { ShareIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore.ts'

const userStore = useUserStore()

interface Share {
    id: string
    userId: string
    fileId: string
    duration: string
    status: string
    createTime: string
    updateTime: string
}

const shares = ref<Share[]>([])

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/share/all',{
            headers: {
                Authorization: userStore.token
            }
        })
        console.log(response.data.data)
        shares.value = response.data.data
    } catch (error) {
        console.error('Failed to fetch shares:', error)
    }
})

const formatDateTime = (datetime: string) => {
    if (!datetime) return ''
    return new Date(datetime).toLocaleString()
}

const copyShareLink = async (shareId: string) => {
    try {
        const shareLink = `${window.location.origin}/share/${shareId}`
        await navigator.clipboard.writeText(shareLink)
        // You might want to add a toast notification here
        alert('Share link copied to clipboard!')
    } catch (error) {
        console.error('Failed to copy share link:', error)
    }
}

const deleteShare = async (shareId: string) => {
    try {
        const response = await axios.delete('http://localhost:8080/api/share', {
            headers: {
                Authorization: userStore.token
            },
            params: { shareId },
        })
        if (response.data.code === '200') {
            shares.value = shares.value.filter((share) => share.id !== shareId)
            // You might want to add a toast notification here
            alert('Share deleted successfully!')
        }
    } catch (error) {
        console.error('Failed to delete share:', error)
    }
}
</script>
