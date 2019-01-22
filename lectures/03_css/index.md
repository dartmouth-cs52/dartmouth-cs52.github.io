---
layout: page_with_slides
title: CSS
published: false
comment_term: lecture-css
---

## <span style="color: #F27D00">*see slides for updated version*</span> ##

## Cascading Style Sheets

## Semantics vs. Style

So far we have been defining structure but have not done anything with how they are displayed.  We have mostly relied on the default display styles provided by the browser.  When you set the `h1` tag the font size increased, but we didn't control it directly.  What we were defining was a section of content that was intended to be a header of level 1.

In Microsoft Word,  the default way to format the document is by setting typesetting directly.  You select something and change the font size, or make it bold.  The problem with this is that it unmaintainable in the long term.  Want to change all your headings?  Good luck — should have set up some styles.

The idea behind markup is to help separate the meaning (or semantics) from the style. You specify the intended use of the content,  whether it is a header or a paragraph etc,  and then you define the look and feel of these blocks separately.

The next step is to explore how to do style!

## Enter CSS

![](http://i.giphy.com/5pxnxdzdZfXFK.gif){: .fancy .small }

CSS will be friend and foe this term.  Certain things will be easy, certain things will feel impossible.  Try to vertically align something. We will conquer this though.

![](img/css_mess.jpg){: .fancy }

Ok, enough fun.

## CSS Rules

CSS is a list of rules specifying how elements should be displayed. Each rule starts with a selector: a bit of text that selects some elements of the HTML.  When you gave your page structure you defined the elements that could be selected with CSS!


![anatomy of css rule](img/anatomy_of_css_rule.jpg)


### Selectors!



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

combinations:

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


### Pseudo Selectors

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

### Children and Sibling Selectors

You can also select children and various siblings in CSS. You can **not** unfortunately select a parent.  A few distinctions that are worth noting: a descendent would include any nested children at any level down the tree while the child selector would only include direct children. The adjacent sibling has to be directly adjacent whereas the general sibling matches as long as the parent is the same.


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


### Simple Example With Selectors and Colors

<p data-height="400" data-theme-id="24117" data-slug-hash="a54aae158ba02e5e4cfe33c089277603" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/a54aae158ba02e5e4cfe33c089277603/">a54aae158ba02e5e4cfe33c089277603</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

Note: I cheated in the above example and included some magic for that font.

Computers display color using red, green, and blue color light.  Each color intensity is defined by a byte — thus an unsigned integer value of 0-255 (2^8 -1).
When you specify a color on the web there are several ways to do so:

* Predefined names: red, blue, green, white, etc.
* 8-bit hexadecimal numbers for red, green, blue: <span style="color:#cc0000">#cc0000</span>
* 0-255 decimal intensities: <span style="color:rgb(150,0,150)">rgb(150,0,150)</span>
* Percentage intensities: <span style="color:rgb(20%,80%,20%)">rgb(50%,50%,100%)</span>

And a special case with transparency:  <span style="color:rgba(0,0,255,.5)">rgba(0,0,255,.5)</span>

## CSS Game Time

CSS Selector Game — Play this to become a pro!  [CSS Diner](http://flukeout.github.io/)

## Fonts

The [default fonts](http://www.w3schools.com/css/css_font.asp) that browsers support are a bajillion years old.  Please don't design your pages with Times New Roman.

Best way to get prettier fonts is to use [Google Fonts](https://www.google.com/fonts). Simply choose a font you want and Google gives you a stylesheet to include in the head of your HTML.

Here's Open Sans (a lovely simple font):

`<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>`

and use:
```css
body {
  font-family: 'Open Sans', sans-serif;
}
```
To make it the default! 💗



## Size Units

Many CSS properties take size/length values: `font-size`, `width`, `height`, `margin`, `padding`.  Size can be specified in both absolute units as well as relative units.

### Absolute Units

Generally device pixels are what you want to use for absolute values. All the other absolute units are built on the pixel anyway and are generally frowned on.

* `px`: *device pixels (1/96th of 1in at 28inches viewing distance)* ✅
* `pt`: *points (1/72 of 1in)*
* `pc`: *pica (12 pt)*
* `in`: *inches (96px)*
* `cm`: *centimeters (37.8px)*
* `mm`: *pixel (3.78px)*
(from [css_units](http://www.w3schools.com/cssref/css_units.asp))


### Pixels

Pixels are pretty interesting because they are [actually an angular measurement](http://tinyurl.com/cssmath).  The "reference" pixel is the visual angle of 1 pixel on a device with a pixel density of 96dpi (dots per inch) and a distance from the reader of an 1 arms length — where the nominal arm length is defined as 28 inches.  Thus, a pixel is about 0.0213 degrees of visual angle.

The main takeaways here are that 1 CSS inch is what an inch would look like at 28inches away, and also that device pixels are not the physical pixel display electronics of the screen usually.

![](img/pxangles.png){: .small}

$px = 5376 \times \tan(\alpha)$
{: .math}

Now we can do fun math like this:

```css
#moon {
  width: 24.3px
  /* 5376  * (1079 miles radius of moon /
      238900 miles distance from earth) */
}
/* 1 ref px = visual angle of 1px at a density of 96dpi at 28inches */
```

### Relative Units

More often than not you'll find that relative units are really useful.  There are a bunch of these as well.

* `em`:	*relative to the font-size of the current parent element*
* `rem`:	*relative to font-size of the root element*
* `ex`:	*relative to the width of character 'x' in the current font*
* `ch`: *relative to width of the character '0' in current font*
* `vw`:	*1% of the width of the viewport*
* `vh`:	*1% of the height of the viewport*
* `vmin`:	*1% of viewport's smaller dimension*
* `vmax`:	*1% of viewport's larger dimension*
(from [css_units](http://www.w3schools.com/cssref/css_units.asp))

Often fonts are specified in `em`/`rem`.  1rem = 16px by default if unspecified.  


Here is a generally reasonable practice. Body is set in absolute `px`, main sections are set in `rem`, and the contents of each section are in `em`.  This allows for zoom to work nicely and allows independent control the scaling of the main sections.

![](img/layout.svg)
(from [css-tricks](https://css-tricks.com/rems-ems/))



Older browsers don't support `vh`/`vw` units, but they can be very useful if you don't mind losing some compatibility.


<p data-height="396" data-theme-id="24117" data-slug-hash="GqoPMW" data-default-tab="html,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/GqoPMW/">Testing of Length units</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

### Custom Fonts

Loading your own fonts is completely possible.  It can be resource intensive but at least you can have your own [handwriting as a font](http://www.myscriptfont.com/).  Using a [font provider](https://fonts.google.com/) though gives you the most optimizes / compatible fonts for the browser.

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

## CSS Inside

There are 3 ways to include CSS styles in your page.

* Inline style: `<p style="color: orange;">` BAD
* Internal style sheet: is a block of CSS inside of your html. Better.
* External style sheet: separate file included in head section. BEST.
* CSS Preprocessor Magics:  is actually best, we'll look into this more later. See: [SASS](http://sass-lang.com/)


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

### CSS Limitations

The current version of CSS supported by browsers, CSS3 still has a lot of limitations.

* Selectors are unable to ascend, no way to select a parent of something.
* z-index has a scope and looks for the nearest absolute or relative positioned parent. Can't declare new scope independently of position.
* [SASS](http://sass-lang.com/) for later:
  * variables: `$primary-color: #333`;
  * nesting:  `nav { ul { color: $primary-color; } a { ... } }`
  * mixins:  `@mixin border-radius($radius) { ... }`
  * partials: `import 'navbar'`
  * math:   `5px + 10px`



## Position

### z-index: -1

![](img/position/z-index.gif)

Similar to layers and allows elements to be ordered. Parameter: signed integer
Can be [tricky](https://philipwalton.com/articles/what-no-one-told-you-about-z-index/).

### position: static

![](img/position/static.gif)

Default position.  Elements take up space next to each other within the document flow. No position properties like `top`, `right`, `bottom`, `left` take effect.

### position: relative

![](img/position/relative.gif)

Position is relative to default (ie. parent within document flow) via `top`, `right`, `bottom`, `left` properties.

### position: absolute

![](img/position/absolute.gif)

Position is relative to the nearest absolute parent element via `top`, `right`, `bottom`, `left` properties. Element is removed from document so other elements ignore it.

### position: fixed

![](img/position/fixed.gif)

Position is relative to the screen via `top`, `right`, `bottom`, `left` properties. Otherwise similar to absolute.

Position 0,0 is the top left corner.  

(animated gifs from [FROONT](http://blog.froont.com/positioning-in-web-design/))

For more detailed examples: [css-tricks](https://css-tricks.com/almanac/properties/p/position/)

## Alignment Between Elements, the old way

<p data-height="400" data-theme-id="24117" data-slug-hash="cc696879a64585dc629b27fba80c183d" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="https://codepen.io/timofei/pen/cc696879a64585dc629b27fba80c183d/">floats</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

The [`float` CSS property](http://www.w3schools.com/css/css_float.asp) specifies that an element should be taken from the normal flow and placed along the left or right side of its container. Text or other inline elements will wrap around it.

Floating can get tricky.  There is also a [`clear` CSS property](http://www.w3schools.com/css/css_float.asp) to control which elements should *not* float.


## Flexbox, the new way

Alignment used to be miserable. With CSS3 [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) make things much better.

Flexboxes are worth learning. Here's a simple playable example.

<p data-height="505" data-theme-id="24117" data-slug-hash="03b6b8b6dace6d8f7c666514ac66bead" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="https://codepen.io/timofei/pen/03b6b8b6dace6d8f7c666514ac66bead/">simple flexbox</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>

Want to learn more?
**go play this now** [FLEXBOX TOWER DEFENSE GAME](http://www.flexboxdefense.com/)

[This](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) has good examples also.

## Flexbox Model

.fancy[![](img/flexbox-model.jpg)

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



## Precedence and Cascading

CSS is named the way it is because is each style sheet applies in a cascading manner.

![css cascade](img/simple_precedence.png)

Imagine the situation where there's a nice set of CSS styles that you'd like to use in your site. For instance [Bootstrap](http://getbootstrap.com) is a well know CSS framework but you need to customize and override some things.  You'd add in your own stylesheet to load later and the styles would apply on top of the previous ones. The precedence order is a bit more complicated:

* The more specific our selector is the higher its weight (e.g. a selector having three classes will win a selector with two classes)
* A more specific selector takes over a less specific one, regardless of the order in which they appear
* When two selectors have the same specificity, the one that comes second (in order of loading) wins
* !important always gets the highest precedence (use sparingly — prefer to just be more specific)
* Inline styles have second highest precedence (hence bad because hard to override)
* The universal selector (\*) has zero weight

(from: [Zacky Pickholz](https://www.linkedin.com/pulse/most-important-css-rule-you-might-have-missed-zacky-pickholz))


## CSS Box Model

Every element on the page is a box.  Each box has several properties that define various spacing parameters:

* margin: defines the spacing **around** the element
* border: defines thickness of a border line
* padding: defines the spacing *inside* of the element between the border and the contents (can be text of children elements)
* width/height:  define the size of the element contents — important to understand that this size does not include the totals

![box model](img/box_model.png)


## Element Visibility

There are multiple ways to show and hide elements:

* `display: none;` element is not displayed and takes no space in layout
* `display: inline;` element is inlined (like spans)
* `display: block;` element is a block (like divs)

* `visibility: hidden;` element is not displayed but space still allocated
* `visibility: visible;` element is displayed

* `opacity: 0.5;` element is displayed with transparency and takes up space


## Transitions

CSS3 can do a lot of stuff.  Transitions, animations, and even 3D transforms.

Here's some fancy stuff.

<p data-height="500" data-theme-id="24119" data-slug-hash="EWyyNJ" data-default-tab="result" data-user="timofei" data-embed-version="2" data-pen-title="Day Night simulation" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/EWyyNJ/">Day Night simulation</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


### Transition Properties

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

* property:  (required) the property of the element you want the transition to apply to. can be specific property like background-color, a list, or `all`.
* duration:  (required) timespan in milliseconds or seconds units that the effect lasts.
* timing-function: (optional) animation interpolation type: `linear`, `ease` (default), `ease-in`, `ease-out`, and `ease-in-out`.
* delay: (optional) delay before the start of the animation in milliseconds or seconds units.


<p data-height="400" data-theme-id="24117" data-slug-hash="598dcc037bd45c9e8c431646bd77a004" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/598dcc037bd45c9e8c431646bd77a004/">basic css transitions</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


## CSS 2D and 3D Transforms

### Translate

```
transform: translate(x, y);
transform: perspective(distance_from_view) translate3d(x, y, z);
```

A 2D translate in Y:

<p data-height="254" data-theme-id="24117" data-slug-hash="6cf9da2f0cc4da333ea92ec37259d676" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/6cf9da2f0cc4da333ea92ec37259d676/">css pushbutton</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


### Rotate


```css
rotate(angle)	/* 2D rotation */
rotate3d(x,y,z,angle)	/* 3D rotation with axis (with transform-origin )and rotation*/
rotateX(angle) /* shorthand 3D along the X-axis */
rotateY(angle) /* shorthand 3D along the X-axis */
rotateZ(angle) /* shorthand 3D along the X-axis */
```

Here's a visualization of how the rotation works.  Note transform-origin is the default center of the object here, but it can be shifted. What happens when you do that?  Also note

<p data-height="426" data-theme-id="24117" data-slug-hash="ed827936ca972890a167a2eacc8b8f28" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/ed827936ca972890a167a2eacc8b8f28/">3d rotation with angles</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


Here's an effect that may be a little over the top for daily use.

<p data-height="353" data-theme-id="24117" data-slug-hash="c0bacc59c1a4f7bade4a52e10d87373c" data-default-tab="css,result" data-user="timofei" data-embed-version="2" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/timofei/pen/c0bacc59c1a4f7bade4a52e10d87373c/">css card flip</a> by Tim Tregubov (<a href="http://codepen.io/timofei">@timofei</a>) on <a href="http://codepen.io">CodePen</a>.</p>


Ok, that might be enough of 3D for one day! More demos can be found here:

<iframe src="http://desandro.github.io/3dtransforms/examples/cube-02-show-sides.html" height="400" width="100%"></iframe>




## Further Learning: Use the Source, Luke ([UTSL](https://en.wikipedia.org/wiki/UTSL))


CSS is huge.  There are just too many things to cover!

One way to both see how things are done and also to test out changes is to the use the [Inspector](https://developers.google.com/web/tools/chrome-devtools)! and see how people are achieving certain effects.



### More Resources

* [learn.shayhowe.com](http://learn.shayhowe.com/html-css/) is also a good resource.
* [advanced-css-selectors-you-never-knew-about](https://medium.com/the-web-crunch-publication/advanced-css-selectors-you-never-knew-about-972d8275d079)
* [css-tricks](https://css-tricks.com/)
* [flexbox patterns](http://www.flexboxpatterns.com/home)
* [bootstrap](http://getbootstrap.com/)
* [semantic-ui (an alternative to bootstrap that looks cool)](http://semantic-ui.com/)
* [transitions and transforms](https://robots.thoughtbot.com/transitions-and-transforms)
* [3d transforms](http://desandro.github.io/3dtransforms)
