<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const appRouter = useRouter();

const email = ref('')
const password = ref('')
const emptyField = 'empty-field'

let showPassword = ref(false);
const toggleShow = () => {
    showPassword.value = !showPassword.value;
};

const goBack = () => {
    appRouter.go(-1)
}

const emailIsEmpty = ref(false)
const validationEmail = () => {
    emailIsEmpty.value = email.value == null || email.value == ''
}

const passwordIsEmpty = ref(false)
const validationPassword = () => {
    passwordIsEmpty.value = password.value == null || password.value == ''
}

defineEmits('Login')
const LoginUser = () => {
    if (!(validationEmail() && validationPassword())) {
        return { email: email.value, password: password.value }
    }
}
</script>
 
<template>
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header"
                style="background: var(--bs-modal-bg);height: 20px;padding-bottom: 12px;margin-bottom: -7px;"><button
                    type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
            <div class="modal-body" style="margin-bottom: 119px;padding-top: 23px;">
                <h5 class="float-end"
                    style="color: var(--bs-yellow);margin-right: 0px;margin-left: 16px;width: 100px;font-size: 18px;">
                    <span style="color: rgb(169, 169, 169);">or</span> <strong type="button" data-bs-target="#modal-3"
                        data-bs-toggle="modal">Register</strong>
                </h5>
                <h5 class="text-start" style="padding-top: 0px;padding-bottom: 0px;margin-bottom: 14px;">Sign In</h5>
                <img class="rounded-circle img-fluid" src="../../assets/profile/7.png" width="100" height="100"
                    style="padding-bottom: 0px;">
                <div class="row" style="margin-right: -5px;margin-left: -12px;">
                    <div class="col-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto"
                        style="padding: 0px 0px;margin-right: 5px;margin-top: 3px;margin-bottom: 0px;margin-left: 5px;padding-top: 10px;">
                        <div class="row" style="margin-right: -5px;margin-left: -12px;">
                            <div class="col">
                                <input type="text" placeholder="Email" v-model="email" @keyup="validationEmail"
                                    maxlength="50" autofocus="" :class="[emailIsEmpty ? 'empty-field' : 'input-field']">
                            </div>
                            <div class="col input-icons">
                                <input v-if="!showPassword" type="password" placeholder="Password" v-model="password"
                                    @keyup="validationPassword" maxlength="50" autofocus=""
                                    :class="[passwordIsEmpty ? 'empty-field' : 'input-field']"
                                    aria-describedby="basic-addon2">
                                <input v-if="showPassword" type="text" placeholder="Password" v-model="password"
                                    @keyup="validationPassword" maxlength="50" autofocus=""
                                    :class="[passwordIsEmpty ? 'empty-field' : 'input-field']"
                                    aria-describedby="basic-addon2">
                                <i class="fas -ml-16 icon" @click="toggleShow" :class="{
                                    'fa-eye-slash': !showPassword,
                                    'fa-eye': showPassword,
                                }"></i>
                            </div>
                        </div>
                    </div>
                </div>
                    <button @click="$emit('Login', LoginUser())" class="btn btn-primary btn-lg border rounded-pill float-none" type="button"
                    style="background: var(--bs-yellow);margin-top: 10px;width: 260px;">Sign In</button>
            </div>
            <div class="modal-footer"></div>
        </div>
    </div>
    <!-- <div id="loginPage">
        <div class="ml-10 mr-10 bg-white shadow lg:mr-20 lg:ml-20 md:mr-20 sm:mr-20 md:ml-20 sm:ml-20 rounded-3xl">
            <div class="float-right mr-3">
                <img src="https://cdn-icons-png.flaticon.com/512/992/992660.png" alt="" width="33" @click="goBack"
                    class="mt-4" />
            </div>
            <div class="flex">
                <div class="ml-5 -mt-24 basis-6/12">
                    <img src="../../assets/login1.png" class=" lg:mt-10 lg:h-auto md:h-95 md:mt-28 sm:mt-32">
                </div>

                <div class="p-10 mt-12 basis-6/12 input-login">
                    <div class="text-2xl font-semibold text-center ">Login to <span
                            class="text-yellow-600">OASIP!</span></div>
                    <div class="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                        <div class="flex flex-col">
                            <label class="leading-loose ">Email :</label>
                            <input type="text"
                                class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                placeholder="Enter your email" v-model="email" @keyup="validationEmail"
                                :class="{ 'empty-field': emailIsEmpty }" maxlength="50" />
                        </div>

                        <div class="flex flex-col">
                            <label class="leading-loose">Password :</label>
                            <div class="flex">
                                <input v-if="!showPassword" type="password"
                                    class="w-11/12 px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                    placeholder="Enter your password" v-model="password" @keyup="validationPassword"
                                    :class="{ 'empty-field': passwordIsEmpty }" />

                                <input v-if="showPassword" type="text"
                                    class="w-11/12 px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                    placeholder="Enter your password" v-model="password" @keyup="validationPassword"
                                    :class="{ 'empty-field': passwordIsEmpty }" />

                                <button
                                    class="flex-1 px-2 py-2 ml-1 text-gray-600 border border-gray-300 rounded-md w-9 focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                    @click="toggleShow">
                                    <span class="icon is-small is-right">
                                        <i class="fas" :class="{
                                            'fa-eye-slash': !showPassword,
                                            'fa-eye': showPassword,
                                        }"></i>
                                    </span>
                                </button>
                            </div>

                        </div>
                        <div class="flex pt-3">
                            <button @click="$emit('Login', LoginUser())"
                                class="flex items-center justify-center w-32 px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none">
                                Login
                            </button>
                        </div>

                        <p class="pt-3 text-xs text-gray-400"> Don't have an account?
                            <router-link :to="{ name: 'SignUp' }">
                                <span class="text-blue-500">Sign Up</span>
                            </router-link>
                        </p>
                    </div>

                </div>

            </div>
        </div>
    </div> -->
</template>
 
<style scoped>
.input-login {
    width: 50%;
}

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
    margin-left: -48px;
    padding: 13px;
    min-width: 50px;
    text-align: center;
}
</style>