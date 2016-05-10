$(document).ready(function(){

	Reveal.initialize({
		progress: false,
		center: true,
		transition: 'none',
		backgroundTransition: 'none'
	});

	var video = $("video")
	var track = null;

	function getCameraFeed(){
		//showDiv("cameraWrapper");

		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

		var constraints = {audio:false, video:{width:800, height:480, sourceId:"8d5e29fbf3cb66e53a2f54da09a8ca167015280dbc652bcfe3ceff26f8ac215a"}}

		navigator.getUserMedia(constraints, function(stream){
			video.attr({'src':URL.createObjectURL(stream)})
			track = stream.getTracks()[0]

			//console.log(stream.getSources())

			video.on('loadedmetadata', function(e){
				video.get(0).play();

				//start gifshot once camera is loaded
			})			

		}, function(err){
			alert("Error accessing camera");
			console.log("error: " + err)
		})
		
	}

	//getCameraFeed();

	if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
	  console.log("enumerateDevices() not supported.");
	  return;
	}

// List cameras and microphones.

// navigator.mediaDevices.enumerateDevices()
// .then(function(devices) {
//   devices.forEach(function(device) {
//     console.log(device.kind + ": " + device.label +
//                 " id = " + device.deviceId);
//   });
// })
// .catch(function(err) {
//   console.log(err.name + ": " + err.message);
// });

// getCameraFeed()


	function getVideo(){

		navigator.mediaDevices.enumerateDevices()
		.then(gotDevices)
		.catch(errorCallback);

	}

	function errorCallback(error) {
	  console.log('navigator.getUserMedia error: ', error);
	}

	var constraints = {audio:false,
						video: {deviceId: "8c8f7d2082fcdc004900bce2110f6a8be3c8b248198f7b5f360f0a018459487e", width:300, height:200}
					}

	function gotDevices(deviceInfos, num){

		
		for (var i = 0; i !== deviceInfos.length; ++i) {
			var deviceInfo = deviceInfos[i];

			if (deviceInfo.kind === 'videoinput') {
	      		var option = deviceInfo.label || 'camera ' + ' ' + deviceInfo.deviceId;
	      		console.log(option, deviceInfo.deviceId)
	      		if(deviceInfo.label.indexOf("Logitech")>-1){
	      			console.log("got logitech id: " + deviceInfo.deviceId)
	      			constraints.video.deviceId = deviceInfo.deviceId;
	      			start();
	      		}
	      		
	    	}
		}
	}

	var videoElement = document.querySelector("video")

	function start(){
		navigator.mediaDevices.getUserMedia(constraints)
		.then(function(stream){
			window.stream = stream; // make stream available to console
    		videoElement.srcObject = URL.createObjectURL(stream)
    		//video.attr({'src':URL.createObjectURL(stream)})
			track = stream.getTracks()[0]

			//console.log(stream.getSources())

			video.on('loadedmetadata', function(e){
				video.get(0).play();

				//start gifshot once camera is loaded
			})			
    		// Refresh button list in case labels have become available
    		//return navigator.mediaDevices.enumerateDevices();
		})
	}

	var videoSlides = [5,8,16,20,23,25,27,29,32]

	Reveal.addEventListener('slidechanged', function(e){
		console.log(e.indexh);


		if(e.indexh == 5 || e.indexh == 8 || e.indexh == 16 || e.indexh == 20 || e.indexh == 23 || e.indexh == 25 || e.indexh == 27 || e.indexh == 29 || e.indexh == 32){
			getVideo();
		} else {
			if(track){
				track.stop();
			}
		}


	})

})