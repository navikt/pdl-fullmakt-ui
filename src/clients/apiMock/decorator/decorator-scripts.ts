/*tslint:disable*/
const decoratorScripts =
  '<script>var navno = navno || {};navno.loginUrl = "https://tjenester-t4.nav.no/esso/UI/Login?goto=https://tjenester-t4.nav.no/dittnav&service=level4Service";navno.logoutUrl = "https://tjenester-t4.nav.no/esso/logout";navno.authServiceUrl = "https://tjenester-t4.nav.no/innloggingslinje/auth";</script><script src="https://appres-t4.nav.no/_public/appressurser/built-appres-v4/js/innloggingslinjen.min.js?_ts=1602c309e80"></script><script type="text/javascript">var dataLayer = [{    fgkode: navno.fgkode,    ytelse: navno.ytelse}];(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"%26l="+l:"";j.async=true;j.src="//www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-PM9RP3");</script>';

export default decoratorScripts;
