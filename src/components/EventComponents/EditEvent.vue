<script setup>
import { ref, computed, onUpdated } from "vue";
import { useRouter } from "vue-router";
const appRouter = useRouter();
const goBack = () => appRouter.go(-1);
const props = defineProps({
  events: {
    type: Array,
    require: true,
  },
  event: {
    type: Object,
    require: true,
  },
  showEditForm: {
    type: Number,
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

/* ------------------------------------------------------------------------------------ */
// extract Date from eventStartTime
const extractDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

// extract Time from eventStartTime
const extractTime = (time) => {
  const t = new Date(time)
  const minute = computed(() => {
    if (t.getMinutes() < 10) return "0" + t.getMinutes();
    else return t.getMinutes();
  });
  return `${t.getHours()}:${minute.value} น.`
}

//ฟังก์ชันที่เปลี่ยนค่า dateTime ไปเป็น format ที่ backend สามารถอ่านค่าได้
const changeFormat = (eventStartTime) => {
  const dateTime = new Date(eventStartTime);
  return `${dateTime.toLocaleString("en-GB")}`;
};

/* ------------------------------------------------------------------------------------ */
const showInput = ref(false);
const eventStartTime = ref(props.event.eventStartTime);
const note = props.event.eventNote;
const eventNote = ref(note);
const showEditForm = ref(props.showEditForm);

// ทำ end time
const extractEndTime = (eventStartTime, eventDuration) => {
  const t = new Date(eventStartTime);
  return `${t.getHours()}:${t.getMinutes() + eventDuration}`;
};

/* -------------------------------------------------------------------------------------------- */
//ถ้าเป็น true มันจะแสดง text สีแดงว่า time เป็นอดีต
const validateFuture = ref(false);

//เช็คว่าเป็นเวลาที่เป็นอนาคต
const startTime = computed(() => {
  const currentDateTime = new Date();
  const dateTime = new Date(eventStartTime.value);
  dateTime < currentDateTime
    ? (validateFuture.value = true)
    : (validateFuture.value = false);
});

//ไปเรียกใช้ computed ทุกครั้งที่มีการ update
onUpdated(() => {
  // console.log("onUpdate working");
  startTime.value;
  overlapTime.value;
});

const openInput = () => {
  showInput.value = !showInput.value;
};

/* ------------------------------------------------------------------------------------ */

//ฟังก์ชันที่เปลี่ยนค่า dateTime ไปเป็น format ที่เช็ค overlap
const changeFormatOverlap = (eventStartTime) => {
  const dateTime = new Date(eventStartTime);
  return dateTime;
};

//หา eventEndTime
const getEndTime = (eventStartTime, eventDuration) => {
  const startTime = new Date(eventStartTime);
  const endTime = new Date(eventStartTime);
  endTime.setMinutes(startTime.getMinutes() + eventDuration);
  console.log(eventDuration);
  return endTime;
};

const overlap = ref(false);
const overlapTime = computed(() => {
  props.events.splice(
    props.events.findIndex((event) => event.id == props.event.id),
    1
  );
  const newStartTime = changeFormatOverlap(eventStartTime.value);
  const newEndTime = getEndTime(
    eventStartTime.value,
    props.event.eventDuration
  );

  for (const event of props.events) {
    if (event.eventCategoryId.id == props.event.eventCategoryId.id) {
      const eventStartTime = changeFormatOverlap(event.eventStartTime);
      const eventEndTime = getEndTime(
        event.eventStartTime,
        event.eventDuration
      );

      const check = eventStartTime < newEndTime && eventEndTime > newStartTime;
      overlap.value = check;
      if (overlap.value == true) {
        console.log("time is overlap");
        break;
      }
    }
  }
  return overlap.value;
});

/* ------------------------------------------------------------------------------------- */
const checkTime = () => {
  if (
    changeFormatToEdit(props.event.eventStartTime) ==
    changeFormatToEdit(eventStartTime.value)
  ) {
    return true;
  }
};

const changeFormatToEdit = (dateTime) => {
  const dt = new Date(dateTime);
  return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getMilliseconds()}`;
};

// EDIT
const eventToEdit = ref({});
const editingEvent = () => {
  eventToEdit.value = {
    eventCategoryId: props.event.eventCategoryId.id,
    eventNote: eventNote.value,
    eventStartTime: changeFormat(eventStartTime.value),
    eventDuration: props.event.eventDuration,
  };
  console.log(eventToEdit.value);
  editEventToDB(eventToEdit.value);
  // showEditForm.value = 0;
};

const editEventToDB = async (editEvent) => {
  const time1 = ref("");
  const time2 = ref("");
  time1.value = changeFormatToEdit(props.event.eventStartTime);
  time2.value = changeFormatToEdit(eventStartTime.value);
  startTime.value;
  const res = await fetch(
    `${import.meta.env.VITE_BACK_URL}/events/${props.event.id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editEvent),
    }
  );

  if (props.event.eventNote == eventNote.value && time1.value == time2.value) {
    showEditForm.value = 1;
    return alert("sorry, please change date and note");
  } else if (validateFuture.value == true) {
    showEditForm.value = 1;
    return alert("sorry, cannot be edited : Time is a past");
  } else if (overlap.value == true) {
    showEditForm.value = 1;
    return alert("sorry, cannot be added : Time is overlap");
  } else if (errorEventNote.value != "" || validateEventStartTime.value != "") {
    showEditForm.value = 1;
    return alert("check your edit");
  } else if (res.status === 200) {
     alert("editing event successfully");
    return emit('closeEditEvent')
  } else if (res.status === 400) {
    alert("sorry, cannot be edited : Enter New Information");
  } else alert("sorry, cannot be edited");
};

const emit = defineEmits([('closeEditEvent')])
/* ------------------------------------------------------------------------------------ */
//validation
const errorEventNote = ref("");
const validateEventStartTime = computed(() => {
  return eventStartTime.value === "" ? "Please Select StartTime" : "";
});
const validateEventNote = () => {
  errorEventNote.value =
    eventNote.value.length > 500
      ? "EventNote cannot be more than 500 character"
      : "";
};

// validate calendar
const minDatetimeLocal = computed(() => {
  const today = new Date();
  console.log(today);
  const date =
    today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate();
  const hour = today.getHours();
  const minute = computed(() => {
    if (today.getMinutes() < 10) return "0" + today.getMinutes();
    else return today.getMinutes();
  });
  console.log(minute.value);
  const dateTime = `${date}T${hour}:${minute.value}`;
  return dateTime;
});
console.log(minDatetimeLocal.value);
</script>

<template>
  <main class="my-8">
    <div id="edit-container" class="px-6 detail-container" v-show="showEditForm == 1">
      <div class="{`col-12 overflow-auto h-5/6 top-24 bottom-40 rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}">
        <!-- navbar -->
<nav class="max-h-screen py-2 rounded-t-lg bg-neutral-800 lg:w-12/12">
        <span class="text-2xl font-bold text-justify ml-7 text-zinc-100 col-7" > Edit Event : </span>
          <button @click="$emit('closeEditEvent')" id="closeDetail" class="mt-1 col-12">
             <!-- <button @click="goBack" id="closeDetail" class="mt-1 col-12"> -->
            <img src="../assets/close.png" />
          </button>
        </nav>

        <div class="overflow-hidden bg-center bg-cover shadow-lg col-12 bg-zinc-100 ">
          <div class="grid gap-6 px-10 mx-16 my-10 mb-6 lg:grid-cols-2">
            <!-- show ของเดิม -->
            <div>
              <h2 class="mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">
                Booking name :
                <span class="font-thin">{{ event.bookingName }}</span>
              </h2>
            </div>
            <div>
              <h2 class="mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">
                Email :
                <span class="font-thin">{{ event.bookingEmail }}</span>
              </h2>
            </div>
            <div>
              <h2 class="mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">
                Clinic :
                <span class="font-thin">
                  {{ event.eventCategoryId.eventCategoryName}}
                </span>
              </h2>
            </div>
            <div>
              <h2 class="mb-1 text-base font-semibold text-gray-900 dark:text-gray-300">
                Date :
                <span class="mr-10 font-thin" >
                  {{ extractDate(event.eventStartTime) }}
                </span>
                Start Time :
                <span class="font-thin">
                  {{ extractTime(event.eventStartTime) }}
                </span>
                <span class="p-1 pl-2 pr-2 ml-8 text-xl text-center bg-purple-300 rounded-md col-3 text-soft-brown heading">
                  {{ event.eventDuration }} min
                </span>

                <!-- เปลี่ยนเวลา -->
              </h2>
              <button @click="openInput" class="text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Change Date&Time
              </button>
              <span class="ml-0.5" v-if="showInput">
                <input type="datetime-local" :min="`${minDatetimeLocal}`" v-model="eventStartTime" />
                <span class="ml-2 text-red-700 col-1" v-if="validateEventStartTime" >
                  {{ validateEventStartTime }}
                </span>
                <span class="ml-2 text-sm text-red-700 col-1" v-if="overlap">* Time is overlap</span>
                <span class="ml-2 text-sm text-red-700 col-1" v-if="validateFuture">* Time is a past time</span>
                <span class="ml-2 text-sm text-red-700 col-1" v-if="checkTime()">* change Time</span>
              </span>
            </div>
            <!-- เปลี่ยน note -->
            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300"> Note :</label>
              <textarea
                type="text"
                rows="5"
                cols="50"
                v-model="eventNote"
                @keyup="validateEventCategoryDescription"
                @blue="validateEventCategoryDescription"
                class="p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="clinic descrition..."
                required
              ></textarea>
              <span class="ml-2 text-red-700 col-1" v-if="errorDescription">{{ errorDescription}}</span>
            </div>
          </div>
          <!-- save button -->
          <div class="float-right mr-20">
            <!-- <button  @click="editingEvent(), $emit('closeEditEvent')" class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> -->
            <button  @click="editingEvent" class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#edit-container {
  position: absolute;
  left: 25%;
  line-height: 10px;
}
.detail {
  margin-left: 10%;
  font-size: 100%;
  line-height: 45px;
}
.heading {
  font-weight: bold;
  font-size: 80%;
}
#closeDetail {
  width: 3%;
  margin-right: 5%;
  float: right;
  display: inline;
}

.img {
  width: 3%;
  margin-right: 2%;
  display: inline;
}

textarea {
  background-color: #b9d0f0;
}

input {
  margin-left: 3%;
  background-color: #b9d0f0;
  border-radius: 7px;
  width: 37%;
  height: 45px;
  font-size: 100%;
}
input:focus {
  background-color: rgb(216 180 254);
}
</style>
