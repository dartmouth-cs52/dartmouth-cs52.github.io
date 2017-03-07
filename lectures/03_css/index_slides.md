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
name: CS52

CSS and workshops

???
* today:
  * guest
  * how did the git assignment go?
  * map map!
  * lots to go through before main attraction
    * first team workshop!
  * on the order of a million slides to get through



---
name: CSS — Cascading Style Sheets

* CSS v1 1996
* CSS v2 1998
* ...
* CSS v3 ~2014
* ...

???
we're a new era now boys and girls




---
name: Semantics vs. Style

* So far: html for structure
* Now CSS for STYLE

<br>
<iframe src="//giphy.com/embed/Oo4hdMO4Nw8Za" width="480" height="270" frameBorder="0" class="giphy-embed" ></iframe>


???
* defining structure but have not done anything with how they are displayed
* relied on the default display styles provided by the browser
* set the `h1` tag the font size increased
* What we were defining was a section of content that was intended to be a header of level 1.
* In Microsoft Word,  the default way to format the document is by setting typesetting directly.  You select something and change the font size, or make it bold.  The problem with this is that it unmaintainable in the long term.  Want to change all your headings?  Good luck — should have set up some styles.
* The idea behind markup is to help separate the meaning (or semantics) from the style. You specify the intended use of the content,  whether it is a header or a paragraph etc,  and then you define the look and feel of these blocks separately.





---
name: Enter CSS

.fancy.medium[![](http://i.giphy.com/5pxnxdzdZfXFK.gif)]

???
CSS will be friend and foe this term.  Certain things will be easy, certain things will feel impossible.  Try to vertically align something. We will conquer this though.





---
name: we will however

.fancy[![](img/css_mess.jpg)]


???
Ok, enough fun.






---
name: CSS Rules

* CSS is:
  * a list of rules specifying how elements should be displayed
  * each rule starts with selector
  * now your page structure comes in handy

???
* When you gave your page structure
  * you defined the elements that could be selected with CSS!



---
name: CSS Rules

.fancy.medium[![anatomy of css rule](img/anatomy_of_css_rule.jpg)]

???





---
name: Selectors!



A selector can target elements in different ways:

a tag name:

```css
p {
  color: blue;
}
```

a class:

```css
.classname {
  color: pink;
}
```

an id:

```css
#elementid {
  color: black;
}
```
???





---
name:

and combinations:

```css
p.someclass {...} /* element with class */

p.someclass a {...} /* element that is inside of element.class */

p .classy {...} /* any descendent of p that is .classy */

a, input, .classy {...} /* multiple selectors */
```

```html
<p class="someclass">
  stuff stuff <a href="#"> lets go </a> stuff stuff
  <span class="classy"> more stuff </span>
</p>
<input id="subscribe" ... />

```

???




---
name: Pseudo Classes

and any of the above plus special keywords such as `hover`, `link`, `visited`, `checked`, `empty`, `focus`, `not`, `nth-child` and lots more!

```css
p:hover { color: orange; }

a:link { color: blue;}

a:visited { color: purple;}

p:nth-child(2) {background: grey;}

div:not(p) {background: white;}

input[type=checkbox]:checked ~ #hiddenmenu {
  opacity: 1;
}
```


???
* these are super useful,  checkboxes can be used to record some state in CSS for instance
* plus things like :first-child, or :not
* ok that last one is cheating, more complicated even:
  * ~ is sibling selector, so it selects the second selector based on the first.
  * can someone explain what this does?




---
name: more on children and sibling selectors

```css
ul li {  } /* descendent */
ul > li {  } /* child */
#title + ul {  } /* adjacent sibling */
#title ~ ul {  }  /* general sibling */
```

```html
<article>
  <div id="title">Title</title>
  <ul id="list 1">
    <li>1</li>
    <li>2</li>
    <ol id="nested list">
      <li>nested 1</li>
    </ol>
  </ul>
  <ul id="list 2">
    <li>3</li>
  </ul>
<article>
```
???
* descendent would include any nested li's
* child would only include direct children, so say a nested `ol`'s children would be left untouched
* adjacent sibling, directly adjacent with no elemnts in between
* general sibling any matching as long as parent is same







---
name: Selectors and Colors

<p data-height="400" data-theme-id="24117" data-slug-hash="a54aae158ba02e5e4cfe33c089277603" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/a54aae158ba02e5e4cfe33c089277603/">a54aae158ba02e5e4cfe33c089277603</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???
Note: I cheated in the above example and included some magic for that font.




---
name: Colors

.fancy.medium[![](https://upload.wikimedia.org/wikipedia/commons/d/d6/RGB_color_cube.svg)]

* additive digital color:
  * <span style="color:red;">red</span>, <span style="color:green;">green</span>, and <span style="color:blue;">blue</span> color light
  * 1 byte per color intensity
  * unsigned integer value of 0-255

???
* (2^8 -1)
* in the above, when i added color to text what inline element did I use?



---
name: Colors

* Predefined names: <span style="color:pink;">pink</span>, <span style="color:orange;">orange</span>, <span style="color:lightblue;">lightblue</span>, <span style="color:darkgrey;">darkgrey</span>, etc.
* 8-bit hexadecimal: <span style="color:#cc0000">#cc0000</span>
* 0-255 decimal intensities: <span style="color:rgb(150,0,150)">rgb(150,0,150)</span>
* Percentage intensities: <span style="color:rgb(20%,80%,20%)">rgb(50%,50%,100%)</span>
  * with transparency:  <span style="color:rgba(255,100,100,.5)">rgba(255,100,100,.5)</span>

???
* which of these is most legible -- stick with one






---
name: CSS Game Time

CSS Selector Game — Play this to become a pro!
[http://flukeout.github.io/](http://flukeout.github.io/)

???







---
name: Fonts

* The [default "websafe" fonts](http://www.w3schools.com/css/css_font.asp) that browsers support are a bajillion years old
  * <span style="font-family: 'Times New Roman';">Times New Roman.</span>
  * <span style="font-family: 'Comic Sans MS';">Comic Sans.</span>
  * <span style="font-family: 'Courier New';">Courier New.</span>
  * a few others


???
* Please don't design your pages with any of the above, ever.
* some options like verdana are a bit better
* better options exist




---
name: Google Fonts


* [Google Fonts](https://www.google.com/fonts).
* Here's Open Sans (a lovely simple font):

```html
<!-- in <head> -->
<link href='https://fonts.googleapis.com/css?family=Open+Sans'
  rel='stylesheet' type='text/css' />
```

and in css:

```css
body {
  font-family: 'Open Sans', sans-serif;
}
```

To make it the default! 💗

???





---
name: Size Units Tangent

* many css properties take size/length values:
  * font-size, width, height, margin, padding
  * many units to choose from
  * absolute units
  * relative units

???




---
name: absolute units


* `px`: *device pixels (1/96th of 1in at 28inches viewing distance)* ✅
* `pt`: *points (1/72 of 1in)*
* `pc`: *pica (12 pt)*
* `in`: *inches (96px)*
* `cm`: *centimeters (37.8px)*
* `mm`: *pixel (3.78px)*



???
* actually pixels are a very interesting case
* stick to pixels



---
name: pixel math!

.fancy.small[![](img/pxangles.png)]

$px = 5376 \times \tan(\alpha)$

```css
#moon {
  width: 24.3px
  /* 5376  * (1079 miles radius of moon /
      238900 miles distance from earth) */
}
```

1 ref px = visual angle of 1px at a density of 96dpi at 28inches

more at [http://tinyurl.com/cssmath](http://tinyurl.com/cssmath)

???
* takeaway: 1css inch is what an inch would look like at 28inches away
* pixels are actually an angular measurement
* reference pixel be the visual angle of one pixel on a device with a pixel density of 96dpi and a distance from the reader of an arm's length. For a nominal arm's length of 28 inches, the visual angle is therefore about 0.0213 degrees.
* tan(α) = opp./adj.
* tan(α) = ((1/96) / 2) / 28
* tan(α) = (1/192) / 28
* tan(α) = 1/5376
* α = arctan(1/5376)
* 1 / arctan( ( ( 1/96 ) / 2 ) / 28)





---
name: Relative Units

* `em`:	*relative to the font-size of the current element*
* `rem`:	*relative to font-size of the root element*
* `ex`:	*relative to the width of character 'x' in the current font*
* `ch`: *relative to width of the character '0' in current font*
* `vw`:	*1% of the width of the viewport*
* `vh`:	*1% of the height of the viewport*
* `vmin`:	*1% of viewport's smaller dimension*
* `vmax`:	*1% of viewport's larger dimension*

1rem = 16px by default if unspecified

???




---
name: reasonable practice

![](img/layout.svg)

???
* body set pixels (16px is default em)





---
name:

<p data-height="500" data-theme-id="24117" data-slug-hash="6769175f096ccc51484b73c056c6bdb9" data-default-tab="result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/6769175f096ccc51484b73c056c6bdb9/">Em AND Rem</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???




---
name: Back to Fonts!

```css
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2'),
       url('myfont.woff') format('woff'),
       url('myfont.ttf') format('truetype');
}

p {
    font-family: "MyWebFont";
    font-style: normal; /* italic oblique */
    font-size: 14px;
    font-weight: bold; /* normal light */
    font-variant: small-caps;
}
```

???
* loading your own fonts in is possible
* but not recommended as it is more resource intensive
* and loading for a font provider gives you the most optimized compatible fonts for the browser
* and provide all the possible variants you need









---
name: CSS Inside

There are 3 ways to include CSS styles in your page.


```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS Loaded 3 Ways</title>

    <!-- Internal Style Sheet: MEDIOCRE -->
    <style type="text/css">
      h1 {
        color: purple;
      }
      body {
        background-color: orange;
      }
    </style>

    <!-- External Style Sheet: BEST -->
    <link rel="stylesheet" type="text/css" href="mystyle.css">

  </head>
  <body>

    <h1>Title</h1>

    <!-- Inline Style:  WORST -->
    <p style="color: white">Paragraph Stuff</p>

  </body>
</html>
```

???
* Inline style: `<p style="color: orange;">` BAD
* Internal style sheet: is a block of CSS inside of your html. Better.
* External style sheet: separate file included in head section. BEST.
* CSS Preprocessor Magics:  is actually best, we'll look into this more later. See: [SASS](http://sass-lang.com/)





---
name: CSS limitations

* Selectors are unable to ascend
* No named rules
* Can't declare new scope independently of position (z-index)
* [SASS](http://sass-lang.com/) for later:
  * variables: `$primary-color: #333`;
  * nesting:  `nav { ul { color: $primary-color; } a { ... } }`
  * mixins:  `@mixin border-radius($radius) { ... }`
  * partials: `import 'navbar'`
  * math:   `5px + 10px`

???
* ascending: no way to select a parent of something
* z-index has a scope and looks for nearest absolute or relative parent
* nesting: can nest rules so each rule doesn't ahve to have the whole selector
* mixins:  like functions -- especially useful for vendor prefixes
* partials:  separate files that can be included when you need
* math:  can do math with pixels for instance






---
name: positioning

```css

div {
  position: _______;
  top: 10px;
  left: 10px;
}

```

???
* we talked about inline and block elements last class
* can someone remember what block elements do?
* take up all avaiable horizontal space and come one after another down the page





---
name: position: static;

.fancy.tiny[![](img/position/static.gif)]

Default. Elements take up space within the document flow. No properties like `top`, `right`, `bottom`, `left` take effect.

???
* default





---
name: position: relative;

.fancy.tiny[![](img/position/relative.gif)]

Position is relative to default (ie. parent within document flow) via `top`, `right`, `bottom`, `left` properties.

???



---
name:

```css
div { position: absolute; }
```

.fancy.tiny[![](img/position/absolute.gif)]

Position is relative to the nearest absolute parent element via `top`, `right`, `bottom`, `left` properties. Element is removed from flow so other elements ignore it.

???




---
name: position: fixed;


.fancy.tiny[![](img/position/fixed.gif)]

Position is relative to the screen via `top`, `right`, `bottom`, `left` properties. Otherwise similar to absolute. Position 0,0 is the top left corner.  

???




---
name: z-index: 10;

.fancy.tiny[![](img/position/z-index.gif)]

Similar to layers and allows elements to be ordered. Parameter: signed integer

???
* helps layer absolute and fixed elements
* and 3d transformed layers




---
name: more css tricks

(animated gifs from [FROONT](http://blog.froont.com/positioning-in-web-design/))

For more detailed examples: [css-tricks](https://css-tricks.com/almanac/properties/p/position/)

???







---
name: More positioning and aligning, the old way


* [`float` CSS property](http://www.w3schools.com/css/css_float.asp)
  * `left`, `right`, `none`
  * element should be taken from the normal flow
  * placed along the left or right side of its container
  * inline elements will wrap around it

* [`clear` CSS property](http://www.w3schools.com/css/css_float.asp)
  * `left`, `right`, `none`, `both`
  * specifies which side of an element floats are **not** allowed
  * if not allowed will move past them (clear past them)


???
* Floating can get tricky.




---
name: More positioning and aligning, the old way

<p data-height="400" data-theme-id="24117" data-slug-hash="cc696879a64585dc629b27fba80c183d" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="https://codepen.io/timofei/pen/cc696879a64585dc629b27fba80c183d/">floats</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???






---
name: Flexbox, the new way

Alignment used to be miserable.

CSS3 [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) make things much better!


<iframe src="//giphy.com/embed/fAKOQ4gRr5kME" width="480" height="200" frameBorder="0" class="giphy-embed" ></iframe>

???
main idea: give the container the ability to alter its items' width/height (and order) to best fill the available space





---
name: Flexbox model

.fancy[![](img/flexbox-model.jpg)

???
* *main axis* / *main dimension*:
  * primary axis along which flex items are laid out
  * extends in the *main dimension*.
* *main-start* / *main-end*
  * flex items are placed starting on the *main-start* side
  * and going toward the *main-end* side.
* *main size* / *main size property*
  * flex items width or height, whichever is in the main dimension, is the item’s main size
  * The flex item’s main size property is either the width or height property, whichever is in the main dimension.
* *cross axis* / *cross dimension*
  * The axis perpendicular to the main axis is called the cross axis
  * extends in the cross dimension.
* *cross-start* / *cross-end*
  * Flex lines are filled with items and placed into the container starting on the cross-start side of the flex container and going toward the cross-end side.
* *cross size* / *cross size property*
  * The width or height of a flex item, whichever is in the cross dimension, is the item’s cross size. The cross size property is whichever of width or height that is in the cross dimension.





---
name: Flexboxes are the only way!

<p data-height="505" data-theme-id="24117" data-slug-hash="03b6b8b6dace6d8f7c666514ac66bead" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="https://codepen.io/timofei/pen/03b6b8b6dace6d8f7c666514ac66bead/">simple flexbox</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


???




---
name: Flex Parent Properties

.fancy.medium[![](img/flex-direction1.svg)]

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

???




---
name: Flex Parent Properties

.fancy[![](img/flex-wrap.svg)]

```css
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

???





---
name: Flex Parent Properties

.fancy.small[![](img/justify-content.svg)]

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

???




---
name: Flex Parent Properties

![](img/align-items.svg){: .fancy .small .mostly-white}

```css
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

???





---
name: Flex Parent Properties

.fancy.small[![](img/align-content.svg)]

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

???




---
name: Flex Child Properties

![](img/order-2.svg){: .fancy .medium_small .mostly-white}

```css
.item {
  order: <integer>;
}
```

???





---
name: Flex Child Properties

.fancy.medium_small[![](img/flex-grow.svg)]

```css
.item {
  flex-grow: <number>; /* default 0 non negative */
  flex-shrink: <number>; /* default 1 non negative */
  flex-basis: <length> | auto; /* default auto */
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] /* shorthand for above */
}
```

???
* how that item grows in relation to other items
* how it shrinks
* basis: default size before remaining space is distributed




---
name: Flex Child Properties

.fancy.medium_small[![](img/align-self.svg)

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
???





---
name: Flexbox resources

Want to learn more?

**go play this now:**
<br>[http://flexboxdefense.com](http://flexboxdefense.com/)

* thanks to: [guide-to-flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for images
* [flexboxin5.com/](http://flexboxin5.com/)
* [a-visual-guide-to-css3-flexbox-properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)

???








---
name: Precedence and Cascading

CSS is named the way it is because is each style sheet applies in a cascading manner.

![css cascade](img/simple_precedence.png)


```html
<p style="color:#ffffff;">hi there</p> <!-- please no -->
```

```css
p {
  color: #ababab !important; /*sparing*/
}

#main-article p { ... }
#main-article .except ul li p { ... }
```

???





---
name: Precedence and Cascading


* more specific selector with more classes wins
  * more specific wins regardless of order
* same specificity, then order matters, later wins
* !important gets the highest precedence **(use sparingly!)**
* inline styles have second highest precedence **(bad: hard to override)**

(from: [Zacky Pickholz](https://www.linkedin.com/pulse/most-important-css-rule-you-might-have-missed-zacky-pickholz))


???





---
name: CSS Box Model

Every element on the page is a box.

.fancy[![box model](img/box_model.png)]

totals =  content width/height + padding + borders + margins

???
* `margin:` defines the spacing **around** the element
* `border:` defines thickness of a border line
* `padding:` defines the spacing *inside* of the element between the border and the contents (can be text of children elements)
* `width/height:`  define the size of the element contents — important to understand that this size does not include the totals




---
name: CSS Box Model

* `margin:` defines the spacing **around** the element
* `border:` defines thickness of a border line
* `padding:` defines the spacing *inside* of the element between the border and the contents (can be text of children elements)
* `width/height:`  define the size of the element contents — important to understand that this size does not include the totals


???







---
name: Element Visibility


* `display: none;` not displayed and takes no space in layout
* `display: inline;` inlined (like spans)
* `display: block;` block (like divs)

* `visibility: hidden;` not displayed but space still allocated
* `visibility: visible;` is displayed and space allocated

* `opacity: 0.5;` displayed with transparency and takes up space


???






---
name: Transitions

<p data-height="400" data-theme-id="24119" data-slug-hash="EWyyNJ" data-default-tab="result" data-user="timofei" data-embed-version="2" data-pen-title="Day Night simulation" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/EWyyNJ/">Day Night simulation</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???
* CSS3 can do a lot of stuff.  Transitions, animations, and even 3D transforms.
* Here's a super fancy solar system simulation in CSS
* We won't do anything that fancy,  plus this isn't a real simulation, all the motions are hardcoded, no physics.





---
name: Transition Properties

```css
div {
  transition-property: [property]
  transition-duration: [duration];
  transition-timing-function: [timing-function];
  transition-delay: [delay];
}
/* or shorthand */
div {
  transition: [property] [duration] [timing-function] [delay];
}

```
???
* things that trigger transitions are any change in the style applied to an element
* hover, active,
* or even a class to an element in javascript



---
name: Transition Properties

* `property:`  (required) of the element to apply to.  can be specific property like background-color, a list, or `all`.
* `duration:`  (required) timespan in milliseconds or seconds units that the effect lasts.
* `timing-function:` (optional) animation interpolation type: `linear`, `ease` (default), `ease-in`, `ease-out`, and `ease-in-out`.
* `delay:` (optional) delay before the start of the animation in milliseconds or seconds units.

???



---
name: Transition Properties

<p data-height="400" data-theme-id="24117" data-slug-hash="598dcc037bd45c9e8c431646bd77a004" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/598dcc037bd45c9e8c431646bd77a004/">basic css transitions</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


???





---
name: CSS 2D and 3D Transforms

### Translate

```
transform: translate(x, y);
transform: perspective(distance_from_view) translate3d(x, y, z);
```

A 2D translate in Y:

<p data-height="254" data-theme-id="24117" data-slug-hash="6cf9da2f0cc4da333ea92ec37259d676" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/6cf9da2f0cc4da333ea92ec37259d676/">css pushbutton</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

???




---
name: Rotate


```css
rotate(angle)	/* 2D rotation */
rotate3d(x,y,z,angle)	/* 3D rotation with axis (with transform-origin )and rotation*/
rotateX(angle) /* shorthand 3D along the X-axis */
rotateY(angle) /* shorthand 3D along the X-axis */
rotateZ(angle) /* shorthand 3D along the X-axis */
```

<p data-height="426" data-theme-id="24117" data-slug-hash="ed827936ca972890a167a2eacc8b8f28" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/ed827936ca972890a167a2eacc8b8f28/">3d rotation with angles</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


???
* Here's a visualization of how the rotation works.
* Note transform-origin is the default center of the object here, but it can be shifted.
* What happens when you do that?





---
name: Rotate


Here's an effect that may be a little over the top for daily use.

<p data-height="353" data-theme-id="24117" data-slug-hash="c0bacc59c1a4f7bade4a52e10d87373c" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/c0bacc59c1a4f7bade4a52e10d87373c/">css card flip</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>



???





---
name: Rotate


Ok, that might be enough of 3D for one day! More demos can be found here:

<iframe class="white-background" src="http://desandro.github.io/3dtransforms/examples/cube-02-show-sides.html" height="400" width="100%"></iframe>



???







---
name: Further Learning: Use the Source, Luke

## [UTSL](https://en.wikipedia.org/wiki/UTSL)


CSS is huge.  There are just too many things to cover!

Use the Chrome Devtools [Inspector](https://developers.google.com/web/tools/chrome-devtools)!


???




---
name: More Resources

* [learn.shayhowe.com](http://learn.shayhowe.com/html-css/) is also a good resource.
* [advanced-css-selectors-you-never-knew-about](https://medium.com/the-web-crunch-publication/advanced-css-selectors-you-never-knew-about-972d8275d079)
* [css-tricks](https://css-tricks.com/)
* [flexbox patterns](http://www.flexboxpatterns.com/home)
* [bootstrap](http://getbootstrap.com/)
* [semantic-ui (an alternative to bootstrap that looks cool)](http://semantic-ui.com/)
* [transitions and transforms](https://robots.thoughtbot.com/transitions-and-transforms)
* [3d transforms](http://desandro.github.io/3dtransforms)

???
