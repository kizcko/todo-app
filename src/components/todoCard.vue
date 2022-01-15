<template>
  <div class="card">
    
    <div :class="{finished: event.finished}" style="display: inline">
      <div class="todo-left">
        <h4 class="todo-label" v-if="!event.editing" @dblclick="editToDo(event.id,event.editing,event.title)">{{event.title}}</h4>
        <input type="text" v-else class="todo-edit" v-model="event.title" v-focus @blur="doneEdit(event.id,event.title,event.editing)" @keyup.enter="doneEdit(event.id,event.title,event.editing)" @keyup.esc="cancelEdit(event.id,event.editing)">
      </div>
      <button class="status" @click="finished(event.id, event.finished)" > {{ event.finished ? 'Completed' : 'On progress' }}</button>
      <button className="bn632-hover bn28" @click="deleteCard(event.id)"> Delete</button>
    </div>
    
    
  </div>
</template>

<script>

export default {
  
  props: {
      event: Object
    },
    setup(props) {
      let beforeEdit = ""
      return{
        beforeEdit
      }
    },
  directives: {
    focus: {
    // directive definition
      mounted(el) {
        el.focus()
      }
    }
  },
  methods: {
      finished(id,finish) {
      this.$emit("finished", id, finish);
      //console.log(this.event.finished)
      },
      deleteCard(id) {
      this.$emit("deleteCard", id);
      //console.log(this.event.finished)
      },
      editToDo(id,edit,title){
        this.beforeEdit = title
        this.$emit("editToDo", id, edit); 
      },
      doneEdit(id,title,edit){
        if(title==="") title = this.beforeEdit;
        this.$emit("doneEdit", id, title);
        this.$emit("editToDo", id, edit);
        this.beforeEdit = ""
      },
      cancelEdit(id,edit){
        console.log("esc pressed")
        this.$emit("doneEdit", id, this.beforeEdit);
        this.$emit("editToDo", id, edit);
      }
  },
    
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap');
  .finished h4{
    text-decoration: line-through;
    color: rgba(114, 114, 114, 0.557);
  }
  .finished .status{
    color: rgb(47, 255, 64);
    
  }
  .finished:after {
  opacity: 0;
  transition: all 0.8s
}
.finished:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}
  .card{
    margin-bottom:10px;
    cursor:pointer;
    background-color: #212121;
    width: 60%;
    display: inline-block;
    border-radius: 15px;

  }
  .todo-left{
    display: inline-block;
    align-items: center;
    width: 200px;
  }
  .todo-label{
    display: inline-block;
    padding: 10px;
    margin-left: 12px;
  }
  .todo-edit{
    font-family: 'Bodoni Moda', serif;
    text-align: center;
    background-color: transparent;
    border: 1px solid rgb(187, 154, 82);
    color: rgb(177, 159, 85);
    font-weight: bold;
    font-size: 1em;
    padding: 10px;
    margin-left: 12px;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  .status{
    display: inline-block;
    position: relative;
  background-color: transparent;
  border: none;
  font-size: 15px;
  color: #f5db43;
  width: 200px;
  text-align: center;
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  }

  .status:after {
  opacity: 0;
  transition: all 0.8s
}
.status:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

.bn632-hover {
  width: 120px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 40px;
  text-align:center;
  border: none;
  background-size: 300% 100%;
  border-radius: 10px;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.bn632-hover:hover {
  background-position: 100% 0;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.bn632-hover:focus {
  outline: none;
}

.bn632-hover.bn28 {
    background-image: linear-gradient(
      to right,
      #c7a228,
      #d3c050,
      #e1bf4e,
      #e2a337
    );
    box-shadow: 0 5px 15px rgba(242, 184, 97, 0.4);
  }
</style>
