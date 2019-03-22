<template>
<form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
        <b>Completa los siguientes campos:</b>
        <ul>
            <li v-for="error in errors">
                {{error}}
            </li>
        </ul>
    </p>
    <p>
        <label for="titulo">Titulo</label>
        <input id="titulo" v-model="notification.titulo" placeholder="titulo">
    </p>
    <p>
        <label for="descripcion">Descripcion:</label>
        <textarea id="descripcion" v-model="notification.descripcion" placeholder="descripcion"></textarea>
    </p>
    <p>
        <label for="area">Area:</label>
        <select id="area" v-model.number="notification.area">
            <option>Ambiental</option>
            <option>Sistemas</option>
            <option>Eletronica</option>
            <option>Redes</option>
            <option>Politica Social</option>
        </select>
    </p>    
    
    <p>
        <input type="submit" value="Submit">
    </p>
</form>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";

export default {
    props:['id'],
    data(){        
        return {
            notification:{
                titulo:null,
                descripcion:null,
                area: null,
                fecha:null,
                time: null,
            },
            errors:[],
        }
    },
    created(){
        if(this.id){
            ServiceApi.getNotification(this.id)
                .then(response=>{
                    this.notification = response.data;                    
                }).catch(error=>{
                    console.log('there was an error ',error);
                });
        }
    },
    methods:{
        createNotification(notificacion){
            ServiceApi.postNotification(notificacion)
                .then(response=>{
                    this.$router.push({name: 'usuario'});
                }).catch(this.getErrorApi);
        },
        updateNotification(notificacion){
            ServiceApi.putNotification(this.id,notificacion)
                .then(response=>{
                    this.$router.push({name: 'usuario'});
                }).catch(this.getErrorApi);
        },
        getErrorApi(error){
            console.log(`there was an error ${error} on form notification`);
        },

        onSubmit(){            
            this.errors=[];
            if(this.notification.titulo && this.notification.descripcion && this.notification.area){
                const datenow = new Date();
                const minutes = (datenow.getMinutes()<10)?'0'+datenow.getMinutes():datenow.getMinutes(); 
                const notificacion = {
                    titulo:this.notification.titulo,
                    descripcion: this.notification.descripcion,
                    area: this.notification.area,
                    fecha: datenow.getUTCDate()+'-'+datenow.getUTCMonth()+'-'+datenow.getUTCFullYear(),
                    time: datenow.getHours()+':'+minutes
                };
                if(!this.id) this.createNotification(notificacion);
                else this.updateNotification(notificacion);

                this.titulo=null;
                this.descripcion=null;
                this.area=null;
            }else{
                if(!this.titulo) this.errors.push('Titulo es requerido');
                if(!this.descripcion) this.errors.push('Descripcion es requerido');
                if(!this.area) this.errors.push('Area es requerido');
            }
        }
    }
};
</script>

<style scoped>
.review-form {
    width: 400px;
    padding: 20px;
    margin: 40px;
    border: 1px solid #d8d8d8;
  }
  
  input {
    width: 100%;  
    height: 25px;
    margin-bottom: 20px;
  }
  
  textarea {
    width: 100%;
    height: 60px;
  }
</style>
