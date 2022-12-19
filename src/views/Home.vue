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




</script>
 
<template>
 

    <div class="container" style="padding-top: 31px;">
        <div class="row">
            <div class="col-md-5 col-lg-4 col-xl-5 offset-xl-0 align-self-center ps-lg-0 pe-lg-0 me-lg-0">
                <div class="vstack">
                    <h1 class="text-center display-5 fw-semibold text-sm-center text-md-start text-lg-start text-xl-start d-table-cell ps-lg-3 pt-lg-3 mt-lg-0" style="position: relative;"><strong><span style="color: rgb(48, 52, 112);">APPOINTMENT </span></strong><span style="color: rgb(48, 52, 112);">BOOKING</span></h1>
                    <h5 class="text-center text-sm-center text-md-start text-lg-start text-xl-start ps-lg-3 ms-lg-0 pb-lg-0 mb-lg-2 pt-lg-0 mt-lg-3"><span style="color: rgb(23, 23, 23);">Online Appointment Scheduling System for Integrated Project Clinic</span><br></h5>
                </div>
                <router-link :to="{ name: 'Appointment' }">
                  <button v-if="!(isLecturer) && isLogin " class="btn btn-primary d-md-flex d-lg-flex d-xl-flex mt-lg-3 ms-lg-3" type="button" style="background: rgb(82,108,147);border-color: rgb(82,108,147);border-top-color: rgb(255,;border-right-color: 255,;border-bottom-color: 255);border-left-color: 255,;">
                    Booking Now
                  </button>
                </router-link>
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