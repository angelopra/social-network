import { Pipe, PipeTransform } from '@angular/core';
import { format, isThisWeek, isToday, isYesterday } from 'date-fns';

@Pipe({
  name: 'chatDate'
})
export class ChatDatePipe implements PipeTransform {
  transform(value: Date): string {
    if (isToday(value)) {
      return 'Today';
    }
    if (isYesterday(value)) {
      return 'Yesterday';
    }
    if (isThisWeek(value)) {
      return format(value, 'EEEE');
    }
    return format(value, 'PP');
  }
}
