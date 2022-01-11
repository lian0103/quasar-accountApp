<script setup>
import { reactive, ref } from "vue";
import {createUser} from '../firebase/auth';

const formSignup = reactive({
  email: "k1319900103@gmai.com",
  psw1: "123456",
  psw2: "123456",
});

const emailRule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const handleClick = (val) => {
  console.log("in click");
};

const handleSignup = ()=>{
    createUser({
        email:formSignup.email,
        password:formSignup.psw1
    })
}

</script>

<template>
  <div class="px-4 py-6">
    <div class="w-full md:w-1/2 md:mx-auto">
      <h2 class="text-2xl py-2 text-center">SIGNUP</h2>
      <q-form
        @submit="handleSignup"
        class="q-gutter-md flex justify-around mx-auto"
      >
        <div class="left w-full">
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
            :rules="[
              (val) => !!val || '必填',
              (val) => val.length >= 6 || '密碼長度6-12位',
            ]"
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
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
