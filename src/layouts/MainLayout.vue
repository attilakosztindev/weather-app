<template lang="pug">
.main-layout
  .weather--container
    .weather--title CURRENT WEATHER
    hr
    .weather--wrapper
      .weather--data
        .weather--temperature {{_temperature}}
        .vertical-separator
        .weather--status {{data.weather}}
      img.weather--img(:src="getWeatherIcon(data.icon)")
    .weather--location {{data.location}}
    .weather--humidity HUMIDITY {{data.humidity}}
    .weather--wind WIND {{data.wind}}
    .weather--sunrise SUNRISE {{data.sunrise}}
    .weather--sunset SUNSET {{data.sunset}}
    app-switch-btn.app-switch-btn(:is-celsius.sync="isCelsius")
</template>

<script>
import { getCountryByCode } from '@/getCountyByCode'
import axios from 'axios'
import AppSwitchBtn from '@/components/AppSwitchBtn'

export default {
  name: 'MainLayout',
  components: {AppSwitchBtn},
  async mounted() {
    await this.fetchGeolocationCoords()
  },
  data() {
    return {
      isCelsius: true,
      data: {
        icon: null,
        celsius: '-',
        fahrenheit: '-',
        location: '-',
        weather: '-',
        humidity: '-',
        wind: '-',
        sunrise: '-',
        sunset: '-'
      },
      location: null
    }
  },
  methods: {
    async fetchGeolocationCoords() {
      const {coords} = await this.$geolocation.getCurrentPosition()
      coords ? await this.fetchWeatherData(coords.latitude, coords.longitude) : void 0
    },
    async fetchWeatherData(lat, lon) {
      if (!localStorage.getItem('weatherData')) {
        const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ process.env.VUE_APP_API_KEY }`, {})
        if (data) {
          this.data.celsius = `${Math.round(data.main?.temp - 273.15)}° C`
          this.data.fahrenheit = `${Math.round((data.main?.temp - 273.15) * 9 / 5 + 32)}° F`
          this.data.location = `${ data.name }, ${ getCountryByCode(data.sys?.country) }`
          this.data.weather = data.weather[0]?.main
          this.data.humidity = `${ data.main?.humidity }%`
          this.data.wind = `${ data.wind?.speed } M/S`
          this.data.sunrise = this.formatDate(data.sys?.sunrise)
          this.data.sunset = this.formatDate(data.sys?.sunset)
          this.data.icon = data.weather[0]?.icon
          localStorage.setItem('weatherData', JSON.stringify(this.data))
        }
      } else {
        this.data = JSON.parse(localStorage.getItem('weatherData'))
      }
    },
    formatDate(unixDateCode) {
      const date = new Date(unixDateCode * 1000)
      return date.getHours() <= 9 ? '0' + date.getHours() + ':' + date.getMinutes() : date.getHours() + ':' + date.getMinutes()
    },
    getWeatherIcon(icon) {
      return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : `https://openweathermap.org/img/wn/01n@2x.png`
    }
  },
  computed: {
    _temperature() {
      return this.isCelsius ? this.data.celsius : this.data.fahrenheit
    }
  }
}
</script>

<style lang="sass" scoped>
.main-layout
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  background-color: $green
  background-image: linear-gradient(120deg, $purple 0%, $green 100%)
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, $purple), color-stop(100%, $green))
  background-image: -webkit-linear-gradient(120deg, $purple 0%, $green 100%)
  background-image: -moz-linear-gradient(120deg, $purple 0%, $green 100%)
  background-image: -o-linear-gradient(120deg, $purple 0%, $green 100%)
  background-image: -ms-linear-gradient(120deg, $purple 0%, $green 100%)
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$purple', endColorstr='$green',GradientType=1)
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=$purple, endColorstr=$green)"
  .vertical-separator
    height: auto
    width: 1px
    background-color: rgba(255, 255, 255, 0.8)
    margin: 0 10px
  .weather--container
    color: white
    height: 100%
    width: 100%
    max-width: 400px
    max-height: 400px
    position: relative
    border-radius: 10px
    overflow: hidden
    margin: 20px 30px
    padding: 20px
    background-color: rgba(0, 0, 0, 0.2)
    .weather--wrapper
      display: flex
      align-items: center
      position: relative
      justify-content: space-between
      .weather--data
        display: flex
        .weather--temperature
          min-width: 65px
        .weather--temperature, .weather--status
          font-size: 24px
          font-weight: 600
      .weather--img
        right: 0
        height: 120px
        width: 120px
    .weather--location
      text-align: center
      font-size: 22px
      font-weight: 500
      padding-bottom: 20px
    .weather--status, .weather--location
      text-transform: uppercase
    .weather--humidity, .weather--wind, .weather--sunrise, .weather--sunset
      font-size: 20px
      font-weight: 600
      letter-spacing: 2px
      padding-bottom: 6px
    .weather--title
      font-size: 24px
      font-weight: 600
      padding: 10px 0
    .app-switch-btn
      display: flex
      justify-content: center
      align-items: center
      margin-top: 10px
</style>

┌───────────────────┐
│ CURRENT WEATHER   │
│ 22° C | CLOUDS    │
│ KEW, AUSTRALIA    │
│                   │
│ HUMIDITY  73%     │
│ WIND      6.2 M/S │
│ SUNRISE   05:41   │
│ SUNSET    20:06   │
│                   │
│ [c]|[f] (toggle)  │
└───────────────────┘