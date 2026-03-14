(function () {
  const container = document.getElementById("topbar-slot");
  if (!container) return;

  const host = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  const isPlatform =
    host === "satoshium.ai" || host === "www.satoshium.ai";

  const topbarUrl = isPlatform
    ? "https://satoshium.link/components/topbar-ai.html"
    : "https://satoshium.link/components/topbaruniverse.html";

  fetch(topbarUrl, { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load topbar: " + response.status);
      }
      return response.text();
    })
    .then(function (html) {
      container.innerHTML = html;

      function setActive(key) {
        const el = container.querySelector(`.topbar .nav a[data-nav="${key}"]`);
        if (el) el.classList.add("active");
      }

      function hostIs() {
        return Array.from(arguments).includes(host);
      }

      function pathStarts(prefix) {
        return path === prefix || path.startsWith(prefix);
      }

      if (isPlatform) {
        if (path === "/" || path === "/index.html") {
          setActive("home");
        } else if (pathStarts("/start-here/")) {
          setActive("start-here");
        } else if (pathStarts("/architecture/")) {
          setActive("architecture");
        } else if (pathStarts("/systems/")) {
          setActive("systems");
        } else if (pathStarts("/services/")) {
          setActive("services");
        } else if (pathStarts("/education/")) {
          setActive("education");
        } else if (pathStarts("/labs/")) {
          setActive("labs");
        } else if (pathStarts("/build/")) {
          setActive("build");
        } else if (pathStarts("/updates/")) {
          setActive("updates");
        } else if (pathStarts("/repo-map/") || pathStarts("/repos/")) {
          setActive("repomap");
        } else if (pathStarts("/registry/")) {
          setActive("registry");
        } else {
          setActive("home");
        }
        return;
      }

      // ===== Universe topbar =====

      // Progress on GitHub Pages
      if (
        hostIs("satoshiumai.github.io") &&
        (path === "/satoshium-progress/" ||
          path === "/satoshium-progress" ||
          path.startsWith("/satoshium-progress/"))
      ) {
        setActive("progress");
        return;
      }

      // Future Progress on satoshium.link
      if (
        hostIs("satoshium.link", "www.satoshium.link") &&
        pathStarts("/progress/")
      ) {
        setActive("progress");
        return;
      }

      // Link domain
      if (hostIs("satoshium.link", "www.satoshium.link")) {
        setActive("link");
        return;
      }

      // Dev
      if (hostIs("satoshium.dev", "www.satoshium.dev")) {
        setActive("dev");
        return;
      }

      // XYZ
      if (hostIs("satoshium.xyz", "www.satoshium.xyz")) {
        setActive("xyz");
        return;
      }

      // Info / Workspace
      if (hostIs("satoshium.info", "www.satoshium.info")) {
        if (pathStarts("/workspace/")) {
          setActive("workspace");
        } else {
          setActive("info");
        }
        return;
      }

      // Net
      if (hostIs("satoshium.net", "www.satoshium.net")) {
        setActive("net");
        return;
      }

      // Store
      if (hostIs("satoshium.store", "www.satoshium.store")) {
        setActive("store");
        return;
      }

      // U.S.
      if (hostIs("satoshium.us", "www.satoshium.us")) {
        setActive("us");
        return;
      }

      // Platform link inside universe bar
      if (hostIs("satoshium.ai", "www.satoshium.ai")) {
        setActive("main-site");
        return;
      }

      // Fallback
      setActive("link");
    })
    .catch(function (err) {
      console.error("Topbar load error:", err);
    });
})();
