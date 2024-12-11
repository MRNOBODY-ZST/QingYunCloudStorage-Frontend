<template>
    <div>
        <TransitionRoot :show="sidebarOpen" as="template">
            <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild
                    as="template"
                    enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild
                        as="template"
                        enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full"
                        enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leave-from="translate-x-0"
                        leave-to="-translate-x-full"
                    >
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild
                                as="template"
                                enter="ease-in-out duration-300"
                                enter-from="opacity-0"
                                enter-to="opacity-100"
                                leave="ease-in-out duration-300"
                                leave-from="opacity-100"
                                leave-to="opacity-0"
                            >
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button
                                        class="-m-2.5 p-2.5"
                                        type="button"
                                        @click="sidebarOpen = false"
                                    >
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" class="size-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div
                                class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10"
                            >
                                <div class="flex h-16 shrink-0 items-center">
                                    <img
                                        :src="piggy_happy"
                                        alt="piggy_happy"
                                        class="h-16 w-auto mt-4"
                                    />
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul class="flex flex-1 flex-col gap-y-7" role="list">
                                        <li>
                                            <ul class="-mx-2 space-y-1" role="list">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <RouterLink :to="item.href">
                                                        <a
                                                            :class="[
                                                                item.current
                                                                    ? 'bg-gray-800 text-white'
                                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                            ]"
                                                        >
                                                            <component
                                                                :is="item.icon"
                                                                aria-hidden="true"
                                                                class="size-6 shrink-0"
                                                            />
                                                            {{ item.name }}
                                                        </a>
                                                    </RouterLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div class="text-xs/6 font-semibold text-gray-400">
                                                文件停靠栏
                                            </div>
                                            <ul class="-mx-2 mt-2 space-y-1" role="list">
                                                <li
                                                    v-for="dockFile in dockFiles"
                                                    :key="dockFile.objectName"
                                                >
                                                    <a
                                                        :class="[
                                                            dockFile.current
                                                                ? 'bg-gray-800 text-white'
                                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                        ]"
                                                        :href="dockFile.etag"
                                                    >
                                                        <span
                                                            class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
                                                        >
                                                            <MaterialIconComponent
                                                                :file-name="dockFile.objectName"
                                                                class="h-4"
                                                            />
                                                            ></span
                                                        >
                                                        <span class="truncate">{{
                                                            dockFile.objectName
                                                        }}</span>
                                                        <span class="truncate">{{
                                                            dockFile.size
                                                        }}</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="mt-auto">
                                            <a
                                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                                href="#"
                                            >
                                                <Cog6ToothIcon
                                                    aria-hidden="true"
                                                    class="size-6 shrink-0"
                                                />
                                                设置
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center">
                    <img :src="piggy_happy" alt="piggy_happy" class="h-16 w-auto mt-4" />
                </div>
                <nav class="flex flex-1 flex-col">
                    <ul class="flex flex-1 flex-col gap-y-7" role="list">
                        <li>
                            <ul class="-mx-2 space-y-1" role="list">
                                <li v-for="item in navigation" :key="item.name">
                                    <a
                                        :class="[
                                            item.current
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                        ]"
                                        :href="item.href"
                                    >
                                        <component
                                            :is="item.icon"
                                            aria-hidden="true"
                                            class="size-6 shrink-0"
                                        />
                                        {{ item.name }}
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div class="text-xs/6 font-semibold text-gray-400">文件停靠栏</div>
                            <ul class="-mx-2 mt-2 space-y-1" role="list">
                                <li v-for="dockFile in dockFiles" :key="dockFile.objectName">
                                    <a
                                        :class="[
                                            dockFile.current
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                        ]"
                                        :href="dockFile.etag"
                                    >
                                        <span
                                            class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
                                            ><MaterialIconComponent
                                                :file-name="dockFile.objectName"
                                            ></MaterialIconComponent
                                        ></span>
                                        <span class="truncate">{{ dockFile.objectName }}</span>
                                        <span class="truncate">{{ dockFile.size }}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="mt-auto">
                            <a
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                href="#"
                            >
                                <Cog6ToothIcon aria-hidden="true" class="size-6 shrink-0" />
                                设置
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="lg:pl-72">
            <div
                class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
            >
                <button
                    class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    type="button"
                    @click="sidebarOpen = true"
                >
                    <span class="sr-only">打开侧边栏</span>
                    <Bars3Icon aria-hidden="true" class="size-6" />
                </button>

                <!-- Separator -->
                <div aria-hidden="true" class="h-6 w-px bg-gray-900/10 lg:hidden" />

                <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    <form action="#" class="grid flex-1 grid-cols-1" method="GET">
                        <input
                            aria-label="Search"
                            class="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
                            name="search"
                            placeholder="Search"
                            type="search"
                        />
                        <MagnifyingGlassIcon
                            aria-hidden="true"
                            class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                        />
                    </form>
                    <div class="flex items-center gap-x-4 lg:gap-x-6">
                        <button
                            class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                            type="button"
                        >
                            <span class="sr-only">查看通知</span>
                            <BellIcon aria-hidden="true" class="size-6" />
                        </button>

                        <!-- Separator -->
                        <div
                            aria-hidden="true"
                            class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                        />

                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative">
                            <MenuButton class="-m-1.5 flex items-center p-1.5">
                                <span class="sr-only">打开个人资料</span>
                                <img
                                    :src="user?.userPict"
                                    alt=""
                                    class="size-8 rounded-full bg-gray-50"
                                />
                                <span class="hidden lg:flex lg:items-center">
                                    <span
                                        aria-hidden="true"
                                        class="ml-4 text-sm/6 font-semibold text-gray-900"
                                        >{{ user?.username }}</span
                                    >
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        class="ml-2 size-5 text-gray-400"
                                    />
                                </span>
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
                                    class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                >
                                    <MenuItem
                                        v-for="item in userNavigation"
                                        :key="item.name"
                                        v-slot="{ active }"
                                    >
                                        <a
                                            :class="[
                                                active ? 'bg-gray-50 outline-none' : '',
                                                'block px-3 py-1 text-sm/6 text-gray-900',
                                            ]"
                                            :href="item.href"
                                            >{{ item.name }}</a
                                        >
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>

            <main class="py-8 h-dvh">
                <div class="px-4 sm:px-6 lg:px-8">
                    <KeepAlive>
                        <RouterView v-slot="{ Component }">
                            <Transition
                                enter-active-class="transition-opacity duration-150 ease-out"
                                enter-from-class="opacity-0"
                                enter-to-class="opacity-100"
                                leave-active-class="transition-opacity duration-150 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                                mode="out-in"
                            >
                                <component :is="Component" :key="$route.path" />
                            </Transition>
                        </RouterView>
                    </KeepAlive>
                </div>
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    Bars3Icon,
    BellIcon,
    ClockIcon,
    Cog6ToothIcon,
    FolderIcon,
    HomeIcon,
    ShareIcon,
    UserIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import piggy_happy from '@/assets/image/piggy/piggy_happy.gif'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import type { User } from '@/stores/userStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import type { File } from '@/views/FileView.vue'
import MaterialIconComponent from '@/components/MaterialIconComponent.vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const user = ref<User | null>(userStore.user)

const navigation = ref([
    { name: '主页', href: 'home', icon: HomeIcon, current: true },
    { name: '文件', href: 'file', icon: FolderIcon, current: false },
    { name: '最近使用', href: 'recent', icon: ClockIcon, current: false },
    { name: '分享', href: 'share', icon: ShareIcon, current: false },
    { name: '个人中心', href: 'user', icon: UserIcon, current: false },
])

interface DockFile extends File {
    current?: boolean
}

const dockFiles = ref<DockFile[] | null>([
    {
        id: '1',
        userId: '1',
        parentId: '0',
        objectName: 'IMG_4985.HEIC',
        etag: '3bbe70393ebd16ee5f9d0133d6957feb',
        size: '62.1 KiB',
        contentType: 'application/octet-stream',
        createTime: Date.now(),
        updateTime: Date.now(),
        current: false,
    },
])
const userNavigation = [
    { name: '个人资料', href: '#' },
    { name: '登出', href: '#' },
]

const sidebarOpen = ref(false)

const updateCurrentPage = () => {
    navigation.value.forEach((item) => {
        item.current = route.path.split('/')[1] === item.href
    })
}

watch(() => route.path, updateCurrentPage, { immediate: true })
</script>

<style scoped></style>
