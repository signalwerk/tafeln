// switch to
// npm install dateformat
// https://www.npmjs.com/package/dateformat

// minimal implementation like
// https://github.com/taylorhakes/fecha

// Import the pad function, which pads numbers with leading zeros
import { pad } from "./number.mjs";

/**
 * Regular expression to match formatting tokens in the mask.
 * Tokens include:
 * - D, DD: Day of the month
 * - d, dd: Day of the week
 * - M, MM, MMM: Month
 * - YY, YYYY: Year
 * - h, hh: Hours (12-hour format)
 * - H, HH: Hours (24-hour format)
 * - m, mm: Minutes
 * - s, ss: Seconds
 * - S, SS, SSS: Milliseconds
 */
const token = /d{1,2}|M{1,3}|YY(?:YY)?|S{1,3}|([HhMsDm])\1?'/g;

// Array of abbreviated month names
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

/**
 * An object containing formatting functions for each token.
 * Each function takes a Date object and returns a formatted string.
 */
const formatFlags = {
  D: (dateObj) => String(dateObj.getDate()),
  DD: (dateObj) => pad(dateObj.getDate(), 2),
  d: (dateObj) => String(dateObj.getDay()),
  dd: (dateObj) => pad(dateObj.getDay(), 2),
  M: (dateObj) => String(dateObj.getMonth() + 1),
  MM: (dateObj) => pad(dateObj.getMonth() + 1, 2),
  MMM: (dateObj) => monthNames[dateObj.getMonth()],
  YY: (dateObj) => String(dateObj.getFullYear()).slice(-2),
  YYYY: (dateObj) => pad(dateObj.getFullYear(), 4),
  h: (dateObj) => String(dateObj.getHours() % 12 || 12),
  hh: (dateObj) => pad(dateObj.getHours() % 12 || 12, 2),
  H: (dateObj) => String(dateObj.getHours()),
  HH: (dateObj) => pad(dateObj.getHours(), 2),
  m: (dateObj) => String(dateObj.getMinutes()),
  mm: (dateObj) => pad(dateObj.getMinutes(), 2),
  s: (dateObj) => String(dateObj.getSeconds()),
  ss: (dateObj) => pad(dateObj.getSeconds(), 2),
  S: (dateObj) => String(Math.floor(dateObj.getMilliseconds() / 100)),
  SS: (dateObj) => pad(Math.floor(dateObj.getMilliseconds() / 10), 2),
  SSS: (dateObj) => pad(dateObj.getMilliseconds(), 3),
};

/**
 * Formats a Date object into a string based on the provided mask.
 * @param {Date|number} dateObj - The Date object or timestamp to format.
 * @param {string} mask - The format mask (e.g., 'MM-DD-YYYY').
 * @returns {string} The formatted date string.
 * @throws {Error} If the provided date is invalid.
 */
export const format = (dateObj, mask) => {
  // Convert timestamp to Date object if necessary
  if (typeof dateObj === "number") {
    dateObj = new Date(dateObj);
  }
  // Check if dateObj is a valid Date object
  if (
    Object.prototype.toString.call(dateObj) !== "[object Date]" ||
    isNaN(dateObj.getTime())
  ) {
    throw new Error("Invalid Date passed to format");
  }
  // Replace tokens in the mask with formatted values
  return mask.replace(token, (match) => {
    if (formatFlags[match]) {
      return formatFlags[match](dateObj);
    }
    return match;
  });
};
