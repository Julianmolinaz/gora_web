/**
 * Minified by jsDelivr using Terser v5.10.0.
 * Original file: /npm/vue-demi@0.12.5/lib/index.iife.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var VueDemi=function(e,i,o){if(e.install)return e;if(i)if("2."===i.version.slice(0,2))if(o){for(var n in o)e[n]=o[n];e.isVue2=!0,e.isVue3=!1,e.install=function(){},e.Vue=i,e.Vue2=i,e.version=i.version}else console.error("[vue-demi] no VueCompositionAPI instance found, please be sure to import `@vue/composition-api` before `vue-demi`.");else if("3."===i.version.slice(0,2)){for(var n in i)e[n]=i[n];e.isVue2=!1,e.isVue3=!0,e.install=function(){},e.Vue=i,e.Vue2=void 0,e.version=i.version,e.set=function(e,i,o){return Array.isArray(e)?(e.length=Math.max(e.length,i),e.splice(i,1,o),o):(e[i]=o,o)},e.del=function(e,i){Array.isArray(e)?e.splice(i,1):delete e[i]}}else console.error("[vue-demi] Vue version "+i.version+" is unsupported.");else console.error("[vue-demi] no Vue instance found, please be sure to import `vue` before `vue-demi`.");return e}(this.VueDemi=this.VueDemi||(void 0!==VueDemi?VueDemi:{}),this.Vue||("undefined"!=typeof Vue?Vue:void 0),this.VueCompositionAPI||("undefined"!=typeof VueCompositionAPI?VueCompositionAPI:void 0));

