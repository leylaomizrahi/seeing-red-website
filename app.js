let PRODUCTS = [
  {
    id: "sr-001",
    name: "Crimson Hoodie",
    price: 98,
    desc: "Heavyweight fleece hoodie with a clean fit. Soft inside, structured outside. Built for everyday wear.",
    color: "Crimson",
  },
  {
    id: "sr-002",
    name: "Scarlet Tee",
    price: 44,
    desc: "Midweight cotton tee with a slightly boxy silhouette. Easy to layer, easy to live in.",
    color: "Scarlet",
  },
  {
    id: "sr-003",
    name: "Ruby Track Jacket",
    price: 124,
    desc: "A classic track jacket with subtle shine and a smooth hand feel. Clean lines, bold tone.",
    color: "Ruby",
  },
  {
    id: "sr-004",
    name: "Burgundy Cargo Pants",
    price: 118,
    desc: "Relaxed cargo with crisp structure. Utility pockets, tapered finish.",
    color: "Burgundy",
  },
  {
    id: "sr-005",
    name: "Cherry Knit Sweater",
    price: 112,
    desc: "Rib-knit sweater with a comfortable drape. Warm without being heavy.",
    color: "Cherry",
  },
  {
    id: "sr-006",
    name: "Vermilion Overshirt",
    price: 132,
    desc: "Brushed overshirt made for layering. A clean outer piece for cooler nights.",
    color: "Vermilion",
  },
  {
    id: "sr-007",
    name: "Carmine Beanie",
    price: 28,
    desc: "Simple rib-knit beanie. The finishing touch that pulls the look together.",
    color: "Carmine",
  },
  {
    id: "sr-008",
    name: "Rose Windbreaker",
    price: 108,
    desc: "Lightweight windbreaker with a matte finish. Packs easily, wears even easier.",
    color: "Rose",
  },
  {
    id: "sr-009",
    name: "Ox-blood Skirt",
    price: 86,
    desc: "Minimal skirt with a clean waistband and subtle movement. Dress up or down.",
    color: "Ox-blood",
  },
  {
    id: "sr-010",
    name: "Redline Sneakers",
    price: 148,
    desc: "Low-profile sneaker with a crisp outsole and bold accent. Made for daily miles.",
    color: "Redline",
  },
];

const PRODUCT_MEDIA = {
  "sr-001": ["./assets/products/sr-001.jpg"],
  "sr-002": ["./assets/products/sr-002.jpg"],
  "sr-003": ["./assets/products/sr-003.jpg"],
  "sr-004": ["./assets/products/sr-004.jpg"],
  "sr-005": ["./assets/products/sr-005.jpg"],
  "sr-006": ["./assets/products/sr-006.jpg"],
  "sr-007": ["./assets/products/sr-007.jpg"],
  "sr-008": ["./assets/products/sr-008.jpg"],
  "sr-009": ["./assets/products/sr-009.jpg"],
  "sr-010": [
    "./assets/products/sr-0010.jpg",
    "./assets/products/sr-0011.jpg",
    "./assets/products/sr-0012.jpg",
    "./assets/products/sr-0013.jpg",
  ],
};

let LANDING_TILES = [
  "sr-001",
  "sr-002",
  "sr-003",
  "sr-004",
  "sr-005",
  "sr-006",
  "sr-007",
  "sr-008",
  "sr-009",
  "sr-010",
  "sr-001",
  "sr-002",
  "sr-003",
  "sr-004",
  "sr-005",
  "sr-006",
];

const CART_KEY = "seeing_red_cart_v1";

const SHOPIFY_DOMAIN_KEY = "seeing_red_shopify_domain";
const SHOPIFY_TOKEN_KEY = "seeing_red_shopify_storefront_token";
const SHOPIFY_API_VERSION = "2024-04";
const LANDING_TILE_COUNT = 16;
const PHONE_LANDING_BREAKPOINT = 760;

const els = {
  grid: document.getElementById("productGrid"),
  landingView: document.getElementById("landingView"),
  landingHeader: document.getElementById("landingHeader"),
  pdpPage: document.getElementById("pdpPage"),
  pdpBack: document.getElementById("pdpBack"),
  pdpCartBtn: document.getElementById("pdpCartBtn"),
  pdpCartCount: document.getElementById("pdpCartCount"),

  mainImage: document.getElementById("mainImage"),
  thumbs: document.getElementById("thumbs"),
  productName: document.getElementById("productName"),
  productPrice: document.getElementById("productPrice"),
  productSize: document.getElementById("productSize"),
  productDesc: document.getElementById("productDesc"),
  sizeSelect: document.getElementById("sizeSelect"),
  qtyInput: document.getElementById("qtyInput"),
  addToCart: document.getElementById("addToCart"),
  buyNow: document.getElementById("buyNow"),

  cartBtn: document.getElementById("cartBtn"),
  cart: document.getElementById("cart"),
  closeCart: document.getElementById("closeCart"),
  drawerScrim: document.getElementById("drawerScrim"),
  cartItems: document.getElementById("cartItems"),
  cartSubtotal: document.getElementById("cartSubtotal"),
  cartHeaderCount: document.getElementById("cartHeaderCount"),
  cartCount: document.getElementById("cartCount"),
  checkout: document.getElementById("checkout"),
};

let activeProduct = null;
let activeImages = [];
let landingScrollY = 0;

function shouldUsePhoneLandingLayout(){
  return window.matchMedia(`(max-width: ${PHONE_LANDING_BREAKPOINT}px)`).matches;
}

function applyLandingGridLayout(){
  if (!els.grid) return;
  const tiles = Array.from(els.grid.querySelectorAll(".tile"));
  if (tiles.length === 0) return;

  if (shouldUsePhoneLandingLayout()){
    const w = Math.max(0, window.innerWidth || document.documentElement.clientWidth || 0);
    const gridWidth = Math.max(0, Math.round(els.grid.getBoundingClientRect().width || 0)) || w;
    const colGap = 18;
    const tileSize = Math.min(200, Math.max(120, Math.floor((gridWidth - colGap) / 2) - 2));
    const rowSize = Math.round(tileSize * 1.08);

    els.grid.style.setProperty("grid-auto-flow", "row", "important");
    els.grid.style.setProperty("grid-template-columns", "repeat(2, 1fr)", "important");
    els.grid.style.setProperty("grid-auto-rows", `${rowSize}px`, "important");
    els.grid.style.setProperty("column-gap", `${colGap}px`, "important");
    els.grid.style.setProperty("row-gap", "0px", "important");
    els.grid.style.setProperty("justify-items", "center", "important");

    for (let idx = 0; idx < tiles.length; idx++){
      const tile = tiles[idx];
      const i = idx + 1;
      const block = Math.floor((i - 1) / 3);
      const pos = (i - 1) % 3;
      const pairRow = block * 2 + 1;
      const row = pos === 2 ? pairRow + 1 : pairRow;

      tile.style.gridRow = String(row);
      tile.style.gridColumn = pos === 0 ? "1" : pos === 1 ? "2" : "1 / -1";
      tile.style.justifySelf = pos === 2 ? "center" : "";
      tile.style.width = `${tileSize}px`;
    }
  } else {
    els.grid.style.removeProperty("grid-auto-flow");
    els.grid.style.removeProperty("grid-template-columns");
    els.grid.style.removeProperty("grid-auto-rows");
    els.grid.style.removeProperty("column-gap");
    els.grid.style.removeProperty("row-gap");
    els.grid.style.removeProperty("justify-items");
    for (const tile of tiles){
      tile.style.gridRow = "";
      tile.style.gridColumn = "";
      tile.style.justifySelf = "";
      tile.style.width = "";
    }
  }
}

function parsePdpHash(){
  const raw = String(window.location.hash || "").replace(/^#/, "");
  const m = raw.match(/(?:^|&)pdp=([^&]+)/);
  if (!m) return "";
  try {
    return decodeURIComponent(m[1] || "").trim();
  } catch {
    return String(m[1] || "").trim();
  }
}

function setPdpOpen(open){
  if (els.pdpPage) els.pdpPage.hidden = !open;
  if (els.landingView) els.landingView.hidden = open;
  document.body.classList.toggle("isPdpOpen", open);
}

function showPdpForProduct(productId){
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) {
    window.location.hash = "";
    return;
  }

  hydrateProductView(productId);
  setPdpOpen(true);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function hidePdp(){
  const wasOpen = !els.pdpPage?.hidden;
  activeProduct = null;
  setPdpOpen(false);
  if (wasOpen) window.scrollTo({ top: landingScrollY, behavior: "auto" });
}

function syncRouteFromLocation(){
  const productId = parsePdpHash();
  if (productId) showPdpForProduct(productId);
  else hidePdp();
}

function openProductPage(productId){
  landingScrollY = window.scrollY;
  window.location.hash = `pdp=${encodeURIComponent(productId)}`;
}

function money(n){
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

function cartMoney(n){
  const value = Number(n);
  if (!Number.isFinite(value)) return "0";

  const isInt = Math.abs(value - Math.round(value)) < 1e-9;
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: isInt ? 0 : 2,
    maximumFractionDigits: isInt ? 0 : 2,
  }).format(value);
}

function clampInt(n, fallback){
  const x = Number.parseInt(String(n), 10);
  return Number.isFinite(x) && x > 0 ? x : fallback;
}

function svgDataUri({ title, tint }){
  const safeTitle = (title || "Seeing Red").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ff4d4d"/>
        <stop offset="0.55" stop-color="${tint}"/>
        <stop offset="1" stop-color="#5c0014"/>
      </linearGradient>
      <radialGradient id="r" cx="28%" cy="26%" r="62%">
        <stop offset="0" stop-color="rgba(255,255,255,0.42)"/>
        <stop offset="1" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .10 0"/>
      </filter>
    </defs>
    <rect width="1200" height="1200" fill="url(#g)"/>
    <rect width="1200" height="1200" fill="url(#r)"/>
    <rect width="1200" height="1200" filter="url(#noise)" opacity="0.55"/>
    <g opacity="0.9">
      <text x="80" y="160" font-family="CA Prologue, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="54" fill="rgba(255,255,255,0.9)" font-weight="800">Seeing Red</text>
      <text x="80" y="220" font-family="CA Prologue, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="26" fill="rgba(255,255,255,0.78)">${safeTitle}</text>
    </g>
    <g opacity="0.18">
      <circle cx="960" cy="280" r="230" fill="rgba(255,255,255,0.8)"/>
      <circle cx="860" cy="940" r="320" fill="rgba(255,255,255,0.6)"/>
    </g>
  </svg>`;

  const encoded = encodeURIComponent(svg)
    .replace(/%0A/g, "")
    .replace(/%20/g, " ");
  return `data:image/svg+xml,${encoded}`;
}

function productImages(p){
  if (Array.isArray(p.images) && p.images.length > 0) return p.images.filter(Boolean);

  const media = PRODUCT_MEDIA[p.id];
  if (Array.isArray(media) && media.length > 0) return media.filter(Boolean);

  const tints = {
    Crimson: "#d1002c",
    Scarlet: "#ff2b2b",
    Ruby: "#b1002a",
    Burgundy: "#6f0019",
    Cherry: "#d11b3d",
    Vermilion: "#ff3b1f",
    Carmine: "#a30022",
    Rose: "#ff2b57",
    "Ox-blood": "#4f0011",
    Redline: "#ff2b2b",
  };

  const tint = tints[p.color] || "#ff2b2b";

  return [
    svgDataUri({ title: p.name, tint }),
    svgDataUri({ title: `${p.name} (Detail)`, tint }),
    svgDataUri({ title: `${p.name} (Back)`, tint }),
  ];
}

function getShopifyConfig(){
  const inline = globalThis.SEEING_RED_SHOPIFY || {};
  const domain = (
    inline.domain ||
    localStorage.getItem(SHOPIFY_DOMAIN_KEY) ||
    "seeing-red-2.myshopify.com"
  ).trim();
  const token = (
    inline.storefrontToken ||
    localStorage.getItem(SHOPIFY_TOKEN_KEY) ||
    ""
  ).trim();
  return { domain, token };
}

async function shopifyGraphQL({ domain, token, query, variables }){
  const url = `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables: variables || {} }),
  });

  const json = await res.json();
  if (!res.ok || json.errors){
    const err = json?.errors?.[0]?.message || `Shopify request failed (${res.status})`;
    throw new Error(err);
  }

  return json.data;
}

function toNumberAmount(amount){
  const n = Number.parseFloat(String(amount));
  return Number.isFinite(n) ? n : 0;
}

async function fetchAllShopifyProducts({ domain, token }){
  const query = `
    query Products($cursor: String) {
      products(first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            images(first: 10) {
              edges { node { url altText } }
            }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  selectedOptions { name value }
                }
              }
            }
          }
        }
      }
    }
  `;

  const out = [];
  let cursor = null;

  while (true){
    const data = await shopifyGraphQL({ domain, token, query, variables: { cursor } });
    const products = data?.products;
    const edges = products?.edges || [];

    for (const { node } of edges){
      const images = (node?.images?.edges || []).map((e) => e?.node?.url).filter(Boolean);
      const variants = (node?.variants?.edges || [])
        .map((e) => ({
          id: e?.node?.id || "",
          selectedOptions: Array.isArray(e?.node?.selectedOptions) ? e.node.selectedOptions : [],
        }))
        .filter((v) => v.id);

      out.push({
        id: node.handle || node.id,
        name: node.title,
        price: toNumberAmount(node?.priceRange?.minVariantPrice?.amount),
        desc: node.description || "",
        images,
        shopifyProductId: node.id,
        shopifyVariantId: variants?.[0]?.id || "",
        shopifyVariants: variants,
      });
    }

    if (!products?.pageInfo?.hasNextPage) break;
    cursor = products.pageInfo.endCursor;
    if (!cursor) break;
  }

  return out;
}

function normalizeOptionName(s){
  return String(s || "").trim().toLowerCase();
}

function findShopifyVariantIdForSize(product, size){
  const variants = Array.isArray(product?.shopifyVariants) ? product.shopifyVariants : [];
  if (variants.length === 0) return product?.shopifyVariantId || "";

  const wanted = String(size || "").trim();
  if (!wanted) return variants[0]?.id || product?.shopifyVariantId || "";

  for (const v of variants){
    const opts = Array.isArray(v?.selectedOptions) ? v.selectedOptions : [];
    const sizeOpt = opts.find((o) => normalizeOptionName(o?.name) === "size");
    if (!sizeOpt) continue;
    if (String(sizeOpt.value || "").trim() === wanted) return v.id;
  }

  return variants[0]?.id || product?.shopifyVariantId || "";
}

async function createShopifyCartAndRedirect({ lines }){
  const { domain, token } = getShopifyConfig();
  if (!token) throw new Error("Missing Shopify Storefront token.");
  if (!Array.isArray(lines) || lines.length === 0) throw new Error("Cart is empty.");

  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyGraphQL({
    domain,
    token,
    query,
    variables: { input: { lines } },
  });

  const errors = data?.cartCreate?.userErrors || [];
  if (errors.length > 0){
    throw new Error(errors[0]?.message || "Unable to create Shopify cart.");
  }

  const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl) throw new Error("Shopify did not return a checkout URL.");

  window.location.href = checkoutUrl;
}

function buildShopifyLinesFromCart(cart){
  const lines = [];
  for (const item of cart){
    const product = PRODUCTS.find((p) => p.id === item.productId);
    const merchandiseId =
      item.shopifyVariantId ||
      (product ? findShopifyVariantIdForSize(product, item.size) : "");

    if (!merchandiseId){
      throw new Error(`Missing Shopify variant for ${item.name}.`);
    }

    lines.push({
      merchandiseId,
      quantity: clampInt(item.qty, 1),
      attributes: item.size ? [{ key: "Size", value: String(item.size) }] : [],
    });
  }
  return lines;
}

function setLandingTilesFromProducts(products){
  const ids = products.map((p) => p.id).filter(Boolean);
  const tiles = [];
  const n = Math.max(0, ids.length);
  for (let i = 0; i < LANDING_TILE_COUNT; i++){
    tiles.push(ids[i % Math.max(1, n)]);
  }
  LANDING_TILES = tiles;
}

function renderGrid(){
  els.grid.innerHTML = "";

  for (const productId of LANDING_TILES){
    const p = PRODUCTS.find((x) => x.id === productId);
    if (!p) continue;
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.type = "button";
    btn.dataset.productId = p.id;
    btn.setAttribute("aria-label", `Open ${p.name}`);

    const diamond = document.createElement("div");
    diamond.className = "tile__diamond";

    const flip = document.createElement("div");
    flip.className = "tile__diamondFlip";

    const inner = document.createElement("div");
    inner.className = "tile__diamondInner";

    const front = document.createElement("div");
    front.className = "tile__diamondFace tile__diamondFace--front";

    const back = document.createElement("div");
    back.className = "tile__diamondFace tile__diamondFace--back";

    const backLogo = document.createElement("img");
    backLogo.className = "tile__diamondLogo";
    backLogo.src = "./assets/icon/logo.png";
    backLogo.alt = "Seeing Red";

    const img = document.createElement("div");
    img.className = "tile__img";
    const heroUrl = productImages(p)[0];
    img.style.backgroundImage = `url('${heroUrl}')`;

    const label = document.createElement("div");
    label.className = "tile__label";

    const name = document.createElement("div");
    name.className = "tile__name";
    name.textContent = p.name;

    label.appendChild(name);

    front.appendChild(img);
    front.appendChild(label);

    back.appendChild(backLogo);

    inner.appendChild(front);
    inner.appendChild(back);

    flip.appendChild(inner);
    diamond.appendChild(flip);
    btn.appendChild(diamond);

    btn.addEventListener("click", () => openProductPage(p.id));

    els.grid.appendChild(btn);
  }

  applyLandingGridLayout();
}

function buildSwipeCarousel(images, track){
  track.innerHTML = "";
  let current = 0;
  let startX = 0;
  let isDragging = false;
  let dragMoved = false;

  const slides = images.map((url, idx) => {
    const slide = document.createElement("div");
    slide.className = "swipeCarousel__slide" + (idx === 0 ? " isActive" : "");

    const diamond = document.createElement("div");
    diamond.className = "swipeCarousel__diamond";

    const img = document.createElement("img");
    img.src = url;
    img.alt = "";
    img.draggable = false;

    diamond.appendChild(img);
    slide.appendChild(diamond);
    track.appendChild(slide);
    return slide;
  });

  function goTo(idx){
    idx = Math.max(0, Math.min(images.length - 1, idx));
    slides[current].classList.remove("isActive");
    current = idx;
    slides[current].classList.add("isActive");
    const vw = window.innerWidth;
    const slideW = vw * 0.55;
    const offset = (vw / 2) - (slideW * current) - (slideW / 2);
    track.style.transform = `translateX(${offset}px)`;
  }

  requestAnimationFrame(() => goTo(0));

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(current), 100);
  });

  let isTouchActive = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    dragMoved = false;
    isTouchActive = true;
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    if (Math.abs(e.touches[0].clientX - startX) > 8) dragMoved = true;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    isTouchActive = false;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40){
      goTo(dx < 0 ? current + 1 : current - 1);
    } else if (!dragMoved){
      const tapX = e.changedTouches[0].clientX;
      goTo(tapX > window.innerWidth / 2 ? current + 1 : current - 1);
    } else {
      goTo(current);
    }
  });

  track.addEventListener("mousedown", (e) => {
    if (isTouchActive) return;
    startX = e.clientX;
    isDragging = true;
    dragMoved = false;
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging || isTouchActive) return;
    if (Math.abs(e.clientX - startX) > 8) dragMoved = true;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging || isTouchActive) return;
    isDragging = false;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40){
      goTo(dx < 0 ? current + 1 : current - 1);
    } else if (!dragMoved){
      goTo(e.clientX > window.innerWidth / 2 ? current + 1 : current - 1);
    } else {
      goTo(current);
    }
  });
}

function hydrateProductView(productId){
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) return;

  activeProduct = p;
  activeImages = productImages(p);

  els.productName.textContent = p.name;
  els.productPrice.textContent = money(p.price);
  els.productDesc.textContent = p.desc;

  if (els.productSize){
    const size = els.sizeSelect?.value || "M";
    els.productSize.textContent = `SIZE ${size}`;
  }

  els.mainImage.src = activeImages[0];
  els.mainImage.alt = p.name;

  els.thumbs.innerHTML = "";
  activeImages.forEach((url, idx) => {
    const t = document.createElement("button");
    t.type = "button";
    t.className = "thumb";
    t.setAttribute("aria-label", `View image ${idx + 1}`);

    const img = document.createElement("img");
    img.src = url;
    img.alt = "";

    t.appendChild(img);
    t.addEventListener("click", () => {
      els.mainImage.src = url;
    });

    els.thumbs.appendChild(t);
  });

  const swipeTrack = document.getElementById("swipeTrack");
  if (swipeTrack) buildSwipeCarousel(activeImages, swipeTrack);

  els.qtyInput.value = "1";
}

function loadCart(){
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartCount(cart){
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal(cart){
  return cart.reduce((sum, item) => sum + item.qty * item.price, 0);
}

function addItemToCart({ product, size, qty }){
  const cart = loadCart();
  const key = `${product.id}::${size}`;

  const existing = cart.find((x) => x.key === key);
  if (existing){
    existing.qty += qty;
  } else {
    const merchandiseId = findShopifyVariantIdForSize(product, size);
    cart.push({
      key,
      productId: product.id,
      name: product.name,
      size,
      price: product.price,
      qty,
      image: productImages(product)[0],
      shopifyVariantId: merchandiseId,
    });
  }

  saveCart(cart);
  renderCart();
}

function setCartOpen(open){
  if (open){
    els.cart.classList.add("isOpen");
    els.drawerScrim.classList.add("isOpen");
    els.cart.setAttribute("aria-hidden", "false");
    els.drawerScrim.setAttribute("aria-hidden", "false");
    els.cartBtn.style.display = "none";
  } else {
    els.cart.classList.remove("isOpen");
    els.drawerScrim.classList.remove("isOpen");
    els.cart.setAttribute("aria-hidden", "true");
    els.drawerScrim.setAttribute("aria-hidden", "true");
    els.cartBtn.style.display = "";
  }
}

function updateCartItem(key, delta){
  const cart = loadCart();
  const item = cart.find((x) => x.key === key);
  if (!item) return;

  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
  renderCart();
}

function removeCartItem(key){
  const cart = loadCart().filter((x) => x.key !== key);
  saveCart(cart);
  renderCart();
}

function renderCart(){
  const cart = loadCart();

  const count = cartCount(cart);
  els.cartCount.textContent = String(count);
  if (els.pdpCartCount) els.pdpCartCount.textContent = String(count);
  if (els.cartHeaderCount) els.cartHeaderCount.textContent = String(count);
  els.cartSubtotal.textContent = cartMoney(cartSubtotal(cart));

  if (!els.cart.classList.contains("isOpen")) els.cartBtn.style.display = "";
  if (count <= 0 && els.cart.classList.contains("isOpen")) setCartOpen(false);

  els.cartItems.innerHTML = "";

  if (cart.length === 0){
    const empty = document.createElement("div");
    empty.style.padding = "14px";
    empty.style.color = "rgba(0,0,0,0.62)";
    empty.textContent = "Your cart is empty.";
    els.cartItems.appendChild(empty);
    return;
  }

  for (const item of cart){
    const product = PRODUCTS.find((p) => p.id === item.productId);
    const colorLabel = String(product?.color || "Red").trim() || "Red";

    const row = document.createElement("div");
    row.className = "cartItem";

    const media = document.createElement("div");
    media.className = "cartItem__media";

    const diamond = document.createElement("div");
    diamond.className = "cartItem__diamond";

    const img = document.createElement("img");
    img.className = "cartItem__diamondImg";
    img.src = item.image;
    img.alt = "";

    diamond.appendChild(img);
    media.appendChild(diamond);

    const body = document.createElement("div");
    body.className = "cartItem__body";

    const name = document.createElement("div");
    name.className = "cartItem__name";
    name.textContent = String(item.name || "").toUpperCase();

    const opts = document.createElement("div");
    opts.className = "cartItem__opts";

    const colour = document.createElement("div");
    colour.className = "cartItem__opt";
    colour.textContent = "Colour —";

    const colourValue = document.createElement("span");
    colourValue.className = "cartItem__optValue";
    colourValue.textContent = ` ${colorLabel}`;

    colour.appendChild(colourValue);

    const size = document.createElement("div");
    size.className = "cartItem__opt";
    size.textContent = "Size —";

    const sizeValue = document.createElement("span");
    sizeValue.className = "cartItem__optValue";
    sizeValue.textContent = ` ${item.size}`;

    size.appendChild(sizeValue);

    opts.appendChild(colour);
    opts.appendChild(size);

    const bottom = document.createElement("div");
    bottom.className = "cartItem__bottom";

    const qtyControls = document.createElement("div");
    qtyControls.className = "cartQty";

    const minus = document.createElement("button");
    minus.className = "cartQty__btn";
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", "Decrease quantity");
    minus.addEventListener("click", () => updateCartItem(item.key, -1));

    const qty = document.createElement("div");
    qty.className = "cartQty__value";
    qty.textContent = String(item.qty);

    const plus = document.createElement("button");
    plus.className = "cartQty__btn";
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", "Increase quantity");
    plus.addEventListener("click", () => updateCartItem(item.key, +1));

    qtyControls.appendChild(minus);
    qtyControls.appendChild(qty);
    qtyControls.appendChild(plus);

    const del = document.createElement("button");
    del.className = "cartItem__delete";
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", () => removeCartItem(item.key));

    bottom.appendChild(qtyControls);
    bottom.appendChild(del);

    body.appendChild(name);
    body.appendChild(opts);
    body.appendChild(bottom);

    row.appendChild(media);
    row.appendChild(body);

    els.cartItems.appendChild(row);
  }
}

function wireEvents(){
  if (els.pdpBack){
    els.pdpBack.addEventListener("click", () => {
      window.location.hash = "";
    });
  }

  if (els.pdpCartBtn){
    els.pdpCartBtn.addEventListener("click", () => setCartOpen(true));
  }

  if (els.sizeSelect && els.productSize){
    els.sizeSelect.addEventListener("change", () => {
      els.productSize.textContent = `SIZE ${els.sizeSelect.value}`;
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape"){
      if (els.cart.classList.contains("isOpen")) setCartOpen(false);
      else if (!els.pdpPage?.hidden) window.location.hash = "";
    }
  });

  els.addToCart.addEventListener("click", () => {
    if (!activeProduct) return;

    const size = els.sizeSelect.value;
    const qty = clampInt(els.qtyInput.value, 1);

    addItemToCart({ product: activeProduct, size, qty });
    setCartOpen(true);
  });

  els.buyNow.addEventListener("click", async () => {
    if (!activeProduct) return;

    try {
      const size = els.sizeSelect.value;
      const qty = clampInt(els.qtyInput.value, 1);
      const merchandiseId = findShopifyVariantIdForSize(activeProduct, size);
      if (!merchandiseId) throw new Error("This product is not connected to a Shopify variant.");

      els.buyNow.disabled = true;
      els.buyNow.textContent = "Redirecting…";

      await createShopifyCartAndRedirect({
        lines: [
          {
            merchandiseId,
            quantity: qty,
            attributes: size ? [{ key: "Size", value: String(size) }] : [],
          },
        ],
      });
    } catch (e){
      alert(e?.message || "Unable to start Shopify checkout.");
    } finally {
      els.buyNow.disabled = false;
      els.buyNow.textContent = "Buy now";
    }
  });

  els.cartBtn.addEventListener("click", () => setCartOpen(true));
  els.closeCart.addEventListener("click", () => setCartOpen(false));
  els.drawerScrim.addEventListener("click", () => setCartOpen(false));

  els.checkout.addEventListener("click", async () => {
    const cart = loadCart();
    if (cart.length === 0) return;

    try {
      const lines = buildShopifyLinesFromCart(cart);
      els.checkout.disabled = true;
      els.checkout.textContent = "REDIRECTING…";
      await createShopifyCartAndRedirect({ lines });
    } catch (e){
      alert(e?.message || "Unable to start Shopify checkout.");
    } finally {
      els.checkout.disabled = false;
      els.checkout.textContent = "CHECKOUT";
    }
  });

  window.addEventListener("hashchange", syncRouteFromLocation);

  window.addEventListener("resize", () => {
    applyLandingGridLayout();
  });
}

function init(){
  (async () => {
    try {
      const cfg = getShopifyConfig();
      if (cfg.token){
        const shopifyProducts = await fetchAllShopifyProducts(cfg);
        if (Array.isArray(shopifyProducts) && shopifyProducts.length > 0){
          PRODUCTS = shopifyProducts;
          setLandingTilesFromProducts(PRODUCTS);
        }
      }
    } catch (e){
      console.warn("Shopify fetch failed; using local products.", e);
    }

    renderGrid();
    renderCart();
    wireEvents();
    syncRouteFromLocation();
  })();
}

init();
