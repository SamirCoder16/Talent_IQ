import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/session.js";
import { useAuth } from "@clerk/clerk-react";

export const useCreateSession = () => {
  const { getToken, isSignedIn } = useAuth();
  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: async (data) => {
      if (!isSignedIn) throw new Error("Please sign in to create a session");
      const token = await getToken();
      return sessionApi.createSession(data, token);
    },
    onSuccess: () => toast.success("Session created successfully"),
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to create room"),
  });
};

export const useActiveSessions = () => {
  const { getToken, isSignedIn } = useAuth();
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: async () => {
      const token = await getToken();
      return sessionApi.getActiveSessions(token);
    },
    enabled: isSignedIn,
  });
  return result;
};

export const useMyRecentSessions = () => {
  const { getToken, isSignedIn } = useAuth();
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: async () => {
      const token = await getToken();
      return sessionApi.getMyRecentSessions(token);
    },
    enabled: isSignedIn,
  });
  return result;
};

export const useSessionById = (id) => {
  const { getToken, isSignedIn } = useAuth();
  const result = useQuery({
    queryKey: ["sessionById", id],
    queryFn: async () => {
      const token = await getToken();
      return sessionApi.getSessionById(id, token);
    },
    enabled: !!id && isSignedIn,
    refetchInterval: 5000, // Refetch every 5 seconds to get real-time updates .
  });
  return result;
};

export const useJoinSession = () => {
  const { getToken, isSignedIn } = useAuth();
  const result = useMutation({
    mutationKey: ["joinMutation"],
    mutationFn: async (id) => {
      if (!isSignedIn) throw new Error("Please sign in to join sessions");
      const token = await getToken();
      return sessionApi.joinSession(id, token);
    },
    onSuccess: () => toast.success("joined session successfully"),
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to join session");
    },
  });
  return result;
};

export const useEndSession = () => {
  const { getToken, isSignedIn } = useAuth();
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: async (id) => {
      if (!isSignedIn) throw new Error("Please sign in to end sessions");
      const token = await getToken();
      return sessionApi.endSession(id, token);
    },
    onSuccess: () => toast.success("Your session hs been ended!"),
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to end session"),
  });
  return result;
};
