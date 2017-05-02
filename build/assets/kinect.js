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
			ctx.arc(jointPoint.depthX * 768, jointPoint.depthY * 636, HANDSIZE, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.closePath();
			ctx.globalAlpha = 1;
		}

		/*setInterval(function(){
			 socket.on('bodyFrame', function(bodyFrame){
				 console.log("via socket");
				 console.log(bodyFrame);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var index = 0;
			bodyFrame.bodies.forEach(function(body){
				if(body.tracked) {
					for(var jointType in body.joints) {
						var joint = body.joints[jointType];
						ctx.fillStyle = colors[index];
						ctx.fillRect(joint.depthX * 768, joint.depthY * 636, 10, 10);
					}
					//draw hand states
					updateHandState(body.leftHandState, body.joints[7]);
					updateHandState(body.rightHandState, body.joints[11]);
					index++;
				}
			});
		}); }, 1000/2);*/

/*		 var ipc=require('ipc');
   ipc.on('kinect-bodyframe',function(){
     console.log("bodyframe");
   })*/