---
layout: page
title: Lab 1
published: true
comment_term: lab-landing-page
---

# Build a Landing Page!  ✈️

Your assignment, should you choose to accept it, (not sure you have much choice there...) is to create a landing page.  

A landing page you say?  Yes, you will be making a landing page based on an real page out there in the world. You will be mimicking the structure and style of a page but with your own content.

## Goal Overview

* Become comfortable with [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
* Be able to mimic structure and style of pages
* Focus on refining html/css skills
* Build a beautiful static landing page.

## Getting Started

🚀 We'll be choosing a landing page website to flatter. And by flatter I mean rip-off. But by rip-off, I mean reconstruct a clean version using our own content.  You'll be looking at some webpages, and then inspecting them and seeing how much of the look and feel you can copy onto your own page. 

Here, I chose slack.com (it no longer looks like this and is now surprisingly even uglier, so don't choose that one). 

![](img/slack-desktop0.jpg){: .fancy .medium_small}

And if you narrow your browser you'll see some responsive design and it looks like so:

![](img/slack-mobile0.jpg){: .fancy .tiny}

You should choose another landing page to base your page off of, as long as it has the following features:

* responsive navigation menu - one that collapses from columns into rows when in mobile.
* expanding image(s) - either as a background or central element
* a clear call to action button with some hover states, some nice styling, and responsive
* text input bar for signup or search (will be non-functional)
* a footer with links that are responsive (change from side by side to vertical in smaller sizes)

Some examples (in very approx order of difficulty):
* [flourbakery.com](https://flourbakery.com/)
* [github.com](https://github.com/) *(incognito mode)*
* [starbucks.com](https://www.starbucks.com/) *(add a fullwidth image)*
* [stripe.com](https://stripe.com/)
* [collegepulse](https://collegepulse.com/)
<!-- * [tesla.com](https://www.tesla.com) -->
<!-- * [apple.com](https://www.apple.com) -->
* [figma.com](https://www.figma.com)
* [mixpanel.com](https://mixpanel.com)
* [wistia.com](http://wistia.com)
* [notion.so](https://www.notion.so/)
<!-- * [hubspot.com](https://www.hubspot.com/) -->
* [simpleanalytics.io](https://simpleanalytics.io/)
* [sunbasket.com](https://sunbasket.com/) 
* [patagonia.com](http://patagonia.com) *(with [carousel in pure css](https://codeburst.io/how-to-pure-css-carousel-ce1a8cb231c8) challenge)*

You can also browse for inspiration here: [landingfolio.com](https://www.landingfolio.com/).  You can also choose multiple pages to pick and choose things from. 

**Please be creative with your content!**  You can and should make your own content on this page. Do not copy my content, or the websites content, make up your own.

What you'll find is that many product landing pages have a lot of similarities:

* A navbar that when resized turns into the hamburger menu 🍔<br>
  ![](img/hamburger-icon.gif){: .tiny}
* A CTA (call to action)<br>
  ![](img/cta.gif){: .tiny}
* some resizing background image<br>
  ![](img/sizes.gif){: .tiny}
* some set of side by side highlights<br>
  ![](img/responsive-nav.gif){: .tiny}

**You can and should alter the text and images** as you please — make it be a landing page for your imagination!  What you are doing is basing the structure and styling of your landing page on that of one of these others. However, make the content your own – that is the whole point of the exercise.  The screenshots below are from one attempt at this and are examples only.  There are lots of places to get cool free images if you need content. 

* [unsplash.com](https://unsplash.com)
* [pixabay.com](https://pixabay.com)

**No functionality needs to implemented.** No JS, or any external libraries or CSS frameworks are allowed for this assignment. You can do all of it was just the HTML/CSS from scratch.  Don't worry it'll be fun!

Using your fresh HTML and CSS skills you will make an **HTML and CSS only** version of this landing page (no JS allowed).  ❗None of the links or functionality needs to be there, it just needs to look good and be laid out properly.

All anchor tags should look like this

```html
<a href="#">
```
Links to nowhere.

**Simplify a lot!**  This is more re-imagining than it is making a carbon copy. You'll very much need to simplify and leave things out. You will submit both the original that you used for inspiration and your version, but what we are looking for is for a clever adaptation given the limitations of no javascript. 

**Note:** You **can and should use** the [Chrome DevTools Inspector](https://developers.google.com/web/tools/chrome-devtools/) 🔍 to examine the structure of the original page.  You'll find it is really messy and complicated!  Although it is a good idea to inspect individual elements (for instance: a button to see how they styled the borders) it won't really help you much to try to copy more. If your code blatantly includes un-cited code copied from one of these websites or another students assignment, that will be considered an honor code violation ⚠️.  Ask me if you have questions about this.


## PART 1: HTML
### Dive Right In!

🚀Start in your git repo for the project — Please use the github classroom link provided in the Canvas assignment to create the repo automatically.

🚀Open up your code editor and create an `index.html` and a `style.css` file.  

🚀Link your `style.css` file into the head of your html file.


### Outline

In HTML only,  outline the main elements you envision for the page.  Here's some hints:

* `<nav>` for the navbar (even though it is transparent).
* `<ul>` unordered lists are often used for nav components, if you do it'll help to get rid of the bullets using `list-style-type: none;`
* `<footer>` is a good tag to use for... footer things.
* `<div>`, `<span>`, `<a>`, `<h1>`, `<p>` will all be useful.
* `<input>`, and `<button>` for any form like elements.


Don't worry about styling 💇 at this point. Just lay things out in an order that makes sense to you. Remember this is structure you are describing. 

It may look approximately like this.

![html layout](img/html_layout.png){: .fancy .small}

⚠️⚠️⚠️
🚀Take a screen cap at this point!  You will need to submit this for part of the grade.

### Git Tags

🐙 To keep track of specific important changes in our repositories, we're going to be using [git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_lightweight_tags).  Tags are a way to give a specific git commit a name/label for easy retrieval later.  Github uses tags to mark software release versions as well.


```bash
# first make sure you've committed your code
git commit -am "done with html layout stage"
# when you run git tag it will label the current latest commit
git tag html
# tags need to be pushed to github manually
git push origin --tags
```

**Now you can take a break, we'll learn some CSS in class and you can come back and make this pretty.**


## PART 2: Styling!

### Adding in Fonts

Right, in the above you may have noticed that yours was Times New Roman...

🚀You should get some better fonts quick from [Google Fonts](http://fonts.google.com)! 🐎

🚀And you might as well grab some nice icons while you are at it from [FontAwesome](http://fontawesome.io/). Easiest is to just download the whole fontawesome package and including that in your source.

![with icons](img/icons.png){: .fancy .tiny}

### Background

🚀Go ahead and add a background in!

I recommend getting rid of margin and padding on body. Something like:


```css
body {
  margin: 0;
  padding: 0;
}
```

and then creating a top level div with a background that is set to size `cover`:

```css
.cover {
  background-image: url(img/yourimagename.jpg);
  background-size: cover;
}
```

*Note: the above are just tips - you may need to expand / do something a little different in your particular case.*

### Flex Boxes

🚀Pretty much all the layout you can do with flex boxes.  In fact you should absolutely do as much of the layout of this page using flexbox layout.

There may be some tricky elements, in particular full page ones.  In this example there was a fullscreen gradient element which needed to have `absolute` positioning to place. 

Here is a good [guide to flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

**Note:** for now only use pure CSS3 directives that are supported by the latest Chrome. Don't worry about the various [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) like `-webit` `-moz` or any of those prefixes.  Later on we'll learn about using [autoprefixers](https://css-tricks.com/autoprefixer/) to make our code work better cross platform, but for now use the latest the greatest that works in Chrome.  That is the browser we'll be testing your sites in and the only browser that matters for the time being. **Do not** use any other browser for your dev work.

Now things should look like they are coming together.

![](img/flexboxes.jpg){: .fancy .small}

Things are not lining up and much of styling is missing, but most elements are in their proper places. Using only flexboxes and some very basic positioning.  No bootstrap here!


### Styling

Now get it looking good!

🚀Don't forget the `:hover` CSS!  There's some nice little touches throughout.

`border`, `box-shadow`, `border-radius`, `margin`, `rgba`,  all will come in handy!

I recommend working on the full width version, and don't worry about how it resizes till you are moderately happy with it.

It should start looking something like this at this point.

![](img/full_width.jpg){: .fancy .small}

### Media query

Now for the tricky part!  Shrink the width of your browser window all the way down!  GASP! 💩

Most likely it did not resize well. We'll deal with this using a single media query.

🚀Here's how to start:

```css
@media only screen and (max-width: 640px) {

}
```

Anything in this media query will only apply if the screen is fairly narrow.  Don't worry about it working on every single device - rather focus on it working in a more general fashion in a "mobile" width vs "desktop".  Flex-boxes will take care of things being responsive in most widths but you want to make sure that there is a mobile version where a few bigger site wide changes happen: rows into columns, nav links into hamburger menu.

Techniques to try:

```css
flex-direction: column;
```

🚀Take some of your row flex boxes and simply convert them to columns.  This works remarkably well for many cases.  The input box and button for instance.

```css
display: none;
```

🚀Toggle the display property on completely different sections of the site.  You might have a completely different set of elements for the links section for instance.  Toggle one off and the other on.

You should end up with something akin to:

![](img/responsive.jpg){: .fancy .tiny}

**Note:** I did not bother with making the bottom Link Heading sections expand. Extra credit if you do.


### Speaking of CSS responding to clicks...

Notice that on most of these pages when you're in the narrow responsive site if you click on the *Hamburger Menu* button an overlay menu comes up. This is done with javascript the world over. BUT it is possible to trick CSS into responding to clicks!

This is called the [CSS Checkbox Hack](https://css-tricks.com/the-checkbox-hack/), very clever.  

If you choose to, you may implement this functionality in pure CSS. This part is extra credit, but easy and worth doing! You can also play with CSS transitions for this to make the menu appear to slide or fade in.  **Caveat:** CSS transitions don't work if the element has `display: none` on it, but there are other ways to hide an element, `opacity` + `height: 0px` come to mind.

Here's what it could look like:

![](img/css_checkbox_hack.gif){: .fancy .tiny}


## And You Are Done!

You should host this on github pages as you have in the past with the `gh-pages` branch.  Just make that the name of your main branch and it'll set it up automatically, or in `Settings` you can choose to use the `master` branch for gh-pages (even easier). You do not need a custom domain for this! We'll just use the autogenerated ghpages one that shows up in your settings tab - something like: `https://dartmouth-cs52-18ss.github.io/lab1-yourusername.`  Please **do not overwrite** your domain from SA1. Another cool static page hosting platform is [surge.sh](http://surge.sh).  Easy to set up, and you are welcome to do that instead if you prefer.


## To Turn In (canvas):

* url to your hosted page (gh-pages is fine)
* your page should:
  * display as many elements from the original site as possible
  * use only pure CSS/HTML
  * have clean CSS/HTML written by hand by you (your html file should only be a few hundred lines).
  * use lots of flexboxes for layout
  * be responsive with 1 narrow phone friendly version per the original
  * include some details such as hover effects and border-radius
  * have clear document structure with proper semantic naming
  * look reasonable :-)
* your repo should include a README.md file with:
  * a couple sentence description of what you did and what worked / didn't work.
  * screen caps of your layout stage
  * screen caps with anything special you want to point out
  * url to the original landing page you were mimicking


## Extra Credit

* Fancy CSS transitions
* CSS Checkbox Hack for the mobile version Menu
* Link Headers utilizing the CSS Checkbox hack to expand!



## Resources:

* [https://css-tricks.com](https://css-tricks.com)
* [http://www.w3schools.com](http://www.w3schools.com)
* [https://philipwalton.github.io/solved-by-flexbox/](https://philipwalton.github.io/solved-by-flexbox/)
