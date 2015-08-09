var traps;

function parseMap() {
	traps = [];

	//var mapData = JSON.parse(STAGE_01);
	//console.log(mapData);
	console.log(STAGE_01);


	for (var i = 0; i < STAGE_01.layers.length; i++){
		if (STAGE_01.layers[i].name === "Traps"){
			console.log("Currently Parsing the traps");
			var trapData = STAGE_01.layers[i].data;
			break;
		}
	}

	for (var i = 0; i< trapData.length; i++){
		if (trapData[i] !== 0){
			var trap = {
				"type": trapData[i],
				"index": i
			}
			traps.push(trap);
		}
	}
}


//trap object, contaning baseclicks and scaling number