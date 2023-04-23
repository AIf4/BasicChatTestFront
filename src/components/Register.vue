<template>

<div class="form-signin  w-100 m-auto center-box">
    <div class="alert " :class="{ 'alert-success': !alert.hasError, 'alert-danger': alert.hasError }" role="alert"  v-if="alert.message != '' ">
        {{alert.message}}
    </div>
    <p class="h3 mb-3 text-center fw-normal">Registro de usuario</p>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" v-model="name" id="floatingName" placeholder="nombre estudiante">
        <label for="floatingName">Nombre Estudiante</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control"  v-model="username" id="floatingNickname" placeholder="nombre de usuario">
        <label for="floatingNickname">Nickname</label>
    </div>
    <div class="form-floating mb-3">
        <input type="password" class="form-control" v-model="password" id="floatingPassword" placeholder="contraseña">
        <label for="floatingPassword">Contraseña</label>
    </div>
    <div class="form-floating mb-3">
        <select class="form-select" v-model="type_user" id="floatingSelect" aria-label="Seleccione el tipo de usuario">
            <option value="0" selected>Estudiante</option>
            <option value="1">Moderador</option>
        </select>
        <label for="floatingSelect">Seleccione el tipo de usuario</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary mb-3" @click="createUser()" >Registrar</button>
    <p class="text-center fw-medium text-muted">
        <a class="text-decoration-none" href="/">Volver al login</a>
    </p>
    
</div>  

</template>

<script>
export default {
    name: 'register-page',
    data() {
      return {
        name: '',
        username: '',
        password: '',
        type_user: 0,
        alert: {
            hasError: false,
            message:''
        }
      }
    },
    methods: {
        createUser(){
            this.axios.post(
                'http://localhost:3000/user',
                {
                    name: this.name,
                    username: this.username,
                    password: this.password,
                    type_user: this.type_user
                }
            )
            .then(() => {
                this.alert.message = "registro exitoso";
                this.alert.hasError = false;
            })
            .catch(() => {
                this.alert.message = "Error al realizar el registro";
                this.alert.hasError = true;
            });
        }
    }
    
}
</script>
<style scoped>
.form-signin {
    max-width: 330px;
    padding: 15px;
}

.center-box{
    margin-top: 15% !important;
    border: 1px solid;
    border-color: #F0F0F0;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>