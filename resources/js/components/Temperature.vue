<template>
    <div class="grid grid-cols-5">
        <div class="relative flex col-span-1 items-center justify-between">
            <div class="flex flex-col">
                <div class="flex">
                    <div class="text-4xl font-semibold">
                        {{ degree }}
                    </div>
                    <div class="text-sm text-gray-500">
                        ºC
                    </div>
                </div>
                <div class="text-[8px] text-gray-700">
                    <font-awesome-icon class="text-gray-400" :icon="windIcon" /> 
                    {{ windSpeed }} km/s.
                </div>
            </div>
            <div>
                <font-awesome-icon
                    class="text-5xl"
                    :class="{ 'text-yellow-400': isDaytime, 'text-purple-400': !isDaytime }"
                    :icon="dayNightIcon"
                />
            </div>
            <div
                v-if="(!currLocation || degree === '0' || windSpeed === '0')"
                class="absolute flex justify-center items-center h-full w-full text-xs bg-white bg-opacity-80"
            >
                {{ loadingMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';

export default {
    components: {
        FontAwesomeIcon,
    },
    computed: {
        dayNightIcon() {
            return this.isDaytime ? faSun : faMoon;
        },
    },
    data() {
        return {
            currLocation: undefined,
            degree: this.$store.temperatureStore.state.degree,
            windSpeed: this.$store.temperatureStore.state.windSpeed,
            loadingMessage: 'Loading Information...',
            isDaytime: true,
            windIcon: faWind,
        };
    },
    methods : {
        async checkDayOrNight() {
            const hours = new Date().getHours();
            this.isDaytime = hours > 6 && hours < 20;
        },
        async checkLocationPermission() {
            return !!navigator.geolocation;
        },
        async getTemperatureByCoordinates(lat, long) {
            try {
                const response = await this.axios.get(`https://corsproxy.io/?https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`);
                const { temperature, windspeed } = response.data.current_weather;
                this.$store.temperatureStore.commit('setDegree', temperature);
                this.$store.temperatureStore.commit('setWindSpeed', windspeed);
            } catch (error) {
                console.error('Failed to fetch temperature data:', error);
            }
        },
    },
    async mounted() {
        if (await this.checkLocationPermission()) {
            navigator.geolocation.getCurrentPosition((currentPosition) => {
                this.currLocation = {
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
                };
            });
        }
        this.checkDayOrNight();
    },
    watch: {
        currLocation: {
            handler(newVal) {
                if (newVal) {
                    this.getTemperatureByCoordinates(newVal.latitude, newVal.longitude);
                }
            },
            deep: true,
        },
        '$store.temperatureStore.state.degree': function (newVal) {
            this.degree = newVal;
        },
        '$store.temperatureStore.state.windSpeed': function (newVal) {
            this.windSpeed = newVal;
        },
    },
};
</script>