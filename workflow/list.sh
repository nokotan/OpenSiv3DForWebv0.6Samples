#/usr/bin/bash

find .. -type d -depth 1    \
    | sed 's|../||g'         \
    | grep -Ev "^\.|^Siv3D\$|^Web\$|^workflow\$|^Main3D\$|^Templates\$" \
    | xargs -I{} sed -e "s/{name}/{}/g" projectTask.tpl > tmp.txt

tr '\n' '%' < tmp.txt > formatted.txt
formatted=$(sed -e "s?%?\\\\n?g" formatted.txt)
sed -e "s?{tasks}?${formatted}?" ci.yml.tpl > ../.github/workflows/ci.yml

rm formatted.txt
rm tmp.txt
