<script setup>
import { ref, computed, onUpdated } from "vue";
const props = defineProps({
  categories: {
    type: Array,
    require: true,
  },
  category: {
    type: Object,
    require: true,
  },
  showEditForm: {
    type: Number,
    require: true,
  },
});

console.log(props.category);

const categoryName = ref(props.category.eventCategoryName);
const duration = ref(props.category.eventDuration);
const description = ref(props.category.eventCategoryDescription);
const showEditForm = ref(props.showEditForm);

console.log(categoryName.value.trim());

// EDIT
const categoryToEdit = ref({});
const editingCategory = () => {
  categoryToEdit.value = {
    eventCategoryName: categoryName.value.trim(),
    eventDuration: duration.value,
    eventCategoryDescription: description.value,
  };
  console.log(categoryToEdit.value);
  editCategoryToDB(categoryToEdit.value);
  // showEditForm.value = 0;
};

const editCategoryToDB = async (editCategory) => {
  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/categories/${props.category.id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editCategory),
    }
  )

  if (
    props.category.eventCategoryName == categoryName.value &&
    props.category.eventDuration == duration.value &&
    props.category.eventCategoryDescription == description.value
  ) {
    return alert("sorry, please change any field");
  } else if (
    errorCategoryName.value != "" ||
    errorDuration.value != "" ||
    errorDescription.value != ""
  ) {
     return alert("sorry, incorrect syntax");
  } else if (res.status === 200) {
     alert("editing event successfully");
    //  return showEditForm.value = 0;
    return emit('closeEditCategory')
  } else if (res.status === 400) {
     return alert("sorry, category name is not unique");
  } else alert("sorry, cannot be edited");
};
const emit = defineEmits(['closeEditCategory'])
//validation
const errorCategoryName = ref("");
const errorDescription = ref("");
const errorDuration = ref("");
const validateEventCategoryName = computed(() => {
  errorCategoryName.value =
    categoryName.value === ""
      ? "Please fill CategoryName"
      : "" || categoryName.value.length > 100
      ? "category name can not be more than 100 character"
      : "";
});
const validateEventCategoryDescription = computed(() => {
  errorDescription.value =
    description.value.length > 500
      ? "EventNote cannot be more than 500 character"
      : "";
});
const validateEventCategoryDuration = computed(() => {
  errorDuration.value =
    duration.value === ""
      ? "Please fill Duration"
      : "" || duration.value < 1
      ? "Must be in range 1-480"
      : "" || duration.value > 480
      ? "Must be in range 1-480"
      : "" || Number.isInteger(duration.value)
      ? "" : "Must be a number"
});
</script>

<template>
  <main class="my-8">
    <div class="px-6 detail-container" v-show="showEditForm == 1">
      <div class="{`col-12 overflow-auto h-3/4 top-28 bottom-auto rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}" >
        <!-- navbar -->
        <nav class="max-h-screen py-2 rounded-t-lg lg:w-12/12 bg-neutral-800">
          <span class="text-2xl font-bold text-justify ml-7 text-zinc-100 col-7">
            Edit Clinic :
          </span>
          <button @click="$emit('closeEditCategory')" id="closeDetail" class="mt-1 col-12">
            <img src="../../assets/close.png" />
          </button>
        </nav>
        <!-- edit clinic -->
        <div class="overflow-hidden bg-white bg-center bg-cover shadow-lg col-12 shadow-zinc-700">
          <div class="grid gap-6 px-10 mx-16 my-10 mb-6 lg:grid-cols-2">
            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Clinic name :</label>
              <input
                type="text"
                v-model="categoryName"
                @keyup="validateEventCategoryName"
                @blue="validateEventCategoryName"
                class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="categoryName"
                required
              />
              <span class="ml-2 text-red-700 col-1" v-if="errorCategoryName">{{errorCategoryName}}</span><br>
            </div>

            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Duration :</label>
              <input
                type="number"
                v-model="duration"
                @keyup="validateEventCategoryDuration"
                @blue="validateEventCategoryDuration"
                class="p-4 text-sm text-gray-900 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="duration"
                required
              />
              <span class="ml-2 font-bold">min </span>
              <span class="ml-2 text-red-700 col-1" v-if="errorDuration" >{{ errorDuration }} </span><br>
            </div>

            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Description :</label>
              <textarea
                type="text"
                rows="5"
                cols="50"
                v-model="description"
                @keyup="validateEventCategoryDescription"
                @blue="validateEventCategoryDescription"
                class="p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="clinic descrition..."
                required
              ></textarea>
              <span class="ml-2 text-red-700 col-1" v-if="errorDescription">{{errorDescription}}</span><br>
            </div>

          </div>

          <div class="float-right mr-20">
            <!-- <button @click="editingCategory(), $emit('closeEditCategory')" class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> -->
            <button @click="editingCategory" class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.detail-container {
  position: absolute;
  left: 30%;
  line-height: 10px;
}
#closeDetail {
  width: 3%;
  margin-right: 5%;
  float: right;
  display: inline;
}
textarea {
  background-color: #b9d0f0;
}

input {
  margin-left: 3%;
  background-color: #b9d0f0;
  border-radius: 7px;
  width: 70%;
  height: 40px;
  font-size: 100%;
}
input:focus {
  background-color: rgb(216 180 254);
}
</style>
