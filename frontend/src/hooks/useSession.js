import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/session.js";

export const useCreateSession = () => {
  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: (data) => sessionApi.createSession(data),
    onSuccess: () => toast.success("Session created successfully"),
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to create room"),
  });
};

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: () => sessionApi.getActiveSessions(),
  });
  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: () => sessionApi.getMyRecentSessions(),
  });
  return result;
};

export const useSessionById = (id) => {
  const result = useQuery({
    queryKey: ["sessionById", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000, // Refetch every 5 seconds to get real-time updates .
  });
  return result;
};

export const useJoinSession = (id) => {
  const result = useMutation({
    mutationKey: ["joinMutation"],
    mutationFn: () => sessionApi.joinSession(id),
    onSuccess: () => toast.success("joined session successfully"),
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to join session");
    },
  });
  return result;
};

export const useEndSession = () => {
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: () => sessionApi.endSession(),
    onSuccess: () => toast.success("Your session hs been ended!"),
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to end session"),
  });
  return result;
};
