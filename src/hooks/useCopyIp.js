import { useRef, useState } from "react";
import { config } from "../config";

/**
 * Handles the "Copy IP" button + the transient confirmation alert,
 * mirroring the original initCopyIp() in script.js.
 */
export function useCopyIp() {
  const [message, setMessage] = useState("IP was successfully copied!");
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const timeoutRef = useRef(null);

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(config.serverInfo.serverIp);
      setMessage("IP was successfully copied!");
      setError(false);
    } catch {
      setMessage("An error has occurred!");
      setError(true);
    }
    setActive(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(false);
      setError(false);
    }, 5000);
  };

  return { copyIp, message, active, error };
}
