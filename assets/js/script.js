import { paintings } from 'assets/js/paintings.js';

// Load header
fetch('header.html')
.then(response => response.text())
.then(data => document.getElementById('header').innerHTML = data);

// Function to load gallery content
function loadGallery() {
    document.getElementById('content').innerHTML = `
        <div class="content-wrapper">
            <section class="image-gallery">
                <div>
                    ${Object.keys(paintings).map(paintingId => `
                        <a href="?painting=${paintingId}"><img src="${paintings[paintingId].images[0]}" alt="${paintings[paintingId].title}" width="600px"/></a>
                    `).join('')}
                </div>
            </section>
        </div>
    `;
}

// Function to load painting details based on the query parameter
function loadPainting(paintingId) {
    const painting = paintings[paintingId];
    if (painting) {
        const galleryImages = painting.images.map(imgSrc => `
            <picture>
              <source 
                srcset="
                  ${imgSrc.replace('.jpg', '-400.webp')} 400w,
                  ${imgSrc.replace('.jpg', '-800.webp')} 800w,
                  ${imgSrc.replace('.jpg', '-1200.webp')} 1200w
                "
                type="image/webp"
                sizes="100vw">
              <img 
                src="${imgSrc.replace('.jpg', '-800.jpg')}"
                srcset="
                  ${imgSrc.replace('.jpg', '-400.jpg')} 400w,
                  ${imgSrc.replace('.jpg', '-800.jpg')} 800w,
                  ${imgSrc.replace('.jpg', '-1200.jpg')} 1200w
                "
                sizes="100vw"
                alt="${painting.title}"
                loading="lazy"
                style="max-width: 1200px; width: 100%; height: auto;">
            </picture>
        `).join('');

        document.getElementById('content').innerHTML = `
            <div class="content-wrapper">
                <section class="detail-header">
                    <div class="description-block">
                        <h2>${painting.title}</h2>
                        <p>${painting.description}</p>
                        <p>${painting.size}</p>
                    </div>
                </section>
                <section class="detail-gallery">
                    <div>${galleryImages}</div>
                </section>
            </div>
        `;
    } else {
        document.getElementById('content').innerHTML = '<p>Painting not found.</p>';
    }
}

// Function to check if we're on the gallery or a painting's detail page
function checkPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const paintingId = urlParams.get('painting');
    if (paintingId) {
        loadPainting(paintingId);
    } else {
        loadGallery(); // Load the gallery if no painting is specified
    }
}

// Call checkPage when the page loads
window.onload = checkPage;
</script>
<!-- Code injected by live-server -->
<script>
// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
(function () {
function refreshCSS() {
    var sheets = [].slice.call(document.getElementsByTagName("link"));
    var head = document.getElementsByTagName("head")[0];
    for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
            var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
            elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
        }
        parent.appendChild(elem);
    }
}
var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
var address = protocol + window.location.host + window.location.pathname + '/ws';
var socket = new WebSocket(address);
socket.onmessage = function (msg) {
    if (msg.data == 'reload') window.location.reload();
    else if (msg.data == 'refreshcss') refreshCSS();
};
if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
    console.log('Live reload enabled.');
    sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
}
})();
}
else {
console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}
// ]]>
