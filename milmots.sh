#!/bin/bash
echo "<html><body><ul>"
count=0
while read line
do
	if [[ $count -lt 1000 ]]
	then
		rand32=$((( ($RANDOM) << 16) | ($RANDOM) ))
		num=$((`wc -l < /usr/share/dict/words` + 1))
		word=`head -$(($rand32 % $num + 1)) /usr/share/dict/words | tail -1`
		echo "<li>"$word"</li>"
	else
		break
	fi
	count=$[$count + 1]
done < /usr/share/dict/words
echo "</ul></body></html>"
