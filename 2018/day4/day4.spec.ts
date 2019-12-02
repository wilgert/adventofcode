import {inputToRow, orderByDate, Row} from './day4';
import * as moment from 'moment';

describe('inputToRow', () => {
   it('converts a line of input to a row', ()=> {
        const line = '[1518-11-01 00:00] Guard #10 begins shift';

       let date = moment('1518-11-01T00:00:00.000');
       let expected = {date: date, text: 'Guard #10 begins shift'};
       expect(inputToRow(line).text).toEqual(expected.text);
       expect(inputToRow(line).date.isSame(expected.date));
   });
});

describe('orderByDate', () => {
   it('orders by Date without modifying input', () =>{
      const input: Row[] = [
          {date: moment().add(2, 'hours'), text: 'last'},
          {date: moment(), text: 'first'},
          {date: moment().add(5, 'minutes'), text: 'middle'}
      ];
      expect(orderByDate(input).map(i => i.text)).toEqual(['first','middle', 'last']);
      expect(input.map(i => i.text)).toEqual(['last','first', 'middle']);
   });
});

describe('shifstToGuards', () => {
    it('transforms shifts to guards', () => {

    });
});