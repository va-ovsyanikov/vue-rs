<template>
    <div class="filter__item">
        <h3 class="filter__item__title">{{ title }}</h3>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: "Item"
    }
})
</script>

<style lang="less" scoped>
.filter__item{
    margin-bottom: 30px;
}
.filter__item__title {
    font-weight: bold;
    margin-bottom: 14px;
    color: #3A3A3A;
}
</style>