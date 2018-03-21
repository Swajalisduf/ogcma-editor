class ButtonDetect {

	detectKeys(){
		//Keeps track of which keys are pressed, values change to true if pressed.

		//Created map to make inserting tags possible with left hand and holding shift and navigating text area with right hand.

		let map = {
			16: false,	//Shift
			
			//Row 1
			81: false,	//q, publication
			87: false,	//w, owning
			69: false,	//e, creation date
			82: false,	//r, bibliography
			//Row 2
			65: false,	//a, artist surname
			83: false,	//s, artist given
			68: false,	//d, artist date
			70: false,	//f, title
			//Row 3
			90: false,	//z, additional artist(s)
			88: false,	//x, medium
			67: false,	//c, premiere date
			86: false	//v, premiere venue
		};	

		//For preventing multiple iterations of keydown when key is held
		let heldKeys = {};
		let lastEvent = null;	

		$(document).keydown( (e) => {
			//Exits function if key is already down
			if(lastEvent && lastEvent.keyCode == e.keyCode){
				return;
			}			

			//Confirms editor is in Insert Tags Mode
			let mode = document.getElementById('mode').innerHTML;
	    if(mode == "Insert Tags Mode"){
	    	e.preventDefault();
    		if (e.keyCode in map) {
    			//Updates map to reflect pressed keys
	    		map[e.keyCode] = true;
	    		//Inserts appropriate tags according to pressed keys
	    		let tagger = new ButtonDetect;
					tagger.checkKeys(map);
	      }

	      //Sets currently pressed keys to avoid multiple firings of keydown function
	    	lastEvent = e;
	    	heldKeys[e.keyCode] = true;
	    }
		}).keyup( (e) =>{
			let mode = document.getElementById('mode').innerHTML;
			//Indicates key is no longer pressed
			lastEvent = null;
			delete heldKeys[e.keyCode];

			//Resets map 
	    if(mode == "Insert Tags Mode"){
	    	if (e.keyCode in map) {
		    	  map[e.keyCode] = false;
		  	}
	    }
		});
	}

	//Checks keys against map and passes tag to insert to insertTag function
	checkKeys(map){
		let tag = '';
		let tagger = new ButtonDetect;

		if(!map[16]){
			switch(true){
				//Opening Tags, only triggers when shift is not pressed
				case (map[81]):
					tag = '<publication>';
					tagger.insertTag(tag);
					break;
				case (map[87]):
					tag = '<owning>';
					tagger.insertTag(tag);
					break;
				case (map[69]):
					tag = '<creation-date>';
					tagger.insertTag(tag);
					break;
				case (map[82]):
					tag = '<bibliography>';
					tagger.insertTag(tag);
					break;
				case (map[65]):
					tag = '<artist-surname>';
					tagger.insertTag(tag);
					break;
				case (map[83]):
					tag = '<artist-given>';
					tagger.insertTag(tag);
					break;
				case (map[68]):
					tag = '<artist-date>';
					tagger.insertTag(tag);
					break;
				case (map[70]):
					tag = '<title>';
					tagger.insertTag(tag);
					break;
				case (map[90]):
					tag = '<add-artist>';
					tagger.insertTag(tag);
					break;
				case (map[88]):
					tag = '<medium>';
					tagger.insertTag(tag);
					break;
				case (map[67]):
					tag = '<premiere-date>';
					tagger.insertTag(tag);
					break;
				case (map[86]):
					tag = '<premiere-venue>';
					tagger.insertTag(tag);
					break;
			}
		} else if (map[16]) {
			//Closing Tags, only triggers when shift is pressed.
			switch(true){
				case (map[81]):
					tag = '</publication>';
					tagger.insertTag(tag);
					break;
				case (map[87]):
					tag = '</owning>';
					tagger.insertTag(tag);
					break;
				case (map[69]):
					tag = '</creation-date>';
					tagger.insertTag(tag);
					break;
				case (map[82]):
					tag = '</bibliography>';
					tagger.insertTag(tag);
					break;
				case (map[65]):
					tag = '</artist-surname>';
					tagger.insertTag(tag);
					break;
				case (map[83]):
					tag = '</artist-given>';
					tagger.insertTag(tag);
					break;
				case (map[68]):
					tag = '</artist-date>';
					tagger.insertTag(tag);
					break;
				case (map[70]):
					tag = '</title>';
					tagger.insertTag(tag);
					break;
				case (map[90]):
					tag = '</add-artist>';
					tagger.insertTag(tag);
					break;
				case (map[88]):
					tag = '</medium>';
					tagger.insertTag(tag);
					break;
				case (map[67]):
					tag = '</premiere-date>';
					tagger.insertTag(tag);
					break;
				case (map[86]):
					tag = '</premiere-venue>';
					tagger.insertTag(tag);
					break;	
			}
		}
	}

	insertTag(tag){
		let editor = document.getElementById('editor');

		if (editor.selectionStart || editor.selectionStart == '0') {
			let startPos = editor.selectionStart;
			let endPos = editor.selectionEnd;
			editor.value = editor.value.substring(0, startPos)
			+ tag
			+ editor.value.substring(endPos, editor.value.length);
			editor.focus();
			//editor.selectionStart;
		}
	}
}