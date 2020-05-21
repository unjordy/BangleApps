(() => {
    const width = 24;
    const icon = atob("GBiBAAAAAAAAAAf/4A//8B//+B//+AAAAA//8A//8AwAMAxwMAxQMAxwMAxQMAxSMAwMMAwMMAwSMAwAMA//8A//8Af/4AAAAAAAAA==");
    const settings = require('Storage').readJSON('pills.json', 1) || {};
    const pillMins = 2;
    let foodTimeout;
    let pillTimeout;
    let redrawInterval;

    function draw() {
        const now = new Date().getTime();
        let tilFood = 0;
        let tilPill = 0;

        if (settings.pillTakenTime) {
            tilFood = settings.pillTakenTime + (settings.foodMins * 60000) - now;
            tilPill = settings.pillTakenTime + (pillMins * 60000) - now;
        }

        if (!foodTimeout && tilFood > 0) {
            foodTimeout = setTimeout(() => {
                Bangle.buzz(300, 1).then(() => {
                    foodTimeout = null;
                    settings.showAlert = true;
                    require('Storage').write('pills.json', {
                        showAlert: true
                    });

                    WIDGETS.pillTimer.draw(WIDGETS.pillTimer);
                    g.flip();
                });
            }, tilFood);
        }

        if (!pillTimeout && tilPill > 0) {
            pillTimeout = setTimeout(() => {
                if (redrawInterval) {
                    clearInterval(redrawInterval);
                    redrawInterval = null;
                }

                pillTimeout = null;
                settings.showAlert = true;
                require('Storage').write('pills.json', {
                    showAlert: true
                });

                WIDGETS.pillTimer.draw(WIDGETS.pillTimer);
            }, tilPill);
        }

        g.reset();
        g.setColor(0, 0, 0);
        g.fillRect(this.x, this.y, this.x + width - 1, this.y + 23);

        if (!settings.showAlert) {
            return;
        }

        if (tilPill <= 0) {
            g.setColor(255, 0, 0);
            g.drawImage(icon, this.x, this.y);
        }
        else if (tilFood > 0) {
            const til = Math.floor(tilFood / 1000);

            if (!redrawInterval) {
                redrawInterval = setInterval(() => {
                    WIDGETS.pillTimer.draw(WIDGETS.pillTimer);
                }, 1000);
            }

            g.setColor(255, 255, 0);
            g.setFontAlign(0,0);
            g.drawImage(icon, this.x, this.y);
            g.fillRect(this.x + 4,
                       this.y + 8,
                       this.x + width - 5,
                       this.y + 20);
            g.setFont("6x8");
            g.setColor(0, 0, 0);
            g.drawString(til + "",
                         this.x+width/2 + 1,
                         this.y+14);
        }
        else {
            g.setColor(0, 255, 0);
            g.drawImage(icon, this.x, this.y);
        }
    }

    WIDGETS.pillTimer={
        area:"tl",
        width: width,
        draw:draw
    };
})();
