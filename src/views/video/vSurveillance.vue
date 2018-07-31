<template>
  <div>
    <ul class="v-box">
      <li v-for="(list,index) in playerList" :key="index">
        <div class="item">
          <div class="player">
            <video-player  class="vjs-custom-skin"
                           ref="videoPlayer"
                           :options="list"
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
        </div>
        <div class="v-name">
          <div class="v-title">高新科技园区建筑建设标段</div>
          <div class="v-time">2018-5-21</div>
        </div>
      </li>
      <div class="c-both"></div>
    </ul>
  </div>
</template>

<script>

  import 'vue-video-player/src/custom-theme.css'
  import { videoPlayer } from 'vue-video-player'
  export default {
    components: {
      videoPlayer
    },
    data(){
      return{
        playerList:[
          {
            height: '220',
            autoplay: false,
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
              type: "video/mp4",
              // mp4
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "http://pic36.photophoto.cn/20150724/0008020996795371_b.jpg",
          },
          {
            height: '220',
            autoplay: false,
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
              type: "video/mp4",
              // mp4
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "http://pic36.photophoto.cn/20150724/0008020996795371_b.jpg",
          },
          {
            height: '220',
            autoplay: false,
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
              type: "video/mp4",
              // mp4
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "http://pic36.photophoto.cn/20150724/0008020996795371_b.jpg",
          },
          {
            height: '220',
            autoplay: false,
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
              type: "video/mp4",
              // mp4
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "http://pic36.photophoto.cn/20150724/0008020996795371_b.jpg",
          },
          {
            height: '220',
            autoplay: false,
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
              type: "video/mp4",
              // mp4
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "http://pic36.photophoto.cn/20150724/0008020996795371_b.jpg",
          },
          {
            height: '220',
            autoplay: false,
            muted: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
              type: "video/mp4",
              // mp4
              src: "http://vjs.zencdn.net/v/oceans.mp4",
              // webm
              // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }],
            poster: "http://pic36.photophoto.cn/20150724/0008020996795371_b.jpg",
          }
        ],
        playerOptions: {
          height: '160',
          autoplay: false,
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            // mp4
            src: "http://vjs.zencdn.net/v/oceans.mp4",
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "http://pic36.photophoto.cn/20150724/0008020996795371_b.jpg",
        }
      }
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
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
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
  .v-box{
    //background: #ffffff;
    height: auto;
    display: flex;
    //justify-content:space-between;
    flex-flow:row wrap;
    li{
      width: 325px;
      border: 20px solid #ffffff;
      margin: 0 20px 20px 0;
    }
    .v-name{
      background: #ffffff;
      width: 100%;
      height: 25px;
      text-align: center;
      line-height: 45px;
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
