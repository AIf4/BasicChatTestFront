<template>
    <!-- <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"> -->
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-8 bg-white ">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/MVPTGNGiI-4"
                    title="synthwave radio 🌌 - beats to chill/game to" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
            </div>

            <!--=========================================================-->
            <!-- selected chat -->
            <div class="col-md-4 bg-white ">
                <div class="chat-message">
                    <ul class="chat" v-for="(chat, index) in dataChats" v-bind:key="index">


                        <li class="clearfix"
                            :class="{ 'right': (chat.user.id == this.user_id), 'left': !(chat.user.id == this.user_id) }">
                            <span class="chat-img"
                                :class="[{ 'pull-right': (chat.user.id == this.user_id) }, 'pull-left']">
                                <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar">
                            </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font" v-if="chat.user">{{ chat.user.name }}</strong>
                                    <strong class="primary-font" v-else>sin nombre</strong>
                                    <small class="text-muted pull-right">
                                        <strong class="danger-font" v-if="chat.user.type_user == 1">Moderador</strong>
                                        <strong class="primary-font" v-else>Estudiante</strong>
                                    </small>
                                </div>
                                <p>
                                    {{ chat.message }}
                                </p>
                            </div>
                        </li>

                        <!-- <li class="right clearfix">
                            <span class="chat-img pull-right">
                                <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar">
                            </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">Sarah</strong>
                                    <small class="pull-right text-muted"><font-awesome-icon :icon="['fas', 'clock']" /> 13 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                    dolor, quis ullamcorper ligula sodales at.
                                </p>
                            </div>
                        </li> -->
                    </ul>
                </div>
                <div class="chat-box bg-white">
                    <div class="input-group mb-1 w-100">
                        <input type="text" class="form-control" v-model="message" placeholder="Escribe algo ..."
                            aria-label="Escribe algo ..." aria-describedby="button-addon2">
                        <button class="btn btn-outline-primary" type="button" id="button-addon2"
                            @click="sendMessage()"><font-awesome-icon :icon="['fass', 'paper-plane']" /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { socket } from "@/socket";
export default {
    name: 'chat-page',
    data() {
        return {
            dataChats: [],
            message: '',
            token: '',
            user_id: 0
        }
    },
    created() {
        socket.connect();
        this.checkToken();
        socket.on("new_message", (...chats) => {
            this.dataChats = chats;
        });
    },
    methods: {

        checkToken() {
            this.token = localStorage.getItem("TOKEN");
            this.user_id = localStorage.getItem("user_id");
            if (!this.token) this.$router.push('/')
            //let jwtpass = jwt.verify(this.token, 'secret-key');
            this.getChats();
        },
        getChats() {
            this.axios.get('http://localhost:3000/chat',
                {
                    headers: { Authorization: `Bearer ${this.token}` }
                }
            )
                .then((response) => {
                    console.log(response.data);
                    this.dataChats = response.data;
                    console.log(this.dataChats)
                })
                .catch(({ response }) => {
                    console.log(response)
                    if (response.data.statusCode === 401) {
                        this.$router.push('/')
                    }
                });
        },
        sendMessage() {
            console.log(this.message)
            const payload = {
                message: this.message,
                user_id: Number(this.user_id)
            }
            console.log(payload)
            socket.emit("event_message", payload);
            /* this.axios.post(
                'http://localhost:3000/chat',
                {
                    message: this.message,
                    user: this.user_id
                }
            )
                .then((response) => {
                    console.log(response);
                   
                    this.message = '';
                })
                .catch(() => {
                    this.alert.message = "Error al realizar el registro";
                    this.alert.hasError = true;
                }); */
        }
    }
}
</script>
<style scoped>
body {
    padding-top: 0;
    font-size: 12px;
    color: #777;
    background: #f9f9f9;
    font-family: 'Open Sans', sans-serif;
    margin-top: 20px;
}

ol,
ul {
    padding-left: 0rem;
}

.bg-white {
    background-color: #fff;
}


.chat-message {
    padding: 60px 20px 115px;
    height: 63vh;
    overflow-y: scroll;
}

.chat {
    list-style: none;
    margin: 0;
}

.chat-message {
    background: #f9f9f9;
}

.chat li img {
    width: 45px;
    height: 45px;
    border-radius: 50em;
    -moz-border-radius: 50em;
    -webkit-border-radius: 50em;
}

img {
    max-width: 100%;
}

.chat-body {
    padding-bottom: 10px;
}

.chat li.left .chat-body {
    margin-left: 50px;
    background-color: #fff;
}

.chat li .chat-body {
    position: relative;
    font-size: 11px;
    padding: 10px;
    border: 1px solid #f1f5fc;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.chat li .chat-body .header {
    padding-bottom: 5px;
    border-bottom: 1px solid #f1f5fc;
}

.chat li .chat-body p {
    margin: 0;
}

.chat li.left .chat-body:before {
    position: absolute;
    top: 10px;
    left: -8px;
    display: inline-block;
    background: #fff;
    width: 16px;
    height: 16px;
    border-top: 1px solid #f1f5fc;
    border-left: 1px solid #f1f5fc;
    content: '';
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
}

.chat li.right .chat-body:before {
    position: absolute;
    top: 10px;
    right: -8px;
    display: inline-block;
    background: #fff;
    width: 16px;
    height: 16px;
    border-top: 1px solid #f1f5fc;
    border-right: 1px solid #f1f5fc;
    content: '';
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
}

.chat li {
    margin: 15px 0;
}

.chat li.right .chat-body {
    margin-right: 70px;
    background-color: #fff;
}

.chat-box {
    padding-top: 20px;
    border-top: 1px solid #eee;
    transition: all .5s ease;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
}

.primary-font {
    color: #3c8dbc;
}

.danger-font {
    color: #a12600;
}

a:hover,
a:active,
a:focus {
    text-decoration: none;
    outline: 0;
}

.pull-left {
    float: left;
}

.pull-right {
    float: right;
}

@media (min-width: 768px) {
    .chat-message {
        height: 86vh;
    }
}
</style>