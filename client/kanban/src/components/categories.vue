<template>
<div>
  <div class="card mb-4" style="width: 300px;" >
    <div class="card-header bg-primary text-white">{{header}}</div>
    <div class="card-body">
      <div class="card mb-4" v-for="(item, index) in tasks" :key="index">
        <div class="card-header">{{item.title}}</div>
        <div class="card-body">
          <p>Description : {{item.description}}</p>
          <p>Point: {{item.point}}</p>
          <p>Assigned: {{item.assigned}}</p>
          <p>Status: {{item.status}}</p>
        </div>
        <div id="classFooter" class="card-footer">
          <button class="btn btn-primary" v-show="header != 'Back-log'"
          @click.prevent="prev(item.id)">Prev</button>
          <button class="btn btn-danger"
          @click.prevent="deleteTask(item.id)">Delete</button>
          <button class="btn btn-primary" v-show="header != 'Finished'"
          @click.prevent="next(item.id)">Next</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import swal from 'sweetalert';
import db from '../api/firebase';

export default {
  name: 'categories',
  props: [
    'header',
    'tasks',
  ],
  methods: {
    deleteTask(id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this imaginary file!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return db.collection('Tasks')
              .doc(id)
              .delete();
          }
          return null;
        })
        .then((data) => {
          if (data !== null) {
            swal('Poof! Your imaginary file has been deleted!', {
              icon: 'success',
            });
          } else {
            swal('Deletion canceled!');
          }
        })
        .catch((error) => {
          console.log('Error deleting file:', error);
        });
    },
    prev(id) {
      const docRef = db.collection('Tasks').doc(id);
      let prevHeader;
      if (this.header === 'Finished') {
        prevHeader = 'On-Going';
      } else if (this.header === 'On-Going') {
        prevHeader = 'To-Do';
      } else {
        prevHeader = 'Back-log';
      }
      console.log({ thisheader: this.header, id, prevHeader });
      return db.runTransaction(transaction => transaction.get(docRef).then((sfDoc) => {
        if (!sfDoc.exists) {
          console.log('Document not exist!');
        }
        // sfDoc.data().status = this.header;
        transaction.update(docRef, { status: prevHeader });
      }))
        .then(() => {
          console.log('Transaction commited');
          // const newTasks = this.tasks.filter(item => item.id !== id);
          // this.$emit('change-table', { newTasks, header: this.header });
        })
        .catch((error) => {
          console.log('Transaction error:', error);
        });
    },
    next(id) {
      const docRef = db.collection('Tasks').doc(id);
      let nextHeader;
      if (this.header === 'Back-log') {
        nextHeader = 'To-Do';
      } else if (this.header === 'To-Do') {
        nextHeader = 'On-Going';
      } else {
        nextHeader = 'Finished';
      }
      console.log({ thisheader: this.header, id, nextHeader });
      return db.runTransaction(transaction => transaction.get(docRef).then((sfDoc) => {
        if (!sfDoc.exists) {
          console.log('Document not exist!');
        }
        transaction.update(docRef, { status: nextHeader });
      }))
        .then(() => {
          console.log('Transaction commited');
          // const newTasks = this.tasks.filter(item => item.id !== id);
          // this.$emit('change-table', { newTasks, header: this.header });
        })
        .catch((error) => {
          console.log('Transaction error:', error);
        });
    },
  },
};
</script>

<style>
.isi {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
#classFooter {
  display: flex;
  justify-content: space-around;
}
</style>
