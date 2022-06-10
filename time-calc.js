$(document).ready(function(){
	const reference = $(".reference");
	const timeGroup = $(".time-group");
	
	addNewReference(reference.clone());	

	$('.add-time-field').on("click", function(){
		addNewReference(reference.clone());
	});

	$(`[name="per-hour-field"]`).on("change blur input", function(){
		calcResult();
	});
});

function addNewReference(ref){
	const timeGroup = $(".time-group");

	ref.find(".remove-time-field").on("click", function(){
		$(this).parent().parent().parent().remove();
		calcResult();
	});

	ref.find(".time-field").on("change blur input", function(){
		calcResult();
	});

	timeGroup.append(ref);
}

function calcResult(){
	const resultContainer = $(".result-container");
	const perHour = $(`[name="per-hour-field"]`).val();

	let timeFields = $(".time-group .time-field");
	let timeArr = [];
	for(let i=0; i<timeFields.length; i++){
		timeArr.push($(timeFields[i]).val());
	}

	let sumSeconds = 0;
	let price = 0;
	for(let t of timeArr){
		if(!t.length){
			continue;
		}

		sumSeconds += tStrToSec(t);
	}

	price = (sumSeconds / 3600 * perHour).toFixed(2);

	resultContainer.html(makeTimeStringFromSec(sumSeconds) + " (" + price + "$)");
}

function tStrToSec(t){
	let arr = t.split(":");
	return (parseInt(arr[0]) * 3600) + (parseInt(arr[1]) * 60) + parseInt(arr[1]);
}

function makeTimeStringFromSec(s){
	let h = Math.floor(s / 3600);
	let m = Math.floor((s - h * 3600) / 60);
	let sec = s - h * 3600 - m * 60;

	if(h < 10){
		h = "0" + h;
	}

	if(m < 10){
		m = "0" + m;
	}

	if(sec < 10){
		sec = "0" + sec;
	}
	return `${h}:${m}:${sec}`;
}