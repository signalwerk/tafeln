export const pad = (val, len = 2) => {
  val = String(val);
  while (val.length < len) {
    val = "0" + val;
  }
  return val;
};
