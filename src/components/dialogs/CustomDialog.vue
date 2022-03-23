<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      CustomDialog1
      <component :is="getCurBodyComponentName"></component>
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { computed } from "vue";

export default {
  props: {
    // ...your custom props
    type: String,
    bodyComponentName: String,
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],

  setup(props) {
    console.log("props", props);

    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const getCurBodyComponentName = computed(() => {
      return props.bodyComponentName;
    });

    return {
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK();
      },
      onCancelClick: onDialogCancel,
      getCurBodyComponentName,
    };
  },
};
</script>
