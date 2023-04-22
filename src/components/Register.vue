<template>

<div class="form-signin  w-100 m-auto">
    <div class="alert " :class="{ 'alert-success': !alert.hasError, 'alert-danger': alert.hasError }" role="alert"  v-if="alert.message != '' ">
        {{alert.message}}
    </div>
    <h3 class="mb-3 fw-normal">Registro de usuario</h3>
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
    <a class="icon-link text-muted" href="/">
        Login
        <svg class="bi" aria-hidden="true"><use xlink:href="#arrow-left"></use></svg>
    </a>
    
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
</style>