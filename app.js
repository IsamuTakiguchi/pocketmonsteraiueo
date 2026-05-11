// ポケモンであいうえお — メインスクリプト
// 5歳児向け：ひらがなの五十音表＋クイズ＋音声読み上げ

(function () {
  'use strict';

  // ========== データ：かな ↔ ポケモン ==========
  // pokemonId は PokéAPI の全国図鑑番号。画像はGitHubの公式アートワークを参照する。
  // 1セルにつき: { kana, pokemonId, pokemonName, reading }
  // pokemonId が null の場合は「該当ポケモンなし」セル（を、ぢ、づ など）。

  const SEION = [
    // あ行
    { kana: 'あ', pokemonId: 255, pokemonName: 'アチャモ', reading: 'あちゃも' },
    { kana: 'い', pokemonId: 133, pokemonName: 'イーブイ',  reading: 'いーぶい' },
    { kana: 'う', pokemonId: 194, pokemonName: 'ウパー',    reading: 'うぱー' },
    { kana: 'え', pokemonId: 190, pokemonName: 'エイパム',  reading: 'えいぱむ' },
    { kana: 'お', pokemonId: 21,  pokemonName: 'オニスズメ', reading: 'おにすずめ' },
    // か行
    { kana: 'か', pokemonId: 143, pokemonName: 'カビゴン',   reading: 'かびごん' },
    { kana: 'き', pokemonId: 10,  pokemonName: 'キャタピー', reading: 'きゃたぴー' },
    { kana: 'く', pokemonId: 44,  pokemonName: 'クサイハナ', reading: 'くさいはな' },
    { kana: 'け', pokemonId: 63,  pokemonName: 'ケーシィ',   reading: 'けーしぃ' },
    { kana: 'こ', pokemonId: 129, pokemonName: 'コイキング', reading: 'こいきんぐ' },
    // さ行
    { kana: 'さ', pokemonId: 27,  pokemonName: 'サンド',     reading: 'さんど' },
    { kana: 'し', pokemonId: 134, pokemonName: 'シャワーズ', reading: 'しゃわーず' },
    { kana: 'す', pokemonId: 121, pokemonName: 'スターミー', reading: 'すたーみー' },
    { kana: 'せ', pokemonId: 251, pokemonName: 'セレビィ',   reading: 'せれびぃ' },
    { kana: 'そ', pokemonId: 202, pokemonName: 'ソーナンス', reading: 'そーなんす' },
    // た行
    { kana: 'た', pokemonId: 116, pokemonName: 'タッツー',   reading: 'たっつー' },
    { kana: 'ち', pokemonId: 152, pokemonName: 'チコリータ', reading: 'ちこりーた' },
    { kana: 'つ', pokemonId: 213, pokemonName: 'ツボツボ',   reading: 'つぼつぼ' },
    { kana: 'て', pokemonId: 291, pokemonName: 'テッカニン', reading: 'てっかにん' },
    { kana: 'と', pokemonId: 118, pokemonName: 'トサキント', reading: 'とさきんと' },
    // な行
    { kana: 'な', pokemonId: 43,  pokemonName: 'ナゾノクサ', reading: 'なぞのくさ' },
    { kana: 'に', pokemonId: 52,  pokemonName: 'ニャース',   reading: 'にゃーす' },
    { kana: 'ぬ', pokemonId: 195, pokemonName: 'ヌオー',     reading: 'ぬおー' },
    { kana: 'ね', pokemonId: 177, pokemonName: 'ネイティ',   reading: 'ねいてぃ' },
    { kana: 'の', pokemonId: 206, pokemonName: 'ノコッチ',   reading: 'のこっち' },
    // は行
    { kana: 'は', pokemonId: 187, pokemonName: 'ハネッコ',   reading: 'はねっこ' },
    { kana: 'ひ', pokemonId: 4,   pokemonName: 'ヒトカゲ',   reading: 'ひとかげ' },
    { kana: 'ふ', pokemonId: 1,   pokemonName: 'フシギダネ', reading: 'ふしぎだね' },
    { kana: 'へ', pokemonId: 214, pokemonName: 'ヘラクロス', reading: 'へらくろす' },
    { kana: 'ほ', pokemonId: 163, pokemonName: 'ホーホー',   reading: 'ほーほー' },
    // ま行
    { kana: 'ま', pokemonId: 69,  pokemonName: 'マダツボミ', reading: 'まだつぼみ' },
    { kana: 'み', pokemonId: 151, pokemonName: 'ミュウ',     reading: 'みゅう' },
    { kana: 'む', pokemonId: 200, pokemonName: 'ムウマ',     reading: 'むうま' },
    { kana: 'め', pokemonId: 72,  pokemonName: 'メノクラゲ', reading: 'めのくらげ' },
    { kana: 'も', pokemonId: 114, pokemonName: 'モンジャラ', reading: 'もんじゃら' },
    // や行
    { kana: 'や', pokemonId: 79,  pokemonName: 'ヤドン',     reading: 'やどん' },
    { kana: '　', pokemonId: null, pokemonName: '', reading: '' }, // ゆ行の(い)スペース
    { kana: 'ゆ', pokemonId: 64,  pokemonName: 'ユンゲラー', reading: 'ゆんげらー' },
    { kana: '　', pokemonId: null, pokemonName: '', reading: '' }, // (え)スペース
    { kana: 'よ', pokemonId: 246, pokemonName: 'ヨーギラス', reading: 'よーぎらす' },
    // ら行
    { kana: 'ら', pokemonId: 131, pokemonName: 'ラプラス',   reading: 'らぷらす' },
    { kana: 'り', pokemonId: 6,   pokemonName: 'リザードン', reading: 'りざーどん' },
    { kana: 'る', pokemonId: 337, pokemonName: 'ルナトーン', reading: 'るなとーん' },
    { kana: 'れ', pokemonId: 82,  pokemonName: 'レアコイル', reading: 'れあこいる' },
    { kana: 'ろ', pokemonId: 37,  pokemonName: 'ロコン',     reading: 'ろこん' },
    // わ行・ん
    { kana: 'わ', pokemonId: 158, pokemonName: 'ワニノコ',   reading: 'わにのこ' },
    { kana: '　', pokemonId: null, pokemonName: '', reading: '' },
    { kana: '　', pokemonId: null, pokemonName: '', reading: '' },
    { kana: '　', pokemonId: null, pokemonName: '', reading: '' },
    { kana: 'を', pokemonId: 16,  pokemonName: 'ポッポ',     reading: 'ぽっぽ',
      excludeFromQuiz: true },
    // ん（最後）
    { kana: 'ん', pokemonId: 132, pokemonName: 'メタモン',   reading: 'めたもん',
      excludeFromQuiz: true },
  ];

  const DAKUON = [
    { kana: 'が', pokemonId: 58,  pokemonName: 'ガーディ',   reading: 'がーでぃ' },
    { kana: 'ぎ', pokemonId: 130, pokemonName: 'ギャラドス', reading: 'ぎゃらどす' },
    { kana: 'ぐ', pokemonId: 207, pokemonName: 'グライガー', reading: 'ぐらいがー' },
    { kana: 'げ', pokemonId: 94,  pokemonName: 'ゲンガー',   reading: 'げんがー' },
    { kana: 'ご', pokemonId: 92,  pokemonName: 'ゴース',     reading: 'ごーす' },
    { kana: 'ざ', pokemonId: 335, pokemonName: 'ザングース', reading: 'ざんぐーす' },
    { kana: 'じ', pokemonId: 87,  pokemonName: 'ジュゴン',   reading: 'じゅごん' },
    { kana: 'ず', pokemonId: 41,  pokemonName: 'ズバット',   reading: 'ずばっと' },
    { kana: 'ぜ', pokemonId: 7,   pokemonName: 'ゼニガメ',   reading: 'ぜにがめ' },
    { kana: 'ぞ', pokemonId: 571, pokemonName: 'ゾロアーク', reading: 'ぞろあーく' },
    { kana: 'だ', pokemonId: 51,  pokemonName: 'ダグトリオ', reading: 'だぐとりお' },
    { kana: 'ぢ', pokemonId: null, pokemonName: '', reading: '' },
    { kana: 'づ', pokemonId: null, pokemonName: '', reading: '' },
    { kana: 'で', pokemonId: 181, pokemonName: 'デンリュウ', reading: 'でんりゅう' },
    { kana: 'ど', pokemonId: 84,  pokemonName: 'ドードー',   reading: 'どーどー' },
    { kana: 'ば', pokemonId: 122, pokemonName: 'バリヤード', reading: 'ばりやーど' },
    { kana: 'び', pokemonId: 100, pokemonName: 'ビリリダマ', reading: 'びりりだま' },
    { kana: 'ぶ', pokemonId: 126, pokemonName: 'ブーバー',   reading: 'ぶーばー' },
    { kana: 'べ', pokemonId: 88,  pokemonName: 'ベトベター', reading: 'べとべたー' },
    { kana: 'ぼ', pokemonId: 306, pokemonName: 'ボスゴドラ', reading: 'ぼすごどら' },
  ];

  const HANDAKUON = [
    { kana: 'ぱ', pokemonId: 86,  pokemonName: 'パウワウ',   reading: 'ぱうわう' },
    { kana: 'ぴ', pokemonId: 25,  pokemonName: 'ピカチュウ', reading: 'ぴかちゅう' },
    { kana: 'ぷ', pokemonId: 39,  pokemonName: 'プリン',     reading: 'ぷりん' },
    { kana: 'ぺ', pokemonId: 279, pokemonName: 'ペリッパー', reading: 'ぺりっぱー' },
    { kana: 'ぽ', pokemonId: 16,  pokemonName: 'ポッポ',     reading: 'ぽっぽ' },
  ];

  // ========== 画像URL ==========
  function artworkUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
  function spriteUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  // 画像エラー時にスプライトへフォールバック
  function attachImgFallback(img, id) {
    let triedSprite = false;
    img.addEventListener('error', () => {
      if (!triedSprite && id != null) {
        triedSprite = true;
        img.src = spriteUrl(id);
      } else {
        img.alt = '🐾';
      }
    });
  }

  // ========== 音声読み上げ（Web Speech API） ==========
  // u.lang = 'ja-JP' でブラウザに任せる方式（明示的なvoice指定は不要）

  function speak(text, opts) {
    if (!('speechSynthesis' in window) || !text) return;
    try {
      const synth = window.speechSynthesis;
      if (synth.speaking || synth.pending) synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang   = 'ja-JP';
      u.volume = 1;
      u.rate   = (opts && opts.rate)  != null ? opts.rate  : 1.05;
      u.pitch  = (opts && opts.pitch) != null ? opts.pitch : 1.15;
      synth.speak(u);
    } catch (e) {}
  }

  function buildSpeechText(entry) {
    if (!entry || !entry.kana || entry.kana === '　') return '';
    if (!entry.pokemonName) return entry.kana + '！';
    return `${entry.kana}！ ${entry.reading}！`;
  }

  // ========== 効果音（Web Audio APIで簡易合成） ==========
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    return audioCtx;
  }
  function playTone(freqs, duration = 0.18, type = 'sine') {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.0001, t0 + i * duration);
      gain.gain.exponentialRampToValueAtTime(0.25, t0 + i * duration + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + (i + 1) * duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0 + i * duration);
      osc.stop(t0 + (i + 1) * duration + 0.05);
    });
  }
  function playCorrect() { playTone([523.25, 659.25, 783.99, 1046.5], 0.13); }
  function playWrong()   { playTone([392, 311.13], 0.2, 'square'); }

  // ========== 五十音表のレンダリング ==========
  function renderKanaGrid(container, entries) {
    container.innerHTML = '';
    entries.forEach(entry => {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'kana-cell';
      const isEmpty = !entry.kana || entry.kana === '　' || entry.pokemonId == null;
      if (isEmpty) cell.classList.add('is-empty');

      const span = document.createElement('span');
      span.className = 'kana-text';
      span.textContent = entry.kana && entry.kana !== '　' ? entry.kana : '';
      cell.appendChild(span);

      if (entry.pokemonId != null) {
        const img = document.createElement('img');
        img.className = 'kana-thumb';
        img.loading = 'lazy';
        img.alt = entry.pokemonName;
        img.src = spriteUrl(entry.pokemonId);
        attachImgFallback(img, entry.pokemonId);
        cell.appendChild(img);

        cell.addEventListener('click', () => openDetail(entry));
      } else {
        cell.disabled = true;
        cell.setAttribute('aria-hidden', 'true');
      }

      container.appendChild(cell);
    });
  }

  // ========== 詳細モーダル ==========
  const modal       = document.getElementById('detail-modal');
  const modalKana   = document.getElementById('modal-kana');
  const modalImage  = document.getElementById('modal-image');
  const modalName   = document.getElementById('modal-pokename');
  const modalSpeak  = document.getElementById('modal-speak');
  const modalClose  = document.getElementById('modal-close');

  let currentEntry = null;

  function openDetail(entry) {
    currentEntry = entry;
    modalKana.textContent = entry.kana;
    modalImage.src = artworkUrl(entry.pokemonId);
    attachImgFallback(modalImage, entry.pokemonId);
    modalName.innerHTML = `${entry.pokemonName}<span class="reading">${entry.reading}</span>`;
    modal.hidden = false;
    speak(buildSpeechText(entry));
  }

  function closeDetail() {
    modal.hidden = true;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  modalClose.addEventListener('click', closeDetail);
  modal.addEventListener('click', e => { if (e.target === modal) closeDetail(); });
  modalSpeak.addEventListener('click', () => {
    if (currentEntry) speak(buildSpeechText(currentEntry));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeDetail();
  });

  // ========== タブ切り替え ==========
  const tabs = document.querySelectorAll('.tab-btn');
  const viewTable = document.getElementById('view-table');
  const viewQuiz  = document.getElementById('view-quiz');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      const mode = tab.dataset.mode;
      if (mode === 'table') {
        viewTable.hidden = false;
        viewQuiz.hidden = true;
      } else {
        viewTable.hidden = true;
        viewQuiz.hidden = false;
        if (!quizState.current) nextQuiz();
      }
    });
  });

  // ========== クイズモード ==========
  const quizImageWrap = document.getElementById('quiz-image-wrap');
  const quizImage    = document.getElementById('quiz-image');
  const quizChoices  = document.getElementById('quiz-choices');
  const quizFeedback = document.getElementById('quiz-feedback');
  const quizNext     = document.getElementById('quiz-next');
  const includeExtra = document.getElementById('quiz-include-extra');
  const starCountEl  = document.getElementById('star-count');
  const pokeBall     = document.getElementById('poke-ball');

  const quizState = { current: null, locked: false, animating: false };

  // ========== モンスターボール演出 ==========
  function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  function resetBall() {
    pokeBall.hidden = true;
    pokeBall.className = 'poke-ball';
    quizImageWrap.classList.remove('captured');
    quizImage.style.opacity = '';
    quizImage.style.transform = '';
  }

  async function throwBall() {
    resetBall();
    // reflow to restart animation
    void pokeBall.offsetWidth;
    pokeBall.hidden = false;
    pokeBall.classList.add('throw');
    await wait(560);
  }

  async function captureSequence() {
    // ボールはその場で揺れ、ポケモンは縮んで吸い込まれる
    pokeBall.classList.remove('throw');
    void pokeBall.offsetWidth;
    pokeBall.classList.add('wiggle');
    quizImageWrap.classList.add('captured');
    await wait(1100);
  }

  async function missSequence() {
    pokeBall.classList.remove('throw');
    void pokeBall.offsetWidth;
    pokeBall.classList.add('miss');
    await wait(700);
    pokeBall.hidden = true;
    pokeBall.className = 'poke-ball';
  }

  // ★を localStorage で永続化
  const STAR_KEY = 'pokemon_aiueo_stars';
  function getStars() {
    return parseInt(localStorage.getItem(STAR_KEY) || '0', 10) || 0;
  }
  function setStars(n) {
    localStorage.setItem(STAR_KEY, String(n));
    starCountEl.textContent = String(n);
  }
  starCountEl.textContent = String(getStars());

  function quizPool() {
    const groups = [SEION];
    if (includeExtra.checked) groups.push(DAKUON, HANDAKUON);
    const pool = [];
    groups.forEach(g => g.forEach(e => {
      if (e.pokemonId != null && !e.excludeFromQuiz) pool.push(e);
    }));
    return pool;
  }

  function pickRandom(arr, n, exclude = null) {
    const items = arr.filter(x => x !== exclude);
    const result = [];
    while (result.length < n && items.length) {
      const i = Math.floor(Math.random() * items.length);
      result.push(items.splice(i, 1)[0]);
    }
    return result;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function nextQuiz() {
    const pool = quizPool();
    if (pool.length < 4) return;
    const correct = pool[Math.floor(Math.random() * pool.length)];
    const distractors = pickRandom(pool, 3, correct).map(e => e.kana);
    const choices = shuffle([correct.kana, ...distractors]);

    quizState.current = correct;
    quizState.locked = false;
    quizState.animating = false;

    resetBall();

    quizImage.src = artworkUrl(correct.pokemonId);
    quizImage.alt = correct.pokemonName;
    attachImgFallback(quizImage, correct.pokemonId);

    quizFeedback.className = 'quiz-feedback';
    quizFeedback.textContent = '';
    quizNext.hidden = true;

    quizChoices.innerHTML = '';
    choices.forEach(kana => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      const kanaSpan = document.createElement('span');
      kanaSpan.className = 'choice-kana';
      kanaSpan.textContent = kana;
      btn.appendChild(kanaSpan);
      btn.addEventListener('click', () => onChoose(btn, kana));
      quizChoices.appendChild(btn);
    });
  }

  async function onChoose(btn, kana) {
    if (quizState.locked || quizState.animating) return;
    const correct = quizState.current;
    const isCorrect = kana === correct.kana;
    quizState.animating = true;
    Array.from(quizChoices.children).forEach(b => (b.disabled = true));

    // モンスターボールを投げる
    await throwBall();

    if (isCorrect) {
      // 捕獲：ポケモンが縮んでボールに吸い込まれ、ボールが揺れる
      btn.classList.add('is-correct');
      const nameEl = document.createElement('span');
      nameEl.className = 'choice-name';
      nameEl.textContent = correct.pokemonName;
      btn.appendChild(nameEl);
      await captureSequence();
      quizFeedback.textContent = '⭕';
      quizFeedback.className = 'quiz-feedback correct';
      setStars(getStars() + 1);
      playCorrect();
      speak(`ゲットだぜ！ ${correct.kana}！ ${correct.reading}！`);
      quizState.locked = true;
      quizState.animating = false;
      quizNext.hidden = false;
    } else {
      // ハズレ：ボールが弾かれる
      btn.classList.add('is-wrong');
      btn.disabled = true;
      await missSequence();
      quizFeedback.textContent = '❌';
      quizFeedback.className = 'quiz-feedback wrong';
      playWrong();
      speak('もういちど！', { pitch: 1.25, rate: 1.1 });
      // 他の選択肢を再度有効化（押し間違えた1個だけは disabled のまま）
      Array.from(quizChoices.children).forEach(b => {
        if (!b.classList.contains('is-wrong')) b.disabled = false;
      });
      quizState.animating = false;
      setTimeout(() => {
        if (!quizState.locked) {
          quizFeedback.className = 'quiz-feedback';
          quizFeedback.textContent = '';
        }
      }, 900);
    }
  }

  quizNext.addEventListener('click', () => nextQuiz());
  includeExtra.addEventListener('change', () => nextQuiz());

  // ========== 起動 ==========
  renderKanaGrid(document.getElementById('kana-grid'),         SEION);
  renderKanaGrid(document.getElementById('kana-grid-dakuon'),  DAKUON);
  renderKanaGrid(document.getElementById('kana-grid-handakuon'), HANDAKUON);

  // 初回タップで AudioContext を起こす（モバイルブラウザ対策）
  document.body.addEventListener('pointerdown', function warmup() {
    try {
      const ctx = getAudioCtx();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      if ('speechSynthesis' in window) {
        // voicesリストを初期化（無音）
        window.speechSynthesis.getVoices();
      }
    } catch (e) {}
    document.body.removeEventListener('pointerdown', warmup);
  }, { once: true });
})();
