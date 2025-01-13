import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { CalendarViewComponent } from '../../../../../components/shared/calendar-view/calendar-view.component';
import { ShareDataService } from '../../../../../services/shareDate/share-data.service';
import { getBetweenDates } from '../../../../../utils/date';
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
      console.log(index);
      acc[item?.userId] = {
        ...(acc?.[item?.userId] || {
          userName: item?.userName,
          barColor: COLOR_PALETTE[index],
        }),
      };
      const dates = getBetweenDates(
        new Date(item?.startDate),
        new Date(item?.endDate)
      );

      dates?.map((date: Date) => {
        acc[item?.userId][date?.toString()] = true;
      });
      return acc;
    }, {});
  }
}
