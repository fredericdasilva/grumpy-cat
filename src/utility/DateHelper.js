export const displayCurrentTime = () => {
  const date = new Date();
  const current_time =
    addZeroBefore(date.getHours()) +
    ":" +
    addZeroBefore(date.getMinutes()) +
    ":" +
    addZeroBefore(date.getSeconds());
  return current_time;
};

function addZeroBefore(n) {
  return (n < 10 ? "0" : "") + n;
}
