<template>
  <div>
    <header>
      <h1>Example of use of Photo Sphere Viewer</h1>
    </header>

    <div id="content">
      <div id="container"></div>
      <div id="your-pano" style="height: 600px"></div>

      <form method="get">
        <p style="text-align: center;">
          <input type="file" name="pano" id="pano" v-on:input="upload()"/>
        </p>
      </form>
    </div>
  </div>
</template>


<script>
  //import THREE from '@/common/three.min.js'
  import PhotoSphereViewer from '@/common/photo-sphere-viewer.min.js'
  export default {
    data(){
      return{

      }
    },
    mounted() {

    },
    created(){

    },
    mounted(){
      //document.getElementById('go').addEventListener('click', this.loadPredefinedPanorama(), false);
      //document.getElementById('pano').addEventListener('change', this.upload(), false);
    },
    methods: {
      loadPredefinedPanorama(evt) {
        console.log('2222222');
        evt.preventDefault();

        // Loader
        var loader = document.createElement('div');
        loader.className = 'loader';

        // Panorama display
        var div = document.getElementById('container');
        div.style.height = '30px';

        var PSV = new PhotoSphereViewer({
          // Path to the panorama
          panorama: 'sun.jpg',

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
      },
      upload() {
    // Retrieve the chosen file and create the FileReader object
        var file = document.getElementById('pano').files[0];
        var reader = new FileReader();

        reader.onload = function() {
          var div = document.getElementById('your-pano');

          var PSV = new PhotoSphereViewer({
            // Panorama, given in base 64
            panorama: reader.result,

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

            // No XMP data
            usexmpdata: false
          });
        };
        reader.readAsDataURL(file);
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
