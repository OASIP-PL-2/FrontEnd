<script setup>
import { computed } from '@vue/reactivity';
import {ref , onMounted} from 'vue'
import { useRouter } from "vue-router";

defineEmits(['SignInUser']);

//Button Back
const appRouter = useRouter();
const goBack = () => appRouter.go(-1);

//Attribute
let username = ref('')
let email = ref('')
let confrim_email = ref('')
let role = ref('student')

//Roles
let roles = ref(['student' , 'lecturer' , 'admin'])

//Get User
const users = ref([])
const getUsers = async() =>{
    const res = await fetch (`${import.meta.env.VITE_BACK_URL}/users`);
    if (res.status === 200) {
        users.value = await res.json();
        console.log(users.value);
    } else console.log("error, cannot get data");
}
onMounted(async () => {
  await getUsers();
});

//Create User
let createUser = computed(() =>{
    if(validation()){
        return 0
    }else if(email.value != confrim_email.value){
        ErrorConfrimEmail.value = true
        return 0
    }
    else{ 
        goBack();
        return {name : username.value , email : email.value , role : role.value} 
    }
})

//Validate Username , Email
let Username_base = ref(users.value.map((user) =>{return user.name}))
let Email_base = ref(users.value.map((user) =>{return user.email}))

let validation = () =>{
    if(users.value.map((user) =>{return user.name}).includes(username.value)
     || users.value.map((user) =>{return user.email}).includes(email.value)){
        console.log('validate');
        return true;
    }
    return false;
}

//Show Error
let ErrorName = ref(false)
let ErrorEmail = ref(false)
let ErrorConfrimEmail = ref(false)
let showError = () => {
    ErrorName.value = users.value.map((user) =>{return user.name}).includes(username.value)
    ErrorEmail.value = users.value.map((user) =>{return user.email}).includes(email.value)
}

</script>
 
<template>
    <main class="my-8">
        <div class="container px-6 mx-auto">
            <h2 class="mt-3 mb-5 ml-8 text-4xl font-bold text-white">Sign In :</h2>
            <!-- Sign in box -->
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div class="relative px-4 py-10 mx-8 bg-white shadow md:mx-0 rounded-3xl sm:p-10">
                    <div class="max-w-lg mx-auto -mt-7">
                        <div class="divide-y divide-gray-200">
                            <div class="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                                <!-- Name input -->
                                <div class="flex flex-col">
                                    <label class="leading-loose">Username :</label>
                                    <input type="text"
                                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                        placeholder="Enter your name/group name" 
                                        @keyup="showError"
                                        v-model="username" />
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorName">
                                        Username is already used
                                    </p>
                                </div>

                                <!-- Email input -->
                                <div class="flex flex-col">
                                    <label class="leading-loose">Email :</label>
                                    <input type="text"
                                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                        placeholder="Enter your email"
                                        @keyup="showError"
                                        v-model="email" />
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorEmail">
                                        Email is already used
                                    </p>
                                    <label class="leading-loose mt-3">Confrim Email :</label>
                                    <input type="text"
                                        class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                                        placeholder="Confrim your email" 
                                        v-model="confrim_email"/>
                                    <p class="ml-2 text-xs text-right text-red-700" v-if="ErrorConfrimEmail">
                                        Email didn't matching
                                    </p>
                                </div>

                                <!-- Role select -->
                                <div class="flex flex-col">
                                    <label class="leading-loose">Role :</label>
                                    <div>
                                        <select v-model="role">
                                            <option value="" disabled selected> Select Role </option>
                                            <option v-for=" (role , index) in roles" :key="index" :value="role">
                                                {{ role }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- button -->
                            <div class="flex items-center pt-4 space-x-4">
                                <button @click="goBack"
                                    class="flex items-center justify-center w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none hover:bg-red-500">
                                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    Cancel
                                </button>
                                <button @click="$emit('SignInUser', createUser)"
                                    class="flex items-center justify-center w-full px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none">
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
 
<style>

</style>