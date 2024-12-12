<template>
    <div>
        <div class="xl:pl-72">
            <main>
                <h1 class="sr-only">Account Settings</h1>

                <header class="border-b border-white/5">
                    <!-- Secondary navigation -->
                    <nav class="flex overflow-x-auto py-4">
                        <ul
                            class="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
                            role="list"
                        >
                            <li v-for="item in secondaryNavigation" :key="item.name">
                                <a
                                    :class="item.current ? 'text-indigo-400' : ''"
                                    :href="item.href"
                                    >{{ item.name }}</a
                                >
                            </li>
                        </ul>
                    </nav>
                </header>

                <!-- Settings forms -->
                <div class="divide-y divide-white/5">
                    <div
                        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
                    >
                        <div>
                            <h2 class="text-base/7 font-semibold text-white">
                                Personal Information
                            </h2>
                            <p class="mt-1 text-sm/6 text-gray-400">
                                Use a permanent address where you can receive mail.
                            </p>
                        </div>

                        <form class="md:col-span-2">
                            <div
                                class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6"
                            >
                                <div class="col-span-full flex items-center gap-x-8">
                                    <img
                                        alt=""
                                        class="size-24 flex-none rounded-lg bg-gray-800 object-cover"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    />
                                    <div>
                                        <button
                                            class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                                            type="button"
                                        >
                                            Change avatar
                                        </button>
                                        <p class="mt-2 text-xs/5 text-gray-400">
                                            JPG, GIF or PNG. 1MB max.
                                        </p>
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label
                                        class="block text-sm/6 font-medium text-white"
                                        for="first-name"
                                        >First name</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="first-name"
                                            autocomplete="given-name"
                                            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            name="first-name"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label
                                        class="block text-sm/6 font-medium text-white"
                                        for="last-name"
                                        >Last name</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="last-name"
                                            autocomplete="family-name"
                                            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            name="last-name"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm/6 font-medium text-white"
                                        for="email"
                                        >Email address</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="email"
                                            autocomplete="email"
                                            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            name="email"
                                            type="email"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm/6 font-medium text-white"
                                        for="username"
                                        >Username</label
                                    >
                                    <div class="mt-2">
                                        <div
                                            class="flex items-center rounded-md bg-white/5 pl-3 outline outline-1 -outline-offset-1 outline-white/10 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
                                        >
                                            <div
                                                class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"
                                            >
                                                example.com/
                                            </div>
                                            <input
                                                id="username"
                                                class="block min-w-0 grow bg-transparent py-1.5 pl-1 pr-3 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6"
                                                name="username"
                                                placeholder="janesmith"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm/6 font-medium text-white"
                                        for="timezone"
                                        >Timezone</label
                                    >
                                    <div class="mt-2 grid grid-cols-1">
                                        <select
                                            id="timezone"
                                            class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pl-3 pr-8 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            name="timezone"
                                        >
                                            <option>Pacific Standard Time</option>
                                            <option>Eastern Standard Time</option>
                                            <option>Greenwich Mean Time</option>
                                        </select>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 flex">
                                <button
                                    class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                    <div
                        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
                    >
                        <div>
                            <h2 class="text-base/7 font-semibold text-white">Change password</h2>
                            <p class="mt-1 text-sm/6 text-gray-400">
                                Update your password associated with your account.
                            </p>
                        </div>

                        <form class="md:col-span-2">
                            <div
                                class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6"
                            >
                                <div class="col-span-full">
                                    <label
                                        class="block text-sm/6 font-medium text-white"
                                        for="current-password"
                                        >Current password</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="current-password"
                                            autocomplete="current-password"
                                            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            name="current_password"
                                            type="password"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm/6 font-medium text-white"
                                        for="new-password"
                                        >New password</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="new-password"
                                            autocomplete="new-password"
                                            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            name="new_password"
                                            type="password"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm/6 font-medium text-white"
                                        for="confirm-password"
                                        >Confirm password</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="confirm-password"
                                            autocomplete="new-password"
                                            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            name="confirm_password"
                                            type="password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 flex">
                                <button
                                    class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                    <div
                        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
                    >
                        <div>
                            <h2 class="text-base/7 font-semibold text-white">
                                Log out other sessions
                            </h2>
                            <p class="mt-1 text-sm/6 text-gray-400">
                                Please enter your password to confirm you would like to log out of
                                your other sessions across all of your devices.
                            </p>
                        </div>

                        <form class="md:col-span-2">
                            <div
                                class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6"
                            >
                                <div class="col-span-full">
                                    <label
                                        class="block text-sm/6 font-medium text-white"
                                        for="logout-password"
                                        >Your password</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="logout-password"
                                            autocomplete="current-password"
                                            class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                            name="password"
                                            type="password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 flex">
                                <button
                                    class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    type="submit"
                                >
                                    Log out other sessions
                                </button>
                            </div>
                        </form>
                    </div>

                    <div
                        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
                    >
                        <div>
                            <h2 class="text-base/7 font-semibold text-white">Delete account</h2>
                            <p class="mt-1 text-sm/6 text-gray-400">
                                No longer want to use our service? You can delete your account here.
                                This action is not reversible. All information related to this
                                account will be deleted permanently.
                            </p>
                        </div>

                        <form class="flex items-start md:col-span-2">
                            <button
                                class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                                type="submit"
                            >
                                Yes, delete my account
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    ChartBarSquareIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

const navigation = [
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Deployments', href: '#', icon: ServerIcon, current: false },
    { name: 'Activity', href: '#', icon: SignalIcon, current: false },
    { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
    { name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
    { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: true },
]
const teams = [
    { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
    { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
    { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]
const secondaryNavigation = [
    { name: 'Account', href: '#', current: true },
    { name: 'Notifications', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    { name: 'Teams', href: '#', current: false },
    { name: 'Integrations', href: '#', current: false },
]

const sidebarOpen = ref(false)
</script>
