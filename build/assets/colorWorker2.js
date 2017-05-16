// -----------------------------------------------------------------------
// Inspired by KinectWorker-1.8.0.js from the 1.8 Microsoft SDK.
// -----------------------------------------------------------------------
//var pako = require("pako.inflate.min.js");
console.log("colorworker gestart");
(function () {

    //importScripts('pako.inflate.min.js'); 
    if ('function' === typeof importScripts) {
        importScripts('pako.inflate.min.js');
    }

     /*process.on("message",function(e)
     {
         process.send("ontvangen in kind");
     })*/

    var imageData;
    function init() {
        process.on('message', function (event) {
            var setImageData = JSON.stringify(event).substr(0, 1);
            process.send("setimagedata-zonder param:"+event);
            //process.send("data","setimagedata:"+setImageData);
            if (setImageData == "0") {
                imageData = JSON.stringify(event).substr(1, event.length);
            }
            else
                processImageData(event);


            /*if (event != undefined) {
                switch (event.data.message) {
                    case "setImageData":
                        imageData = event.data.imageData;
                        process.send("setImageData in colorWorker2");
                        break;
                    case "processImageData":
                        processImageData(event.data.imageBuffer);
                        break;
                }
            }*/
        });
    }

    function processImageData(compressedData) {
        /*var imageBuffer = pako.inflate(atob(compressedData));
        var pixelArray = imageData.data;
        var newPixelData = new Uint8Array(imageBuffer);
        var imageDataSize = imageData.data.length;
        for (var i = 0; i < imageDataSize; i++) {
            imageData.data[i] = newPixelData[i];
        }*/
        //process.send({ "message": "imageReady", "imageData": imageData });
    }

    init();
})();