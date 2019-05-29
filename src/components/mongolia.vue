<template>
    <div class="mongolia">        
        <div class="elastic-frame" :style="{width: width + 'rem', height: height + 'rem'}">               
            <slot name="content">
                <div>
                    <img @click="closeElastic" src="../assets/images/close_icon.png" class="close">               
                    <div class="elastic-content">
                        <img src="../assets/images/alert_logo.png" class="logo">
                        <div class="elastic-desc">{{ content }}</div>
                    </div>

                    <div class="point-detail" @click="gotoGradeDetail">
                        <img src="../assets/images/point_btn.png" class="point-detail-image">
                    </div>
                </div>
            </slot>
        </div>    
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        width: {
            type: Number,
            default: 18
        },
        height: {
            type: Number,
            default: 9
        },
        content: {
            type: String,
            default: '今日挑战时间结束啦。明日08:00-18:00再来挑战吧!'
        }
    },
    methods: {
        closeElastic() {
            this.$emit('close')
        },
        gotoGradeDetail(){
            this.$router.push('/gradeDetail')
        }
    }
}
</script>

<style lang="less" scoped>
    .size(@width, @height){
        width: @width;
        height: @height;
    }
    @darker: #0a997e;    
    .mongolia{
        .size(100%,100%);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(82, 183, 164, .6);
        display: flex;
        z-index: 99;
        .elastic-frame{
            background: #e4f8f0;
            border-radius: .5rem;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            justify-content: center;
            align-items: center;
            &>div{
                height: 100%;
                .close{
                    position: absolute;
                    top: .5rem;
                    right: .5rem;               
                    .size(1rem,1rem);
                }
                .elastic-content{
                    display: flex;
                    padding: 0 2rem;
                    height: 100%;
                    .logo{
                        .size(2.5rem,3rem);
                        margin: auto 0;
                        margin-right: 1rem;
                    }
                    .elastic-desc{
                        flex: 1;
                        margin: auto 0;
                        font-size: 1rem;
                        color: @darker;
                    }
                }
                .point-detail{
                    width: 100%;
                    position: absolute;
                    top: 10rem;
                    left: 0;
                    text-align: center;
                    .point-detail-image{
                        .size(9rem,2rem)
                    }
                }
            }                 
        }       
    }
</style>

