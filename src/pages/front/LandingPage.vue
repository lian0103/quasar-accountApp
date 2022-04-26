<script setup>
import { ref } from "vue";
const slide = ref("1");
</script>

<template>
  <div
    class="py-12"
    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
  >
    <div class="w-full md:w-1/2 mx-auto px-6">
      <h2 class="text-2xl mb-2 text-white font-Oswald-500 font-bold">
        服務即時預約
      </h2>

      <div class="py-3 flex justify-center md:justify-end">
        <q-btn
          label="註冊帳號"
          icon="fas fa-plus-circle"
          size="md"
          color="secondary"
          to="/signup"
          rounded
        />
      </div>
    </div>
  </div>

  <section class="w-full md:w-1/2 mx-auto px-6 p-10">
    <h2
      class="text-4xl font-bold text-center text-gray-800 mb-8 font-Oswald-500"
    >
      可預約服務
    </h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos excepturi
      dignissimos atque repudiandae provident, aspernatur doloremque perferendis
      aut est error quod explicabo nisi iste corrupti facilis quae et! Delectus,
      voluptates!
    </p>
  </section>

  <section class="w-full md:w-1/2 mx-auto px-6 p-10">
    <h2
      class="text-4xl font-bold text-center text-gray-800 mb-8 font-Oswald-500"
    >
      服務人員/教練/老師
    </h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos excepturi
      dignissimos atque repudiandae provident, aspernatur doloremque perferendis
      aut est error quod explicabo nisi iste corrupti facilis quae et! Delectus,
      voluptates!
    </p>
  </section>

  <section class="w-full md:w-1/2 mx-auto px-6 p-10">
    <h2
      class="text-4xl font-bold text-center text-gray-800 mb-8 font-Oswald-500"
    >
      場館/場地/空間
    </h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos excepturi
      dignissimos atque repudiandae provident, aspernatur doloremque perferendis
      aut est error quod explicabo nisi iste corrupti facilis quae et! Delectus,
      voluptates!
    </p>
  </section>
</template>
