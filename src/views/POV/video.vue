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
          poster: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532527182365&di=89f58c2ad2b5028f3c2a3ae74918245e&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1510%2F19%2Fc10%2F14147580_14147580_1445234591563.jpg",
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
          poster: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532527182365&di=89f58c2ad2b5028f3c2a3ae74918245e&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1510%2F19%2Fc10%2F14147580_14147580_1445234591563.jpg",
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
          poster: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532527182365&di=89f58c2ad2b5028f3c2a3ae74918245e&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1510%2F19%2Fc10%2F14147580_14147580_1445234591563.jpg",
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
          poster: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532527182365&di=89f58c2ad2b5028f3c2a3ae74918245e&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1510%2F19%2Fc10%2F14147580_14147580_1445234591563.jpg",
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
          poster: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532527182365&di=89f58c2ad2b5028f3c2a3ae74918245e&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1510%2F19%2Fc10%2F14147580_14147580_1445234591563.jpg",
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
          poster: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532527182365&di=89f58c2ad2b5028f3c2a3ae74918245e&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1510%2F19%2Fc10%2F14147580_14147580_1445234591563.jpg",
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
        poster: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532527182365&di=89f58c2ad2b5028f3c2a3ae74918245e&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1510%2F19%2Fc10%2F14147580_14147580_1445234591563.jpg",
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
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
    .c-both{
      clear: both;
    }
  }
</style>
