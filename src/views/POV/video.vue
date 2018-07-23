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
        <div class="v-name">视频监控</div>
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
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
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
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
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
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
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
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
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
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
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
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
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
        poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
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
    background: #ffffff;
    height: auto;
    padding: 40px 0 0 0;
    display: flex;
    //justify-content:space-between;
    flex-flow:row wrap;
    li{
      width: 317px;
      margin:20px 10px 0 0 ;
    }
    .v-name{
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
    .c-both{
      clear: both;
    }
  }
</style>
