
export function ping() {
    return 'pong';
}

export function shouldAutoOpen() {
    let autoOpenOptions = ['schedule-service.html?$']

    for (var x in autoOpenOptions) {
        if (new RegExp(autoOpenOptions[x]).test(window.location.href)) {
            return true;
        }
    }
    return false;
}