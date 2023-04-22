<template>
    <div class="form-signin  w-100 m-auto">
        <div class="alert " :class="{ 'alert-success': !alert.hasError, 'alert-danger': alert.hasError }" role="alert"  v-if="alert.message != '' ">
            {{alert.message}}
        </div>
        <h3 class="mb-3 fw-normal">Inicio de sesión</h3>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" v-model="username" id="floatingNickname"
                placeholder="nombre de usuario">
            <label for="floatingNickname">Nickname</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control" v-model="password" id="floatingPassword" placeholder="contraseña">
            <label for="floatingPassword">Contraseña</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" @click="login()">Ingresar</button>
        <a class="icon-link text-muted" href="/register">
            Registro
            <svg class="bi" aria-hidden="true"><use xlink:href="#arrow-right"></use></svg>
        </a>

    </div>
</template>

<script>
export default {
    name: 'login-page',
    data() {
        return {
            username: '',
            password: '',
            alert: {
                hasError: false,
                message: ''
            }
        }
    },
    methods:{
        login(){
            this.axios.post(
                'http://localhost:3000/user/login',
                {
                    username: this.username,
                    password: this.password
                }
            )
            .then((response) => {
                console.log(response);
                this.alert.message = "registro exitoso";
                this.alert.hasError = false;
                this.$router.push('/chat');
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