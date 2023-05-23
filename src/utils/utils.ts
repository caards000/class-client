import {FormikHelpers} from "formik";
import toast from "react-hot-toast";

class Utils {
  public handleRequestError(err: any, helpers?: FormikHelpers<any>) {
    helpers && helpers.setSubmitting(false);
    if (err.response?.data.data) {
      helpers && helpers.setErrors(err.response.data.data)
      toast.error(err.response.data.message)
    } else if (err.response?.data?.message) {
      toast.error(err.response.data.message)
    } else {
      toast.error(err.message)
    }
  }
}

const utils = new Utils();
export default utils;