<script setup>
import { ref, onBeforeMount, onMounted, computed } from "vue";

const users = ref([]);
const getUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users`);
  if (res.status === 200) {
    users.value = await res.json();
    console.log(users.value);
  } else console.log("error, cannot get data");
};

onMounted(async () => {
  await getUsers();
});
</script>

<template>
  <!-- <main class="my-8">
    <div class="container px-6 mx-auto">
      <h2 class="mt-3 mb-5 text-4xl font-bold text-white">
        All Users :
      </h2>
      <p class="mb-5 text-xl font-semibold text-zinc-100 col-10">
        The total of users are {{ users.length }} person
      </p>
    </div>
    <div class="scrollBar col-12">
      <div class="grid grid-cols-3 mt-4 ml-44">
        <div v-for="(user, index) in users" :key="index" class="mt-4">
          <div
            id="eachEventList"
            class="relative max-w-sm overflow-hidden transition-shadow duration-300 ease-in-out rounded-lg shadow-md col-11 hover:shadow-xl hover:scale-110"
          >
            <p class="detail col-12">
              <img src="../../assets/user.png" class="img col-3" />
              <span class="heading col-6">Username :</span> {{ user.name }}
            </p>

            <p class="detail col-12">
              <img src="../../assets/category.png" class="img col-3" />
              <span class="heading col-6">Role :</span> {{ user.role }}
            </p>

            <div id="allButton" class="float-right col-6">
              <img
                src="../../assets/detail.png"
                class="cursor-pointer img-button col-1"
              />
              <img
                src="../../assets/edit.png"
                class="cursor-pointer img-button col-1"
              />
              <img
                src="../../assets/trash-bin.png"
                class="cursor-pointer img-button col-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main> -->
      <main class="my-8">
    <div class="container px-6 mx-auto">
    <h2 class="mt-3 mb-5 text-4xl font-bold text-white">Events : </h2>
    <p class="mb-5 text-xl font-semibold text-zinc-100 col-10">The total of bookings are {{ users.length }} events</p>    
    
    
    <div  v-if="users.length!==0"> 
    <div class="scrollBar col-12">
    <div class="grid grid-cols-3 gap-6 mt-4 ml-12">
     
      <!-- to add event page -->
      <div class="col-12">
      <router-link :to="{ name: 'AddNewEvent'}" >
          <div class="flex flex-col items-center max-w-xs px-4 py-20 space-y-2 text-center rounded-md cursor-pointer bg-gray-500/50 hover:bg-amber-600 hover:scale-105 hover:smooth-hover">
            <a class="flex items-center justify-center w-20 h-20 rounded-full bg-amber-500 text-white/50 group-hover:text-white group-hover:smooth-hover" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            </a>
          <p class="text-center text-white/50 group-hover:text-gray-900 group-hover:smooth-hover"> Booking Appointment </p>
          </div>
      </router-link>
      </div> 
      
      <!-- วนลูปแสดง event แต่ละ event -->
      <div v-for="(user,index) in users" :key="index">  
            <div id="eachEventList" class="relative max-w-sm overflow-hidden transition-shadow duration-300 ease-in-out rounded-lg shadow-md col-11 hover:shadow-xl hover:scale-110">
              
              <p class="detail col-12">
                <img src="../../assets/user.png" class="img col-3">
                <span class="heading col-6">Name :</span> {{ user.name }}
              </p>
              
                <p class="detail col-12">
                  <img src="../../assets/email.png" class="img col-3">
                  <span class="heading col-6">Email :</span> {{ user.email }}
                </p>
                
              <p class="detail col-12">
                <img src="../../assets/category.png" class="img col-3">
                <span class="heading col-6">Role :</span> {{ user.role }}
              </p>

              
              <div id="allButton" class="float-right col-6">
                <img  src="../../assets/detail.png" class="cursor-pointer img-button col-1">
                <img  src="../../assets/edit.png" class="cursor-pointer img-button col-1"> 
                <img  src="../../assets/trash-bin.png" class="cursor-pointer img-button col-1">
              </div>
            </div>
        </div>
      </div>

    </div>
    </div>

    <!-- ไม่มีรายการนัดหมาย -->
    <div v-else >
      <span class="flex flex-col items-center px-4 py-20 mt-4 space-y-2 text-xl font-semibold text-center bg-orange-500 rounded-md cursor-pointer group">ไม่มีรายการนัดหมาย</span>
      <!-- to add event page -->
      <span>
      <router-link :to="{ name: 'AddNewEvent'}" >
          <div class="flex flex-col items-center px-4 py-10 space-y-2 text-center rounded-md cursor-pointer bg-gray-900/50 hover:bg-amber-500 hover:smooth-hover">
            <a class="flex items-center justify-center w-20 h-20 rounded-full bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            </a>
          <p class="text-center text-white/50 group-hover:text-gray-900 group-hover:smooth-hover"> Booking Appointment </p>
          </div>
      </router-link>
      </span>
    </div>
    <EachEventDetail v-if="isShow == 1" @closeMe="closeShowDetail" :event="detailCurrentEvent" />
    <EditEvent v-if="isShowEdit == 1" @closeEditEvent="closeEditForm" :events="filterEvent" :event="detailCurrentEvent"
      :showEditForm="isShowEdit" />
    <div>
      <router-view></router-view>
    </div>
    </div>
  </main>
</template>

<style scoped>
.detail {
  margin-left: 5%;
  font-size: 100%;
  line-height: 37px;
}
.heading {
  font-weight: bold;
  margin-left: 1%;
}
#eventContainer {
  margin-left: 27%;
  width: 70%;
  height: 100%;
  border-radius: 25px;
}
#allDetail {
  margin-bottom: 7%;
}
#eachEventList {
  background-color: rgb(255 255 255 / 0.9);
  padding: 30px;
  border-radius: 12px;
  height: 100%;
}
#eachEventList:hover {
  width: 90%;
  background-color: rgb(255, 202, 67);
  transition-property: width;
  /* กำหนดให้ "width" เป็น property ที่จะใช้ transition */
  transition-duration: 0.3s;
  /* กำหนดให้ transition กินระยะเวลา 1 วินาที */
  transition-timing-function: ease-in-out;
  /* กำหนดให้รูปแบบของ speed เป็นแบบ "ease" */
}
#eventDuration {
  box-shadow: 5px 5px lightblue;
  float: right;
  margin-right: 5%;
  padding: 2px;
  background-color: #d9f4a4;
  text-align: center;
  border-radius: 12px;
  font-size: 90%;
}
#allButton {
  text-align: right;
}
.img-button {
  width: 20%;
  display: inline;
}

.img {
  width: 7%;
  display: inline;
}
.scrollBar {
  overflow-y: scroll;
  height: 70vh;
  margin-right: 5%;
}
.scrollBar {
  overflow-y: scroll;
  height: 70vh;
}
</style>
