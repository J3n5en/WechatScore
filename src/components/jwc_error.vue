<script>
    export default{
        data(){
            return {
                info: {
                    tech: "技术支持：网园资讯工作室",
                    duty: "开发维护：沧海云帆",
                    copyright:"版权所有：韶关学院教务处",
                },
                tapnum:0,

            }
        },
        methods:{
            egg:function(){
//                alert(this.tapnum+1);
                this.tapnum += 1;
                if(this.tapnum >= 10){
                    this.info.tech = "网园资讯工作室最牛逼";
                }
            }
        }
    }

</script>
<template>
    <div class="lg-bg">
        <div class="error-page">
            <h1 class="not-found">Not Found</h1>
            <p class="lost-session">此链接已失效，请关注公众号后 <br>
                点击菜单栏 “教务平台”</p>
            <img class="qcode" src="http://openeye-wechat.stor.sinaapp.com/jwc_qcode.png">
        </div>
        <div class="lg-ft" @click="egg" style="position:absolute;bottom: 10px;">
            <p>{{ info.copyright }}</p>
            <p>{{ info.duty }}</p>
            <p>{{ info.tech }}</p>
        </div>
    </div>

</template>


<style lang="less">
    .not-found {
        width: 100%;
        height: 80px;
        margin: 0;
        font-weight:700;
        font-size: 50px;
        font-family: "Microsoft YaHei";
        color: #fff;
        text-align: center;
    }
    .qcode{
        display: block;
        width: 210px;
        /*height: 283px;*/
        margin:0 auto;
    }
    .lost-session{
        height: 80px;
        font-size: 22px;
        font-family: "Microsoft YaHei";
        width: 100%;
        line-height: 2em;
        margin-top:-10px;
        text-align: center;
        color: #fff;
    }
    .error-page{
        position: absolute;
        top:10%;
        width: 100%;
    }

</style>