// RGBA color based on AQI level
const getAQIColor = (aqi) => {
    if (aqi <= 50) {
        return AQI_LEVELS[0].color; // Green
    } else if (aqi <= 100) {
        return AQI_LEVELS[1].color; // Yellow
    } else if (aqi <= 150) {
        return AQI_LEVELS[2].color; // Orange
    } else if (aqi <= 200) {
        return AQI_LEVELS[3].color; // Red
    } else if (aqi <= 300) {
        return AQI_LEVELS[4].color; // Purple
    } else {
        return AQI_LEVELS[5].color; // Maroon
    }
};

const AQI_LEVELS = [
    { label: 'Good', color: 'rgba(0, 255, 0, 0.5)', aqiRange: '0-50' },
    { label: 'Moderate', color: 'rgba(255, 255, 0, 0.5)', aqiRange: '51-100' },
    { label: 'Sensitive', color: 'rgba(255, 126, 0, 0.5)', aqiRange: '101-150' },
    { label: 'Unhealthy', color: 'rgba(255, 0, 0, 0.5)', aqiRange: '151-200' },
    { label: 'Very Unhealthy', color: 'rgba(143, 63, 151, 0.5)', aqiRange: '201-300' },
    { label: 'Hazardous', color: 'rgba(126, 0, 35, 0.5)', aqiRange: '301+' },
];

export { getAQIColor, AQI_LEVELS };