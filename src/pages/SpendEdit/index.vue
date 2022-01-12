<script setup>
import { ref } from "vue";
import Statics from "./Statics.vue";
import Tags from "./Tags.vue";
import Spend from "./Spend.vue";

const tab = ref("spend");

</script>

<template>
  <div class="flex column justify-start text-center py-4">
    <div class="w-full w-md-1/2">
      <div class="px-4">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="statics" label="Statics" />
          <q-tab name="tag" label="Tag" />
          <q-tab name="spend" label="Spend" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="statics">
              <Statics />
          </q-tab-panel>

          <q-tab-panel name="tag">
              <Tags />
          </q-tab-panel>
          <q-tab-panel name="spend">
              <Spend />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <div class="w-full w-md-1/2">
      <div class="px-4"></div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
