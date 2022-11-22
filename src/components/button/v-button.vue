<template>
    <button :class="['btn', `btn__${type}`, { active: active }]" @click="onClick">
        <i v-if="icon" :class="[`btn__${type}__icon`, icon]"></i>
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
    icon: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true,
        default: "primary",
    },
    onClick: {
        type: Function,
        default: () => { },
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
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &__primary {
        background-color: var(--lilac);
        color: #fff;
        border: none;

    }

    &__secondary {
        background-color: #fff;
        color: var(--text);
        border: 1px solid var(--border);

        &__icon {
            margin-right: 5px;
            font-weight: bold;
            position: relative;
            top: -1px;
        }
    }

    &__small {
        font-size: 14px;
        height: 40px;
        font-weight: 400;
        border: none;
        color: var(--lilac);
        background-color: rgba(106, 81, 245, 0.1);

        &.active {
            background-color: rgba(0, 187, 109, 0.1);
            color: var(--green);
        }

        &__icon {
            margin-right: 5px;
            font-size: 18px;
        }
    }



}
</style>