<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { generateManifest, type Manifest, type ManifestConfig } from 'material-icon-theme'

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
    const config: ManifestConfig = {
        activeIconPack: 'vue',
        hidesExplorerArrows: false,
    }

    manifest.value = generateManifest(config)
})

const getIconName = computed((): string => {
    if (!manifest.value) return ''

    let iconName = ''
    const themeManifest: Manifest = props.theme
        ? manifest.value[props.theme] || manifest.value
        : manifest.value

    if (props.fileName) {
        const extension = props.fileName.split('.').pop() || ''
        iconName =
            themeManifest.fileExtensions?.[extension] ||
            themeManifest.fileNames?.[props.fileName] ||
            themeManifest.file ||
            ''
    } else if (props.folderName) {
        iconName = props.isOpen
            ? themeManifest.folderNamesExpanded?.[props.folderName] ||
              themeManifest.folderExpanded ||
              ''
            : themeManifest.folderNames?.[props.folderName] || themeManifest.folder || ''
    } else if (props.languageId) {
        iconName = themeManifest.languageIds?.[props.languageId] || themeManifest.file || ''
    }

    return iconName
})

const iconPath = computed(() => {
    if (!manifest.value || !getIconName.value) return ''
    const iconDefinition = manifest.value.iconDefinitions?.[getIconName.value]
    if (!iconDefinition) return ''
    const iconFileName = iconDefinition.iconPath.split('/').pop()
    return `/node_modules/material-icon-theme/icons/${iconFileName}`
})
</script>

<template>
    <img v-if="iconPath" :alt="fileName || folderName || languageId" :src="iconPath"/>
</template>
