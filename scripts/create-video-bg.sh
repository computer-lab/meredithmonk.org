#!/bin/bash
# expects ffmpeg is installed, and a source video source.mov is in this directory

start=00:00:10
duration=00:00:13

ffmpeg -i source.mov -c:v h264 -an -ss $start -t $duration -async 1 ../frontend/static/background.mp4
ffmpeg -i source.mov -c:v libtheora -an -ss $start -t $duration -async 1 ../frontend/static/background.ogv
ffmpeg -i source.mov -c:v libvpx -an -ss $start -t $duration -async 1 ../frontend/static/background.webm
ffmpeg -i source.mov -ss $start -vframes 1 -q:v 2 ../frontend/static/background.jpg

