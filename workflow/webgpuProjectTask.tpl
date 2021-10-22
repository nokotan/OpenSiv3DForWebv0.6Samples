      - name: Cache {name}WebGPU
        id: cache_{name}WebGPU
        uses: actions/cache@v1
        env:
            cache-name: cache-{name}WebGPU
        with:
            path: Build/{name}
            key: ${{ env.cache-name }}-${{ hashFiles('CMakeLists.txt', 'Siv3D/**/*.*', 'Templates/**/*.*', '{name}/**/*.*') }}

      - name: Build {name}WebGPU
        if: ${{ !steps.cache_{name}WebGPU.outputs.cache-hit }}
        working-directory: Build
        run: |
            make -j4 {name}WebGPU

