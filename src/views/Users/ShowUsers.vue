<script setup>
import { ref, onBeforeMount } from "vue";
import UserDetail from "../../components/UserComponents/EachUserDetail.vue";
import EditUser from "../../components/UserComponents/EditUser.vue";
import { useRoute } from "vue-router"

let { params } = useRoute()
const reloadPage = () => {
  window.location.reload()
}
const users = ref([]);
const getUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users`);
  if (res.status === 200) {
    users.value = await res.json();
  } else console.log("error, cannot get data");
};

onBeforeMount(async () => {
  await getUsers();
  return fillers();
});

const getUserDetail = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users/${id}`);
  if (res.status === 200) {
    detailCurrentUser.value = await res.json();
  } else console.log("error, cannot get data");
};

const deleteUsers = async (id) => {
  const isConfirm = confirm("Do you want to delete this user?")
  if (isConfirm == true) {
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users/${id}`, { method: "DELETE" })
    if (res.status == 200) {
      users.value = users.value.filter((user) => {
        return user.id != id;
      })
    } else { console.log("error, cannot delete") }
  }
}

// ส่วนของ user detail เเละ Edit
const isShowDetail = ref(0)
const isShowEdit = ref(0)
const detailCurrentUser = ref({})
const showDetail = (userId) => {
  getUserDetail(userId)
  isShowDetail.value = 1
}
const closeShowDetail = () => {
  isShowDetail.value = 0
  isShowEdit.value = 0
}
const showEditForm = (user) => {
  isShowEdit.value = 1
  detailCurrentUser.value = user
  console.log(isShowEdit.value)
}
const closeEditForm = () => {
  isShowEdit.value = 0
  console.log(isShowEdit.value)
}

const fillers = () => {
  if (params.roles != 'all') {
    users.value = users.value.filter(user => user.role == params.roles)
  }
}

</script>

<template>

  <!-- <div class="flex flex-col p-4 m-auto mb-4 overflow-hidden transition duration-500 ease-in-out transform rounded-lg shadow-lg cursor-pointer w-max h-max md:w-5/6 sm:w-5/6 bg-indigo-50 hover:translate-y-5 hover:shadow-2xl">

<div class="flex flex-row">
  <div class="w-2/12 basis1/6">Hello</div>
  <div class="w-3/12 basis2/6">Helllo</div>
  <div class="w-5/12 basis3/6">Hello</div>
  <div>Helllo</div>
</div> -->
  <!-- </div> -->


  <div  class="min-h-screen lg:mx-48 md:mx-32 sm:mx-8">



    <div class="p-4 rounded-md">


      <div
        class="flex justify-between px-4 py-2 font-bold text-white rounded-md bg-gradient-to-tr from-indigo-600 to-purple-600 text-md">

        <div class="basis-2/12">
          <span>Profile</span>
        </div>
        <div class="basis-3/12">
          <span>Username</span>
        </div>
        <div class="basis-6/12">
          <span>Email</span>
        </div>
        <div class="basis-2/12">
          <span>Role</span>
        </div>
        <div class="basis-3/12">
          <span></span>
        </div>
      </div> <!-- heading  -->


      <div v-if="users.length !== 0">
        <div v-for="(user, index) in users" :key="index" class="flex justify-between mt-4 space-x-4 text-sm font-normal bg-white hover:translate-y-5 hover:shadow-2xl rounded-3xl">
          <div class="basis-2/12">
            <img class="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="../../assets/kid.jpg"
              alt="Bordered avatar">

          </div>
          <div class="mt-5 basis-3/12">
            <span class="font-bold">{{user.name}}</span>
          </div>
          <div class="mt-5 basis-6/12 ">
            <span>{{user.email}}</span>
          </div>
          <div class="mt-5 basis-3/12 ">
            <span>{{user.role}}</span>
          </div>

          <div class=" basis-2/12">
            <div class="flex space-x-2 md:mt-5">
          <div @click="showDetail(user.id)"
            class="inline-flex p-1 -ml-20 text-sm text-center text-white bg-blue-700 rounded-lg cursor-pointer font-mediu1 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Detail</div>
          <div @click="showEditForm(user)"
            class="inline-flex p-1 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Edit</div>
            <div @click="deleteUsers(user.id)"
            class="inline-flex p-1 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Delete</div>
        </div>
        
          </div>
        </div>
      </div>


    </div>
  </div>

  


  <div class="text-4xl font-bold text-center">Users</div>
  <div class="grid gap-10 m-6 mx-24 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2"
    v-if="users.length !== 0">


    <div v-for="(user, index) in users" :key="index"
      class="w-full max-w-sm bg-white border border-gray-200 shadow-md rounded-3xl dark:bg-gray-800 dark:border-gray-700">
      <div class="flex justify-end px-4 pt-4">
        <img src="../../assets/close.png" @click="deleteUsers(user.id)" class="cursor-pointer h-7 hover:h-8" />

      </div>
      <div class="flex flex-col items-center pb-10">
        <!-- <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg"
          alt="Bonnie image" /> -->
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="../../assets/kid.jpg" alt="profie image" />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ user.name }}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</span>
        <span class="w-20 mt-1 text-sm text-center text-gray-500 rounded-xl bg-fuchsia-200 dark:text-gray-400">{{
            user.role
        }}</span>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <div @click="showDetail(user.id)"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Show Detail</div>
          <div @click="showEditForm(user)"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Edit</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <span
      class="flex flex-col items-center px-4 py-20 mt-4 space-y-2 text-xl font-semibold text-center bg-orange-500 rounded-md cursor-pointer group">No
      User</span>
    <span>
      <router-link :to="{ name: 'SignUp' }">
        <div
          class="flex flex-col items-center px-4 py-10 space-y-2 text-center rounded-md cursor-pointer bg-gray-900/50 hover:bg-amber-500 hover:smooth-hover">
          <a class="flex items-center justify-center w-20 h-20 rounded-full bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover"
            href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </a>
          <p class="text-center text-white/50 group-hover:text-gray-900 group-hover:smooth-hover"> User SignUp </p>
        </div>
      </router-link>
    </span>
  </div>

  <UserDetail v-if="isShowDetail == 1" @closeMe="closeShowDetail" :user="detailCurrentUser" />
  <EditUser class="edit" v-if="isShowEdit == 1" @closeEditUser="closeEditForm" :users="users" :user="detailCurrentUser"
    :showEditForm="isShowEdit" />



  <!--         
  <main class="my-8">
    <div class="mx-8"> -->
  <!-- <h2 class="mt-3 mb-5 text-4xl font-bold text-center text-black">Users</h2> -->
  <!-- <p class="mb-5 text-xl font-semibold text-stone-600 col-10">The total of user are {{ users.length }} users</p>     -->
  <!-- <div class="flex items-center justify-between mb-3">
        <div class="relative flex px-4 text-center bg-gray-100 shadow-lg col-4 rounded-2xl">
          <router-link :to="{ name: 'ShowUsers', params: { roles: 'all' } }">
            <div class="flex-1 group">
              <a
                class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500">
                <span class="block py-3 text-lg">
                  <button class="active">All</button>
                  <span class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"></span>
                </span>
              </a>
            </div>
          </router-link>
          <router-link :to="{ name: 'ShowUsers', params: { roles: 'admin' } }">
            <div class="flex-1 group">
              <a
                class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500">
                <span class="block py-3 text-lg">
                  <button class="active">Admin</button>
                  <span class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"></span>
                </span>
              </a>
            </div>
          </router-link>
          <router-link :to="{ name: 'ShowUsers', params: { roles: 'lecturer' } }">
            <div class="flex-1 group">
              <a
                class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500">
                <span class="block py-3 text-lg">
                  <button class="active">Lecturer</button>
                  <span class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"></span>
                </span>
              </a>
            </div>
          </router-link>
          <router-link :to="{ name: 'ShowUsers', params: { roles: 'student' } }">
            <div class="flex-1 group">
              <a
                class="flex items-end justify-center w-full px-4 mx-auto text-center text-zinc-900 group-hover:text-indigo-500">
                <span class="block py-3 text-lg">
                  <button class="active">Student</button>
                  <span class="block w-5 h-1 mx-auto rounded-full group-hover:bg-indigo-500"></span>
                </span>
              </a>
            </div>
          </router-link>
        </div>
      </div> -->

  <!-- <div v-if="users.length !== 0">
        <div class="scrollBar col-12">
          <div class="grid grid-cols-3 gap-6 mt-4 ml-12">


            <div class="col-12">
              <router-link :to="{ name: 'SignUp' }">
                <div
                  class="flex flex-col items-center max-w-xs px-4 py-20 space-y-2 text-center rounded-md cursor-pointer bg-gray-500/50 hover:bg-amber-600 hover:scale-105 hover:smooth-hover">
                  <a class="flex items-center justify-center w-20 h-20 rounded-full bg-amber-500 text-white/50 group-hover:text-white group-hover:smooth-hover"
                    href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </a>
                  <p class="text-center text-white/50 group-hover:text-gray-900 group-hover:smooth-hover"> Sign Up </p>
                </div>
              </router-link>
            </div>

            <div v-for="(user, index) in users" :key="index">
              <div id="eachEventList"
                class="relative max-w-sm overflow-hidden transition-shadow duration-300 ease-in-out rounded-lg shadow-md col-11 hover:shadow-xl hover:scale-110">

                <p class="detail col-12">
                  <img src="../../assets/user.png" class="img col-3">
                  <span class="heading col-6">Name :</span> {{ user.name }}
                </p>

                <p class="detail col-12">
                  <img src="../../assets/email.png" class="img col-3">
                  <span class="heading col-6">Email :</span> {{ user.email }}
                </p>

                <p class="detail col-12">
                  <img src="../../assets/category.png" class="img col-3">
                  <span class="heading col-6">Role :</span> {{ user.role }}
                </p>


                <div id="allButton" class="float-right col-6">
                  <img @click="showDetail(user.id)" src="../../assets/detail.png"
                    class="cursor-pointer img-button col-1">
                  <img @click="showEditForm(user)" src="../../assets/edit.png" class="cursor-pointer img-button col-1">
                  <img @click="deleteUsers(user.id)" src="../../assets/trash-bin.png"
                    class="cursor-pointer img-button col-1">
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div v-else>
        <span
          class="flex flex-col items-center px-4 py-20 mt-4 space-y-2 text-xl font-semibold text-center bg-orange-500 rounded-md cursor-pointer group">No
          User</span>
        <span>
          <router-link :to="{ name: 'SignUp' }">
            <div
              class="flex flex-col items-center px-4 py-10 space-y-2 text-center rounded-md cursor-pointer bg-gray-900/50 hover:bg-amber-500 hover:smooth-hover">
              <a class="flex items-center justify-center w-20 h-20 rounded-full bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover"
                href="#">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </a>
              <p class="text-center text-white/50 group-hover:text-gray-900 group-hover:smooth-hover"> User SignUp </p>
            </div>
          </router-link>
        </span>
      </div> -->

  <!-- <UserDetail v-if="isShowDetail == 1" @closeMe="closeShowDetail" :user="detailCurrentUser" />
      <EditUser class="edit" v-if="isShowEdit == 1" @closeEditUser="closeEditForm" :users="users"
        :user="detailCurrentUser" :showEditForm="isShowEdit" /> -->

  <!-- </div>
  </main> -->
</template>

<style scoped>
.detail {
  margin-left: 5%;
  font-size: 100%;
  line-height: 37px;
}

.heading {
  font-weight: bold;
  margin-left: 1%;
}

#eventContainer {
  margin-left: 27%;
  width: 70%;
  height: 100%;
  border-radius: 25px;
}

#allDetail {
  margin-bottom: 7%;
}

#eachEventList {
  background-color: rgb(255 255 255 / 0.9);
  padding: 30px;
  border-radius: 12px;
  height: 100%;
}

#eachEventList:hover {
  width: 90%;
  background-color: rgb(255, 202, 67);
  transition-property: width;
  /* กำหนดให้ "width" เป็น property ที่จะใช้ transition */
  transition-duration: 0.3s;
  /* กำหนดให้ transition กินระยะเวลา 1 วินาที */
  transition-timing-function: ease-in-out;
  /* กำหนดให้รูปแบบของ speed เป็นแบบ "ease" */
}

#eventDuration {
  box-shadow: 5px 5px lightblue;
  float: right;
  margin-right: 5%;
  padding: 2px;
  background-color: #d9f4a4;
  text-align: center;
  border-radius: 12px;
  font-size: 90%;
}

#allButton {
  text-align: right;
}

.img-button {
  width: 20%;
  display: inline;
}

.img {
  width: 7%;
  display: inline;
}

.scrollBar {
  overflow-y: scroll;
  height: 70vh;
  margin-right: 5%;
}

.scrollBar {
  overflow-y: scroll;
  height: 70vh;
}

.edit {
  width: 100%;
}
</style>