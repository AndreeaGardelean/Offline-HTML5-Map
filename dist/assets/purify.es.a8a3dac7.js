/*! @license DOMPurify 2.4.9 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.4.9/LICENSE */function I(r){return I=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},I(r)}function ke(r,n){return ke=Object.setPrototypeOf||function(s,c){return s.__proto__=c,s},ke(r,n)}function Ht(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function oe(r,n,o){return Ht()?oe=Reflect.construct:oe=function(c,g,y){var N=[null];N.push.apply(N,g);var x=Function.bind.apply(c,N),$=new x;return y&&ke($,y.prototype),$},oe.apply(null,arguments)}function L(r){return zt(r)||Gt(r)||Wt(r)||Bt()}function zt(r){if(Array.isArray(r))return Pe(r)}function Gt(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function Wt(r,n){if(!!r){if(typeof r=="string")return Pe(r,n);var o=Object.prototype.toString.call(r).slice(8,-1);if(o==="Object"&&r.constructor&&(o=r.constructor.name),o==="Map"||o==="Set")return Array.from(r);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return Pe(r,n)}}function Pe(r,n){(n==null||n>r.length)&&(n=r.length);for(var o=0,s=new Array(n);o<n;o++)s[o]=r[o];return s}function Bt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var $t=Object.hasOwnProperty,lt=Object.setPrototypeOf,jt=Object.isFrozen,Yt=Object.getPrototypeOf,Vt=Object.getOwnPropertyDescriptor,E=Object.freeze,S=Object.seal,Xt=Object.create,dt=typeof Reflect<"u"&&Reflect,se=dt.apply,Fe=dt.construct;se||(se=function(n,o,s){return n.apply(o,s)});E||(E=function(n){return n});S||(S=function(n){return n});Fe||(Fe=function(n,o){return oe(n,L(o))});var qt=b(Array.prototype.forEach),st=b(Array.prototype.pop),X=b(Array.prototype.push),le=b(String.prototype.toLowerCase),Me=b(String.prototype.toString),ut=b(String.prototype.match),R=b(String.prototype.replace),Kt=b(String.prototype.indexOf),Zt=b(String.prototype.trim),h=b(RegExp.prototype.test),De=Jt(TypeError);function b(r){return function(n){for(var o=arguments.length,s=new Array(o>1?o-1:0),c=1;c<o;c++)s[c-1]=arguments[c];return se(r,n,s)}}function Jt(r){return function(){for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return Fe(r,o)}}function l(r,n,o){var s;o=(s=o)!==null&&s!==void 0?s:le,lt&&lt(r,null);for(var c=n.length;c--;){var g=n[c];if(typeof g=="string"){var y=o(g);y!==g&&(jt(n)||(n[c]=y),g=y)}r[g]=!0}return r}function F(r){var n=Xt(null),o;for(o in r)se($t,r,[o])===!0&&(n[o]=r[o]);return n}function ne(r,n){for(;r!==null;){var o=Vt(r,n);if(o){if(o.get)return b(o.get);if(typeof o.value=="function")return b(o.value)}r=Yt(r)}function s(c){return console.warn("fallback value for",c),null}return s}var ft=E(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),we=E(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ce=E(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Qt=E(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ie=E(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),er=E(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ct=E(["#text"]),mt=E(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),xe=E(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),pt=E(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ie=E(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),tr=S(/\{\{[\w\W]*|[\w\W]*\}\}/gm),rr=S(/<%[\w\W]*|[\w\W]*%>/gm),ar=S(/\${[\w\W]*}/gm),nr=S(/^data-[\-\w.\u00B7-\uFFFF]/),ir=S(/^aria-[\-\w]+$/),or=S(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),lr=S(/^(?:\w+script|data):/i),sr=S(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ur=S(/^html$/i),fr=S(/^[a-z][.\w]*(-[.\w]+)+$/i),cr=function(){return typeof window>"u"?null:window},mr=function(n,o){if(I(n)!=="object"||typeof n.createPolicy!="function")return null;var s=null,c="data-tt-policy-suffix";o.currentScript&&o.currentScript.hasAttribute(c)&&(s=o.currentScript.getAttribute(c));var g="dompurify"+(s?"#"+s:"");try{return n.createPolicy(g,{createHTML:function(N){return N},createScriptURL:function(N){return N}})}catch{return console.warn("TrustedTypes policy "+g+" could not be created."),null}};function Tt(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:cr(),n=function(e){return Tt(e)};if(n.version="2.4.9",n.removed=[],!r||!r.document||r.document.nodeType!==9)return n.isSupported=!1,n;var o=r.document,s=r.document,c=r.DocumentFragment,g=r.HTMLTemplateElement,y=r.Node,N=r.Element,x=r.NodeFilter,$=r.NamedNodeMap,vt=$===void 0?r.NamedNodeMap||r.MozNamedAttrMap:$,_t=r.HTMLFormElement,ht=r.DOMParser,q=r.trustedTypes,K=N.prototype,Et=ne(K,"cloneNode"),At=ne(K,"nextSibling"),yt=ne(K,"childNodes"),ue=ne(K,"parentNode");if(typeof g=="function"){var fe=s.createElement("template");fe.content&&fe.content.ownerDocument&&(s=fe.content.ownerDocument)}var O=mr(q,o),ce=O?O.createHTML(""):"",Z=s,me=Z.implementation,gt=Z.createNodeIterator,St=Z.createDocumentFragment,bt=Z.getElementsByTagName,Ot=o.importNode,Ue={};try{Ue=F(s).documentMode?s.documentMode:{}}catch{}var M={};n.isSupported=typeof ue=="function"&&me&&me.createHTMLDocument!==void 0&&Ue!==9;var pe=tr,de=rr,Te=ar,Rt=nr,Lt=ir,Nt=lr,He=sr,Mt=fr,ve=or,m=null,ze=l({},[].concat(L(ft),L(we),L(Ce),L(Ie),L(ct))),p=null,Ge=l({},[].concat(L(mt),L(xe),L(pt),L(ie))),f=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),j=null,_e=null,We=!0,he=!0,Be=!1,$e=!0,U=!1,k=!1,Ee=!1,Ae=!1,H=!1,J=!1,Q=!1,je=!0,Ye=!1,Dt="user-content-",ye=!0,Y=!1,z={},G=null,Ve=l({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Xe=null,qe=l({},["audio","video","img","source","image","track"]),ge=null,Ke=l({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ee="http://www.w3.org/1998/Math/MathML",te="http://www.w3.org/2000/svg",w="http://www.w3.org/1999/xhtml",W=w,Se=!1,be=null,wt=l({},[ee,te,w],Me),P,Ct=["application/xhtml+xml","text/html"],It="text/html",d,B=null,xt=s.createElement("form"),Ze=function(e){return e instanceof RegExp||e instanceof Function},Oe=function(e){B&&B===e||((!e||I(e)!=="object")&&(e={}),e=F(e),P=Ct.indexOf(e.PARSER_MEDIA_TYPE)===-1?P=It:P=e.PARSER_MEDIA_TYPE,d=P==="application/xhtml+xml"?Me:le,m="ALLOWED_TAGS"in e?l({},e.ALLOWED_TAGS,d):ze,p="ALLOWED_ATTR"in e?l({},e.ALLOWED_ATTR,d):Ge,be="ALLOWED_NAMESPACES"in e?l({},e.ALLOWED_NAMESPACES,Me):wt,ge="ADD_URI_SAFE_ATTR"in e?l(F(Ke),e.ADD_URI_SAFE_ATTR,d):Ke,Xe="ADD_DATA_URI_TAGS"in e?l(F(qe),e.ADD_DATA_URI_TAGS,d):qe,G="FORBID_CONTENTS"in e?l({},e.FORBID_CONTENTS,d):Ve,j="FORBID_TAGS"in e?l({},e.FORBID_TAGS,d):{},_e="FORBID_ATTR"in e?l({},e.FORBID_ATTR,d):{},z="USE_PROFILES"in e?e.USE_PROFILES:!1,We=e.ALLOW_ARIA_ATTR!==!1,he=e.ALLOW_DATA_ATTR!==!1,Be=e.ALLOW_UNKNOWN_PROTOCOLS||!1,$e=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,U=e.SAFE_FOR_TEMPLATES||!1,k=e.WHOLE_DOCUMENT||!1,H=e.RETURN_DOM||!1,J=e.RETURN_DOM_FRAGMENT||!1,Q=e.RETURN_TRUSTED_TYPE||!1,Ae=e.FORCE_BODY||!1,je=e.SANITIZE_DOM!==!1,Ye=e.SANITIZE_NAMED_PROPS||!1,ye=e.KEEP_CONTENT!==!1,Y=e.IN_PLACE||!1,ve=e.ALLOWED_URI_REGEXP||ve,W=e.NAMESPACE||w,f=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&Ze(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(f.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Ze(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(f.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(f.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),U&&(he=!1),J&&(H=!0),z&&(m=l({},L(ct)),p=[],z.html===!0&&(l(m,ft),l(p,mt)),z.svg===!0&&(l(m,we),l(p,xe),l(p,ie)),z.svgFilters===!0&&(l(m,Ce),l(p,xe),l(p,ie)),z.mathMl===!0&&(l(m,Ie),l(p,pt),l(p,ie))),e.ADD_TAGS&&(m===ze&&(m=F(m)),l(m,e.ADD_TAGS,d)),e.ADD_ATTR&&(p===Ge&&(p=F(p)),l(p,e.ADD_ATTR,d)),e.ADD_URI_SAFE_ATTR&&l(ge,e.ADD_URI_SAFE_ATTR,d),e.FORBID_CONTENTS&&(G===Ve&&(G=F(G)),l(G,e.FORBID_CONTENTS,d)),ye&&(m["#text"]=!0),k&&l(m,["html","head","body"]),m.table&&(l(m,["tbody"]),delete j.tbody),E&&E(e),B=e)},Je=l({},["mi","mo","mn","ms","mtext"]),Qe=l({},["foreignobject","desc","title","annotation-xml"]),kt=l({},["title","style","font","a","script"]),re=l({},we);l(re,Ce),l(re,Qt);var Re=l({},Ie);l(Re,er);var Pt=function(e){var t=ue(e);(!t||!t.tagName)&&(t={namespaceURI:W,tagName:"template"});var a=le(e.tagName),u=le(t.tagName);return be[e.namespaceURI]?e.namespaceURI===te?t.namespaceURI===w?a==="svg":t.namespaceURI===ee?a==="svg"&&(u==="annotation-xml"||Je[u]):Boolean(re[a]):e.namespaceURI===ee?t.namespaceURI===w?a==="math":t.namespaceURI===te?a==="math"&&Qe[u]:Boolean(Re[a]):e.namespaceURI===w?t.namespaceURI===te&&!Qe[u]||t.namespaceURI===ee&&!Je[u]?!1:!Re[a]&&(kt[a]||!re[a]):!!(P==="application/xhtml+xml"&&be[e.namespaceURI]):!1},D=function(e){X(n.removed,{element:e});try{e.parentNode.removeChild(e)}catch{try{e.outerHTML=ce}catch{e.remove()}}},Le=function(e,t){try{X(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch{X(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!p[e])if(H||J)try{D(t)}catch{}else try{t.setAttribute(e,"")}catch{}},et=function(e){var t,a;if(Ae)e="<remove></remove>"+e;else{var u=ut(e,/^[\r\n\t ]+/);a=u&&u[0]}P==="application/xhtml+xml"&&W===w&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var A=O?O.createHTML(e):e;if(W===w)try{t=new ht().parseFromString(A,P)}catch{}if(!t||!t.documentElement){t=me.createDocument(W,"template",null);try{t.documentElement.innerHTML=Se?ce:A}catch{}}var _=t.body||t.documentElement;return e&&a&&_.insertBefore(s.createTextNode(a),_.childNodes[0]||null),W===w?bt.call(t,k?"html":"body")[0]:k?t.documentElement:_},tt=function(e){return gt.call(e.ownerDocument||e,e,x.SHOW_ELEMENT|x.SHOW_COMMENT|x.SHOW_TEXT|x.SHOW_PROCESSING_INSTRUCTION|x.SHOW_CDATA_SECTION,null,!1)},Ft=function(e){return e instanceof _t&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof vt)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},V=function(e){return I(y)==="object"?e instanceof y:e&&I(e)==="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"},C=function(e,t,a){!M[e]||qt(M[e],function(u){u.call(n,t,a,B)})},rt=function(e){var t;if(C("beforeSanitizeElements",e,null),Ft(e)||h(/[\u0080-\uFFFF]/,e.nodeName))return D(e),!0;var a=d(e.nodeName);if(C("uponSanitizeElement",e,{tagName:a,allowedTags:m}),e.hasChildNodes()&&!V(e.firstElementChild)&&(!V(e.content)||!V(e.content.firstElementChild))&&h(/<[/\w]/g,e.innerHTML)&&h(/<[/\w]/g,e.textContent)||a==="select"&&h(/<template/i,e.innerHTML)||e.nodeType===7)return D(e),!0;if(!m[a]||j[a]){if(!j[a]&&nt(a)&&(f.tagNameCheck instanceof RegExp&&h(f.tagNameCheck,a)||f.tagNameCheck instanceof Function&&f.tagNameCheck(a)))return!1;if(ye&&!G[a]){var u=ue(e)||e.parentNode,A=yt(e)||e.childNodes;if(A&&u)for(var _=A.length,v=_-1;v>=0;--v)u.insertBefore(Et(A[v],!0),At(e))}return D(e),!0}return e instanceof N&&!Pt(e)||(a==="noscript"||a==="noembed"||a==="noframes")&&h(/<\/no(script|embed|frames)/i,e.innerHTML)?(D(e),!0):(U&&e.nodeType===3&&(t=e.textContent,t=R(t,pe," "),t=R(t,de," "),t=R(t,Te," "),e.textContent!==t&&(X(n.removed,{element:e.cloneNode()}),e.textContent=t)),C("afterSanitizeElements",e,null),!1)},at=function(e,t,a){if(je&&(t==="id"||t==="name")&&(a in s||a in xt))return!1;if(!(he&&!_e[t]&&h(Rt,t))){if(!(We&&h(Lt,t))){if(!p[t]||_e[t]){if(!(nt(e)&&(f.tagNameCheck instanceof RegExp&&h(f.tagNameCheck,e)||f.tagNameCheck instanceof Function&&f.tagNameCheck(e))&&(f.attributeNameCheck instanceof RegExp&&h(f.attributeNameCheck,t)||f.attributeNameCheck instanceof Function&&f.attributeNameCheck(t))||t==="is"&&f.allowCustomizedBuiltInElements&&(f.tagNameCheck instanceof RegExp&&h(f.tagNameCheck,a)||f.tagNameCheck instanceof Function&&f.tagNameCheck(a))))return!1}else if(!ge[t]){if(!h(ve,R(a,He,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&Kt(a,"data:")===0&&Xe[e])){if(!(Be&&!h(Nt,R(a,He,"")))){if(a)return!1}}}}}}return!0},nt=function(e){return e!=="annotation-xml"&&ut(e,Mt)},it=function(e){var t,a,u,A;C("beforeSanitizeAttributes",e,null);var _=e.attributes;if(!!_){var v={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:p};for(A=_.length;A--;){t=_[A];var ae=t,T=ae.name,Ne=ae.namespaceURI;if(a=T==="value"?t.value:Zt(t.value),u=d(T),v.attrName=u,v.attrValue=a,v.keepAttr=!0,v.forceKeepAttr=void 0,C("uponSanitizeAttribute",e,v),a=v.attrValue,!v.forceKeepAttr&&(Le(T,e),!!v.keepAttr)){if(!$e&&h(/\/>/i,a)){Le(T,e);continue}U&&(a=R(a,pe," "),a=R(a,de," "),a=R(a,Te," "));var ot=d(e.nodeName);if(!!at(ot,u,a)){if(Ye&&(u==="id"||u==="name")&&(Le(T,e),a=Dt+a),O&&I(q)==="object"&&typeof q.getAttributeType=="function"&&!Ne)switch(q.getAttributeType(ot,u)){case"TrustedHTML":{a=O.createHTML(a);break}case"TrustedScriptURL":{a=O.createScriptURL(a);break}}try{Ne?e.setAttributeNS(Ne,T,a):e.setAttribute(T,a),st(n.removed)}catch{}}}}C("afterSanitizeAttributes",e,null)}},Ut=function i(e){var t,a=tt(e);for(C("beforeSanitizeShadowDOM",e,null);t=a.nextNode();)C("uponSanitizeShadowNode",t,null),!rt(t)&&(t.content instanceof c&&i(t.content),it(t));C("afterSanitizeShadowDOM",e,null)};return n.sanitize=function(i){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t,a,u,A,_;if(Se=!i,Se&&(i="<!-->"),typeof i!="string"&&!V(i))if(typeof i.toString=="function"){if(i=i.toString(),typeof i!="string")throw De("dirty is not a string, aborting")}else throw De("toString is not a function");if(!n.isSupported){if(I(r.toStaticHTML)==="object"||typeof r.toStaticHTML=="function"){if(typeof i=="string")return r.toStaticHTML(i);if(V(i))return r.toStaticHTML(i.outerHTML)}return i}if(Ee||Oe(e),n.removed=[],typeof i=="string"&&(Y=!1),Y){if(i.nodeName){var v=d(i.nodeName);if(!m[v]||j[v])throw De("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof y)t=et("<!---->"),a=t.ownerDocument.importNode(i,!0),a.nodeType===1&&a.nodeName==="BODY"||a.nodeName==="HTML"?t=a:t.appendChild(a);else{if(!H&&!U&&!k&&i.indexOf("<")===-1)return O&&Q?O.createHTML(i):i;if(t=et(i),!t)return H?null:Q?ce:""}t&&Ae&&D(t.firstChild);for(var ae=tt(Y?i:t);u=ae.nextNode();)u.nodeType===3&&u===A||rt(u)||(u.content instanceof c&&Ut(u.content),it(u),A=u);if(A=null,Y)return i;if(H){if(J)for(_=St.call(t.ownerDocument);t.firstChild;)_.appendChild(t.firstChild);else _=t;return(p.shadowroot||p.shadowrootmod)&&(_=Ot.call(o,_,!0)),_}var T=k?t.outerHTML:t.innerHTML;return k&&m["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&h(ur,t.ownerDocument.doctype.name)&&(T="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+T),U&&(T=R(T,pe," "),T=R(T,de," "),T=R(T,Te," ")),O&&Q?O.createHTML(T):T},n.setConfig=function(i){Oe(i),Ee=!0},n.clearConfig=function(){B=null,Ee=!1},n.isValidAttribute=function(i,e,t){B||Oe({});var a=d(i),u=d(e);return at(a,u,t)},n.addHook=function(i,e){typeof e=="function"&&(M[i]=M[i]||[],X(M[i],e))},n.removeHook=function(i){if(M[i])return st(M[i])},n.removeHooks=function(i){M[i]&&(M[i]=[])},n.removeAllHooks=function(){M={}},n}var dr=Tt();export{dr as default};
