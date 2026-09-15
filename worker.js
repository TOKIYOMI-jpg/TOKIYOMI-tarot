const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/TOKIYOMI-jpg/TOKIYOMI-tarot/main/";

const VIDEO_BASE_URL =
  "https://raw.githubusercontent.com/TOKIYOMI-jpg/TOKIYOMI-tarot/main/";

// 同名動画をGitHubで差し替えた際のキャッシュ回避用。
// 動画を更新したときは、この文字列だけ変更すれば強制的に新しい動画を読み込みます。
const VIDEO_VERSION = "20260915-1";

function videoUrl(filename) {
  return `${VIDEO_BASE_URL}${filename}?v=${VIDEO_VERSION}`;
}

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
  "今のあなた",
  "心の奥にある本音",
  "今のあなたを支えているもの",
  "今のブレーキ",
  "避けたい未来・アンチビジョン",
  "望む未来",
  "未来を選ぶための次の一手",
]);

const COMPANION_ROLES = Object.freeze([
  "前回からの変化",
  "今、見えにくくなっていること",
  "次回までの一手",
]);

const COMPANION_FINAL_ROLES = Object.freeze([
  "伴走前から変わったこと",
  "これから大切にする自分の軸",
  "明日へ残す次の一手",
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
      （体験版は3枚・正位置・重複なし、深読み版は7枚・正逆ランダム・重複なし）
      のみを受け取ります。
      相談内容、氏名、メールアドレス、住所、決済情報などの個人情報を
      本APIへ送信する設計にはなっていません。
    </p>

    <h2>2．利用目的</h2>
    <p>
      受け取った抽選条件は、78枚のタロットカードから、
      体験版では3枚、深読み版では7枚を無作為かつ重複なしで選び、
      カード名、表示順、役割、正逆の指定およびカード画像URLを
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
      カード画像およびカード開示動画の配信元としてGitHubを使用しています。
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

  return Response.redirect(videoUrl(filename), 302);
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
  position:absolute;
  left:50%;
  top:0;
  width:auto;
  height:100%;
  max-width:none;
  object-fit:contain;
  background:transparent;
  transform-origin:left center;
  opacity:1;
}
.card.turning{
  display:block;
}
.card.show{
  display:block;
  transform:translateX(-50%);
}
.stage video{
  position:absolute;
  inset:0;
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
  start.hidden=true;

  card.classList.remove("show");
  card.classList.add("turning");

  const duration=1350;
  const started=performance.now();

  function frame(now){
    const t=Math.min(1,(now-started)/duration);
    const e=t*t*(3-2*t);
    const widthRatio=0.035+0.965*Math.sin(e*Math.PI/2);
    const rightScale=0.72+0.28*e;

    const inset=((1-rightScale)*50).toFixed(3);
    card.style.transform=
      `translateX(-50%) scaleX(${widthRatio.toFixed(5)})`;
    card.style.clipPath=
      `polygon(0 0,100% ${inset}%,100% ${100-inset}%,0 100%)`;

    if(t<1){
      requestAnimationFrame(frame);
    }else{
      card.classList.remove("turning");
      card.classList.add("show");
      card.style.transform="translateX(-50%) scaleX(1)";
      card.style.clipPath="none";
      status.textContent=${JSON.stringify(`${position}枚目「${card[0]}」`)};
    }
  }

  requestAnimationFrame(frame);
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

async function handleDraw() {
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

  const selectedIds =
    drawUniqueCardIds(7);

  const cards =
    selectedIds.map(
      (id, index) => ({
        position: index + 1,
        role: DEEP_ROLES[index],
        ...cardToResponse(id),
        orientation:
          secureRandomInt(2) === 0
            ? "upright"
            : "reversed",
        reveal_url:
          `${origin}/reveal?card=${encodeURIComponent(id)}&position=${index + 1}`,
      })
    );

  return jsonResponse(
    {
      draw_id: crypto.randomUUID(),
      mode: "deep",
      count: 7,
      orientation: "random",
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

async function handleCompanionDraw(request, isFinal = false) {
  const origin =
    new URL(request.url).origin;

  const roles =
    isFinal ? COMPANION_FINAL_ROLES : COMPANION_ROLES;

  const selectedIds =
    drawUniqueCardIds(3);

  const cards =
    selectedIds.map(
      (id, index) => ({
        position: index + 1,
        role: roles[index],
        ...cardToResponse(id),
        orientation:
          secureRandomInt(2) === 0
            ? "upright"
            : "reversed",
        reveal_url:
          `${origin}/reveal?card=${encodeURIComponent(id)}&position=${index + 1}`,
      })
    );

  return jsonResponse(
    {
      draw_id: crypto.randomUUID(),
      mode: isFinal ? "companion_final" : "companion",
      count: 3,
      orientation: "random",
      unique: true,

      video: {
        first_card_url:
          `${origin}/media/first-card.mp4`,

        draw_card_url:
          `${origin}/media/next-card.mp4`,

        playback_rule:
          "each session position 1: first_card_url then draw_card_url; positions 2-3: draw_card_url only",
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

    if (
      pathname === "/draw/companion" &&
      request.method === "POST"
    ) {
      return handleCompanionDraw(request, false);
    }

    if (
      pathname === "/draw/companion/final" &&
      request.method === "POST"
    ) {
      return handleCompanionDraw(request, true);
    }

    return jsonResponse(
      {
        error: "Not found",
      },
      404
    );
  },
};