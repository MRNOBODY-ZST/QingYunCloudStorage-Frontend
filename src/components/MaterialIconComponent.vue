<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { generateManifest, type Manifest } from 'material-icon-theme'

interface Props {
    fileName?: string
    folderName?: string
    isOpen?: boolean
    languageId?: string
    theme?: 'light' | 'highContrast'
}

const props = withDefaults(defineProps<Props>(), {
    theme: undefined,
})

const manifest = ref<Manifest | null>(null)

onMounted(() => {
    manifest.value = generateManifest({
        activeIconPack: 'vue',
        hidesExplorerArrows: false,
    })
})

const getIconName = computed(() => {
    if (!manifest.value) return ''

    const themeManifest = props.theme
        ? (manifest.value[props.theme] ?? manifest.value)
        : manifest.value

    if (props.fileName) {
        const extension = props.fileName.split('.').pop() || ''
        return (
            themeManifest.fileExtensions?.[extension] ??
            themeManifest.fileNames?.[props.fileName] ??
            themeManifest.file ??
            ''
        )
    }

    if (props.folderName) {
        return props.isOpen
            ? (themeManifest.folderNamesExpanded?.[props.folderName] ??
                  themeManifest.folderExpanded ??
                  '')
            : (themeManifest.folderNames?.[props.folderName] ?? themeManifest.folder ?? '')
    }

    if (props.languageId) {
        return themeManifest.languageIds?.[props.languageId] ?? themeManifest.file ?? ''
    }

    return ''
})

const iconPath = computed(() => {
    if (!manifest.value || !getIconName.value) return ''

    const iconDefinition = manifest.value.iconDefinitions?.[getIconName.value]
    if (!iconDefinition?.iconPath) return ''

    return `/node_modules/material-icon-theme/icons/${iconDefinition.iconPath.split('/').pop()}`
})
</script>

<template>
    <img v-if="iconPath" :alt="fileName || folderName || languageId" :src="iconPath" />
</template>
