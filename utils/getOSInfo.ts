export const getOSInfo = () => {
    let osInfo = ""
    const userAgent = navigator.userAgent;

    if (userAgent.match(/Windows NT/)) {
        osInfo = 'Windows';
    } else if (userAgent.match(/Mac OS X/)) {
        osInfo = 'Mac OS';
    } else if (userAgent.match(/Linux/)) {
        osInfo = 'Linux';
    } else if (userAgent.match(/iPhone|iPad|iPod/)) {
        osInfo = 'iOS';
    } else if (userAgent.match(/Android/)) {
        osInfo = 'Android';
    } else {
        osInfo = 'Unknown OS';
    }
    return osInfo;
};