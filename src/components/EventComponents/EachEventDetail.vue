<script setup>
import { ref,computed } from "vue";
const props = defineProps({
  event: {
    type: Object,
    require: true,
  },
});

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

// extract Date from eventStartTime
const extractDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

// extract Time from eventStartTime
const extractTime = (time) => {
  const t = new Date(time)
  const minute = computed(() => {
    console.log(t.getMinutes());
    if (t.getMinutes() < 10) return "0" + t.getMinutes();
    else return t.getMinutes();
  });
  return `${t.getHours()}:${minute.value} น.`
}

const showDetail = ref(true);
</script>

<template>
  <main class="my-8">
    <div class="col-12 detail-container px-6">
      <div class="{`col-12 group overflow-auto h-5/6 top-24 bottom-auto scr rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}">
        <div class="col-12 max-h-content max-w-md bg-gradient-to-r from-zinc-100 to-white shadow-2xl rounded-lg">
          <button @click="$emit('closeMe')" id="closeDetail" class="col-1 items-center h-12 justify-end">
            <img src="../../assets/close.png" />
          </button>

          <img class="col-12 w-full h-40 object-cover object-center" src="https://www.jeban.com/uploads/2020/11/800/520953_2543e40c73.webp" alt="avatar"/>

          <div class="col-12 flex items-center px-6 py-3 bg-gray-900">
            <h1 class="col-9 mx-3 text-white font-semibold text-lg">
              {{ event.eventCategoryId.eventCategoryName }}
            </h1>
            <span class="col-2 px-1 py-1 items-end text-xl text-center bg-purple-300 rounded-md text-soft-brown heading">
              {{ event.eventDuration }} min
            </span>
          </div>

          <div class="col-12 pt-5 pb-10 px-12">
            <div class="col-12 text-center">
              <h1 class="col-12 text-2xl font-semibold text-gray-800">
                {{ event.bookingName }}
              </h1>
              <p class="col-12 py-2 text-lg text-gray-700">
                {{ event.eventCategoryId.eventCategoryName }}
              </p>
            </div>

            <div class="col-12 flex mt-4 text-gray-700">
              <img src="../../assets/date.png" class="img col-2" />
              <span class="col-9">
                Date : {{ extractDate(event.eventStartTime) }}
              </span>
            </div>

            <div class="col-12 flex mt-4 text-gray-700">
              <img src="../../assets/time.png" class="img col-2" />
              <span class="col-9">
                Time : {{ extractTime(event.eventStartTime) }}
              </span>
            </div>

            <div class="col-12 flex mt-4 text-gray-700">
              <img src="../../assets/email.png" class="img col-2" />
              <span class="col-12">Email : {{ event.bookingEmail }}</span>
            </div>

            <div class="col-12 flex mt-4 text-gray-700">
              <img src="../../assets/notes.png" class="img col-2" /> Note :
              <span class="col-9 text-gray-700">
                <span class="w-full mx-1">
                  <span class="inline-flex"> {{ event.eventNote }}</span></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.heading {
  font-weight: bold;
  font-size: 80%;
}
#detail-container {
  margin-left: 30%;
}

#closeDetail {
  width: 5%;
  margin-right: 3%;
  float: right;
  display: inline;
}

.img {
  width: 7%;
  height: 7%;
  margin-right: 2%;
  display: inline;
}

.detail-container {
  position: absolute;
  left: 30%;
}
</style>
