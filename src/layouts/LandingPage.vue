<script setup>
import HeaderVue from "../components/Header.vue";
import { ref } from "vue";

const slide = ref("1");
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderVue />
    <q-page-container class="text-gray-700 container mx-auto">
      <div
        class="py-12"
        style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      >
        <div class="w-full md:w-1/2 mx-auto px-6">
          <h2 class="text-2xl mb-2 text-white font-Oswald-500">Account APP</h2>
          <p class="text-lg my-4 text-gray-200 leading-normal">
            這次主要想測試Quasar(VueJS
            UI庫)，來實現記帳的應用，使用包含Quasar的Tab、Dialog、Form、和Dialog等組件。
            並搭配Google Firebase平台API，實作權限註冊、儲存即時資料和專案佈署。
          </p>
          <div class="flex my-2">
            <img class="h-12 mr-2" src="https://i.imgur.com/Xrd4Tlm.png" />
            <img
              class="h-12 mr-2"
              src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
            />
            <img
              class="h-12 mr-2"
              src="https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg"
            />
          </div>
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
          Stacks
        </h2>
        <p class="text-lg my-4 leading-normal">
          Firebase:Authentication、realtimeDB、hosting<br />
          Vue3<br />
          Pinia<br />
          Quasar & Quasar cli<br />
          Tailwindcss<br />
          Vue3apexchart
        </p>
      </section>

      <section class="w-full md:w-1/2 mx-auto px-6 p-10">
        <h2
          class="text-4xl font-bold text-center text-gray-800 mb-8 font-Oswald-500"
        >
          Features
        </h2>
        <div class="flex items-center flex-wrap mb-20">
          <div class="w-full md:w-1/3">
            <h4 class="text-3xl text-gray-800 font-bold mb-3">權限</h4>
            <p class="text-gray-600 mb-8 leading-loose">
              1.Email/Google帳號註冊<br />
              2.登入/登出
            </p>
          </div>
          <div class="w-full md:w-2/3 h-auto shadow-xl">
            <img
              class="object-fill h-70 mx-auto"
              src="https://i.imgur.com/HRa84Fg.jpg"
            />
          </div>
        </div>

        <div class="flex items-center flex-wrap mb-20 md:flex-row-reverse">
          <div class="w-full md:w-1/3 md:pl-10">
            <h4 class="text-3xl text-gray-800 font-bold mb-3">記帳</h4>
            <p class="text-gray-600 mb-8 leading-loose">
              1. 新/刪/查/改 消費紀錄<br />
              2. 新/刪/查/改 記帳Tag<br />
              3. 消費紀錄統計圖表
            </p>
          </div>
          <div class="w-full md:w-2/3 h-auto shadow-xl">
            <img
              class="object-fill h-70 mx-auto"
              src="https://i.imgur.com/80BpjBe.png"
            />
          </div>
        </div>
      </section>

      <section class="w-full md:w-1/2 mx-auto px-6 p-10">
        <h2
          class="text-4xl font-bold text-center text-gray-800 mb-8 font-Oswald-500"
        >
          PWA
        </h2>
        <p class="text-lg my-4 leading-normal">
          透過Quasar
          cli可以打包PWA版本，在桌機chrome和移動端sarfari中可以下載使用。<br />
        </p>
        <div class="w-4/5 mx-auto">
          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            thumbnails
            infinite
            control-color="primary"
            class="rounded-borders"
            :height="$q.platform.is.desktop ? '480px' : '320px'"
            position="bottom-right"
          >
            <q-carousel-slide
              name="1"
              class="bg-contain bg-left-top bg-no-repeat column no-wrap flex-center"
              img-src="https://i.imgur.com/WA6H8s5.jpg"
            >
              <p
                class="w-full md:w-1/2 text-2xl text-black text-right font-bold"
              >
                Safari下載
              </p>
            </q-carousel-slide>
            <q-carousel-slide
              name="2"
              class="bg-contain bg-left-top bg-no-repeat column no-wrap flex-center"
              img-src="https://i.imgur.com/eAxLq5P.jpg"
            >
              <p
                class="w-full md:w-1/2 text-2xl text-black text-right font-bold"
              >
                主畫面圖示
              </p>
            </q-carousel-slide>
            <q-carousel-slide
              name="3"
              class="bg-contain bg-left-top bg-no-repeat column no-wrap flex-center"
              img-src="https://i.imgur.com/4oMvR5Z.jpg"
            >
              <p
                class="w-full md:w-1/2 text-2xl text-black text-right font-bold"
              >
                統計花費
              </p>
            </q-carousel-slide>
            <q-carousel-slide
              name="4"
              class="bg-contain bg-left-top bg-no-repeat column no-wrap flex-center"
              img-src="https://i.imgur.com/kWiwl2m.jpg"
            >
              <p
                class="w-full md:w-1/2 text-2xl text-black text-right font-bold"
              >
                紀錄花費
              </p>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </section>
    </q-page-container>
  </q-layout>
</template>
