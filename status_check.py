import os
import requests
import json
import time
import datetime

count = 0

while True:
    try:
        r = requests.post("https://slack.com/api/users.getPresence", data={'token':'xoxb-213651673973-wu0arBW1CTHiwcSfY4vffbaE', 'user':'U061L7C85'})
        assert(r.status_code == 200)
        status = json.loads(r.text)
        if status["presence"] != "active" or count % 2880 == 0:
            os.system("/home/ubuntu/bigblue/daemon.sh restart")
            print("reboot bigblue at")
            print(datetime.datetime.now()) 
            count = 0
            time.sleep(10)
        else:
            time.sleep(30)
            count += 1
    except Exception:
        print("get exception at")
        print(datetime.datetime.now()) 
        pass


