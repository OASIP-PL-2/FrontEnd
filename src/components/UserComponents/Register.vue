<script setup>
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getUsers } from "../../Fetch/fetch_user.js";

const emits = defineEmits(["register"]);

//Button Back
const appRouter = useRouter();
const goBack = () =>
  appRouter.push({ name: "ShowUsers", params: { roles: "all" } });

//Attribute
let username = ref("");
let email = ref("");
let confirm_email = ref("");
let role = ref("student");
let password = ref("");
let confirm_password = ref("");

//showPassword
let showPassword = ref(false);
let showConfirmPassword = ref(false);
const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
const toggleShowConfirm = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

//Roles
let roles = ref(["student", "lecturer", "admin"]);

//Create User
let createUser = computed(() => {
  ErrorName.value = username.value.length == 0;
  ErrorEmail.value = email.value.length == 0;
  ErrorPassword.value = password.value.length == 0;
  ErrorConfirmEmail.value = confirm_email.value.length == 0 || email.value.trim() != confirm_email.value.trim();
  ErrorConfirmPassword.value = confirm_password.value.length == 0 || password.value.trim() != confirm_password.value.trim();

  if (
    ErrorName.value ||
    ErrorEmail.value ||
    ErrorConfirmEmail.value ||
    ErrorPassword.vaalue ||
    ErrorConfirmPassword.vaalue
  ) {
    return 0;
  } else {
    return {
      name: username.value,
      email: email.value,
      password: password.value,
      role: role.value
    };
  }
});

//Validate Username , Email
let format = /^(([^<>()[\]\\.,;:\s*$&!#?@"]+(\.[^<>()[\]\\.,;:\s*$&!#?@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//Show Error
let ErrorName = ref(false);
let ErrorEmail = ref(false);
let ErrorConfirmEmail = ref(false);
let ErrorPassword = ref(false);
let ErrorConfirmPassword = ref(false);
let ErrorName_message = ref("");
let ErrorEmail_message = ref("");
let ErrorPassword_message = ref("");

const validationName = () => {
  ErrorName.value = username.value.length == 0;
};
const validationEmail = () => {
  ErrorEmail.value = email.value.length == 0;
  if (!format.test(email.value.trim())) {
    ErrorEmail.value = true;
    ErrorEmail_message.value = "Format email is Invaild";
  }
};

const validationConfirmEmail = () => {
  ErrorConfirmEmail.value = confirm_email.value.length == 0;
};

const validationPassword = () => {
  ErrorPassword.value = password.value.length == 0;
  console.log(!(password.value.length >= 8 && password.value.length <= 16));
  if (!(password.value.length >= 8 && password.value.length <= 16)) {
    ErrorPassword.value = true;
    ErrorPassword_message.value = "Password must be between 8-16 character";
  }
};

const validationConfirmPassword = () => {
  ErrorConfirmPassword.value = confirm_password.value.length == 0;
};

</script>

<template>
  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header"
        style="background: var(--bs-modal-bg);height: 20px;padding-bottom: 12px;margin-bottom: -7px;"><button
          type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
      <div class="modal-body" style="padding-top: 23px;">
        <h5 class="float-end"
          style="color: var(--bs-yellow);margin-right: 0px;margin-left: 16px;width: 100px;font-size: 18px;"><span
            style="color: rgb(169, 169, 169);">or</span> <strong type="button" data-bs-target="#modal-2"
            data-bs-toggle="modal">Sign In</strong></h5>
        <h5 class="text-start" style="padding-top: 0px;padding-bottom: 0px;margin-bottom: 11px;">Register</h5><img
          class="rounded-circle img-fluid" src="../../assets/profile/7.png" width="100" height="100"
          style="margin-left: 0px;"><i class="fas fa-plus-circle fs-5 text-warning d-inline"
          style="margin-left: -22px;position: absolute;padding-top: 75px;"></i>
        <div class="row" style="margin-right: -5px;margin-left: -12px;margin-top: 7px;">
          <div class="col">
            <div class="vstack">
              <div class="col-auto"
                style="padding: 0px 0px;margin-right: 5px;margin-top: 3px;margin-bottom: 3px;margin-left: 5px;">
                <div class="row" style="margin-right: -5px;margin-left: -12px;margin-top: 7px;">
                  <div class="col">
                    <input type="text" placeholder="Username" @keyup="validationName" v-model="username" maxlength="100"
                      :class="[ErrorName ? 'empty-field' : 'input-field']" autofocus="" autocomplete="off">
                    <p class="error-message text-start" v-if="ErrorName">{{ ErrorName_message }}</p>

                    <input type="text" placeholder="Email" @keyup="validationEmail" v-model="email" maxlength="100"
                      :class="[ErrorEmail ? 'empty-field' : 'input-field']" autofocus="">
                    <p class="error-message text-start" v-if="ErrorEmail">{{ ErrorEmail_message }}</p>
                  </div>
                </div>
                <div class="row" style="margin-right: -5px;margin-left: -12px;margin-top: 7px;">
                  <div class="col input-icons">
                    <input v-if="!showPassword" type="password" placeholder="Password" v-model="password"
                      @keyup="validationPassword" autofocus="" minlength="8" maxlength="16"
                      :class="[ErrorPassword ? 'empty-field' : 'input-field']" aria-describedby="basic-addon2">
                    <input v-if="showPassword" type="text" placeholder="Password" v-model="password"
                      @keyup="validationPassword" autofocus="" minlength="8" maxlength="16"
                      :class="[ErrorPassword ? 'empty-field' : 'input-field']" aria-describedby="basic-addon2">
                    <i class="fas icon" @click="toggleShow" :class="{
                      'fa-eye-slash': !showPassword,
                      'fa-eye': showPassword,
                    }"></i>
                  </div>
                  <p class="error-message text-start" v-if="ErrorPassword">{{ ErrorPassword_message }}</p>
                </div>
                <div class="row" style="margin-right: -5px;margin-left: -12px;margin-top: 7px;">
                  <div class="col input-icons">
                    <input v-if="!showConfirmPassword" type="password" placeholder="Confirm Password" v-model="confirm_password"
                      @keyup="validationConfirmPassword" autofocus="" minlength="8" maxlength="16"
                      :class="[ErrorConfirmPassword ? 'empty-field' : 'input-field']" aria-describedby="basic-addon2">
                    <input v-if="showConfirmPassword" type="text" placeholder="Confirm Password" v-model="confirm_password"
                      @keyup="validationConfirmPassword" autofocus="" minlength="8" maxlength="16"
                      :class="[ErrorConfirmPassword ? 'empty-field' : 'input-field']" aria-describedby="basic-addon2">
                    <i class="fas icon" @click="toggleShowConfirm" :class="{
                      'fa-eye-slash': !showConfirmPassword,
                      'fa-eye': showConfirmPassword,
                    }"></i>
                  </div>
                  <p class="error-message text-start" v-if="ErrorConfirmPassword">Password didn't matching</p>
                </div>
                <select v-model="role"
                  style="width: 230px;margin-bottom: 10px;border-radius: 7px;padding-left: 4px;border-style: solid;border-color: var(--bs-gray-500);"
                  autofocus="">
                  <optgroup label="Roles">
                    <option value disabled selected>Select role</option>
                    <option v-for="(role, index) in roles" :key="index" :value="role">{{ role }}</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </div><button @click="$emit('register', createUser)" class="btn btn-primary btn-lg border rounded-pill float-none" type="button"
          style="background: var(--bs-yellow);margin-top: 10px;width: 260px;">Register</button>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>

  <!-- <div class="mx-auto">
    <div class="flex justify-center px-6 my-12">
      <div class="flex w-full xl:w-3/4 lg:w-11/12">
        <div class="hidden w-full h-auto bg-gray-400 bg-cover rounded-l-lg lg:block lg:w-5/12" style="
            background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800');
          "></div>

        <div class="w-full p-5 bg-white rounded-lg lg:w-7/12 lg:rounded-l-none">
          <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
          <div class="mb-4 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">Username</label>
              <input @keyup="validationName" v-model="username" maxlength="100"
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                :class="{ 'empty-field': ErrorName }" id="firstName" type="text" placeholder="Username" />
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorName">{{ ErrorName_message }}</p>
            </div>
          </div>

          <div class="mb-4 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="password">Email</label>
              <input type="email"
                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Email" @keyup="validationEmail" v-model="email" :class="{ 'empty-field': ErrorEmail }"
                maxlength="50" />
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmail">{{ ErrorEmail_message }}</p>
            </div>
            <div class="md:ml-2">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">Confirm Email</label>
              <input type="email" @keyup="validationConfirmEmail"
                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                :class="{ 'empty-field': ErrorConfirmEmail }" placeholder="Confirm your email"
                v-model="confirm_email" />
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorConfirmEmail">Email didn't matching</p>
            </div>
          </div>

          <div class="mb-4 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="password">Password</label>
              <input v-if="showPassword" type="text" @keyup="validationPassword" minlength="8" maxlength="16" required
                class="w-9/12 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                :class="{ 'empty-field': ErrorPassword }" placeholder="******************" v-model="password" />
              <input v-if="!showPassword" type="password" @keyup="validationPassword" minlength="8" maxlength="16"
                required
                class="w-9/12 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                :class="{ 'empty-field': ErrorPassword }" placeholder="******************" v-model="password" />
              <button
                class="flex-1 w-2/12 px-2 py-1.5 ml-1 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                @click="toggleShow">
                <span class="icon is-small is-right">
                  <i class="fas" :class="{
                    'fa-eye-slash': !showPassword,
                    'fa-eye': showPassword,
                  }"></i>
                </span>
              </button>
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorPassword">{{ ErrorPassword_message }}</p>
            </div>
            <div class="md:ml-2">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">Confirm Password</label>
              <input v-if="showConfirmPassword" type="text" @keyup="validationConfirmPassword" minlength="8"
                maxlength="16" required
                class="w-9/12 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                :class="{ 'empty-field': ErrorConfirmPassword }" placeholder="******************"
                v-model="confirm_password" />
              <input v-if="!showConfirmPassword" type="password" @keyup="validationConfirmPassword" minlength="8"
                maxlength="16" required
                class="w-9/12 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                :class="{ 'empty-field': ErrorConfirmPassword }" placeholder="******************"
                v-model="confirm_password" />
              <button
                class="flex-1 w-2/12 px-2 py-1.5 ml-1 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                @click="toggleShowConfirm">
                <span class="icon is-small is-right">
                  <i class="fas" :class="{
                    'fa-eye-slash': !showConfirmPassword,
                    'fa-eye': showConfirmPassword,
                  }"></i>
                </span>
              </button>
              <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorConfirmPassword">Password didn't matching</p>
            </div>
          </div>
          <div class="mb-4 md:mr-2 md:mb-0">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">Role</label>
            <select v-model="role">
              <option value disabled selected>Select Role</option>
              <option v-for="(role, index) in roles" :key="index" :value="role">{{ role }}</option>
            </select>
          </div>
          <div class="mb-6 text-center">
            <button
              class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button" @click="$emit('register', createUser)">Register Account</button>
          </div>
          <hr class="mb-6 border-t" />
          <div class="text-xs text-center hover:underline">
            <router-link :to="{ name: 'Login' }">Already have an account? Login!</router-link>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style scoped>
.empty-field {
  margin-bottom: 7px;
  width: 260px;
  padding: 1px;
  height: 40px;
  border-radius: 7px;
  padding-left: 4px;
  margin-left: 0px;
  border: red 2px solid;
}

.input-field {
  margin-bottom: 7px;
  width: 260px;
  padding: 1px;
  height: 40px;
  border-radius: 7px;
  padding-left: 4px;
  border-style: solid;
  border-color: var(--bs-gray-500);
  margin-left: 0px;
}

.input-icons i {
  position: absolute;
}

.icon {
  z-index: 99;
  margin-left: 110px;
  margin-top: -34px;
  /* padding: 1px; */
  /* min-width: 50px; */
  /* text-align: center; */
}

.error-message {
  color: rgb(208, 27, 27);
  font-size: 13px;
  margin-left: 4px;
}
</style>
