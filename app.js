const KEY = "for-you-letter-hinglish-v2";

const QUOTES = [
  {
    text: "Tumhare bina meri duniya adhoori si lagti hai — jaise koi geet beech mein ruk gaya ho.",
    by: "Dil se",
    work: "Roz ke alfaz",
  },
  {
    text: "Main tumse itna pyar karta hoon ki kabhi-kabhi words kam pad jaate hain. Bas dil full rehta hai.",
    by: "Dil se",
    work: "Chupke se",
  },
  {
    text: "Tum mere sukoon ho. Mere favourites mein sabse upar. Mere kal ki sabse soft si umeed.",
    by: "Dil se",
    work: "Tumhare naam",
  },
  {
    text: "Agar pyar ek ghar hota, toh main tumhare andar rehna chahta — safe, warm, hamesha.",
    by: "Dil se",
    work: "Ghar",
  },
  {
    text: "Tum has deti ho, aur mera saara thakaan halka ho jata hai. Itna simple, itna gehra.",
    by: "Dil se",
    work: "Tumhari hasi",
  },
  {
    text: "Main tumhe choose karta hoon — aaj, kal, aur us din bhi jab zindagi thodi mushkil ho.",
    by: "Dil se",
    work: "Wada",
  },
];

const DEFAULT_LETTER = {
  herName: "Alfina",
  hisName: "Rahil",
  dedication: "Read it when you miss me.",
  paragraphs: [
    "Main itne din se yeh soch raha tha ki tumhe kya likhun. Shayari lagti, toh jhooth lagti. Seedha keh dun, toh kam pad jata. Toh aaj bas woh keh raha hoon jo raat ko bhi dil mein ghoomta rehta hai — main tumse pyar karta hoon. Bilkul, poori tarah se.",
    "Tumhari hasi sunte hi meri saans ruk jaati hai. Tumhare messages pe smile aa jaati hai, chahe din kitna bhi bhari ho. Main tumhe un chhote moments mein yaad karta hoon — chai banate hue, road pe chalte hue, bilkul aise hi. Jaise dil ne tumhe apna ghar bana liya ho.",
    "Tumhare saath main alag sa hoon. Soft. Safe. Khud pe bhi thoda zyada honest. Tumne mujhe sikhaya ki pyar sirf kehna nahi hota — rehna hota hai, sunna hota hai, chhupke care karna hota hai. Main har roz thoda aur tumhara ho raha hoon, aur yeh feeling mujhe darrati nahi… sukoon deti hai.",
    "Agar tum yeh padh rahi ho, toh jaan lo — main sirf aaj nahi, kal bhi, mushkil dinon mein bhi, tumhare saath rehna chahta hoon. Na koi drama, na koi show. Bas tum, main, aur woh quiet wala pyar jo roz bada hota hai. Meri jaan, tum meri favourite baat ho is zindagi ki.",
  ],
  notes: [
    {
      id: "tuesday",
      kicker: "Tumhari yaad",
      body: "Kabhi-kabhi beech kaam mein tumhari yaad aa jaati hai — itni soft, itni warm — jaise koi haath se kandha daba de. Us moment pe bas smile aa jaati hai.",
    },
    {
      id: "laugh",
      kicker: "Tumhari hasi",
      body: "Tumhari hasi meri favourite sound hai. Usse sunke lagta hai duniya thodi soft ho gayi, aur main bilkul theek jagah pe hoon.",
    },
    {
      id: "home",
      kicker: "Tum = ghar",
      body: "Ghar address nahi hai. Ghar woh feeling hai jo tumhari awaaz se aati hai. Jab tum hoti ho, main pehle se halka ho jata hoon.",
    },
    {
      id: "long-way",
      kicker: "Thodi der aur",
      body: "Main kahi bhi late ho jaun, bas tumhare saath thodi der aur rehna chahta hoon. Time tumhare paas slow chalna chahiye.",
    },
    {
      id: "learning",
      kicker: "Har din naya",
      body: "Main tumhe abhi bhi discover kar raha hoon — tumhari chhoti aadatein, tumhara mood, tumhara dil. Aur har nayi baat pe thoda zyada pyar ho jata hai.",
    },
    {
      id: "thanks",
      kicker: "Bas itna",
      body: "Shukriya… mere dil mein itni jagah banane ke liye. Main chahta hoon hum aise hi ordinary, pyare dinon mein budhe ho jayein.",
    },
  ],
  reasons: [
    "Tumhari awaaz sunke dil shaant ho jata hai",
    "Tumhare saath main khud ban sakta hoon",
    "Tumhari chhoti si care bhi badi lagti hai",
    "Tum has deti ho, toh mera din ban jata hai",
    "Tumhare bina future sochna mushkil hai",
    "Tum ho, isliye pyar asaan lagta hai",
  ],
};

function isNote(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    typeof value.kicker === "string" &&
    typeof value.body === "string"
  );
}

function loadLetter() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.paragraphs) || !Array.isArray(parsed.notes) || !Array.isArray(parsed.reasons)) {
      return null;
    }
    const paragraphs = parsed.paragraphs.filter((p) => typeof p === "string");
    const notes = parsed.notes.filter(isNote);
    const reasons = parsed.reasons.filter((r) => typeof r === "string");
    if (!paragraphs.length || !notes.length || !reasons.length) return null;
    return {
      herName: typeof parsed.herName === "string" ? parsed.herName.slice(0, 32) : "",
      hisName: typeof parsed.hisName === "string" ? parsed.hisName.slice(0, 32) : "",
      dedication:
        typeof parsed.dedication === "string" ? parsed.dedication.slice(0, 80) : DEFAULT_LETTER.dedication,
      paragraphs: paragraphs.slice(0, 6).map((p) => p.slice(0, 700)),
      notes: notes.slice(0, 8).map((n) => ({
        id: n.id.slice(0, 40),
        kicker: n.kicker.slice(0, 40),
        body: n.body.slice(0, 320),
      })),
      reasons: reasons.slice(0, 8).map((r) => r.slice(0, 140)),
    };
  } catch {
    return null;
  }
}

function saveLetter(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* private mode */
  }
}

function belovedName(name) {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : "you";
}

function monogram(name) {
  const source = name.trim().length > 0 ? name.trim() : "You";
  const first = Array.from(source)[0] || "Y";
  return first.toLocaleUpperCase();
}

const state = {
  data: structuredClone(DEFAULT_LETTER),
  opened: false,
  opening: false,
  desk: false,
  writing: false,
  confirmRestore: false,
  quoteIndex: 0,
  openNote: DEFAULT_LETTER.notes[0]?.id ?? null,
  holdDone: false,
  holdProgress: 0,
};

let openTimer = null;
let holdFrame = null;
let holdStarted = null;
let ready = false;

const el = {
  cover: document.getElementById("cover"),
  letter: document.getElementById("letter"),
  coverBody: document.getElementById("cover-body"),
  coverTitle: document.getElementById("cover-title"),
  coverDedication: document.getElementById("cover-dedication"),
  sealBtn: document.getElementById("seal-btn"),
  sealDisc: document.getElementById("seal-disc"),
  sealMark: document.getElementById("seal-mark"),
  letterTitle: document.getElementById("letter-title"),
  editBanner: document.getElementById("edit-banner"),
  salutation: document.getElementById("salutation"),
  paragraphs: document.getElementById("paragraphs"),
  notes: document.getElementById("notes"),
  addNote: document.getElementById("add-note"),
  quoteText: document.getElementById("quote-text"),
  quoteBy: document.getElementById("quote-by"),
  quoteWork: document.getElementById("quote-work"),
  quoteCount: document.getElementById("quote-count"),
  reasons: document.getElementById("reasons"),
  holdArea: document.getElementById("hold-area"),
  signOff: document.getElementById("sign-off"),
  signName: document.getElementById("sign-name"),
  desk: document.getElementById("desk"),
  herName: document.getElementById("her-name"),
  hisName: document.getElementById("his-name"),
  dedication: document.getElementById("dedication"),
  toggleWrite: document.getElementById("toggle-write"),
  restore: document.getElementById("restore"),
};

function patch(partial) {
  state.confirmRestore = false;
  state.data = { ...state.data, ...partial };
  persist();
  render();
}

function persist() {
  if (!ready) return;
  saveLetter(state.data);
}

function seal() {
  if (openTimer !== null) {
    window.clearTimeout(openTimer);
    openTimer = null;
  }
  state.opening = false;
  state.opened = false;
  state.holdDone = false;
  state.holdProgress = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function openLetter() {
  if (state.opening || state.opened) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    state.opened = true;
    render();
    requestAnimationFrame(() => el.letterTitle?.focus());
    return;
  }
  state.opening = true;
  render();
  openTimer = window.setTimeout(() => {
    state.opened = true;
    state.opening = false;
    openTimer = null;
    render();
    requestAnimationFrame(() => el.letterTitle?.focus());
  }, 420);
}

function present() {
  state.writing = false;
  state.desk = false;
  document.body.style.overflow = "";
  seal();
}

function restore() {
  if (!state.confirmRestore) {
    state.confirmRestore = true;
    render();
    return;
  }
  state.data = {
    ...structuredClone(DEFAULT_LETTER),
    herName: state.data.herName,
    hisName: state.data.hisName,
  };
  state.writing = false;
  state.confirmRestore = false;
  state.openNote = state.data.notes[0]?.id ?? null;
  persist();
  render();
}

function setParagraph(index, value) {
  state.data = {
    ...state.data,
    paragraphs: state.data.paragraphs.map((p, i) => (i === index ? value : p)),
  };
  persist();
  render();
}

function setNote(id, partial) {
  state.data = {
    ...state.data,
    notes: state.data.notes.map((n) => (n.id === id ? { ...n, ...partial } : n)),
  };
  persist();
  render();
}

function setReason(index, value) {
  state.data = {
    ...state.data,
    reasons: state.data.reasons.map((r, i) => (i === index ? value : r)),
  };
  persist();
  render();
}

function addNote() {
  if (state.data.notes.length >= 8) return;
  const id = `note-${Date.now()}`;
  state.data = {
    ...state.data,
    notes: [
      ...state.data.notes,
      { id, kicker: "A new note", body: "Write what only you would notice." },
    ],
  };
  persist();
  render();
}

function removeNote(id) {
  if (state.data.notes.length <= 1) return;
  state.data = {
    ...state.data,
    notes: state.data.notes.filter((n) => n.id !== id),
  };
  if (state.openNote === id) state.openNote = null;
  persist();
  render();
}

function stopHold(reset) {
  if (holdFrame !== null) cancelAnimationFrame(holdFrame);
  holdFrame = null;
  holdStarted = null;
  if (reset) {
    state.holdProgress = 0;
    renderHold();
  }
}

function beginHold(event) {
  if (state.holdDone) return;
  event.preventDefault();
  try {
    event.currentTarget.setPointerCapture(event.pointerId);
  } catch {
    /* older Android */
  }
  stopHold(false);
  holdStarted = performance.now();
  const tick = (now) => {
    const next = Math.min(1, (now - (holdStarted ?? now)) / 1200);
    state.holdProgress = next;
    renderHold();
    if (next >= 1) {
      state.holdDone = true;
      stopHold(false);
      renderHold();
      return;
    }
    holdFrame = requestAnimationFrame(tick);
  };
  holdFrame = requestAnimationFrame(tick);
}

function renderHold() {
  if (!el.holdArea) return;
  if (state.holdDone) {
    el.holdArea.innerHTML =
      '<p class="hold-done">Toh sun lo — main ab bhi, aur hamesha, tumhara hi hoon.</p>';
    return;
  }
  const circumference = 2 * Math.PI * 20;
  const offset = circumference * (1 - state.holdProgress);
  el.holdArea.innerHTML = `
    <button type="button" class="hold-btn" id="hold-btn" aria-label="Hold karke wada rakho">
      <svg viewBox="0 0 48 48" width="64" height="64" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--line)" stroke-width="1.5"></circle>
        <circle
          cx="24" cy="24" r="20" fill="none"
          stroke="var(--rose)" stroke-width="1.5" stroke-linecap="round"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
          transform="rotate(-90 24 24)"
        ></circle>
      </svg>
      <span>Dabaye rakho</span>
    </button>
  `;
  const btn = document.getElementById("hold-btn");
  btn.addEventListener("pointerdown", beginHold);
  btn.addEventListener("pointerup", () => stopHold(true));
  btn.addEventListener("pointercancel", () => stopHold(true));
  btn.addEventListener("pointerleave", () => stopHold(true));
  btn.addEventListener("contextmenu", (e) => e.preventDefault());
  btn.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
}

function renderParagraphs() {
  const beloved = belovedName(state.data.herName);
  el.salutation.textContent = state.data.herName.trim()
    ? `${state.data.herName.trim()},`
    : "Meri jaan,";

  if (state.writing) {
    el.paragraphs.innerHTML = state.data.paragraphs
      .map(
        (p, i) => `
      <textarea class="para-edit" rows="4" maxlength="700" data-index="${i}" aria-label="Paragraph ${i + 1}">${escapeHtml(p)}</textarea>
    `,
      )
      .join("");
    el.paragraphs.querySelectorAll("textarea").forEach((ta) => {
      ta.addEventListener("input", () => {
        const index = Number(ta.dataset.index);
        state.data.paragraphs[index] = ta.value;
        persist();
      });
    });
    return;
  }

  el.paragraphs.innerHTML = state.data.paragraphs
    .map(
      (p, i) =>
        `<p class="${i === 0 ? "lead" : ""}">${escapeHtml(p)}</p>`,
    )
    .join("");
}

function renderNotes() {
  if (state.writing) {
    el.notes.innerHTML = state.data.notes
      .map(
        (note) => `
      <li>
        <div class="note-edit">
          <input class="field" maxlength="40" data-id="${escapeAttr(note.id)}" data-field="kicker" value="${escapeAttr(note.kicker)}" aria-label="Note title" />
          <textarea class="field" rows="3" maxlength="320" data-id="${escapeAttr(note.id)}" data-field="body" aria-label="Note">${escapeHtml(note.body)}</textarea>
          <button type="button" class="ghost-btn" data-remove="${escapeAttr(note.id)}">Remove note</button>
        </div>
      </li>
    `,
      )
      .join("");

    el.notes.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        setNote(input.dataset.id, { [input.dataset.field]: input.value });
      });
    });
    el.notes.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => removeNote(btn.dataset.remove));
    });
    el.addNote.classList.toggle("hidden", state.data.notes.length >= 8);
    el.addNote.classList.remove("hidden");
    if (state.data.notes.length >= 8) el.addNote.classList.add("hidden");
    return;
  }

  el.addNote.classList.add("hidden");
  el.notes.innerHTML = state.data.notes
    .map((note) => {
      const isOpen = state.openNote === note.id;
      return `
      <li>
        <button type="button" class="note-btn ${isOpen ? "open" : ""}" data-id="${escapeAttr(note.id)}" aria-expanded="${isOpen}">
          <span class="title">${escapeHtml(note.kicker)}</span>
          <span class="body ${isOpen ? "full" : "preview"}">${escapeHtml(note.body)}</span>
        </button>
      </li>
    `;
    })
    .join("");

  el.notes.querySelectorAll(".note-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.openNote = state.openNote === btn.dataset.id ? null : btn.dataset.id;
      renderNotes();
    });
  });
}

function renderReasons() {
  if (state.writing) {
    el.reasons.innerHTML = state.data.reasons
      .map(
        (reason, i) => `
      <li>
        <span class="num">${String(i + 1).padStart(2, "0")}</span>
        <input class="reason-edit" maxlength="140" data-index="${i}" value="${escapeAttr(reason)}" aria-label="Reason ${i + 1}" />
      </li>
    `,
      )
      .join("");
    el.reasons.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        const index = Number(input.dataset.index);
        state.data.reasons[index] = input.value;
        persist();
      });
    });
    return;
  }

  el.reasons.innerHTML = state.data.reasons
    .map(
      (reason, i) => `
    <li>
      <span class="num">${String(i + 1).padStart(2, "0")}</span>
      <span class="text">${escapeHtml(reason)}</span>
    </li>
  `,
    )
    .join("");
}

function renderQuote() {
  const quote = QUOTES[state.quoteIndex] || QUOTES[0];
  el.quoteText.textContent = `“${quote.text}”`;
  el.quoteBy.textContent = quote.by;
  el.quoteWork.textContent = quote.work;
  el.quoteCount.textContent = `${String(state.quoteIndex + 1).padStart(2, "0")} / ${String(QUOTES.length).padStart(2, "0")}`;
}

function render() {
  const beloved = belovedName(state.data.herName);
  const mark = monogram(state.data.herName);
  const longName = beloved.length > 14;

  document.title = beloved === "you" ? "For You" : `For ${beloved}`;

  if (state.opened) {
    el.cover.classList.add("hidden");
    el.letter.classList.remove("hidden");
    el.letterTitle.textContent = `For ${beloved}`;
    el.editBanner.classList.toggle("hidden", !state.writing);
    el.signOff.textContent = `Hamesha${state.data.hisName.trim() ? "," : "."}`;
    if (state.data.hisName.trim()) {
      el.signName.textContent = state.data.hisName.trim();
      el.signName.classList.remove("hidden");
    } else {
      el.signName.classList.add("hidden");
    }
    renderParagraphs();
    renderNotes();
    renderQuote();
    renderReasons();
    renderHold();
  } else {
    el.letter.classList.add("hidden");
    el.cover.classList.remove("hidden");
    el.coverTitle.textContent = `For ${beloved}`;
    el.coverTitle.classList.toggle("long", longName);
    el.sealMark.textContent = mark;
    el.sealDisc.classList.toggle("is-opening", state.opening);
    el.coverBody.classList.toggle("is-fading", state.opening);
    el.sealBtn.disabled = state.opening;
    if (state.data.dedication.trim()) {
      el.coverDedication.textContent = state.data.dedication;
      el.coverDedication.classList.remove("hidden");
    } else {
      el.coverDedication.classList.add("hidden");
    }
  }

  el.desk.classList.toggle("hidden", !state.desk);
  document.body.style.overflow = state.desk ? "hidden" : "";

  if (state.desk) {
    if (document.activeElement !== el.herName && document.activeElement !== el.hisName && document.activeElement !== el.dedication) {
      el.herName.value = state.data.herName;
      el.hisName.value = state.data.hisName;
      el.dedication.value = state.data.dedication;
    }
    el.toggleWrite.textContent = state.writing ? "Edit band karo" : "Alfaz badlo";
    el.toggleWrite.className = state.writing ? "ink-btn" : "outline-btn";
    el.toggleWrite.setAttribute("aria-pressed", String(state.writing));
    el.restore.textContent = state.confirmRestore
      ? "Confirm ke liye phir dabao"
      : "Original wapas lao";
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(str) {
  return escapeHtml(str).replaceAll("'", "&#39;");
}

function openDesk() {
  state.desk = true;
  render();
  el.herName.focus();
}

function closeDesk() {
  state.desk = false;
  document.body.style.overflow = "";
  render();
}

function bind() {
  document.querySelectorAll("[data-open-desk]").forEach((btn) => {
    btn.addEventListener("click", openDesk);
  });
  document.querySelectorAll("[data-close-desk]").forEach((btn) => {
    btn.addEventListener("click", closeDesk);
  });
  document.querySelectorAll("[data-seal]").forEach((btn) => {
    btn.addEventListener("click", seal);
  });
  document.querySelectorAll("[data-present]").forEach((btn) => {
    btn.addEventListener("click", present);
  });

  el.sealBtn.addEventListener("click", openLetter);
  el.addNote.addEventListener("click", addNote);
  el.restore.addEventListener("click", restore);

  el.toggleWrite.addEventListener("click", () => {
    const turningOn = !state.writing;
    state.writing = turningOn;
    if (turningOn) {
      state.desk = false;
      document.body.style.overflow = "";
      if (!state.opened) openLetter();
      else render();
    } else {
      render();
    }
  });

  document.getElementById("done-writing").addEventListener("click", () => {
    state.writing = false;
    render();
  });

  document.getElementById("quote-prev").addEventListener("click", () => {
    state.quoteIndex = (state.quoteIndex - 1 + QUOTES.length) % QUOTES.length;
    renderQuote();
  });
  document.getElementById("quote-next").addEventListener("click", () => {
    state.quoteIndex = (state.quoteIndex + 1) % QUOTES.length;
    renderQuote();
  });

  el.herName.addEventListener("input", () => {
    state.data.herName = el.herName.value.slice(0, 32);
    state.confirmRestore = false;
    persist();
    const beloved = belovedName(state.data.herName);
    el.coverTitle.textContent = `For ${beloved}`;
    el.coverTitle.classList.toggle("long", beloved.length > 14);
    el.sealMark.textContent = monogram(state.data.herName);
    if (state.opened) el.letterTitle.textContent = `For ${beloved}`;
  });
  el.hisName.addEventListener("input", () => {
    state.data.hisName = el.hisName.value.slice(0, 32);
    state.confirmRestore = false;
    persist();
  });
  el.dedication.addEventListener("input", () => {
    state.data.dedication = el.dedication.value.slice(0, 80);
    state.confirmRestore = false;
    persist();
    if (state.data.dedication.trim()) {
      el.coverDedication.textContent = state.data.dedication;
      el.coverDedication.classList.remove("hidden");
    } else {
      el.coverDedication.classList.add("hidden");
    }
  });

  el.desk.addEventListener("click", (event) => {
    if (event.target === el.desk) closeDesk();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (state.desk) closeDesk();
      else if (state.opened) seal();
      return;
    }
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
    ) {
      return;
    }
    if (!state.opened || state.desk) return;
    if (event.key === "ArrowRight") {
      state.quoteIndex = (state.quoteIndex + 1) % QUOTES.length;
      renderQuote();
    }
    if (event.key === "ArrowLeft") {
      state.quoteIndex = (state.quoteIndex - 1 + QUOTES.length) % QUOTES.length;
      renderQuote();
    }
  });
}

function init() {
  const saved = loadLetter();
  if (saved) {
    state.data = saved;
    state.openNote = saved.notes[0]?.id ?? null;
  }
  ready = true;
  bind();
  render();
}

init();
