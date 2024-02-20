export const getErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return "Something went wrong";
};


export const getTimeRange = () => {
  const now = new Date();
  // const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const firstDayOfWeek = new Date(now.setDate(1));

  const lastDayOfWeek = new Date(firstDayOfWeek);
  // lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 14);
  return {
    timeMin: firstDayOfWeek.toISOString(),
    timeMax: lastDayOfWeek.toISOString(),
  };
};

export const getTimeRangeForPastMeetings = () => {
  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate.getTime() - 27 * 24 * 60 * 60 * 1000);
  const threeHoursAgo = new Date(currentDate.getTime() - 1 * 60 * 60 * 1000);
  return {
    timeMin: oneWeekAgo.toISOString(),
    timeMax: threeHoursAgo.toISOString(),
  };
}