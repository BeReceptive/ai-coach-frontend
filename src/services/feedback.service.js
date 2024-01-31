import { apiUrl } from "../utils/constants";
import { GET, POST } from "./api.service.wrapper";

export const saveFeedback = async (feedback) => {
  const response = await POST(`${apiUrl.feedback}`, feedback);
  return response;
};

export const getFeedbacksByMeetingId = async (meetingId) => {
  const response = await GET(`${apiUrl.feedback}?meetingId=${meetingId}`);
  return response;
};
