export const getErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return "Something went wrong";
};


export const getTimeRange = () => {
  const now = new Date();
  const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  // const firstDayOfWeek = new Date(now.setDate(1));

  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  // lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 14);
  return {
    timeMin: firstDayOfWeek.toISOString(),
    timeMax: lastDayOfWeek.toISOString(),
  };
};

export const getTimeRangeForPastMeetings = () => {
  const currentTime = new Date();
  const halfHourAgo = new Date(currentTime.getTime() - 30 * 60000);
  return {
    timeMin: halfHourAgo.toISOString(),
    timeMax: currentTime.toISOString(),
  };
}