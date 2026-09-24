/* ==========================================
   KAALCHAKRA LANGUAGE SYSTEM
   GOOGLE TRANSLATE — CLEAN VERSION
========================================== */


/* ==========================================
   GOOGLE TRANSLATE INITIALIZATION
========================================== */

function googleTranslateElementInit() {

    new google.translate.TranslateElement(
        {
            pageLanguage: 'en',
            includedLanguages:
                'en,hi,bn,or,ta,te,ml,mr,gu,pa',
            autoDisplay: false
        },
        'google_translate_element'
    );

}


/* ==========================================
   CHANGE LANGUAGE
========================================== */

function changeLanguage(language) {

    if (!language) {
        return;
    }

    const select =
        document.querySelector('.goog-te-combo');

    if (!select) {

        setTimeout(function () {
            changeLanguage(language);
        }, 300);

        return;
    }

    select.value = language;

    select.dispatchEvent(
        new Event('change', {
            bubbles: true
        })
    );

}


/* ==========================================
   REMOVE GOOGLE TRANSLATE TOP PANE
   WITHOUT DISABLING TRANSLATION
========================================== */

function removeGoogleTranslatePane() {

    /* Google's actual top translation bar */
    const selectors = [

        'body > .skiptranslate',

        '.goog-te-banner-frame',

        '.goog-te-banner-frame.skiptranslate',

        'iframe.goog-te-banner-frame',

        '.goog-te-balloon-frame',

        '#goog-gt-tt',

        '.goog-te-menu-frame',

        '.goog-te-spinner-pos'

    ];


    selectors.forEach(function (selector) {

        document
            .querySelectorAll(selector)
            .forEach(function (element) {

                element.style.setProperty(
                    'display',
                    'none',
                    'important'
                );

                element.style.setProperty(
                    'visibility',
                    'hidden',
                    'important'
                );

                element.style.setProperty(
                    'height',
                    '0px',
                    'important'
                );

                element.style.setProperty(
                    'width',
                    '0px',
                    'important'
                );

                element.style.setProperty(
                    'opacity',
                    '0',
                    'important'
                );

                element.style.setProperty(
                    'pointer-events',
                    'none',
                    'important'
                );

            });

    });


    /* Google moves the page down when translation starts */
    document.documentElement.style.setProperty(
        'margin-top',
        '0px',
        'important'
    );

    document.documentElement.style.setProperty(
        'top',
        '0px',
        'important'
    );


    document.body.style.setProperty(
        'top',
        '0px',
        'important'
    );

    document.body.style.setProperty(
        'margin-top',
        '0px',
        'important'
    );

    document.body.style.setProperty(
        'position',
        'static',
        'important'
    );

}


/* ==========================================
   HIDE GOOGLE WIDGET ITSELF
   YOUR CUSTOM SELECTOR STILL WORKS
========================================== */

function hideGoogleWidget() {

    const widget =
        document.getElementById(
            'google_translate_element'
        );

    if (widget) {

        widget.style.setProperty(
            'display',
            'none',
            'important'
        );

        widget.style.setProperty(
            'visibility',
            'hidden',
            'important'
        );

        widget.style.setProperty(
            'height',
            '0px',
            'important'
        );

        widget.style.setProperty(
            'width',
            '0px',
            'important'
        );

    }

}


/* ==========================================
   START CLEANUP
========================================== */

document.addEventListener(
    'DOMContentLoaded',
    function () {

        removeGoogleTranslatePane();
        hideGoogleWidget();


        /*
           Google can recreate the top bar
           whenever a language is selected.

           So keep checking continuously.
        */

        setInterval(
            function () {

                removeGoogleTranslatePane();
                hideGoogleWidget();

            },
            100
        );

    }
);


/* ==========================================
   EXTRA CLEANUP AFTER PAGE LOAD
========================================== */

window.addEventListener(
    'load',
    function () {

        removeGoogleTranslatePane();
        hideGoogleWidget();


        setTimeout(
            removeGoogleTranslatePane,
            300
        );

        setTimeout(
            removeGoogleTranslatePane,
            700
        );

        setTimeout(
            removeGoogleTranslatePane,
            1500
        );

        setTimeout(
            removeGoogleTranslatePane,
            3000
        );

    }
);