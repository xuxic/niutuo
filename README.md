# niutuo
niu tuo wen quan kong que cheng wei lou shu

# setup proxy only if you are in corporate network

```
export http_proxy=http://web-proxy.cce.hp.com:8080
export https_proxy=https://web-proxy.cce.hp.com:8080
```

# development
```
sudo python static.py 80
```

# deploy
```
gunicorn -D -b 0.0.0.0:9080 --access-logfile=access.log --error-logfile=error.log static:application
``` 

# 微信分享小图标
在页面body最上，添加可见的300px*300px的img ！！！注意一定是300*300整的，我就栽在这上面过
（2015年就按这个来吧，我原来按照2014年的攻略做的，多一点点少一点点都显示不出来图片。。）
```
<div style='display:none;'>
<img src='your image link' />
</div>
```
