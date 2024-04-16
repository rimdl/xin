export const formatDate = (date:Date, formatString:string) =>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return formatString.replace(/yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s/g, (match:string) => {
        switch (match) {
            case 'yyyy':
                return year;
            case 'yy':
                return year.toString().slice(-2);
            case 'MM':
                return month;
            case 'M':
                return month - 1;
            case 'dd':
            case 'd':
                return day;
            case 'HH':
            case 'H':
                return hours;
            case 'mm':
            case 'm':
                return minutes;
            case 'ss':
            case 's':
                return seconds;
        }
    });
}