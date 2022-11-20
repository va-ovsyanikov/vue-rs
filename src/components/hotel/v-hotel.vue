<template>
    <div class="hotel">
        <div class="hotel__left">
            <h3 class="hotel__title">{{ name }}</h3>
            <div class="hotel__data">
                <span>{{ stars }}</span>
                <span>{{ type }}</span>
                <span>{{ reviews_amount }}</span>
                <span>{{ country }}</span>
            </div>
            <p class="hotel__text">{{ description }}</p>
        </div>
        <div class="hotel__right">
            {{ min_price }}
        </div>
    </div>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    stars: {
        type: String,
        default: ''
    },
    min_price: {
        type: Number,
        default: 0
    },
    reviews_amount: {
        type: Number,
        default: 0
    },

})
</script>

<style lang="less" scoped>
.hotel {
    display: flex;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding:25px;
    margin-bottom: 15px;
    min-height: 167px;
}
</style>