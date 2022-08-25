<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const appRouter = useRouter();

const email = ref('')
const password = ref('')

const errorEmailNull = ref(false);
const errorEmailFormat = ref(false)
const errorPasswordNull = ref(false);
const errorPasswordLength = ref(false)
const status = ref(0)
const statusMessage = ref('')

const goBack = () => {
    console.log('เข้า');
    appRouter.go(-1)
}

const validationEmail = () => {
    if (email.value == null || email.value == '') {
        errorEmailNull.value = true
        errorEmailFormat.value = false
    } else {
        errorEmailNull.value = false
        errorEmailFormat.value = validateEmailFormat(email.value.trim())
    }
}

const validationPassword = () => {
    if (password.value == null || password.value == '') {
        errorPasswordNull.value = true
        errorPasswordLength.value = false
    } else {
        errorPasswordNull.value = false
        errorPasswordLength.value = !(password.value.length >= 8 && password.value.length <= 14)
    }
}

const validateEmailFormat = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s*$&!#?@"]+(\.[^<>()[\]\\.,;:\s*$&!#?@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !re.test(String(email))
}

const LoginUser = () => {
    if (!errorEmailNull.value && !errorEmailFormat.value && !errorPasswordNull.value && !errorPasswordLength.value) {
        checkMatchTODB(email.value, password.value)
    }

}
const checkMatchTODB = async (email, password) => {
    console.log('Sign in..');
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/match`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password })
    });

    console.log(res.status);
    status.value = res.status
    statusMessage.value = res.status == 200 ? 'Password Matches !' :
                          res.status == 401 ? 'Password Not Matches !' :
                          res.status == 404 ? 'A user with the specified email DOSE NOT exist !' : ''
}


</script>

<template>
    <main class="my-8">
        <div class="container px-6 mx-auto">
            <!-- <h2 class="mt-3 mb-5 ml-8 text-4xl font-bold text-white">Login :</h2> -->
            <!-- Sign up box -->

            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div class=" bg-white shadow md:mx-0 rounded-3xl sm:p-10">
                    <div class="close flex justify-end" >
                        <div class="cursor-pointer p-6" >
                            <img src="https://cdn-icons-png.flaticon.com/512/992/992660.png" alt="" width="33" @click="goBack">
                        </div>
                    </div>
                    <div class="flex relative px-4 mx-8 -mt-8">
                        <div class="ml-9">
                            <img src="../../assets/login1.png" alt="login" width="500">
                        </div>

                        <div class="input-login p-10 ml-11 mt-5">
                            <h1 class="text-2xl text-center font-semibold">Login to <span class="text-yellow-600">OASIP !</span></h1>
                            <div class="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                                <!-- Name input -->
                                <div class="flex flex-col pt-4">
                                    <label class="leading-loose">Email :</label>
                                    <input type="text"
                                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                        placeholder="Enter your email" @keyup="validationEmail" v-model="email"
                                        maxlength="100" />
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="errorEmailNull">
                                        Please enter your email
                                    </p>
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="errorEmailFormat">
                                        Format email is Invaild
                                    </p>
                                </div>

                                <!-- Email input -->
                                <div class="flex flex-col">
                                    <label class="leading-loose">Password :</label>
                                    <input type="password"
                                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                        placeholder="Enter your password" @keyup="validationPassword" v-model="password"
                                        maxlength="50" />
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="errorPasswordNull">
                                        Please enter your password
                                    </p>
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="errorPasswordLength">
                                        Password must between 8-14 character
                                    </p>

                                </div>

                                <!-- Login button -->
                                <div class="pt-3 flex">
                                    <button @click="LoginUser"
                                        class="flex items-center justify-center w-32 px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none">
                                        Login
                                    </button>
                                </div>

                                <p class="text-sm font-medium text-green-600" v-if="status == 200">{{ statusMessage }}</p>
                                <p class="text-sm font-medium text-red-600" v-else>{{ statusMessage }}</p>

                                <h1 class="text-xs text-gray-400 pt-10">
                                    Don't have an account?
                                    <router-link :to="{ name: 'SignUp' }">
                                        <span class="text-blue-500">Sign Up</span>
                                    </router-link>
                                </h1>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.input-login {
    width: 40%;
}

/* .close {
    width: 97%;
} */

/* .input {
    width: 500%;
} */
</style>
