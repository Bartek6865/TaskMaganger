<template>
  <div class="dashboard-container">
    <div class="statistics-container">
      <div class="statistics">Wszystkie projekty: {{ items.length }}</div>
      <div class="statistics">
        Projekty do wykonania: {{ items.filter((i) => !i.completed).length }}
      </div>
      <div class="statistics">
        Projekty ukończone: {{ items.filter((i) => i.completed).length }}
      </div>
      <div><button @click="logout">Wyloguj</button></div>
    </div>
    <div class="item addTask">
      <h1>Dodaj task do zrobienia:</h1>
      <input type="text" placeholder="Nazwa" v-model="newItemName" /><br />
      <input type="text" placeholder="Opis" v-model="newItemDesc" /><br />
      <input type="text" placeholder="Klient" v-model="newItemClient" /><br />

      <button @click="addItem">Dodaj</button>
    </div>
    <div id="toDo">
      <h1 class="toDo">Do wykonania</h1>
      <div
        class="item"
        v-for="item in items.filter((i) => !i.completed)"
        :key="item.id"
        :class="{ completed: item.completed }"
      >
        <div v-if="!item.edit && !item.completed">
          <h1>{{ item.title }}</h1>
          <h2>{{ item.description }}</h2>
          <button v-if="!item.completed" @click="markCompleted(item.id)">
            Zrobione
          </button>
          <button @click="editItem(item.id)" v-if="!item.completed">
            Edytuj
          </button>
          <p class="client">{{ item.client }}</p>
        </div>
        <div v-if="item.edit && !item.completed">
          <h1>
            <input
              type="text"
              placeholder="wpisz zmieniony tytul"
              v-model="item.editTitle"
            />
          </h1>
          <h2>
            <input
              type="text"
              placeholder="wpisz zmieniony opis"
              v-model="item.editDescription"
            />
          </h2>
          <button @click="editConfirm(item.id)">Zatwierdz</button>
          <button @click="editCancel(item.id)">Anuluj</button>
          <p class="client">{{ item.client }}</p>
        </div>
      </div>
    </div>
    <div id="done">
      <h1 class="done">Wykonane</h1>
      <div
        class="item"
        v-for="item in items.filter((i) => i.completed)"
        :key="item.id"
        :class="{ completed: item.completed }"
      >
        <div v-if="item.completed">
          <h1>{{ item.title }}</h1>
          <h2>{{ item.description }}</h2>
          <p class="client">{{ item.client }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Aplikacja ToDo",
          description: "Zrob prosta aplikacje ToDo uzywajac frameworka Vue",
          client: "Klient1",
          completed: false,
          id: 1,
          edit: false,
          editTitle: "",
          editDescription: "",
        },
        {
          title: "Strona WychowujMy!",
          description:
            "Stworz strone firmy WychowujMy uzywajac bootstrap do pociecia HTML",
          client: "Klient2",
          completed: false,
          id: 2,
          edit: false,
          editTitle: "",
          editDescription: "",
        },
      ],
      newItemName: "",
      newItemDesc: "",
      newItemClient: "",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("loggedInUser");
      this.$router.push("/login");
    },

    addItem() {
      if (!this.newItemName || !this.newItemDesc || !this.newItemClient) {
        alert("Wszystkie pola muszą być wypełnione!");
        return;
      }
      this.items.push({
        title: this.newItemName,
        description: this.newItemDesc,
        client: this.newItemClient,
        completed: false,
        id: Date.now(),
        edit: false,
        editTitle: "",
        editDescription: "",
      });
      this.newItemName = "";
      this.newItemDesc = "";
      this.newItemClient = "";
    },

    markCompleted(id) {
      const index = this.items.findIndex((el) => el.id === id);
      this.items[index].completed = true;
    },

    editItem(id) {
      const item = this.items.find((el) => el.id === id);
      item.editTitle = item.title;
      item.editDescription = item.description;
      item.edit = true;
    },

    editConfirm(id) {
      const item = this.items.find((el) => el.id === id);
      item.title = item.editTitle;
      item.description = item.editDescription;
      item.edit = false;
    },

    editCancel(id) {
      const item = this.items.find((el) => el.id === id);
      item.edit = false;
    },
  },
};
</script>

<style scoped>
.item {
  border: 5px solid #cdcdcd;
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 30px;
  background-color: #fffff2;

  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
}

.completed {
  opacity: 0.5;
}
.completed h1 {
  text-decoration: line-through;
}
.client {
  text-align: right;
}
button {
  background-color: #dec7db;
  border: none;
  margin: 5px;
  border-radius: 10px;
  padding: 10px;
  font-weight: 700;
}
input {
  background: #efe3e7;
  border: none;
  margin: 5px;
  padding: 10px;
  border-radius: 12px;
  font-weight: 600;
}
h1 {
  font-weight: 600;
}
h2 {
  font-weight: 200;
}
p {
  font-weight: 100;
}
#toDo {
  width: 49%;
  float: left;
}
#done {
  width: 49%;
  float: right;
}
.done,
.toDo {
  border: 5px solid #63326e;
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 30px;
  background-color: #7e5687;
  color: white;
}
h1 > input,
h2 > input {
  width: 95%;
}
.addTask {
  text-align: center;
}
.addTask > button {
  width: 25%;
}
.addTask > input {
  width: 80%;
}
.statistics-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.statistics {
  border: 3px solid #63326e;
  padding: 5px;
  margin: 5px;
  width: 33%;
  background-color: #7e5687;
  color: white;
  border-radius: 5px;
  font-weight: 600;
}
</style>
