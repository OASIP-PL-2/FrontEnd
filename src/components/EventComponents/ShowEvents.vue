<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { getCategories } from "../../Fetch/fetch_category.js";
import { getEvents, getBlindEvents } from "../../Fetch/fetch_event.js";
import { getPastEvents } from "../../Fetch/fetch_event.js";
import { getUpcomingEvents } from "../../Fetch/fetch_event.js";
import { getEventsByDate } from "../../Fetch/fetch_event.js";
import { deleteEvent } from "../../Fetch/fetch_event.js";
import { getFileName } from "../../Fetch/fetch_file.js";
import EachEventDetail from "../../components/EventComponents/EachEventDetail.vue";
import EditEvent from "../../components/EventComponents/EditEvent.vue";
import { useRoute } from "vue-router";

let { params } = useRoute();
const filterEvent = ref([]);
const allEvents = ref([]);
const blindEvents = ref([]);
const categories = ref([]);
const param = ref();

onBeforeMount(async () => {
  param.value = params.time;
  categories.value = await getCategories();
  allEvents.value = await getEvents();
  blindEvents.value = await getBlindEvents();
  extractCategory();
  console.log(currentCategory.value);
  // console.log(allEvents.value);
  return chooseTime();
});

const currentCategory = ref([]);
const extractCategory = () => {
  currentCategory.value = categories.value.filter((category) => {
    return category.eventCategoryName == param.value;
  });
};

const chooseTime = async () => {
  if (param.value == "All") {
    filterEvent.value = allEvents.value;
    console.log(filterEvent.value);
  } else if (param.value == currentCategory.value[0].eventCategoryName) {
    filterByCategory(allEvents);
  }
};

const filterByCategory = (events) => {
  filterEvent.value = events.value.filter((event) => {
    return (
      event.eventCategoryId.id ==
      currentCategory.value[0].id
    );
  });
}

const filterAll = () => {
  btnAll.value = selectTyoe.value
  btnPast.value = nonSelectType.value
  btnFuture.value = nonSelectType.value
  dateFilter.value = ""
  chooseTime();
};

const filterPast = async () => {
  btnAll.value = nonSelectType.value
  btnPast.value = selectTyoe.value
  btnFuture.value = nonSelectType.value
  dateFilter.value = ""
  filterEvent.value = await getPastEvents();
  if (param.value != "All") {
    filterByCategory(filterEvent);
  }
};

const filterUpcoming = async () => {
  btnAll.value = nonSelectType.value
  btnPast.value = nonSelectType.value
  btnFuture.value = selectTyoe.value
  dateFilter.value = ""
  filterEvent.value = await getUpcomingEvents();
  if (param.value != "All") {
    filterByCategory(filterEvent);
  }
};

const dateFilter = ref("");
const filterByDate = async () => {
  const date = new Date(dateFilter.value)
  const dateFormat = String(date.getFullYear()) + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0')
  console.log(date);
  filterEvent.value = await getEventsByDate(dateFormat);
  if (param.value != "All") {
    filterByCategory(filterEvent);
  }
};

defineEmits(["showDetail", "editEvent", "deleteEvent"]);
const isShow = ref(0);
const isShowEdit = ref(0);
const detailCurrentEvent = ref({});
const showDetail = (event) => {
  detailCurrentEvent.value = event;
  isShow.value = 1;
};
const closeShowDetail = () => {
  isShow.value = 0;
  isShowEdit.value = 0;
};
const fileName = ref("")
const showEditForm = async (event) => {
  fileName.value = (await getFileName(event.id))[0];
  detailCurrentEvent.value = event;
  isShowEdit.value = 1;
};
const closeEditForm = () => {
  isShowEdit.value = 0;
  console.log(isShowEdit.value);
};

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
];

const extractDate = (date) => {
  const d = new Date(date);
  return d;
};

const extractTime = (time, duration = 0) => {
  const date = new Date(time)
  const t = new Date(date.getTime() + duration * 60000)
  const minute = computed(() => {
    if (t.getMinutes() < 10) return "0" + t.getMinutes();
    else return t.getMinutes();
  });
  return `${t.getHours()}:${minute.value} `;
};

// DELETE Event
const removeEvent = async (event) => {
  await deleteEvent(event)
};

const isLogin = localStorage.getItem("accessToken") !== null;
const isLecturer = isLogin ? JSON.parse(localStorage.getItem("userDetail")).role == "lecturer" : false
const isAdmin = isLogin ? JSON.parse(localStorage.getItem("userDetail")).role == "admin" : false
const nonSelectType = ref('padding-right: 16px;padding-left: 16px;color: #b5afa0;border-radius: 0px;border-bottom: 1.8px none #b5afa0;')
const selectTyoe = ref('16px;padding-left: 16px;color: #605e4f;border-radius: 0px;font-weight: bold;border-bottom: 3px solid #605e4f;')
let btnAll = ref(selectTyoe.value)
let btnPast = ref(nonSelectType.value)
let btnFuture = ref(nonSelectType.value)
</script>

<template>
  <main class="mx-10 -mt-4">
    <h1 class="fw-semibold" style="font-family: 'Alegreya SC', serif;color: #302608;margin-top:90px;">Events</h1>

    <div class="container" style="width: 80%;margin-bottom: 12px;">
      <div class="row">
        <div class="col-md-6">
          <div class="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex align-items-md-center"
            style="background: rgba(255,255,255,0.5);box-shadow: 2px 2px var(--bs-light);padding-right: 9px;padding-top: 14px;padding-bottom: 2px;margin-bottom: 5px;padding-left: 0px;border-style: none;border-color: #ffd24a;border-right-color: #ffd24a;border-bottom-style: none;border-bottom-color: #afaaa3;">
            <div class="btn-group" role="group">
              <button class="btn" type="button" :style="btnAll" @click="filterAll">All </button>
              <button class="btn" type="button" :style="btnPast" @click="filterPast">Past</button>
              <button class="btn" type="button" :style="btnFuture" @click="filterUpcoming">Upcomming
              </button>
            </div>
          </div>
        </div>
        <div
          class="col-md-6 d-md-flex align-self-center justify-content-md-end justify-content-lg-end justify-content-xl-end justify-content-xxl-end"
          style="padding-right: 22px;padding-left: 7px;">
          <input class="form-control-sm" type="date"
            style="background: var(--bs-gray-100);border-radius: 50px;width: 40%;margin-top: auto;margin-left: 10px;color: #605e4f;font-size: 12px;border-width: 2px;border-style: solid;padding-right: 16px;padding-left: 16px;padding-top: 6px;padding-bottom: 6px;margin-bottom: 0px;"
            v-model="dateFilter" />
          <button class="btn btn-sm fw-semibold" type="button"
            style="padding-top: 0px;padding-bottom: 0px;color: #282821;font-size: 13px;border-radius: 16px;padding-right: 12px;padding-left: 12px;margin-left: 7px;background: #b5afa0;border: 2px solid #282821;"
            @click="filterByDate">
            Filter By Date
          </button>
        </div>
      </div>
    </div>

    <div class="container" style="width: 80%;" v-if="filterEvent.length !== 0">
      <h6 v-if="!(isAdmin) && !(isLecturer)">Owner Events</h6>
      <h6 v-if="isLecturer">Owner Events your category</h6>
      <div class="row">
        <div v-for="event in filterEvent" :key="event.id" class="col-sm-12 col-md-6 col-lg-4"
          style="margin-bottom: 16px;">
          <div class="row" style="margin-right: -4px;">
            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3" style="background: #ffd451;box-shadow: 0px 5px 2px rgb(236,241,245);filter: blur(0px) brightness(100%);
                transform: translate(0px);text-shadow: 0px 1px var(--bs-gray);border-top-left-radius: 15px;border-bottom-left-radius: 15px;
                padding-left: 0px;padding-right: 0px;text-align: left;">
              <div class="vstack text-center" style="margin-right: -1px;">
                <!-- <h1>{{ event.id }} </h1> -->
                <h4 class="fs-3" style="margin-bottom: 2px;margin-top: 15px;color: var(--bs-white);">{{
                    extractDate(event.eventStartTime).getDate()
                }}</h4>
                <h6 class="fs-6" style="margin-bottom: 2px;color: var(--bs-white);font-size: 14px;">{{
                    monthNames[extractDate(event.eventStartTime).getMonth()]
                }}</h6>
                <h6 style="margin-bottom: 7px;color: var(--bs-white);">{{
                    extractDate(event.eventStartTime).getFullYear()
                }}</h6>
              </div>
            </div>
            <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 text-left" style="box-shadow: 0px 5px 2px rgb(236,241,245);background: var(--bs-gray-100);border-top-right-radius: 15px;border-bottom-right-radius: 15px;
                border-style: none;border-top: 2px solid var(--bs-warning);border-right-style: solid;border-right-color: var(--bs-warning);
                border-bottom: 2px solid var(--bs-warning);">
              <h6 class="text-uppercase fs-6 fw-semibold" style="font-size: 20px;margin-top: 10px;color: var(--bs-yellow);margin-bottom: 2px;text-shadow: 2px 0px var(--bs-gray-200);
                  text-align: left;">
                {{ event.bookingName }}
              </h6>
              <p class="fs-6 text-left"
                style="margin-bottom: 2px;color: var(--bs-gray-700);font-family: Assistant, sans-serif;font-size: 16px;text-align: left;">
                {{ event.eventCategoryId.eventCategoryName }}
              </p>
              <div class="d-sm-flex justify-content-sm-end">
                <div class="col-12 col-sm-7 col-md-7 d-flex float-start">
                  <p style="color: var(--bs-gray-600);font-family: Assistant, sans-serif;font-size: 14px;">
                    {{ extractTime(event.eventStartTime) }} - {{ extractTime(event.eventStartTime,
                        event.eventDuration)
                    }}
                    ({{ event.eventDuration }} mins)</p>
                </div>
                <div class="col-5 col-sm-5 col-md-5">
                  <div
                    class="d-flex justify-content-end justify-content-sm-end justify-content-md-end justify-content-lg-end">
                    <i class="fas fa-list-ul fs-6 text-bg-dark border rounded-circle border-4 border-dark" tabindex="0" data-toggle="tooltip" title="Details"
                      style="margin-right: 3px;" @click="showDetail(event)"></i>
                    <i v-if="!(isLecturer)"
                      class="fas fa-edit fs-6 text-white text-bg-primary border rounded-circle border-4 border-primary" tabindex="0" data-toggle="tooltip" title="Edit"
                      style="margin-right: 3px;" @click="showEditForm(event)"></i>
                    <i v-if="!(isLecturer)"
                      class="far fa-trash-alt fs-6 text-bg-danger border rounded-circle border-4 border-danger" tabindex="0" data-toggle="tooltip" title="Remove"
                      @click="removeEvent(event)"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- No event -->
    <div v-else v-show="isLogin" class="hover-overlay ripple shadow-1-strong rounded">
      <div class="container"
        style="width: 80%;height: 30%;background: #e28c05;border-radius: 11px;margin-top: 23px;padding-top: 55px;padding-bottom: 55px;border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;">
        <p class=""
          style="text-align: center;color: rgb(255,255,255);padding-top: 0px;padding-bottom: 0px;margin-bottom: 0px;font-size: 20px;">
          NO SCHEDULE</p>
      </div>
      <router-link :to="{ name: 'Appointment' }">
      <div class="no-event container" style="" v-if="!isLecturer">
        <div class="text-center">
          <span style="color:black;font-size: 42px;border-radius: 113px;background: var(--bs-gray-600);padding-right: 24px;padding-left: 24px;padding-top: 0px;padding-bottom: 2px;">
            +
          </span>
          <p style="margin-top: 18px;color:black;">Booking Appointment</p>
        </div>
      </div>
    </router-link>
    </div>

    <hr v-show="isLogin && !(isAdmin) && !(isLecturer)" />
    <!-- BlindEvents event -->
    <div class="container" style="width: 80%;" v-if="blindEvents.length !== 0 && !(isAdmin) && !(isLecturer)">
      <h6> Blind Events</h6>
      <div class="row">
        <div v-for="event in blindEvents" :key="event.id" class="col-sm-12 col-md-6 col-lg-4"
          style="margin-bottom: 16px;">

          <div class="row" style="margin-right: -4px;">
            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3" style="background: #ffd451;box-shadow: 0px 5px 2px rgb(236,241,245);filter: blur(0px) brightness(100%);
                transform: translate(0px);text-shadow: 0px 1px var(--bs-gray);border-top-left-radius: 15px;border-bottom-left-radius: 15px;
                padding-left: 0px;padding-right: 0px;text-align: left;">
              <div class="vstack text-center" style="margin-right: -1px;">
                <!-- <h1>{{ event.id }} </h1> -->
                <h4 class="fs-3" style="margin-bottom: 2px;margin-top: 15px;color: var(--bs-white);">{{
                    extractDate(event.eventStartTime).getDate()
                }}</h4>
                <h6 class="fs-6" style="margin-bottom: 2px;color: var(--bs-white);font-size: 14px;">{{
                    monthNames[extractDate(event.eventStartTime).getMonth()]
                }}</h6>
                <h6 style="margin-bottom: 7px;color: var(--bs-white);">{{
                    extractDate(event.eventStartTime).getFullYear()
                }}</h6>
              </div>
            </div>
            <div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-9 text-left" style="box-shadow: 0px 5px 2px rgb(236,241,245);background: var(--bs-gray-100);border-top-right-radius: 15px;border-bottom-right-radius: 15px;
                border-style: none;border-top: 2px solid var(--bs-warning);border-right-style: solid;border-right-color: var(--bs-warning);
                border-bottom: 2px solid var(--bs-warning);">
              <h6 class="text-uppercase fs-6 fw-semibold" style="font-size: 20px;margin-top: 10px;color: var(--bs-yellow);margin-bottom: 2px;text-shadow: 2px 0px var(--bs-gray-200);
                  text-align: left;">
                {{ event.eventCategoryId.eventCategoryName }}
              </h6>
              <p class="fs-6 text-left"
                style="margin-bottom: 2px;color: var(--bs-gray-700);font-family: Assistant, sans-serif;font-size: 16px;text-align: left;">
                This period has an appointment.
              </p>
              <div class="d-sm-flex justify-content-sm-end">
                <div class="col-12 col-sm-7 col-md-7 d-flex float-start">
                  <p style="color: var(--bs-gray-600);font-family: Assistant, sans-serif;font-size: 14px;">
                    {{ extractTime(event.eventStartTime) }} - {{ extractTime(event.eventStartTime,
                        event.eventDuration)
                    }}
                    ({{ event.eventDuration }} mins)</p>
                </div>
                <div class="col-5 col-sm-5 col-md-5">
                  <!-- <div
                      class="d-flex justify-content-end justify-content-sm-end justify-content-md-end justify-content-lg-end">
                      <i class="fas fa-list-ul fs-6 text-bg-dark border rounded-circle border-4 border-dark" style="margin-right: 3px;" @click="showDetail(event)"></i>
                      <i class="fas fa-edit fs-6 text-white text-bg-primary border rounded-circle border-4 border-primary" style="margin-right: 3px;" @click="showEditForm(event)"></i>
                      <i class="far fa-trash-alt fs-6 text-bg-danger border rounded-circle border-4 border-danger" @click="removeEvent(event)"></i>
                    </div> -->
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    <EachEventDetail v-if="isShow == 1" @closeEventDetail="closeShowDetail" :event="detailCurrentEvent" />
    <EditEvent v-if="isShowEdit == 1" @closeEditEvent="closeEditForm" :events="filterEvent" :event="detailCurrentEvent"
      :fileName="fileName" :showEditForm="isShowEdit" />
    <div>
      <router-view></router-view>
    </div>
  </main>
</template>
<style scoped>
a {
  text-decoration: none !important;
}

.no-event:hover{
   background-color: var(--bs-gray-400);
}

.no-event {
  width: 80%;
  height: 30%;
  background: var(--bs-gray-500);
  border-radius: 11px;
  padding-top: 58px;
  margin-top: -2px;
  padding-bottom: 40px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;

}
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
  background-color: #a19ed6;
  text-align: center;
  border-radius: 12px;
  font-size: 90%;
}

#allButton {
  text-align: right;
}

.img-button {
  width: 30px;
  height: 30px;
  display: inline;
}

.img-button:hover {
  width: 20%;
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
  background-color: #c1bfe6;
  border-radius: 3px;
  width: fit-content;
}
</style>