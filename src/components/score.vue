<template>
    <div class="lg-bg">
        <a id="nav-toggle" >
            <span  @click="showmenu=!showmenu"></span>
            <ul v-if="showmenu" class="menu" transition="menu">
                <li @click="showalert=true">退出登录</li>
            </ul></a>
        <div class="sc-body" @click="showmenu=false">
            <div class="select-group" :style="seleClass">
                <div id="year"><span>{{year}}</span><div class="arrow"></div>
                    <select name="year" v-model="year" style="opacity:0;width: 100%;height: 100%;">
                        <option value="选择学年" selected disabled>选择学年</option>
                        <option v-for="xn in xns" value="{{xn}}">{{xn}}</option>
                    </select>
                </div>


                <div id="term"><span>{{term}}</span><div class="arrow"></div>
                    <select name="term" v-model="term" style="opacity:0;width: 100%;height: 100%;">
                        <option value="选择学期" selected disabled>选择学期</option>
                        <option value="第一学期">第一学期</option>
                        <option value="第二学期">第二学期</option>
                    </select>
                </div>
            </div>


            <table v-if="!$loadingAsyncData && loading" transition="table" class="ui yellow table">
            <tr v-for="score in scores | scorefilter year term">
                <td><em>{{ score.KCMC }}</em><span>{{score.CJ}}</span></td>
            </tr>
            </tbody>
            </table>





            <div transition="loading" v-show="loading" v-if="$loadingAsyncData" class="mdl-spinner mdl-js-spinner is-active"></div>

        </div>
        <div class="lg-ft">
            <p>{{ info.copyright }}</p>
            <p>{{ info.duty }}</p>
            <p>{{ info.tech }}</p>
        </div>
    </div>
    <!--v-if="showalert"-->
    <div class="sweet-overlay" @click="showalert = !showalert,showmenu=false" tabindex="-1" style="opacity: 1.02;display: block;" v-if="showalert"></div>
    <div v-if="showalert" class="sweet-alert" transition="sweet-alert">
        <div class="sa-icon sa-error animateErrorIcon" style="display: block;">
              <span class="sa-x-mark animateXMark">
                <span class="sa-line sa-left"></span>
                <span class="sa-line sa-right"></span>
              </span>
        </div>
        <p class="title">退出登录</p>
        <button @click="unbind" class="confirm logout" tabindex="1" style="display: inline-block; box-shadow: rgba(140, 212, 245, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px inset; background-color: rgb(140, 212, 245);">确定</button>
        <button class="confirm cancel" @click="showalert=false,showmenu=false">取消</button>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                showalert:false,
                seleClass:"",
                showmenu:false,
                info:{
                    tech:"技术支持：网园资讯工作室",
                    duty:"开发维护：沧海云帆",
                    copyright:"版权所有：韶关学院教务处",
                },
                current:{
                    year:"",
                    term:"",
                },
                loading:false,
                scores:[],
                xns:[]
            }
        },
        asyncData: function (resolve, reject) {
            var self = this;
            this.$http.post("http://wechat.zeffee.com/verify.php",{
                action:"score",
            }).then(function(res){
                self.scores = res.data;
                var years = [];
                for(var i=0;i<self.scores.length;i++){
                    if(years.indexOf(self.scores[i].XN) == "-1"){
                        years.push(self.scores[i].XN)
                    }
                }
                self.year = years[years.length - 1]
                var CurreneTerm = "第一学期";
                for(var i=0;i<self.scores.length;i++){
                    if((self.scores[i].XN) == self.current.year){
                        if(self.scores[i].XQ == "2"){
                            CurreneTerm = "第一学期";
                            break;
                        }
                    }
                }
                self.term = CurreneTerm;
                if(self.scores.status == "fail"){
                    self.$route.router.go({path:"404"})
                }
                resolve({xns:years})

            },function(){
                self.$route.router.go({path:"404"})
            });
        },
        methods:{
            unbind:function(){
                var self = this;
                this.$http.post("http://wechat.zeffee.com/verify.php",{
                    action:"unbind",
                }).then(function (response) {
                    if(response.data.status == "ok"){
//                        self.$route.router.go({path:"login"})
                        WeixinJSBridge.call('closeWindow');
                    }else {
                        alert("发生了点错误，请重试！")
                    }
                }, function (response) {
                    alert("发生了点错误，请重试！")
                });

            },
            showscore:function(){
                if(this.term != "选择学期" && this.year !="选择学年"){
                    this.seleClass = "top:20px";
                    this.loading = true;
//                    console.log(this.score.forEach)
                }else{
                    this.seleClass = "";
//                    console.log(this.score)
                }
            }
            },
        watch:{
            "term":"showscore",
            "year":"showscore",
        },

    }

</script>
<style lang="less">
    .sweet-alert-transition {
        transition: all .5s ease;
        opacity:1;
    }
    .sweet-alert-enter, .sweet-alert-leave {
        opacity: 0;
    }
    .sc-body{
        min-height:90%;
    }
    .select-group{
        position: relative;
        width: 100%;
        margin: 20px 0;
        top:35px;
    }

    /*.submit{*/
        /*opacity:0;*/
        /*position: absolute!important;*/
        /*top:0;*/
        /*-webkit-animation:opacity 1s  ;*/
        /*-o-animation:opacity 1s ;*/
        /*animation:opacity 1s ;*/
    /*}*/
    select{
        z-index: 999;
        position: absolute;
        top:0;
        left:0;
    }
    #year,#term{
        margin: 0 auto;
        margin-top:20px;
        position: relative;
        display: block;
        width: 90%;
        height:40px;
        background-color: #ee8176;
        border-radius: 5px;
        span{
            font-size: 16px;
            font-family: "Microsoft YaHei";
            color: rgb(243, 244, 244);
            line-height: 40px;
            text-align: center;
            display: block;
        }
    }
    .arrow{
        position: absolute;
        top: 15px;;
        right:15px;
        width: 10px;
        height: 10px;
        border-top:2px solid #fff;
        border-right:2px solid #fff;
        transform: rotate(45deg);
    }
    /*.submit{*/
        /*!*position: absolute;*!*/
        /*!*top:50%;*!*/
        /*!*margin-top:-305px;*!*/
        /*-webkit-animation:submit 2s ease;*/
        /*-o-animation:submit 2s ease;*/
        /*animation:submit 2s ease;*/
        /*animation-iteration-count: 2;*/
        /*position: relative;*/
        /*top: 0%;*/
    /*}*/
    /*@keyframes submit {*/
        /*0% {*/
            /*opacity:0;*/
            /*!*position: absolute;*!*/
            /*!*top: 30%;*!*/
        /*}*/
        /*!*50% {*!*/
            /*!*position: absolute;*!*/
            /*!*top: 25%;*!*/
        /*!*}*!*/
        /*100% {*/
            /*opacity: 1;*/
            /*!*position: relative;*!*/
            /*!*top: 0%;*!*/
        /*}*/
    /*}*/
    @-webkit-keyframes submit {
        0% {
            position: absolute;
            top: 30%;
        }
        /*50% {*/
        /*position: absolute;*/
        /*top: 25%;*/
        /*}*/
        100% {
            position: relative;
            top: 0%;
        }
    }
    .mdl-spinner{
        width: 100px;
        height: 100px;
        left: 50%;
        margin-left: -50px;
        margin-top: 100px;
    }
    /* 必需 */
    .loading-transition {
        transition: all 2s ease;
        opacity: 1;
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .loading-enter, .loading-leave {
        opacity: 0;
    }
    /* 必需 */
    .table-transition {
        transition: all 2s ease;
        opacity: 1;
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .table-enter, .table-leave {
        opacity: 0;
    }
    .ui.yellow.table {
        border-top: .2em solid #ee8176;
        margin:0 auto;
        margin-top:50px;
    }
    .ui.table {
        font-size: 1.5em;
    }
    .ui.table em {
        display: block;
        font-style: normal;
        font-size:.8em;
        line-height:1.5em;
        font-weight:600;
        margin-top:.5em;
        font-style: "Microsoft YaHei";
    }
    .ui.table span {
        display: inline-block;
        line-height:1em;
        font-size:.7em;
        margin-bottom:.5em;
    }
    .ui.table td {
        border:1px solid #dededf;
        padding-left: 1.5em;
    }
    .ui.table {
        width: 90%;
        background: #FFF;
        margin: 1em 0;
        border: 1px solid rgba(34,36,38,.15);
        box-shadow: none;
        border-radius: .28571429rem;
        text-align: left;
        color: rgba(0,0,0,.87);
        border-collapse: separate;
        border-spacing: 0;
    }
    /*hanburger*/
    h3 { color: white; }
    #nav-toggle span { position: absolute; left:10px; top:20px;}
    #nav-toggle span,
    #nav-toggle span:before,
    #nav-toggle span:after {
        cursor: pointer;
        border-radius: 1px;
        height: 5px;
        width: 25px;
        background: white;
        position: absolute;
        display: block;
        content: '';
    }
    #nav-toggle span:before {
        top: -8px;
    }
    #nav-toggle span:after {
        bottom: -8px;
    }
    /*hanburger end*/
    .menu{
        list-style:none;
        width: 80px;
        background-color: white;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
        color: rgba(0,0,0,.87);
        position: absolute;
        left:10px;
        top:-2px;
        z-index:9999;
        padding:20px 20px;
        font-size:14px;
        font-weight:500;
        font-style: "Microsoft YaHei";
        cursor:pointer;
    &::selection {
             background: #b3d4fc;
             text-shadow: none;
         }
     li{
         overflow: hidden;
         height:25px;
     }
    }
    /* 必需 */
    .menu-transition {
        transition: all .2s ease;
        /*width:100px;*/
        /*overflow: hidden;*/
        opacity:1;
    }

    /* .menu-enter 定义进入的开始状态 */
    /* .menu-leave 定义离开的结束状态 */
    .menu-enter, .menu-leave {
        opacity: 0;
        /*margin-left: ;*/
        /*margin-left: -100px;*/
    }
</style>
<style scoped>
    .confirm{
        line-height:30px;
        height: 30px;
        margin-bottom:30px;
    }
    .title{
        margin-top: -8px;
    }
    .logout{
        /*margin-left:-20%;*/
        margin-left:10%;
        display: inline-block;

    }
    .cancel{
        margin-left:0px;
        float: right;
        background: rgb(221, 221, 221);
        margin-right:10%;
        display: inline-block;
    }
</style>