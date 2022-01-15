
<template>
  <h1>Dashboard</h1>
  <h4>Today's Tasks:</h4>
  <div class="list">
    <todoCard v-for="event in list" :key="event.id" :event="event" @finished="finished" @deleteCard="deleteCard" @editToDo="editToDo" @doneEdit="doneEdit"/>
  </div>
  <div class="new">
    <button @click="showModal" class="showModal">+</button>

    <transition name="fade" appear>
    <div class="modal-overlay" v-if="isModalVisible" @click="closeModal"></div>
    </transition>

    <transition name="bounce">
    <newCard class="NewCard" v-show="isModalVisible" @close="closeModal" @submitTask="submitTask"/>
    </transition>
    
  </div>
  
    
</template>

<script>

import {ref} from 'vue'
import todoCard from '@/components/todoCard.vue'
import ListListener from "@/services/ListListener.js"
import newCard from '@/components/newCard.vue'

export default {
  name: 'Home',
  components: {
    todoCard,newCard
  },
  setup(props){
    let list = ref([]);
    let isModalVisible = ref(false);
    return{
      list,isModalVisible
    }
  },
  methods:{
    init(){
      ListListener.getList()
      .then(response => {this.list = response.data})
      .catch(error=>{console.log("There was an error"+ error.response)})
    },
      
    finished(id,finish) {
      ListListener.modifyFinish(id,finish);
      this.init();

    },
    deleteCard(id){
      ListListener.delete(id);
      this.init();
    },
    editToDo(id,edit){
      ListListener.editCard(id,edit);
      this.init();
    },
    doneEdit(id,title){
      ListListener.doneEdit(id,title);
      this.init();
    },
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
    },
    submitTask(title){
        ListListener.submitTask(title);
        this.isModalVisible = false;
        this.init();
        
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap');

h1{
  margin-bottom: 150px;
}
.new{
  display: inline-block;
}
.showModal{
  border: none;
  border-radius: 200px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0 10px;
  font-size: 2em;
  margin: 40px;
  background-color: rgb(12, 12, 12);
  color: rgb(177, 159, 85);
  cursor: pointer;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.modal-overlay{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 100vh 00;
  background-color: rgba(0, 0, 0, 0.886);
  z-index: 98;
}
</style>
