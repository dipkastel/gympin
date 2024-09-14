import React, {useEffect, useRef, useState} from 'react'
import {Ball} from "./Ball"

const Canvas = props => {

    const canvasRef = useRef(null)
    // const [balls, setBalls] = useState([]);

    const DAMPING = 0.7;
    // const NUM_BALLS = 1;
    const MOUSE_SIZE = 20;
    const SPEED = 0.9;

    const balls = [
        new Ball("ball1","https://www.gravatar.com/avatar/2024054e404233ed97b7d9287aff103d?s=64&d=identicon&r=PG",0,0,50),
        new Ball("ball1","https://fastly.picsum.photos/id/247/200/200.jpg?hmac=oKt3N5MCdI8hCrzIbokjpVNzUuywbK64CJn1bfRAxbA",10,0,43),
        new Ball("ball1","https://fastly.picsum.photos/id/953/200/200.jpg?hmac=S5zbAl9YqUc02Oezl6cR8gcLfF3pwkQ5_AcG8JXjeC0",35,0,44),
        new Ball("ball1","https://fastly.picsum.photos/id/437/200/200.jpg?hmac=F6oc_vcQ5Gq4nCufq-2oFrrhsTwKXZmc8ZCLW3a_TD8",56,0,45),
        new Ball("ball1","https://fastly.picsum.photos/id/42/200/200.jpg?hmac=jc_eDuYgXmIOC_4gl2wEY0jgxC2rMPJbDF6QJdynR7Q",77,0,32),
    ]

    const draw = (canvas, ctx, frameCount) => {
        // resolve_collisions();
        // check_walls();

        for (let i in balls) {
            balls[i].verlet();
        }
        resolve_collisions(1);
        check_walls(canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(27,155,155,1)';

        for(let i in balls) {
             balls[i].apply_force(SPEED);
             balls[i].verlet();
             balls[i].draw(ctx);
        }

        // if (mouse.down) {
        //     ctx.fillStyle = 'rgba(0,0,0,1)';
        //     ctx.strokeStyle = 'rgba(0,0,0,1)';
        //
        //     ctx.beginPath();
        //     ctx.arc(mouse.x, mouse.y, MOUSE_SIZE, 0, Math.PI * 2);
        //     ctx.fill();
        //     ctx.stroke();
        // }

    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        init(canvas,context)
        let frameCount = 0
        let animationFrameId

        //Our draw came here
        const render = () => {
            frameCount++
            draw(canvas, context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }

    }, [draw])
    function init(canvas,context) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init_balls(canvas);
    }
    function init_balls(canvas) {
        for (let i in balls){
            let ball=balls[i];
            let x = ball.x || Math.random() * (canvas.width - 30) + 60;
            let y = ball.y || Math.random() * (canvas.height - 30) + 60;
            let r = ball.radius || 30 + Math.random() * 20;
            let s = true;
            for(let i in balls) {
                let diff_x = balls[i].x - x;
                let diff_y = balls[i].y - y;
                let dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

                if (dist < balls[i].radius + r) {
                    s = false;
                    break;
                }
            }

            var im = new Image;
            im.onload = function(image){
                console.log("load");
                balls[i].load = true;
                balls[i].image = im;
            };
            im.src ="";
        }
    };
    var check_walls = function (canvas) {
        for(let i in balls){
            let ball = balls[i];
            if (ball.x < ball.radius) {

                let vel_x = ball.px - ball.x;
                ball.x = ball.radius;
                ball.px = ball.x - vel_x * DAMPING;

            } else if (ball.x + ball.radius > canvas.width) {

                let vel_x = ball.px - ball.x;
                ball.x = canvas.width - ball.radius;
                ball.px = ball.x - vel_x * DAMPING;
            }

            if (ball.y < ball.radius) {

                let vel_y = ball.py - ball.y;
                ball.y = ball.radius;
                ball.py = ball.y - vel_y * DAMPING;

            } else if (ball.y + ball.radius > canvas.height) {

                let vel_y = ball.py - ball.y;
                ball.y = canvas.height - ball.radius;
                ball.py = ball.y - vel_y * DAMPING;
            }
        }
    };

    var resolve_collisions = function (ip) {



        for(let i in balls){
            let ball_1 = balls[i];
            // if (mouse.down) {
            //     let diff_x = ball_1.x - mouse.x;
            //     let diff_y = ball_1.y - mouse.y;
            //     let dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
            //     let real_dist = dist - (ball_1.radius + MOUSE_SIZE);
            //
            //     if (real_dist < 0) {
            //
            //         let depth_x = diff_x * (real_dist / dist);
            //         let depth_y = diff_y * (real_dist / dist);
            //
            //         ball_1.x -= depth_x * 0.005;
            //         ball_1.y -= depth_y * 0.005;
            //     }
            // }



            for(let n in balls){
                if (n === i) continue;

               let ball_2 = balls[n];

                let diff_x = ball_1.x - ball_2.x;
                let diff_y = ball_1.y - ball_2.y;

                let length = diff_x * diff_x + diff_y * diff_y;
                let dist = Math.sqrt(length);
                let real_dist = dist - (ball_1.radius + ball_2.radius);

                if (real_dist < 0) {

                    let vel_x1 = ball_1.x - ball_1.px;
                    let vel_y1 = ball_1.y - ball_1.py;
                    let vel_x2 = ball_2.x - ball_2.px;
                    let vel_y2 = ball_2.y - ball_2.py;

                    let depth_x = diff_x * (real_dist / dist);
                    let depth_y = diff_y * (real_dist / dist);

                    ball_1.x -= depth_x * 0.5;
                    ball_1.y -= depth_y * 0.5;

                    ball_2.x += depth_x * 0.5;
                    ball_2.y += depth_y * 0.5;

                    if (ip) {

                        let pr1 = DAMPING * (diff_x * vel_x1 + diff_y * vel_y1) / length;
                        let pr2 = DAMPING * (diff_x * vel_x2 + diff_y * vel_y2) / length;

                        vel_x1 += pr2 * diff_x - pr1 * diff_x;
                        vel_x2 += pr1 * diff_x - pr2 * diff_x;

                        vel_y1 += pr2 * diff_y - pr1 * diff_y;
                        vel_y2 += pr1 * diff_y - pr2 * diff_y;

                        ball_1.px = ball_1.x - vel_x1;
                        ball_1.py = ball_1.y - vel_y1;

                        ball_2.px = ball_2.x - vel_x2;
                        ball_2.py = ball_2.y - vel_y2;
                    }
                }
            }
        }
    };



    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas
