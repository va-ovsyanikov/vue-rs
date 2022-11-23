<template>
    <div class="hotel">
        <div class="hotel__left">
            <h3 class="hotel__title">{{ name }}</h3>
            <div class="hotel__data">
                <v-rating :star-limit="5" :stars="stars"></v-rating>
                <!-- <span class="hotel__rating">{{ stars }}</span> -->
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
            <span class="hotel__price">
                {{ min_price }} Р
            </span>
            <span class="hotel__price__night">Цена за ночь</span>
            <v-button icon="ci-credit_card" type="small">Забранировать</v-button>
        </div>
    </div>
</template>

<script setup>
import { getNoun } from '../../utils/declination';
import vButton from '../button/v-button.vue';
import vRating from './v-rating.vue';
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
    color: var(--text);

    &__left {
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
        margin-bottom: 15px;
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

    &__price {
        font-size: 25px;
        font-weight: 700;

        &__night {
            color: var(--gray-dark);
            font-size: 12px;
            margin-top: 2px;
            margin-bottom: 23px;
        }
    }

}
</style>