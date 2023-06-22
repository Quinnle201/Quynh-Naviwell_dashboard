export function calculateBMI(height, weight) {
    const mHeight = convertToCm(height) / 100
    const kgWeight = weight * 0.45359237
    const bmi = kgWeight / Math.pow(mHeight, 2)
    return bmi.toFixed(2)
}

export function convertToCm(inchInput) {
    var rex = /^(\d+)'(\d+)(?:''|")$/;
    var match = rex.exec(inchInput);
    var feet, inch;

    if (match) {
        feet = parseInt(match[1], 10);
        inch = parseInt(match[2], 10);
    } else {
        return NaN
    }
    const cmConvert = ((feet * 12) + inch) * 2.54;
    return cmConvert;
}

export function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();    
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours %= 12;
    hours = hours || 12;    
    minutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const strTime = `${hours}:${minutes} ${ampm}`;
  
    return strTime;
  };