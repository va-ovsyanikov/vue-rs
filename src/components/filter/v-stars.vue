<template>
    <div v-for="item in 5" :key="item" class="checkbox">
        <input class="checkbox__field" :value="`${item}`" type="checkbox" v-model="stars" :id="`check${item}`" />
        <label :for="`check${item}`" class="checkbox__label">
            <span v-if="label" class="checkbox__label__text">
                {{ item }}
                {{ getNoun(item, label + 'a', label + 'ы', label) }}
                <!-- {{ item == 1 ? label + 'a' : label && item < 5 ? label + 'ы' : label }} -->
            </span>
        </label>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getNoun } from '../../utils/declination';
defineProps({
    label: {
        type: String,
        default: ""
    },

});
const stars = ref([])
watch(stars, () => {
    selectstars(stars.value)
})
const emit = defineEmits(['selectstars'])
const selectstars = (stars) => {
    emit('selectstars', stars)
}
</script>

<style lang="less" scoped>
.checkbox {
    margin-bottom: 13px;

    &__field {
        position: absolute;
        z-index: -1;
        opacity: 0;

        &:checked+label {
            &::before {
                content: "";
                display: block;
                height: 18px;
                width: 18px;
                background-image: url("../../assets/img/check.svg");
                background-position: 50% 50%;
                border-radius: 4px;
            }
        }
    }

    &__label {
        display: flex;

        &::before {
            content: "";
            display: block;
            height: 18px;
            width: 18px;
            border-radius: 4px;
            background-image: url("../../assets/img/check-empty.svg");
        }

        &__text {
            font-size: 14px;
            color: var(--text);
            padding-left: 10px;
            cursor: pointer;
            position: relative;
            top: -2px;
            font-size: 16px;
        }
    }
}
</style>