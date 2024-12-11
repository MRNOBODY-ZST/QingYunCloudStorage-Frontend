<script setup lang="ts">
import ImageGridListComponent from '@/components/ImageGridListComponent.vue'

export interface File {
    id ?: string,
    userId ?: string,
    parentId ?: string,
    objectName ?: string,
    etag ?: string,
    size ?: string,
    contentType ?: string,
    createTime ?: number,
    updateTime ?: number
}

</script>

<template>
    <ImageGridListComponent/>
</template>

<style scoped>

</style>
