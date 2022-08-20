<script setup>
// import { computed } from '@vue/reactivity';
import {ref,onMounted, onUpdated,computed} from 'vue'
import router from './router';


console.clear;
const isOpen = ref(false)
const reloadPage = () => {
  window.location.reload()
}

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

// const filtertime = ref("")
// const change = computed(()=>{
//   console.log("เข้า change");
//   if(filtertime.value=='all'){
//     console.log("all");
//     // window.location.reload()
//     router.push({ name: 'ShowEvent' , params: { time: 'All' }})

//   }else if(filtertime.value=='past'){

//     console.log("past");
//     // window.location.reload()
//     router.push({ name: 'ShowEvent' , params: { time: 'Past' }})

//   }else if(filtertime.value=='upcoming'){
//     console.log("up");
//     // window.location.reload()
//     router.push({ name: 'ShowEvent' , params: { time: 'Upcoming' }})
    
//   }
// })

// onUpdated(()=>{
//   console.log("onUpdate");
//   change.value
//   reloadPage.value
// })

</script>

<template>
    <header>
        <div id="top" class="container px-6 py-3 mx-auto">
            <div class="flex items-center justify-between">
 
                <div class="w-full text-2xl font-bold text-white md:text-center">
                <router-link :to="{ name: 'Home'}" >
                  <img src="./assets/logo-1.png" class="logo">
               
                    OASIP : 
                    <span class="mx-1 text-base text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-200">Online Appointment Scheduling System for Intregrated Project Clinic </span>
                 </router-link>
                </div>
                <div class="flex items-center justify-end">
                    <div class="flex sm:hidden">
                        <button @click="reloadPage" class="r-2">   
                            <router-link :to="{ name: 'Home' }"><img src="./assets/home2.png" class="w-8 mr-8 fill-current col-1 h-7 hover:h-8" aria-label="toggle menu"></router-link>
                        </button>
                        <button @click="isOpen = !isOpen" type="button" class="text-white hover:text-amber-600 focus:outline-none" aria-label="toggle menu">
                            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                                <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                            </svg>
                        </button>
                         
                        
                    </div>
                </div>
            </div>

            <aside :class="isOpen ? '' : 'hidden'" class="px-10 py-4 bg-black rounded-md sm:flex sm:justify-center sm:items-center">
                <div class="flex flex-col justify-end sm:flex-row">
                    <!-- <p class="mt-3 text-zinc-300 hover:underline hover:font-bold hover:text-amber-600 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'Home' }">Home</router-link></p> -->
                    <p class="mt-3 font-bold text-zinc-300 sm:mx-3 sm:mt-0">Clinic</p>
                    <div v-for="(category,index) in categories" :key="index">
                    <p class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowEvent' , params: { time: category.eventCategoryName }}" >{{category.eventCategoryName}}</router-link></p>
                    </div>
                    <p class="mt-2 font-bold text-zinc-300 sm:mx-3 sm:mt-0">Events</p>
                    <p class="mt-3 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowCategory' }" >Event Categories</router-link></p>
                    <p class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowEvent' , params: { time: 'All' }}" >All Events</router-link></p>
                    <p class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowEvent' , params: { time: 'Past' }}" >Past Events</router-link></p>
                    <p class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowEvent' , params: { time: 'Upcoming' }}" >Upcoming Events</router-link></p>
                    <p class="mt-3 font-bold text-zinc-300 hover:underline hover:font-bold hover:text-amber-600 sm:mx-3 sm:mt-0"><router-link :to="{ name: 'AboutUs'}"> Users </router-link> </p>
                    <p class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowUsers'}" >All Users</router-link></p>
                    <p class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowEvent' , params: { time: 'Upcoming' }}" >Add User</router-link></p>
                    <p class="mt-3 font-bold text-zinc-300 hover:underline hover:font-bold hover:text-amber-600 sm:mx-3 sm:mt-0"><router-link :to="{ name: 'AboutUs'}"> About </router-link> </p>
                </div>      
            </aside>
            
                    <!-- <span>
                    <select v-model="filtertime">
                      <option value="all" selected >All Event</option>
                      <option value="past" >Past Events</option>
                      <option value="upcoming">Upcoming Events</option>
                    </select></span>
                    <span clas="text-gray-600">{{filtertime}}</span> -->
                    <!-- <span class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowEvent' , params: { time: 'All' }}" >All Events</router-link></span>
                    <span class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowEvent' , params: { time: 'Past' }}" >Past Events</router-link></span>
                    <span class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage"><router-link :to="{ name: 'ShowEvent' , params: { time: 'Upcoming' }}" >Upcoming Events</router-link></span> -->
                    <span class="mt-2 pl-7 text-zinc-500 hover:underline hover:font-bold hover:text-amber-400 sm:mx-3 sm:mt-0" @click="reloadPage" v-for="(category,index) in categories" :key="index"><router-link :to="{ name: 'ShowEvent' , params: { time: category.eventCategoryName }}" >{{category.eventCategoryName}} |</router-link></span>
            <!-- <span class="sm:flex sm:justify-center sm:items-center ">
                    <form action="">
                      <input type="search" required placeholder="search" class="col-6">
                      <i class="fa fa-search col-6"></i>
                    </form>
            </span> -->
        </div>

    </header>
    <div>
      <router-view></router-view>
    </div>

</template>

<style scoped>

aside {
  background-color: #3B3B3B;
  position: fixed;
  height: 87%;
  bottom: 0;
  right: 0;
  width: 20%;
  z-index: 1;
}


.fixedtop{
  position: fixed;
  margin-left: auto;
}
.logo {
  margin-left: 1.75%;
  margin-bottom: 1%;
  width: 6%;
  display: inline;
}

/* #clinicMenu{
  margin-left: 1%;
}

form::-webkit-scrollbar .gradient, form:valid .gradient{
    background: #07051a;
    color: white;
} */
/* .eachCategory {
  padding: 0.5%;
  margin-left: 1%;
  color: white;
  font-weight: bold;
  border-radius: 2%;
}
.eachCategory:hover{
  background-color: #d9f4a4;
  color: #50403f;
} */

#router {
  margin-top: 10%;
  text-align: center;
  padding: 0.5%;
  height: max-content;
  float: right;
  margin-right:10%;
  font-weight: bold;
  color: #50403f;
}
/* 
.filterTime {
  margin: 8%;  
  background-color: #d9f4a4;
  color: #50403f;
  padding: 5%;
  padding-left: 7%; 
  padding-right: 7%;
  border-radius: 10%;
}
.filterTime:hover {
  width: 100px;
  background-color: white;
  color: #50403f;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
} */
/* .img {
  margin-left: 5%;
  width: 13%;
  display: inline;
  float: right;
}
.img:hover {
  width: 15%;
  margin-top: 0%;
  transition-property: width;
  transition-duration: 0.3s;         
  transition-timing-function: ease-in-out;
}

select {
  margin-left: 10%;
  margin-top: 5%;
  width: 45%;
  display: inline;
}

form{
    margin-top: 0.5%;
    margin-left: 70%;
    left: 2%;
    transform: translate(0%,-100%);
    transition: all 1s;
    width: 50px;
    height: 50px;
    background: white;
    box-sizing: border-box;
    border-radius: 25px;
    border: 4px solid white;
    padding-left: 5px;
    float: right;
}

input{
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 100%;
    line-height: 30px;
    outline: 0;
    border: 0;
    display: none;
    font-size: 1em;
    border-radius: 20px;
    padding: 0 20px;
}

.fa{
    box-sizing: border-box;
    padding: 10px;
    width: 42.5px;
    height: 42.5px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    color: #07051a;
    text-align: center;
    font-size: 1.2em;
    transition: all 1s;
}

form:hover, form:valid{
    width: 280px;
    cursor: pointer;
}

form:hover input, form:valid input{
    display: block;
}

form:hover .fa, form:valid .fa{
    background: #07051a;
    color: white;
} */
</style>