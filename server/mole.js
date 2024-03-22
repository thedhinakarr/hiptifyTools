var _ = Object.defineProperty;
var d = (s,e,t)=>e in s ? _(s, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : s[e] = t;
var a = (s,e,t)=>(d(s, typeof e != "symbol" ? e + "" : e, t),
t);
import {I as p, C as m, V as f} from "./vendor-d0dae234.js";
import {g as u} from "./general-cd96613b.js";
import {n as c} from "./_plugin-vue2_normalizer-2bbd088e.js";
import {d as v} from "./dates-0b3edec0.js";
const C = p({
    __name: "HeaderComp",
    setup(s) {
        return {
            __sfc: !0,
            getSoSUrl: u
        }
    }
});
var h = function() {
    var e = this
      , t = e._self._c
      , o = e._self._setupProxy;
    return t("div", {
        staticClass: "header m-lg text-center"
    }, [t("a", {
        attrs: {
            href: "/login"
        }
    }, [t("img", {
        staticClass: "logo",
        attrs: {
            src: o.getSoSUrl() + "/images/soslogo.gif",
            alt: "logo"
        }
    })])])
}
  , y = []
  , g = c(C, h, y, !1, null, "9ea3632e", null, null);
const x = g.exports;
var w = Object.defineProperty
  , P = Object.getOwnPropertyDescriptor
  , b = (s,e,t,o)=>{
    for (var n = o > 1 ? void 0 : o ? P(e, t) : e, i = s.length - 1, r; i >= 0; i--)
        (r = s[i]) && (n = (o ? r(e, t, n) : r(n)) || n);
    return o && n && w(e, t, n),
    n
}
;
let l = class extends f {
    constructor() {
        super(...arguments);
        a(this, "dateLocal", v);
        a(this, "connectionGrants", []);
        a(this, "myLimit", 1);
        a(this, "licensesToPurchase", 0);
        a(this, "myIpAddress", "");
        a(this, "error", "");
        a(this, "waiting", !1)
    }
    get licenseUpgradeUrl() {
        return `/connection-limited/upgrade?count=${this.licensesToPurchase}`
    }
    mounted() {
        this.$refs.errorBox && this.$refs.errorBox.scrollIntoView()
    }
    created() {
        const t = document.getElementById("connection-limit-data")
          , o = JSON.parse(t.value);
        this.connectionGrants = o.currentGrants,
        this.myLimit = o.maximumIpConnections || 1,
        this.myIpAddress = o.currentIpAddress,
        this.error = o.error,
        t.remove()
    }
}
;
l = b([m({
    components: {
        HeaderComp: x
    }
})], l);
var I = function() {
    var e = this
      , t = e._self._c;
    return e._self._setupProxy,
    t("div", {
        staticClass: "container"
    }, [t("HeaderComp"), t("div", {
        staticClass: "panel panel-default"
    }, [t("div", {
        staticClass: "row"
    }, [t("div", {
        staticClass: "col-md-12 col-sm-12"
    }, [t("div", {
        staticClass: "panel-body text-center"
    }, [t("p", [e._v(" The connection limit of " + e._s(e.myLimit) + " logged in user(s) at a time for this account has been reached. ")]), t("p", [e._v(" This account has " + e._s(e.myLimit) + " license(s). Each license is allowed one active connection to Shows On Sale at any time. ")]), e._m(0), t("p", [t("strong", [e._v("Your IP Address Is: " + e._s(e.myIpAddress))])])])])]), t("div", {
        staticClass: "row"
    }, [t("div", {
        staticClass: "row"
    }, [t("div", {
        staticClass: "col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10"
    }, [t("div", {
        staticClass: "panel panel-default"
    }, [e._m(1), t("div", {
        staticClass: "panel-body"
    }, [t("p", [e._v(" As a current Shows On Sale member you are pre-approved for your own account. Please fill out an application and your account will be set up right away. ")]), t("a", {
        staticClass: "btn btn-primary",
        attrs: {
            href: "/clr",
            disabled: e.waiting
        }
    }, [e._v("Fill out an Application")])])])])]), e._m(2), t("div", {
        staticClass: "row"
    }, [t("div", {
        staticClass: "col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10"
    }, [t("div", {
        staticClass: "panel panel-default"
    }, [e._m(3), t("div", {
        staticClass: "panel-body"
    }, e._l(e.connectionGrants, function(o) {
        return t("div", {
            key: o.identifier
        }, [t("p", [t("strong", [e._v("Name:")]), e._v(" " + e._s(o.connectionName))]), t("p", [t("strong", [e._v("IP Address:")]), e._v(" " + e._s(o.ipAddress))]), t("p", [e._v("Last Seen at: " + e._s(e.dateLocal(o.updated)) + " (local time)")]), t("form", {
            attrs: {
                method: "POST"
            }
        }, [t("input", {
            attrs: {
                type: "hidden",
                name: "identifier"
            },
            domProps: {
                value: o.identifier
            }
        }), t("input", {
            staticClass: "btn btn-primary",
            attrs: {
                disabled: e.waiting,
                type: "submit",
                value: "Terminate This Connection"
            }
        })]), t("hr")])
    }), 0)])])])])])], 1)
}
  , O = [function() {
    var s = this
      , e = s._self._c;
    return s._self._setupProxy,
    e("p", [s._v(" Please choose from one of the following options below or "), e("a", {
        staticClass: "bold",
        attrs: {
            href: "/login"
        }
    }, [s._v("return to the login page")]), s._v(". ")])
}
, function() {
    var s = this
      , e = s._self._c;
    return s._self._setupProxy,
    e("div", {
        staticClass: "panel-heading"
    }, [e("div", {
        staticClass: "panel-title"
    }, [s._v(" Option 1: Register for a New Account ")])])
}
, function() {
    var s = this
      , e = s._self._c;
    return s._self._setupProxy,
    e("div", {
        staticClass: "row"
    }, [e("div", {
        staticClass: "col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10"
    }, [e("div", {
        staticClass: "panel panel-default"
    }, [e("div", {
        staticClass: "panel-heading"
    }, [e("div", {
        staticClass: "panel-title"
    }, [s._v(" OPTION 2: PURCHASE ADDITIONAL LICENSES ")])]), e("div", {
        staticClass: "panel-body"
    }, [e("p", [s._v(" To purchase additional license, please contact us at, "), e("a", {
        attrs: {
            href: "mailto:support@showsonsale.com"
        }
    }, [s._v("support@showsonsale.com")]), s._v(" and we will be happy to promptly assist you. ")])])])])])
}
, function() {
    var s = this
      , e = s._self._c;
    return s._self._setupProxy,
    e("div", {
        staticClass: "panel-heading"
    }, [e("div", {
        staticClass: "panel-title"
    }, [s._v(" OPTION 3: TERMINATE ANOTHER CONNECTION ")])])
}
]
  , A = c(l, I, O, !1, null, null, null, null);
const H = A.exports;
export {H as default};
