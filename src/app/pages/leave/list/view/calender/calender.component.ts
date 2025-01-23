import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { CalendarViewComponent } from '../../../../../components/shared/calendar-view/calendar-view.component';
import { ShareDataService } from '../../../../../services/shareDate/share-data.service';
import { getBetweenDates, getPreviousDate } from '../../../../../utils/date';
import { COLOR_PALETTE } from '../../../../../constants/common';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, MatGridListModule, CalendarViewComponent],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
})
export class CalenderComponent {
  shared = inject(ShareDataService);

  leaveDetails = {};

  ngOnInit(): void {
    const data = this.shared.getData();

    this.leaveDetails = data?.reduce((acc: any, item: any, index: number) => {
      const dates = getBetweenDates(
        new Date(item?.startDate),
        new Date(item?.endDate)
      );

      dates?.map((date: Date) => {
        if (!acc[date?.toDateString()]) acc[date?.toDateString()] = {};

        const previousDate = getPreviousDate(date, 1)?.toDateString();
        const preRecord = acc[previousDate];

        acc[date?.toDateString()][item?.userId] = {
          start: 0,
          end: 100,
          barColor: COLOR_PALETTE[index],
          highPriority: !!preRecord?.[item?.userId]?.position?.toString(),
          position: preRecord?.[item?.userId]?.position?.toString()
            ? preRecord?.[item?.userId]?.position
            : Object.keys(acc[date?.toDateString()])?.length,
          ...item,
        };
      });
      return acc;
    }, {});
  }
}
