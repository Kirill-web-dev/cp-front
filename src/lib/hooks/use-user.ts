"use client";

import { useState, useEffect, useCallback } from "react";
import { userApi } from "../api/user.api";
import type { User } from "../types";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await userApi.getMe();
      setUser(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refresh: fetchUser };
};
