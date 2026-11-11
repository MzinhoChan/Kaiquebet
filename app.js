// KaiqueBet - JavaScript Principal
// Sistema Oficial da Resenha - 100% Diversão, 0% Dinheiro Real

// --- 1. ESTADO GLOBAL & PERSISTÊNCIA ---
const STORAGE_KEYS = {
  USER: 'kaiquebet_user',
  BALANCE: 'kaiquebet_balance',
  HISTORY: 'kaiquebet_history',
  SOUND: 'kaiquebet_sound_enabled',
  BETS: 'kaiquebet_custom_bets',
  IS_ADMIN: 'kaiquebet_is_admin',
  COMMENTS: 'kaiquebet_resenha_comments'
};

// --- ÍCONES SVG PARA O TIGRINHO (SLOT MACHINE) ---
const SLOT_ICONS = {
  crown: `
    <svg class="slot-svg-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 36L10 14L20 24L24 10L28 24L38 14L42 36H6Z" fill="url(#crownGrad)" stroke="#f59e0b" stroke-width="2"/>
      <rect x="6" y="36" width="36" height="5" rx="1.5" fill="#f59e0b"/>
      <circle cx="10" cy="14" r="2.5" fill="#10b981"/>
      <circle cx="24" cy="10" r="3" fill="#38bdf8"/>
      <circle cx="38" cy="14" r="2.5" fill="#10b981"/>
      <circle cx="24" cy="38.5" r="1.5" fill="#ffffff"/>
      <defs>
        <linearGradient id="crownGrad" x1="6" y1="10" x2="42" y2="41" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fbbf24"/>
          <stop offset="1" stop-color="#d97706"/>
        </linearGradient>
      </defs>
    </svg>`,
  tiger: `
    <svg class="slot-svg-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 12L15 6L21 11L24 10L27 11L33 6L38 12L39 24C39 33 24 42 24 42C24 42 9 33 9 24L10 12Z" fill="url(#tigerGrad)" stroke="#f59e0b" stroke-width="2"/>
      <path d="M15 19L21 21M33 19L27 21" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
      <circle cx="18" cy="23" r="2.5" fill="#10b981"/>
      <circle cx="30" cy="23" r="2.5" fill="#10b981"/>
      <path d="M22 28L24 30L26 28" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
      <path d="M20 33C22 35 26 35 28 33" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
      <defs>
        <linearGradient id="tigerGrad" x1="9" y1="6" x2="39" y2="42" gradientUnits="userSpaceOnUse">
          <stop stop-color="#f59e0b"/>
          <stop offset="1" stop-color="#b45309"/>
        </linearGradient>
      </defs>
    </svg>`,
  pizza: `
    <svg class="slot-svg-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 42L8 14C18 8 30 8 40 14L24 42Z" fill="url(#pizzaGrad)" stroke="#d97706" stroke-width="2"/>
      <path d="M7 13C17 7 31 7 41 13" stroke="#b45309" stroke-width="4" stroke-linecap="round"/>
      <circle cx="24" cy="22" r="3" fill="#ef4444"/>
      <circle cx="18" cy="28" r="2.5" fill="#ef4444"/>
      <circle cx="28" cy="31" r="2" fill="#ef4444"/>
      <circle cx="27" cy="17" r="1.5" fill="#10b981"/>
      <defs>
        <linearGradient id="pizzaGrad" x1="8" y1="12" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fde047"/>
          <stop offset="1" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
    </svg>`,
  drink: `
    <svg class="slot-svg-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="20" height="26" rx="3" fill="url(#beerGrad)" stroke="#38bdf8" stroke-width="1.5"/>
      <path d="M32 18H37C39.2 18 41 19.8 41 22V28C41 30.2 39.2 32 37 32H32" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="10" y="8" width="24" height="7" rx="3.5" fill="#f8fafc"/>
      <circle cx="15" cy="8" r="3" fill="#f8fafc"/>
      <circle cx="23" cy="7" r="4" fill="#f8fafc"/>
      <circle cx="30" cy="8" r="3" fill="#f8fafc"/>
      <path d="M16 20V34M22 20V34M28 20V34" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" stroke-linecap="round"/>
      <defs>
        <linearGradient id="beerGrad" x1="12" y1="14" x2="32" y2="40" gradientUnits="userSpaceOnUse">
          <stop stop-color="#facc15"/>
          <stop offset="1" stop-color="#d97706"/>
        </linearGradient>
      </defs>
    </svg>`,
  car: `
    <svg class="slot-svg-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Escada no teto -->
      <line x1="8" y1="11" x2="38" y2="11" stroke="#38bdf8" stroke-width="2"/>
      <line x1="8" y1="14" x2="38" y2="14" stroke="#38bdf8" stroke-width="2"/>
      <line x1="13" y1="11" x2="13" y2="14" stroke="#38bdf8" stroke-width="2"/>
      <line x1="20" y1="11" x2="20" y2="14" stroke="#38bdf8" stroke-width="2"/>
      <line x1="27" y1="11" x2="27" y2="14" stroke="#38bdf8" stroke-width="2"/>
      <line x1="34" y1="11" x2="34" y2="14" stroke="#38bdf8" stroke-width="2"/>
      <!-- Carroceria -->
      <path d="M12 18H28L35 24H42V34H6V24L12 18Z" fill="url(#carGrad)" stroke="#10b981" stroke-width="1.5"/>
      <path d="M15 20H26L31 24H15V20Z" fill="#0284c7"/>
      <!-- Rodas -->
      <circle cx="14" cy="34" r="5" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
      <circle cx="34" cy="34" r="5" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
      <defs>
        <linearGradient id="carGrad" x1="6" y1="18" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop stop-color="#f8fafc"/>
          <stop offset="1" stop-color="#94a3b8"/>
        </linearGradient>
      </defs>
    </svg>`,
  joker: `
    <svg class="slot-svg-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="28" height="34" rx="4" fill="url(#cardGrad)" stroke="#8b5cf6" stroke-width="2"/>
      <path d="M24 16L27 21L33 22L28 26L29 32L24 28L19 32L20 26L15 22L21 21L24 16Z" fill="#a855f7"/>
      <circle cx="16" cy="14" r="1.5" fill="#8b5cf6"/>
      <circle cx="32" cy="36" r="1.5" fill="#8b5cf6"/>
      <defs>
        <linearGradient id="cardGrad" x1="10" y1="8" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1e1b4b"/>
          <stop offset="1" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
    </svg>`
};

const SLOT_SYMBOLS = [
  { id: 'crown', name: 'Coroa Real', multi: 20 },
  { id: 'tiger', name: 'Tigre Lendário', multi: 15 },
  { id: 'pizza', name: 'Pizza Premium', multi: 10 },
  { id: 'drink', name: 'Litrão Gelado', multi: 8 },
  { id: 'car', name: 'Uno com Escada', multi: 5 },
  { id: 'joker', name: 'Coringa da Resenha', multi: 2 }
];

let state = {
  user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || null,
  isAdmin: localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === 'true',
  balance: parseInt(localStorage.getItem(STORAGE_KEYS.BALANCE)) || 1000,
  history: JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY)) || [],
  soundEnabled: localStorage.getItem(STORAGE_KEYS.SOUND) !== 'false',
  selectedBet: null,
  activePlacedBets: [],
  crashGame: {
    running: false,
    betAmount: 0,
    multiplier: 1.00,
    crashPoint: 0,
    intervalId: null,
    hasCashedOut: false
  },
  slotGame: {
    spinning: false
  }
};

// --- 2. SISTEMA DE ÁUDIO VIA WEB AUDIO API ---
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeep(freq = 440, duration = 0.1, type = 'sine') {
    if (!state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Navegadores podem silenciar áudio antes da interação do usuário
    }
  }

  playWin() {
    if (!state.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playBeep(freq, 0.15, 'triangle'), idx * 120);
    });
  }

  playLoss() {
    if (!state.soundEnabled) return;
    const notes = [400, 320, 240, 180];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playBeep(freq, 0.2, 'sawtooth'), idx * 140);
    });
  }

  playSpin() {
    this.playBeep(600, 0.05, 'square');
  }

  playClick() {
    this.playBeep(800, 0.04, 'sine');
  }

  playCashout() {
    this.playWin();
  }
}

const sounds = new SoundManager();

// --- 3. DADOS DAS APOSTAS DA RESENHA ---
const INITIAL_BETS = [
  {
    id: 1,
    category: "Super Aposta Oficial",
    hot: true,
    question: "O Kaique vai no rodízio?",
    description: "Faça seu palpite oficial sobre o comparecimento do Kaique no rodízio com a galera!",
    options: [
      { id: 'opt1', label: "Vai chegar atrasado", odd: 1.15, note: "Paga muito pouco" },
      { id: 'opt2', label: "Não", odd: 1.45, note: "Paga pouco" },
      { id: 'opt3', label: "Falar que é negro", odd: 3.50, note: "Paga médio" },
      { id: 'opt4', label: "Sim", odd: 8.80, note: "Paga muito bem!" }
    ],
    status: 'open'
  }
];

let savedBets = null;
try {
  savedBets = JSON.parse(localStorage.getItem(STORAGE_KEYS.BETS));
} catch(e) {}
let betsData = (Array.isArray(savedBets) && savedBets.length > 0) ? savedBets : [...INITIAL_BETS];

function saveBetsData() {
  localStorage.setItem(STORAGE_KEYS.BETS, JSON.stringify(betsData));
}

// --- SISTEMA UNIVERSAL DE CONFIRMAÇÃO ESTILIZADA ---
let customConfirmCallback = null;

function showCustomConfirm(title, message, onConfirm, confirmBtnText = 'Confirmar', isDanger = true) {
  sounds.playClick();
  const modal = document.getElementById('customConfirmModal');
  const titleEl = document.getElementById('customConfirmTitle');
  const msgEl = document.getElementById('customConfirmMessage');
  const actionBtn = document.getElementById('btnCustomConfirmAction');
  const iconBox = document.getElementById('confirmIconBox');

  if (titleEl) titleEl.innerText = title;
  if (msgEl) msgEl.innerText = message;
  if (actionBtn) {
    actionBtn.innerText = confirmBtnText;
    actionBtn.className = isDanger ? 'btn-confirm-action btn-confirm-danger' : 'btn-confirm-action btn-confirm-primary';
  }
  if (iconBox) {
    iconBox.className = isDanger ? 'confirm-icon-box confirm-icon-danger' : 'confirm-icon-box confirm-icon-primary';
  }

  customConfirmCallback = onConfirm;
  if (modal) modal.classList.remove('hidden');
}

function closeCustomConfirm() {
  const modal = document.getElementById('customConfirmModal');
  if (modal) modal.classList.add('hidden');
  customConfirmCallback = null;
}

// --- DADOS DO MURAL DE COMENTÁRIOS DA RESENHA (SEM BOTS - APENAS PESSOAS REAIS) ---
const DEFAULT_COMMENTS = [];

let savedComments = null;
try {
  savedComments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS));
} catch(e) {}
// Filtra para remover quaisquer bots antigos previamente salvos
let commentsData = Array.isArray(savedComments) ? savedComments.filter(c => !['c1', 'c2', 'c3'].includes(c.id)) : [];

function saveCommentsData() {
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(commentsData));
}

function renderCommentsList() {
  const listEl = document.getElementById('commentsMessagesList');
  const badgeEl = document.getElementById('commentsCountBadge');
  const previewNameEl = document.getElementById('commentingAsName');

  if (badgeEl) badgeEl.innerText = commentsData.length;
  if (previewNameEl) {
    previewNameEl.innerText = state.user ? state.user.name : 'Visitante (Faça login)';
  }

  if (!listEl) return;

  if (commentsData.length === 0) {
    listEl.innerHTML = `
      <div class="empty-comments-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="38" height="38">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <p>Mural sem comentários ainda.</p>
        <span>Seja o primeiro da galera a mandar um comentário sobre os palpites!</span>
      </div>
    `;
    return;
  }

  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  listEl.innerHTML = commentsData.map(c => {
    const initials = c.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
    const colorIndex = Math.abs(c.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
    const avatarBg = colors[colorIndex];

    return `
      <div class="comment-message-item" id="comment-${c.id}">
        <div class="comment-avatar" style="background-color: ${avatarBg}">${initials}</div>
        <div class="comment-bubble">
          <div class="comment-author-row">
            <span class="comment-author-name">${c.name}</span>
            ${c.isAdm ? `<span class="comment-adm-tag">ADM</span>` : ''}
            <span class="comment-time">${c.time}</span>
            ${state.isAdmin ? `
              <button class="btn-del-comment" onclick="deleteComment('${c.id}')" title="Apagar Comentário">✕</button>
            ` : ''}
          </div>
          <div class="comment-text">${c.text}</div>
        </div>
      </div>
    `;
  }).join('');

  listEl.scrollTop = listEl.scrollHeight;
}

function toggleCommentsBox() {
  sounds.playClick();
  const box = document.getElementById('commentsBox');
  const unreadDot = document.getElementById('commentsUnreadDot');
  if (!box) return;

  const isHidden = box.classList.contains('hidden');
  if (isHidden) {
    box.classList.remove('hidden');
    if (unreadDot) unreadDot.classList.add('hidden');
    renderCommentsList();
    const input = document.getElementById('commentTextInput');
    if (input) setTimeout(() => input.focus(), 100);
  } else {
    box.classList.add('hidden');
  }
}

function handleSendComment(event) {
  event.preventDefault();

  if (!state.user || !state.user.name) {
    showToast("Faça login com seu nome para comentar na resenha!", "error");
    checkAuthStatus();
    return;
  }

  const input = document.getElementById('commentTextInput');
  const text = input.value.trim();

  if (!text) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const newComment = {
    id: `c_${Date.now()}`,
    name: state.user.name, // APENAS O NOME, SEM GMAIL!
    text: text,
    time: timeStr,
    isAdm: !!state.isAdmin
  };

  commentsData.push(newComment);
  saveCommentsData();
  renderCommentsList();

  input.value = '';
  sounds.playBeep(600, 0.05, 'triangle');
  showToast("Comentário publicado no mural!", "success");
}

function deleteComment(commentId) {
  if (!state.isAdmin) return;
  showCustomConfirm(
    "Apagar Comentário",
    "Tem certeza que deseja apagar este comentário do mural da resenha?",
    () => {
      commentsData = commentsData.filter(c => c.id !== commentId);
      saveCommentsData();
      renderCommentsList();
      showToast("Comentário apagado com sucesso.", "info");
    },
    "Apagar",
    true
  );
}

// --- 4. SISTEMA DE LOGIN (NOME & GMAIL) ---
function checkAuthStatus() {
  const authModal = document.getElementById('authModal');
  const userProfile = document.getElementById('userProfileCard');

  if (!state.user || !state.user.name || !state.user.email) {
    authModal.classList.remove('hidden');
    userProfile.classList.add('hidden');
  } else {
    authModal.classList.add('hidden');
    userProfile.classList.remove('hidden');
    renderUserProfile();
    
    // Auto-habilita ADM se o email ou nome for do Maurício/ADM
    const emailLower = state.user.email.toLowerCase();
    const nameLower = state.user.name.toLowerCase();
    if (emailLower.includes('mauri') || nameLower.includes('mauri') || emailLower.includes('admin') || emailLower.includes('adm')) {
      state.isAdmin = true;
      localStorage.setItem(STORAGE_KEYS.IS_ADMIN, 'true');
    }
  }
  updateAdmUI();
}

// --- CONTROLE DE ACESSO DO ADMINISTRADOR (ADM) ---
function updateAdmUI() {
  const adminBadge = document.getElementById('adminBadgeTop');
  const btnOpenAdm = document.getElementById('btnOpenAdmModal');
  const adminControlBar = document.getElementById('adminControlBar');

  if (state.isAdmin) {
    if (adminBadge) adminBadge.classList.remove('hidden');
    if (btnOpenAdm) btnOpenAdm.classList.add('hidden');
    if (adminControlBar) adminControlBar.classList.remove('hidden');
  } else {
    if (adminBadge) adminBadge.classList.add('hidden');
    if (btnOpenAdm) btnOpenAdm.classList.remove('hidden');
    if (adminControlBar) adminControlBar.classList.add('hidden');
  }
}

function openAdmModal() {
  sounds.playClick();
  const modal = document.getElementById('admPinModal');
  if (modal) modal.classList.remove('hidden');
}

function closeAdmModal() {
  const modal = document.getElementById('admPinModal');
  if (modal) modal.classList.add('hidden');
}

function handleAdmPinSubmit(event) {
  event.preventDefault();
  const pinInput = document.getElementById('admPinInput');
  const pin = pinInput.value.trim().toLowerCase();

  // Chaves de ADM permitidas
  if (pin === '1234' || pin === 'kaiquebet' || pin === 'adm' || pin === 'admin') {
    state.isAdmin = true;
    localStorage.setItem(STORAGE_KEYS.IS_ADMIN, 'true');
    sounds.playWin();
    showToast("Acesso de Administrador concedido com sucesso!", "success");
    closeAdmModal();
    updateAdmUI();
    renderBetsList();
  } else {
    sounds.playLoss();
    showToast("Chave de Administrador incorreta.", "error");
  }
}

function exitAdmMode() {
  showCustomConfirm(
    "Modo Administrador",
    "Deseja desativar o Modo Administrador e voltar à visualização de apostador comum?",
    () => {
      sounds.playClick();
      state.isAdmin = false;
      localStorage.setItem(STORAGE_KEYS.IS_ADMIN, 'false');
      updateAdmUI();
      renderBetsList();
      showToast("Modo Administrador desativado.", "info");
    },
    "Desativar",
    false
  );
}

function handleLoginSubmit(event) {
  event.preventDefault();
  sounds.playClick();

  const nameInput = document.getElementById('loginName');
  const emailInput = document.getElementById('loginEmail');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();

  if (!name) {
    showToast("Por favor, informe seu nome ou apelido.", "error");
    return;
  }

  if (!email || !email.includes('@')) {
    showToast("Informe um e-mail do Gmail válido.", "error");
    return;
  }

  // Gera uma cor de destaque baseada no nome
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
  const colorIndex = Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  const avatarBg = colors[colorIndex];

  state.user = {
    name: name,
    email: email,
    avatarBg: avatarBg,
    loginAt: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));

  sounds.playWin();
  showToast(`Bem-vindo à banca, ${name}!`, "success");
  checkAuthStatus();
}

function handleLogout() {
  showCustomConfirm(
    "Sair da Conta",
    "Tem certeza que deseja sair da sua conta atual no KaiqueBet?",
    () => {
      sounds.playClick();
      state.user = null;
      localStorage.removeItem(STORAGE_KEYS.USER);
      showToast("Você saiu da sua conta.", "info");
      checkAuthStatus();
    },
    "Sair",
    false
  );
}

function renderUserProfile() {
  if (!state.user) return;
  const nameEl = document.getElementById('userNameDisplay');
  const emailEl = document.getElementById('userEmailDisplay');
  const avatarEl = document.getElementById('userAvatar');

  nameEl.innerText = state.user.name;
  emailEl.innerText = state.user.email;
  
  // Iniciais do nome
  const initials = state.user.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  avatarEl.innerText = initials || 'K';
  if (state.user.avatarBg) {
    avatarEl.style.backgroundColor = state.user.avatarBg;
  }
}

// --- 5. ATUALIZAÇÃO DA CARTEIRA & INTERFACE ---
function updateBalanceUI() {
  const display = document.getElementById('balanceDisplay');
  display.innerText = `KC$ ${state.balance.toLocaleString('pt-BR')}`;
  localStorage.setItem(STORAGE_KEYS.BALANCE, state.balance);
}

function updateHistoryUI() {
  const list = document.getElementById('historyList');
  const countBadge = document.getElementById('historyCount');
  countBadge.innerText = state.history.length;

  if (state.history.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
        <p>Nenhuma aposta registrada. Escolha um jogo acima para começar!</p>
      </div>
    `;
    return;
  }

  list.innerHTML = state.history.map(item => {
    const isWin = item.result === 'win';
    const statusClass = isWin ? 'win' : 'loss';
    const payoutSign = isWin ? '+' : '-';
    const payoutClass = isWin ? 'win-val' : 'loss-val';

    return `
      <div class="history-item ${statusClass}">
        <div>
          <div class="history-title">${item.title}</div>
          <div class="history-details">${item.detail} &bull; ${item.date}</div>
        </div>
        <div class="history-payout ${payoutClass}">
          ${payoutSign} KC$ ${item.amount.toLocaleString('pt-BR')}
        </div>
      </div>
    `;
  }).join('');

  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
}

function addHistoryItem(title, detail, amount, result) {
  const newItem = {
    title,
    detail,
    amount,
    result,
    date: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  };
  state.history.unshift(newItem);
  if (state.history.length > 50) state.history.pop();
  updateHistoryUI();
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconSvg = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>`;

  if (type === 'success') {
    iconSvg = `
      <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" width="18" height="18">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>`;
  } else if (type === 'error') {
    iconSvg = `
      <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" width="18" height="18">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`;
  }

  toast.innerHTML = `<span class="toast-icon-wrap">${iconSvg}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- 6. RENDERIZAÇÃO DAS APOSTAS DA RESENHA ---
function renderBetsList() {
  const container = document.getElementById('betsList');

  if (betsData.length === 0) {
    container.innerHTML = `
      <div class="empty-bets-card">
        <p>Nenhuma aposta cadastrada no momento.</p>
        ${state.isAdmin ? `<button class="btn-primary-auth" onclick="openCreateBetModal()" style="margin: 1rem auto; display: inline-flex;">+ Criar Primeira Aposta</button>` : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = betsData.map(bet => {
    const isResolved = bet.status === 'resolved';

    return `
      <div class="bet-card ${bet.hot ? 'bet-card-hot' : ''}" id="bet-card-${bet.id}">
        <div class="bet-header">
          <div class="bet-header-left">
            <span class="bet-tag ${bet.hot ? 'tag-hot' : ''}">
              ${bet.category}
            </span>
            ${isResolved ? `<span class="bet-resolved-badge win">Finalizada</span>` : ''}
          </div>

          <!-- Controles Exclusivos do Administrador -->
          ${state.isAdmin ? `
            <div class="admin-card-actions">
              <button class="btn-card-adm" onclick="openEditBetModal(${bet.id})" title="Editar Aposta">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <span>Editar</span>
              </button>
              <button class="btn-card-adm btn-card-adm-danger" onclick="deleteBet(${bet.id})" title="Apagar Aposta">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <span>Excluir</span>
              </button>
            </div>
          ` : ''}
        </div>

        <div class="bet-question">${bet.question}</div>
        <div class="bet-description">${bet.description}</div>

        <div class="odds-grid">
          ${bet.options.map(opt => {
            const isSelected = state.selectedBet && 
                               state.selectedBet.betId === bet.id && 
                               state.selectedBet.optionId === opt.id;
            const isWinner = bet.winningOptionId === opt.id;

            return `
              <button class="odd-button ${isSelected ? 'selected' : ''} ${isWinner ? 'odd-winner' : ''}" 
                      onclick="selectBetOption(${bet.id}, '${opt.id}')">
                <span class="odd-label">${opt.label}</span>
                <span class="odd-val">${parseFloat(opt.odd).toFixed(2)}</span>
                ${opt.note ? `<span class="odd-note">${opt.note}</span>` : ''}
                ${isWinner ? `<span class="winner-pill">Vencedor Oficial</span>` : ''}
              </button>
            `;
          }).join('')}
        </div>

        <div class="bet-footer">
          ${state.isAdmin ? `
            <button class="btn-settle" onclick="openSettleBetModal(${bet.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" width="14" height="14">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <span>Definir Vencedor & Pagar</span>
            </button>
          ` : ''}

          <button class="btn-simulate" onclick="simulateBetResult(${bet.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <rect x="2" y="2" width="20" height="20" rx="5"></rect>
              <circle cx="8" cy="8" r="1.5" fill="currentColor"></circle>
              <circle cx="16" cy="16" r="1.5" fill="currentColor"></circle>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
            </svg>
            <span>Sortear Desfecho</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// --- GESTÃO DE APOSTAS PELO ADMINISTRADOR (CRIAR, EDITAR, EXCLUIR) ---
let nextBetId = Date.now();

function openCreateBetModal() {
  if (!state.isAdmin) return;
  sounds.playClick();

  document.getElementById('editorBetId').value = '';
  document.getElementById('betEditorModalTitle').innerText = 'Criar Nova Aposta da Resenha';
  document.getElementById('editorQuestion').value = '';
  document.getElementById('editorCategory').value = 'Resenha dos Cria';
  document.getElementById('editorHotCheckbox').checked = false;
  document.getElementById('editorDescription').value = '';

  const list = document.getElementById('editorOptionsList');
  list.innerHTML = '';
  // Cria 2 opções iniciais por padrão
  addEditorOptionRow('Sim', 2.10, 'Paga bem');
  addEditorOptionRow('Não', 1.65, 'Favorito');

  document.getElementById('betEditorModal').classList.remove('hidden');
}

function openEditBetModal(betId) {
  if (!state.isAdmin) return;
  sounds.playClick();

  const bet = betsData.find(b => b.id === betId);
  if (!bet) return;

  document.getElementById('editorBetId').value = bet.id;
  document.getElementById('betEditorModalTitle').innerText = 'Editar Aposta da Resenha';
  document.getElementById('editorQuestion').value = bet.question;
  document.getElementById('editorCategory').value = bet.category || 'Resenha';
  document.getElementById('editorHotCheckbox').checked = !!bet.hot;
  document.getElementById('editorDescription').value = bet.description;

  const list = document.getElementById('editorOptionsList');
  list.innerHTML = '';
  bet.options.forEach(opt => {
    addEditorOptionRow(opt.label, opt.odd, opt.note || '');
  });

  document.getElementById('betEditorModal').classList.remove('hidden');
}

function closeBetEditorModal() {
  document.getElementById('betEditorModal').classList.add('hidden');
}

function addEditorOptionRow(label = '', odd = 2.00, note = '') {
  const list = document.getElementById('editorOptionsList');
  const count = list.children.length + 1;
  const row = document.createElement('div');
  row.className = 'editor-option-row';
  row.innerHTML = `
    <div class="option-field">
      <input type="text" class="opt-label-input" placeholder="Ex: Opção ${count}" value="${label}" required>
    </div>
    <div class="option-field-odd">
      <input type="text" inputmode="decimal" class="opt-odd-input" placeholder="Ex: 1.20" value="${odd}" required>
    </div>
    <div class="option-field-note">
      <input type="text" class="opt-note-input" placeholder="Ex: Paga pouco" value="${note}">
    </div>
    <button type="button" class="btn-remove-opt" onclick="removeEditorOptionRow(this)" title="Remover Opção">✕</button>
  `;
  list.appendChild(row);
}

function removeEditorOptionRow(btn) {
  const list = document.getElementById('editorOptionsList');
  if (list.children.length <= 2) {
    showToast("A aposta precisa ter no mínimo 2 opções de palpite.", "error");
    return;
  }
  btn.closest('.editor-option-row').remove();
}

function handleSaveBetEditor(event) {
  event.preventDefault();
  if (!state.isAdmin) return;

  const idInput = document.getElementById('editorBetId').value;
  const question = document.getElementById('editorQuestion').value.trim();
  const category = document.getElementById('editorCategory').value.trim();
  const hot = document.getElementById('editorHotCheckbox').checked;
  const description = document.getElementById('editorDescription').value.trim();

  const optionRows = document.querySelectorAll('#editorOptionsList .editor-option-row');
  if (optionRows.length < 2) {
    showToast("Adicione pelo menos 2 opções de palpite.", "error");
    return;
  }

  const options = [];
  optionRows.forEach((row, idx) => {
    const label = row.querySelector('.opt-label-input').value.trim();
    const oddRaw = String(row.querySelector('.opt-odd-input').value).replace(',', '.').trim();
    const odd = parseFloat(oddRaw) || 1.1;
    const note = row.querySelector('.opt-note-input').value.trim();
    options.push({
      id: `opt_${Date.now()}_${idx}`,
      label: label || `Opção ${idx + 1}`,
      odd: Math.max(1.01, odd),
      note: note
    });
  });

  if (idInput) {
    // Modo Edição
    const betId = parseInt(idInput) || idInput;
    const index = betsData.findIndex(b => b.id == betId);
    if (index !== -1) {
      betsData[index].question = question;
      betsData[index].category = category;
      betsData[index].hot = hot;
      betsData[index].description = description;
      betsData[index].options = options;
      showToast("Aposta atualizada com sucesso!", "success");
    }
  } else {
    // Nova Aposta
    const newBet = {
      id: Date.now(),
      question,
      category,
      hot,
      description,
      options,
      status: 'open'
    };
    betsData.unshift(newBet);
    showToast("Nova aposta criada com sucesso!", "success");
  }

  saveBetsData();
  renderBetsList();
  closeBetEditorModal();
  sounds.playWin();
}

function deleteBet(betId) {
  if (!state.isAdmin) return;
  const bet = betsData.find(b => b.id == betId);
  if (!bet) return;

  showCustomConfirm(
    "Excluir Aposta",
    `Tem certeza que deseja apagar a aposta "${bet.question}"? Esta ação removerá o evento permanentemente.`,
    () => {
      sounds.playLoss();
      betsData = betsData.filter(b => b.id != betId);
      saveBetsData();
      renderBetsList();
      showToast("Aposta excluída com sucesso.", "info");
    },
    "Excluir Aposta",
    true
  );
}

// --- FINALIZAR EVENTO & PAGAR GANHADORES (EXCLUSIVO ADM) ---
let currentSettleBetId = null;

function openSettleBetModal(betId) {
  if (!state.isAdmin) return;
  sounds.playClick();

  const bet = betsData.find(b => b.id == betId);
  if (!bet) return;

  currentSettleBetId = bet.id;
  document.getElementById('settleBetQuestion').innerText = bet.question;

  const list = document.getElementById('settleOptionsList');
  list.innerHTML = bet.options.map(opt => `
    <button class="settle-option-card" onclick="settleBetWinner(${bet.id}, '${opt.id}')">
      <div class="settle-opt-left">
        <strong>${opt.label}</strong>
        <span>Odd: ${opt.odd.toFixed(2)}x ${opt.note ? `&bull; ${opt.note}` : ''}</span>
      </div>
      <span class="btn-select-winner">Marcar como Vencedor</span>
    </button>
  `).join('');

  document.getElementById('settleBetModal').classList.remove('hidden');
}

function closeSettleBetModal() {
  document.getElementById('settleBetModal').classList.add('hidden');
  currentSettleBetId = null;
}

function settleBetWinner(betId, winningOptionId) {
  if (!state.isAdmin) return;

  const bet = betsData.find(b => b.id == betId);
  if (!bet) return;

  const winningOption = bet.options.find(o => o.id == winningOptionId);
  if (!winningOption) return;

  bet.status = 'resolved';
  bet.winningOptionId = winningOptionId;
  saveBetsData();

  sounds.playWin();

  // Paga as apostas ativas do usuário
  state.activePlacedBets = state.activePlacedBets || [];
  const betsOnThis = state.activePlacedBets.filter(b => b.betId == betId);

  let totalPaid = 0;
  if (betsOnThis.length > 0) {
    betsOnThis.forEach(ub => {
      if (ub.optionId == winningOptionId) {
        const reward = Math.floor(ub.amount * ub.odd);
        state.balance += reward;
        totalPaid += reward;
        addHistoryItem(`Aposta Oficial (GANHOU)`, `${bet.question} -> ${winningOption.label}`, reward, 'win');
      } else {
        addHistoryItem(`Aposta Oficial (PERDEU)`, `${bet.question} -> Deu ${winningOption.label}`, ub.amount, 'loss');
      }
    });
    updateBalanceUI();
    state.activePlacedBets = state.activePlacedBets.filter(b => b.betId != betId);
  }

  closeSettleBetModal();
  renderBetsList();

  if (totalPaid > 0) {
    showToast(`Evento finalizado! Resultado: "${winningOption.label}". Você recebeu +KC$ ${totalPaid.toLocaleString('pt-BR')}!`, "success");
  } else {
    showToast(`Evento finalizado pelo ADM com vitória de "${winningOption.label}"!`, "success");
  }
}

function selectBetOption(betId, optionId) {
  sounds.playClick();
  const bet = betsData.find(b => b.id === betId);
  const option = bet.options.find(o => o.id === optionId);

  state.selectedBet = {
    betId,
    optionId,
    matchTitle: bet.question,
    optionLabel: option.label,
    odd: option.odd
  };

  // Atualizar visual do Bilhete
  document.getElementById('emptySlipNotice').classList.add('hidden');
  document.getElementById('activeSlipContent').classList.remove('hidden');
  document.getElementById('betSlipBadge').innerText = 'Ativo';
  document.getElementById('slipMatchTitle').innerText = bet.question;
  document.getElementById('slipSelectionName').innerText = option.label;
  document.getElementById('slipOddValue').innerText = option.odd.toFixed(2);

  updateSlipCalculation();
  renderBetsList();
}

function updateSlipCalculation() {
  if (!state.selectedBet) return;
  const amountInput = document.getElementById('slipBetAmount');
  let amount = parseInt(amountInput.value) || 0;
  if (amount < 0) amount = 0;
  const potentialWin = Math.floor(amount * state.selectedBet.odd);
  document.getElementById('slipPotentialWin').innerText = `KC$ ${potentialWin.toLocaleString('pt-BR')}`;
}

function cancelSlip() {
  state.selectedBet = null;
  document.getElementById('emptySlipNotice').classList.remove('hidden');
  document.getElementById('activeSlipContent').classList.add('hidden');
  document.getElementById('betSlipBadge').innerText = 'Vazio';
  renderBetsList();
}

function confirmSlipBet() {
  if (!state.selectedBet) return;

  const amountInput = document.getElementById('slipBetAmount');
  const amount = parseInt(amountInput.value) || 0;

  if (amount <= 0) {
    showToast("Informe um valor maior que 0 para apostar.", "error");
    return;
  }

  if (amount > state.balance) {
    sounds.playLoss();
    showToast("Saldo insuficiente em KaiqueCoins. Recarregue no botão superior.", "error");
    return;
  }

  // Deduz saldo
  state.balance -= amount;
  updateBalanceUI();
  sounds.playCashout();

  state.activePlacedBets = state.activePlacedBets || [];
  state.activePlacedBets.push({
    betId: state.selectedBet.betId,
    optionId: state.selectedBet.optionId,
    optionLabel: state.selectedBet.optionLabel,
    odd: state.selectedBet.odd,
    amount: amount
  });

  showToast(`Aposta de KC$ ${amount} confirmada em "${state.selectedBet.optionLabel}". Clique em "Sortear Desfecho" para resolver!`, "success");
  cancelSlip();
}

function simulateBetResult(betId) {
  const bet = betsData.find(b => b.id === betId);
  if (!bet) return;

  sounds.playSpin();
  
  // Sorteio ponderado pelas probabilidades reais da zoeira
  const roll = Math.random() * 100;
  let winnerOption;
  if (roll < 55) {
    winnerOption = bet.options[0]; // Vai chegar atrasado (55%)
  } else if (roll < 80) {
    winnerOption = bet.options[1]; // Não (25%)
  } else if (roll < 95) {
    winnerOption = bet.options[2]; // Falar que é negro (15%)
  } else {
    winnerOption = bet.options[3]; // Sim (5% - zebra total!)
  }

  // Verifica se o usuário tem aposta ativa neste evento
  state.activePlacedBets = state.activePlacedBets || [];
  const userBetsOnThis = state.activePlacedBets.filter(b => b.betId === betId);

  if (userBetsOnThis.length > 0) {
    userBetsOnThis.forEach(userBet => {
      if (userBet.optionId === winnerOption.id) {
        const reward = Math.floor(userBet.amount * userBet.odd);
        state.balance += reward;
        updateBalanceUI();
        sounds.playWin();
        showToast(`Aposta Vencedora! O resultado foi "${winnerOption.label}". Retorno: +KC$ ${reward.toLocaleString('pt-BR')}!`, "success");
        addHistoryItem(`Aposta Rodízio (Vitória)`, `${winnerOption.label} (${winnerOption.odd}x)`, reward, 'win');
      } else {
        sounds.playLoss();
        showToast(`Aposta Não Premiada. O resultado final foi "${winnerOption.label}".`, "error");
        addHistoryItem(`Aposta Rodízio (Derrota)`, `Deu: ${winnerOption.label} (Apostado em: ${userBet.optionLabel})`, userBet.amount, 'loss');
      }
    });
    state.activePlacedBets = state.activePlacedBets.filter(b => b.betId !== betId);
  } else {
    sounds.playBeep(450, 0.15, 'triangle');
    showToast(`Resultado Sorteado: "${winnerOption.label}". (Faça um palpite no bilhete para concorrer a prêmios!)`, "info");
  }
}

// --- 7. FOGUETINHO CRASH ---
function startCrashGame() {
  if (state.crashGame.running) return;

  const betInput = document.getElementById('crashBetInput');
  const betAmount = parseInt(betInput.value) || 0;

  if (betAmount <= 0) {
    showToast("Digite um valor válido para iniciar a rodada.", "error");
    return;
  }

  if (betAmount > state.balance) {
    sounds.playLoss();
    showToast("Saldo insuficiente em KaiqueCoins.", "error");
    return;
  }

  state.balance -= betAmount;
  updateBalanceUI();

  state.crashGame.running = true;
  state.crashGame.betAmount = betAmount;
  state.crashGame.multiplier = 1.00;
  state.crashGame.hasCashedOut = false;

  const rand = Math.random();
  if (rand < 0.10) {
    state.crashGame.crashPoint = 1.05 + Math.random() * 0.15;
  } else if (rand < 0.70) {
    state.crashGame.crashPoint = 1.30 + Math.random() * 2.5;
  } else if (rand < 0.95) {
    state.crashGame.crashPoint = 3.50 + Math.random() * 6.0;
  } else {
    state.crashGame.crashPoint = 10.0 + Math.random() * 25.0;
  }

  const btnPlay = document.getElementById('btnCrashPlay');
  const btnCashout = document.getElementById('btnCrashCashout');
  const rocket = document.getElementById('rocketIcon');
  const multiplierEl = document.getElementById('crashMultiplier');
  const statusEl = document.getElementById('crashStatus');

  btnPlay.disabled = true;
  btnCashout.disabled = false;
  multiplierEl.classList.remove('crashed');
  multiplierEl.innerText = "1.00x";
  statusEl.innerText = "Em subida. Encerre antes da parada súbita.";
  rocket.className = 'rocket flying';
  rocket.style.left = '30px';
  rocket.style.bottom = '25px';

  sounds.playClick();

  const startTime = Date.now();
  state.crashGame.intervalId = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    
    state.crashGame.multiplier = 1.00 + (elapsed * 0.45) + Math.pow(elapsed * 0.15, 2);
    multiplierEl.innerText = `${state.crashGame.multiplier.toFixed(2)}x`;

    const potential = Math.floor(state.crashGame.betAmount * state.crashGame.multiplier);
    document.getElementById('potentialCrashCashout').innerText = `KC$ ${potential.toLocaleString('pt-BR')}`;

    const maxW = 280;
    const maxH = 150;
    const progress = Math.min(1, elapsed / 10);
    rocket.style.left = `${30 + (progress * maxW)}px`;
    rocket.style.bottom = `${25 + (progress * maxH)}px`;

    if (Math.floor(state.crashGame.multiplier * 10) % 5 === 0) {
      sounds.playBeep(300 + state.crashGame.multiplier * 20, 0.05, 'triangle');
    }

    if (state.crashGame.multiplier >= state.crashGame.crashPoint) {
      triggerCrashExplosion();
    }
  }, 60);
}

function cashoutCrash() {
  if (!state.crashGame.running || state.crashGame.hasCashedOut) return;

  state.crashGame.hasCashedOut = true;
  const winAmount = Math.floor(state.crashGame.betAmount * state.crashGame.multiplier);
  state.balance += winAmount;
  updateBalanceUI();

  sounds.playWin();
  showToast(`Aposta encerrada em ${state.crashGame.multiplier.toFixed(2)}x. Lucro: +KC$ ${winAmount.toLocaleString('pt-BR')}!`, "success");
  addHistoryItem(`Foguetinho (Cash Out)`, `Multiplicador: ${state.crashGame.multiplier.toFixed(2)}x`, winAmount, 'win');

  const btnCashout = document.getElementById('btnCrashCashout');
  btnCashout.disabled = true;
  document.getElementById('crashStatus').innerText = `Aposta garantida em ${state.crashGame.multiplier.toFixed(2)}x.`;
}

function triggerCrashExplosion() {
  clearInterval(state.crashGame.intervalId);
  state.crashGame.running = false;

  const rocket = document.getElementById('rocketIcon');
  const multiplierEl = document.getElementById('crashMultiplier');
  const statusEl = document.getElementById('crashStatus');
  const btnPlay = document.getElementById('btnCrashPlay');
  const btnCashout = document.getElementById('btnCrashCashout');

  rocket.className = 'rocket exploded';
  multiplierEl.classList.add('crashed');
  multiplierEl.innerText = `${state.crashGame.crashPoint.toFixed(2)}x`;
  statusEl.innerText = `Interrompido em ${state.crashGame.crashPoint.toFixed(2)}x. Fim da rodada.`;

  btnPlay.disabled = false;
  btnCashout.disabled = true;

  if (!state.crashGame.hasCashedOut) {
    sounds.playLoss();
    showToast(`O voo encerrou em ${state.crashGame.crashPoint.toFixed(2)}x. Aposta recolhida pela banca.`, "error");
    addHistoryItem(`Foguetinho (Crash)`, `Parada em ${state.crashGame.crashPoint.toFixed(2)}x`, state.crashGame.betAmount, 'loss');
  }
}

// --- 8. TIGRINHO DO KAIQUE (SLOT MACHINE COM SVGS) ---
function initSlotReels() {
  const r1 = document.getElementById('reel1');
  const r2 = document.getElementById('reel2');
  const r3 = document.getElementById('reel3');

  if (r1 && r2 && r3) {
    r1.innerHTML = `<div class="slot-item">${SLOT_ICONS.tiger}</div>`;
    r2.innerHTML = `<div class="slot-item">${SLOT_ICONS.tiger}</div>`;
    r3.innerHTML = `<div class="slot-item">${SLOT_ICONS.tiger}</div>`;
  }
}

function spinSlotMachine() {
  if (state.slotGame.spinning) return;

  const betInput = document.getElementById('slotBetInput');
  const betAmount = parseInt(betInput.value) || 0;

  if (betAmount <= 0) {
    showToast("Defina um valor de aposta para girar.", "error");
    return;
  }

  if (betAmount > state.balance) {
    sounds.playLoss();
    showToast("Saldo insuficiente em KaiqueCoins.", "error");
    return;
  }

  state.balance -= betAmount;
  updateBalanceUI();
  state.slotGame.spinning = true;

  const btnSpin = document.getElementById('btnSpinSlot');
  btnSpin.disabled = true;

  const r1 = document.getElementById('reel1');
  const r2 = document.getElementById('reel2');
  const r3 = document.getElementById('reel3');
  const msgEl = document.getElementById('slotResultMessage');

  r1.classList.add('spinning');
  r2.classList.add('spinning');
  r3.classList.add('spinning');
  msgEl.innerText = "Sorteando símbolos dos rolos...";

  let spinTicks = 0;
  const tickInterval = setInterval(() => {
    sounds.playSpin();
    spinTicks++;
    if (spinTicks > 15) clearInterval(tickInterval);
  }, 80);

  const item1 = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
  const item2 = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
  const item3 = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];

  setTimeout(() => {
    r1.classList.remove('spinning');
    r1.innerHTML = `<div class="slot-item">${SLOT_ICONS[item1.id]}</div>`;
    sounds.playBeep(500, 0.1, 'square');
  }, 800);

  setTimeout(() => {
    r2.classList.remove('spinning');
    r2.innerHTML = `<div class="slot-item">${SLOT_ICONS[item2.id]}</div>`;
    sounds.playBeep(600, 0.1, 'square');
  }, 1300);

  setTimeout(() => {
    r3.classList.remove('spinning');
    r3.innerHTML = `<div class="slot-item">${SLOT_ICONS[item3.id]}</div>`;
    sounds.playBeep(700, 0.1, 'square');

    evaluateSlotResult(item1, item2, item3, betAmount);
    state.slotGame.spinning = false;
    btnSpin.disabled = false;
  }, 1800);
}

function evaluateSlotResult(i1, i2, i3, betAmount) {
  const msgEl = document.getElementById('slotResultMessage');

  // Caso 1: 3 Iguais (JACKPOT)
  if (i1.id === i2.id && i2.id === i3.id) {
    const winAmount = betAmount * i1.multi;
    state.balance += winAmount;
    updateBalanceUI();
    sounds.playWin();

    msgEl.innerHTML = `<strong>COMBINAÇÃO MÁXIMA:</strong> 3x ${i1.name} pagou ${i1.multi}x (+KC$ ${winAmount.toLocaleString('pt-BR')})!`;
    showToast(`Prêmio Máximo! A combinação de 3x ${i1.name} rendeu +KC$ ${winAmount}!`, "success");
    addHistoryItem(`Tigrinho (3x ${i1.name})`, `Prêmio Jackpot ${i1.multi}x`, winAmount, 'win');
    return;
  }

  // Caso 2: 2 Iguais (Par de Consolação)
  if (i1.id === i2.id || i2.id === i3.id || i1.id === i3.id) {
    const matchedItem = (i1.id === i2.id || i1.id === i3.id) ? i1 : i2;
    const winAmount = Math.floor(betAmount * 1.5);
    state.balance += winAmount;
    updateBalanceUI();
    sounds.playWin();

    msgEl.innerHTML = `<strong>PAR FORMADO:</strong> Retorno de 1.5x em ${matchedItem.name} (+KC$ ${winAmount.toLocaleString('pt-BR')}).`;
    showToast(`Par premiado! +KC$ ${winAmount} creditados.`, "success");
    addHistoryItem(`Tigrinho (Par de ${matchedItem.name})`, `Prêmio Parcial 1.5x`, winAmount, 'win');
    return;
  }

  // Caso 3: Não premiado
  sounds.playLoss();
  msgEl.innerText = `Nenhuma combinação formada nesta rodada. Tente novamente!`;
  showToast(`Sem combinação formada. Aposta recolhida.`, "error");
  addHistoryItem(`Tigrinho`, `Sem combinação`, betAmount, 'loss');
}

// --- 9. HELPERS & ATALHOS DE APOSTA ---
window.setSlipBet = function(val) {
  sounds.playClick();
  const input = document.getElementById('slipBetAmount');
  if (val === 'all') {
    input.value = Math.max(10, state.balance);
  } else {
    input.value = (parseInt(input.value) || 0) + val;
  }
  updateSlipCalculation();
};

window.setCrashBet = function(val) {
  sounds.playClick();
  const input = document.getElementById('crashBetInput');
  if (val === 'max') {
    input.value = Math.max(10, state.balance);
  } else if (val === 'half') {
    input.value = Math.max(10, Math.floor(state.balance / 2));
  } else {
    input.value = val;
  }
};

window.setSlotBet = function(val) {
  sounds.playClick();
  document.getElementById('slotBetInput').value = val;
};

// --- 10. MODAL DE RECARGA ---
function openDepositModal() {
  sounds.playClick();
  document.getElementById('depositModal').classList.remove('hidden');
}

function closeDepositModal() {
  document.getElementById('depositModal').classList.add('hidden');
}

window.claimDeposit = function(amount, source) {
  state.balance += amount;
  updateBalanceUI();
  sounds.playWin();
  showToast(`+ KC$ ${amount.toLocaleString('pt-BR')} adicionados à sua conta via "${source}".`, "success");
  addHistoryItem(`Recarga de Saldo`, source, amount, 'win');
  closeDepositModal();
};

window.resetToInitial = function() {
  state.balance = 1000;
  updateBalanceUI();
  sounds.playClick();
  showToast("Saldo redefinido para o padrão de KC$ 1.000.", "info");
  closeDepositModal();
};

// --- 11. INICIALIZAÇÃO & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();
  updateBalanceUI();
  updateHistoryUI();
  renderBetsList();
  renderCommentsList();
  initSlotReels();

  // Comentários da Resenha
  const btnToggleComments = document.getElementById('btnToggleComments');
  if (btnToggleComments) btnToggleComments.addEventListener('click', toggleCommentsBox);

  const btnCloseComments = document.getElementById('btnCloseComments');
  if (btnCloseComments) btnCloseComments.addEventListener('click', toggleCommentsBox);

  // Logout
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', handleLogout);
  }

  // Controles de Administrador (ADM)
  const btnOpenAdm = document.getElementById('btnOpenAdmModal');
  if (btnOpenAdm) btnOpenAdm.addEventListener('click', openAdmModal);

  const btnCloseAdmPin = document.getElementById('btnCloseAdmPin');
  if (btnCloseAdmPin) btnCloseAdmPin.addEventListener('click', closeAdmModal);

  const btnExitAdm = document.getElementById('btnExitAdm');
  if (btnExitAdm) btnExitAdm.addEventListener('click', exitAdmMode);

  const btnCreateBet = document.getElementById('btnOpenCreateBetModal');
  if (btnCreateBet) btnCreateBet.addEventListener('click', openCreateBetModal);

  const btnCloseEditor = document.getElementById('btnCloseBetEditor');
  if (btnCloseEditor) btnCloseEditor.addEventListener('click', closeBetEditorModal);

  const btnCancelEditor = document.getElementById('btnCancelBetEditor');
  if (btnCancelEditor) btnCancelEditor.addEventListener('click', closeBetEditorModal);

  const btnCloseSettle = document.getElementById('btnCloseSettleModal');
  if (btnCloseSettle) btnCloseSettle.addEventListener('click', closeSettleBetModal);

  // Navegação entre Abas
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = `tab-${btn.dataset.tab}`;
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Som Toggle
  const soundBtn = document.getElementById('soundToggle');
  const iconOn = soundBtn.querySelector('.sound-icon-on');
  const iconOff = soundBtn.querySelector('.sound-icon-off');

  function updateSoundIcon() {
    if (state.soundEnabled) {
      iconOn.classList.remove('hidden');
      iconOff.classList.add('hidden');
    } else {
      iconOn.classList.add('hidden');
      iconOff.classList.remove('hidden');
    }
  }

  soundBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem(STORAGE_KEYS.SOUND, state.soundEnabled);
    updateSoundIcon();
    showToast(state.soundEnabled ? "Áudio ativado." : "Áudio silenciado.", "info");
  });
  updateSoundIcon();

  // Bilhete de Aposta
  document.getElementById('slipBetAmount').addEventListener('input', updateSlipCalculation);
  document.getElementById('btnConfirmSlipBet').addEventListener('click', confirmSlipBet);
  document.getElementById('btnCancelSlip').addEventListener('click', cancelSlip);

  // Recarregar odds aleatórias
  document.getElementById('btnResetAllBets').addEventListener('click', () => {
    sounds.playSpin();
    betsData.forEach(bet => {
      bet.options.forEach(opt => {
        const delta = (Math.random() * 0.4 - 0.2);
        opt.odd = Math.max(1.05, parseFloat((opt.odd + delta).toFixed(2)));
      });
    });
    renderBetsList();
    showToast("Cotações atualizadas pelo bookmaker do Kaique.", "info");
  });

  // Modal de Recarga
  document.getElementById('btnDepositModal').addEventListener('click', openDepositModal);
  document.getElementById('btnCloseDeposit').addEventListener('click', closeDepositModal);
  document.getElementById('depositModal').addEventListener('click', (e) => {
    if (e.target.id === 'depositModal') closeDepositModal();
  });

  // Crash Game
  document.getElementById('btnCrashPlay').addEventListener('click', startCrashGame);
  document.getElementById('btnCrashCashout').addEventListener('click', cashoutCrash);

  // Slot Machine
  document.getElementById('btnSpinSlot').addEventListener('click', spinSlotMachine);

  // Limpar Histórico
  document.getElementById('btnClearHistory').addEventListener('click', () => {
    showCustomConfirm(
      "Zerar Histórico",
      "Tem certeza que deseja apagar todo o seu histórico de palpites e jogadas?",
      () => {
        state.history = [];
        updateHistoryUI();
        showToast("Histórico limpo com sucesso.", "info");
      },
      "Zerar Histórico",
      true
    );
  });

  // Modal de Confirmação Customizado
  const btnConfirmAction = document.getElementById('btnCustomConfirmAction');
  if (btnConfirmAction) {
    btnConfirmAction.addEventListener('click', () => {
      if (typeof customConfirmCallback === 'function') {
        customConfirmCallback();
      }
      closeCustomConfirm();
    });
  }

  const btnConfirmCancel = document.getElementById('btnCustomConfirmCancel');
  if (btnConfirmCancel) {
    btnConfirmCancel.addEventListener('click', closeCustomConfirm);
  }

  const customConfirmOverlay = document.getElementById('customConfirmModal');
  if (customConfirmOverlay) {
    customConfirmOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'customConfirmModal') closeCustomConfirm();
    });
  }

  // PWA & Instalação
  let deferredPrompt = null;
  const btnInstall = document.getElementById('btnInstallApp');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnInstall) btnInstall.classList.remove('hidden');
  });

  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      sounds.playClick();
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast("KaiqueBet instalado com sucesso!", "success");
        }
        deferredPrompt = null;
        btnInstall.classList.add('hidden');
      } else {
        showToast("Toque no menu do navegador e selecione 'Instalar aplicativo' ou 'Adicionar à tela de início'.", "info");
      }
    });
  }

  window.addEventListener('appinstalled', () => {
    if (btnInstall) btnInstall.classList.add('hidden');
    showToast("KaiqueBet adicionado à tela de início.", "success");
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
});
