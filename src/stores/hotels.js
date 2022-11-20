import { inject } from 'vue';
import { defineStore } from 'pinia'


export const useHotels = defineStore('counter', {
  state: () => ({
    hotels: [],
    filter: ''
  }),
  actions: {
    async fetchHotels() {
      try {
        const $axios = inject('axios').create({
          baseURL: 'http://localhost:3001/hotels'
        })
        const response = await $axios.get()
        this.hotels = response.data
        console.log(this.hotels);
      } catch (error) {
        console.log(error);
      }
    },
    filteredHotels(data) {
      try {
        this.filter = data
        console.log(this.filter);
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    getHotels: state => state.hotels
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.country.length ) {
            for (let item of state.filter.country) {
              if (hotel.country == item) {
                return item
              }
            }
          }else{
            return state.hotels
          }
        }
      })
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.type.length ) {
            for (let item of state.filter.type) {
              if (hotel.type == item) {
                return item
              }
            }
          }else{
            return state.hotels
          }
        }
      })
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.rating.length ) {
            for (let item of state.filter.rating) {
              if (hotel.stars == item) {
                return item
              }
            }
          }else{
            return state.hotels
          }
        }
      })
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.recall ) {
              return hotel.reviews_amount == state.filter.recall 
          }else{
            return state.hotels
          }
        }
      })
      .filter(hotel => {
        if (state.filter == '') {
          return state.hotels
        } else {
          if (state.filter.min_price &&  state.filter.max_price) {
              return hotel.min_price > state.filter.min_price && hotel.min_price < state.filter.max_price
          }else{
            return state.hotels
          }
        }
      })
  }
})
