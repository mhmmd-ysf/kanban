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
          <button class="btn btn-primary" v-if="header != 'Back-log'">Prev</button>
          <button class="btn btn-danger">Delete</button>
          <button class="btn btn-primary" v-if="header != 'Finished'">Next</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'categories',
  props: [
    'header',
    'tasks',
  ],
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
