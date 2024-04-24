export function convertTo12HourFormat(timeString: any) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const time = new Date(0, 0, 0, hours, minutes);
    return time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
}