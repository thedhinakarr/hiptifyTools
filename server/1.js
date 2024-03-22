import { _ as t } from "./chunk/preload-helper-a2192bf4.js";
import { V as o } from "./chunk/vendor-d0dae234.js";
import { S as e } from "./chunk/timezone-64c1bf29.js";

const i = () => t(() => import("./chunk/ConnectionLimitComponent-4cd9a4b0.js"), [], import.meta.url);
o.config.productionTip = !1;
document.getElementById("connection-limit-component") !== null && new o({ render: n => n(i) }).$mount("#connection-limit-component");
e();