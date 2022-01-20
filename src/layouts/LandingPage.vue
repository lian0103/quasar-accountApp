<script setup>
import HeaderVue from "../components/Header.vue";
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderVue />
    <q-page-container
      class="text-gray-700 container mx-auto"
      style="font-family: 'Source Sans Pro', sans-serif"
    >
      <div
        class="py-12"
        style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
      >
        <div class="w-full md:w-1/2 mx-auto px-6">
          <h2 class="text-4xl font-bold mb-2 text-white">Account APP</h2>
          <p class="text-lg my-4 text-gray-200 leading-normal">
            這次主要想測試Quasar(VueJS
            UI庫)，來實現記帳的應用，使用包含Quasar的Tab、Dialog、Form、和Dialog等組件。
            並搭配Google Firebase平台API，實作權限註冊、儲存即時資料和專案佈署。
          </p>
          <div class="flex my-4">
            <img class="h-12 mr-5" src="https://i.imgur.com/Xrd4Tlm.png" />
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
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">
          Stacks
        </h2>
        <p class="text-lg my-4 leading-normal">
          Firebase:Authentication、realtimeDB、hosting<br />
          Vue3<br />
          Pinia<br />
          Quasar v2.0.0 & Quasar cli<br />
          Tailwindcss<br />
          Vue3apexchart
        </p>
      </section>

      <section class="w-full md:w-1/2 mx-auto px-6 p-10">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">
          Features
        </h2>
        <div class="flex items-center flex-wrap mb-20">
          <div class="w-full md:w-1/3">
            <h4 class="text-3xl text-gray-800 font-bold mb-3">權限</h4>
            <p class="text-gray-600 mb-8 leading-loose">
              1.註冊user<br />
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
    </q-page-container>
  </q-layout>
</template>
