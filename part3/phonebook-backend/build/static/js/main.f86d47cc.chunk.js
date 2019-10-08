(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},20:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(13),r=n(2),u=n(0),c=n.n(u),o=n(14),l=n.n(o),i=(n(20),function(e){return c.a.createElement("div",null,c.a.createElement("form",{onSubmit:e.formSubmitHandler},c.a.createElement("div",null,"Name: ",c.a.createElement("input",{value:e.name,onChange:e.nameChangeHandler})),c.a.createElement("div",null,"Number:"," ",c.a.createElement("input",{value:e.number,onChange:e.numberChangeHandler})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"add"))))}),s=function(e){var t;return c.a.createElement("div",null,(t=e.filter,e.persons.filter((function(e){return e.name.includes(t)})).map((function(t){return c.a.createElement("p",{key:t.name},t.name," ",t.number," ",c.a.createElement("button",{onClick:function(){return e.contactDeleteHandler(t.id)}},"delete"))}))))},m=function(e){return c.a.createElement("div",null,c.a.createElement("div",null,"Search contacts:"," ",c.a.createElement("input",{value:e.filter,onChange:e.filterChangeHandler})))},f=n(3),d=n.n(f),p="/api/persons",b=function(){return d.a.get(p).then((function(e){return e.data}))},h=function(e){return d.a.post(p,e).then((function(e){return e.data}))},g=function(e,t){return d.a.put("".concat(p,"/").concat(e),t).then((function(e){return e.data}))},y=function(e){return d.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var t=e.message,n=e.type;return null===t?null:c.a.createElement("div",{className:n},t)};function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}l.a.render(c.a.createElement((function(){var e=Object(u.useState)([]),t=Object(r.a)(e,2),n=t[0],o=t[1],l=Object(u.useState)(""),f=Object(r.a)(l,2),d=f[0],p=f[1],O=Object(u.useState)(""),j=Object(r.a)(O,2),w=j[0],C=j[1],k=Object(u.useState)(""),S=Object(r.a)(k,2),H=S[0],P=S[1],T=Object(u.useState)({message:null,type:null}),D=Object(r.a)(T,2),N=D[0],A=D[1];Object(u.useEffect)((function(){b().then((function(e){return o(e)})).catch((function(e){A({message:"Could not retrieve contacts. Please try again later.",type:"error"}),setTimeout((function(){A({message:null,type:null})}),2e3)}))}),[]);return c.a.createElement("div",null,c.a.createElement("h2",null,"Phonebook"),null!=N.message?c.a.createElement(v,{message:N.message,type:N.type}):null,c.a.createElement(m,{filter:H,filterChangeHandler:function(e){P(e.target.value)}}),c.a.createElement("h2",null,"Add New Contact"),c.a.createElement(i,{name:d,nameChangeHandler:function(e){p(e.target.value)},number:w,numberChangeHandler:function(e){C(e.target.value)},formSubmitHandler:function(e){if(e.preventDefault(),n.filter((function(e){return e.name===d})).length>0)if(n.filter((function(e){return e.number!==w})).length>0){if(window.confirm("".concat(d," is already added to phonebook. Would you like to change their contact number to ").concat(w))){var t=n.find((function(e){return e.name===d})),r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(n,!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t,{number:w});g(t.id,r).then((function(e){A({message:"Note '".concat(d,"' has been updated."),type:"success"}),setTimeout((function(){A({message:null,type:null})}),2e3),o(n.map((function(t){return t.name!==d?t:e}))),p(""),C("")})).catch((function(e){A({message:"This contact could not be updated. It may have been removed.",type:"error"}),setTimeout((function(){A({message:null,type:null})}),2e3)}))}}else window.alert("".concat(d," is already added to phonebook."));else h({name:d,number:w}).then((function(e){A({message:"".concat(d," has been added to phonebook."),type:"success"}),setTimeout((function(){A({message:null,type:null})}),2e3),o(n.concat(e)),p(""),C("")})).catch((function(e){A({message:e.response.data.error,type:"error"}),setTimeout((function(){A({message:null,type:null})}),2e3)}))}}),c.a.createElement("h2",null,"Numbers"),c.a.createElement(s,{persons:n,filter:H,contactDeleteHandler:function(e){window.confirm("Are you sure you wish to remove this contact?")&&y(e).then((function(){A({message:"Contact has been removed.",type:"success"}),setTimeout((function(){A({message:null,type:null})}),2e3),o(n.filter((function(t){return t.id!==e})))})).catch((function(e){A({message:"This contact could not be deleted",type:"error"}),setTimeout((function(){A({message:null,type:null})}),2e3)}))}}))}),null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.f86d47cc.chunk.js.map