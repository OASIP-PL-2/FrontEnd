<script setup>
    import { ref, onMounted, computed, onUpdated} from "vue";
    import { useRouter } from "vue-router";
    import { getEvents } from '../../Fetch/fetch_event.js'
    import { getCategories } from '../../Fetch/fetch_category.js'
    const events = ref([]);
    const categories = ref([]);
    const appRouter = useRouter();
    const goBack = () => appRouter.go(-1);
    
    onMounted(async () => {
        events.value = await getEvents();
        categories.value = await getCategories();
    });
    
    /* ------------------------------------------------------------------------------------ */
    //ตัวแปรจาก v-model
    const bookingName = ref("");
    const bookingEmail = ref("");
    const eventCategoryId = ref("");
    const eventDuration = computed(() => {
      if (eventCategoryId.value == "") {
        return 0;
      } else {
        return categories.value.filter(
          (category) => category.id == eventCategoryId.value
        )[0].eventDuration;
      }
    });
    const eventStartTime = ref("");
    
    const eventNote = ref("");
    
    // clear form func.
    const clearForm = () => {
      bookingName.value = "";
      bookingEmail.value = "";
      eventCategoryId.value = "";
      eventDuration.value = "";
      eventStartTime.value = "";
      eventNote.value = "";
    };
    
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
    
    //หา eventEndTime
    const getEndTime = (eventStartTime, eventDuration) => {
      const startTime = new Date(eventStartTime);
      const endTime = new Date(eventStartTime);
      endTime.setMinutes(startTime.getMinutes() + eventDuration);
      console.log(eventDuration);
      return endTime;
    };
    
    //ไปเรียกใช้ computed ทุกครั้งที่มีการ update
    const validEmail = ref("");
    onUpdated(() => {
      console.log("onUpdate working");
      startTime.value;
      overlapTime.value;
      validEmail.value = validateEmail(bookingEmail.value);
      console.log(validateEmail(bookingEmail.value));
      console.log(validEmail.value);
    });
    
    /* ------------------------------------------------------------------------------------ */
    
    //ฟังก์ชันที่เปลี่ยนค่า dateTime ไปเป็น format ที่ backend สามารถอ่านค่าได้
    const changeFormat = (eventStartTime) => {
      const dateTime = new Date(eventStartTime);
      return `${dateTime.toLocaleString("en-GB")}`;
    };
    
    //ฟังก์ชันที่เปลี่ยนค่า dateTime ไปเป็น format ที่เช็ค overlap
    const changeFormatOverlap = (eventStartTime) => {
      const dateTime = new Date(eventStartTime);
      return dateTime;
    };
    
    const overlap = ref(false);
    const overlapTime = computed(() => {
      console.log(eventStartTime.value);
      const newStartTime = changeFormatOverlap(eventStartTime.value);
      console.log(newStartTime);
      const newEndTime = getEndTime(eventStartTime.value, eventDuration.value);
      console.log(newEndTime);
    
      for (const event of events.value) {
        if (event.eventCategoryId.id == eventCategoryId.value) {
          console.log("ใช่");
          const eventStartTime = changeFormatOverlap(event.eventStartTime);
          console.log(eventStartTime);
          const eventEndTime = getEndTime(
            event.eventStartTime,
            event.eventDuration
          );
          console.log(eventEndTime);
    
          const check = eventStartTime < newEndTime && eventEndTime > newStartTime;
          console.log(`time overlap is ${check}`);
          overlap.value = check;
          console.log(overlap.value);
          if (overlap.value == true) {
            console.log("time is overlap");
            break;
          }
        }
      }
      return overlap.value;
    });
    
    /* ------------------------------------------------------------------------------------ */
    //เวลากด button create มันจะมาทํา function นี้ คือสร้าง object ของ ข้อมูลที่ add
    //แล้วไปเรียก function addEventToDB เพื่อทําการ add ข้อมูล
    const addEvent = () => {
      const newEvent = {
        bookingEmail: bookingEmail.value,
        bookingName: bookingName.value,
        eventCategoryId: eventCategoryId.value,
        eventDuration: eventDuration.value,
        eventNote: eventNote.value,
        eventStartTime: changeFormat(eventStartTime.value),
      };
      console.log(newEvent);
      addEventToDB(newEvent);
    };
    
    /* ----------------------- */
    //ทําการ add ข้อมูลลง db
    const addEventToDB = async (newEvent) => {
      startTime.value;
      // console.log(validateFuture.value);
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/events`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('user'),
        },
        body: JSON.stringify(newEvent),
      });
      console.log(res.status);
      if (validateFuture.value == true) {
        return alert("sorry, cannot be added : Time is a past");
      } else if (overlap.value == true) {
        return alert("sorry, cannot be add+ed : Time is overlap");
      } else if (
        errorBookingName.value != "" ||
        errorBookingEmail.value != "" ||
        errorEventNote.value != "" ||
        validateEventStartTime.value != "" ||
        validateCategoryId.value != ""
      ) {
        return alert("sorry, please fill correct information");
      } else if (res.status === 201) {
        alert("booking successfully");
        goBack();
        // window.location.reload();
      } else {
        console.log("error, cannot be added");
        alert("sorry, cannot be booking");
      }
    };
    
    //validation
    const errorBookingName = ref("* Please type name");
    const errorBookingEmail = ref("* Please type email");
    const errorEventNote = ref("");
    
    const validateEventStartTime = computed(() => {
      return eventStartTime.value === "" ? "* Please Select StartTime" : "";
    });
    const validateCategoryId = computed(() => {
      return eventCategoryId.value === "" ? "* Please Select Clinic" : "";
    });
    const validateBookingName = () => {
      errorBookingName.value =
        bookingName.value === ""
          ? "* The Input field is required"
          : "" || bookingName.value.length > 100
          ? "* bookingName can not be more than 100 character"
          : "";
      console.log(bookingName.value.length);
    };
    const validateBookingEmail = () => {
      errorBookingEmail.value =
        bookingEmail.value === ""
          ? "* The Input field is required"
          : "" || validEmail.value == null
          ? "* please type correct format email"
          : "";
    };
    const validateEventNote = () => {
      errorEventNote.value =
        eventNote.value.length >= 500
          ? "* EventNote cannot be more than 500 character"
          : "";
    };
    
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
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
        <div class="container px-6 mx-auto">
          <h2 class="mt-3 mb-5 text-4xl font-bold text-white">Add New Event :</h2>
    
          <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      
            <div class="relative px-4 py-10 mx-8 bg-white shadow md:mx-0 rounded-3xl sm:p-10">
              <div class="max-w-lg mx-auto -mt-7">
                <div class="divide-y divide-gray-200">
                  <div class="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                    <!-- name input -->
                    <div class="flex flex-col">
                      <label class="leading-loose">Booking Name :</label>
                      <input
                        type="text"
                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                        placeholder="Enter your name/group name"
                        v-model="bookingName"
                        @keyup="validateBookingName"
                        @blue="validateBookingName"
                      />
                      <p class="ml-2 text-xs text-right text-red-700" v-if="errorBookingName">
                        {{ errorBookingName }}
                      </p>
                    </div>
    
                    <!-- email input -->
                    <div class="flex flex-col">
                      <label class="leading-loose">Email :</label>
                      <input
                        type="text"
                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                        placeholder="Enter your email"
                        v-model="bookingEmail"
                        pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                        @keyup="validateBookingEmail"
                        @blue="validateBookingEmail"
                      />
                      <p class="ml-2 text-xs text-right text-red-700" v-if="errorBookingEmail">
                        {{ errorBookingEmail }}
                      </p>
                    </div>
    
                    <!-- clinic input -->
                    <div class="flex flex-col">
                      <label class="leading-loose">Clinic :</label>
                      <div>
                        <select v-model="eventCategoryId">
                          <option value="" disabled selected> *** Select Clinic *** </option>
                          <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.eventCategoryName }}
                          </option>
                        </select>
                        <span class="ml-3 font-bold">
                          Duration :
                          <input type="type" v-model="eventDuration" style="width: 100px" class="text-center" :disabled="true"/>
                          min
                        </span>
                        <p class="ml-2 text-xs text-red-700" v-if="validateCategoryId">
                          {{ validateCategoryId }}
                        </p>
                      </div>
                    </div>
    
                    <!-- startTime input -->
                    <div class="flex items-center space-x-4">
                      <div class="flex flex-col col-7">
                        <label class="leading-loose">Start Time :</label>
                        <input
                          type="datetime-local"
                          :min="`${minDatetimeLocal}`"
                          v-model="eventStartTime"
                          class="w-full py-2 pl-3 pr-4 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                        />
    
                        <!-- startTime validate -->
                        <span class="relative text-gray-400 focus-within:text-gray-600">
                          <p class="ml-2 text-xs text-red-700" v-if="validateEventStartTime">
                            {{ validateEventStartTime }}
                          </p>
                          <p class="ml-2 text-xs text-red-700" v-if="overlap">
                            Time is overlap
                          </p>
                          <p class="ml-2 text-xs text-red-700" v-if="validateFuture">
                            Time is a past time
                          </p>
                        </span>
                      </div>
                    </div>
    
                    <!-- event note input -->
                    <div class="flex items-center space-x-4">
                      <div class="flex flex-col">
                        <label class="leading-loose">Note :</label>
                        <textarea
                          type="text"
                          rows="4"
                          cols="50"
                          maxlength="500"
                          class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                          placeholder="Note"
                          v-model="eventNote"
                          @keyup="validateEventNote"
                          @blue="validateEventNote"
                        ></textarea>
                        <span class="text-xs text-right text-red-700" v-if="errorEventNote">
                          {{ errorEventNote }}
                        </span>
                      </div>
                    </div>
                  </div>
    
                  <!-- button -->
                  <div class="flex items-center pt-4 space-x-4">
                    <!-- <router-link :to="{ name: 'ShowEvent' , params: { time: 'All' }}" > -->
                    <button @click="goBack" class="flex items-center justify-center w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none hover:bg-red-500">
                      <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Cancel
                    </button>
                    <!-- </router-link> -->
                    <button @click="addEvent" class="flex items-center justify-center w-full px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>
    
    <style scoped>
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
      margin-left: 8%;
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
    
    input:focus {
      background-color: #d9f4a4;
    }
    
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
    </style>
    