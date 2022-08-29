<script setup>
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

defineEmits(["SignUpUser"]);

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
let roless = ref();

//Get User
const users = ref([]);
const getUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users`);
    if (res.status === 200) {
        users.value = await res.json();
    } else console.log("error, cannot get data");
};
onMounted(async () => {
    await getUsers();
});

//Create User
let createUser = computed(() => {
    ErrorConfirmEmail.value = false;
    ErrorConfirmPassword.value = false;
    if (
        username.value.length == 0 ||
        email.value.length == 0 ||
        password.value == 0
    ) {
        ErrorName.value = username.value.length == 0;
        ErrorName_message.value = "Please enter username";
        ErrorEmail.value = email.value.length == 0;
        ErrorEmail_message.value = "Please enter email";
        ErrorPassword.value = password.value.length == 0;
        ErrorPassword_message.value = "Please enter password";
        return 0;
    } else if (validation()) {
        return 0;
    } else if (
        email.value.trim() != confirm_email.value.trim() ||
        password.value.trim() != confirm_password.value.trim()
    ) {
        if (email.value.trim() != confirm_email.value.trim()) {
            ErrorConfirmEmail.value = true;
        }
        if (password.value.trim() != confirm_password.value.trim()) {
            ErrorConfirmPassword.value = true;
        }
        return 0;
    } else {
        console.log("correct");
        setTimeout(() => {
            goBack();
        }, 500);
        return {
            name: username.value,
            email: email.value,
            password: password.value,
            role: role.value,
        };
    }
});

//Validate Username , Email
let format =
    /^(([^<>()[\]\\.,;:\s*$&!#?@"]+(\.[^<>()[\]\\.,;:\s*$&!#?@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let validation = () => {
    if (
        users.value
            .map((user) => {
                return user.name.trim();
            })
            .includes(username.value.trim()) ||
        users.value
            .map((user) => {
                return user.email.trim();
            })
            .includes(email.value.trim()) ||
        !format.test(email.value)
    ) {
        return true;
    } else if (!format.test(email.value)) {
        return true;
    }
    return false;
};

//Show Error
let ErrorName = ref(false);
let ErrorEmail = ref(false);
let ErrorConfirmEmail = ref(false);
let ErrorPassword = ref(false);
let ErrorConfirmPassword = ref(false);
let ErrorName_message = ref("");
let ErrorEmail_message = ref("");
let ErrorPassword_message = ref("");

let showError = () => {
    ErrorName.value = users.value
        .map((user) => {
            return user.name.trim();
        })
        .includes(username.value.trim());
    if (ErrorName.value) {
        ErrorName_message.value = "Username is already used";
    }
    ErrorEmail.value = users.value
        .map((user) => {
            return user.email.trim();
        })
        .includes(email.value.trim());
    if (format.test(email.value.trim())) {
        if (ErrorEmail.value) {
            ErrorEmail_message.value = "Email is already used";
        }
    } else if (email.value == "") {
        ErrorEmail.value = false;
    } else {
        ErrorEmail_message.value = "Format email is Invaild";
        ErrorEmail.value = true;
    }
    if (password.value.length >= 8 || password.value.length == 0) {
        ErrorPassword.value = false;
        ErrorPassword_message.value = "";
    } else {
        ErrorPassword_message.value = "Password must be between 8-16 character";
        ErrorPassword.value = true;
    }
};
</script>

<template>
    <div class="mx-auto">
        <div class="flex justify-center px-6 my-12">
            <!-- Row -->
            <div class="flex w-full xl:w-3/4 lg:w-11/12">
                <!-- Col -->
                <div class="hidden w-full h-auto bg-gray-400 bg-cover rounded-l-lg lg:block lg:w-5/12" style="
            background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800');
          "></div>
                <!-- Col -->
                <div class="w-full p-5 bg-white rounded-lg lg:w-7/12 lg:rounded-l-none">
                    <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
                    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                        <div class="mb-4 md:flex md:justify-between">
                            <div class="mb-4 md:mr-2 md:mb-0">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                    Username
                                </label>
                                <input @keyup="showError" v-model="username" maxlength="100"
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="firstName" type="text" placeholder="Username" />
                                <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorName">
                                    {{ ErrorName_message }}
                                </p>
                            </div>
                            <!-- <div class="md:ml-2">
									<label class="block mb-2 text-sm font-bold text-gray-700" for="lastName">
										Role
									</label>
									<input
										class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="lastName"
										type="text"
										placeholder="Last Name"
									/>
								</div> -->
                        </div>

                        <div class="mb-4 md:flex md:justify-between">
                            <div class="mb-4 md:mr-2 md:mb-0">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                                    Email
                                </label>
                                <input type="email"
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password" placeholder="Email" @keyup="showError" v-model="email"
                                    maxlength="50" />
                                <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmail">
                                    {{ ErrorEmail_message }}
                                </p>
                            </div>
                            <div class="md:ml-2">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                                    Confirm Email
                                </label>
                                <input type="email"
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="c_password" placeholder="Confirm your email" v-model="confirm_email" />
                                <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorConfirmEmail">
                                    Email didn't matching
                                </p>
                            </div>
                        </div>

                        <div class="mb-4 md:flex md:justify-between">
                            <div class="mb-4 md:mr-2 md:mb-0">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                                    Password
                                </label>
                                <input v-if="showPassword" type="text" @keyup="showError" minlength="8" maxlength="16"
                                    required
                                    class="w-9/12 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password" placeholder="******************" v-model="password" />
                                <input v-else="showPassword" type="password" @keyup="showError" minlength="8"
                                    maxlength="16" required
                                    class="w-9/12 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password" placeholder="******************" v-model="password" />
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
                                <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorPassword">
                                    {{ ErrorPassword_message }}
                                </p>
                            </div>
                            <div class="md:ml-2">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                                    Confirm Password
                                </label>
                                <input v-if="showConfirmPassword" type="text" minlength="8" maxlength="16" required
                                    class="w-9/12 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password" placeholder="******************" v-model="confirm_password" />
                                <input v-else="showConfirmPassword" type="password" minlength="8" maxlength="16"
                                    required
                                    class="w-9/12 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password" placeholder="******************" v-model="confirm_password" />
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
                                <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorConfirmPassword">
                                    Password didn't matching
                                </p>
                            </div>
                        </div>
                        <div class="mb-4 md:mr-2 md:mb-0">
                            <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                Role
                            </label>
                            <select v-model="role">
                                <option value="" disabled selected>Select Role</option>
                                <option v-for="(role, index) in roles" :key="index" :value="role">
                                    {{ role }}
                                </option>
                            </select>

                        </div>
                        <div class="mb-6 text-center">
                            <button
                                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="button" @click="$emit('SignUpUser', createUser)">
                                Register Account
                            </button>
                        </div>
                        <hr class="mb-6 border-t" />
                        <!-- <div class="text-center">
								<a
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="#"
								>
									Forgot Password?
								</a>
							</div> -->
                        <div class="text-xs text-center hover:underline">
                            <router-link :to="{ name: 'Login' }">Already have an account? Login! </router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- <main class="my-8">
        <div class="container px-6 mx-auto">
            <h2 class="mt-3 mb-5 ml-8 text-4xl font-bold text-black">Sign Up :</h2> -->
    <!-- Sign up box -->
    <!-- <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div class="relative px-4 py-10 mx-8 bg-white shadow md:mx-0 rounded-3xl sm:p-10">
                    <div class="max-w-lg mx-auto -mt-7">
                        <div class="divide-y divide-gray-200">
                            <div class="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"> -->
    <!-- Name input -->
    <!-- <div class="flex flex-col">
                                    <label class="leading-loose">Username :</label>
                                    <input type="text"
                                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                        placeholder="Enter your name/group name" @keyup="showError" v-model="username"
                                        maxlength="100" />
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorName">
                                        {{ ErrorName_message }}
                                    </p>
                                </div> -->

    <!-- Email input -->
    <!-- <div class="flex flex-col">
                                    <label class="leading-loose">Email :</label>
                                    <input type="text"
                                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                        placeholder="Enter your email" @keyup="showError" v-model="email"
                                        maxlength="50" />
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmail">
                                        {{ ErrorEmail_message }}
                                    </p>
                                    <label class="mt-3 leading-loose">Confirm Email :</label>
                                    <input type="text"
                                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                        placeholder="Confrim your email" v-model="confirm_email" />
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorConfirmEmail">
                                        Email didn't matching
                                    </p>
                                </div> -->

    <!-- Password input -->
    <!-- <div class="flex flex-col">
                                    <label class="mt-3 leading-loose">Password :</label>
                                    <div class="flex">
                                        <input v-if="showPassword" type="text" @keyup="showError" minlength="8"
                                            maxlength="16" required
                                            class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md flex-3 focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                            placeholder="Enter your password" v-model="password" />
                                        <input v-else type="password"
                                            class="w-11/12 px-4 py-2 text-gray-600 border border-gray-300 rounded-md flex-3 focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                            placeholder="Enter your password" @keyup="showError" minlength="8"
                                            maxlength="16" required v-model="password" />
                                        <button
                                            class="flex-1 w-1/12 px-2 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                            @click="toggleShow">
                                            <span class="icon is-small is-right">
                                                <i class="fas" :class="{
                                                    'fa-eye-slash': !showPassword,
                                                    'fa-eye': showPassword,
                                                }"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorPassword">
                                        {{ ErrorPassword_message }}
                                    </p> -->
    <!-- Confirm Password input -->
    <!-- <label class="mt-3 leading-loose">Confirm Password :</label>
                                    <div class="flex">
                                        <input v-if="showConfirmPassword" type="text" minlength="8" maxlength="16"
                                            required
                                            class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md flex-3 focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                            placeholder="Confirm your password" v-model="confirm_password" />
                                        <input v-else type="password"
                                            class="w-11/12 px-4 py-2 text-gray-600 border border-gray-300 rounded-md flex-3 focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                            placeholder="Confirm your password" minlength="8" maxlength="16" required
                                            v-model="confirm_password" />
                                        <button
                                            class="flex-1 w-1/12 px-2 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                            @click="toggleShowConfirm">
                                            <span class="icon is-small is-right">
                                                <i class="fas" :class="{
                                                    'fa-eye-slash': !showConfirmPassword,
                                                    'fa-eye': showConfirmPassword,
                                                }"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorConfirmPassword">
                                        Password didn't matching
                                    </p>
                                </div> -->

    <!-- Role select -->
    <!-- <div class="flex flex-col">
                                    <label class="leading-loose">Role :</label>
                                    <div>
                                        <select v-model="role">
                                            <option value="" disabled selected>Select Role</option>
                                            <option v-for="(role, index) in roles" :key="index" :value="role">
                                                {{ role }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div> -->

    <!-- button -->
    <!-- <div class="flex items-center pt-4 space-x-4">
                                <button @click="goBack"
                                    class="flex items-center justify-center w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none hover:bg-red-500">
                                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    Cancel
                                </button>
                                <button @click="$emit('SignUpUser', createUser)"
                                    class="flex items-center justify-center w-full px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none">
                                    Create
                                </button>
                            </div> -->
    <!-- </div>
                    </div>
                </div>
            </div>
        </div>
    </main> -->
</template>

<style>
</style>
