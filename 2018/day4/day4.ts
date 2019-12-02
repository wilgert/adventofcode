import {readFile} from '../../common/readFile';
import * as path from 'path';
import * as moment from 'moment';

const input = readFile(path.join(__dirname, 'input.txt')).split('\n');

export interface Row {
    date: moment.Moment;
    text: string;
}

interface StartOfShiftRow extends Row {
    guard: number;
}

interface EventRow extends Row {
    asleep: number;
}


class Shift {
    events: Map<number, string> = new Map<number, string>();
    private _summary: {minutes: boolean[], total: number};
    constructor(public guard: number) {}

    get summary() {
        if(this._summary===undefined){
            const entries = [...this.events.entries()];
            const {minutes, total} = entries.reduce(this.reducer, {previousMinute: 0, minutes: Array(60), total: 0});
            this._summary = {minutes, total};
        }
        return this._summary;
    }

    private reducer(acc, [minute, event]) {
        if(event === 'wakes'){
            acc.total += minute - acc.previousMinute;

            acc.minutes.fill(true, acc.previousMinute, minute);
        }

        acc.previousMinute = minute;

        return acc;
    }
}

export function inputToRow(input: string): Row {
    const [, dateString, text] = /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})] (.*)/.exec(input);

    return {date: moment(dateString, 'YYYY-MM-DD HH:mm').add(1, 'hour'), text };
}

export function orderByDate(rows: Row[]) {
    return [...rows].sort((a, b)=>{
        return a.date.isBefore(b.date) ? -1 : 1;
    });
}

const rows = orderByDate(input.map(inputToRow));

const shifts: Map<string, Shift> = rows.reduce((map, row) => {
    let key = row.date.format('YYYY-MM-DD');

    let shift = map.get(key);
    if(shift) {
        const matches = /(falls|wakes).*/g.exec(row.text);
        const event = !!matches && matches[1];
        shift.events.set(row.date.minutes(), event);
    }else{
        const matches = /.*#(\d{1,5}).*/.exec(row.text) || [];
        if(matches.length > 1 ) {
            let guardId = parseInt(matches[1],10);
            shift = new Shift(guardId);
        }
    }

    map.set(key, shift);
    return map;
}, new Map<string, Shift>());


const shiftsPerGuardMap: Map<number, Shift[]> = [...shifts.values()].reduce(
    (map: Map<number, Shift[]>, shift) => {
        const guard = shift.guard;

        const current = map.get(guard) || [];
        map.set(guard, [...current, shift]);

        return map;
    },   new Map<number, Shift[]>());

const shiftsPerGuard = [...shiftsPerGuardMap.entries()]
    .map(([guardId, shifts]) => ({guardId: guardId, shifts, totalMinutesAsleep: shifts.reduce((total, shift) => total + shift.summary.total, 0)}));

const winnerAsleep = Math.max.apply(Math, shiftsPerGuard.map((guard) => guard.totalMinutesAsleep ));
const winner = shiftsPerGuard.find((guard) => guard.totalMinutesAsleep === winnerAsleep);

const winnerMinutes = winner.shifts.reduce((acc, value) => {
    for(let i = 0; i < 60; i++){
        acc[i] += value.summary.minutes[i] ? 1 : 0;
    }
    return acc;
}, [...Array(60).fill(0)]);
const mostAsleep = Math.max.apply(Math, winnerMinutes);

winnerMinutes.findIndex((v) => v==mostAsleep) * winner.guardId;

const guardsWithMinutes = shiftsPerGuard.map(guard => ({
    ...guard,
    minutes: guard.shifts.reduce((acc, value) => {
            for(let i = 0; i < 60; i++){
                acc[i] += value.summary.minutes[i] ? 1 : 0;
            }
            return acc;
        }, [...Array(60).fill(0)])
})).map((guard)=>({...guard, mostAsleepMinuteCount: Math.max.apply(Math, guard.minutes)}))
    .map((guard) => ({...guard, mostAsleepMinute: guard.minutes.findIndex(m => m == guard.mostAsleepMinuteCount)}));

const mostAsleepMinuteCount = Math.max.apply(Math, guardsWithMinutes.map(g => g.mostAsleepMinuteCount));
const guard = guardsWithMinutes.find((g) => g.mostAsleepMinuteCount == mostAsleepMinuteCount ); /* ? */
guard.guardId * guard.mostAsleepMinute; /* ? */
