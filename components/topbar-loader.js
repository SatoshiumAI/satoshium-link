(function () {
  const container = document.getElementById("topbar-slot");
  if (!container) return;

  const host = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  const platformHosts = ["satoshium.ai", "www.satoshium.ai"];

  const isPlatform = platformHosts.includes(host);

  const topbarUrl = isPlatform
    ? "https://satoshium.link/components/topbar-ai.html"
    : "https://satoshium.link/components/topbar.html";

  fetch(topbarUrl, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load topbar: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      container.innerHTML = data;

      function setActive(key) {
        const el = document.querySelector(`.topbar .nav a[data-nav="${key}"]`);
        if (el) el.classList.add("active");
      }

      if (isPlatform) {
        if (path === "/" || path === "/index.html") {
          setActive("home");
        } else if (path.includes("/start-here/")) {
          setActive("start-here");
        } else if (path.includes("/architecture/")) {
          setActive("architecture");
        } else if (path.includes("/systems/")) {
          setActive("systems");
        } else if (path.includes("/services/")) {
          setActive("services");
        } else if (path.includes("/education/")) {
          setActive("education");
        } else if (path.includes("/labs/")) {
          setActive("labs");
        } else if (path.includes("/build/")) {
          setActive("build");
        } else if (path.includes("/updates/")) {
          setActive("updates");
        } else if (path.includes("/repo-map/") || path.includes("/repos/")) {
          setActive("repomap");
        } else if (path.includes("/registry/")) {
          setActive("registry");
        } else if (path.includes("/universe/")) {
          setActive("universe");
        } else {
          setActive("home");
        }
      } else {
        if (host.includes("satoshium.link")) {
          if (path.includes("/progress/")) {
            setActive("progress");
          } else {
            setActive("link");
          }
        } else if (host.includes("satoshium.dev")) {
          setActive("dev");
        } else if (host.includes("satoshium.xyz")) {
          setActive("xyz");
        } else if (host.includes("satoshium.info")) {
          if (path.includes("/workspace/")) {
            setActive("workspace");
          } else {
            setActive("info");
          }
        } else if (host.includes("satoshium.net")) {
          setActive("net");
        } else if (host.includes("satoshium.store")) {
          setActive("store");
        } else if (host.includes("satoshium.us")) {
          setActive("us");
        } else if (host.includes("satoshium.ai")) {
          setActive("platform");
        } else {
          setActive("link");
        }
      }
    })
    .catch((err) => {
      console.error("Topbar load error:", err);
    });
})();
