import { getFunctions, httpsCallable } from "firebase/functions";

const handleSayHi = () => {
  //D:\frontEnd\quasar\quasar-accountApp\functions\index.js
  const functions = getFunctions();
  const sayHi = httpsCallable(functions, "sayHi");

  sayHi().then((res) => {
    console.log(res);
  });
};
