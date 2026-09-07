const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/TOKIYOMI-jpg/TOKIYOMI-tarot/main/";

const MAJOR_ARCANA = {
  "00": ["愚者", "The Fool", "00_The_Fool.png"],
  "01": ["魔術師", "The Magician", "01_The_Magician.png"],
  "02": ["女教皇", "The High Priestess", "02_The_High_Priestess.png"],
  "03": ["女帝", "The Empress", "03_The_Empress.png"],
  "04": ["皇帝", "The Emperor", "04_The_Emperor.png"],
  "05": ["教皇", "The Hierophant", "05_The_Hierophant.png"],
  "06": ["恋人", "The Lovers", "06_The_Lovers.png"],
  "07": ["戦車", "The Chariot", "07_The_Chariot.png"],
  "08": ["力", "Strength", "08_Strength.png"],
  "09": ["隠者", "The Hermit", "09_The_Hermit.png"],
  "10": ["運命の輪", "Wheel of Fortune", "10_Wheel_of_Fortune.png"],
  "11": ["正義", "Justice", "11_Justice.png"],
  "12": ["吊るされた男", "The Hanged Man", "12_The_Hanged_Man.png"],
  "13": ["死神", "Death", "13_Death.png"],
  "14": ["節制", "Temperance", "14_Temperance.png"],
  "15": ["悪魔", "The Devil", "15_The_Devil.png"],
  "16": ["塔", "The Tower", "16_The_Tower.png"],
  "17": ["星", "The Star", "17_The_Star.png"],
  "18": ["月", "The Moon", "18_The_Moon.png"],
  "19": ["太陽", "The Sun", "19_The_Sun.png"],
  "20": ["審判", "Judgement", "20_Judgement.png"],
  "21": ["世界", "The World", "21_The_World.png"],
};

const SUITS = [
  ["Wands", "棒"],
  ["Cups", "聖杯"],
  ["Swords", "剣"],
  ["Pentacles", "金貨"],
];

const RANKS = [
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Page",
  "Knight",
  "Queen",
  "King",
];

function buildCards() {
  const cards = { ...MAJOR_ARCANA };

  for (const [suitCode, suitJa] of SUITS) {
    RANKS.forEach((rank, index) => {
      const number = String(index + 1).padStart(2, "0");
      const id = `${suitCode}_${number}`;

      cards[id] = [
        `${suitJa} ${rank}`,
        `${suitCode} ${rank}`,
        `${id}_${rank}.png`,
      ];
    });
  }

  if (Object.keys(cards).length !== 78) {
    throw new Error("The tarot deck must contain exactly 78 cards.");
  }

  return Object.freeze(cards);
}

const CARDS = buildCards();
const CARD_IDS = Object.freeze(Object.keys(CARDS));

const DEEP_ROLES = Object.freeze([
  "現在地",
  "Aの初動",
  "Aの展開",
  "Aの到達傾向",
  "Bの初動",
  "Bの展開",
  "Bの到達傾向",
]);

const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, HEAD, OPTIONS",
  "access-control-allow-headers": "content-type, range",
  "access-control-expose-headers":
    "content-length, content-range, accept-ranges, etag",
};

const PRIVACY_POLICY_HTML = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TOKIYOMI タロット抽選API プライバシーポリシー</title>
  <style>
    body {
      max-width: 760px;
      margin: 0 auto;
      padding: 32px 20px 64px;
      color: #26231f;
      background: #faf8f3;
      font-family: system-ui, sans-serif;
      line-height: 1.8;
    }
    h1 {
      font-size: 1.65rem;
      line-height: 1.4;
    }
    h2 {
      margin-top: 2rem;
      font-size: 1.15rem;
    }
    a {
      color: #795b22;
    }
    .updated {
      color: #6b665e;
    }
  </style>
</head>
<body>
  <main>
    <h1>TOKIYOMI タロット抽選API<br>プライバシーポリシー</h1>
    <p class="updated">最終更新日：2026年9月8日</p>

    <p>
      本ポリシーは、カスタムGPT「時を詠む。TOKIYOMI（時詠）」が利用する
      タロット抽選API（以下「本API」）に適用されます。
    </p>

    <h2>1．本APIが受け取る情報</h2>
    <p>
      本APIは、カード抽選に必要な条件
      （体験版は3枚、深読み版は7枚、いずれも正位置・重複なし）
      のみを受け取ります。
      相談内容、氏名、メールアドレス、住所、決済情報などの個人情報を
      本APIへ送信する設計にはなっていません。
    </p>

    <h2>2．利用目的</h2>
    <p>
      受け取った抽選条件は、78枚のタロットカードから、
      体験版では3枚、深読み版では7枚を無作為かつ重複なしで選び、
      カード名、表示順、役割、正位置の指定およびカード画像URLを
      返すためにのみ使用します。
    </p>

    <h2>3．保存</h2>
    <p>
      本APIのアプリケーションコードは、
      相談内容、抽選結果、利用者を識別する情報を
      データベースへ保存しません。
    </p>

    <h2>4．外部サービス</h2>
    <p>
      本APIの提供にはCloudflareを使用し、
      カード画像の配信元としてGitHub、
      カード開示動画の保存先としてCloudflare R2を使用しています。
    </p>

    <h2>5．Cookieおよび広告</h2>
    <p>
      本APIは、独自のCookie、広告配信または行動追跡機能を使用しません。
    </p>
  </main>
</body>
</html>`;

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

function privacyPolicyResponse(headOnly = false) {
  return new Response(headOnly ? null : PRIVACY_POLICY_HTML, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "public, max-age=3600",
      ...CORS_HEADERS,
    },
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseSingleRange(rangeHeader, size) {
  if (!rangeHeader || !rangeHeader.startsWith("bytes=")) {
    return null;
  }

  const raw = rangeHeader.slice(6).trim();

  if (raw.includes(",")) {
    return { invalid: true };
  }

  const [startRaw, endRaw] = raw.split("-");

  let start;
  let end;

  if (startRaw === "") {
    const suffixLength = Number(endRaw);

    if (!Number.isInteger(suffixLength) || suffixLength <= 0) {
      return { invalid: true };
    }

    if (suffixLength >= size) {
      start = 0;
    } else {
      start = size - suffixLength;
    }

    end = size - 1;
  } else {
    start = Number(startRaw);

    if (!Number.isInteger(start) || start < 0 || start >= size) {
      return { invalid: true };
    }

    if (endRaw === "") {
      end = size - 1;
    } else {
      end = Number(endRaw);

      if (!Number.isInteger(end) || end < start) {
        return { invalid: true };
      }

      end = Math.min(end, size - 1);
    }
  }

  return {
    start,
    end,
    length: end - start + 1,
  };
}

async function handleMedia(pathname, request, env) {
  const filename =
    pathname === "/media/first-card.mp4"
      ? "first-card.mp4"
      : pathname === "/media/next-card.mp4"
        ? "next-card.mp4"
        : null;

  if (!filename) {
    return jsonResponse({ error: "Not found" }, 404);
  }

  if (!env.MEDIA) {
    return jsonResponse(
      { error: "R2 binding MEDIA is not configured" },
      500
    );
  }

  const metadata = await env.MEDIA.head(filename);

  if (!metadata) {
    return jsonResponse(
      {
        error: "Video not found in R2",
        filename,
      },
      404
    );
  }

  const size = metadata.size;
  const rangeHeader = request.headers.get("range");
  const range = parseSingleRange(rangeHeader, size);

  const commonHeaders = {
    "content-type":
      metadata.httpMetadata?.contentType || "video/mp4",
    "accept-ranges": "bytes",
    "cache-control": "public, max-age=3600",
    "access-control-allow-origin": "*",
    "access-control-expose-headers":
      "content-length, content-range, accept-ranges, etag",
    "content-disposition": `inline; filename="${filename}"`,
  };

  if (metadata.etag) {
    commonHeaders.etag = metadata.etag;
  }

  if (request.method === "HEAD") {
    return new Response(null, {
      status: 200,
      headers: {
        ...commonHeaders,
        "content-length": String(size),
      },
    });
  }

  if (range?.invalid) {
    return new Response(null, {
      status: 416,
      headers: {
        ...commonHeaders,
        "content-range": `bytes */${size}`,
      },
    });
  }

  if (range) {
    const object = await env.MEDIA.get(filename, {
      range: {
        offset: range.start,
        length: range.length,
      },
    });

    if (!object || !object.body) {
      return jsonResponse(
        { error: "Unable to read requested video range" },
        500
      );
    }

    return new Response(object.body, {
      status: 206,
      headers: {
        ...commonHeaders,
        "content-length": String(range.length),
        "content-range":
          `bytes ${range.start}-${range.end}/${size}`,
      },
    });
  }

  const object = await env.MEDIA.get(filename);

  if (!object || !object.body) {
    return jsonResponse(
      { error: "Unable to read video" },
      500
    );
  }

  return new Response(object.body, {
    status: 200,
    headers: {
      ...commonHeaders,
      "content-length": String(size),
    },
  });
}

function revealPageResponse(url) {
  const cardId = url.searchParams.get("card") || "";
  const position = Number(url.searchParams.get("position"));
  const card = CARDS[cardId];

  if (
    !card ||
    !Number.isInteger(position) ||
    position < 1 ||
    position > 7
  ) {
    return new Response("Invalid reveal parameters", {
      status: 400,
      headers: {
        "content-type": "text/plain; charset=UTF-8",
      },
    });
  }

  const imageUrl = IMAGE_BASE_URL + card[2];

  const firstVideo =
    position === 1
      ? "/media/first-card.mp4"
      : null;

  const nextVideo =
    "/media/next-card.mp4";

  const sequence =
    firstVideo
      ? [firstVideo, nextVideo]
      : [nextVideo];

  const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TOKIYOMI</title>
<style>
:root{color-scheme:dark}
*{box-sizing:border-box}
body{
  margin:0;
  background:#05070a;
  color:#f4ead5;
  font-family:system-ui,sans-serif;
  min-height:100vh;
  display:grid;
  place-items:center
}
main{
  width:min(100%,760px);
  padding:16px;
  text-align:center
}
.stage{
  position:relative;
  aspect-ratio:16/9;
  background:#000;
  border:1px solid #5c492b;
  overflow:hidden;
  border-radius:14px
}
video,.card{
  width:100%;
  height:100%;
  object-fit:contain;
  background:#000
}
.card{
  display:none;
  opacity:0;
  transition:opacity .8s ease
}
.card.show{
  display:block;
  opacity:1
}
.status{
  margin-top:12px;
  font-size:14px;
  opacity:.85
}
.start{
  margin-top:14px;
  padding:11px 18px;
  border-radius:999px;
  border:1px solid #8d7344;
  background:#17130d;
  color:#f4ead5;
  font-size:16px;
  cursor:pointer
}
.start[hidden]{
  display:none
}
</style>
</head>
<body>
<main>

<div class="stage">
  <video
    id="ritual"
    muted
    playsinline
    preload="metadata">
  </video>

  <img
    id="card"
    class="card"
    src="${escapeHtml(imageUrl)}"
    alt="${escapeHtml(card[0])}">
</div>

<div id="status" class="status">
カードを開示しています…
</div>

<button
  id="start"
  class="start"
  type="button"
  hidden>
演出を開始
</button>

</main>

<script>
const sequence=${JSON.stringify(sequence)};
let index=0;

const video=document.getElementById("ritual");
const card=document.getElementById("card");
const status=document.getElementById("status");
const start=document.getElementById("start");

function reveal(){
  video.pause();
  video.style.display="none";
  card.classList.add("show");
  status.textContent=${JSON.stringify(`${position}枚目「${card[0]}」`)};
  start.hidden=true;
}

function playCurrent(){
  if(index>=sequence.length){
    reveal();
    return;
  }

  video.pause();
  video.removeAttribute("src");
  video.load();

  video.src=sequence[index];
  video.style.display="block";
  video.load();

  video.play()
    .then(()=>{
      start.hidden=true;
    })
    .catch(()=>{
      start.hidden=false;
      status.textContent="演出を開始してください";
    });
}

video.addEventListener("ended",()=>{
  index+=1;
  playCurrent();
});

video.addEventListener("error",()=>{
  index+=1;
  playCurrent();
});

start.addEventListener("click",()=>{
  playCurrent();
});

playCurrent();
</script>

</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
    },
  });
}

function cardToResponse(id) {
  const card = CARDS[id];

  return {
    id,
    name_ja: card[0],
    name_en: card[1],
    image_url: IMAGE_BASE_URL + card[2],
  };
}

function secureRandomInt(maxExclusive) {
  if (
    !Number.isInteger(maxExclusive) ||
    maxExclusive <= 0
  ) {
    throw new RangeError(
      "maxExclusive must be a positive integer."
    );
  }

  const range = 0x100000000;
  const limit = range - (range % maxExclusive);
  const buffer = new Uint32Array(1);

  let value;

  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);

  return value % maxExclusive;
}

function drawUniqueCardIds(count) {
  const pool = [...CARD_IDS];

  for (let i = 0; i < count; i += 1) {
    const swapIndex =
      i + secureRandomInt(pool.length - i);

    [pool[i], pool[swapIndex]] =
      [pool[swapIndex], pool[i]];
  }

  return pool.slice(0, count);
}

function handleGetCard(url) {
  const id =
    url.searchParams.get("id") || "00";

  if (!CARDS[id]) {
    return jsonResponse(
      {
        error: "Card not found",
        requested_id: id,
      },
      404
    );
  }

  return jsonResponse(cardToResponse(id));
}

async function handleDraw(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        error: "Invalid JSON body",
        expected: {
          count: 3,
          orientation: "upright",
          unique: true,
        },
      },
      400,
      {
        "cache-control": "no-store",
      }
    );
  }

  if (
    body === null ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    body.count !== 3 ||
    body.orientation !== "upright" ||
    body.unique !== true
  ) {
    return jsonResponse(
      {
        error: "Unsupported draw settings",
        expected: {
          count: 3,
          orientation: "upright",
          unique: true,
        },
      },
      400,
      {
        "cache-control": "no-store",
      }
    );
  }

  const selectedIds = drawUniqueCardIds(3);

  const cards = selectedIds.map(
    (id, index) => ({
      position: index + 1,
      ...cardToResponse(id),
      orientation: "upright",
    })
  );

  return jsonResponse(
    {
      draw_id: crypto.randomUUID(),
      count: 3,
      orientation: "upright",
      unique: true,
      cards,
    },
    200,
    {
      "cache-control": "no-store",
    }
  );
}

async function handleDeepDraw(request) {
  const origin =
    new URL(request.url).origin;

  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        error: "Invalid JSON body",
        expected: {
          count: 7,
          orientation: "upright",
          unique: true,
        },
      },
      400,
      {
        "cache-control": "no-store",
      }
    );
  }

  if (
    body === null ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    body.count !== 7 ||
    body.orientation !== "upright" ||
    body.unique !== true
  ) {
    return jsonResponse(
      {
        error: "Unsupported deep draw settings",
        expected: {
          count: 7,
          orientation: "upright",
          unique: true,
        },
      },
      400,
      {
        "cache-control": "no-store",
      }
    );
  }

  const selectedIds =
    drawUniqueCardIds(7);

  const cards =
    selectedIds.map(
      (id, index) => ({
        position: index + 1,
        role: DEEP_ROLES[index],
        ...cardToResponse(id),
        orientation: "upright",
        reveal_url:
          `${origin}/reveal?card=${encodeURIComponent(id)}&position=${index + 1}`,
      })
    );

  return jsonResponse(
    {
      draw_id: crypto.randomUUID(),
      mode: "deep",
      count: 7,
      orientation: "upright",
      unique: true,

      video: {
        first_card_url:
          `${origin}/media/first-card.mp4`,

        draw_card_url:
          `${origin}/media/next-card.mp4`,

        playback_rule:
          "position 1: first_card_url then draw_card_url; positions 2-7: draw_card_url only",
      },

      cards,
    },
    200,
    {
      "cache-control": "no-store",
    }
  );
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    const url =
      new URL(request.url);

    const pathname =
      url.pathname.replace(/\/+$/, "") || "/";

    if (
      pathname === "/privacy" &&
      (
        request.method === "GET" ||
        request.method === "HEAD"
      )
    ) {
      return privacyPolicyResponse(
        request.method === "HEAD"
      );
    }

    if (
      pathname === "/reveal" &&
      request.method === "GET"
    ) {
      return revealPageResponse(url);
    }

    if (
      (
        pathname === "/media/first-card.mp4" ||
        pathname === "/media/next-card.mp4"
      ) &&
      (
        request.method === "GET" ||
        request.method === "HEAD"
      )
    ) {
      return handleMedia(
        pathname,
        request,
        env
      );
    }

    if (
      pathname === "/" &&
      request.method === "GET"
    ) {
      return handleGetCard(url);
    }

    if (
      pathname === "/draw" &&
      request.method === "POST"
    ) {
      return handleDraw(request);
    }

    if (
      pathname === "/draw/deep" &&
      request.method === "POST"
    ) {
      return handleDeepDraw(request);
    }

    return jsonResponse(
      {
        error: "Not found",
      },
      404
    );
  },
};
