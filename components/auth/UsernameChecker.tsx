"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";

interface Props {
  value: string;
}

export default function UsernameChecker({ value }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(() =>
    value && value.length >= 3 ? "loading" : "idle"
  );
  const [message, setMessage] = useState(() =>
    value && value.length >= 3 ? "" : ""
  );

  useEffect(() => {
    if (!value || value.length < 3) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setStatus("loading");
        const res = await axios.get(`/api/check-username`, {
          params: { username: value },
        });

        if (res.status !== 200) {
          setStatus("error");
          setMessage(res.data.message);
        } else {
          setStatus("ok");
          setMessage("Username available");
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Error checking username"
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="text-sm mt-1">
      {status === "loading" && (
        <span className="flex items-center gap-1 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Checking...
        </span>
      )}
      {status === "ok" && <span className="text-green-600">{message}</span>}
      {status === "error" && <span className="text-red-600">{message}</span>}
    </div>
  );
}
