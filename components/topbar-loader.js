(async function () {
  const slot = document.getElementById("topbar-slot");
  if (!slot) return;

  const host = window.location.hostname.toLowerCase();

  const platformHosts = [
    "satoshium.ai",
    "www.satoshium.ai"
  ];

  const universeHosts = [
    "satoshium.link",
    "www.satoshium.link",
    "satoshium.info",
    "www.satoshium.info",
    "satoshium.xyz",
    "www.satoshium.xyz",
    "satoshium.net",
    "www.satoshium.net",
    "satoshium.store",
    "www.satoshium.store",
    "satoshium.dev",
    "www.satoshium.dev",
    "satoshium.us",
    "www.satoshium.us"
  ];

  let topbarUrl = "https://satoshium.link/components/topbar-universe.html";

  if (platformHosts.includes(host)) {
    topbarUrl = "https://satoshium.link/components/topbar-ai.html";
  } else if (universeHosts.includes(host)) {
    topbarUrl = "https://satoshium.link/components/topbar-universe.html";
  }

  try {
    const res = await fetch(topbarUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load topbar: ${res.status}`);
    slot.innerHTML = await res.text();
  } catch (err) {
    console.error("Topbar load error:", err);
  }
})();
