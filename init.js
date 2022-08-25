(function () {
  // To make created css classes and ids unique
  // Means: Google-Podcast-Downloader-Extension
  const CLASS_PREFIX = "gpde__";

  const tryCreateButton = () => {
    const BUTTON_CLASS = `${CLASS_PREFIX}download-btn`;

    const $container = document.querySelector(".Smcrqd");

    if (!$container) return;
    if ($container.querySelector(`.${BUTTON_CLASS}`)) return;

    const btn = document.createElement("button");
    btn.appendChild(document.createTextNode("Download"));
    btn.className = BUTTON_CLASS;

    btn.addEventListener("click", function () {
      const audio = document.getElementsByTagName("audio")[0];
      console.log(`Start Downloading: ${audio.title}`);
      chrome.runtime.sendMessage({
        url: audio.src,
        title: audio.title
      });
    });

    $container.appendChild(btn);
  }

  const tryCreateEpisodeButton = () => {
    const BUTTON_CLASS = `${CLASS_PREFIX}download-btn`;

    const $containers = document.querySelectorAll(".zlb4lf");

    if (!$containers.length) return;

    const btn = document.createElement("button");
    btn.appendChild(document.createTextNode("Download"));
    btn.className = BUTTON_CLASS;

    $containers.forEach(node => {
      if (!node.querySelector(`.${BUTTON_CLASS}`)) {
        const btnCopy = btn.cloneNode(true);
        btnCopy.addEventListener("click", function (event) {
          event.stopPropagation();
          event.preventDefault();
          const episode = this.parentNode.firstChild.getAttribute('jsdata')
          const audioUrl = episode.split(';')[1];
          const audioName = this.parentNode.parentNode.childNodes[1].textContent;
          console.log(`Start Downloading: ${audioName}`);
          chrome.runtime.sendMessage({
            url: audioUrl,
            title: audioName
          });
        });
        node.appendChild(btnCopy);
      }
    })
  }

  // Tries to create the button once the media player is added to the page
  const observeMediaPlayerCreation = function () {
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          // Check if the mediaplayer is added
          // The following class name is the class of media player container
          if (node.className === "hIP55c") {
            tryCreateButton();
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener('load', function () {
    observeMediaPlayerCreation();
    tryCreateEpisodeButton();
    tryCreateButton();
  });
})();

