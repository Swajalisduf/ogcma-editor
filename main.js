document.addEventListener('DOMContentLoaded', () => {
	let button = document.querySelector('button');
	let modeHeading = document.getElementById('mode');
	button.addEventListener('click', () => {
		if(button.innerHTML == 'Insert Tags'){
			button.innerHTML = 'Edit';
			modeHeading.innerHTML = 'Insert Tags Mode';	
		} else if(button.innerHTML == 'Edit'){
			button.innerHTML = 'Insert Tags';
			modeHeading.innerHTML = 'Edit Mode';
		}
	});

	let tagger = new ButtonDetect;
	tagger.detectKeys();
});