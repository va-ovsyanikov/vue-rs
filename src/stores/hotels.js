// import { inject } from 'vue';
import { defineStore } from 'pinia'


export const useHotels = defineStore('counter', {
  state: () => ({
    hotels: [
      {
        "name": "Marina Inn",
        "country": "Греция",
        "address": "Фалираки, Родос, Греция",
        "stars": 4,
        "type": "Отель",
        "description": "Этот 4-звездочный отель расположен в центре города. На его территории есть бассейн с террасой и сауна. Из номеров открывается вид на море или на средневековый город.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Бесплатная парковка", "Бесплатный WiFi", "Вид на море", "Бесплатный завтрак"],
        "min_price": 2789.00,
        "currency": "RUR",
        "rating": 4.5,
        "reviews_amount": 18,
        "last_review": "Отличное расположение. Вкусный завтрак. Отдыхали с детьми - все понравилось."
      },
      {
        "name": "Mondrian Suites",
        "country": "Беларусь",
        "address": "Фалираки, Родос, Греция",
        "stars": 5,
        "type": "Апартаменты",
        "description": "Из окон открывается вид на город.К услугам гостей номера-студио с балконом и чайником в 2,7 км от пляжа.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Платная парковка", "Бесплатный WiFi", "Вид на море"],
        "min_price": 3245.20,
        "currency": "RUR",
        "rating": 5,
        "reviews_amount": 4,
        "last_review": "Потрясающее место, в номере есть все необходимое. Красивый вид на море."
      },
      {
        "name": "Sunny Appartments",
        "country": "Греция",
        "address": "Родос, Родос, Греция",
        "stars": 2,
        "type": "Апартаменты",
        "description": "Все номера и апартаменты оборудованы кондиционером и телевизором с плоским экраном. Также в распоряжении гостей тостер и чайник.",
        "services": ["Пляж", "Кондиционер", "Бесплатная парковка", "Бесплатный WiFi"],
        "min_price": 1153.00,
        "currency": "RUR",
        "rating": 2.4,
        "reviews_amount": 36,
        "last_review": "Бассейн очень маленький. Кормят невкусно. Больше не поедем."
      },
      {
        "name": "Super All Inclusive Hotel",
        "country": "Италия",
        "address": "Родос, Родос, Греция",
        "stars": 4,
        "type": "Отель",
        "description": "Все номера оснащены телевизором с плоским экраном. Из некоторых номеров открывается вид на море или город.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Бесплатный WiFi", "Вид на море", "Бесплатный завтрак"],
        "min_price": 3689.00,
        "currency": "RUR",
        "rating": 4.1,
        "reviews_amount": 14,
        "last_review": "Недалёко от пляжа и старого города, вокруг много разных магазинчиков"
      },
      {
        "name": "Adams Hotel",
        "country": "Греция",
        "address": "Родос, Родос, Греция",
        "stars": 3,
        "type": "Отель",
        "description": "Отель расположен всего в 100 метрах от пляжа и в 5-ти минутах ходьбы от исторической части города, недалеко от всех основных достопримечательностей. Из отеля открывается вид на море. К услугам гостей спокойный открытый бассейн.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Бесплатная парковка", "Бесплатный WiFi", "Бесплатный завтрак"],
        "min_price": 1896.00,
        "currency": "RUR",
        "rating": 0,
        "reviews_amount": 0,
        "last_review": ""
      }
    ],
    filter: ''
  }),
  actions: {
    // async fetchHotels() {
    //   try {
    //     const $axios = inject('axios').create({
    //       baseURL: 'http://localhost:3001/hotels'
    //     })
    //     const response = await $axios.get()
    //     this.hotels = response.data
    //     console.log(this.hotels);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    filteredHotels(data) {
        this.filter = data
    }
  },
  getters: {
    getHotels: state => state.hotels
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.country.length) {
            for (let item of state.filter.country) {
              if (hotel.country == item) {
                return item
              }
            }
          } else {
            return state.hotels
          }
        }
      })
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.type.length) {
            for (let item of state.filter.type) {
              if (hotel.type == item) {
                return item
              }
            }
          } else {
            return state.hotels
          }
        }
      })
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.rating.length) {
            for (let item of state.filter.rating) {
              if (hotel.stars == item) {
                return item
              }
            }
          } else {
            return state.hotels
          }
        }
      })
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.recall) {
            return hotel.reviews_amount > state.filter.recall
          } else {
            return state.hotels
          }
        }
      })
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.min_price && state.filter.max_price) {
            return hotel.min_price > state.filter.min_price && hotel.min_price < state.filter.max_price
          } else {
            return state.hotels
          }
        }
      })
  }
})
