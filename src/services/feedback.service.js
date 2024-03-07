import { apiUrl } from "../utils/constants";
import { GET, POST } from "./api.service.wrapper";

export const saveFeedback = async (feedback) => {
  const response = await POST(`${apiUrl.feedback}`, feedback);
  return response;
};

export const getFeedbacksByQuery = async (params) => {
  const response = await GET(`${apiUrl.feedback}`, params);
  return response;
};

export const validateMeetingFeedback = async (meeting) => {
  const response = await POST(`${apiUrl.feedback}/validate`, meeting);
  return response;
};
