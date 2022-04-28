<script setup>
import { computed } from "vue";
import { useUserStore, useServiceStore, useStadiumStore } from "../../stores";
import { updateServiceInfo } from "../../firebase/service";
import { date, useQuasar } from "quasar";

const $q = useQuasar();
const UserStore = useUserStore();
const { email, metadata, uid, photoURL, displayName } =
  UserStore.getUserInfo || {};
const ServiceStore = useServiceStore();
const StadiumStore = useStadiumStore();
const userData = UserStore.getUserlist.filter((uItem) => uItem.uid == uid)[0];
const { createdAt } = metadata || {};
const dateStr = date.formatDate(parseInt(createdAt), "YYYY-MM-DD");
const bookList = computed(() => {
  let arr = [];
  arr = ServiceStore.getServicelist?.filter((sItem) => {
    return sItem.attendent.includes(uid);
  });
  return arr;
});
const total = computed(() => {
  console.log("in total~", bookList);
  let total = 0;
  return total;
});
const handleUnBookService = (rowItem) => {
  $q.dialog({
    title: `取消預約服務: ${rowItem.name}?`,
    message: ``,
    cancel: true,
  }).onOk(() => {
    let params = {
      ...rowItem,
      attendent: [...rowItem.attendent.filter((item) => item != uid)],
    };
    updateServiceInfo(params).then((res) => {
      console.log(res);
    });
  });
};
</script>

<template>
  <q-page class="flex column mx-4">
    <div class="w-full md:w-1/2 md:mx-auto my-4 p-4 infoPage">
      <q-avatar font-size="2rem" color="primary" text-color="white">
        <img
          v-if="userData.avatar"
          :src="userData.avatar"
          alt="userData.avatar"
        />
      </q-avatar>
      {{ userData.email || "" }}
      <div class="px-1 py-4">{{ userData.name || "" }}</div>
      <div class="px-1 py-4">Signup At : {{ dateStr }}</div>
      <div class="px-1 py-4">Firebase uid : {{ uid }}</div>
    </div>
    <section class="w-full md:w-1/2 mx-auto px-6 p-10">
      <h2
        class="text-4xl font-bold text-center text-gray-800 mb-8 font-Oswald-500"
      >
        已預約服務
      </h2>
      <div class="mb-3" v-for="item in bookList" :key="item.id">
        <h3 class="w-full font-bold text-2xl">{{ item.name }}</h3>
        <div class="flex flex-nowrap relative">
          <q-img
            class="h-12 lg:h-24 w-1/3 block"
            :src="
              item.img ? item.img : 'https://cdn.quasar.dev/img/parallax2.jpg'
            "
          />
          <div class="w-1/2">
            <p>
              <q-icon name="attach_money" class="text-2xl p-2" />{{
                item.price
              }}
            </p>
            <p v-if="item.server">
              <q-icon name="face" class="text-2xl p-2" />{{
                UserStore.getUserlist.filter(
                  (uItem) => uItem.uid == item.server
                )[0]?.name
              }}
            </p>
            <p class="pl-3">
              {{
                StadiumStore.getStadiumlist.filter(
                  (sItem) => sItem.id == item.stadium
                )[0]?.name || ""
              }}
            </p>
            <p class="pl-3">目前預約人數:{{ item.attendent?.length || 0 }}</p>
            <p v-if="item.desc" class="pl-3">{{ item.desc }}</p>
          </div>
          <div class="absolute right-0 top-6">
            <q-btn
              label="取消預約"
              icon="remove"
              size="md"
              color="secondary"
              rounded
              @click="
                () => {
                  handleUnBookService(item);
                }
              "
            />
          </div>
        </div>
      </div>
      <div class="py-4">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="flex justify-end text-2xl font-bold">
        總和:{{
          bookList.map((item) => item.price).reduce((pre, acc) => pre + acc, 0)
        }}
      </div>
    </section>
  </q-page>
</template>

<style scoped lang="scss"></style>
