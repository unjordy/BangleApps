(function(back) {
    let settings = require('Storage').readJSON('pills.json', 1) || {
        foodMins: 30,
        pillHours: 23,
    };

    E.showMenu({
        '': { 'title': 'Pill Tracker' },
        'Took Pill': () => {
            settings.pillTakenTime = new Date().getTime();
            settings.showAlert = true;

            require('Storage').write('pills.json', settings);
            load();
        },
        'Hide Alert': () => {
            settings.showAlert = false;

            require('Storage').write('pills.json', settings);
            load();
        },
        'Pill in hrs': {
            value: settings.pillHours,
            min: 1,
            max: 24,
            step: 1,
            onchange: (v) => {
                settings.pillHours = v;
                require('Storage').write('pills.json', settings);
            }
        },
        'Food in mins': {
            value: settings.foodMins,
            min: 0,
            max: 120,
            step: 1,
            onchange: (v) => {
                settings.foodMins = v;
                require('Storage').write('pills.json', settings);
            }
        },
        '< Back': back,
    });
});
