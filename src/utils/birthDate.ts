import { intervalToDuration } from 'date-fns';

const YEAR = 2001;
const MOUNTH = 7;
const DAY = 18;

export function getMyAge(): number {
  const currentDate = new Date();
  const birthDate = new Date(YEAR, MOUNTH, DAY);

  const { years } = intervalToDuration({
    start: birthDate,
    end: currentDate,
  });

  return years;
}
