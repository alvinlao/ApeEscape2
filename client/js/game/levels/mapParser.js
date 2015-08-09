var traps;
function parseMap() {

	//var mapData = JSON.parse(STAGE_01);
	//console.log(mapData);
	console.log(STAGE_01);

	for (var i = 0; i < STAGE_01.layers.length, i++){
		if (STAGE_01.layers[i].name === "Traps"){
			console.log("Currently Parsing the traps");
			var trapData = STAGE_01.layers[i].data;
			for (var l = 0; l< trapData.length; l++){
				switch(trapData[l]){
					case:
				}

				if (tapData[l] !== 0){
					var trap = {
						index: l,

					}
				}
				}
				}
			}
		}
	}

}


//trap object, contaning baseclicks and scaling number