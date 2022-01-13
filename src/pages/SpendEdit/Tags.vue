<script setup>
import { reactive } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "../../stores/userInfo";
import { setTag } from "../../firebase/tags";

const userStore = useUserStore();
const uid = userStore.userInfo.uid;

const formTags = reactive({
  add: "",
});

const $q = useQuasar();

const handleDeleteTag = (item) => {
  $q.dialog({
    title: `Delete ${item} ?`,
    message: "刪除後相關的Tag會被歸類為未分類",
    cancel: true,
  }).onOk(() => {
    let arr = userStore.tagsArr.filter((i) => i != item);
    setTag(arr, uid);
  });
};

const handleRules = (target) => {
  switch (target) {
    case "tag": {
      return (val) => !!val || "tag不為空";
    }
    case "tags": {
      return (val) =>
        (!userStore.tagsArr.includes(val) && userStore.tagsArr.length <= 10) ||
        "tag不重複且最多為10個";
    }
  }
};

const handleAddTag = () => {
  setTag([...userStore.tagsArr, formTags.add], uid);
  formTags.add = "";
};
</script>

<template>
  <div class="w-full md:w-1/2 md:mx-auto">
    <h2 class="text-2xl py-2">分類標籤</h2>
    <div class="py-2 text-left">
      <q-chip dense v-for="item in userStore.tagsArr">
        <div
          @click="
            () => {
              handleDeleteTag(item);
            }
          "
        >
          <q-avatar icon="bookmark" color="red" text-color="white" />
          {{ item }}
        </div>
      </q-chip>
    </div>

    <q-form
      @submit="handleAddTag"
      class="q-gutter-md flex justify-around mx-auto"
    >
      <div class="left w-full">
        <q-input
          maxlength="8"
          v-model="formTags.add"
          label="Tags"
          :rules="[handleRules('tags')]"
        />
      </div>

      <div class="right">
        <q-btn
          label="ADD"
          icon="fas fa-plus-circle"
          size="md"
          type="submit"
          color="primary"
          rounded
        />
      </div>
    </q-form>
  </div>
</template>
