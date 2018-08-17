<template>
  <div>
    <waterfall
      :line-gap="400"
      :min-line-gap="350"
      :max-line-gap="480"
      :single-max-width="480"
      :watch="playerList">
      <waterfall-slot
        v-for="(item, index) in playerList"
        :width="480"
        :height="330"
        :order="index"
        :key="item.id"
        move-class="item-move"
      >
        <div class="item v-box">
          <div class="v-body">
            <video-player  class="vjs-custom-skin"
                           ref="videoPlayer"
                           :options="item"
                           :playsinline="true"
                           @play="onPlayerPlay($event)"
                           @pause="onPlayerPause($event)"
                           @ended="onPlayerEnded($event)"
                           @loadeddata="onPlayerLoadeddata($event)"
                           @waiting="onPlayerWaiting($event)"
                           @playing="onPlayerPlaying($event)"
                           @timeupdate="onPlayerTimeupdate($event)"
                           @canplay="onPlayerCanplay($event)"
                           @canplaythrough="onPlayerCanplaythrough($event)"
                           @ready="playerReadied"
                           @statechanged="playerStateChanged($event)">
            </video-player>
          </div>

          <div class="v-name">
            <div class="v-title">{{item.name}}</div>
            <div class="v-time">{{ item.createdAt*1000 |  formatDate}}</div>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
  </div>
</template>

<script>
  import media from '@/api/video/media'
  import {formatDate} from '@/common/formatDate.js';
  import 'vue-video-player/src/custom-theme.css'
  import { videoPlayer } from 'vue-video-player'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default {
    components: {
      videoPlayer,
      Waterfall,
      WaterfallSlot,
    },
    data(){
      return{
        playerList:[],
        post_data:{
          page_index:1,
          page_size:10,
          type:2
        },
        playerOptions: {
          autoplay: false,
          muted: true,
          language: 'zh-CN',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          fluid: true,
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          aspectRatio: '16:9',
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          },
          sources: [{
            type: "video/mp4",
            // mp4
            src: "http://vjs.zencdn.net/v/oceans.mp4",
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "http://pic36.photophoto.cn/20150724/0008020996795371_b.jpg",
        },
      }
    },
    //时间格式过滤器
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss'); //yyyy-MM-dd hh:mm
      }
    },
    created(){
      this.getList(this.post_data)
    },
    mounted() {
      setTimeout(() => {
        console.log('dynamic change options', this.player);
        if(this.player){
          this.player.muted(false)
        }
      }, 5000)
    },
    computed: {
      /*player() {
        return this.$refs.videoPlayer.player
      }*/
    },
    methods: {
      getList(post_data){
        media.list(post_data).then(res=>{
          res.result.items.forEach((item,i)=>{
            console.log(item);
            this.playerOptions.poster=item.thumbnailFileBaseUrl+item.thumbnailFilePath;
            this.playerOptions.sources[0].src=item.url;
            this.playerOptions.createdAt=item.createdAt;
            this.playerOptions.name=item.name;
            console.log(this.playerOptions.sources[0].src);
            this.playerList.push(this.playerOptions);
          })
        })
      },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        //console.log('example player 1 readied', player)
        player.currentTime(10)
        // console.log('example 01: the player is readied', player)
      }
    }
  }
</script>

<style scoped lang="scss">
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  waterfall-slot{
    background: black;
  }
  .item {
    //border: 20px solid #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 20px;
    bottom: 20px;
    font-size: 0.9em;
    box-shadow:0 5px 7px 0 rgba(144,164,183,0.3);
    cursor: pointer;
    .equipment{
      width: 50%;
      float: left;
    }
    .online{
      width: 25%;
      float: left;
    }
    .statistics{
      width: 25%;
      float: left;
    }
  }
  .v-box{
    background: #ffffff;
    padding: 20px 20px 0 20px;
    //border: 20px solid #ffffff;
    /*li{
      //width: 325px;
      border: 20px solid #ffffff;
      margin: 0 20px 20px 0;
      min-width:300px;
      max-width:400px;
    }*/
    .v-body{
      width: 100%;
      height: 80%;
    }
    .v-name{
      background: #ffffff;
      width: 100%;
      height: 10%;
      margin-top: 5%;
      text-align: center;
      display: flex;
      justify-content: space-between;
      .v-title{
        color:rgba(51,51,51,1);
        font-size: 12px;
      }
      .v-time{
        font-size: 12px;
      }
    }
    .c-both{
      clear: both;
    }
  }
</style>
