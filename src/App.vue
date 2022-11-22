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
          <!-- <v-input placeholder="от 0 Р" v-model="price[0]" /> -->
          <div class="filter__price__show">от {{ price[0] }} Р</div>
          <span class="filter__divider">
            <svg width="10" height="1" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="10" height="1" fill="#C4C4C4" />
            </svg>
          </span>
          <div class="filter__price__show">до {{ price[1] }} Р</div>
          <!-- <v-input placeholder="до 100 500 Р" v-model="price[1]" /> -->
        </div>
        <v-slider v-model="price" :format="format" :merge="merge" :max="5000" :tooltips="false" />
      </v-filter-item>
      <br />
      <v-button type="primary" @click="getHotelsByFilter">
        Применить фильтр
      </v-button>
      <br>
      <v-button type="secondary" @click="resetHotelsByFilter" icon="ci-close_big">
        Очистить фильтр
      </v-button>
    </div>
    <div class="app__content">
      <div v-if="hotels.getHotels.length">

        <v-hotel v-for="({ name, stars, country, type, min_price, description, reviews_amount }, index) in getItems "
          :key="index" :name="name" :stars="stars" :country="country" :type="type" :min_price="min_price"
          :description="description" :reviews_amount="reviews_amount">

        </v-hotel>

      </div>
      <div v-else>
        Записей не найдено
      </div>
    </div>
  </div>
  <div class="pagination">
    <v-paginate v-model="currentPage" :page-count="getPageCount" :page-range="2" :margin-pages="2"
      :prev-text="'< Назад'" :next-text="'Следующая >'" :prev-class="'page__prev__item'"
      :prev-link-class="'page__link__prev'" :next-link-class="'page__link__next'" :page-link-class="'page__link'"
      :next-class="'page__next__item'" :container-class="'pagination__wrap'" :page-class="'page__item'"
      :click-handler="changePage">
    </v-paginate>
  </div>

</template>
<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useHotels } from './stores/hotels';
import vFilterItem from './components/filter/v-filterItem.vue';
import vRating from './components/filter/v-stars.vue';
import vInput from './components/input/v-input.vue';
import vButton from './components/button/v-button.vue';
import vHotel from './components/hotel/v-hotel.vue';
const hotels = useHotels();
const router = useRouter()
const route = useRoute()
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
},])

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
  router.push(route.path)
}
const resetHotelsByFilter = () => {
  location.reload()
}

const pageQuery = computed(() => route.query.page)
watch(pageQuery, newPageQuery => currentPage.value = newPageQuery)
const perPage = ref(3)
const currentPage = ref()

const changePage = (pageNum) => {
  if (pageNum === 1) {
    router.push(route.path)
  } else {
    router.push(`${route.path}?page=${pageNum}`)
  }
  currentPage.value = Number(pageNum);
  // window.scrollTo(0, 0)
}

const getItems = computed(() => {
  let current = (currentPage.value === undefined ? 1 : currentPage.value) * perPage.value;
  let start = current - perPage.value;
  return [...hotels.getHotels].splice(start, current);
})

const getPageCount = computed(() => {
  return Math.ceil(hotels.getHotels.length / perPage.value);
})
</script>
<style lang="less" scoped>
.app {
  width: 100%;
  margin: 50px auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex: 1 0 auto;
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

.filter__price__show {
  border: 1px solid var(--border);
  color: var(--gray-dark);
  border-radius: 10px;
  height: 50px;
  width: 148px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter__divider {
  margin: 0 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
