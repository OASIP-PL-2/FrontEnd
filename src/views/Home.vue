<script setup>

import { ref, onMounted , computed} from 'vue'
import { getCategories } from '../Fetch/fetch_category';
import { signIn } from '../login_MS/authRedirect.js'

const categories = ref([])

onMounted(async () => {
  categories.value = await getCategories()
})

const isLogin = computed(() => {
  return localStorage.getItem('accessToken') !== null
})

const isLecturer = computed(() =>{
  if(localStorage.getItem('accessToken') !== null){
    return JSON.parse(localStorage.getItem('userDetail')).role == 'lecturer'
  }
})

console.log(isLogin.value);



</script>
 
<template>
  <!-- <div>
    <div id="home" class="mx-8">
      <div id="oasip" class="flex-row md:flex">
        <div class="basis-5/12">
          <div class="ml-8 lg:ml-16 md:ml-16 sm:ml-14">
            <p
              class="text-xl font-extrabold tracking-wider sm:pt-10 lg:pt-18 xl:pt-28 md:pt-3 lg:text-5xl md:text-4xl sm:text-3xl text-neutral-900">
              OSAIP</p>
            <p
              class="pt-4 text-xl font-extrabold tracking-normal lg:pt-4 md:pt-2 lg:text-3xl md:leading-7 md:text-2xl sm:text-xl text-neutral-900">
              Online Appointment
              Scheduling System for Intregrated Project Clinic</p>
          </div>
          <div class="flex-col pt-6 pl-16 lg:pt-6 md:pt-3" v-if="!isLecturer">
            <div>
              <router-link :to="{ name: 'ShowEvent', params: { time: 'All' } }">
                <button class="box-border w-9/12 h-full p-4 rounded-lg bg-neutral-400" :disabled="!isLogin" v-if="!isLogin">View Events</button>
                <button class="box-border w-9/12 h-full p-4 rounded-lg bg-home_blue" v-else>View Events</button>
              </router-link>
            </div>
            <div class="pt-4">
              <router-link :to="{ name: 'Appointment' }">

                <button class="box-border w-9/12 h-full p-4 rounded-lg bg-home_blue " >Booking now</button>
              </router-link>
            </div>
          </div>
          <div class="flex-col pt-6 pl-16 lg:pt-6 md:pt-3" v-if="isLecturer">
            <div>
              <router-link :to="{ name: 'ShowEvent', params: { time: 'All' } }" >
                <button class="box-border w-9/12 h-full p-4 rounded-lg bg-home_blue" >View Events</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="basis-8/12 lg:-mt-4">
          <img src="../assets/background/oasip_img.png" />
        </div>
      </div>
 </div>
 </div> -->



      <!-- <br />
      <div v-if="!isLecturer">
      <h1 class="text-4xl font-bold text-center text-black">Clinic</h1>
      <p class="text-xl text-center text-gray-500 text-light">
        Here are our pricing plans
      </p>
      <div class="flex items-center justify-center h-auto mt-16 my-28" >
        <div v-if="categories.length !== 0"
          class="grid grid-cols-2 gap-8 px-16 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3">
          <div v-for="(category, index) in categories" :key="index" class="flex flex-col gap-1">
            <a href="" class="">
              <img src="../assets/profile.jpg"
                class="duration-100 hover:translate-x-1 hover:-translate-y-1 delay-50 rounded-3xl" />
            </a>
            <a href="#" class="font-semibold text-gray-700 hover:text-purple-500"> {{ category.eventCategoryName }} </a>
            <a href="#" class="-mt-1 text-sm text-gray-400 hover:text-purple-500"> 78.4K viewers </a>
            <div class="flex flex-row flex-wrap gap-2">
              <router-link :to="{ name: 'ShowEvent', params: { time: category.eventCategoryName }, }">
                <div class="px-2 py-1 text-xs font-semibold text-gray-300 bg-gray-700 rounded-full hover:bg-gray-600">
                  See
                  Events </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      </div> -->
   

    <div class="container" style="padding-top: 31px;">
        <div class="row">
            <div class="col-md-5 col-lg-4 col-xl-5 offset-xl-0 align-self-center ps-lg-0 pe-lg-0 me-lg-0">
                <div class="vstack">
                    <h1 class="text-center display-5 fw-semibold text-sm-center text-md-start text-lg-start text-xl-start d-table-cell ps-lg-3 pt-lg-3 mt-lg-0" style="position: relative;"><strong><span style="color: rgb(48, 52, 112);">APPOINTMENT </span></strong><span style="color: rgb(48, 52, 112);">BOOKING</span></h1>
                    <h5 class="text-center text-sm-center text-md-start text-lg-start text-xl-start ps-lg-3 ms-lg-0 pb-lg-0 mb-lg-2 pt-lg-0 mt-lg-3"><span style="color: rgb(23, 23, 23);">Online Appointment Scheduling System for Intregrated Project Clinic</span><br></h5>
                </div>
                <router-link :to="{ name: 'Appointment' }">
                  <button class="btn btn-primary d-md-flex d-lg-flex d-xl-flex mt-lg-3 ms-lg-3" type="button" style="background: rgb(82,108,147);border-color: rgb(82,108,147);border-top-color: rgb(255,;border-right-color: 255,;border-bottom-color: 255);border-left-color: 255,;">
                    Booking Now
                  </button>
                </router-link>
                <button @click="signIn" v-if="!isLogin" class="btn btn-primary d-md-flex d-lg-flex d-xl-flex mt-lg-3 ms-lg-3" type="button" style="background: rgb(82,108,147);border-color: rgb(82,108,147);border-top-color: rgb(255,;border-right-color: 255,;border-bottom-color: 255);border-left-color: 255,;">
                    Sign-in MS
                </button>
                <button @click="signIn" v-if="isLogin" class="btn btn-primary d-md-flex d-lg-flex d-xl-flex mt-lg-3 ms-lg-3" type="button" style="background: rgb(82,108,147);border-color: rgb(82,108,147);border-top-color: rgb(255,;border-right-color: 255,;border-bottom-color: 255);border-left-color: 255,;">
                    Call api
                </button>
            </div>
            <div class="col"><img class="img-fluid ps-lg-5 ms-lg-0" src="../assets/home_img/appointment-pic.jpg"></div>
        </div>
    </div>
 
</template>

<style scoped>
a {
  text-decoration: none !important
}
/* .img {
  filter: opacity(60%);
  width: 4.5%;
  float: right;
  margin-right: 2%;
}

.img:hover {
  filter: grayscale(20%);
} */
</style>