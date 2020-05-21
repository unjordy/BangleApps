(function(back) {
    let settings = require('Storage').readJSON('pills.json', 1) || {};

    E.showMenu({
        '': { 'title': 'Pill Tracker' },
        'Took Pill': () => require('Storage').write('pills.json', {
            pillTakenTime: new Date().getTime()
        }),
        'Hide Alert': () => require('Storage').write('pills.json', {
            showAlert: false
        }),
        '< Back': back,
    });
});
