<template>
    <TransitionRoot :show="open" as="template">
        <Dialog class="relative z-50" @close="emitClose">
            <TransitionChild
                as="template"
                enter="ease-in-out duration-500"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-500"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild
                            as="template"
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full"
                            enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0"
                            leave-to="translate-x-full"
                        >
                            <DialogPanel class="pointer-events-auto relative w-96">
                                <TransitionChild
                                    as="template"
                                    enter="ease-in-out duration-500"
                                    enter-from="opacity-0"
                                    enter-to="opacity-100"
                                    leave="ease-in-out duration-500"
                                    leave-from="opacity-100"
                                    leave-to="opacity-0"
                                >
                                    <div
                                        class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4"
                                    >
                                        <button
                                            class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                            type="button"
                                            @click="emitClose"
                                        >
                                            <span class="absolute -inset-2.5" />
                                            <span class="sr-only">关闭面板</span>
                                            <XMarkIcon aria-hidden="true" class="size-6" />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div class="h-full overflow-y-auto bg-white p-8">
                                    <div class="space-y-6 pb-16">
                                        <div>
                                            <div class="flex aspect-[10/7] w-full rounded-lg object-cover items-center justify-center">
                                                <MaterialIconComponent :file-name="props.file?.objectName" class="h-2/3"/>
                                            </div>
                                            <div class="mt-4 flex items-start justify-between">
                                                <div>
                                                    <h2
                                                        class="text-base font-semibold text-gray-900"
                                                    >
                                                        <span class="sr-only">查看文件详情 </span
                                                        >{{ file?.objectName }}
                                                    </h2>
                                                    <p class="text-sm font-medium text-gray-500">
                                                        {{ formatSize(Number(file?.size)) }}
                                                    </p>
                                                </div>
                                                <button
                                                    class="relative ml-4 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    type="button"
                                                >
                                                    <span class="absolute -inset-1.5" />
                                                    <HeartIcon aria-hidden="true" class="size-6" />
                                                    <span class="sr-only">喜欢</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 class="font-medium text-gray-900">文件信息</h3>
                                            <dl
                                                class="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200"
                                            >
                                                <div
                                                    class="flex justify-between py-3 text-sm font-medium"
                                                >
                                                    <dt class="text-gray-500">上传者</dt>
                                                    <dd class="text-gray-900">
                                                        {{ props.file!.userId }}
                                                    </dd>
                                                </div>
                                                <div
                                                    class="flex justify-between py-3 text-sm font-medium"
                                                >
                                                    <dt class="text-gray-500">创建于</dt>
                                                    <dd class="text-gray-900">
                                                        {{ props.file!.createTime!.toLocaleDateString('zh-CN') }}
                                                    </dd>
                                                </div>
                                                <div
                                                    class="flex justify-between py-3 text-sm font-medium"
                                                >
                                                    <dt class="text-gray-500">上次修改</dt>
                                                    <dd class="text-gray-900">
                                                        {{ props.file!.updateTime!.toLocaleDateString('zh-CN') }}
                                                    </dd>
                                                </div>
                                                <div
                                                    class="flex justify-between py-3 text-sm font-medium"
                                                >
                                                    <dt class="text-gray-500">文件大小</dt>
                                                    <dd class="text-gray-900">
                                                        {{ formatSize(Number(file?.size)) }}
                                                    </dd>
                                                </div>
                                                <div
                                                    class="flex justify-between py-3 text-sm font-medium"
                                                >
                                                    <dt class="text-gray-500">ETAG</dt>
                                                    <dd class="text-gray-900">
                                                        {{ props.file!.etag }}
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                        <div>
                                            <h3 class="font-medium text-gray-900">文件描述</h3>
                                            <div class="mt-2 flex items-center justify-between">
                                                <p class="text-sm italic text-gray-500">
                                                    为这个文件添加一个文件描述
                                                </p>
                                                <button
                                                    class="relative -mr-2 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    type="button"
                                                >
                                                    <span class="absolute -inset-1.5" />
                                                    <PencilIcon aria-hidden="true" class="size-5" />
                                                    <span class="sr-only">添加描述</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 class="font-medium text-gray-900">分享</h3>
                                            <ul
                                                class="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200"
                                                role="list"
                                            >
                                                <li class="flex items-center justify-between py-2">
                                                    <button
                                                        class="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        type="button"
                                                    >
                                                        <span
                                                            class="flex size-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400"
                                                        >
                                                            <PlusIcon
                                                                aria-hidden="true"
                                                                class="size-5"
                                                            />
                                                        </span>
                                                        <span
                                                            class="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500"
                                                            >分享</span
                                                        >
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="flex">
                                            <button
                                                class="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                type="button"
                                            >
                                                Download
                                            </button>
                                            <button
                                                class="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                type="button"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts" setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { HeartIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { PencilIcon, PlusIcon } from '@heroicons/vue/20/solid'
import type { File } from '@/views/FileView.vue'
import { formatSize } from '@/views/FileView.vue'
import MaterialIconComponent from '@/components/MaterialIconComponent.vue'

interface Props {
    file?: File
    open: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['close'])

const emitClose = () => {
    emit('close')
}

</script>
