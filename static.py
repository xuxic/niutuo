#!/usr/bin/python
# coding: utf-8

import sys,os,fcntl
reload(sys)
sys.setdefaultencoding('utf8')

import web
    
urls = ("/signup", "signup")
app = web.application(urls, globals())

class signup:
    def GET(self):
        return [{'name':'aaa','phone':"15811110000"},{'name':"bbb",'phone':"15822229999"}]
    
    def POST(self):
        i = web.input()
        print i
        print i.name.encode('utf8')
        print i.phone.encode('utf8')
        output = open('output','a')
        fcntl.flock(output, fcntl.LOCK_EX)
        output.write(i.name+','+i.phone+'\n')
        output.flush()
        fcntl.flock(output, fcntl.LOCK_UN)
        output.close()
        return {}

if __name__ == "__main__":
    app.run()
