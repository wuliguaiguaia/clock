class Clock {
    constructor(id, W) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.W = W;
        this.init();
    }
    init() {
        this.canvas.width = this.canvas.height = this.W;
        this.ctx.translate(this.W / 2, this.W / 2);
        window.requestAnimationFrame(this.render.bind(this))
    }

    render() {
        let time = this.getTime()
        let [hour, minute, second] = time;
        this.ctx.clearRect(-this.W / 2, -this.W / 2, this.W, this.W);

        // 大边框
        this.drawArc(0, 0, this.W / 2, this.ctx);

        // 周围圆点
        for (let i = 0; i < 60; i++) {
            let color;
            if (i % 5) {
                color = "#ccc"
            } else {
                color = "black"
            }
            let x = (this.W / 2 - 15) * Math.cos(Math.PI * 2 / 60 * i);
            let y = (this.W / 2 - 15) * Math.sin(Math.PI * 2 / 60 * i);
            this.drawArc(x, y, 5, this.ctx, color);
        }

        // 数字
        let numArr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
        numArr.forEach((num, i) => {
            let x = (this.W / 2 - 30) * Math.cos(Math.PI * 2 / 12 * i);
            let y = (this.W / 2 - 30) * Math.sin(Math.PI * 2 / 12 * i);
            this.drawText(num, x, y, '#333', this.ctx)
        })

        // 时针
        let hDeg = 2 * Math.PI / 12 * hour + 2 * Math.PI / 60 * minute / 12;
        this.drawLine(0, 20, hDeg, this.W / 5, 'red', 3, this.ctx)

        // 分针
        let mDeg = 2 * Math.PI / 60 * minute;
        this.drawLine(0, 20, mDeg, this.W / 3, 'blue', 2, this.ctx)

        // 秒针
        let sDeg = 2 * Math.PI / 60 * second;
        this.drawLine(0, 20, sDeg, this.W / 2 - 10, 'green', 2, this.ctx);

        // 圆心
        this.drawArc(0, 0, 5, this.ctx, '#fff');

        window.requestAnimationFrame(this.render.bind(this));
    }

    getTime() {
        let date = new Date();
        let timeArr = date.toTimeString().split(":");
        if (timeArr[0] > 11) {
            timeArr[0] = timeArr[0] - 12;
        }
        timeArr[2] = timeArr[2].slice(0, 2);
        return timeArr;
    }

    drawLine(x, y, deg, len, color, lineWidth, ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rotate(deg);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.moveTo(x, y);
        ctx.lineTo(x, -len);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.restore();
    }

    drawArc(x, y, r, ctx, fillColor) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        } else {
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'yellow';
            ctx.stroke();
        }
        ctx.closePath();
    }

    drawText(text, x, y, color, ctx) {
        ctx.beginPath();
        ctx.font = "15px Arial";
        ctx.textAlign = "center"
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }
}
new Clock('canvas', 500);