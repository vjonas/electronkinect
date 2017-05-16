console.log("KINECT JS");
		//var socket = io.connect('http://localhost:8000');
		var canvas = document.getElementById('bodyCanvas');
		var ctx = canvas.getContext('2d');
		var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

		// handstate circle size
		var HANDSIZE = 20;

		// closed hand state color
		var HANDCLOSEDCOLOR = "red";

		// open hand state color
		var HANDOPENCOLOR = "green";

		// lasso hand state color
		var HANDLASSOCOLOR = "blue";

		function updateHandState(handState, jointPoint) {
			switch (handState) {
				case 3:
					drawHand(jointPoint, HANDCLOSEDCOLOR);
				break;

				case 2:
					drawHand(jointPoint, HANDOPENCOLOR);
				break;

				case 4:
					drawHand(jointPoint, HANDLASSOCOLOR);
				break;
			}
		}

		function drawHand(jointPoint, handColor) {
			// draw semi transparent hand cicles
			ctx.globalAlpha = 0.75;
			ctx.beginPath();
			ctx.fillStyle = handColor;
			ctx.arc(jointPoint.colorX * 768, jointPoint.colorY * 636, HANDSIZE, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.closePath();
			ctx.globalAlpha = 1;
		}