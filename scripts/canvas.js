export default class Canvas {
	constructor() {
		this.canvasElement = document.getElementById('canvas');
		this.canvasCTX = this.canvasElement.getContext('2d');
		this.radius = this.canvasElement.height / 2;
		this.canvasGrad;
	}

	_initClock() {
		this.canvasCTX.translate(this.radius, this.radius);
		this.radius = this.radius * 0.90;
		var self = this;
		setInterval(function() {
			self._drawClock();
		}, 1000);
	}

	_drawClock() {
		this._drawClockFace();
		this._drawClockNumbers();
		this._drawClockTime();
	}

	_drawClockFace() {
		this.canvasCTX.beginPath();
		this.canvasCTX.arc(0, 0, this.radius, 0, 2 * Math.PI);
		this.canvasCTX.fillStyle = '#3B3B98';
		this.canvasCTX.fill();
		this.canvasGrad = this.canvasCTX.createRadialGradient(0, 0, this.radius * 0.95, 0, 0, this.radius * 1.05);
		this.canvasGrad.addColorStop(0, '#6e6eb7');
		this.canvasGrad.addColorStop(0.5, '#3B3B98');
		this.canvasGrad.addColorStop(1, '#6e6eb7');
		this.canvasCTX.strokeStyle = this.canvasGrad;
		this.canvasCTX.lineWidth = this.radius * 0.1;
		this.canvasCTX.stroke();
		this.canvasCTX.beginPath();
		this.canvasCTX.arc(0, 0, this.radius * 0.1, 0, 2 * Math.PI);
		this.canvasCTX.fillStyle = '#6e6eb7';
		this.canvasCTX.fill();
	}

	_drawClockNumbers() {
		this.canvasCTX.font = this.radius * 0.15 + 'px arial';
		this.canvasCTX.textBaseline = 'middle';
		this.canvasCTX.textAlign = 'center';
		for (let num = 1; num < 13; num++) {
			let ang = num * Math.PI / 6;
			this.canvasCTX.rotate(ang);
			this.canvasCTX.translate(0, -this.radius * 0.85);
			this.canvasCTX.rotate(-ang);
			this.canvasCTX.fillText(num.toString(), 0, 0);
			this.canvasCTX.rotate(ang);
			this.canvasCTX.translate(0, this.radius * 0.85);
			this.canvasCTX.rotate(-ang);
		}
	}

	_drawClockTime() {
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		//hour
		hour = hour % 12;
		hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
		this._drawClockHands(hour, this.radius * 0.5, this.radius * 0.07);
		//minute
		minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
		this._drawClockHands(minute, this.radius * 0.7, this.radius * 0.05);
		// second
		second = (second * Math.PI / 30);
		this._drawClockHands(second, this.radius * 0.9, this.radius * 0.02);
	}

	_drawClockHands(pos, length, width) {
		this.canvasCTX.beginPath();
		this.canvasCTX.lineWidth = width;
		this.canvasCTX.lineCap = 'round';
		this.canvasCTX.moveTo(0, 0);
		this.canvasCTX.rotate(pos);
		this.canvasCTX.lineTo(0, -length);
		this.canvasCTX.stroke();
		this.canvasCTX.rotate(-pos);
	}
}
