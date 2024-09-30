
// // Day of the month
testFormat("Day of the month", new Date(2014, 2, 5), "D", "5");
testFormat("Day of the month padded", new Date(2014, 2, 5), "DD", "05");

// Day of the week
testFormat("Day of the week short", new Date(2015, 0, 8), "d", "4");
testFormat("Day of the week long", new Date(2015, 0, 10), "dd", "06");
testFormat("Day of the week short name", new Date(2014, 2, 5), "ddd", "Wed");
testFormat(
  "Day of the week long name",
  new Date(2014, 2, 5),
  "dddd",
  "Wednesday"
);

// Month
testFormat("Month", new Date(2014, 2, 5), "M", "3");
testFormat("Month padded", new Date(2014, 2, 5), "MM", "03");
testFormat("Month short name", new Date(2014, 2, 5), "MMM", "Mar");
testFormat("Month full name mmmm", new Date(2014, 2, 5), "MMMM", "March");

// Year
testFormat("Year short", new Date(2001, 2, 5), "YY", "01");
testFormat("Year long", new Date(2001, 2, 5), "YYYY", "2001");

// Hour
testFormat("Hour 12 hour short", new Date(2001, 2, 5, 6), "h", "6");
testFormat("Hour 12 hour padded", new Date(2001, 2, 5, 6), "hh", "06");
testFormat("Hour 12 hour short 2", new Date(2001, 2, 5, 14), "h", "2");
testFormat("Hour 12 hour short noon", new Date(2001, 2, 5, 12), "h", "12");
testFormat("Hour 12 hour short midnight", new Date(2001, 2, 5, 0), "h", "12");
testFormat("Hour 12 hour padded 2", new Date(2001, 2, 5, 14), "hh", "02");
testFormat("Hour 12 hour padded noon", new Date(2001, 2, 5, 12), "hh", "12");
testFormat("Hour 12 hour padded midnight", new Date(2001, 2, 5, 0), "hh", "12");
testFormat("Hour 24 hour short", new Date(2001, 2, 5, 13), "H", "13");
testFormat("Hour 24 hour padded", new Date(2001, 2, 5, 13), "HH", "13");
testFormat("Hour 24 hour short", new Date(2001, 2, 5, 3), "H", "3");
testFormat("Hour 24 hour padded", new Date(2001, 2, 5, 3), "HH", "03");

// Minute
testFormat("Minutes short", new Date(2001, 2, 5, 6, 7), "m", "7");
testFormat("Minutes padded", new Date(2001, 2, 5, 6, 7), "mm", "07");

// Seconds
testFormat("Seconds short", new Date(2001, 2, 5, 6, 7, 2), "s", "2");
testFormat("Seconds padded", new Date(2001, 2, 5, 6, 7, 2), "ss", "02");

// Milliseconds
testFormat("milliseconds short", new Date(2001, 2, 5, 6, 7, 2, 500), "S", "5");
testFormat("milliseconds short 2", new Date(2001, 2, 5, 6, 7, 2, 2), "S", "0");
testFormat(
  "milliseconds medium",
  new Date(2001, 2, 5, 6, 7, 2, 300),
  "SS",
  "30"
);
testFormat(
  "milliseconds medium 2",
  new Date(2001, 2, 5, 6, 7, 2, 10),
  "SS",
  "01"
);
testFormat("milliseconds long", new Date(2001, 2, 5, 6, 7, 2, 5), "SSS", "005");

// AM PM
testFormat("ampm am", new Date(2001, 2, 5, 3, 7, 2, 5), "a", "am");
testFormat("ampm pm", new Date(2001, 2, 5, 15, 7, 2, 5), "a", "pm");
testFormat("ampm AM", new Date(2001, 2, 5, 3, 7, 2, 5), "A", "AM");
testFormat("ampm PM", new Date(2001, 2, 5, 16, 7, 2, 5), "A", "PM");