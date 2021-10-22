name: App Deploy (WebGPU)

on:
  push: 
    branches: [ 'main' ]

jobs:
  build:
    runs-on: ubuntu-latest
    container: 
      image: 'emscripten/emsdk:2.0.22'
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - name: Build Project
        run: |
          mkdir Build && cd Build
          emcmake cmake .. -DCMAKE_BUILD_TYPE=MINSIZEREL -DSIV3D_WEBGPU_BACKEND=ON

{tasks}

      - name: Pre Deploy
        run: |
          cp README.md Build/
          cp tests.md Build/
          cp _config.yml Build/

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./Build
          keep_files: true
          enable_jekyll: true
          exclude_assets: 'CMakeFiles,**/CMakeFiles'
