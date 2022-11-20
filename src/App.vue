<template>
  <div class="app">
    <div class="app__filter">
      <v-filter-item title="Страна">
        <v-tree-select v-model="country" :multiple="true" :options="countryList" placeholder="Поиск стран" />
      </v-filter-item>

      <v-filter-item title="Тип">
        <v-tree-select v-model="type" :multiple="true" :searchable="false" :options="typeList" placeholder="Тип" />
      </v-filter-item>

      <v-filter-item title="Количество звезд">
        <v-rating label="звезд" @selectRating="selectRating"></v-rating>
      </v-filter-item>

      <v-filter-item title="Количество отзывов (от)">
        <v-input placeholder="Например, от 10" v-model="recallData" type="number" />
      </v-filter-item>


      <v-filter-item title="Цена">
        <div class="filter__price">
          <v-input placeholder="от 0 Р" v-model="price[0]" />
          <span class="filter__divider">
            <svg width="10" height="1" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="10" height="1" fill="#C4C4C4" />
            </svg>
          </span>
          <v-input placeholder="до 100 500 Р" v-model="price[1]" />
        </div>
        <v-slider v-model="price" :format="format" :merge="merge" :max="5000" :tooltips="false" />
      </v-filter-item>
      <br />
      <v-button type="primary" @click="getHotelsByFilter">
        Применить фильтр
      </v-button>
      <br>
      <v-button type="secondary"  @click="resetHotelsByFilter">
        Применить фильтр
      </v-button>
    </div>
    <div class="app__content">
      <div v-if="hotels.getHotels.length">
  
        <v-hotel v-for="({name, stars, country, type, min_price, description, reviews_amount}, index) in hotels.getHotels" :key="index"
        :name="name"
        :stars="stars"
        :country="country"
        :type="type"
        :min_price="min_price"
        :description="description"
        :reviews_amount="reviews_amount"
        >
        
        </v-hotel>
       
      </div>
      <div v-else>
        Записей не найдено
      </div>

    </div>

  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useHotels } from './stores/hotels';
import vFilterItem from './components/filter/v-filterItem.vue';
import vRating from './components/rating/v-rating.vue';
import vInput from './components/input/v-input.vue';
import vButton from './components/button/v-button.vue';
import vHotel from './components/hotel/v-hotel.vue';
const hotels = useHotels();
// hotels.fetchHotels();

//country
const country = ref([])
const countryList = ref([{
  id: 'Греция',
  label: 'Греция',
}, {
  id: 'Беларусь',
  label: 'Беларусь',
}, {
  id: 'Италия',
  label: 'Италия',
}])

//type
const type = ref([])
const typeList = ref([{
  id: 'Апартаменты',
  label: 'Апартаменты',
}, {
  id: 'Отель',
  label: 'Отель',
}])

//rating
const rating = ref([])
const selectRating = (data) => {
  rating.value = data
}

//recall
const recall = ref()
const recallData = computed({
  get() {
    return recall.value
  },
  set(newValue) {
    recall.value = newValue.replace(/[^0-9]/g, '');
  }
})
//price;
const merge = ref(10)
const price = ref([0, 5000])
function format(price) {
  return `€${price.value}`
}

const getHotelsByFilter = () => {
  const filter = {
    country: country.value,
    type: type.value,
    rating: rating.value,
    recall: recall.value,
    min_price: price.value[0],
    max_price: price.value[1],
  }
  hotels.filteredHotels(filter)
}
const resetHotelsByFilter = () => {
  location.reload()
}



</script>
<style lang="less" scoped>
.app {
  width: 1200px;
  margin: 50px auto;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.app__filter {
  width: 325px;
}

.app__content {
  width: 835px;
  padding-top: 38px;
}

.filter__price {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 40px;
}

.filter__divider {
  margin: 0 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
