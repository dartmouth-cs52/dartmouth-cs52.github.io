import { parse as shellParser } from "shell-quote"
const globalRe = /(?:\s*|\n*){:([^}]+)}(?:\n|$)/g
const fullMtRe = /^(?:\s*|\n*)({:([^}]+)}\n?)+$/g
const singleRe = /(?:\s*|\n*){:([^}]+)}(?:\n|$)/

// --
// Make an array uniq.
// --

function arrayUniq(array) {
  return array.filter((v, i, a) => {
    return a.indexOf(v) === i
  })
}

// --
// Loop through childen of `token` and remove the softbreak before and all
// softbreaks after so that the user has a clean state and not a bunch of "\n\n"
// when they get their content, and also no `{:#attr}` and stuff.
// --

function cleanupChildrenAndRemoveCurly(token) {
  let children = [], childFound
  token.content.replace(
    singleRe, ""
  )

  token.children.forEach((child, i) => {
    if (child.type == "text" && child.content.match(singleRe)) {
      childFound = true; child.content = child.content.replace(singleRe, "")
      if (child.content != "") {
        children.push(
          child
        )
      }

      else {
        let previousChild = children[children.length - 1]
        if (previousChild && previousChild.type == "softbreak") {
          children.pop(
            //
          )
        }
      }
    }

    else if (!(childFound && child.type == "softbreak")) {
      children.push(
        child
      )
    }
  })

  token.children = children
}

// --

function addClass(attr, target) {
  let classes

  target.attrs.forEach((ary) => {
    if (ary[0] == "class") {
      classes = ary
    }
  })

  if (!classes) {
    target.attrs.push(
      classes = [
        "class", ""
      ]
    )
  }

  classes[1] = classes[1].split(/\s+/)
  classes[1].push(attr.replace(/^\s*\./, ""))
  classes[1] = arrayUniq(classes[1]).
    join(" ").trim()
}

// --

function addID(attr, target) {
  target.attrs.push(["id",
    attr.replace(/^\s*#/, "")
  ])
}

// --

function addAttr(attr, target) {
  attr = attr.split(/\s*=\s*/)
  target.attrs.push([attr[0],
    attr.slice(1, attr.length).join("=")
  ])
}

// --
// Parse the attributes from {:.class #id key=val} into the target and as a
// part of the context.
// --

function parseAttrs(state) {
  let skipNext = false
    , tokens = []

  state.tokens.forEach((token, i) => {
    if (!skipNext) {
      tokens.push(
        token
      )
    }

    else {
      skipNext = false
    }

    if (token.block && token.type == "inline") {
      let attrMatches = token.content.match(globalRe)
      if (attrMatches && attrMatches.length > 0) {
        cleanupChildrenAndRemoveCurly(token)

        if (token.content.match(fullMtRe)) { tokens.pop()
          if (state.tokens[i - 1].type == "paragraph_open") { tokens.pop()
            if (state.tokens[i + 1].type == "paragraph_close") {
              skipNext = true
            }
          }
        }

        attrMatches.forEach((attrs) => {
          let target

          attrs = shellParser(
            attrs.match(singleRe)[1].replace(
              /#/, "\\#"
            )
          )

          if (token.content.match(fullMtRe)) {
            let current = tokens.length; target = tokens[current]
            do { current -= 1; target = tokens[current] } while (
              target.type == "inline" || target.type.match(
                /_close$/
              )
            )
          }

          else if (token.children[0].type == "text") {
            target = state.tokens[
              i - 1
            ]
          }

          else {
            target = token.children[
              0
            ]
          }

          // --

          if (!target.attrs) {
            target.attrs = [
              //
            ]
          }

          // --

          attrs.forEach((attr) => {
            if (attr.match(/^\s*\./)) {
              addClass(
                attr, target
              )
            }

            else if (attr.match(/^\s*#/)) {
              addID(
                attr, target
              )
            }

            else {
              addAttr(
                attr, target
              )
            }
          })
        })
      }
    }
  })

  state.tokens = tokens
}

// --

export default function kramdownAttrs(markdown) {
  markdown.core.ruler.before("replacements",
    "kramdown_attrs", parseAttrs
  );
}
