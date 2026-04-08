// DOM элементы
const splashScreen = document.getElementById('splash-screen');
const loginScreen = document.getElementById('login-screen');
const mainMenu = document.getElementById('main-menu');
const nameInputSection = document.getElementById('name-input-section');
const characterSelect = document.getElementById('character-select');
const startGameBtn = document.getElementById('start-game-btn');
const gameContainer = document.getElementById('game-container');
const gameCanvas = document.getElementById('game-canvas');
const playerHealthDisplay = document.getElementById('player-health');
const enemiesRemainingDisplay = document.getElementById('enemies-remaining');
const trophyCountDisplay = document.getElementById('trophy-count');
const tokenCountDisplay = document.getElementById('token-count');
const diamondsCountDisplay = document.getElementById('diamonds-count');
const flowersCountDisplay = document.getElementById('flowers-count');
const roundDisplay = document.getElementById('round-display');
const roundNumberSpan = document.getElementById('round-number');
const playerNameInput = document.getElementById('player-name');
const acceptNameBtn = document.getElementById('accept-name-btn');
const sheggaBtn = document.getElementById('shegga-btn');
const mortakBtn = document.getElementById('mortak-btn');
const bullyBtn = document.getElementById('bully-btn');
const scrapBtn = document.getElementById('scrap-btn');
const clancyBtn = document.getElementById('clancy-btn');
const rosaBtn = document.getElementById('rosa-btn');
const shopBtn = document.getElementById('shop-btn');
const chestBtn = document.getElementById('chest-btn');
const shopMenu = document.getElementById('shop-menu');
const closeShopBtn = document.getElementById('close-shop-btn');
const buyClancyBtn = document.getElementById('buy-clancy-btn');
const buyRosaBtn = document.getElementById('buy-rosa-btn');
const buyHealthBtn = document.getElementById('buy-health-btn');
const winScreen = document.getElementById('win-screen');
const loseScreen = document.getElementById('lose-screen');
const playAgainBtnWin = document.getElementById('play-again-btn-win');
const mainMenuBtnWin = document.getElementById('main-menu-btn-win');
const playAgainBtnLose = document.getElementById('play-again-btn-lose');
const mainMenuBtnLose = document.getElementById('main-menu-btn-lose');
const trophiesCountDisplay = document.getElementById('trophies-count');
const jadeCountDisplay = document.getElementById('jade-count');
const tokensCountDisplay = document.getElementById('tokens-count');
const chestNotification = document.getElementById('chest-notification');
const closeNotificationBtn = document.getElementById('close-notification-btn');
const jadeRewardDisplay = document.getElementById('jade-reward');
const soloModeBtn = document.getElementById('solo-mode-btn');
const captureModeBtn = document.getElementById('capture-mode-btn');
const knockoutModeBtn = document.getElementById('knockout-mode-btn');
const currentUserSpan = document.getElementById('current-user');
const logoutBtn = document.getElementById('logout-btn');

// Элементы входа
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const regUsername = document.getElementById('reg-username');
const regPassword = document.getElementById('reg-password');
const regConfirm = document.getElementById('reg-confirm');
const registerBtn = document.getElementById('register-btn');
const registerError = document.getElementById('register-error');
const guestBtn = document.getElementById('guest-btn');

const menuMusic = document.getElementById('menu-music');
const shootSound = document.getElementById('shoot-sound');
const chestSound = document.getElementById('chest-sound');
const gemSound = document.getElementById('gem-sound');
const flowerSound = document.getElementById('flower-sound');
const shieldSound = document.getElementById('shield-sound');

const ctx = gameCanvas.getContext('2d');

let currentUser = null;
let isGuest = false;
let playerName = '';
let selectedCharacter = null;
let gameMode = 'solo';
let gameActive = false;
let animationFrame = null;
let currentRound = 1;
let playerWins = 0;
let enemyWins = 0;
let allies = [];
let enemies = [];

let player = {
    x: 100, y: 300, radius: 15, health: 4000, maxHealth: 4000,
    damage: 2000, speed: 3, color: '#8888ff', superActive: false,
    trophies: 0, tokens: 0, ammoType: 'single', shieldActive: false, shieldDuration: 0, characterType: null
};

let bullets = [];
let diamonds = [];
let flowers = [];
let collectedFlowers = 0;
let collectedDiamonds = 0;
let enemyTeamDiamonds = 0;
let totalDiamondsNeeded = 10;
let totalFlowers = 10;
let captureTimer = 0;
let isTimerRunning = false;

let mapWidth = 900;
let mapHeight = 600;

let userData = {
    username: '', trophies: 0, jade: 0, tokens: 0,
    isClancyUnlocked: false, isRosaUnlocked: false, healthBoost: 0, damageBoost: 0
};

// ВСЕ 6 ЛИЦ ПЕРСОНАЖЕЙ
const sheggaFace = new Image();
sheggaFace.src = 'https://i.postimg.cc/Z5X8P7xC/output-onlinetools.png';

const mortakFace = new Image();
mortakFace.src = 'https://i.postimg.cc/vZVW8JpN/output-onlinetools-(3).png';

const bullyFace = new Image();
bullyFace.src = 'https://i.postimg.cc/hjg852Zb/Snimok-ekrana-2026-04-07-230659.png';

const scrapFace = new Image();
scrapFace.src = 'https://хостинг-картинок.рф/i/3ebd3df9-2987-4805-a152-4dc25b9be940/002_083ec634.png';

const clancyFace = new Image();
clancyFace.src = 'https://хостинг-картинок.рф/i/3ebd3df9-2987-4805-a152-4dc25b9be940/003_55362fef.png';

const rosaFace = new Image();
rosaFace.src = 'https://хостинг-картинок.рф/i/3ebd3df9-2987-4805-a152-4dc25b9be940/004_9dd30a3a.png';

function drawFaceOnBall(ctx, x, y, radius, characterType) {
    let faceImage = null;
    if (characterType === 'shegga') faceImage = sheggaFace;
    else if (characterType === 'mortak') faceImage = mortakFace;
    else if (characterType === 'bully') faceImage = bullyFace;
    else if (characterType === 'scrap') faceImage = scrapFace;
    else if (characterType === 'clancy') faceImage = clancyFace;
    else if (characterType === 'rosa') faceImage = rosaFace;
    
    if (faceImage && faceImage.complete && faceImage.naturalWidth > 0) {
        const faceSize = radius * 1.6;
        ctx.drawImage(faceImage, x - faceSize/2, y - faceSize/2, faceSize, faceSize);
    }
}

const characterStats = {
    shegga: { color: '#c158e8', damage: 1500, speed: 3, ammoType: 'wave', superType: 'circle' },
    mortak: { color: '#ff5555', damage: 2000, speed: 3, ammoType: 'double', superType: 'speed' },
    bully: { color: '#555555', damage: 1000, speed: 3, ammoType: 'quad', superType: 'circle' },
    scrap: { color: '#ff8844', damage: 1250, speed: 3, ammoType: 'triple', superType: 'wave' },
    clancy: { color: '#ffee44', damage: 1800, speed: 4, ammoType: 'lightning', superType: 'rapid' },
    rosa: { color: '#ffaa88', damage: 2200, speed: 3, ammoType: 'big', superType: 'shield' }
};

const allCharacterTypes = ['shegga', 'mortak', 'bully', 'scrap', 'clancy', 'rosa'];

function getRandomCharacterType() {
    return allCharacterTypes[Math.floor(Math.random() * allCharacterTypes.length)];
}

function createBot(x, y, characterType, isAlly) {
    const stats = characterStats[characterType];
    return {
        x: x, y: y, radius: 15, health: 4000, maxHealth: 4000,
        damage: stats.damage, speed: 1.5, color: stats.color,
        characterType: characterType, ammoType: stats.ammoType, superType: stats.superType,
        superActive: false, attackCooldown: 0, superCooldown: 0,
        isAlly: isAlly, heldDiamonds: 0, shieldActive: false
    };
}

function loadAllUsers() {
    const users = localStorage.getItem('brawlBalls_users');
    return users ? JSON.parse(users) : {};
}

function saveAllUsers(users) {
    localStorage.setItem('brawlBalls_users', JSON.stringify(users));
}

function loadUserData() {
    if (!currentUser) return;
    const users = loadAllUsers();
    if (users[currentUser]) {
        userData = users[currentUser];
    }
    updateUI();
}

function saveUserData() {
    if (!currentUser) return;
    const users = loadAllUsers();
    users[currentUser] = userData;
    saveAllUsers(users);
}

function register(username, password) {
    const users = loadAllUsers();
    if (users[username]) return { success: false, error: 'Пользователь существует!' };
    if (password.length < 3) return { success: false, error: 'Пароль минимум 3 символа!' };
    users[username] = { password, username, trophies: 0, jade: 0, tokens: 0, isClancyUnlocked: false, isRosaUnlocked: false, healthBoost: 0, damageBoost: 0 };
    saveAllUsers(users);
    return { success: true };
}

function login(username, password) {
    const users = loadAllUsers();
    if (!users[username]) return { success: false, error: 'Пользователь не найден!' };
    if (users[username].password !== password) return { success: false, error: 'Неверный пароль!' };
    return { success: true, data: users[username] };
}

function logout() {
    currentUser = null;
    isGuest = false;
    hideScreens();
    loginScreen.classList.remove('hidden');
    splashScreen.classList.add('hidden');
}

function updateUI() {
    if (currentUser) currentUserSpan.textContent = currentUser + (isGuest ? ' (гость)' : '');
    trophiesCountDisplay.textContent = userData.trophies;
    jadeCountDisplay.textContent = userData.jade;
    tokensCountDisplay.textContent = userData.tokens;
    
    if (userData.isClancyUnlocked) {
        clancyBtn.disabled = false;
        clancyBtn.innerHTML = 'Клэнси';
        clancyBtn.parentElement.querySelector('.character-locked').innerHTML = 'Доступен';
        buyClancyBtn.disabled = true;
        buyClancyBtn.textContent = 'Куплен';
    }
    if (userData.isRosaUnlocked) {
        rosaBtn.disabled = false;
        rosaBtn.innerHTML = 'Роза';
        rosaBtn.parentElement.querySelector('.character-locked').innerHTML = 'Доступен';
        buyRosaBtn.disabled = true;
        buyRosaBtn.textContent = 'Куплен';
    }
}

let sakuraInterval = null;

function startSakuraAnimation() {
    if (sakuraInterval) clearInterval(sakuraInterval);
    const container = document.getElementById('animation-container');
    if (!container) return;
    container.innerHTML = '';
    
    function createElement() {
        const element = document.createElement('div');
        element.className = Math.random() > 0.3 ? 'sakura-flower' : 'petal';
        if (element.className === 'sakura-flower') {
            element.textContent = ['🌸', '🌸', '🌸', '🌺', '🌸'][Math.floor(Math.random() * 5)];
            element.style.fontSize = (12 + Math.random() * 15) + 'px';
        } else {
            element.style.width = (6 + Math.random() * 8) + 'px';
            element.style.height = (8 + Math.random() * 12) + 'px';
        }
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDuration = (3 + Math.random() * 5) + 's';
        element.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(element);
        setTimeout(() => { if (element.parentNode) element.remove(); }, 10000);
    }
    
    for (let i = 0; i < 10; i++) setTimeout(() => createElement(), i * 200);
    sakuraInterval = setInterval(createElement, 800);
}

function stopSakuraAnimation() {
    if (sakuraInterval) { clearInterval(sakuraInterval); sakuraInterval = null; }
    const container = document.getElementById('animation-container');
    if (container) container.innerHTML = '';
}

// МОБИЛЬНОЕ УПРАВЛЕНИЕ
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function createTouchControls() {
    if (document.getElementById('touch-controls')) return;
    
    const touchControls = document.createElement('div');
    touchControls.id = 'touch-controls';
    touchControls.style.cssText = 'position:fixed;bottom:20px;left:0;right:0;display:flex;justify-content:space-between;padding:0 20px;z-index:20;pointer-events:none';
    touchControls.innerHTML = `
        <div id="joystick-container" style="width:120px;height:120px;background:rgba(0,0,0,0.5);border-radius:60px;backdrop-filter:blur(5px);border:2px solid rgba(255,255,255,0.3);position:relative;pointer-events:auto">
            <div id="joystick-base" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100px;height:100px;background:rgba(255,255,255,0.1);border-radius:50px"></div>
            <div id="joystick-thumb" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;background:rgba(255,152,0,0.8);border-radius:25px;transition:transform 0.05s linear;cursor:pointer"></div>
        </div>
        <div style="display:flex;gap:15px;pointer-events:auto">
            <div id="touch-attack" style="width:70px;height:70px;border-radius:35px;background:rgba(0,0,0,0.6);backdrop-filter:blur(5px);border:2px solid rgba(255,152,0,0.8);display:flex;align-items:center;justify-content:center;font-size:1.2em;font-weight:bold;color:#ff9800;cursor:pointer">АТАКА</div>
            <div id="touch-super" style="width:70px;height:70px;border-radius:35px;background:rgba(0,0,0,0.6);backdrop-filter:blur(5px);border:2px solid rgba(255,152,0,0.8);display:flex;align-items:center;justify-content:center;font-size:1.2em;font-weight:bold;color:#ff9800;cursor:pointer">СУПЕР</div>
        </div>
    `;
    document.body.appendChild(touchControls);
    
    const joystickContainer = document.getElementById('joystick-container');
    const joystickThumb = document.getElementById('joystick-thumb');
    const touchAttack = document.getElementById('touch-attack');
    const touchSuper = document.getElementById('touch-super');
    
    let joystickActive = false;
    let joystickVector = { x: 0, y: 0 };
    let joystickCenterX = 0, joystickCenterY = 0;
    let maxDistance = 40;
    
    function updateJoystickRect() {
        const rect = joystickContainer.getBoundingClientRect();
        joystickCenterX = rect.left + rect.width / 2;
        joystickCenterY = rect.top + rect.height / 2;
        maxDistance = rect.width / 2.5;
    }
    
    function handleJoystickMove(e) {
        if (!joystickActive) return;
        e.preventDefault();
        
        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        let dx = clientX - joystickCenterX;
        let dy = clientY - joystickCenterY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > maxDistance) {
            dx = dx / distance * maxDistance;
            dy = dy / distance * maxDistance;
        }
        
        joystickVector.x = dx / maxDistance;
        joystickVector.y = dy / maxDistance;
        joystickThumb.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        
        window.joystickVector = joystickVector;
    }
    
    function handleJoystickEnd() {
        joystickActive = false;
        joystickVector = { x: 0, y: 0 };
        joystickThumb.style.transform = 'translate(-50%, -50%)';
        window.joystickVector = joystickVector;
    }
    
    joystickContainer.addEventListener('touchstart', (e) => { e.preventDefault(); joystickActive = true; updateJoystickRect(); });
    joystickContainer.addEventListener('touchmove', handleJoystickMove);
    joystickContainer.addEventListener('touchend', handleJoystickEnd);
    joystickContainer.addEventListener('mousedown', (e) => { joystickActive = true; updateJoystickRect(); });
    window.addEventListener('mousemove', (e) => { if (joystickActive) handleJoystickMove(e); });
    window.addEventListener('mouseup', handleJoystickEnd);
    
    touchAttack.addEventListener('click', () => { if (gameActive) shoot(); });
    touchAttack.addEventListener('touchstart', (e) => { e.preventDefault(); if (gameActive) shoot(); });
    touchSuper.addEventListener('click', () => { if (gameActive) superAttack(); });
    touchSuper.addEventListener('touchstart', (e) => { e.preventDefault(); if (gameActive) superAttack(); });
    
    window.addEventListener('resize', updateJoystickRect);
    setTimeout(updateJoystickRect, 100);
    
    window.joystickVector = { x: 0, y: 0 };
}

function init() {
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });
    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });
    
    loginBtn.addEventListener('click', () => {
        const username = loginUsername.value.trim();
        const password = loginPassword.value;
        if (!username || !password) { loginError.textContent = 'Заполните поля!'; return; }
        const result = login(username, password);
        if (result.success) {
            currentUser = username;
            isGuest = false;
            userData = result.data;
            loginScreen.classList.add('hidden');
            splashScreen.classList.remove('hidden');
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                mainMenu.classList.remove('hidden');
                menuMusic.play().catch(e => {});
                startSakuraAnimation();
            }, 2000);
            updateUI();
        } else { loginError.textContent = result.error; }
    });
    
    registerBtn.addEventListener('click', () => {
        const username = regUsername.value.trim();
        const password = regPassword.value;
        const confirm = regConfirm.value;
        if (!username || !password) { registerError.textContent = 'Заполните поля!'; return; }
        if (password !== confirm) { registerError.textContent = 'Пароли не совпадают!'; return; }
        const result = register(username, password);
        if (result.success) {
            registerError.textContent = 'Регистрация успешна! Теперь войдите.';
            registerError.style.color = '#4caf50';
            setTimeout(() => { loginTab.click(); loginUsername.value = username; loginPassword.value = password; registerError.textContent = ''; }, 1500);
        } else { registerError.textContent = result.error; }
    });
    
    guestBtn.addEventListener('click', () => {
        currentUser = 'guest_' + Date.now();
        isGuest = true;
        userData = { username: currentUser, trophies: 0, jade: 0, tokens: 0, isClancyUnlocked: false, isRosaUnlocked: false, healthBoost: 0, damageBoost: 0 };
        loginScreen.classList.add('hidden');
        splashScreen.classList.remove('hidden');
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            mainMenu.classList.remove('hidden');
            menuMusic.play().catch(e => {});
            startSakuraAnimation();
        }, 2000);
        updateUI();
    });
    
    logoutBtn.addEventListener('click', logout);
    
    acceptNameBtn.addEventListener('click', () => {
        playerName = playerNameInput.value.trim();
        if (playerName) showCharacterSelect();
        else alert('Введите имя!');
    });
    
    sheggaBtn.addEventListener('click', () => selectCharacter('shegga'));
    mortakBtn.addEventListener('click', () => selectCharacter('mortak'));
    bullyBtn.addEventListener('click', () => selectCharacter('bully'));
    scrapBtn.addEventListener('click', () => selectCharacter('scrap'));
    clancyBtn.addEventListener('click', () => {
        if (userData.isClancyUnlocked) selectCharacter('clancy');
        else alert('Клэнси заблокирован! Купите за 2500 нефритов.');
    });
    rosaBtn.addEventListener('click', () => {
        if (userData.isRosaUnlocked) selectCharacter('rosa');
        else alert('Роза заблокирована! Купите за 3000 нефритов.');
    });
    
    startGameBtn.addEventListener('click', startGame);
    shopBtn.addEventListener('click', () => shopMenu.classList.remove('hidden'));
    chestBtn.addEventListener('click', openChest);
    closeShopBtn.addEventListener('click', () => shopMenu.classList.add('hidden'));
    closeNotificationBtn.addEventListener('click', () => chestNotification.classList.add('hidden'));
    
    buyClancyBtn.addEventListener('click', () => {
        if (userData.jade >= 2500 && !userData.isClancyUnlocked) {
            userData.jade -= 2500;
            userData.isClancyUnlocked = true;
            saveUserData();
            updateUI();
            alert('Клэнси разблокирован!');
        } else alert('Не хватает нефритов!');
    });
    
    buyRosaBtn.addEventListener('click', () => {
        if (userData.jade >= 3000 && !userData.isRosaUnlocked) {
            userData.jade -= 3000;
            userData.isRosaUnlocked = true;
            saveUserData();
            updateUI();
            alert('Роза разблокирована!');
        } else alert('Не хватает нефритов!');
    });
    
    buyHealthBtn.addEventListener('click', () => {
        if (userData.jade >= 500) {
            userData.jade -= 500;
            userData.healthBoost += 500;
            saveUserData();
            updateUI();
            alert('Здоровье +500!');
        } else alert('Не хватает нефритов!');
    });
    
    soloModeBtn.addEventListener('click', () => {
        gameMode = 'solo';
        soloModeBtn.classList.add('active');
        captureModeBtn.classList.remove('active');
        knockoutModeBtn.classList.remove('active');
    });
    captureModeBtn.addEventListener('click', () => {
        gameMode = 'capture';
        captureModeBtn.classList.add('active');
        soloModeBtn.classList.remove('active');
        knockoutModeBtn.classList.remove('active');
    });
    knockoutModeBtn.addEventListener('click', () => {
        gameMode = 'knockout';
        knockoutModeBtn.classList.add('active');
        soloModeBtn.classList.remove('active');
        captureModeBtn.classList.remove('active');
    });
    
    playAgainBtnWin.addEventListener('click', startGame);
    mainMenuBtnWin.addEventListener('click', showMainMenu);
    playAgainBtnLose.addEventListener('click', startGame);
    mainMenuBtnLose.addEventListener('click', showMainMenu);
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    if (isMobileDevice()) {
        createTouchControls();
    }
}

function selectCharacter(character) {
    selectedCharacter = character;
    const stats = characterStats[character];
    player.color = stats.color;
    player.ammoType = stats.ammoType;
    player.damage = stats.damage + userData.damageBoost;
    player.speed = stats.speed;
    player.characterType = character;
    startGameBtn.classList.remove('hidden');
}

function showCharacterSelect() {
    nameInputSection.classList.add('hidden');
    characterSelect.classList.remove('hidden');
}

function startGame() {
    if (!selectedCharacter) { alert('Выберите персонажа!'); return; }
    hideScreens();
    menuMusic.pause();
    gameContainer.classList.remove('hidden');
    gameActive = true;
    stopSakuraAnimation();
    
    if (gameMode === 'knockout') {
        currentRound = 1;
        playerWins = 0;
        enemyWins = 0;
        startKnockoutRound();
    } else if (gameMode === 'capture') {
        startCaptureMode();
    } else {
        startSoloMode();
    }
    
    if (animationFrame) cancelAnimationFrame(animationFrame);
    gameLoop();
}

function startSoloMode() {
    player.x = 100; player.y = 300;
    player.health = 4000 + userData.healthBoost;
    player.maxHealth = 4000 + userData.healthBoost;
    player.trophies = 0; player.tokens = 0;
    player.superActive = false; player.shieldActive = false;
    
    enemies = [];
    for (let i = 0; i < 9; i++) {
        enemies.push(createBot(Math.random() * (mapWidth - 100) + 50, Math.random() * (mapHeight - 100) + 50, getRandomCharacterType(), false));
    }
    
    allies = [];
    flowers = [];
    for (let i = 0; i < totalFlowers; i++) {
        flowers.push({ x: Math.random() * (mapWidth - 100) + 50, y: Math.random() * (mapHeight - 100) + 50 });
    }
    collectedFlowers = 0;
    
    diamondsCountDisplay.classList.add('hidden');
    flowersCountDisplay.classList.remove('hidden');
    flowersCountDisplay.textContent = 'Цветочки: 0/' + totalFlowers;
    roundDisplay.classList.add('hidden');
    document.getElementById('capture-timer').classList.add('hidden');
    document.getElementById('team-scores').classList.add('hidden');
}

function startCaptureMode() {
    player.x = 100; player.y = 300;
    player.health = 4000 + userData.healthBoost;
    player.maxHealth = 4000 + userData.healthBoost;
    player.trophies = 0; player.tokens = 0;
    player.heldDiamonds = 0;
    
    allies = [];
    enemies = [];
    for (let i = 0; i < 2; i++) allies.push(createBot(120 + i * 70, 480, getRandomCharacterType(), true));
    for (let i = 0; i < 3; i++) enemies.push(createBot(700 + i * 60, 120, getRandomCharacterType(), false));
    
    diamonds = [];
    for (let i = 0; i < totalDiamondsNeeded; i++) {
        diamonds.push({ x: Math.random() * (mapWidth - 100) + 50, y: Math.random() * (mapHeight - 100) + 50 });
    }
    
    collectedDiamonds = 0;
    enemyTeamDiamonds = 0;
    isTimerRunning = false;
    captureTimer = 0;
    
    diamondsCountDisplay.classList.remove('hidden');
    diamondsCountDisplay.textContent = 'Алмазы: 0/' + totalDiamondsNeeded;
    flowersCountDisplay.classList.add('hidden');
    roundDisplay.classList.add('hidden');
    document.getElementById('capture-timer').classList.remove('hidden');
    document.getElementById('team-scores').classList.remove('hidden');
    document.getElementById('capture-timer').textContent = 'Ожидание...';
    document.getElementById('team-scores').innerHTML = '<div>Наша: 0</div><div>Враги: 0</div>';
}

function startKnockoutRound() {
    player.x = 100; player.y = 300;
    player.health = 4000 + userData.healthBoost;
    player.maxHealth = 4000 + userData.healthBoost;
    player.superActive = false; player.shieldActive = false;
    
    allies = [];
    enemies = [];
    for (let i = 0; i < 2; i++) allies.push(createBot(120 + i * 70, 350, getRandomCharacterType(), true));
    for (let i = 0; i < 2; i++) enemies.push(createBot(700 + i * 60, 250, getRandomCharacterType(), false));
    
    bullets = [];
    
    roundDisplay.classList.remove('hidden');
    roundNumberSpan.textContent = currentRound;
    playerHealthDisplay.textContent = 'Здоровье: ' + player.health;
    enemiesRemainingDisplay.textContent = 'Врагов: ' + enemies.length;
    
    trophyCountDisplay.classList.add('hidden');
    tokenCountDisplay.classList.add('hidden');
    diamondsCountDisplay.classList.add('hidden');
    flowersCountDisplay.classList.add('hidden');
    document.getElementById('capture-timer').classList.add('hidden');
    document.getElementById('team-scores').classList.add('hidden');
}

function showMainMenu() {
    gameActive = false;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    hideScreens();
    mainMenu.classList.remove('hidden');
    menuMusic.play();
    startSakuraAnimation();
    updateUI();
}

function gameLoop() {
    if (!gameActive || gameContainer.classList.contains('hidden')) return;
    handleMovement();
    updateBots();
    updateBullets();
    updateTimers();
    checkCollisions();
    draw();
    animationFrame = requestAnimationFrame(gameLoop);
}

function updateBots() {
    // Обновляем союзников
    for (let i = 0; i < allies.length; i++) {
        const ally = allies[i];
        if (ally.health <= 0) { 
            if (gameMode === 'capture' && ally.heldDiamonds > 0) {
                for (let j = 0; j < ally.heldDiamonds; j++) diamonds.push({ x: ally.x, y: ally.y });
            }
            allies.splice(i, 1); 
            i--; 
            continue; 
        }
        
        // Поиск цели (врага)
        let target = null;
        if (enemies.length > 0) {
            target = enemies[0];
            let minDist = Infinity;
            for (const enemy of enemies) {
                const dist = Math.hypot(ally.x - enemy.x, ally.y - enemy.y);
                if (dist < minDist) {
                    minDist = dist;
                    target = enemy;
                }
            }
        }
        
        if (target) {
            const angle = Math.atan2(target.y - ally.y, target.x - ally.x);
            ally.x += Math.cos(angle) * ally.speed;
            ally.y += Math.sin(angle) * ally.speed;
        }
        
        ally.x = Math.max(ally.radius, Math.min(mapWidth - ally.radius, ally.x));
        ally.y = Math.max(ally.radius, Math.min(mapHeight - ally.radius, ally.y));
        
        if (ally.attackCooldown > 0) ally.attackCooldown--;
        if (ally.attackCooldown === 0 && target) {
            botShoot(ally, target);
            ally.attackCooldown = 45;
        }
    }
    
    // Обновляем врагов
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (enemy.health <= 0) { 
            if (gameMode === 'capture' && enemy.heldDiamonds > 0) {
                for (let j = 0; j < enemy.heldDiamonds; j++) diamonds.push({ x: enemy.x, y: enemy.y });
            }
            enemies.splice(i, 1); 
            i--; 
            continue; 
        }
        
        // Поиск цели (игрок или союзник)
        let target = player;
        let minDist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        for (const ally of allies) {
            const dist = Math.hypot(enemy.x - ally.x, enemy.y - ally.y);
            if (dist < minDist) {
                minDist = dist;
                target = ally;
            }
        }
        
        const angle = Math.atan2(target.y - enemy.y, target.x - enemy.x);
        enemy.x += Math.cos(angle) * enemy.speed;
        enemy.y += Math.sin(angle) * enemy.speed;
        enemy.x = Math.max(enemy.radius, Math.min(mapWidth - enemy.radius, enemy.x));
        enemy.y = Math.max(enemy.radius, Math.min(mapHeight - enemy.radius, enemy.y));
        
        if (enemy.attackCooldown > 0) enemy.attackCooldown--;
        if (enemy.attackCooldown === 0) {
            botShoot(enemy, target);
            enemy.attackCooldown = 45;
        }
    }
    
    enemiesRemainingDisplay.textContent = 'Врагов: ' + enemies.length;
    trophyCountDisplay.textContent = 'Трофеи: ' + player.trophies;
    tokenCountDisplay.textContent = 'Жетоны: ' + player.tokens;
}

function botShoot(bot, target) {
    const angle = Math.atan2(target.y - bot.y, target.x - bot.x);
    
    switch (bot.ammoType) {
        case 'wave':
            for (let i = -0.3; i <= 0.3; i += 0.15) {
                bullets.push({ x: bot.x, y: bot.y, radius: 5, speed: 5, angle: angle + i, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            }
            break;
        case 'double':
            bullets.push({ x: bot.x, y: bot.y, radius: 5, speed: 5, angle: angle - 0.1, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            bullets.push({ x: bot.x, y: bot.y, radius: 5, speed: 5, angle: angle + 0.1, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            break;
        case 'quad':
            bullets.push({ x: bot.x, y: bot.y, radius: 4, speed: 5, angle: angle - 0.15, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            bullets.push({ x: bot.x, y: bot.y, radius: 4, speed: 5, angle: angle - 0.05, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            bullets.push({ x: bot.x, y: bot.y, radius: 4, speed: 5, angle: angle + 0.05, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            bullets.push({ x: bot.x, y: bot.y, radius: 4, speed: 5, angle: angle + 0.15, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            break;
        case 'triple':
            bullets.push({ x: bot.x, y: bot.y, radius: 5, speed: 5, angle: angle - 0.1, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            bullets.push({ x: bot.x, y: bot.y, radius: 5, speed: 5, angle: angle, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            bullets.push({ x: bot.x, y: bot.y, radius: 5, speed: 5, angle: angle + 0.1, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
            break;
        default:
            bullets.push({ x: bot.x, y: bot.y, radius: 5, speed: 5, angle: angle, color: bot.color, damage: bot.damage / 2, isBot: true, owner: bot });
    }
}

function updateTimers() {
    if (gameMode === 'capture' && isTimerRunning) {
        captureTimer--;
        document.getElementById('capture-timer').textContent = 'До победы: ' + captureTimer + ' сек';
        if (captureTimer <= 0) winGame();
    }
    if (player.shieldActive) {
        player.shieldDuration--;
        if (player.shieldDuration <= 0) player.shieldActive = false;
    }
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += Math.cos(b.angle) * b.speed;
        b.y += Math.sin(b.angle) * b.speed;
        if (b.x < -100 || b.x > mapWidth + 100 || b.y < -100 || b.y > mapHeight + 100) bullets.splice(i, 1);
    }
}

function checkCollisions() {
    // Пули врагов по игроку
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        if (bullet.isBot && bullet.owner?.isAlly === false) {
            if (Math.hypot(bullet.x - player.x, bullet.y - player.y) < bullet.radius + player.radius) {
                if (player.shieldActive) {
                    const angle = Math.atan2(player.y - bullet.y, player.x - bullet.x);
                    bullet.angle = angle + Math.PI;
                    bullet.x += Math.cos(bullet.angle) * 20;
                    bullet.y += Math.sin(bullet.angle) * 20;
                } else {
                    player.health -= bullet.damage / 10;
                    bullets.splice(i, 1);
                    playerHealthDisplay.textContent = 'Здоровье: ' + Math.floor(player.health);
                    if (player.health <= 0) {
                        if (gameMode === 'knockout') {
                            enemyWins++;
                            if (enemyWins >= 2) loseGame();
                            else { currentRound++; startKnockoutRound(); }
                        } else loseGame();
                        return;
                    }
                }
            }
        }
    }
    
    // Пули игрока по врагам
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        if (!bullet.isBot) {
            for (let j = 0; j < enemies.length; j++) {
                const enemy = enemies[j];
                if (Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < bullet.radius + enemy.radius) {
                    enemy.health -= bullet.damage;
                    bullets.splice(i, 1);
                    if (enemy.health <= 0) {
                        enemies.splice(j, 1);
                        if (gameMode !== 'knockout') {
                            player.trophies += 50;
                            player.tokens += 1;
                            userData.tokens += 1;
                            if (Math.random() < 0.2) {
                                userData.jade += Math.floor(Math.random() * 100) + 50;
                                updateUI();
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
    
    // Столкновение игрока с врагами (отталкивание)
    for (const enemy of enemies) {
        if (Math.hypot(player.x - enemy.x, player.y - enemy.y) < player.radius + enemy.radius) {
            if (player.shieldActive) {
                enemy.health -= 300;
                if (enemy.health <= 0) enemies.splice(enemies.indexOf(enemy), 1);
            } else {
                player.health -= 10;
                playerHealthDisplay.textContent = 'Здоровье: ' + Math.floor(player.health);
                if (player.health <= 0) {
                    if (gameMode === 'knockout') {
                        enemyWins++;
                        if (enemyWins >= 2) loseGame();
                        else { currentRound++; startKnockoutRound(); }
                    } else loseGame();
                    return;
                }
                // Отталкивание
                const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
                player.x += Math.cos(angle) * 12;
                player.y += Math.sin(angle) * 12;
            }
            break;
        }
    }
    
    // Цветочки в одиночном режиме
    if (gameMode === 'solo') {
        for (let i = flowers.length - 1; i >= 0; i--) {
            if (Math.hypot(player.x - flowers[i].x, player.y - flowers[i].y) < player.radius + 6) {
                flowers.splice(i, 1);
                collectedFlowers++;
                player.trophies++;
                userData.trophies++;
                flowerSound.play().catch(e => {});
                flowersCountDisplay.textContent = 'Цветочки: ' + collectedFlowers + '/' + totalFlowers;
                updateUI();
                if (collectedFlowers >= totalFlowers && enemies.length === 0) winGame();
            }
        }
    }
    
    // Алмазы в режиме захвата
    if (gameMode === 'capture') {
        for (let i = diamonds.length - 1; i >= 0; i--) {
            if (Math.hypot(player.x - diamonds[i].x, player.y - diamonds[i].y) < player.radius + 8) {
                diamonds.splice(i, 1);
                collectedDiamonds++;
                gemSound.play().catch(e => {});
                diamondsCountDisplay.textContent = 'Алмазы: ' + collectedDiamonds + '/' + totalDiamondsNeeded;
                document.getElementById('team-scores').innerHTML = '<div>Наша: ' + collectedDiamonds + '</div><div>Враги: ' + enemyTeamDiamonds + '</div>';
                if (collectedDiamonds >= totalDiamondsNeeded && !isTimerRunning) { isTimerRunning = true; captureTimer = 15; }
            }
        }
        if (enemyTeamDiamonds >= totalDiamondsNeeded) loseGame();
    }
    
    if (gameMode === 'solo' && enemies.length === 0) winGame();
    if (gameMode === 'knockout' && enemies.length === 0) {
        playerWins++;
        if (playerWins >= 2) winGame();
        else { currentRound++; startKnockoutRound(); }
    }
}

function draw() {
    ctx.clearRect(0, 0, mapWidth, mapHeight);
    
    // Разные карты для разных режимов
    if (gameMode === 'knockout') {
        // Специальная карта для нокаута
        const grad = ctx.createLinearGradient(0, 0, mapWidth, 0);
        grad.addColorStop(0, '#4a148c');
        grad.addColorStop(0.5, '#6a1b9a');
        grad.addColorStop(1, '#4a148c');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, mapWidth, mapHeight);
        
        ctx.strokeStyle = '#ff9800';
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 20]);
        ctx.beginPath();
        ctx.moveTo(mapWidth/2, 0);
        ctx.lineTo(mapWidth/2, mapHeight);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Площадки для команд
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(50, 200, 300, 200);
        ctx.fillRect(mapWidth - 350, 200, 300, 200);
    } else if (gameMode === 'capture') {
        // Специальная карта для захвата алмазов
        ctx.fillStyle = '#1a237e';
        ctx.fillRect(0, 0, mapWidth, mapHeight);
        
        // Центральная арена
        ctx.fillStyle = '#283593';
        ctx.fillRect(mapWidth/2 - 150, mapHeight/2 - 150, 300, 300);
        
        // Базовые зоны
        ctx.fillStyle = '#0d47a1';
        ctx.fillRect(50, mapHeight/2 - 100, 150, 200);
        ctx.fillRect(mapWidth - 200, mapHeight/2 - 100, 150, 200);
    } else {
        // Обычная карта для одиночного режима
        ctx.fillStyle = '#2d5016';
        ctx.fillRect(0, 0, mapWidth, mapHeight);
        
        ctx.fillStyle = '#4a7c24';
        for (let i = 0; i < 200; i++) ctx.fillRect((i * 17) % mapWidth, mapHeight - 15, 5, 15);
        
        ctx.fillStyle = '#2196f3';
        ctx.fillRect(100, 150, 150, 50);
        ctx.fillRect(550, 350, 100, 70);
    }
    
    // Препятствия (общие для всех)
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(150, 100, 60, 60);
    ctx.fillRect(400, 250, 50, 80);
    ctx.fillRect(600, 150, 60, 60);
    ctx.fillRect(200, 450, 50, 50);
    ctx.fillRect(550, 450, 60, 60);
    
    // Цветочки только в одиночном режиме
    if (gameMode === 'solo') {
        flowers.forEach(flower => {
            ctx.fillStyle = '#ff69b4';
            ctx.beginPath();
            ctx.arc(flower.x, flower.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffeb3b';
            ctx.beginPath();
            ctx.arc(flower.x, flower.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    // Алмазы
    diamonds.forEach(diamond => {
        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.moveTo(diamond.x, diamond.y - 10);
        ctx.lineTo(diamond.x + 7, diamond.y - 3);
        ctx.lineTo(diamond.x + 7, diamond.y + 3);
        ctx.lineTo(diamond.x, diamond.y + 10);
        ctx.lineTo(diamond.x - 7, diamond.y + 3);
        ctx.lineTo(diamond.x - 7, diamond.y - 3);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(diamond.x - 2, diamond.y - 2);
        ctx.lineTo(diamond.x, diamond.y - 6);
        ctx.lineTo(diamond.x + 2, diamond.y - 2);
        ctx.fill();
    });
    
    // Союзники
    allies.forEach(ally => {
        ctx.beginPath();
        ctx.arc(ally.x, ally.y, ally.radius, 0, Math.PI * 2);
        ctx.fillStyle = ally.color;
        ctx.fill();
        drawFaceOnBall(ctx, ally.x, ally.y, ally.radius, ally.characterType);
        const healthPercent = ally.health / ally.maxHealth;
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(ally.x - 15, ally.y - 20, 30, 4);
        ctx.fillStyle = '#33ff33';
        ctx.fillRect(ally.x - 15, ally.y - 20, 30 * healthPercent, 4);
    });
    
    // Враги
    enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fillStyle = enemy.color;
        ctx.fill();
        drawFaceOnBall(ctx, enemy.x, enemy.y, enemy.radius, enemy.characterType);
        const healthPercent = enemy.health / enemy.maxHealth;
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(enemy.x - 15, enemy.y - 20, 30, 4);
        ctx.fillStyle = '#33ff33';
        ctx.fillRect(enemy.x - 15, enemy.y - 20, 30 * healthPercent, 4);
    });
    
    // Пули
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = bullet.color;
        ctx.fill();
    });
    
    // Игрок
    if (player.shieldActive) {
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius + 8, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffccbc';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    drawFaceOnBall(ctx, player.x, player.y, player.radius, selectedCharacter);
    
    if (selectedCharacter === 'clancy') {
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffee44';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    const healthPercent = player.health / player.maxHealth;
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(player.x - 20, player.y - 25, 40, 5);
    ctx.fillStyle = '#33ff33';
    ctx.fillRect(player.x - 20, player.y - 25, 40 * healthPercent, 5);
}

const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, ' ': false, Shift: false };

function handleKeyDown(e) {
    if (keys.hasOwnProperty(e.key)) {
        e.preventDefault();
        keys[e.key] = true;
        if (e.key === ' ') shoot();
        if (e.key === 'Shift') superAttack();
    }
}

function handleKeyUp(e) {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
}

function handleMovement() {
    let dx = 0, dy = 0;
    
    // Клавиатура
    if (keys.ArrowUp) dy = -1;
    if (keys.ArrowDown) dy = 1;
    if (keys.ArrowLeft) dx = -1;
    if (keys.ArrowRight) dx = 1;
    
    // Джойстик для мобильных
    if (window.joystickVector) {
        dx += window.joystickVector.x;
        dy += window.joystickVector.y;
    }
    
    if (Math.abs(dx) > 1) dx = dx / Math.abs(dx);
    if (Math.abs(dy) > 1) dy = dy / Math.abs(dy);
    if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }
    
    let newX = player.x + dx * player.speed;
    let newY = player.y + dy * player.speed;
    newX = Math.max(player.radius, Math.min(mapWidth - player.radius, newX));
    newY = Math.max(player.radius, Math.min(mapHeight - player.radius, newY));
    
    const obstacles = [[150,100,60,60], [400,250,50,80], [600,150,60,60], [200,450,50,50], [550,450,60,60]];
    for (const obs of obstacles) {
        if (newX + player.radius > obs[0] && newX - player.radius < obs[0] + obs[2] &&
            newY + player.radius > obs[1] && newY - player.radius < obs[1] + obs[3]) return;
    }
    player.x = newX;
    player.y = newY;
}

function shoot() {
    if (!gameActive) return;
    shootSound.currentTime = 0;
    shootSound.play().catch(e => {});
    
    switch (player.ammoType) {
        case 'wave': for (let i = -0.4; i <= 0.4; i += 0.2) createBullet(i); break;
        case 'double': createBullet(-0.1); createBullet(0.1); break;
        case 'quad': createBullet(-0.2); createBullet(-0.1); createBullet(0.1); createBullet(0.2); break;
        case 'triple': createBullet(0); createBullet(-0.12); createBullet(0.12); break;
        case 'lightning': createBullet(-0.15, 7, 7); createBullet(0, 7, 7); createBullet(0.15, 7, 7); break;
        case 'big': createBullet(-0.2, 8, 10); createBullet(0, 8, 10); createBullet(0.2, 8, 10); break;
        default: createBullet(0);
    }
}

function createBullet(angle, speed = 6, radius = 5) {
    bullets.push({ x: player.x, y: player.y, radius: radius, speed: speed, angle: angle, color: player.color, damage: player.damage, isBot: false });
}

function superAttack() {
    if (player.superActive) return;
    player.superActive = true;
    
    switch (selectedCharacter) {
        case 'shegga':
            for (let i = 0; i < 24; i++) createBullet((Math.PI * 2 * i) / 24);
            setTimeout(() => player.superActive = false, 1000);
            break;
        case 'mortak':
            player.speed = 7;
            setTimeout(() => { player.speed = characterStats.mortak.speed; player.superActive = false; }, 3000);
            return;
        case 'bully':
            for (let i = 0; i < 16; i++) createBullet((Math.PI * 2 * i) / 16);
            setTimeout(() => player.superActive = false, 1000);
            break;
        case 'scrap':
            for (let i = -0.3; i <= 0.3; i += 0.1) createBullet(i);
            setTimeout(() => player.superActive = false, 1000);
            break;
        case 'clancy':
            player.speed = 8;
            const interval = setInterval(() => { if (gameActive) createBullet(-0.15, 7, 7); createBullet(0, 7, 7); createBullet(0.15, 7, 7); }, 100);
            setTimeout(() => { clearInterval(interval); player.speed = characterStats.clancy.speed; player.superActive = false; }, 2000);
            return;
        case 'rosa':
            player.shieldActive = true;
            player.shieldDuration = 300;
            shieldSound.play().catch(e => {});
            setTimeout(() => player.superActive = false, 5000);
            return;
        default: setTimeout(() => player.superActive = false, 1000);
    }
}

function openChest() {
    if (userData.tokens >= 10) {
        userData.tokens -= 10;
        userData.jade += 2500;
        jadeRewardDisplay.textContent = '2500';
        chestNotification.classList.remove('hidden');
        chestSound.play().catch(e => {});
        updateUI();
        saveUserData();
    } else {
        alert('Не хватает жетонов! Нужно 10.');
    }
}

function winGame() {
    gameActive = false;
    let trophiesEarned = 0, tokensEarned = 0;
    if (gameMode === 'solo') { trophiesEarned = 500 + collectedFlowers; tokensEarned = 5; }
    else if (gameMode === 'capture') { trophiesEarned = 400; tokensEarned = 8; }
    else if (gameMode === 'knockout') { trophiesEarned = 200; tokensEarned = 4; }
    
    userData.trophies += trophiesEarned;
    userData.tokens += tokensEarned;
    document.getElementById('trophies-earned').textContent = trophiesEarned;
    document.getElementById('tokens-earned').textContent = tokensEarned;
    saveUserData();
    updateUI();
    hideScreens();
    winScreen.classList.remove('hidden');
}

function loseGame() {
    gameActive = false;
    const trophiesEarned = Math.floor(player.trophies * 0.2);
    const tokensEarned = Math.floor(player.tokens * 0.5);
    userData.trophies += trophiesEarned;
    userData.tokens += tokensEarned;
    document.getElementById('trophies-lost').textContent = trophiesEarned;
    document.getElementById('tokens-lost').textContent = tokensEarned;
    saveUserData();
    updateUI();
    hideScreens();
    loseScreen.classList.remove('hidden');
}

function hideScreens() {
    splashScreen.classList.add('hidden');
    mainMenu.classList.add('hidden');
    gameContainer.classList.add('hidden');
    winScreen.classList.add('hidden');
    loseScreen.classList.add('hidden');
    shopMenu.classList.add('hidden');
    chestNotification.classList.add('hidden');
}

window.onload = function() {
    splashScreen.classList.remove('hidden');
    loginScreen.classList.remove('hidden');
    init();
};