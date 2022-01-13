<script setup>
import { reactive, ref } from "vue";
import { createUser, firebaseSignIn } from "../firebase/auth";
import { useUserStore } from "../stores/userInfo";
import { useRouter } from "vue-router";
import { getMemberTagsRef } from "../firebase/tags";
import { getMemberSpendRef } from "../firebase/spend";
import { onValue } from "firebase/database";

const userStore = useUserStore();
const $router = useRouter();

const formLogin = reactive({
  email: "k1319900103@gmail.com",
  psw: "",
});

const formSignup = reactive({
  email: "",
  psw1: "",
  psw2: "",
});

const errMsg1 = ref(null);
const errMsg2 = ref(null);

const emailRule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const handleLogin = () => {
  firebaseSignIn({
    email: formLogin.email,
    password: formLogin.psw,
  })
    .then((res) => {
      errMsg1.value = null;
      userStore.userInfo = res;

      localStorage.setItem("userInfo", JSON.stringify(res));

      const firebaseTagsRef = getMemberTagsRef(res.uid);
      onValue(firebaseTagsRef, (snapshot) => {
        const data = snapshot.val();
        userStore.tagsArr = data?.data || [];
      });

      const firebaseSpendRef = getMemberSpendRef(res.uid);

      onValue(firebaseSpendRef, (snapshot) => {
        const data = snapshot.val() || {};
        let arr = Object.keys(data).map((key) => {
          return { ...data[key], rowKey: key };
        });
        console.log(arr);
        userStore.spendList = [...arr].reverse() || [];
      });

      $router.push({ path: "/edit" });
    })
    .catch((err) => {
      errMsg1.value = "帳密錯誤";
    });
};

const handleSignup = () => {
  createUser({
    email: formSignup.email,
    password: formSignup.psw1,
  })
    .then((res) => {
      errMsg1.value = null;
      errMsg2.value = null;

      userStore.userInfo = res;
      $router.push({ path: "/info" });
    })
    .catch((err) => {
      errMsg2.value = err;
    });
};
</script>

<template>
  <div class="px-4 py-6">
    <div class="w-full md:w-1/2 md:mx-auto">
      <q-tabs
        v-model="userStore.pageTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="signup" label="Signup" />
      </q-tabs>

      <q-tab-panels v-model="userStore.pageTab" animated>
        <q-tab-panel name="login">
          <q-form
            @submit="handleLogin"
            class="q-gutter-md flex justify-around mx-auto"
          >
            <div class="left w-full relative">
              <q-input
                v-model="formLogin.email"
                label="E-mail"
                clearable
                :rules="[
                  (val) => !!val || '必填',
                  (val) => emailRule.test(val) || 'email格式有誤',
                ]"
              />

              <q-input
                maxlength="12"
                v-model="formLogin.psw"
                label="Password"
                type="password"
                clearable
                :rules="[(val) => !!val || '必填']"
              />

              <p v-if="errMsg1" class="text-red-600 absolute left-0 bottom-0">
                {{ errMsg1 }}
              </p>
            </div>
            <div class="right">
              <q-btn
                label="登入"
                icon="fas fa-plus-circle"
                size="md"
                type="submit"
                color="secondary"
                rounded
              />
            </div>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="signup">
          <q-form
            @submit="handleSignup"
            class="q-gutter-md flex justify-around mx-auto"
          >
            <div class="left w-full relative">
              <q-input
                v-model.number="formSignup.email"
                label="E-mail"
                clearable
                :rules="[
                  (val) => !!val || '必填',
                  (val) => emailRule.test(val) || 'email格式有誤',
                ]"
              />

              <q-input
                maxlength="12"
                v-model.number="formSignup.psw1"
                label="Password"
                type="password"
                clearable
                :rules="[(val) => !!val || '必填']"
              />

              <q-input
                maxlength="12"
                v-model.number="formSignup.psw2"
                type="password"
                label="Comfirm Password"
                :rules="[
                  (val) => !!val || '必填',
                  (val) => formSignup.psw1 == formSignup.psw2 || '密碼不一致',
                ]"
                clearable
              />
              <p v-if="errMsg2" class="text-red-600 absolute left-0 bottom-0">
                {{ errMsg2 }}
              </p>
            </div>
            <div class="right">
              <q-btn
                label="註冊"
                icon="fas fa-plus-circle"
                size="md"
                type="submit"
                color="secondary"
                rounded
              />
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
