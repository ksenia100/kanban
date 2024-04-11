export const timeAgo = (input: Date | string): string => {
    const date = input instanceof Date ? input : new Date(input);

    const formatter = new Intl.RelativeTimeFormat('en');

    const timeRanges = [
        { unit: 'years', value: 3600 * 24 * 365 },
        { unit: 'months', value: 3600 * 24 * 30 },
        { unit: 'weeks', value: 3600 * 24 * 7 },
        { unit: 'days', value: 3600 * 24 },
        { unit: 'hours', value: 3600 },
        { unit: 'minutes', value: 60 },
        { unit: 'seconds', value: 1 },
    ];

    const secondsElapsed = (Date.now() - date.getTime()) / 1000;

    const { unit, value } = timeRanges.find(({ value }) => Math.abs(secondsElapsed) >= value) || {};

    if (unit && value) {
        const delta = secondsElapsed / value;
        return formatter.format(Math.round(delta), unit as Intl.RelativeTimeFormatUnit);
    }
    return '';
}