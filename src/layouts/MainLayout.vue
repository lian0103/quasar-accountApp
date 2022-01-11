<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const quasar = useQuasar();
const isDark = ref(quasar.dark.isActive);
const toggle = () => {
  quasar.dark.toggle();
  isDark.value = quasar.dark.isActive;
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <i class="fas fa-file-invoice-dollar text-2xl"></i>
          SPENDING
        </q-toolbar-title>

        <q-btn
          round
          size="10px"
          :color="isDark ? 'white' : 'blue-grey-10'"
          :icon="isDark ? 'lightbulb_outline' : 'lightbulb'"
          :style="isDark ? 'color: #ccc !important;' : 'color: #fff;'"
          @click="toggle"
        />
        <q-btn class="mx-2" label="Login" @click="() => {}" color="secondary" />
        <div class="px-2">v0.0.1</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-tabs>
        <q-route-tab class="w-1/2" icon="fas fa-dollar-sign" to="/edit" exact />
        <q-route-tab class="w-1/2" icon="fas fa-info-circle" to="/info" exact />
      </q-tabs>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.header {
  background-color: $info;
}
</style>
