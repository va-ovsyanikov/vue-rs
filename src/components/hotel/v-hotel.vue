<template>
    <div class="hotel">
        <div class="hotel__left">
            <h3 class="hotel__title">{{ name }}</h3>
            <div class="hotel__data">
                <span class="hotel__rating">{{ stars }}</span>
                <span class="hotel__type">{{ type }}</span>
                <i class="hotel__dot ci-dot_02_s"></i>
                <span class="hotel__reviews">{{ reviews_amount }} {{ getNoun(reviews_amount, 'отзыв', 'отзыва',
                        'отзывов')
                }}</span>
                <span class="hotel__country"><i class="hotel__country__dot ci-location_outline"></i> {{ country }}
                </span>
            </div>
            <p class="hotel__text">{{ description }}</p>
        </div>
        <div class="hotel__right">
            {{ min_price }}
            <span>Цена за ночь</span>
            <v-button icon="ci-check" type="small" :active="true">Забранировать</v-button>
        </div>
    </div>
</template>

<script setup>
import { getNoun } from '../../utils/declination';
import vButton from '../button/v-button.vue';
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
        type: Number,
        default: 0
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
    padding: 25px;
    margin-bottom: 15px;
    min-height: 167px;
    &__left{
        width: calc(100% - 179px);
    }

    &__title {
        font-weight: bold;
        margin-bottom: 8px;
    }

    &__data {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    &__type {
        color: var(--gray-dark);
        font-size: 14px;
    }

    &__dot {
        color: var(--gray-dark);
        position: relative;
        top: 1px;
    }

    &__reviews {
        color: var(--gray-dark);
        font-size: 14px;
        margin-right: 10px;
    }

    &__country {
        &__dot {
            position: relative;
            top: 1px;
        }
    }

    &__right {
        width: 179px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

}
</style>