import { toast } from "react-toastify";

const toasts = {
  successMsg: (msg) => {
    toast.success(msg);
  },
  errorMsg: (msg) => {
    toast.error(msg);
  },
};

export default toasts;
