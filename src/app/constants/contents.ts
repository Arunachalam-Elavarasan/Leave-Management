import { routePath } from './route';

export const APP_BAR_MENU = [
  {
    name: 'Home',
    navigateTo: routePath?.HOME,
  },
  {
    name: 'Leave Details',
    navigateTo: routePath?.LEAVE_LIST,
  },
  {
    name: 'Plan',
    subMenu: [
      {
        name: 'Day',
        navigateTo: routePath?.DAY_PLAN,
      },
      {
        name: 'Week',
        navigateTo: routePath?.WEEK_PLAN,
      },
    ],
  },
];

export const messages = {
  UNABLE_TO_CONNECT_SERVER:
    'Unable to connect to the server. Please try again later.',
  SOMETHING_WENT_WRONG: 'Something Went Wrong',
  DETAILS_NOT_FOUND: 'Details Record Not Found',
  INVALID_REQUEST: 'Invalid Request Try Again',
};
