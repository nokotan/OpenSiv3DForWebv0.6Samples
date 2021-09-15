      - name: Cache {name}
        id: cache_{name}
        uses: actions/cache@v1
        env:
            cache-name: cache-{name}
        with:
            path: Build/{name}
            key: ${{ env.cache-name }}-${{ hashFiles('CMakeLists.txt', 'Siv3D/**/*.*', '{name}/**/*.*') }}

      - name: Build {name}
        if: ${{ !steps.cache_{name}.outputs.cache-hit }}
        working-directory: Build
        run: |
            make -j4 {name}

