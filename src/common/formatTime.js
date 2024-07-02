 export const formatTime = (timestamp) => {
    const dateTime = new Date(timestamp);
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    let period = 'AM';

    // Convert 24-hour time to 12-hour format and determine AM or PM
    if (hours >= 12) {
        period = 'PM';
        hours = hours === 12 ? 12 : hours - 12; // Convert 12 to 12 PM, otherwise subtract 12 for PM
    } else {
        hours = hours === 0 ? 12 : hours; // Convert 0 to 12 AM
    }

    // Pad hours with leading zero if necessary
    hours = hours.toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes} ${period}`;
    return formattedTime;
};

export const formatDate = (timestamp) => {
    const now = new Date();
    const dateTime = new Date(timestamp);
    const diffMilliseconds = now - dateTime;
    const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        return 'Today';
    } else {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateTime.toLocaleDateString('en-US', options);
    }
};