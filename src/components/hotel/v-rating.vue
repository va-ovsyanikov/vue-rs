<template>
    <div class="rating">
        <div v-for="index in starLimit" :key="index" class="star__unpainted"></div>
        <!-- {{ratingWidthStyle}} -->
        <div class="rating__star" :style="ratingWidthStyle">
            <div v-for="index in starLimit" :key="index" class="star__shaded"></div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    stars: {
        type: Number,
        default: 0
    },
    starLimit: {
        type: Number,
        default: 5
    }
})
const ratingWidth = computed(() => props.stars / props.starLimit * 100)
const ratingWidthStyle = computed(() => `width: ${ratingWidth.value}%`)
</script>

<style lang="less" scoped>
.rating {
margin-right: 10px;
    display: flex;
    position: relative;

    &__star {
        position: absolute;
        display: flex;
        overflow: hidden;
        flex-wrap: wrap;
        height: 14px;
        left: 0;
        top: 0;
        width: 0;
    }
}

.star {
    &__unpainted {
        width: 14px;
        height: 14px;
        background-image: url(../../assets/img/star-unpainted.svg);
    }

    &__shaded {
        width: 14px;
        height: 14px;
        background-image: url(../../assets/img/star-shaded.svg);
        background-repeat: no-repeat;
    }
}
</style>