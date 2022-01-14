<script setup>
import { reactive, ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "../../stores/userInfo";
import { setTag } from "../../firebase/tags";
import { setSpendList } from "../../firebase/spend";

const userStore = useUserStore();
const uid = userStore.userInfo.uid;

const formTags = reactive({
  add: "",
});

const formEdit = ref({
  edit: "",
  preEdit: "",
});

const dialog = ref(false);

const $q = useQuasar();

const handleTagEdit = (item) => {
  // console.log(item);
  formEdit.value.edit = item;
  formEdit.value.preEdit = item;
  dialog.value = true;
};

const handleTagSave = () => {
  if (!!formEdit.value.edi && formEdit.value.edit != formEdit.value.preEdit) {
    let newArr = [...Object.values(userStore.tagsArr)].map((str) => {
      if (str == formEdit.value.preEdit) {
        return formEdit.value.edit;
      }
      return str;
    });
    // console.log(Object.values(userStore.tagsArr));
    // console.log(arr);
    setTag(newArr, uid);

    let newlist = userStore.spendList.map((item) => {
      return {
        ...item,
        tag:
          item.tag == formEdit.value.preEdit ? formEdit.value.edit : item.tag,
      };
    });
    setSpendList(newlist, uid);
    dialog.value = false;
  }
};

const handleTagDelete = () => {
  let targetTag = formEdit.value.edit;
  $q.dialog({
    title: `Delete ${targetTag} ?`,
    message: "刪除後相關的Tag會被歸類為未分類",
    cancel: true,
  }).onOk(() => {
    let arr = userStore.tagsArr.filter((i) => i != targetTag);
    setTag(arr, uid);

    let newlist = userStore.spendList.map((item) => {
      return {
        ...item,
        tag: item.tag == targetTag ? "" : item.tag,
      };
    });
    setSpendList(newlist, uid);

    dialog.value = false;
  });
};

const handleRules = (target) => {
  switch (target) {
    case "tags": {
      return (val) =>
        (!userStore.tagsArr.includes(val) && userStore.tagsArr.length <= 10) ||
        "tag不重複且最多為10個";
    }
  }
};

const handleAddTag = () => {
  if (!formTags.add) return false;
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
              handleTagEdit(item);
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

    <q-dialog v-model="dialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Edit</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="handleTagSave"
            class="q-gutter-md flex justify-around mx-auto"
          >
            <div class="left w-full">
              <q-input
                maxlength="8"
                v-model="formEdit.edit"
                label="Tags"
                :rules="[handleRules('tags')]"
              />
            </div>
            <div class="w-full flex justify-between">
              <q-btn color="negative" label="Delete" @click="handleTagDelete" />
              <q-btn label="Save" type="submit" />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
