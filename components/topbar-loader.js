(function () {
  const container = document.getElementById("topbar-slot");
  if (!container) return;

  const host = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  const isPlatform =
    host === "satoshium.ai" || host === "www.satoshium.ai";

  const topbarUrl = isPlatform
    ? "https://satoshium.link/components/topbar-ai.html"
    : "https://satoshium.link/components/topbar.html";

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

      function isGithubProgress() {
        return (
          host === "satoshiumai.github.io" &&
          (
            path === "/satoshium-progress" ||
            path === "/satoshium-progress/" ||
            path.startsWith("/satoshium-progress/")
          )
        );
      }

      function isLinkProgress() {
        return (
          (host === "satoshium.link" || host === "www.satoshium.link") &&
          (path === "/progress/" || path.startsWith("/progress/"))
        );
      }

      function isLinkRepos() {
        return (
          (host === "satoshium.link" || host === "www.satoshium.link") &&
          (
            path === "/repos/" ||
            path.startsWith("/repos/") ||
            path === "/repo-map/" ||
            path.startsWith("/repo-map/")
          )
        );
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
        } else if (
          path.includes("/repo-map/") ||
          path.includes("/repos/")
        ) {
          setActive("repomap");
        } else if (path.includes("/registry/")) {
          setActive("registry");
        } else {
          setActive("home");
        }
      } else {
        if (isGithubProgress() || isLinkProgress()) {
          setActive("progress");
        } else if (isLinkRepos()) {
          setActive("link");
        } else if (host === "satoshium.link" || host === "www.satoshium.link") {
          setActive("link");
        } else if (host === "satoshium.dev" || host === "www.satoshium.dev") {
          setActive("dev");
        } else if (host === "satoshium.xyz" || host === "www.satoshium.xyz") {
          setActive("xyz");
        } else if (host === "satoshium.info" || host === "www.satoshium.info") {
          if (path.includes("/workspace/")) {
            setActive("workspace");
          } else {
            setActive("info");
          }
        } else if (host === "satoshium.net" || host === "www.satoshium.net") {
          setActive("net");
        } else if (host === "satoshium.store" || host === "www.satoshium.store") {
          setActive("store");
        } else if (host === "satoshium.us" || host === "www.satoshium.us") {
          setActive("us");
        } else if (host === "satoshium.ai" || host === "www.satoshium.ai") {
          setActive("main-site");
        } else {
          setActive("link");
        }
      }
    })
    .catch(function (err) {
      console.error("Topbar load error:", err);
    });
})();
