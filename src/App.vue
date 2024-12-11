<script lang="ts" setup></script>

<template>
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
            <KeepAlive>
                <Component :is="Component" />
            </KeepAlive>
        </Transition>
    </RouterView>
</template>
