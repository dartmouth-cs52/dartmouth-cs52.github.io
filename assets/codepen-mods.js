console.log("loading codepen cs52 plugins...");

document.body.insertAdjacentHTML('afterend','<div id="log-container" class="expanded"><div id="log-title" onclick="toggleConsole(this)"></div><div id="log"></div></div>');

function toggleConsole(element) {
  element.parentElement.classList.toggle("expanded");
}

$('#log-title').on('click', function(e) {

} );

var c = function() {
  return({
      log: function(msg) {
        consoleDiv = document.getElementById('console');
        para = document.createElement('p');
        text = document.createTextNode(msg);
        para.appendChild(text);
        consoleDiv.appendChild(para);
      }
  });
}();


rewireLoggingToElement(
  () => document.getElementById("log"),
  () => document.getElementById("log-container"), true);

function rewireLoggingToElement(eleLocator, eleOverflowLocator, autoScroll) {
  fixLoggingFunc('log');
  fixLoggingFunc('debug');
  fixLoggingFunc('warn');
  fixLoggingFunc('error');
  fixLoggingFunc('info');

  function fixLoggingFunc(name) {
    console['old' + name] = console[name];
    console[name] = function (...arguments) {
      const output = produceOutput(name, arguments);
      const eleLog = eleLocator();

      if (autoScroll) {
        const eleContainerLog = eleOverflowLocator();
        const isScrolledToBottom = eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1;
        eleLog.innerHTML += output + "<br>";
        if (isScrolledToBottom) {
          eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight;
        }
      } else {
        eleLog.innerHTML += output + "<br>";
      }

      console['old' + name].apply(undefined, arguments);
    };
  }

  function produceOutput(name, args) {
    return args.reduce((output, arg) => {
      return output +
        "<span class=\"log-" + (typeof arg) + " log-" + name + "\">" +
        (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
        "</span>&nbsp;";
    }, '');
  }
}
