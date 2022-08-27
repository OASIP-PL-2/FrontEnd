
<script setup>
import { ref, onBeforeMount,onMounted,computed} from "vue"
import EachEventDetail from "../../components/EventComponents/EachEventDetail.vue"
import EditEvent from "../../components/EventComponents/EditEvent.vue"
import { useRoute } from "vue-router"
let { params } = useRoute()
const filterEvent = ref([])
console.log(params.time)
const categories = ref([])
const param = ref()

// onMounted(()=>{
//   window.location.reload
// })

//GET Category
const getcategories = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/categories`)
  if (res.status === 200) {
    categories.value = await res.json()
    console.log(categories.value)
  } else console.log("error, cannot get data")
}

const chooseTime = () => {
  console.log("เข้า chooseTime")
  if (param.value == "Past") {
    filterEvent.value = allEvents.value
    filterEvent.value = filterEvent.value.filter((event) => {
    const datetime = changeFormatDateTime(event.eventStartTime)
    console.log(datetime);
    const currentDate = changeFormatDateTime(Date.now())
    console.log(currentDate);
    
    if (datetime<currentDate){
      return event
    }
  })
  } else if (param.value == "Upcoming") {
    filterEvent.value = allEvents.value
    filterEvent.value = filterEvent.value.filter((event) => {
    const datetime = changeFormatDateTime(event.eventStartTime)
    console.log(datetime);
    const currentDate = changeFormatDateTime(Date.now())
    console.log(currentDate);
    
    if (datetime>currentDate){
      return event
    }

    
  })

  filterEvent.value = filterEvent.value.sort((event1,event2)=>{
    console.log(event1.eventStartTime);
    console.log(event2.eventStartTime);
    const datetime1 = ref("")
    const datetime2 = ref("")
    datetime1.value = changeFormatDateTime(event1.eventStartTime)
    datetime2.value = changeFormatDateTime(event2.eventStartTime)
    console.log(datetime1.value)
    console.log(datetime2.value)
    return datetime1.value-datetime2.value
})
  } else if (param.value == "All") {
    filterEvent.value = allEvents.value
  } else if (param.value == currentCategory.value[0].eventCategoryName) {
    filterEvent.value = allEvents.value.filter((event) => {
      return (
        event.eventCategoryId.eventCategoryName ==
        currentCategory.value[0].eventCategoryName
      )
    })
  }
}
defineEmits(["showDetail", "editEvent", "deleteEvent"])
const isShow = ref(0)
const isShowEdit = ref(0)
const detailCurrentEvent = ref({})
const showDetail = (event) => {
  detailCurrentEvent.value = event
  isShow.value = 1
}
const closeShowDetail = () => {
  isShow.value = 0
  isShowEdit.value = 0
}
const showEditForm = (event) => {
  isShowEdit.value = 1
  detailCurrentEvent.value = event
  console.log(isShowEdit.value)
}
const closeEditForm = () => {
  isShowEdit.value = 0
  window.location.reload()
  console.log(isShowEdit.value)
}
//ข้อมูลที่ get มาจาก backend
const allEvents = ref([])
// const pastEvents = ref([])
// const allUpcomingEvents = ref([])
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
// extract Date from eventStartTime
const extractDate = (date) => {
  const d = new Date(date)
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`
}
// extract Time from eventStartTime
const extractTime = (time) => {
  const t = new Date(time)
  const minute = computed(() => {
    if (t.getMinutes() < 10) return "0" + t.getMinutes();
    else return t.getMinutes();
  });
  return `${t.getHours()}:${minute.value} น.`
}
const currentCategory = ref([])
const extractCategory = () => {
  currentCategory.value = categories.value.filter((category) => {
    return category.eventCategoryName == param.value
  })
}
// เรียกใช้ getEvents() ก่อนที่หน้าเว็บจะแสดง
onBeforeMount(async () => {
  param.value = params.time
  console.log(param.value);
  // window.location.reload
  await getcategories()
  extractCategory()
  console.log(currentCategory.value)
  // console.log("onBeforeMounted is working");
  // if(currentCategory.value[0].eventCategoryName==undefined){
  //     currentCategoryName.value=""
  // }

  await getEvents()
    return chooseTime()
  // if (params.time == "Past") {
  //   await getEvents()
  //   return chooseTime()
  // } else if (params.time == "Upcoming") {
  //   await getEvents()
  //   return chooseTime()
  // } else if (
  //   params.time == "All" ||
  //   params.time == currentCategory.value[0].eventCategoryName
  // ) {
  //   await getEvents()
  //   return chooseTime()
  // }
  // console.log(allEvents.value)
  // console.log(pastEvents.value)
  // console.log(allUpcomingEvents.value)
  // console.log(filterEvent.value)
})
//addแล้วข้อมูล update ตอนมาหน้า AllEventList
onMounted(async () => {
  // alert("onMount work")
  //   extractCategory()
  await getEvents()
  // await getPastEvents()
  // await getUpcomingEvents()
})

// GET Events
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events`)
  if (res.status === 200) {
    allEvents.value = await res.json()
    // console.log(events.value)
  } else console.log("error, cannot get data")
}
// const getPastEvents = async () => {
//   const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events/past`)
//   if (res.status === 200) {
//     pastEvents.value = await res.json()
//     // console.log(events.value)
//   } else console.log("error, cannot get data")
// }

// const getUpcomingEvents = async () => {
//   const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events/asc`)
//   if (res.status === 200) {
//     allUpcomingEvents.value = await res.json()
//     // console.log(events.value)
//   } else console.log("error, cannot get data")
// }

// DELETE Events
const removeEvent = async (removeEvent) => {
  const isConfirm = confirm("กด OK เพื่อยกเลิกการนัดหมาย")
  if (isConfirm == true) {
    const res = await fetch(
      `${import.meta.env.VITE_BACK_URL}/events/${removeEvent}`,
      {
        method: "DELETE",
      }
    )
    if (res.status === 200) {
      filterEvent.value = filterEvent.value.filter(
        (event) => event.id !== removeEvent
      ) //show ที่ไม่โดนลบ
      console.log("deleted successfullly")
    } else console.log("error, cannot delete")
  }
}
//filter date
const dateFilter = ref("")
const filterByDate = () => {
  console.log(filterEvent.value)
  chooseTime()
  filterEvent.value = filterEvent.value.filter((event) => {
    const datetime = ref()
    datetime.value = event.eventStartTime
    console.log(datetime.value)
    const date = new Date(datetime.value)
    console.log(date.getDate())
    const month = new Date(datetime.value)
    console.log(month.getMonth() + 1)
    const year = new Date(datetime.value)
    console.log(year.getFullYear())
    console.log(dateFilter.value)
    const d = new Date(dateFilter.value)
    console.log(d.getDate())
    const m = new Date(dateFilter.value)
    console.log(m.getMonth() + 1)
    const y = new Date(dateFilter.value)
    console.log(y.getFullYear())
    console.log(event)
    console.log(
      date.getDate() == d.getDate() &&
      month.getMonth() + 1 == m.getMonth() + 1 &&
      year.getFullYear() == y.getFullYear()
    )
    if (
      date.getDate() == d.getDate() &&
      month.getMonth() + 1 == m.getMonth() + 1 &&
      year.getFullYear() == y.getFullYear()
    ) {
      return event
    }
  })
  filterEvent.value = filterEvent.value.sort((event1,event2)=>{
    console.log(event1.eventStartTime);
    console.log(event2.eventStartTime);
    const datetime1 = ref("")
    const datetime2 = ref("")
    datetime1.value = changeFormatDateTime(event1.eventStartTime)
    datetime2.value = changeFormatDateTime(event2.eventStartTime)
    console.log(datetime1.value)
    console.log(datetime2.value)
    return datetime1.value-datetime2.value
})
}
const changeFormatDateTime = (eventStartTime) => {
  console.log("เข้า change format");
  const dateTime = new Date(eventStartTime);
  console.log(dateTime);
  return dateTime;
};
//filterAll
const filterAll = () =>{
  chooseTime()
}
// filterPast
const filterPast = () => {
  chooseTime()
  filterEvent.value = filterEvent.value.filter((event) => {
    console.log(event.eventStartTime);
    const datetime = changeFormatDateTime(event.eventStartTime)
    console.log(datetime);
    const currentDate = changeFormatDateTime(Date.now())
    console.log(currentDate);
    
    if (datetime<currentDate){
      return event
    }
  })
}
//filterUpcoming
const filterUpcoming = () => {
  chooseTime()
  filterEvent.value = filterEvent.value.filter((event) => {
    console.log(event.eventStartTime);
    const datetime = changeFormatDateTime(event.eventStartTime)
    console.log(datetime);
    const currentDate = changeFormatDateTime(Date.now())
    console.log(currentDate);
    
    if (datetime>currentDate){
      return event
    }
  })
  filterEvent.value = filterEvent.value.sort((event1,event2)=>{
    console.log(event1.eventStartTime);
    console.log(event2.eventStartTime);
    const datetime1 = ref("")
    const datetime2 = ref("")
    datetime1.value = changeFormatDateTime(event1.eventStartTime)
    datetime2.value = changeFormatDateTime(event2.eventStartTime)
    console.log(datetime1.value)
    console.log(datetime2.value)
    return datetime1.value-datetime2.value
})
  console.log(filterEvent.value);
}
</script>
<template>
<!-- {{this.$route.params.time}} -->
    <main class="my-8">
    <div class="container px-6 mx-auto">
    <h2 class="mt-3 mb-5 text-4xl font-bold text-black">{{$route.params.time}} Events : </h2>
    <p class="mb-5 text-xl font-semibold text-stone-600 col-10">The total of bookings are {{ filterEvent.length }} events</p>    
    
<!-- filter navbar -->
      <div class="flex items-center justify-between mb-3">
        <!-- filter time navbar -->
        <div class="relative flex px-4 text-center shadow-lg col-3 bg-amber-400 rounded-2xl" v-if="params.time != 'Past' && params.time != 'Upcoming'">
          <div class="flex-1 group">
            <a class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500">
              <span class="block py-3 text-lg">
                <button @click="filterAll" class="active">All</button>
                <span class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"></span>
              </span>
            </a>
          </div>
          <div class="flex-1 group ">
            <a class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500">
              <span class="block py-3 text-lg">
                <button @click="filterPast" class="active">Past</button>
                <span class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"></span>
              </span>
            </a>
          </div>
          <div class="flex-1 group ">
            <a class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500">
              <span class="block py-3 text-lg">
                <button @click="filterUpcoming" class="active">Upcoming</button>
                <span class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"></span>
              </span>
            </a>
          </div>
        </div>
<!-- ------------- end filter time navbar ------------------->

        <!-- filter date -->
        <div class="justify-end block col-3">
          <input type="date" class="py-2 pl-2 rounded-lg hover:bg-blue-200" v-model="dateFilter"/>
          <button class="p-2 ml-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700" @click="filterByDate">
            filterDate
          </button>
        </div>
      </div>
      <!-- ------------- end filter navbar ------------------->
    <!-- ------------- end navbar ------------------ -->

 
    
    <div  v-if="filterEvent.length!==0"> 
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
      <div v-for="(event,index) in filterEvent" :key="index">  
            <div id="eachEventList" class="relative max-w-sm overflow-hidden transition-shadow duration-300 ease-in-out rounded-lg shadow-md col-11 hover:shadow-xl hover:scale-110">
              <p class="detail col-12">
                <img src="../../assets/date.png" class="img col-3">
                <span class="heading col-6">Date :</span> {{extractDate(event.eventStartTime) }} 
                <span id="eventDuration" class="font-bold col-3">{{ event.eventDuration }} min </span>
              </p>
              
              <p class="detail col-12">
                <img src="../../assets/time.png" class="img col-3">
                <span class="heading col-6">Start Time :</span> {{ extractTime(event.eventStartTime) }}
              </p>

              <p class="detail col-12">
                <img src="../../assets/category.png" class="img col-3">
                <span class="heading col-6">EventCategory :</span> {{ event.eventCategoryId.eventCategoryName }}
              </p>

              <p class="detail col-12">
                <img src="../../assets/user.png" class="img col-3">
                <span class="heading col-6">Booking name :</span> {{ event.bookingName }}
              </p>        
              
              <div id="allButton" class="float-right col-6">
                <img @click="showDetail(event)" src="../../assets/detail.png" class="cursor-pointer img-button col-1">
                <img @click="showEditForm(event)" src="../../assets/edit.png" class="cursor-pointer img-button col-1"> 
                <img @click="removeEvent(event.id)" src="../../assets/trash-bin.png" class="cursor-pointer img-button col-1">
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
.img-button:hover {
  width: 25%;
  display: inline;
}
.notHaveEvent {
  background-color: #e9f6cf;
  font-size: 24px;
  margin-left: 5%;
  margin-top: 3%;
  text-align: center;
  padding: 3%;
  border-radius: 30px;
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
.img {
  width: 7%;
  display: inline;
}
.active:focus {
   background-color : #d9f4a4 ;
}
/* calendar */
</style>
