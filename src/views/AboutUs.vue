<script setup>
  import Member_ComponentVue from '../components/Member_Component.vue';
</script>

<template>
  <!-- <main class="m-3 my-8 col-12">
    <div class="container justify-center px-1 mx-auto text-center col-12">
      <h2 class="mb-3 text-5xl font-bold text-black uppercase col-12"> members </h2>
      <h2 class="text-3xl font-bold text-black uppercase mb-28 col-12"> team : เหนื่อยก็พัก เจอบั๊กก็ค่อยแก้ </h2>
      <div class="grid gap-8 m-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 md:m-2 sm:m-1">
        <Member_ComponentVue :name="'PICHAYA PAIRIN'" :stdId="'63130500086'" :img="'game.jpg'" :facebook="'https://www.facebook.com/'"></Member_ComponentVue>
        <Member_ComponentVue :name="'ARISA AUDOMKHACHONKITTI'" :stdId="'63130500134'" :img="'ice.jpg'"></Member_ComponentVue>
        <Member_ComponentVue :name="'CHANANYA SINPHICHIT'" :stdId="'63130500140'" :img="'mod2.jpg'"></Member_ComponentVue>
      </div>
    </div>
  </main> -->
  <div class="container py-4 d-inline py-xl-5 pt-lg-0 mt-lg-0 pb-lg-0" style="width: 1320px;padding: 32px 12px;">
        <div class="mb-4 row mb-lg-4">
            <div class="mx-auto text-center col-md-8 col-xl-6">
                <h2>Our Team</h2>
                <p class="w-lg-50">We strive to do everything so that you can comfortably and productively work in our space and create amazing services.</p>
            </div>
        </div>
        <div class="row gy-4 row-cols-1 row-cols-md-4 justify-content-center">
            <div class="col" style="width: 260px;">
                <div class="border-0 shadow-none card">
                    <div class="p-0 text-center card-body d-flex flex-column align-items-center"><img class="mb-3 rounded fit-cover" width="240" height="260" src="../assets/members/game.jpg" style="width: 200px;height: 260px;">
                        <h5 class="mb-0 fw-bold text-primary card-title">Pichaya Pairin<br></h5>
                        <p class="mb-2 text-muted card-text">63130500086</p>
                    </div>
                </div>
            </div>
            <div class="col" style="width: 260px;">
                <div class="border-0 shadow-none card">
                    <div class="p-0 text-center card-body d-flex flex-column align-items-center"><img class="mb-3 rounded fit-cover" width="240" height="260" src="../assets/members/ice.jpg" style="width: 200px;height: 260px;">
                        <h5 class="mb-0 fw-bold text-primary card-title">Arisa Audomkhachonkitti<br></h5>
                        <p class="mb-2 text-muted card-text">63130500134</p>        
                    </div>
                </div>
            </div>
            <div class="col" style="width: 260px;">
                <div class="border-0 shadow-none card">
                    <div class="p-0 text-center card-body d-flex flex-column align-items-center"><img class="mb-3 rounded fit-cover" width="240" height="260" src="../assets/members/mod.jpg" style="width: 200px;height: 260px;">
                        <h5 class="mb-0 fw-bold text-primary card-title"><strong>Chananya Sinphichit</strong></h5>
                        <p class="mb-2 text-muted card-text">63130500140</p>
                    </div>
                </div>
              </div>

        </div>
  </div>
</template>

<style scoped></style>
