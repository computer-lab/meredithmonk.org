#!/bin/bash
# expects ffmpeg is installed, and a source video source.mov is in this directory

start=00:00:00
duration=00:01:11

ffmpeg -i source.mov -c:v h264 -ss $start -t $duration -async 1 -pix_fmt yuv420p ../frontend/static/background.mp4
ffmpeg -i source.mov -c:v libtheora -ss $start -t $duration -async 1 ../frontend/static/background.ogv
ffmpeg -i source.mov -c:v libvpx -ss $start -t $duration -async 1 ../frontend/static/background.webm
ffmpeg -i source.mov -ss $start -vframes 1 -q:v 2 ../frontend/static/background.jpg

