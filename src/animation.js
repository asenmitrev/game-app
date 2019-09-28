
export function flyToPos(element, start, end, duration) {
    // var start = element.scrollLeft,
    //     change = to - start,
    //     currentTime = 0,
    //     increment = 20;
    var startX = start.x,
        toX = end.x,
        changeX = toX - startX,
        startY = start.y,
        toY = end.y,
        changeY = toY - startY,
        currentTime = 0,
        increment = 20;
    element.style.display = 'block';

    var animateScroll = function () {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, startX, changeX, duration);
        element.style.left = `${val}px`;
        var val2 = Math.easeInOutQuad(currentTime, startY, changeY, duration);
        element.style.top = `${val2}px`;
        // console.log(val, currentTime, startX, change)
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        } else {
            setTimeout(() => {
                element.style.display = 'none';
            }, 300);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};
