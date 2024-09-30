// switch to
// npm install dateformat
// https://www.npmjs.com/package/dateformat

// minimal implementation like
// https://github.com/taylorhakes/fecha

import { pad } from "./number.mjs";

const token = /d{1,2}|M{1,3}|YY(?:YY)?|S{1,3}|([HhMsDm])\1?'/g;

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatFlags = {
  D: (dateObj) => String(dateObj.getDate()),
  DD: (dateObj) => pad(dateObj.getDate()),
  d: (dateObj) => String(dateObj.getDay()),
  dd: (dateObj) => pad(dateObj.getDay()),
  M: (dateObj) => String(dateObj.getMonth() + 1),
  MM: (dateObj) => pad(dateObj.getMonth() + 1),
  MMM: (dateObj) => monthNames[dateObj.getMonth()],
  YY: (dateObj) => pad(String(dateObj.getFullYear()), 4).substr(2),
  YYYY: (dateObj) => pad(dateObj.getFullYear(), 4),
  h: (dateObj) => String(dateObj.getHours() % 12 || 12),
  hh: (dateObj) => pad(dateObj.getHours() % 12 || 12),
  H: (dateObj) => String(dateObj.getHours()),
  HH: (dateObj) => pad(dateObj.getHours()),
  m: (dateObj) => String(dateObj.getMinutes()),
  mm: (dateObj) => pad(dateObj.getMinutes()),
  s: (dateObj) => String(dateObj.getSeconds()),
  ss: (dateObj) => pad(dateObj.getSeconds()),
  S: (dateObj) => String(Math.round(dateObj.getMilliseconds() / 100)),
  SS: (dateObj) => pad(Math.round(dateObj.getMilliseconds() / 10), 2),
  SSS: (dateObj) => pad(dateObj.getMilliseconds(), 3),
};

/***
 * Format a date
 * @method format
 * @param {Date|number} dateObj
 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
 * @returns {string} Formatted date string
 */
export const format = (dateObj, mask) => {
  if (typeof dateObj === "number") {
    dateObj = new Date(dateObj);
  }
  if (
    Object.prototype.toString.call(dateObj) !== "[object Date]" ||
    isNaN(dateObj.getTime())
  ) {
    throw new Error("Invalid Date pass to format");
  }

  // Apply formatting rules
  return mask.replace(token, ($0) => formatFlags[$0](dateObj));
};
