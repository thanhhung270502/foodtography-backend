import { Logger } from '@nestjs/common';

export const getStartTime = (time: string) => {
    const thisTime = new Date(time);

    if (thisTime.getDay() === 0) {
        thisTime.setDate(thisTime.getDate() - 6);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 1) return time;
    else if (thisTime.getDay() === 2) {
        thisTime.setDate(thisTime.getDate() - 1);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 3) {
        thisTime.setDate(thisTime.getDate() - 2);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 4) {
        thisTime.setDate(thisTime.getDate() - 3);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 5) {
        thisTime.setDate(thisTime.getDate() - 4);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 6) {
        thisTime.setDate(thisTime.getDate() - 5);
        return thisTime.toISOString();
    }
};

export const getEndTime = (time: string) => {
    const thisTime = new Date(time);

    if (thisTime.getDay() === 0) {
        return time;
    } else if (thisTime.getDay() === 1) {
        thisTime.setDate(thisTime.getDate() + 6);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 2) {
        thisTime.setDate(thisTime.getDate() + 5);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 3) {
        thisTime.setDate(thisTime.getDate() + 4);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 4) {
        thisTime.setDate(thisTime.getDate() + 3);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 5) {
        thisTime.setDate(thisTime.getDate() + 2);
        return thisTime.toISOString();
    } else if (thisTime.getDay() === 6) {
        thisTime.setDate(thisTime.getDate() + 1);
        return thisTime.toISOString();
    }
};

export const getRandomRange: (start: number, end: number) => number = (start: number, end: number) => {
    return Math.floor(Math.random() * (end - start + 1) + start);
};

export const delay = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
