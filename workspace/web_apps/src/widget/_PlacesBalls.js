import React, {useEffect, useState} from 'react';
import "../style/placesBalls.css"

const _PlacesBalls = () => {

    var [mouse,setMouse] = useState({down: false, x: 0, y: 0});




    var canvas;
    var ctx;
    var balls = [];

    var ball_1;
    var ball_2;
    var diff_x;
    var diff_y;
    var dist;
    var real_dist;
    var depth_x;
    var depth_y;
    var n = 0;
    var length;
    var vel_x1;
    var vel_y1;
    var vel_x2;
    var vel_y2;
    var i;
    var Ball;
    var iter;
    var pr1;
    var pr2;
    var delta;
    var rect;
    var nx;
    var ny;

    var x;
    var y;
    var r;
    var s;
    var ball;
    var vel_x;
    var vel_y;

    useEffect(() => {
        console.log("init");
        initial()
    }, [window.innerWidth]);

    function initial() {

        canvas = document.getElementById('c');
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(NUM_BALLS);
        while (NUM_BALLS > 0) {
            NUM_BALLS--;
            add_ball();
        }

        canvas.onmousedown = function (e) {
            if (e.which == 1) {
                setMouse({...mouse,down: true});
                document.body.style.cursor = 'none';
            } else if (e.which == 3) {

                // add_ball(mouse.x, mouse.y);
            }

            e.preventDefault();
        };

        canvas.onmouseup = function (e) {
            if (e.which == 1) {
                setMouse({...mouse,down: false});
                document.body.style.cursor = 'default';
            }

            e.preventDefault();
        };

        canvas.onmousemove = function (e) {

            rect = this.getBoundingClientRect();
            setMouse({...mouse,x:e.clientX - rect.left,y:e.clientY - rect.top});
        };

        canvas.onmouseout = function (e) {

            setMouse({...mouse,down: false});
            document.body.style.cursor = 'default';
        };

        canvas.oncontextmenu = function (e) {

            e.preventDefault();
            return false;
        };

        update();
    }

    window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };



//---------------------------------------



    function add_ball(ix, iy, ir) {

        x = ix || Math.random() * (canvas.width - 30) + 60;
        y = iy || Math.random() * (canvas.height - 30) + 60;
        r = ir || 30 + Math.random() * 20;
        s = true;
        i = balls.length;
        while (i > 0) {
            i--;
            ball = balls[i];
            diff_x = ball.x - x;
            diff_y = ball.y - y;
            dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

            if (dist < ball.radius + r) {
                s = false;
                break;
            }
        }

        if (s) balls.push(new Ball(x, y, r));
    };

    return (
        <div>
            <canvas className={"balls-canvas"} id="c"></canvas>
        </div>
    );
};

export default _PlacesBalls;
