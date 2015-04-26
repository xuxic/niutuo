# niutuo
niu tuo wen quan kong que cheng wei lou shu

# setup proxy only if you are in corporate network

```
export http_proxy=http://web-proxy.cce.hp.com:8080
export https_proxy=https://web-proxy.cce.hp.com:8080
```

# development web server
```
sudo python static.py 80
```

# install gunicorn
```
sudo apt-get install python-pip
sudo pip install gunicorn
```

# deployment start web server
```
gunicorn -D -w4 -b 0.0.0.0:9080 --access-logfile=access.log --error-logfile=error.log static:application
``` 

# stop web server

kill the parent process

for example:
```
root      4542     1  0 22:17 ?        00:00:00 /usr/bin/python /usr/bin/gunicorn -D -w 4 -b 0.0.0.0:9080 --access-logfile=access.log --error-logfile=error.log static:application
```

# 微信分享小图标
在页面body最上，添加可见的300px\*300px的img ！！！注意一定是300*300整的，我就栽在这上面过
（2015年就按这个来吧，我原来按照2014年的攻略做的，多一点点少一点点都显示不出来图片。。）
```
<div style='display:none;'>
<img src='your image link' />
</div>
```
