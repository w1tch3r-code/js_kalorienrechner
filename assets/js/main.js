"use strict";

// ===================================================
//     JS-Vertiefung – Project Kalorien-Rechner
// ===================================================

console.log("%c JS-Vertiefung – Project Kalorien-Rechner", "color: tomato");

// ===================================================
//    	 		Berechnung des Grundumsatzes
// ===================================================

const basalMetabolism = () => {
	// Input Height
	const inputHeight = Number(document.querySelector("#height").value);

	// Input Age
	const inputAge = Number(document.querySelector("#age").value);

	// Input Weight
	const inputWeight = Number(document.querySelector("#weight").value);

	// Radio Buttons - Male/Female
	let rdBtnGender = document.querySelectorAll("input[name='gender']");

	// Input Error Output
	const inputErrorOutput = document.querySelector("#inputErrorOutput");

	if (inputHeight === 0 || inputAge === 0 || inputWeight === 0){
		inputErrorOutput.style.display = 'block';
		inputErrorOutput.textContent = 'Bitte geben Sie ihre Körpergröße, ihr Alter und ihr Gewicht ein, um ihren Grundumsatzumsatz berechnen zu können.';
		return false;
	} else {
		inputErrorOutput.style.display = 'none';
		if (rdBtnGender[0].checked) {
			// Grundumsatz bei Frauen (Kalorien je Tag) 655.1 + (9.6 * Körpergewicht in kg) + (1.8 * Körpergröße in cm) – (4.7 * Alter in Jahren) = Grundumsatz
			const femaleBasalMetabolism =
				(655.1 + (9.6 * inputWeight) + (1.8 * inputHeight) - (4.7 * inputAge)).toFixed(2);
			return femaleBasalMetabolism;
		} else if (rdBtnGender[1].checked) {
			// Grundumsatz bei Männern (Kalorien je Tag) 66.47 + (13.7 * Körpergewicht in kg) + (5 * Körpergröße in cm) – (6.8 * Alter in Jahren) = Grundumsatz
			const maleBasalMetabolism =
				(66.47 + (13.7 * inputWeight) + (5 * inputHeight) - (6.8 * inputAge)).toFixed(2);
			return maleBasalMetabolism;
		}
	}
};

// ===================================================
//     		   Berechnung des Gesamtumsatzes
// ===================================================

const totalMetabolism = () => {
	// Select
	const select = document.querySelector("#physicalStress").value;
	// Select Error Output
	const selectErrorOutput = document.querySelector("#selectErrorOutput");

	if (select === 'disabled') {
		selectErrorOutput.style.display = 'block';
		selectErrorOutput.textContent = "Bitte wählen Sie eine körperliche Belastung aus, um den Gesamtumsatz berechnen zu können.";
	} else {
		selectErrorOutput.style.display = 'none';
		return (select * basalMetabolism()).toFixed(2);
	}
};

// ===================================================
//     	  Berechnung von kcal in kJ und Ausgabe 
// ===================================================

const btnCalc = document.querySelector("#btnCalc");

// Button Klick-Function für Kalorien-Berechnung
btnCalc.addEventListener("click", (event) => {
	event.preventDefault();

	// Output Fields
	const basalMetabolismKcal = document.querySelector("#basalMetabolismKcal");
	const basalMetabolismKj = document.querySelector("#basalMetabolismKj");
	const totalMetabolismKcal = document.querySelector("#totalMetabolismKcal");
	const totalMetabolismKj = document.querySelector("#totalMetabolismKj");

	if (basalMetabolism() === false || totalMetabolism() === undefined) {
		basalMetabolismKcal.textContent = 0;
		basalMetabolismKj.textContent = 0;
		totalMetabolismKcal.textContent = 0;
		totalMetabolismKj.textContent = 0;
		return false;
	} else {
		// Ausgabe von kcal
		basalMetabolismKcal.textContent = basalMetabolism().replace('.',',');
		totalMetabolismKcal.textContent = totalMetabolism().replace('.',',');
		// Umrechnung von kcal in kJ und Ausgabe
		basalMetabolismKj.textContent = (basalMetabolism() * 4.1868).toFixed(2).replace('.',',');
		totalMetabolismKj.textContent = (totalMetabolism() * 4.1868).toFixed(2).replace('.',',');
	}
});
