<template>
  <div id="app">
    <div id="navbar" class="navbar navbar-expand-lg navbar-light">
      <h1>Kanban</h1>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modal1">
        Add Todo
      </button>
    </div>
    <div class="isi">
      <categories v-for="(task, index) in taskList" :key="index"
      :header="task.name" :tasks="task.tasks"></categories>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="Modal1" tabindex="-1" role="dialog"
      aria-labelledby="Modal1Label" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="Modal1Label">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addTodo">
              <div class="form-group">
                <label for="title">Title: </label>
                <input type="text" class="form-control" id="title" v-model="title"
                placeholder="Belajar Vuex">
              </div>
              <div class="form-group">
                <label for="description">Description: </label>
                <textarea class="form-control" id="description" v-model="description"
                placeholder="Susah bre"></textarea>
              </div>
              <div class="form-group">
                <label for="point">Point: </label>
                <input type="text" class="form-control" id="point" v-model="point">
              </div>
              <div class="form-group">
                <label for="assigned">Assigned to: </label>
                <input type="text" class="form-control" id="assigned" v-model="assigned"
                placeholder="Ucup">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click.prevent="addTodo">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categories from './components/categories.vue';
import db from './api/firebase';

const taskData = [
  {
    name: 'Back-log',
    tasks: [],
  },
  {
    name: 'To-Do',
    tasks: [],
  },
  {
    name: 'On-Going',
    tasks: [],
  },
  {
    name: 'Finished',
    tasks: [],
  },
];

export default {
  name: 'app',
  components: {
    categories,
  },
  data() {
    return {
      taskList: taskData,
      title: '',
      description: '',
      point: 0,
      assigned: '',
      tasks: [],
    };
  },
  methods: {
    addTodo() {
      db.collection('Tasks')
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assigned: this.assigned,
          status: 'Back-log',
          createdAt: new Date(),
        })
        .then((docref) => {
          this.title = '';
          this.description = '';
          this.point = 0;
          this.assigned = '';
          console.log('docref', docref);
          // Buat nutup modal
          // $('#Modal1').modal('hide');
        })
        .catch((error) => {
          console.log('error');
          console.log(error);
        });
    },
  },
  created() {
    db.collection('Tasks')
      .onSnapshot((snapshot) => {
        const temp = [];
        snapshot.docChanges().forEach((change) => {
          const entry = change.doc.data();
          const { id } = change.doc;
          entry.id = id;
          this.taskList.forEach((item) => {
            if (entry.status === item.name) {
              item.tasks.push(entry);
            }
          });
          temp.push(entry);
          console.log(temp);
          this.tasks = temp;
        });
      });
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#navbar {
  display: flex;
  justify-content: space-between;
}
</style>
