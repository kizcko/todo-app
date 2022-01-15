<template>
<div class="add">
    <h2>Add new task</h2>
    <input type="text" v-model="beforeSubmit" class="inputTask" @keydown.enter="submitNew(beforeSubmit)">
    <button class="submittask" @click="submitNew(beforeSubmit)" ><span>Submit</span></button>
    <h3 class="error">{{error}}</h3>
</div>
</template>
<script>
  import {ref} from 'vue'
  export default {
    setup() {
      let beforeSubmit = ref('');
      let error = ref('');
      return{
        beforeSubmit,error
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },

      submitNew(title){
        if(title.trim().length === 0){
          this.error = "Error: undefined text"
        }
        else{
          this.error = "";
          this.$emit('submitTask',title);
          this.beforeSubmit= "";
        }
      }
    },
  };
</script>
<style> 
    .add{
        
        position: fixed;
        top: 40%;
        left: 33%;
        background-color: rgb(18, 18, 18);
        z-index: 99;
        border-radius: 10px;
        
    }
    .add h2{
      padding: 0 5em;
    }
    
    .inputTask{
      font-family: 'Bodoni Moda', serif;
      font-size: 2em;
      display: block;
      width: 15em;
      margin: 35px 25px;
      background-color: transparent;
      border: 1px solid #b19f55;;
      color: rgb(177, 159, 85);
      text-align: center;
    }

    .submittask{
      font-family: 'Bodoni Moda', serif;
      font-size: 1.2em;
      background-color: transparent;
      color: #b19f55;
      border: 1px solid #b19f55;
      padding: 5px 20px;
      border-radius: 10px;
      cursor: pointer;
      background: linear-gradient(to right, #b19f55 0%, #ebc25a 50%, #ffffff00 50%, #ffffff00 100%);
      background-size: 200%;
      background-position: 100%;
      transition: background-position 0.3s ;
    }
    
    .submittask:hover{
      background-position: 0%;
      color: #242424;
    }
    
    .error{
      color: rgb(152, 70, 55);
      font-size: 1em;
    }

</style>
