#!/bin/bash

PATH=/home/ubuntu/.nvm/v0.10.48/bin:$PATH

HUBOT_ROOT="/home/ubuntu/bigblue/"
HUBOT_HOME="/home/ubuntu/bigblue/node_modules/hubot"

DAEMON="$HUBOT_HOME/bin/hubot"

PIDFILE=$HUBOT_ROOT/hubot.pid

case "$1" in
start)
        echo "Starting"
        . $HUBOT_ROOT/bin/hubotrc.sh
        /sbin/start-stop-daemon --start --background --pidfile $PIDFILE --make-pidfile -d $HUBOT_ROOT --exec $DAEMON -- --name "bigblue" -a slack -n bigblue
        echo "."
        ;;
debug)
        echo "Debug mode: no backgrounding"
        . $HUBOT_ROOT/bin/hubotrc.sh
        /sbin/start-stop-daemon --start --pidfile $PIDFILE --make-pidfile -d $HUBOT_ROOT --exec $DAEMON -- --name "bigblue" -a slack -n bigblue
        echo "."
        ;;        
stop)
        echo "Stopping"
        /sbin/start-stop-daemon --stop --pidfile $PIDFILE
        echo "."
        ;;  
restart)
        echo "Restarting"
        /sbin/start-stop-daemon --stop --pidfile $PIDFILE
        . $HUBOT_ROOT/bin/hubotrc.sh
        /sbin/start-stop-daemon --start --pidfile $PIDFILE --make-pidfile --background -d $HUBOT_ROOT --exec $DAEMON -- --name "bigblue" -a slack -n bigblue
        echo "."
        ;;


    *)
        echo "Usage: $0 {start|stop|restart|debug}" >&2
        exit 1
        ;;  
    esac
    exit
