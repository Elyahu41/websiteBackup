// @ts-check
import { settings } from "../settings/handler.js";

if (!('timers' in window))
	// @ts-ignore
	window.timers = {}

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
		break;
	case 'mercaz-bne-aliya':
		preSetSettings = Object.freeze({
			seconds: () => false,
			timeFormat: () => 'h12',
			language: () => 'en',
			location: {
				name: () => "מרכז בני עליה",
				lat: () => 40.724398257899246,
				long: () => -73.82106240353995,
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
		break;
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
				candleLighting: () => 18,
				tzeithIssurMelakha: () => ({ minutes: 30, degree: 7.14 })
			}
		});
		break;
	case 'pomona':
		preSetSettings = Object.freeze({
			seconds: () => false,
			timeFormat: () => 'h12',
			language: () => 'en',
			location: {
				name: () => "Ohel Michael",
				lat: () => 41.198124,
				long: () => -74.055571,
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
		break;
}

export default preSetSettings || settings;