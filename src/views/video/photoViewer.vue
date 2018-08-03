<template>
  <div>
    <div id="a"></div>
  </div>
</template>

<script>
  import THREE from '@/common/three.min.js'
  import PhotoSphereViewer from '@/common/photo-sphere-viewer.min.js'
  import snow from '@/views/video/viewer.jpg'
  export default {
    name: "photoViewer",
    mounted() {
      this.loadPredefinedPanorama()
    },
    created(){
      window.THREE=THREE;
    },
    methods:{
      loadPredefinedPanorama() {
        // Loader
        var loader = document.createElement('div');
        loader.className = 'loader';

        // Panorama display
        var div = document.getElementById('a');
        div.style.height = '30px';

        var PSV = new PhotoSphereViewer({
          // Path to the panorama
          panorama: snow,

          // Container
          container: div,

          // Deactivate the animation
          time_anim: false,

          // Display the navigation bar
          navbar: true,

          // Resize the panorama
          size: {
            width: '100%',
            height: '500px'
          },

          // HTML loader
          loading_html: loader,

          // Overlay
          overlay: {
            image: 'overlay.png',
            size: {
              width: '42px'
            },
            position: {
              x: 'right',
              y: 'top'
            }
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }

  body {
    margin: 0;
    font-family: 'Liberation Sans', sans-serif;
  }

  header {
    margin-bottom: 40px;
    padding: 30px 20px;
    background: linear-gradient(to left, #F0F0F0, #FFFFFF 50%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    text-align: right;
  }

  header h1 {
    margin: 0;
    color: #3D3D3D;
  }

  #content {
    width: 70%;
    max-width: 1000px;
    margin: 0 auto;
    line-height: 1.5em;
    font-size: 1.1em;
  }

  #container, #your-pano {
    width: 70%;
    height: 0;
    margin: 0 auto;
  }

  .loader {
    margin: 0 auto;
    width: 30px;
    height: 30px;

    border: 3px solid transparent;
    border-top-color: #0096FF;
    border-radius: 50%;

    animation: spin 0.8s ease infinite;
  }

  p {
    margin-bottom: 30px;
  }

  a {
    text-decoration: none;
    color: #0096FF;
  }

  a:hover {
    color: #FF9600;
  }

  code {
    padding: 5px 10px;
    border-radius: 3px;
    background-color: #F0F0F0;
  }
</style>
