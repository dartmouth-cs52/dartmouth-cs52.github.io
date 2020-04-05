layout: true
class: center, middle
name: pic
background-size: contain

---
layout: true
class: center, top
name: fragment

.title[{{name}}]

---
layout: true
class: center, middle
name: base

.title[{{name}}]



---
name: blank page


???
* foo


---
name: dynamic typing

<div 
  class="codepen hidden" 
  data-prefill='{
    "stylesheets": ["//cs52.me/assets/css/codepen-mods.css"],
    "scripts": ["//cs52.me/assets/codepen-mods.js"]
  }'
  data-preview="true"
  data-height="400" 
  data-theme-id="24117"
  data-default-tab="js,result"
  data-user="timofei"
  data-editable="true"
>
<pre data-lang="babel">
var i;
// console.log(i, typeof(i));
i = 32;
// console.log(i, typeof(i));
i = 'foobar';
// console.log(i, typeof(i));
i = true; 
// console.log(i, typeof(i));
</pre>

</div>

* have type of the last thing assigned
* primitive types: `undefined`, `number`, `string`, `boolean`, `function`, `object`


???
* variables aren't assigned a type
* but values do have a type

