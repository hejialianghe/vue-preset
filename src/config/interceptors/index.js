import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc
} from "./axios";
import { routerBeforeEachFunc } from "./router";

let interceptors = {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc,
  routerBeforeEachFunc
};

export default interceptors;
