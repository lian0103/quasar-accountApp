<script setup>
import { ref } from "vue";
import {
  useServiceStore,
  useUserStore,
  useStadiumStore,
} from "../../stores/index";
import { useQuasar } from "quasar";

const ServiceStore = useServiceStore();
const UserStore = useUserStore();
const StadiumStore = useStadiumStore();
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

  <section class="w-full md:w-3/4 mx-auto px-6 p-10">
    <h2
      class="text-4xl font-bold text-center text-gray-800 mb-8 font-Oswald-500"
    >
      可預約服務
    </h2>
    <div class="cardBox flex-wrap lg:flex-nowrap">
      <q-card
        class="card bg1 h-40 lg:h-80 lg:mx-2 my-2 w-full lg:w-1/3"
        v-for="item in ServiceStore.getServicelist"
        :key="item.id"
      >
        <q-card-section class="pb-12 flex lg:flex-col">
          <q-img
            class="h-36 w-1/2 lg:w-full block lg:hidden"
            :src="
              item.img ? item.img : 'https://cdn.quasar.dev/img/parallax2.jpg'
            "
          >
            <div class="absolute-bottom text-h6">{{ item.name }}</div>
          </q-img>
          <div class="w-1/2 lg:w-full">
            <p>
              <q-icon name="attach_money" class="text-2xl p-2" />{{
                item.price
              }}
            </p>
            <p>
              <q-icon name="face" class="text-2xl p-2" />{{
                UserStore.getUserlist.filter(
                  (uItem) => uItem.uid == item.server
                )[0]?.name
              }}
            </p>
            <p class="pl-3">{{ item.desc }}</p>
            <p class="pl-3">目前預約人數:{{ item.attendent?.length || 0 }}</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
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

<style lang="scss" scoped>
.cardBox {
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    overflow: hidden;
    @media screen and (min-width: 1023px) {
      max-width: 320px;
    }
  }
  .bg1{
    background: $warning;
  }
}
</style>
