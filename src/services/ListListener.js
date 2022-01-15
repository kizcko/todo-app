import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials:false,    
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
})

export default{
    async getList(){
        return  await apiClient.get('/todolist')
    },
    async modifyFinish(id,finish){
        apiClient.patch(`/todoList/${id}`, {
            finished: !finish
        }).then((response) => {
            
          }, (error) => {
            console.log(error);
          });
    },
    async delete(id){
        apiClient.delete(`/todoList/${id}`).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    },
    async editCard(id,edit){
        apiClient.patch(`/todoList/${id}`, {
            editing: !edit
        }).then((response) => {
            
          }, (error) => {
            console.log(error);
          });
    },
    async doneEdit(id,title_edited){
        //console.log(title_edited)
        apiClient.patch(`/todoList/${id}`, {
            title: title_edited
        }).then((response) => {
           
          }, (error) => {
            console.log(error);
          });
    },
    async submitTask(titleSubmit){
        apiClient.post('/todolist',{
            title: titleSubmit,
            "finished": false,
            "editing": false
        }).then((response) => {
           
          }, (error) => {
            console.log(error);
          });
    }
}