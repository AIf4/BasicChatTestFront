<template>
    <div class="form-signin  w-100 m-auto my-auto center-box">
        <div class="alert " :class="{ 'alert-success': !alert.hasError, 'alert-danger': alert.hasError }" role="alert"  v-if="alert.message != '' ">
            {{alert.message}}
        </div>
        <p class="h3 mb-3 text-center fw-normal">Inicio de sesión</p>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" v-model="username" id="floatingNickname"
                placeholder="nombre de usuario">
            <label for="floatingNickname">Nickname</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control" v-model="password" id="floatingPassword" placeholder="contraseña">
            <label for="floatingPassword">Contraseña</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary mb-3" @click="login()">Ingresar</button>
        <p class="text-center fw-medium text-muted">
            <a class="text-decoration-none" href="/register">Registro de usuario</a>
        </p>
        

    </div>
</template>

<script>
import { socket } from "@/socket";
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
    created() {
        socket.disconnect();
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
            .then(({data}) => {
                localStorage.setItem("TOKEN", data.access_token);
                localStorage.setItem("user_id", data.user_id);
                this.$router.push('/chat');
            })
            .catch(() => {
                this.alert.message = "Nickname o contraseña incorrectos";
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
    margin-top: 18% !important;
    border: 1px solid;
    border-color: #F0F0F0;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

}


</style>