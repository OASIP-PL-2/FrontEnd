<script setup>
import { ref } from "vue";
import { getUserDetail } from "../../Fetch/fetch_user.js"
import ShowUserDetail from "../../components/UserComponents/ShowUserDetail.vue";
import EditUserDetail from "../../components/UserComponents/EditUserDetail.vue";

const props = defineProps({
  users: {
    type: Array,
    require: true,
  }
})

defineEmits('deleteUsers')

const isShowDetail = ref(0)
const isShowEdit = ref(0)
const detailCurrentUser = ref({})
const showDetail = async (userId) => {
  detailCurrentUser.value = await getUserDetail(userId)
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
</script>
 
<template>
  <!-- <div>
    <div class="min-h-screen lg:mx-48 md:mx-32 sm:mx-8">
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
      </div>
      <div v-if="users.length !== 0">
        <div v-for="(user, index) in users" :key="index"
          class="flex justify-between mt-4 space-x-4 text-sm font-normal bg-white hover:translate-y-5 hover:shadow-2xl rounded-3xl">
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
              <div @click="$emit('deleteUsers' , user.id)"
                class="inline-flex p-1 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                Delete</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="mb-4 row mb-lg-4">
        <div class="mx-auto text-center col-md-8 col-xl-6">
            <h2>Users</h2>
        </div>
    </div>
    <div class="container text-center" v-if="users.length !== 0">
        <div class="table-responsive d-sm-flex">
            <table class="table">
                <thead>
                    <tr>
                        <th style="color: var(--bs-black);">Profile</th>
                        <th class="text-start" style="color: var(--bs-black);">Username</th>
                        <th class="text-start" style="color: var(--bs-black);">Email</th>
                        <th style="color: var(--bs-black);">Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-for="(user, index) in users" :key="index">
                    <tr style="background: #eff3f7;" v-if="index%2==0">
                        <td><img class="rounded-circle" src="../../assets/profile/6.png" width="55" height="55" style="border-style: none;"></td>
                        <td class="text-uppercase fw-bold text-start" style="color: var(--bs-black);padding-top: 24px;">{{user.name}}</td>
                        <td class="text-start" style="padding-top: 24px;">{{user.email}}</td>
                        <td class="text-uppercase" style="color: var(--bs-primary);padding-top: 24px;">{{user.role}}</td>
                        <td class="text-truncate" style="padding-top: 20px;">
                          <button @click="showDetail(user.id)" class="btn btn-primary" type="button" style="margin-right: 6px;background: var(--bs-gray-400);border-color: var(--bs-gray-400);color: var(--bs-gray-700);height: 30px;padding: 3px 8px;padding-top: 1px;">Details</button>
                          <button @click="showEditForm(user)" class="btn btn-primary" type="button" style="margin-right: 6px;background: var(--bs-gray-400);color: var(--bs-gray-700);border-color: var(--bs-gray-400);padding: 3px 8px;height: 30px;padding-top: 1px;">Edit</button>
                          <button @click="$emit('deleteUsers' , user.id)" class="btn btn-primary" type="button" style="background: var(--bs-red);border-color: var(--bs-red);padding: 3px 8px;height: 30px;padding-top: 1px;">Delete</button></td>
                    </tr>
                    <tr v-if="index%2!=0">
                        <td><img class="rounded-circle" src="../../assets/profile/6.png" width="55" height="55" style="border-style: none;"></td>
                        <td class="text-uppercase fw-bold text-start" style="color: var(--bs-black);padding-top: 24px;">{{user.name}}</td>
                        <td class="text-start" style="padding-top: 24px;">{{user.email}}</td>
                        <td class="text-uppercase" style="color: var(--bs-primary);padding-top: 24px;">{{user.role}}</td>
                        <td class="text-truncate" style="padding-top: 20px;">
                          <button @click="showDetail(user.id)" class="btn btn-primary" type="button" style="margin-right: 6px;background: var(--bs-gray-400);border-color: var(--bs-gray-400);color: var(--bs-gray-700);height: 30px;padding: 3px 8px;padding-top: 1px;">Details</button>
                          <button @click="showEditForm(user)" class="btn btn-primary" type="button" style="margin-right: 6px;background: var(--bs-gray-400);color: var(--bs-gray-700);border-color: var(--bs-gray-400);padding: 3px 8px;height: 30px;padding-top: 1px;">Edit</button>
                          <button @click="$emit('deleteUsers' , user.id)" class="btn btn-primary" type="button" style="background: var(--bs-red);border-color: var(--bs-red);padding: 3px 8px;height: 30px;padding-top: 1px;">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    

  <ShowUserDetail v-if="isShowDetail == 1" @closeMe="closeShowDetail" :user="detailCurrentUser" />
  <EditUserDetail class="edit" v-if="isShowEdit == 1" @closeEditUser="closeEditForm" :users="users" :user="detailCurrentUser"
    :showEditForm="isShowEdit" />

</template>
 
<style>

</style>