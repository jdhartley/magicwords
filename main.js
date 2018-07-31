if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

const magicWords = [
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
];

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

const $wrapper = document.querySelector('.js-wrapper');
const $outlet = document.querySelector('.js-outlet');

function openScroll() {
    const spell = [magicWords.random(), magicWords.random(), magicWords.random()].join(' ');

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
    document.body.addEventListener('click', newSpell);
}

function newSpell() {
    document.body.removeEventListener('click', newSpell);
    closeScroll();
}

openScroll();

document.body.addEventListener('click', newSpell);
