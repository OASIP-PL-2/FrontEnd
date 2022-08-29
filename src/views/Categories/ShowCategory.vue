<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import EditCategory from "../../components/CategoryComponents/EditCategory.vue";

const categories = ref([]);

//GET Category
const getcategories = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/categories`);
  if (res.status === 200) {
    categories.value = await res.json();
    console.log(categories.value);
  } else console.log("error, cannot get data");
};

// เรียกใช้ getEvents() ก่อนที่หน้าเว็บจะแสดง
onBeforeMount(async () => {
  await getcategories();
});

defineEmits(["editCategory"]);
const isShowEdit = ref(0);
const detailCurrentCategory = ref({});

const showEditForm = (category) => {
  isShowEdit.value = 1;
  detailCurrentCategory.value = category;
  console.log(isShowEdit.value);
};

const closeEditForm = () => {
  isShowEdit.value = 0;
  window.location.reload();
  console.log(isShowEdit.value);
};
</script>

<template>
  <div class="text-5xl font-bold text-center">Clinic</div>
  <div class="px-4 mx-16 my-12 md:px-12">
    <div v-if="categories.length !== 0" class="flex flex-wrap -mx-1 lg:-mx-4">
      <div v-for="(category, index) in categories" :key="index"
        class="p-4 m-auto mb-8 overflow-hidden transition duration-500 ease-in-out transform rounded-lg shadow-lg cursor-pointer h-max h-30 w-80 md:w-80 bg-indigo-50 hover:translate-y-5 hover:shadow-2xl">
        <!-- <a href="../Home.vue" class="block w-full h-full"> -->
          <img alt="blog photo"
            src="https://ouch-cdn2.icons8.com/7IafUowCewhP-tIcwdGHyXhsJoqElQ00jmljBiQ2GMU/rs:fit:1216:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjYv/YTc5MzE5ZDMtNWM5/ZS00MTVmLWJiMjQt/MzMxZjczZmQwN2Vj/LnBuZw.png"
            class="object-cover w-full max-h-60" />
          <div class="w-full">
            <p class="font-medium text-indigo-500 text-md">
              {{ category.eventDuration }} mins
            </p>
            <p class="mb-2 text-xl font-medium text-gray-800 dark:text-white">
              {{ category.eventCategoryName }}
            </p>
            <p class="font-light text-gray-600 dark:text-gray-300 text-md">
              {{ category.eventCategoryDescription }}
            </p>
            <div class="flex flex-wrap items-center justify-center pt-5 mt-4 border-t-2">
              <router-link :to="{ name: 'ShowEvent', params: { time: category.eventCategoryName }, }">
                <div
                  class="text-xs mr-2 py-1.5  hover:text-sm hover:font-semibold hover:bg-orange-200 px-4 text-gray-600 bg-blue-200 rounded-2xl">
                  See Events
                </div>
              </router-link>
              <div @click="showEditForm(category)"
                class="text-xs hover:text-sm hover:font-semibold mr-2 py-1.5 px-4 hover:bg-orange-200 text-gray-600 bg-blue-200 rounded-2xl">
                Edit Clinic
              </div>
            </div>
          </div>
        <!-- </a> -->
      </div>
    </div>
    <div v-else class="notHaveEvent col-9">
      <h1>ไม่มีรายการ Category</h1>
    </div>

  </div>



  <EditCategory v-if="isShowEdit == 1" @closeEditCategory="closeEditForm" :categories="categories"
    :category="detailCurrentCategory" :showEditForm="isShowEdit" />

  <!-- </div>
  </div> -->
  <!-- <div>
    <main class="my-8">
      <div class="container px-6 mx-auto">
        <h2 class="mt-3 mb-5 text-4xl font-bold text-black">Clinic :</h2>
        <p class="mb-5 text-xl font-semibold text-stone-600 col-10">
          The total of Clinic are {{ categories.length }} categories
        </p>
        <div v-if="categories.length !== 0">
          <div class="scrollBar col-12">
            <div class="grid grid-cols-3 gap-6 mt-4 ml-12"> -->
  <!-- loop each clinic -->
  <!-- <div v-for="(category, index) in categories" :key="index">
                <div id="eachCategoryList"
                  class="flex max-w-xs py-10 overflow-hidden transition-shadow duration-300 ease-in-out rounded-lg shadow-md hover:shadow-xl hover:scale-105">
                  <div class="max-w-sm px-10 text-zinc-200">
                    Clinic Name :
                    <p class="text-xl font-semibold text-black">
                      {{ category.eventCategoryName }}
                    </p>

                    <p>
                      Duration :
                      <span class="text-lg font-semibold text-black">
                        {{ category.eventDuration }} min
                      </span>
                    </p>

                    <p>
                      Description :
                      <span class="text-base text-black">
                        {{ category.eventCategoryDescription }}
                      </span>
                    </p> -->

  <!-- <div>
                      <span class="duration-300 eachCategory col-1" @click="reloadPage">
                        <router-link :to="{ name: 'ShowEvent', params: { time: category.eventCategoryName }, }">
                          <button
                            class="flex items-center px-3 py-2 mt-4 text-sm font-medium text-white uppercase rounded bg-zinc-800 hover:bg-zinc-500 focus:outline-none focus:bg-amber-500">
                            SEE EVENTS
                          </button>
                        </router-link>
                      </span>
                      <span>
                        <button @click="showEditForm(category)"
                          class="flex items-center px-3 py-2 mt-4 text-sm font-medium text-white uppercase rounded bg-zinc-800 hover:bg-zinc-500 focus:outline-none focus:bg-amber-500">
                          EDIT CLINIC
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
  <!-- </div>
      </div> -->
  <!-- 
        ไม่มีรายการนัดหมาย -->
  <!-- <div v-else class="notHaveEvent col-9">
          <h1>ไม่มีรายการ Category</h1>
        </div>
      </div> -->
  <!-- 
      <EditCategory v-if="isShowEdit == 1" @closeEditCategory="closeEditForm" :categories="categories"
        :category="detailCurrentCategory" :showEditForm="isShowEdit" /> -->
  <!-- </main> -->
  <!-- </div> -->
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

.scrollBar {
  overflow-y: scroll;
  height: 100vh;
}

#categoryContainer {
  margin-left: 27%;
  width: 70%;
  height: 100%;
  border-radius: 25px;
}

#allDetail {
  margin-bottom: 7%;
}

#eachCategoryList {
  /* background-color: palegoldenrod; */
  background-image: linear-gradient(rgb(255, 157, 0), rgb(255, 237, 99));
  padding: 30px;
  border-radius: 12px;
  height: 100%;
}

#eachCategoryList:hover {
  width: 90%;
  /* background-color : rgb(255, 202, 67);   */
  background-image: linear-gradient(rgb(3, 101, 117), rgb(133, 235, 255));
  transition-property: width;
  /* กำหนดให้ "width" เป็น property ที่จะใช้ transition */
  transition-duration: 0.3s;
  /* กำหนดให้ transition กินระยะเวลา 1 วินาที */
  transition-timing-function: ease-in-out;
  /* กำหนดให้รูปแบบของ speed เป็นแบบ "ease" */
}

.img-button {
  width: 20%;
  display: inline;
}

.notHaveEvent {
  background-color: #e9f6cf;
  font-size: 24px;
  margin-left: 5%;
  margin-top: 3%;
  text-align: center;
  padding: 3%;
  border-radius: 30px;
}

.scrollBar {
  overflow-y: scroll;
  height: 55vh;
  margin-right: 5%;
}

.img {
  width: 7%;
  display: inline;
}
</style>
