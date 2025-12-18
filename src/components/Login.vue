<template>
  <div class="page">
    <div class="login-container">
      <h2>Logowanie</h2>
      <input v-model="email" placeholder="Email" /><br /><br />
      <input
        v-model="password"
        type="password"
        placeholder="Hasło"
      /><br /><br />
      <button @click="login">Zaloguj</button>
      <p style="color: red" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    (u) => u.email === email.value && u.password === password.value
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    router.push("/dashboard");
  } else {
    error.value = "Niepoprawny email lub hasło";
  }
};
</script>
<style scoped>
h2 {
  font-weight: 700;
  background-color: #7e5687;
  padding: 20px;
  color: white;
  border-radius: 10px;
}
input {
  background: #efe3e7;
  border: none;
  margin: 5px;
  padding: 10px;
  border-radius: 12px;
  font-weight: 600;
}
button {
  background-color: #dec7db;
  border: none;
  margin: 5px;
  border-radius: 10px;
  padding: 10px;
  font-weight: 700;
}
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 700px;
  text-align: center;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 1px 1px 20px 10px #7e5687;
}
</style>
