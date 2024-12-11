<template>
    <div class="bg-white">
        <header class="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" class="flex items-center justify-between p-6 lg:px-8">
                <div class="flex lg:flex-1">
                    <a class="-m-1.5 p-1.5" href="#">
                        <span class="sr-only">piggy_happy</span>
                        <img :src="piggy_happy" alt="piggy_happy" class="h-20 w-auto" />
                    </a>
                </div>
                <div class="flex lg:hidden">
                    <button
                        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        type="button"
                        @click="mobileMenuOpen = true"
                    >
                        <span class="sr-only">打开菜单</span>
                        <Bars3Icon aria-hidden="true" class="size-6" />
                    </button>
                </div>
                <div class="hidden lg:flex lg:gap-x-12">
                    <a
                        v-for="item in navigation"
                        :key="item.name"
                        :href="item.href"
                        class="text-sm/6 font-semibold text-gray-900"
                        >{{ item.name }}</a
                    >
                </div>
                <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a class="text-sm/6 font-semibold text-gray-900" href="#"
                        >登录 <span aria-hidden="true">&rarr;</span></a
                    >
                </div>
            </nav>
            <Dialog :open="mobileMenuOpen" class="lg:hidden" @close="mobileMenuOpen = false">
                <div class="fixed inset-0 z-50" />
                <DialogPanel
                    class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
                >
                    <div class="flex items-center justify-between">
                        <a class="-m-1.5 p-1.5" href="#">
                            <span class="sr-only">piggy_happy</span>
                            <img :src="piggy_happy" alt="piggy_happy" class="h-20 w-auto" />
                        </a>
                        <button
                            class="-m-2.5 rounded-md p-2.5 text-gray-700"
                            type="button"
                            @click="mobileMenuOpen = false"
                        >
                            <span class="sr-only">关闭菜单</span>
                            <XMarkIcon aria-hidden="true" class="size-6" />
                        </button>
                    </div>
                    <div class="mt-6 flow-root">
                        <div class="-my-6 divide-y divide-gray-500/10">
                            <div class="space-y-2 py-6">
                                <a
                                    v-for="item in navigation"
                                    :key="item.name"
                                    :href="item.href"
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >{{ item.name }}</a
                                >
                            </div>
                            <div class="py-6">
                                <a
                                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    href="#"
                                    >Log in</a
                                >
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>

        <div class="relative isolate px-6 pt-14 lg:px-8">
            <div
                aria-hidden="true"
                class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f9a8d4] to-[#ec4899] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "
                />
            </div>
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div
                        class="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                    >
                        版本更新文档
                        <a class="font-semibold text-indigo-600" href="#"
                            ><span aria-hidden="true" class="absolute inset-0" />点我
                            <span aria-hidden="true">&rarr;</span></a
                        >
                    </div>
                </div>
                <div class="text-center">
                    <h1
                        class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
                    >
                        青 云 网 盘
                    </h1>
                    <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        青云网盘是一个基于SpringBoot框架开发的现代化云存储系统，为用户提供安全、高效的文件存储和管理服务。系统采用分布式架构设计，确保高可用性和可扩展性。
                    </p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            href="#"
                            >登录</a
                        >
                        <a class="text-sm/6 font-semibold text-gray-900" href="#"
                            >注册 <span aria-hidden="true">→</span></a
                        >
                    </div>
                </div>
            </div>
            <div
                class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
            >
                <div
                    class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-p bg-gradient-to-tr from-[#f9a8d4] to-[#ec4899] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import piggy_happy from '@/assets/image/piggy/piggy_happy.gif'

const navigation = [
    { name: '主页', href: '#' },
    { name: '文件', href: '#' },
    { name: '会员', href: '#' },
    { name: '用户', href: '#' },
]

const mobileMenuOpen = ref(false)
</script>
