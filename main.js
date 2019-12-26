if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

let selection = null;

const magicWords = {
    nerd: [
        'android', 'atom', 'aws',
        'bash', 'bluetooth', 'boba', 'boto',
        'chmod', 'chown', 'columnar', 'cron',
        'datamart', 'dir',
        'echo', 'etl',
        'fax',
        'git', 'glue', 'google', 'grep', 'gzip',
        'hadoop', 'hbo', 'hmem', 'hulu',
        'iphone',
        'json',
        'kindle',
        'larp', 'less', 'ls', 'luigi',
        'netflix', 'nohup',
        'pager', 'parquet', 'pdf', 'php', 'ping', 'pip', 'postgres',
        'query', 'queue',
        'redshift', 'regex', 'root',
        's3', 'sms', 'spark', 'sql', 'sriracha', 'ssh', 'sublime',
        'vi',
    ],
    latin: [
        'abeo', 'accommodo', 'acerbitas', 'acerbitas', 'acerbus', 'adeo',
        'aequor', 'amicitia', 'antiquus', 'arbitror', 'argentum', 'auctor',
        'breviter',
        'candidus', 'capio', 'carus', 'castus', 'celeriter', 'compono', 'consumo', 'contemno', 'crimen', 'cursus',
        'dominus', 'domus', 'donec',
        'exerceo', 'exigo',
        'facinus', 'fero', 'fidelis', 'flos', 'fortis', 'forum', 'frater',
        'hic', 'honestus', 'hospes', 'huc',
        'iacio', 'iam', 'illuc', 'incido', 'inde', 'ingredior', 'instituo', 'iudicium', 'iungo', 'iuro',
        'levis', 'lorem',
        'magis', 'magnitudo', 'metus', 'miles', 'mora',
        'necesse', 'nefas',
        'olim',
        'patria', 'pax', 'poeta', 'posco', 'praecipio', 'praesens', 'praeter', 'prex', 'proprius', 'protinus', 'provincia',
        'quidem', 'quiesco', 'quippe', 'quisque', 'quotiens',
        'reus', 'rideo', 'ripa',
        'salus', 'sapientia', 'scelus', 'scilicet', 'scribo', 'subeo',
        'tardus', 'turba',
        'umquam', 'usque', 'uterque',
        'validus', 'verbum', 'vero', 'vita', 'votum', 'vox',
    ],
};

const eventName = 'ontouchstart' in window ? 'touchstart' : 'click';

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

const $wrapper = document.querySelector('.js-wrapper');
const $outlet = document.querySelector('.js-outlet');

function openScroll() {
    const spell = [
        magicWords[selection].random(),
        magicWords[selection].random(),
        magicWords[selection].random(),
    ].join(' ');

    $outlet.innerHTML = spell;
    $wrapper.style.maxHeight = String($outlet.scrollHeight + 20) + 'px';
}

function closeScroll() {
    $wrapper.addEventListener('transitionend', onCloseScroll);
    $wrapper.style.maxHeight = 0;
}

function onCloseScroll() {
    $wrapper.removeEventListener('transitionend', onCloseScroll);
    openScroll();
    document.body.addEventListener(eventName, newSpell);
}

function newSpell() {
    document.body.removeEventListener(eventName, newSpell);
    closeScroll();
}

function setUpPageEvents() {
    document.body.addEventListener(eventName, newSpell);

    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            newSpell();
        }
    });
}

function selectScroll(event) {
    selection = event.target.dataset.scroll || Object.keys(magicWords).random();

    document.body.addEventListener('animationend', function roomFadedOut() {
        document.body.removeEventListener('animationend', roomFadedOut);
        openScroll();

        setUpPageEvents();
    });

    document.documentElement.classList.add('has-selected');
}

function roomSetup() {
    Array.from(document.querySelectorAll('[data-scroll]')).forEach(function(elem) {
        elem.addEventListener('click', selectScroll);
    });
}

window.addEventListener('load', roomSetup);
