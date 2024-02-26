// @ts-check

/**
 * @param {MediaQueryListEvent | MediaQueryList} e
 */
function handleThemeChange(e) {
    document.documentElement.setAttribute('data-bs-theme', (e.matches ? 'dark' : 'light'))
}

var landscapeMQ = window.matchMedia("(prefers-color-scheme: dark)");
landscapeMQ.addEventListener("change", handleThemeChange);
handleThemeChange(landscapeMQ)

var lockSite = (typeof BigInt !== "function" || !("Intl" in window) || typeof Intl.Locale !== "function")

var hebLocal = new Intl.Locale("he")
// @ts-ignore
var calArray = ("getCalendars" in hebLocal ? hebLocal.getCalendars() : hebLocal.calendars)
if (calArray && !calArray.includes("hebrew"))
    lockSite = true

// We check if the "getCalendars" exist because Firefox did not implement it,
// yet it implemented a Hebrew calendar
if (lockSite) {
    var modal = document.getElementById("unsupportedModal");
    modal.classList.add("show");
    modal.style.display = "block";

    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    var backdrop = document.createElement("div");
    backdrop.classList.add("modal-backdrop", "fade", "show");
    document.body.appendChild(backdrop)
} else {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    /** @param {string} param */
    var settingsURLOverride = (param) => urlParams.get(param) || localStorage.getItem(param);

    var settings = Object.freeze({
        /** @returns {'hb'|'en'|'en-et'} */
        language: function () {
            if (['hb', 'en-et', 'en'].includes(settingsURLOverride("zmanimLanguage")))
                // @ts-ignore
                return settingsURLOverride("zmanimLanguage")

            if (window.navigator && window.navigator.languages) {
                const languagePartOfOptions = window.navigator.languages.find(language => language.includes('hb') || language.includes('en'))
                if (languagePartOfOptions) {
                    return languagePartOfOptions.includes('en') ? 'en' : 'hb'
                }
            }

            return 'hb';
        }
    })

    function handleLanguage(zmanimLanguage = settings.language()) {
        switch (zmanimLanguage) {
            case 'hb':
            default: {
                document.body.classList.remove("lang-en", "lang-en-et");
                document.body.classList.add("lang-hb");

                var bsCSSLink = document.getElementById("bs");
                if (bsCSSLink.getAttribute("href") !== "/assets/libraries/bootstrap/css/bootstrap.rtl.min.css")
                    bsCSSLink.setAttribute("href", "/assets/libraries/bootstrap/css/bootstrap.rtl.min.css")

                document.body.dir = "rtl";
                break;
            } case 'en-et': {
                document.body.classList.remove("lang-hb", "lang-en");
                document.body.classList.add("lang-en-et");

                var bsCSSLink = document.getElementById("bs");
                if (bsCSSLink.getAttribute("href") !== "/assets/libraries/bootstrap/css/bootstrap.min.css")
                    bsCSSLink.setAttribute("href", "/assets/libraries/bootstrap/css/bootstrap.min.css")

                document.body.dir = "ltr"
                break;
            } case 'en': {
                document.body.classList.remove("lang-hb", "lang-en-et");
                document.body.classList.add("lang-en");

                var bsCSSLink = document.getElementById("bs");
                if (bsCSSLink.getAttribute("href") !== "/assets/libraries/bootstrap/css/bootstrap.min.css")
                    bsCSSLink.setAttribute("href", "/assets/libraries/bootstrap/css/bootstrap.min.css")

                document.body.dir = "ltr"
                break;
            }
        }
    }
    
    handleLanguage();
    console.log("made it here")
}