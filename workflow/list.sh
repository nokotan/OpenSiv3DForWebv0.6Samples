#/usr/bin/bash

find .. -maxdepth 1 -type d  \
    | sort                   \
    | sed 's|../||g'         \
    | grep -Ev "^\.|^Siv3D\$|^Web\$|^workflow\$|^Main3D\$|^Templates\$" \
    | xargs -I{} sed -e "s/{name}/{}/g" projectTask.tpl > tmp.txt

tr '\n' '%' < tmp.txt > formatted.txt
formatted=$(sed -e "s?%?\\\\n?g" formatted.txt)
sed -e "s?{tasks}?${formatted}?" ci.yml.tpl > ../.github/workflows/ci.yml


find .. -maxdepth 1 -type d  \
    | sort                   \
    | sed 's|../||g'         \
    | grep -Ev "^\.|^Siv3D\$|^Web\$|^workflow\$|^Main3D\$|^Templates\$" \
    | xargs -I{} sed -e "s/{name}/{}/g" webgpuProjectTask.tpl > tmp.txt

tr '\n' '%' < tmp.txt > formatted.txt
formatted=$(sed -e "s?%?\\\\n?g" formatted.txt)
sed -e "s?{tasks}?${formatted}?" ci_webgpu.yml.tpl > ../.github/workflows/ci_webgpu.yml



rm formatted.txt
rm tmp.txt
