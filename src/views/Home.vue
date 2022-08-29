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



  <div id="home" class="mx-8">
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
        <div class="flex-col pt-6 pl-16 lg:pt-6 md:pt-3">
          <div>
            <router-link :to="{ name: 'ShowEvent', params: { time: 'All' } }">
              <button class="box-border w-9/12 h-full p-4 rounded-lg bg-home_blue">View Events</button>
            </router-link>
          </div>
          <div class="pt-4">
            <router-link :to="{ name: 'AddNewEvent' }">
              <button class="box-border w-9/12 h-full p-4 rounded-lg bg-home_blue">Booking now</button>
            </router-link>
          </div>
        </div>
      </div> <!-- detail + View Events + Booking Events -->


      <div class="basis-8/12 lg:-mt-4">
        <img src="../assets/background/oasip_img.png" />
      </div> <!-- picture zone -->

    </div> <!-- first part -->




    

    <section class="text-gray-600 body-font">


      <div class="container px-5 py-24 mx-auto">
        <h1 class="text-4xl font-bold text-center text-black">Our Features & Services.</h1>
        <p class="mb-10 text-xl text-center text-gray-500 text-light">
          Here are our pricing plans
        </p>

        <div class="flex flex-wrap -m-4">
          <div class="p-4 md:w-1/3">
            <div class="h-full overflow-hidden rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50">
              <img
                class="object-cover object-center w-full transition-all scale-110 lg:h-48 md:h-36 duration-400 hover:scale-100"
                src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                alt="blog">
              <div class="p-6">
                <h2 class="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">CATEGORY-1</h2>
                <h1 class="mb-3 text-lg font-medium text-gray-600 title-font">The Catalyzer</h1>
                <p class="mb-3 leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                  microdosing tousled waistcoat.</p>
                <div class="flex flex-wrap items-center ">
                  <button
                    class="px-4 py-1 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue">Learn
                    more</button>

                </div>
              </div>
            </div>
          </div>
          <div class="p-4 md:w-1/3">
            <div class="h-full overflow-hidden rounded-xl shadow-cla-violate bg-gradient-to-r from-pink-50 to-red-50">
              <img
                class="object-cover object-center w-full transition-all scale-110 lg:h-48 md:h-36 duration-400 hover:scale-100"
                src="https://images.unsplash.com/photo-1624628639856-100bf817fd35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBpbWFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt="blog">
              <div class="p-6">
                <h2 class="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">CATEGORY-1</h2>
                <h1 class="mb-3 text-lg font-medium text-gray-600 title-font">The Catalyzer</h1>
                <p class="mb-3 leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                  microdosing tousled waistcoat.</p>
                <div class="flex flex-wrap items-center ">
                  <button
                    class="px-4 py-1 rounded-lg bg-gradient-to-r from-orange-300 to-amber-400 hover:scale-105 drop-shadow-md shadow-cla-violate">Learn
                    more</button>

                </div>
              </div>
            </div>
          </div>
          <div class="p-4 md:w-1/3">
            <div class="h-full overflow-hidden rounded-xl shadow-cla-pink bg-gradient-to-r from-fuchsia-50 to-pink-50">
              <img
                class="object-cover object-center w-full transition-all scale-110 lg:h-48 md:h-36 duration-400 hover:scale-100"
                src="https://images.unsplash.com/photo-1631700611307-37dbcb89ef7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                alt="blog">
              <div class="p-6">
                <h2 class="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">CATEGORY-1</h2>
                <h1 class="mb-3 text-lg font-medium text-gray-600 title-font">The Catalyzer</h1>
                <p class="mb-3 leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                  microdosing tousled waistcoat.</p>
                <div class="flex flex-wrap items-center ">
                  <button
                    class="px-4 py-1 rounded-lg bg-gradient-to-r from-fuchsia-300 to-pink-400 hover:scale-105 shadow-cla-blue">Learn
                    more</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> <!-- second part -->


   
 <h1 class="text-4xl font-bold text-center text-black">Clinic</h1>
    <p class="text-xl text-center text-gray-500 text-light">
      Here are our pricing plans
    </p>
    <div class="flex items-center justify-center h-auto mt-16 my-28">

      <div v-if="categories.length !== 0"
        class="grid grid-cols-2 gap-8 px-16 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3">

        <!-- Item 1 -->
        <div v-for="(category, index) in categories" :key="index" class="flex flex-col gap-1">

          <!-- Image -->
          <a href="" class="">
            <img src="https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg"
              class="duration-100 hover:translate-x-1 hover:-translate-y-1 delay-50 rounded-3xl" />
          </a>

          <!--Title -->
          <a href="#" class="font-semibold text-gray-700 hover:text-purple-500"> {{ category.eventCategoryName }} </a>

          <!-- Viewers -->
          <a href="#" class="-mt-1 text-sm text-gray-400 hover:text-purple-500"> 78.4K viewers </a>

          <!-- Category Tags -->
          <div class="flex flex-row flex-wrap gap-2">
            <router-link :to="{ name: 'ShowEvent', params: { time: category.eventCategoryName }, }">
              <div class="px-2 py-1 text-xs font-semibold text-gray-300 bg-gray-700 rounded-full hover:bg-gray-600"> See
                Events </div>
            </router-link>
          </div>

        </div> 

      </div>

    </div><!-- end part 3 -->

          </div>
   

          
  <!-- 
        <div class="p-10">
            <h2 class="mt-10 ml-6 text-2xl font-semibold text-black"> CLINICS : </h2>

            <div class="grid grid-cols-3 gap-4 px-6 mx-auto mt-8 md:flex md:-mx-4"> -->
  <!-- loop each clinic -->
  <!-- <div v-for="(category, index) in categories" :key="index">
                    <router-link :to="{ name: 'ShowEvent', params: { time: category.eventCategoryName } }">
                        <div class="w-full h-64 overflow-hidden bg-center bg-cover rounded-md md:mx-4 md:w-1/2"
                            style="background-image: url('https://kinsta.com/wp-content/uploads/2021/11/back-end-developer-1024x512.png')">
                            <div class="flex items-center h-full bg-gray-900 bg-opacity-30 hover:bg-opacity-5">
                                <div class="max-w-xl px-10">
                                    <p class="text-xl font-semibold text-white">{{ category.eventCategoryName }}</p>
                                    <p class="mt-2 text-zinc-200">{{ category.eventCategoryDescription }}</p>

                                    <span class="duration-300 eachCategory col-1" @click="reloadPage">
                                        <router-link
                                            :to="{ name: 'ShowEvent', params: { time: category.eventCategoryName } }">
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
        </div> -->
  <!-- <h1 class="text-white"> {{ createdAtDisplay }}</h1> -->
  <!-- </div> -->
  <!-- </main> -->

  <!-- <footer class="bg-gray-200">
            <div class="container flex items-center justify-between px-6 mx-auto text-right py-1/3">
                <p class="py-2 text-right text-gray-500 sm:py-0 "> By OASIP-PL-2 : เหนื่อยก็พัก เจอบั๊กก็ค่อยแก้ </p>
            </div>
        </footer>
    </div> -->


  <footer class="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
    <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <img src="#" class="h-6 mr-5 sm:h-9" alt="logo" />
          <p class="max-w-xs mt-4 text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, accusantium.
          </p>
          <div class="flex mt-8 space-x-6 text-gray-600">
            <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
              <span class="sr-only"> Facebook </span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd" />
              </svg>
            </a>
            <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
              <span class="sr-only"> Instagram </span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd" />
              </svg>
            </a>
            <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
              <span class="sr-only"> Twitter </span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
              <span class="sr-only"> GitHub </span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd" />
              </svg>
            </a>
            <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
              <span class="sr-only"> Dribbble </span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                  clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p class="font-medium">
              Company
            </p>
            <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
              <a class="hover:opacity-75" href> About </a>
              <a class="hover:opacity-75" href> Meet the Team </a>
              <a class="hover:opacity-75" href> History </a>
              <a class="hover:opacity-75" href> Careers </a>
            </nav>
          </div>
          <div>
            <p class="font-medium">
              Services
            </p>
            <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
              <a class="hover:opacity-75" href> 1on1 Coaching </a>
              <a class="hover:opacity-75" href> Company Review </a>
              <a class="hover:opacity-75" href> Accounts Review </a>
              <a class="hover:opacity-75" href> HR Consulting </a>
              <a class="hover:opacity-75" href> SEO Optimisation </a>
            </nav>
          </div>
          <div>
            <p class="font-medium">
              Helpful Links
            </p>
            <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
              <a class="hover:opacity-75" href> Contact </a>
              <a class="hover:opacity-75" href> FAQs </a>
              <a class="hover:opacity-75" href> Live Chat </a>
            </nav>
          </div>
          <div>
            <p class="font-medium">
              Legal
            </p>
            <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
              <a class="hover:opacity-75" href> Privacy Policy </a>
              <a class="hover:opacity-75" href> Terms &amp; Conditions </a>
              <a class="hover:opacity-75" href> Returns Policy </a>
              <a class="hover:opacity-75" href> Accessibility </a>
            </nav>
          </div>
        </div>
      </div>
      <p class="mt-8 text-xs text-gray-800">
        © 2022 Comany Name
      </p>
    </div>
  </footer>
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