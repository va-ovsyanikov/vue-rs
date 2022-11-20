<template>
    <div>
        <input class="input__field" :type="type" :placeholder="placeholder" :value="modelValue" min="0" step=".0"
            @input="updateValue($event.target.value)">
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: [String, Number],
        default: "",
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        required: true,
        default: "text"
    }
})
const emit = defineEmits('update:modelValue')
const updateValue = (value) => {
    emit('update:modelValue', value)
}
</script>

<style lang="less" scoped>
.input__field {
    height: 40px;
    border: 1px solid var(--border);
    padding-left: 20px;
    outline: none;
    border-radius: 10px;
    font-size: 16px;
    width: 100%;

    &::-webkit-inner-spin-button {
        display: none;
    }
}
</style>