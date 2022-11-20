<template>
    <button :class="['btn', `btn__${type}`]">
        <i v-if="icon">{{ icon }}</i>
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
    icon: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        required: true,
        default: "primary",
    },
})
</script>

<style lang="less" scoped>
.btn {
    height: 56px;
    border-radius: 15px;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    display: block;
    cursor: pointer;

    &__primary {
        background-color: var(--lilac);
        color: #fff;
        border: none;
    }

    &__secondary {
        background-color: #fff;
        color: var(--text);
        border: 1px solid var(--border);
    }
}
</style>