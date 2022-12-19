<script setup>
import { ref, computed, onBeforeMount } from "vue";
import 'boxicons'
import { getFileName, downloadFile } from '../../Fetch/fetch_file.js'
const props = defineProps({
  event: {
    type: Object,
    require: true,
  },
});

const emit = defineEmits(["closeEventDetail"]);

const fileName = ref("")
const fileUrl = ref("")
onBeforeMount(async () => {
  fileName.value = (await getFileName(props.event.id))[0];
  if (fileName.value != undefined) {
    fileUrl.value = await downloadFile(props.event.id, fileName.value);
    console.log(fileUrl.value);
  }
  console.log(props.event);
})

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

const closePopup = e => {
  console.log(e.target.className);
  if (e.target.className == 'overlay') {
    emit('closeEventDetail')
  }
}


</script>

<template>
  <div id="popup1" class="overlay" @click="closePopup($event)">
    <div class="popup">
      <div class="content">
        <div style="border-style: none;margin-bottom: -8px;text-align: right;padding: 5px">
          <button type="button" class="btn-close" aria-label="Close" @click="$emit('closeEventDetail')"></button>
        </div>
        <div class="modal-body text-center " style="padding: 8px;">
          <div class="row" style="height: 100%;margin-bottom: 10px;margin-top: 6px;">
            <div class="col" style="margin-top: 0px;margin-bottom: 1px;">
              <div class="detail-cover" style=""> </div>
            </div>
          </div>
          <div class="row">
            <div class="col" style="margin-bottom: 1px;margin-top: 11px;">
              <p class="text-uppercase fs-5"
                style="font-weight: bold;font-size: 30px;color: #3d3028;margin-bottom: 4px;">{{ event.bookingName }} 
              </p>
              <p class="fw-normal" style="font-size: 16px;color: #66594c;padding-bottom: 0px;margin-bottom: 6px;">
                {{ event.eventCategoryId.eventCategoryName }}</p>
              <div class="text-center d-flex d-md-flex justify-content-center justify-content-md-center"
                style="text-align: center;height: 40px;padding-bottom: 0px;margin-bottom: 11px;">
                <p class="text-uppercase fw-normal"
                  style="background: #f5bb0e;color: rgb(255,255,255);font-weight: bold;font-size: 11px;border-radius: 100px;width: 89px;text-align: center;padding: 5px;border-color: #007aa5;padding-top: 4px;">
                  {{ event.eventDuration }} mins
                </p>
              </div>
            </div>
          </div>
          <div class="text-light"
            style="background: rgba(102,16,242,0.87);border-radius: 12px;padding: 10px;border-style: none;border-right-style: none;box-shadow: 2px 2px var(--bs-purple);color: var(--bs-indigo);padding-right: 22px;padding-bottom: 12px;padding-left: 34px;padding-top: 30px;margin-right: 6px;margin-left: 4px;">
            <div class="row" style="margin-bottom: 12px;">
              <div class="col-2 text-center" style="padding-right: 0px;padding-left: 0px;width: 10%;"><i
                  class="far fa-calendar-alt fs-5 text-white d-inline"></i></div>
              <div class="col-10" style="padding-left: 6px;">
                <p class="text-start" style="font-size: 13px;color: var(--bs-modal-bg);margin-bottom: 3px;">
                  Date: {{ extractDate(event.eventStartTime) }}</p>
              </div>
            </div>
            <div class="row" style="margin-bottom: 12px;">
              <div class="col-2" style="width: 10%;padding-right: 0px;padding-left: 0px;"><i
                  class="far fa-clock fs-5 text-white justify-content-end"></i></div>
              <div class="col-10" style="padding-left: 6px;">
                <p class="text-start" style="font-size: 13px;color: var(--bs-modal-bg);margin-bottom: 3px;">
                  Time : {{ extractTime(event.eventStartTime) }}</p>
              </div>
            </div>
            <div class="row" style="margin-bottom: 14px;">
              <div class="col-2" style="width: 10%;padding-right: 0px;padding-left: 0px;"><i
                  class="far fa-envelope fs-5 text-white justify-content-end"></i></div>
              <div class="col-10" style="padding-left: 6px;">
                <p class="text-start" style="font-size: 13px;color: var(--bs-light);margin-bottom: 3px;">
                  Email : {{ event.bookingEmail }}</p>
              </div>
            </div>
            <div class="row" style="margin-bottom: 8px;">
              <div class="col-2 col-sm-2" style="width: 10%;padding-right: 0px;padding-left: 0px;">
                <i class="far fa-sticky-note fs-5 text-white justify-content-end"></i>
              </div>
              <div class="col-10" style="padding-left: 6px;">
                <p class="text-start" style="font-size: 12px;color: var(--bs-modal-bg);">
                  Note : <span v-if="event.eventNote">{{ event.eventNote }}</span> <span v-else> - </span>
                </p>
              </div>
            </div>
            <div style="margin-left: 1px;" v-if="fileName != undefined">
              <p
                style="color: var(--bs-modal-bg);font-size: 13px;text-align: left;width: 100%;margin-bottom: 5px;padding-left: 0px;margin-left: 11px;">
                Attachment File</p>
              <div class="row"
                style="padding-top: 8px;padding-bottom: 8px;margin-left: 0px;width: 90%;border: 2px solid rgb(255,255,255);border-radius: 10px;padding-left: 10px;margin-right: -2px;padding-right: 10px;">
                <div class="col-10 d-md-flex align-items-md-center" style="padding-left: 6px;">
                  <p class="text-start d-md-flex"
                    style="font-size: 12px;color: var(--bs-modal-bg);border-width: 9px;border-style: none;margin-top: auto;margin-bottom: auto;">
                    {{ fileName }}
                  </p>
                </div>
                <div class="col-2" style="padding-right: 0px;padding-left: 0px;">
                  <a :href="fileUrl" :download="fileName">
                    <i class="fas fa-cloud-download-alt"
                    style="padding: 7px;border-width: 2px;border-style: solid;border-radius: 100%;font-size: 15px;padding-top: 8px;padding-bottom: 8px;">
                    </i>
                  </a>
                  
                    <!-- <a :href="fileUrl" :download="fileName"><box-icon name='cloud-download' size='md' border='circle' animation='tada-hover' class="" ></box-icon></a> -->
                
                </div>
              </div>
            </div>
            <!-- <div class="row">
              <div class="col-2" style="width: 10%;padding-right: 0px;padding-left: 0px;"><i
                  class="far fa-file-alt fs-5 text-white justify-content-end"></i></div>
              <div class="col-10" style="padding-left: 6px;">
                <p class="text-start" style="font-size: 12px;color: var(--bs-modal-bg);">Attachment File : {{ fileName }}</p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <main class="my-8">
    <div class="col-auto scroll-px-0 detail-container lg:-ml-300px md:ml-52 sm:m-24 ">
      <div
        class="{`col-12 group overflow-auto h-4/6 top-36 bottom-auto scr rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}">
        <div class="max-w-md rounded-lg shadow-2xl col-12 max-h-content bg-gradient-to-r from-gray-300 to-slate-50">
          <button @click="$emit('closeMe')" id="closeDetail" class="items-center justify-end h-8 col-1">
            <img src="../../assets/close.png" />
          </button>

          <img class="object-cover object-center w-full h-20 col-12"
            src="https://www.jeban.com/uploads/2020/11/800/520953_2543e40c73.webp" alt="avatar" />

          <div class="flex items-center px-6 py-1.5 bg-gray-900 col-12">
            <h1 class="mx-3 text-base font-semibold text-white col-9">
              {{ event.eventCategoryId.eventCategoryName }}
            </h1>
            <span
              class="basis-1/3 items-end px-0.5 py-0.5 text-xl text-center bg-purple-300 rounded-md col-1.5 sm:basis-1/3 text-soft-brown heading ">
              {{ event.eventDuration }} min
            </span>
          </div>

          <div class="px-12 pt-3 pb-10 col-12">
            <div class="text-center col-12">
              <h1 class="text-xl font-bold text-gray-800 col-12">
                {{ event.bookingName }}
              </h1>
              <p class="py-1 text-lg font-semibold text-gray-700 col-12">
                {{ event.eventCategoryId.eventCategoryName }}
              </p>
            </div>

            <div class="flex mt-2 text-gray-700 col-12">
              <img src="../../assets/date.png" class="img col-2" />
              <span class="col-9">
                Date : {{ extractDate(event.eventStartTime) }}
              </span>
            </div>

            <div class="flex mt-2 text-gray-700 col-12">
              <img src="../../assets/time.png" class="img col-2" />
              <span class="col-9">
                Time : {{ extractTime(event.eventStartTime) }}
              </span>
            </div>

            <div class="flex mt-2 text-gray-700 col-12">
              <img src="../../assets/email.png" class="img col-2" />
              <span class="col-12">Email : {{ event.bookingEmail }}</span>
            </div>

            <div class="flex mt-2 text-gray-700 col-12">
              <img src="../../assets/notes.png" class="img col-2" /> Note :
              <span class="text-gray-700 col-9">
                <span class="w-full mx-1">
                  <span class="inline-flex"> {{ event.eventNote }}</span></span>
              </span>
            </div>

            <div class="mt-4 text-gray-700 col-12" v-if="fileName != undefined">
              Attachment File
              <div class="p-3 px-4 border-2 border-stone-400 rounded-md">
                <div class="grid grid-cols-6 gap-4 content-center "> 
                  <span class="col-span-5 self-center text-sm">{{ fileName }}</span>
                  <a :href="fileUrl" :download="fileName"><box-icon name='cloud-download' size='md' border='circle' animation='tada-hover' class="" ></box-icon></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main> -->
</template>

<style scoped>

a {
  color: #fff;
}

a:hover {
  color: rgb(211, 211, 211);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.8s ease;
  z-index: 10;
}

.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 2% auto;
  /* margin-top: auto;
  margin-bottom: auto; */
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  animation-delay: 2s;
  /* transition: all 5s ease-in-out; */
}

.popup .content {
  max-height: 30%;
}

@media screen and (max-width: 700px) {
  .box {
    width: 70%;
  }

  .popup {
    width: 70%;
  }
}

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
  height: 4%;
  margin-right: 2%;
  display: inline;
}

.detail-container {
  position: absolute;
  /* left: 30%; */
}

.detail-cover {
  background: url('./../../assets/background/event_detail.png') center / contain no-repeat;
  height: 130px;
  margin-top: 8px;
  margin-bottom: 12px;

}
</style>
