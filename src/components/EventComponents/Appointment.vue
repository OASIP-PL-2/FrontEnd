<script setup>
import { ref, onBeforeMount, computed, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { getCategories } from "../../Fetch/fetch_category.js";
import { addNewEvent, getEvents, getBlindEvents } from "../../Fetch/fetch_event.js";

// Import all Vue FilePond
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
);

const appRouter = useRouter();
const goBack = () => appRouter.go(-1);

const bookingName = ref("");
const bookingEmail = ref("");
const eventCategoryId = ref("");
const eventDuration = ref(0)

const eventStartTime = ref("");
const eventNote = ref("");
let file = ref("");

const categories = ref([]);
const events = ref([]);
const isLogin = localStorage.getItem("accessToken") != null;
onBeforeMount(async () => {
  events.value = await getBlindEvents();
  categories.value = await getCategories();
  console.log(categories.value);
  if (isLogin) {
    bookingEmail.value = JSON.parse(localStorage.getItem("userDetail")).email;
  }
  console.log(categories.value);
});

// clear form func.
const clearForm = () => {
  bookingName.value = "";
  bookingEmail.value = "";
  eventCategoryId.value = "";
  eventDuration.value = "";
  eventStartTime.value = "";
  eventNote.value = "";
};

//Show Error
let ErrorName = ref(false);
let ErrorEmail = ref(false);
let ErrorCategory = ref(false);
let ErrorStartTime = ref(false);
let ErrorEmail_message = ref("");
let ErrorStartTime_message = ref("");

const validateBookingName = () => {
  ErrorName.value = bookingName.value.length == 0;
};

let format = /^(([^<>()[\]\\.,;:\s*$&!#?@"]+(\.[^<>()[\]\\.,;:\s*$&!#?@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateBookingEmail = () => {
  ErrorEmail.value = bookingEmail.value.length == 0;
  if (!format.test(bookingEmail.value.trim())) {
    ErrorEmail.value = true;
    ErrorEmail_message.value = "Format email is Invaild";
  }
};

const validateEventStartTime = () => {
  ErrorStartTime.value = false;
  ErrorStartTime_message.value = "";

  ErrorStartTime.value = eventStartTime.value.length == 0;
  if (validatePast()) {
    ErrorStartTime.value = true;
    ErrorStartTime_message.value = "Sorry, time is a past time";
  }
};

const validatePast = () => {
  const currentDateTime = new Date();
  const dateTime = new Date(eventStartTime.value);
  return dateTime < currentDateTime;
};

// get current datetime
const minDatetimeLocal = computed(() => {
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  const hour = String(today.getHours()).padStart(2, "0");
  const minute = String(today.getMinutes()).padStart(2, "0");
  const dateTime = `${date}T${hour}:${minute}`;
  return dateTime;
});

//format date-time for send to backend
const changeFormat = eventStartTime => {
  const dateTime = new Date(eventStartTime);
  return `${dateTime.toLocaleString("en-GB")}`;
};

const selectCategory = () => {
  eventDuration.value = categories.value.filter(
      category => category.id == eventCategoryId.value
    )[0].eventDuration;
}

const onFileChanged = e => {
  file.value = e.target.files[0];
  console.log(file.value);
};

const addEvent = async () => {
  ErrorName.value = bookingName.value.length == 0;
  ErrorEmail.value = bookingEmail.value.length == 0;
  ErrorCategory.value =
    eventCategoryId.value.length == 0 || eventCategoryId.value == "";
  ErrorStartTime.value = eventStartTime.value.length == 0;
  if (
    ErrorName.value ||
    ErrorEmail.value ||
    ErrorCategory.value ||
    ErrorStartTime.value ||
    file.value.size > 10000000 ||
    overlapTime()
  ) {
    return 0;
  }

  const data = new FormData();
  const newEvent = {
    bookingEmail: bookingEmail.value,
    bookingName: bookingName.value,
    eventCategoryId: eventCategoryId.value,
    eventDuration: eventDuration.value,
    eventNote: eventNote.value,
    eventStartTime: changeFormat(eventStartTime.value)
  };
  data.append("event", JSON.stringify(newEvent));
  if (file.value.length != 0) {
    data.append("file", file.value);
  }
  console.log(data.values);
  addNewEvent(data);
};

//หา eventEndTime
const getEndTime = (eventStartTime, eventDuration) => {
  const startTime = new Date(eventStartTime);
  const endTime = new Date(eventStartTime);
  endTime.setMinutes(startTime.getMinutes() + eventDuration);
  console.log(eventDuration);
  return endTime;
};

//ฟังก์ชันที่เปลี่ยนค่า dateTime ไปเป็น format ที่เช็ค overlap
const changeFormatOverlap = (eventStartTime) => {
  const dateTime = new Date(eventStartTime);
  return dateTime;
};

const overlap = ref(false);
const overlapTime = (() => {
  console.log(eventStartTime.value);
  const newStartTime = changeFormatOverlap(eventStartTime.value);
  console.log(newStartTime);
  const newEndTime = getEndTime(eventStartTime.value, eventDuration.value);
  console.log(newEndTime);

  for (const event of events.value) {
    if (event.eventCategoryId.id == eventCategoryId.value) {
      const eventStartTime = changeFormatOverlap(event.eventStartTime);
      const eventEndTime = getEndTime(
        event.eventStartTime,
        event.eventDuration
      );
      const check = eventStartTime < newEndTime && eventEndTime > newStartTime;
      overlap.value = check;
      if (overlap.value == true) {
        ErrorStartTime_message.value = "This time overlaps with other events."
        ErrorStartTime.value = true;
        return overlap.value;
      }
    }
  }
  return overlap.value;
});
</script>

<template>
  <main >
    <div class="container-fluid" style="width: 70%;margin-bottom: 70px;margin-top: 0px;padding-top: 11px;padding-bottom: 15px;">
        <div class="row d-lg-flex justify-content-lg-start justify-content-xl-start" style="margin-top: 18px;margin-left: -2px;margin-right: -2px;box-shadow: 1px 1.5px 14px rgb(176,176,177);">
            <div class="left-box col-7 col-md-6 col-lg-6 d-none d-print-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block justify-content-md-end justify-content-xl-end" style="">
            </div>
            <div class="col-md-6 flex-shrink-1" style="margin-right: 40px;text-align: left; margin-left: 0px;padding: 44px;padding-bottom: 38px;padding-right: 2px;padding-top: 42px;">
                <div class="justify-content-center justify-content-sm-center justify-content-md-start" style="margin-top: -2px;">
                    <p class="text-uppercase fw-bold" style="font-size: 30px;padding-left: 8px;margin-left: 1px;margin-bottom: 0px;">Schedule</p>
                    <p class="text-uppercase fw-bold" style="font-size: 30px;padding-left: 8px;margin-bottom: 8px;margin-left: 1px;">Your Appointment.</p>
                </div>
                <div class="justify-content-center justify-content-sm-center justify-content-md-start" style="margin-top: 44px;">
                    <p class="fw-semibold" style="font-size: 14px;padding-left: 8px;margin-bottom: 8px;margin-left: 1px;">Booking Name <span class="text-danger">*</span></p>
                    <input type="text" style="width: 100%;" :class="[ErrorName ? 'empty-field' : 'input-field']"
                    v-model="bookingName" maxlength="100" @keyup="validateBookingName" placeholder="Enter booking name">
                </div>
                <div class="justify-content-center justify-content-sm-center justify-content-md-start" style="margin-top: 40px;">
                    <p class="fw-semibold" style="font-size: 14px;padding-left: 8px;margin-bottom: 8px;margin-left: 1px;">Booking Email <span class="text-danger">*</span></p>
                    <input type="text" placeholder="Enter booking email"
                    style="width: 100%;" :class="[ErrorEmail ? 'empty-field' : 'input-field']"
                    v-model="bookingEmail"
                    pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                    :disabled="isLogin"
                    @keyup="validateBookingEmail">
                    <p
                    class="error-message"
                    v-if="ErrorEmail"
                  >{{ ErrorEmail_message }}</p>
                </div>
                <div class="d-flex justify-content-center justify-content-sm-center justify-content-md-start" style="margin-top: 40px;">
                    <div style="width: 85%;margin-right: 22px;">
                        <p class="fw-semibold" style="font-size: 14px;padding-left: 8px;margin-bottom: 8px;margin-left: 1px;">Clinic <span class="text-danger">*</span></p>
                        <select v-model="eventCategoryId" @change="selectCategory" style="width: 100%" :class="[ErrorCategory ? 'empty-field' : 'input-field']">
                          <option value disabled selected>*** Select Clinic ***</option>
                          <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id">
                            {{ category.eventCategoryName }}
                          </option>
                        </select>
                    </div>
                    <div>
                        <p class="fw-semibold" style="font-size: 14px;padding-left: 8px;margin-bottom: 8px;margin-left: 1px;">Duration</p>
                        <div class="d-flex" style="padding-left: 6px;">
                        <input type="text" style="width: 35%;padding-left: 6px;" v-model="eventDuration"
                         class="input-field text-center" placeholder="100" disabled="">
                        <span class="d-lg-flex align-items-lg-center" style="font-size: 12px;padding-left: 11px;">min .</span></div>
                    </div>
                </div>
                <div class="justify-content-center justify-content-sm-center justify-content-md-start" style="margin-top: 40px;">
                    <p class="fw-semibold" style="font-size: 14px;padding-left: 8px;margin-bottom: 8px;margin-left: 1px;">Start Time <span class="text-danger">*</span></p>
                    <input type="datetime-local" style="width: 60%;" :class="[ErrorStartTime ? 'empty-field' : 'input-field']"
                      :min="`${minDatetimeLocal}`" v-model="eventStartTime" @change="validateEventStartTime">
                      <p
                        class="error-message"
                        v-if="ErrorStartTime"
                      >{{ ErrorStartTime_message }}</p>
                </div>
                <div class="justify-content-center justify-content-sm-center justify-content-md-start" style="margin-top: 40px;">
                    <p class="fw-semibold" style="font-size: 14px;padding-left: 8px;margin-bottom: 8px;margin-left: 1px;">Note</p>
                    <textarea type="text" rows="6" cols="50" maxlength="500" style="width: 100%;border-radius: 10px;background: var(--bs-gray-200);border-style: none;padding: 9px;padding-top: 7px;padding-bottom: 7px;padding-left: 16px;font-size: 13px;height: 78px;" 
                      v-model="eventNote" placeholder="Enter your note"></textarea>
                </div>
                <div class="justify-content-center justify-content-sm-center justify-content-md-start" style="margin-top: 19px;margin-bottom: 8px;">
                    <p class="fw-semibold" style="font-size: 14px;padding-left: 8px;margin-bottom: 8px;margin-left: 1px;">Attachment File</p>
                    <FilePond
                      ref="pond"
                      maxFileSize="10MB"
                      @change="onFileChanged($event)"
                      label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
                    />
                </div>
                <div @click="addEvent" class="justify-content-center justify-content-sm-center justify-content-md-start" style="margin-top: 19px;margin-bottom: 2px;"><button class="btn btn-primary fw-semibold" type="button" style="width: 100%;background: var(--bs-purple);border-radius: 100px;border-style: none;padding-top: 10px;padding-bottom: 10px;font-size: 14px;margin-bottom: 7px;">
                  BOOKING</button>
                </div>
            </div>
        </div>
    </div>

  </main>
</template>

<style scoped>

.left-box {
  background: url("../../assets/background/booking_bg.jpg") left / cover no-repeat;
  width: 42%;
  padding-right: 1px;
  padding-left: 0px;
  margin-right: 0px;
  /* border: 1px black solid; */
}
#addEvent-tp {
  margin-left: 27%;
  margin-top: 10%;
}

#addEvent-bg {
  margin-left: 32%;
  background-color: white;
  width: 60%;
  height: 100%;
  border-radius: 25px;
  margin-bottom: 3%;
}

#FillForm {
  margin-left: 1%;
  line-height: 60px;
}

.buttonStyle {
  align-items: center;
  font-size: 120%;
  background-color: #ed8d92;
  margin: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  margin-bottom: 2%;
}
.buttonStyle:hover {
  background-color: #d9f4a4;
}

input,
select,
.endTime {
  margin-left: 3%;
  background-color: #b9d0f0;
  border-radius: 7px;
  height: 40px;
  font-size: 100%;
}

/* input:focus {
  background-color: #d9f4a4;
} */

option {
  background-color: lavender;
}
option:hover {
  background-color: #b9d0f0;
}

label {
  font-weight: bold;
  font-size: 110%;
}

.inputHeading {
  font-weight: bold;
  font-size: 100%;
}
.empty-field {
  background: var(--bs-gray-200);
  border-radius: 100px;
  border-width: 0px;
  /* width: 100%; */
  padding: 9px;
  font-size: 13px;
  padding-left: 16px;
  padding-bottom: 7px;
  padding-top: 7px;
  margin-left: 0px;
  border: red 2px solid;
}

.input-field {
  background: var(--bs-gray-200);
  border-radius: 100px;
  border-width: 0px;
  /* width: 100%; */
  padding: 9px;
  font-size: 13px;
  padding-left: 16px;
  padding-bottom: 7px;
  padding-top: 7px;
  margin-left: 0px;
}

.error-message {
  color: rgb(208, 27, 27);
  font-size: 11px;
  margin-left: 13px;
  margin-top: 3px;
}

</style>
