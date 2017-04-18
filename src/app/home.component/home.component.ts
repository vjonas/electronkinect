import { Component, OnInit, Input, OnChanges,ViewChild,ElementRef} from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnChanges {
    private ipc:ipcRenderer;
    @ViewChild('canvas') canvas:ElementRef;
    constructor()
    {
        console.log(this.canvas);
        //this.ipc=new ipcRenderer();
        /*ipcRenderer.on('bodyframe',function(bodyFrame)
        {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            console.log("homecomponent - ipcrenderer method")
        })*/
    }


    ngOnInit() { 
    }

    ngOnChanges(changes){
        console.log(changes);
    }

  


}