import { messages } from '../constants/contents';

interface FormatPluralParams {
  number: number;
  word?: string;
  suffix?: string;
  pluralWord?: string;
}

export const removeData = (
  collection: any[] = [],
  value: any,
  key: string = 'id'
) => {
  const collectionValue = [...collection];
  for (let index = 0; index < collectionValue.length; index++) {
    if (collectionValue[index]?.[key] === value) {
      collectionValue.splice(index, 1);
      break;
    }
  }
  return collectionValue;
};

export const getDurationBetweenTwoDates = (startDate: any, endDate: any) => {
  const firstDate = new Date(startDate);
  const secondDate = new Date(endDate);
  const duration = Math.round(
    (secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return duration;
};

export const formatPlural = ({
  number,
  word = '',
  suffix = 's',
  pluralWord,
}: FormatPluralParams): string => {
  return number > 1
    ? `${number} ${pluralWord || `${word}${suffix}`}`
    : `${number} ${word}`;
};

export const getErrorMessage = (error: any) => {
  const status = error?.status;
  if (status === 400) return messages?.INVALID_REQUEST;
  if (status === 500) return messages?.SOMETHING_WENT_WRONG;
  if (status === 404) return messages?.DETAILS_NOT_FOUND;
  return messages?.UNABLE_TO_CONNECT_SERVER;
};
