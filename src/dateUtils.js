import moment from "moment-timezone";

export const getDayDateFor = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
};

export const getDateWithHour = (date, hour, minutes = 0) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes)
};

export const convertToCET = (date) => {
    return moment.tz({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes()
    }, "Europe/Warsaw").toDate()
};