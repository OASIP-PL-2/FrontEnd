<script setup>
import { ref, onBeforeMount, onUnmounted, onBeforeUpdate } from "vue";
import { editUserDetail } from '../../Fetch/fetch_user.js'
const props = defineProps({
  users: {
    type: Array,
    require: true
  },
  user: {
    type: Object,
    require: true
  },
  showEditForm: {
    type: Number,
    require: true
  }
});

const emit = defineEmits(["closeEditEvent"]);

const filterUsers = ref([])
onBeforeMount(async () => {
  filterUsers.value = props.users.filter((user) => user.id != props.user.id)
});


const username = ref(props.user.name);
const email = ref(props.user.email);
const role = ref(props.user.role);
const roles = ["admin", "lecturer", "student"];
const showEditForm = ref(props.showEditForm);

// const ErrorNameNull = ref(false);
// const ErrorNameUnique = ref(false)
// const ErrorEmailNull = ref(false);
// const ErrorEmailUnique = ref(false)
// const ErrorEmailFormat = ref(false)

let ErrorName = ref(false);
let ErrorEmail = ref(false);
let ErrorName_message = ref("");
let ErrorEmail_message = ref("");


const validationName = () => {
  ErrorName.value = username.value == null || username.value == ''
  console.log(filterUsers.value);
  if (filterUsers.value.map((user) => { return user.name.trim() }).includes(username.value.trim())) {
    console.log("เข้า");
    ErrorName.value = true
    ErrorName_message.value = "Username is already used"
  }
}

let format = /^(([^<>()[\]\\.,;:\s*$&!#?@"]+(\.[^<>()[\]\\.,;:\s*$&!#?@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validationEmail = () => {
  ErrorEmail.value = email.value == null || email.value == ''
  if (!format.test(email.value.trim())) {
    ErrorEmail.value = true;
    ErrorEmail_message.value = "Format email is Invaild";
  } else if (filterUsers.value.map((user) => { return user.email.trim() }).includes(email.value.trim())) {
    ErrorEmail.value = true
    ErrorEmail_message.value = "Email is already used"
  }
}


const validateEmailFormat = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s*$&!#?@"]+(\.[^<>()[\]\\.,;:\s*$&!#?@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(String(email))
}

// EDIT
const userToEdit = ref({});


const editingUser = () => {
  ErrorName.value = username.value == null || username.value == ''
  ErrorEmail.value = email.value == null || email.value == ''

  if (username.value == props.user.name && email.value == props.user.email && role.value == props.user.role) {
    Swal.fire({
      title: 'Sorry, there are no changes in this editing !',
      text: "Do you want to continue or cancel this editing?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue editing !',
    }).then((result) => {
      if (!result.isConfirmed) {
        return emit('closeEditUser')
    }
  })
  } else if (ErrorEmail.value || ErrorName.value) {
    return 0;
  } else {
    userToEdit.value = {
      name: username.value,
      email: email.value,
      role: role.value
    };
    console.log(userToEdit.value);
    editUserDetail(userToEdit.value, props.user.id)
  }
};

const closeEditForm = e => {
  console.log(e.target.className);
  if(e.target.className == 'overlay') {
    emit('closeEditUser')
  }
}

</script>

<template>
  <main class="w-5/12 my-8">
    <div id="popup1" class="overlay" @click="closeEditForm($event)">
      <div class="popup">
        <div class="content">
          <div style="border-style: none;margin-bottom: -8px;text-align: right;padding: 5px" >
            <button type="button" class="btn-close" aria-label="Close" @click="$emit('closeEditUser')"></button>
          </div>
          <div class="text-center d-block"
            style="margin-top: 25px;margin-bottom: 12px;text-align: center;padding-left: 30px;padding-right: 22px;">
            <div class="row">
              <div class="col" style="margin-bottom: 9px;border-color: var(--bs-orange);">
                <p
                  style="text-align: left;font-weight: bold;font-size: 20px;margin-bottom: 4px;border-left: 0px solid #f5bb0e;padding-left: 0px;">
                  EDIT USER</p>
                <hr
                  style="background: #f5bb0e;opacity: 0.60;margin-top: 0px;width: 50px;border-width: 4px;border-color: #633a11;">
              </div>
            </div>
            <div class="row">
              <div class="col" style="text-align: left;margin-bottom: 15px;">
                <p style="margin-bottom: 7px;font-size: 13px;padding-left: 5px;">Username <span class="text-danger">*</span></p>
                <input type="text" :class="[ErrorName ? 'empty-field' : 'input-field']" style="" @keyup="validationName"
                  v-model="username" maxlength="100" :placeholder=user.name>
                <p class="error-message text-start" v-if="ErrorName">{{ ErrorName_message }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col" style="text-align: left;margin-bottom: 15px;">
                <p style="margin-bottom: 6px;font-size: 13px;padding-left: 5px;">Email <span class="text-danger">*</span></p>
                <input type="text" :class="[ErrorEmail ? 'empty-field' : 'input-field']" @keyup="validationEmail"
                  v-model="email" maxlength="50" :placeholder=user.email>
                <p class="error-message text-start" v-if="ErrorEmail">{{ ErrorEmail_message }}</p>
              </div>
            </div>
            <div class="row" style="margin-bottom: 23px;">
              <div class="col" style="text-align: left;margin-bottom: 8px;">
                <p style="margin-bottom: 6px;font-size: 13px;padding-left: 5px;">Role</p>
                <select v-model="role"
                  style="padding: 5px;border-radius: 100px;padding-right: 10px;padding-left: 10px;font-size: 12px;width: 40%;">
                  <option value="" selected="" disabled>Select Roles</option>
                  <option v-for="(eachRole, index) in roles" :key="index" :value="eachRole">{{ eachRole }}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col" style="text-align: right;margin-bottom: 8px;padding-left: 6px;padding-right: 28px;">
                <button @click="editingUser" class="btn btn-primary btn-sm fw-semibold" type="button"
                  style="margin-left: 5px;background: var(--bs-yellow);border-width: 0px;border-left-width: 0px;border-radius: 100px;padding: 8px;padding-right: 15px;padding-left: 15px;padding-bottom: 6px;padding-top: 6px;width: 30%;height: 37px;">SAVE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="edit-container" class="px-6 detail-container" v-show="showEditForm == 1">
      <div
        class="{`col-12 overflow-auto h-5/6 top-24 bottom-40 rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}"
      >

        <nav class="max-h-screen py-2 rounded-t-lg bg-neutral-800 lg:w-12/12">
          <span class="text-2xl font-bold text-justify ml-7 text-zinc-100 col-7">Edit User :</span>
          <button @click="$emit('closeEditUser')" id="closeDetail" class="mt-1 col-12">
            <img src="../../assets/close.png" />
          </button>
        </nav>

        <div class="overflow-hidden bg-center bg-cover shadow-lg col-12 bg-zinc-100">
          <div class="grid gap-6 px-10 mx-16 my-10 mb-6 lg:grid-cols-2">

            <div class="flex flex-col">
              <label class="leading-loose">Username :</label>
              <input
                type="text"
                class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                placeholder="Enter your name/group name"
                @keyup="validationName"
                v-model="username"
                maxlength="100"
              />
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorNameNull"> Please enter username </p>
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorNameUnique"> Username is already used </p>
            </div>

            <div class="flex flex-col">
              <label class="leading-loose">Email :</label>
              <input
                type="text"
                class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                placeholder="Enter your email"
                @keyup="validationEmail"
                v-model="email"
                maxlength="50"
              />
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmailNull"> Please enter email </p>
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmailUnique"> Email is already used </p>
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmailFormat"> Please enter the correct email </p>
            </div>
            <div>
              <h2 class="mb-2 text-base font-semibold text-gray-900">
                Role :
                <select v-model="role" class="rounded-lg">
                  <option value disabled selected>Select Role</option>
                  <option
                    v-for="(eachRole, index) in roles"
                    :key="index"
                    :value="eachRole"
                  >{{ eachRole }}</option>
                </select>
              </h2>
            </div>
          </div>

          <div class="float-right mr-20">
            <button
              @click="editingUser"
              class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Save</button>
          </div>
        </div>
      </div>
    </div> -->
  </main>
</template>

<style scoped>
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
  margin: 8% auto;
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
  overflow: auto;
}

@media screen and (max-width: 700px) {
  .box {
    width: 70%;
  }
  .popup {
    width: 70%;
  }
}

#edit-container {
  position: absolute;
  left: 25%;
  line-height: 10px;
  width: 3000%;
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
  background-color: #b9d0f0;
  border-radius: 7px;
  width: 100%;
  height: 45px;
  font-size: 100%;
}

input:focus {
  background-color: rgb(216 180 254);
}

.error-message {
  color: red;
  font-size: 11px;
  margin-top: 3px;
  margin-left: 15px;
}
.empty-field {
  background: var(--bs-gray-200);
  border-radius: 100px;
  border-width: 0px;
  width: 90%;
  padding: 5px;
  padding-left: 16px;
  font-size: 13px;
  border: red 2px solid;
}

.input-field {
  background: var(--bs-gray-200);
  border-radius: 100px;
  border-width: 0px;
  width: 90%;
  padding: 5px;
  padding-left: 16px;
  font-size: 13px;
  border: white 2px solid;
}
</style>
