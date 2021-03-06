$(document).ready(function(){
	const reference = $(".reference");
	const timeGroup = $(".time-group");
	const perHour = localStorage.getItem("per-hour") || 1;
	
	addNewReference(reference.clone());	

	$('.add-time-field').on("click", function(){
		addNewReference(reference.clone());
	});

	$(`[name="per-hour-field"]`).on("change blur input", function(){
		calcResult();
		localStorage.setItem("per-hour", $(this).val());
	}).val(perHour);
});

function addNewReference(ref){
	const timeGroup = $(".time-group");

	ref.find(".remove-time-field").on("click", function(){
		$(this).parent().parent().remove();
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

	resultContainer.html(makeTimeStringFromSec(sumSeconds) + " (UAH " + price + ")");
}

function tStrToSec(t){
	let arr = t.split(":");
	arr[0] = parseInt(arr[0]) || 0;
	arr[1] = parseInt(arr[1]) || 0;
	arr[2] = parseInt(arr[2]) || 0;

	return (arr[0] * 3600) + (arr[1] * 60) + arr[2];
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