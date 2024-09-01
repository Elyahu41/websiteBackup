// @ts-check

import * as KosherZmanim from "../../libraries/kosherZmanim/kosher-zmanim.esm.js";
import { HebrewNumberFormatter, default as webCal } from "../WebsiteCalendar.js";
const hiloulahIndex = new KosherZmanim.HiloulahYomiCalculator();

const todayDate = KosherZmanim.Temporal.Now.plainDateISO();
const jCal = new webCal(todayDate);

const hNum = new HebrewNumberFormatter();

for (const daf of document.querySelectorAll('[data-zfReplace="dafBavli"]')) {
	if (jCal.getJewishYear() < 5684) {
		daf.innerHTML = "N/A. Daf Yomi (Bavli) was only created on Rosh Hashanah 5684 and continues onto this day"
	} else {
		const dafObject = jCal.getDafYomiBavli();
		daf.innerHTML =
			dafObject.getMasechta() + " " +
			hNum.formatHebrewNumber(dafObject.getDaf());
	}
}
for (const dafYerushalmi of document.querySelectorAll('[data-zfReplace="DafYerushalmi"]')) {
	const dafYerushalmiObject = jCal.getDafYomiYerushalmi();
	if (!dafYerushalmiObject || dafYerushalmiObject.getDaf() == 0) {
		dafYerushalmi.innerHTML = "N/A";
	} else {
		dafYerushalmi.innerHTML = dafYerushalmiObject.getMasechta() + " " + hNum.formatHebrewNumber(dafYerushalmiObject.getDaf());
	}
}

document.querySelector('[data-zfReplace="TehilimShvui"]').innerHTML
	= KosherZmanim.TehilimYomi.byWeek(jCal).map(num => num.toString()).join(' - ');
document.querySelector('[data-zfReplace="TehilimHodshi"]').innerHTML
	= KosherZmanim.TehilimYomi.byDayOfMonth(jCal).map(met => met.toString()).join(' - ');

const haftara = KosherZmanim.Haftara.getThisWeeksHaftarah(jCal.shabbat())
document.querySelector('[data-zfReplace="Haftara"]').innerHTML
	= `<b>${haftara.text}</b> (${haftara.source})`;

const chafetzChayimYomi = jCal.getChafetzChayimYomi();
for (const ccYomi of document.querySelectorAll('[data-zfReplace="ccYomi"]'))
	ccYomi.innerHTML = (chafetzChayimYomi.title + (chafetzChayimYomi.section ? (": " + chafetzChayimYomi.section) : "")) || "N/A";

const leilouNishmat = await hiloulahIndex.getHiloulah(jCal)
for (let leilouNishmatList of document.querySelectorAll('[data-zfFind="hiloulah"]')) {
	while (leilouNishmatList.firstElementChild) {
		leilouNishmatList.firstElementChild.remove()
	}

	/** @type {'en'|'he'} */
	// @ts-ignore
	const hLang = leilouNishmatList.getAttribute('data-zfIndex')
	if (!leilouNishmat[hLang].length) {
		const li = document.createElement('li');
		li.classList.add('list-group-item');
		li.appendChild(document.createTextNode(leilouNishmatList.getAttribute('data-fillText')));
		leilouNishmatList.appendChild(li);

		continue;
	}

	for (const neshama of leilouNishmat[hLang]) {
		const li = document.createElement('li');
		li.classList.add('list-group-item');
		li.appendChild(document.createTextNode(neshama.name))

		leilouNishmatList.appendChild(li);
	}
}