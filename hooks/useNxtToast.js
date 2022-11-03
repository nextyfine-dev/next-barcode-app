import { useRef } from "react";
import { useToast } from "native-base";
import "react-native-get-random-values";
import { v4 } from "uuid";

export default function useNxtToast() {
  const toast = useToast();
  const toastIdRef = useRef();

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  function showToast(type, message) {
    close();
    toastIdRef.current = v4();
    toast.show({
      title: message,
      id: toastIdRef.current,
      type,
      background:
        type === "success"
          ? "green.400"
          : type === "warning"
          ? "yellow.400"
          : "red.400",
    });
  }

  return [showToast];
}
