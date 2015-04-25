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