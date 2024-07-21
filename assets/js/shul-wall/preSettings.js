import { settings } from "../settings/handler.js";

let preSetSettings;
switch (window.location.href.split('/').at(-1)) {
	case 'shaare-tefila-queens':
		preSetSettings = Object.freeze({
			seconds: () => false,
			timeFormat: () => 'h12',
			language: () => 'en',
			location: {
				name: () => "שערי תפילה",
				lat: () => 40.72248172843898,
				long: () => -73.81711648268919,
				elevation: () => 0,
				timezone: () => "America/New_York"
			},
			calendarToggle: {
				hourCalculators: () => 'degrees',
				rtKulah: () => true,
				tzeitTaanitHumra: () => false,
				tekufaMidpoint: () => 'hatzoth',
				tekufaCalc: () => 'shemuel'
			},
			customTimes: {
				candleLighting: () => 20,
				tzeithIssurMelakha: () => ({ minutes: 30, degree: 7.14 })
			}
		});
	case 'ohel-michael':
	case 'ohel-michael-adj':
		preSetSettings = Object.freeze({
			seconds: () => false,
			timeFormat: () => 'h12',
			language: () => 'en',
			location: {
				name: () => "Ohel Michael",
				lat: () => 40.721502,
				long: () => -73.811808,
				elevation: () => 0,
				timezone: () => "America/New_York"
			},
			calendarToggle: {
				hourCalculators: () => 'degrees',
				rtKulah: () => true,
				tzeitTaanitHumra: () => false,
				tekufaMidpoint: () => 'hatzoth',
				tekufaCalc: () => 'shemuel'
			},
			customTimes: {
				candleLighting: () => 20,
				tzeithIssurMelakha: () => ({ minutes: 30, degree: 7.14 })
			}
		});
}

export default preSetSettings || settings;