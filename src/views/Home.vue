<script setup>

import { ref, onMounted, computed } from 'vue'

const categories = ref([])
//GET Category
const getcategories = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/categories`)
    if (res.status === 200) {
        categories.value = await res.json()
        console.log(categories.value)
    } else console.log("error, cannot get data")
}
onMounted(async () => {
    await getcategories()
})

const reloadPage = () => {
    window.location.reload()
}


const createdAtDisplay = computed(() => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    const dateTime = date + ' ' + time
    return dateTime;
})
console.log(createdAtDisplay.value)

</script>
 
<template>
    <!-- <div > -->
    <!-- <main class="my-8"> -->
    <!-- <div class="container px-6 mx-auto"> -->
    <!-- <div class="overflow-hidden bg-center bg-cover rounded-md h-96 " style="background-image: url('https://web-static.wrike.com/cdn-cgi/image/width=880,format=auto,q=80/blog/content/uploads/2019/04/The-Best-Calendar-Tools-for-Every-Project-Management-Need-1.jpg?av=85500b4d320893880222681c1b766022')"> -->
    <!-- <div class="flex items-center h-full bg-gray-900 bg-opacity-10 hover:bg-opacity-0"> -->
    <!-- <div class="max-w-xl px-10">
                        <h2 class="text-2xl font-semibold text-white">OASIP</h2>
                        <p class="mt-2 text-zinc-200">INT221 Integrated project</p> -->

    <!-- to all events page-->
    <!-- <router-link :to="{ name: 'ShowEvent' , params: { time: 'All' }}" >
                        <button class="flex items-center px-3 py-2 mt-4 text-sm font-medium text-white uppercase rounded bg-zinc-800 hover:bg-zinc-500 focus:outline-none focus:bg-amber-400">
                            <span>see events</span>
                        </button>
                        </router-link> -->

    <!-- to add event page -->
    <!-- <router-link :to="{ name: 'AddNewEvent'}" >
                        <button class="flex items-center px-3 py-2 mt-4 text-sm font-medium text-white uppercase rounded bg-zinc-800 hover:bg-zinc-500 focus:outline-none focus:bg-amber-400">
                            <span>BOOKING Now</span>
                            <svg class="w-5 h-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                        </router-link> -->

    <!-- </div> -->
    <!-- </div>
            </div> -->
    <div id="oasip" class="flex flex-row">
        <div class="basis-5/12">
            <p class="pt-24 pl-16 text-5xl font-extrabold tracking-wider text-neutral-900">OSAIP</p>
            <p class="pt-4 pl-16 text-3xl font-extrabold tracking-normal text-neutral-900">Online Appointment Scheduling
                System for Intregrated Project Clinic</p>
            <div class="flex-col pt-6 pl-16 file:flex">
                <div>
                    <router-link :to="{ name: 'ShowEvent', params: { time: 'All' } }">
                        <button style="background: #9FC8FE;" class="box-border h-20 p-4 rounded-lg w-80">View Events</button>
                    </router-link>
                </div>
                <div class="pt-4">
                    <router-link :to="{ name: 'AddNewEvent' }">
                        <button style="background: #9FC8FE;" class="box-border h-20 p-4 rounded-lg w-80">Booking now</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="basis-7/12">
            <img src="../assets/background/oasip_img.png" />
        </div>
    </div>


    <div class="border border-1 p-10">
    <h2 class="mt-10 ml-6 text-2xl font-semibold text-black"> CLINICS : </h2>

    <div class="grid grid-cols-3 gap-4 px-6 mx-auto mt-8 md:flex md:-mx-4">
        <!-- loop each clinic -->
        <div v-for="(category, index) in categories" :key="index">
            <router-link :to="{ name: 'ShowEvent', params: { time: category.eventCategoryName } }">
                <div class="w-full h-64 overflow-hidden bg-center bg-cover rounded-md md:mx-4 md:w-1/2"
                    style="background-image: url('https://kinsta.com/wp-content/uploads/2021/11/back-end-developer-1024x512.png')">
                    <div class="flex items-center h-full bg-gray-900 bg-opacity-30 hover:bg-opacity-5">
                        <div class="max-w-xl px-10">
                            <p class="text-xl font-semibold text-white">{{ category.eventCategoryName }}</p>
                            <p class="mt-2 text-zinc-200">{{ category.eventCategoryDescription }}</p>

                            <span class="duration-300 eachCategory col-1" @click="reloadPage">
                                <router-link :to="{ name: 'ShowEvent', params: { time: category.eventCategoryName } }">
                                    <button
                                        class="flex items-center px-3 py-2 mt-4 text-sm font-medium text-white uppercase rounded bg-zinc-800 hover:bg-zinc-500 focus:outline-none focus:bg-amber-500">
                                        <span>SEE EVENTS</span>
                                        <svg class="w-5 h-5 mx-2" fill="none" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                        </svg>
                                    </button>
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
    <span>
        <a href="#top"><img src="../assets/up-arrow.png" class="img"></a>
    </span>
    </div>
    <!-- <h1 class="text-white"> {{ createdAtDisplay }}</h1> -->
    <!-- </div> -->
    <!-- </main> -->

    <footer class="bg-gray-200">
        <div class="container flex items-center justify-between px-6 mx-auto text-right py-1/3">
            <p class="py-2 text-right text-gray-500 sm:py-0 "> By OASIP-PL-2 : เหนื่อยก็พัก เจอบั๊กก็ค่อยแก้ </p>
        </div>
    </footer>
    <!-- </div> -->
</template>

<style scoped>
.img {
    filter: opacity(60%);
    width: 4.5%;
    float: right;
    margin-right: 2%;
}

.img:hover {
    filter: grayscale(20%);
}
</style>