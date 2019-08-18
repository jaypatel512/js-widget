import html from './show.html';
import tingle from 'tingle.js'
import 'tingle.js/dist/tingle.min.css'
import './show.css';
import { shouldAutoOpen } from '../services'

let elements = [];
let body;

export function show(text) {
    // convert plain HTML string into DOM elements
    let env = "";
    let storeId = "123";
    let serviceURL = "https://ddm2s7p54russ.cloudfront.net"

    let modal = new tingle.modal({
        closeMethods: ['button', 'escape'],
        closeLabel: "Close",
        onOpen: function () {
            console.log('modal open');
        },
        onClose: function () {
            console.log('modal closed');
        }
    });
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var url = serviceURL + "/service.html?"
    url += "storeId=" + storeId;
    if (env !== "") {
        url += "&env=" + env;
    }
    modal.setContent('<iframe id="the_iframe" height="' + (h - 75) + '" style="height: 80vh" width="100%" frameborder="0" src=' + url + '>');
    let temporary = document.createElement('div');
    temporary.innerHTML = html;
    console.log(temporary.getElementsByClassName('chat-head')[0])

    // append elements to body
    body = document.getElementsByTagName('body')[0];
    while (temporary.children.length > 0) {
        elements.push(temporary.children[0]);
        body.appendChild(temporary.children[0]);
    }
    document.getElementById("chat-head").addEventListener('click', () => modal.open());
    setTimeout(function () {
        document.getElementById('chat-head').style.transform = 'scale(1)';
    }, 500);
    rotateText();

    if (shouldAutoOpen()) {
        modal.open();
    }
}

function rotateText() {
    let count = 0;
    let wordsArray = ["Service", "Oil Change", "Maintenance"];
    setInterval(function () {
        count++;
        if (window.jQuery && $.fn.slideUp) {
            $("#rotating-text").slideUp(400, function () {
                $(this).text(wordsArray[count % wordsArray.length]).slideDown(400);
            });
        } else {
            var rotatingText = document.getElementById('rotating-text');
            if (rotatingText !== null) {
                rotatingText.innerHTML = wordsArray[count % wordsArray.length];
            }
        }
    }, 2500);
}

function bindModal() {
    // addEventListener support for IE8
    function bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    }
    // Listen to message from child window
    bindEvent(window, 'message', function (e) {
        var message = e.data;
        if (message === "modal.close") {
            modal.close();
        }
    });
}
