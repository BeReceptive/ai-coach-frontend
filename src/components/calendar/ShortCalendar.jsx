import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import "./calandar.scss";
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isSameDay, isSameMonth, isToday, parseISO, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { useState } from "react";


const days = [
  { date: "2021-12-27" },
  { date: "2021-12-28" },
  { date: "2021-12-29" },
  { date: "2021-12-30" },
  { date: "2021-12-31" },
  { date: "2022-01-01", isCurrentMonth: true },
  { date: "2022-01-02", isCurrentMonth: true },
  { date: "2022-01-03", isCurrentMonth: true },
  { date: "2022-01-04", isCurrentMonth: true },
  { date: "2022-01-05", isCurrentMonth: true },
  { date: "2022-01-06", isCurrentMonth: true },
  { date: "2022-01-07", isCurrentMonth: true },
  { date: "2022-01-08", isCurrentMonth: true },
  { date: "2022-01-09", isCurrentMonth: true },
  { date: "2022-01-10", isCurrentMonth: true },
  { date: "2022-01-11", isCurrentMonth: true },
  { date: "2022-01-12", isCurrentMonth: true, isToday: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true },
  { date: "2022-01-21", isCurrentMonth: true },
  { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-23", isCurrentMonth: true },
  { date: "2022-01-24", isCurrentMonth: true },
  { date: "2022-01-25", isCurrentMonth: true },
  { date: "2022-01-26", isCurrentMonth: true },
  { date: "2022-01-27", isCurrentMonth: true },
  { date: "2022-01-28", isCurrentMonth: true },
  { date: "2022-01-29", isCurrentMonth: true },
  { date: "2022-01-30", isCurrentMonth: true },
  { date: "2022-01-31", isCurrentMonth: true },
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShortCalendar() {
  const today = startOfDay(new Date());
  const [selectedDay, setSelectedDay] = useState(today);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();


  const newDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(today)),
    end: endOfWeek(endOfMonth(today)),
  });
  
  return (
    <div className={"short-calendar-card rounded-2xl"}>
      <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
        <div className="flex items-center text-gray-900">
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-auto text-sm font-semibold">{format(today, 'MMM yyyy')}</div>
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {newDays.map((day, dayIdx) => (
            <button
              key={day?.toString()}
              onClick={() => setSelectedDay(day)}
              type="button"
              className={classNames(
                "py-1.5 hover:bg-gray-100 focus:z-10",
                isSameMonth(day, today) ? "bg-white" : "bg-gray-50",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                isEqual(day, selectedDay) && "text-indigo-800",
                !isEqual(day, selectedDay) &&
                  isSameMonth(day, today) &&
                  !isToday(day) &&
                  "text-gray-900",
                !isEqual(day, selectedDay) &&
                  !isSameMonth(day, today) &&
                  !isToday(day) &&
                  "text-gray-400",
                isToday(day) && !isEqual(day, selectedDay) && "text-indigo-600",
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 6 && "rounded-tr-lg",
                dayIdx === newDays.length - 7 && "rounded-bl-lg",
                dayIdx === newDays.length - 1 && "rounded-br-lg"
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={classNames(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  isEqual(day, selectedDay) && isToday(day) && "bg-custom-blue-600",
                  isEqual(day, selectedDay) && !isToday(day) && "bg-custom-blue"
                )}
              >
                {format(day, "d")}
              </time>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
