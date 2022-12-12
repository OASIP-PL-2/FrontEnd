<script setup>
import { ref, onBeforeMount } from "vue";
import { editCategory } from '../../Fetch/fetch_category'
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

const emit = defineEmits(['closeEditCategory'])

const filterCategory = ref([])
onBeforeMount(async () => {
  filterCategory.value = props.categories.filter((category) => category.id != props.category.id)
  console.log(filterCategory);
});

const categoryName = ref(props.category.eventCategoryName);
const duration = ref(props.category.eventDuration);
const description = ref(props.category.eventCategoryDescription);
const showEditForm = ref(props.showEditForm);

// EDIT
const categoryToEdit = ref({});
const editingCategory = () => {
  if (
    props.category.eventCategoryName == categoryName.value &&
    props.category.eventDuration == duration.value &&
    props.category.eventCategoryDescription == description.value
  ) {
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
        return emit('closeEditCategory')
      }
    })
  } else {
    categoryToEdit.value = {
      eventCategoryName: categoryName.value.trim(),
      eventDuration: duration.value,
      eventCategoryDescription: description.value,
    };
    editCategory(props.category.id, categoryToEdit.value)
      .then((res) => {
        if (res === 200) { emit('closeEditCategory') }
      })
  }
};

//show-error
const ErrorNameNull = ref(false);
const ErrorNameUnique = ref(false);
const ErrorDurationNull = ref(false);
const ErrorDurationRange = ref(false);

const validateEventCategoryName = () => {
  ErrorNameNull.value = categoryName.value == null || categoryName.value == ''
  ErrorNameUnique.value = filterCategory.value.map((category) => { return category.eventCategoryName.trim() }).includes(categoryName.value.trim())
  console.log(ErrorNameNull.value);
}

const validateDuration = () => {
  ErrorDurationNull.value = duration.value == null || duration.value == ''
  ErrorDurationRange.value = duration.value < 1 || duration.value > 480
}

const closeEditForm = e => {
  console.log(e.target.className);
  if (e.target.className == 'overlay') {
    emit('closeEditCategory')
  }
}

</script>

<template>
  <div id="popup1" class="overlay" @click="closeEditForm($event)">
    <div class="popup">
      <div class="content">
        <div style="border-style: none;margin-bottom: -8px;text-align: right;padding: 5px">
          <button type="button" class="btn-close" aria-label="Close" @click="$emit('closeEditCategory')"></button>
        </div>
        <div class="d-block"
          style="margin-top: 25px;margin-bottom: 12px;text-align: center;padding-left: 30px;padding-right: 40px;text-align: left;">
          <div class="row">
            <div class="col" style="margin-bottom: 9px;border-color: var(--bs-orange);">
              <h2 class="mb-4 text-center font-weight-i" style="padding-top: 0px;margin-top: 3px;">EDIT CLINIC !</h2>
            </div>
          </div>
          <div class="mb-3 row">
            <p style="margin-bottom: 2px;">Clinic Name <span class="text-danger">*</span></p>
            <input class="" type="text" v-model="categoryName" @keyup="validateEventCategoryName" id="name-2"
              maxlength="100" :class="[ErrorNameNull ? 'empty-field' : 'input-field']" placeholder="categoryName"
              required>
            <span v-if="ErrorNameUnique" class="error-message">This name is already used</span>
          </div>
          <div class="mb-3 row">
            <p style="margin-bottom: 4px;">Duration <span class="text-danger">*</span></p>
            <input style="width: 100%;" type="number" v-model="duration" @keyup="validateDuration"
              @change="validateDuration" placeholder="duration"
              :class="[ErrorDurationNull ? 'empty-field' : 'input-field']" required>
            <span v-if="ErrorDurationRange" class="error-message">Must be in range 1-480</span>
          </div>
          <div class="mb-3 row">
            <p style="margin-bottom: 2px;">Description</p>
            <textarea style="" id="message-2" rows="6" maxlength="500" minlength="0" autofocus="" type="text"
              v-model="description" placeholder="clinic descrition..." required></textarea>
          </div>
          <div class="row">
            <div class="col"
              style="text-align: right;margin-bottom: 8px;padding-left: 6px;padding-right: 0px;margin-top: 12px">
              <button class="btn btn-danger" type="button"
                style="border-radius: 100px;padding: 8px;padding-right: 15px;padding-left: 15px;padding-bottom: 30px;padding-top: 6px;width: 100px;height: 37px;color:white; margin-right: 5px;"
                @click="$emit('closeEditCategory')">CANCEL</button>
              <button class="btn btn-warning" type="button"
                style="border-radius: 100px;padding: 8px;padding-right: 15px;padding-left: 15px;padding-bottom: 30px;padding-top: 6px;width: 100px;height: 37px;color:white;"
                @click="editingCategory">SAVE</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!-- <section class="py-4 position-relative py-xl-5" style="padding-top: 64px;margin-top: -23px;" v-show="showEditForm == 1">
        <div class="container position-relative" style="padding-top: 0px;">
            <div class="row d-flex justify-content-center" style="border-style: none;margin-left: 66px;margin-right: 64px;">
                <div class="col-md-8 col-lg-6 col-xl-5 col-xxl-4" style="padding-top: 0px;">
                    <div class="mb-5 card" style="padding-top: 0px;background: rgba(82,108,147,0.13);">
                        <div class="card-body p-sm-5" style="margin: 0px 7px 0px -1px;margin-right: 7px;margin-left: 5px;padding-top: 48px;margin-top: -10px;">
                            <h2 class="mb-4 text-center" style="padding-top: 0px;margin-top: 3px;">Edit Clinic</h2>
                            <form method="post">
                                <div class="mb-3">
                                    <p style="margin-bottom: 2px;">Clinic Name:</p>
                                    <input class="form-control" type="text" v-model="categoryName" @keyup="validateEventCategoryName" id="name-2" name="name" autofocus="" maxlength="100" :class="{ 'empty-field': ErrorNameNull }" placeholder="categoryName" required>
                                    <span v-if="ErrorNameUnique">This name is already used</span>
                                </div>
                                <div class="mb-3">
                                    <p style="margin-bottom: 4px;">Duration:</p>
                                    <input class="form-control" type="number" v-model="duration" @keyup="validateDuration" @change="validateDuration" placeholder="duration" :class="{'empty-field': ErrorDurationNull }" required>
                                    <span v-if="ErrorDurationRange">Must be in range 1-480</span>
                                </div>
                                <div class="mb-3">
                                    <p style="margin-bottom: 2px;">Description:</p>
                                    <textarea class="form-control" id="message-2" name="message" rows="6" maxlength="500" minlength="0" autofocus="" type="text" v-model="description" placeholder="clinic descrition..." required></textarea>
                                </div>
                            </form>
                            <div class="row">
                                <div class="text-center col">
                                  <button class="btn btn-primary" type="button" style="background: var(--bs-red);margin-right: 11px;border-style: none;" @click="$emit('closeEditCategory')">Cancel</button>
                                  <button class="btn btn-primary" type="button" style="background: var(--bs-yellow);border-style: none;" @click="editingCategory">Save</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->


  <!-- <main class="my-8">
    <div class="px-6 detail-container" v-show="showEditForm == 1">
      <div class="{`col-12 overflow-auto h-3/4 top-28 bottom-auto rounded-lg fixed ${visible ? 'visible' : 'invisible'}`}" >
        

        <nav class="max-h-screen py-2 rounded-t-lg lg:w-12/12 bg-neutral-800">
          <span class="text-2xl font-bold text-justify ml-7 text-zinc-100 col-7">
            Edit Clinic :
          </span>
          <button @click="$emit('closeEditCategory')" id="closeDetail" class="mt-1 col-12">
            <img src="../../assets/close.png" />
          </button>
        </nav>
      

        <div class="overflow-hidden bg-white bg-center bg-cover shadow-lg col-12 shadow-zinc-700">
          <div class="grid gap-6 px-10 mx-16 my-10 mb-6 lg:grid-cols-2">
            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Clinic name :</label>
              <input
                type="text"
                v-model="categoryName"
                @keyup="validateEventCategoryName"
                class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :class="{ 'empty-field': ErrorNameNull }"
                placeholder="categoryName"
                maxlength="100"
                required
              />
              <span class="ml-2 text-red-700 col-1" v-if="ErrorNameUnique">This name is already used</span><br>
            </div>

            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Duration :</label>
              <input
                type="number"
                v-model="duration"
                @keyup="validateDuration"
                @change="validateDuration"
                class="p-4 text-sm text-gray-900 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="duration"
                :class="{ 'empty-field': ErrorDurationNull }"
                required
              />
              <span class="ml-2 font-bold">min </span>
              <span class="ml-2 text-red-700 col-1" v-if="ErrorDurationRange" >Must be in range 1-480</span><br>
            </div>

            <div>
              <label class="block mb-2 text-base font-semibold text-gray-900 dark:text-gray-300">Description :</label>
              <textarea
                type="text"
                rows="5"
                cols="50"
                v-model="description"
                class="p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="clinic descrition..."
                maxlength="500"
                required
              ></textarea>
            </div>

          </div>

          <div class="float-right mr-20">
            <button @click="editingCategory" class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </main> -->
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
  width: 35%;
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

textarea {
  width: 100%;
  border-radius: 15px;
  background: var(--bs-gray-200);
  border-style: none;
  padding: 20px;
  padding-top: 12px;
  padding-bottom: 7px;
  padding-left: 16px;
  font-size: 13px;
  height: 78px;
  margin-left: 5px;
}

textarea:focus {
  background-color: rgb(216 180 254);
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
  font-size: 12px;
  margin-top: 3px;
  margin-left: 2px;
}

.empty-field {
  background: var(--bs-gray-200);
  border-radius: 100px;
  border-width: 0px;
  width: 100%;
  padding: 5px;
  padding-left: 16px;
  font-size: 13px;
  margin-left: 5px;
  margin-top: 3px;
  border: red 2px solid;
}

.input-field {
  background: var(--bs-gray-200);
  border-radius: 100px;
  border-width: 0px;
  width: 100%;
  padding: 5px;
  padding-left: 16px;
  font-size: 13px;
  margin-left: 5px;
  margin-top: 3px;
  border: white 2px solid;
}

/* .detail-container {
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
.empty-field {
  border: red 2px solid;
}
*/
</style> 
