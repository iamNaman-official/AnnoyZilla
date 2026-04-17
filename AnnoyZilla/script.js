document.getElementById("annoy-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Stop form submission reloading the page
    
    // Extract input values
    const targetName = document.getElementById("friend-name").value;
    const message = document.getElementById("annoying-message").value;
    const count = parseInt(document.getElementById("message-count").value, 10);
    const delay = parseInt(document.getElementById("popup-delay").value, 10);
    const theme = document.getElementById("popup-theme").value;
    
    // Hide the main form completely (or optionally keep it)
    document.querySelector(".main-form").style.display = "none";
    
    // Container for the chaotic popups
    const container = document.getElementById("popup-container");
    
    let spawnedCount = 0;
    
    const allowedThemes = [
        "theme-default", "theme-anime", "theme-scifi", "theme-cartoon", "theme-hacker",
        "theme-vaporwave", "theme-cyberpunk", "theme-fantasy", "theme-minimalist", "theme-gothic",
        "theme-steampunk", "theme-noir", "theme-neon", "theme-pastel", "theme-grunge",
        "theme-retrowave", "theme-8bit", "theme-matrix", "theme-glitch", "theme-comic",
        "theme-popart", "theme-royal", "theme-undersea", "theme-space", "theme-inferno", "theme-candy"
    ];

    // Function to spawn one popup
    const spawnPopup = () => {
        if (spawnedCount >= count) {
            return; // We reached the limit
        }
        
        // Validate theme fallback for local spawn as well
        const validTheme = allowedThemes.includes(theme) ? theme : "theme-default";
        
        // Spawn interval loop
        const popup = document.createElement("div");
        popup.className = `annoying-popup ${validTheme}`;
        
        // Construct inner HTML layout
        popup.innerHTML = `
            <div class="header">
                [SYSTEM WARNING] <button class="close-btn">X</button>
            </div>
            <div class="message">
                <h2 id="targetNameHeading"></h2>
                <br>
                <p id="targetMessageP"></p>
            </div>
        `;
        popup.querySelector("#targetNameHeading").textContent = "!!! HEY " + targetName.toUpperCase() + " !!!";
        popup.querySelector("#targetMessageP").textContent = "=> " + message;
        
        // Generate random absolute position (constrain right/bottom to avoid off-screen)
        // Assuming min width of ~250 and height ~200 just rough estimation
        const maxWidth = window.innerWidth - 300;
        const maxHeight = window.innerHeight - 200;
        
        const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
        const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));
        
        popup.style.left = `${randomX}px`;
        popup.style.top = `${randomY}px`;
        
        // Close event listener
        popup.querySelector(".close-btn").addEventListener("click", () => {
            popup.remove();
            
            // Check if all are closed to bring back form
            if (document.querySelectorAll(".annoying-popup").length === 0 && spawnedCount >= count) {
                showEndScreen(targetName);
            }
        });
        
        // Append to container
        container.appendChild(popup);
        
        spawnedCount++;
        
        // Schedule next popup
        setTimeout(spawnPopup, delay);
    };
    
    // Begin spawning
    spawnPopup();
});

// Update delay display when slider moves
document.getElementById("popup-delay").addEventListener("input", (e) => {
    document.getElementById("delay-display").textContent = e.target.value;
});

// Boot screen sequence for creator
function runBootSequence() {
    const bootScreen = document.getElementById("boot-screen");
    const bootPrompt = document.getElementById("boot-prompt");
    const bootSequence = document.getElementById("boot-sequence");
    const warningMsg = document.getElementById("warning-msg");
    const scrollingLogo = document.getElementById("scrolling-logo");

    // Initialize sequence on click (no fullscreen for sender)
    bootScreen.addEventListener("click", () => {
        bootPrompt.style.display = "none";
        bootSequence.style.display = "block";

        // Scroll logo smoothly across the ENTIRE viewport width
        anime({
            targets: scrollingLogo,
            translateX: ['100vw', '-200vw'],
            duration: 2500,
            easing: 'linear',
            complete: () => {
                scrollingLogo.style.display = "none";
                warningMsg.style.display = "block";
                
                // Wait briefly, then trigger the matrix wave and show the form
                setTimeout(() => {
                    playGridAnimation(() => {
                        bootScreen.style.display = "none";
                        document.querySelector(".main-form").style.display = "block";
                    });
                }, 1500);
            }
        });
    }, { once: true });
}

// On page load, check if the URL has prank parameters
window.addEventListener("DOMContentLoaded", () => {
    
    // Build theme carousel
    const themesList = [
        { id: "theme-default", name: "Default" },
        { id: "theme-anime", name: "Anime" },
        { id: "theme-scifi", name: "Sci-Fi" },
        { id: "theme-cartoon", name: "Cartoon" },
        { id: "theme-hacker", name: "Hacker Max" },
        { id: "theme-vaporwave", name: "Vaporwave" },
        { id: "theme-cyberpunk", name: "Cyberpunk" },
        { id: "theme-fantasy", name: "Fantasy" },
        { id: "theme-minimalist", name: "Minimal" },
        { id: "theme-gothic", name: "Gothic" },
        { id: "theme-steampunk", name: "Steampunk" },
        { id: "theme-noir", name: "Noir" },
        { id: "theme-neon", name: "Neon" },
        { id: "theme-pastel", name: "Pastel" },
        { id: "theme-grunge", name: "Grunge" },
        { id: "theme-retrowave", name: "Retro-Wave" },
        { id: "theme-8bit", name: "8-Bit" },
        { id: "theme-matrix", name: "Matrix" },
        { id: "theme-glitch", name: "Glitch" },
        { id: "theme-comic", name: "Comic" },
        { id: "theme-popart", name: "Pop-Art" },
        { id: "theme-royal", name: "Royal" },
        { id: "theme-undersea", name: "Undersea" },
        { id: "theme-space", name: "Space" },
        { id: "theme-inferno", name: "Inferno" },
        { id: "theme-candy", name: "Candy" }
    ];

    const carousel = document.getElementById("theme-carousel");
    if (carousel) {
        themesList.forEach(t => {
            const card = document.createElement("div");
            card.className = "theme-card";
            if (t.id === "theme-default") card.classList.add("selected");
            card.textContent = t.name;
            
            card.addEventListener("click", () => {
                document.querySelectorAll(".theme-card").forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");
                document.getElementById("popup-theme").value = t.id;
                
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: card,
                        scale: [0.9, 1.05],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
            carousel.appendChild(card);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    let name = null;
    let message = null;
    let count = 10;
    let delay = 200;
    let theme = "theme-default";
    let isExpired = false;

    if (urlParams.has("d")) {
        try {
            const data = JSON.parse(decodeURIComponent(atob(urlParams.get("d"))));
            
            // Check expiration
            if (data.ex && data.ex > 0 && data.ts) {
                const expirationMs = data.ex * 60 * 1000;
                if (Date.now() > data.ts + expirationMs) {
                    isExpired = true;
                }
            }

            if (!isExpired) {
                name = data.n;
                message = data.m;
                count = parseInt(data.c, 10);
                if (data.dl) delay = parseInt(data.dl, 10);
                if (data.t) theme = data.t;
            }
        } catch (e) {
            console.error("Failed to decode payload", e);
        }
    } else if (urlParams.has("name") && urlParams.has("message") && urlParams.has("count")) {
        name = urlParams.get("name");
        message = urlParams.get("message");
        count = parseInt(urlParams.get("count"), 10) || 10;
        delay = parseInt(urlParams.get("delay"), 10) || 200;
        theme = urlParams.get("theme") || "theme-default";
    }

    // ADVANCED SECURITY: Bound Check limits to prevent Browser DoS (Denial of Service) attacks 
    // from malicious link parameters.
    count = isNaN(count) || count < 1 ? 10 : (count > 200 ? 200 : count);
    delay = isNaN(delay) || delay < 50 ? 50 : (delay > 10000 ? 10000 : delay);
    
    // Validate 'theme' parameter strictly to avoid Class Injection or directory traversal
    const validThemesArr = [
        "theme-default", "theme-anime", "theme-scifi", "theme-cartoon", "theme-hacker",
        "theme-vaporwave", "theme-cyberpunk", "theme-fantasy", "theme-minimalist", "theme-gothic",
        "theme-steampunk", "theme-noir", "theme-neon", "theme-pastel", "theme-grunge",
        "theme-retrowave", "theme-8bit", "theme-matrix", "theme-glitch", "theme-comic",
        "theme-popart", "theme-royal", "theme-undersea", "theme-space", "theme-inferno", "theme-candy"
    ];
    if (!validThemesArr.includes(theme)) {
        theme = "theme-default";
    }

    if (isExpired) {
        document.getElementById("boot-screen").style.display = "none";
        document.querySelector(".main-form").style.display = "none";
        
        const expiredScreen = document.createElement("div");
        expiredScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#ff0000;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Press Start 2P', monospace;z-index:99999;text-align:center;";
        expiredScreen.innerHTML = `
            <div style="font-size:3rem;margin-bottom:20px;">[LINK DESTROYED]</div>
            <p>This prank link has self-destructed and is no longer active.</p>
            <button onclick="window.location.href=window.location.pathname" class="btn-retro" style="margin-top:30px;">CREATE YOUR OWN</button>
        `;
        document.body.appendChild(expiredScreen);
    } else if (name && message) {
        
        // Hide boot screen for actual victims (we use decoy instead)
        document.getElementById("boot-screen").style.display = "none";
        
        // Hide the form and show the decoy screen
        document.querySelector(".main-form").style.display = "none";
        const decoyScreen = document.getElementById("decoy-screen");
        decoyScreen.style.display = "flex";
        
        // Wait for user interaction to trigger fullscreen and the attack
        document.getElementById("unlock-msg-btn").addEventListener("click", () => {
            // Intialize audio context on direct user gesture
            window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            window.audioCtx.resume();

            const docEl = document.documentElement;
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen().catch(e => console.log(e));
            } else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen().catch(e => console.log(e));
            } else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen().catch(e => console.log(e));
            } else if (docEl.msRequestFullscreen) {
                docEl.msRequestFullscreen().catch(e => console.log(e));
            }
            decoyScreen.style.display = "none";
            triggerAttack(name, message, count, delay, theme);
        });
    } else {
        // Normal creator flow
        runBootSequence();
        spawnRetroFigures();
    }
});

// Refactored trigger logic
function triggerAttack(targetName, message, count, delay, theme) {
    const container = document.getElementById("popup-container");
    let spawnedCount = 0;
    
    const spawnPopup = () => {
        if (spawnedCount >= count) return;
        
        // Trigger haptics and beep
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        if (window.audioCtx) {
            const osc = window.audioCtx.createOscillator();
            osc.frequency.setValueAtTime(800 + Math.random() * 400, window.audioCtx.currentTime);
            osc.type = "square";
            osc.connect(window.audioCtx.destination);
            osc.start();
            osc.stop(window.audioCtx.currentTime + 0.1);
        }

        const popup = document.createElement("div");
        popup.className = `annoying-popup ${theme}`;
        
        // Defending against Cross-Site Scripting (XSS) by treating data as text content 
        // rather than rendering dangerous HTML template tags
        popup.innerHTML = `
            <div class="header">
                [SYSTEM WARNING] <button class="close-btn">X</button>
            </div>
            <div class="message">
                <h2 class="target-name"></h2>
                <br>
                <p class="target-msg"></p>
            </div>
        `;
        
        popup.querySelector('.target-name').textContent = `!!! HEY ${targetName.toUpperCase()} !!!`;
        popup.querySelector('.target-msg').textContent = `=> ${message}`;
        
        const maxWidth = window.innerWidth - 300;
        const maxHeight = window.innerHeight - 200;
        
        const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
        const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));
        
        popup.style.left = `${randomX}px`;
        popup.style.top = `${randomY}px`;
        
        popup.querySelector(".close-btn").addEventListener("click", () => {
            popup.remove();
            if (document.querySelectorAll(".annoying-popup").length === 0 && spawnedCount >= count) {
                showEndScreen(targetName);
            }
        });
        
        container.appendChild(popup);
        spawnedCount++;
        
        setTimeout(spawnPopup, delay || (Math.random() * 200 + 50));
    };
    
    spawnPopup();
}

// Add event listener for the Generate Link button
document.getElementById("generate-link").addEventListener("click", (e) => {
    const targetName = document.getElementById("friend-name").value;
    const message = document.getElementById("annoying-message").value;
    const count = parseInt(document.getElementById("message-count").value, 10);
    const delay = parseInt(document.getElementById("popup-delay").value, 10);
    const theme = document.getElementById("popup-theme").value;
    const expiration = parseInt(document.getElementById("link-expiration").value, 10);
    
    if(!targetName || !message || isNaN(count)) {
        alert("Please fill out all fields before generating a link.");
        return;
    }
    
    // Construct URL with base64 encoded payload to hide params
    const currentUrl = window.location.href.split("?")[0];
    const encodedPayload = btoa(encodeURIComponent(JSON.stringify({ 
        n: targetName, 
        m: message, 
        c: count, 
        dl: delay, 
        t: theme, 
        ex: expiration, 
        ts: Date.now() 
    })));
    const uniqueLink = `${currentUrl}?d=${encodedPayload}`;
    
    const btn = e.target;
    const originalText = btn.innerText;
    
    // Check if running on localhost or file. Shorteners will hard-reject these.
    if (uniqueLink.includes("127.0.0.1") || uniqueLink.includes("localhost") || uniqueLink.startsWith("file://")) {
        btn.innerText = "LOCAL URL UN-SHORTENABLE";
        btn.style.background = "#ffba00"; // Warning Yellow
        btn.style.color = "#000";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.pointerEvents = "auto";
            btn.style.opacity = "1";
            btn.style.background = "#ff00ff";
            btn.style.color = "#fff";
        }, 2500);
        
        // Expose the long link safely so you can still copy and test manually
        document.getElementById("link-container").style.display = "block";
        document.getElementById("prank-link").value = uniqueLink;
        return; // Stop execution here
    }

    btn.innerText = "ENCRYPTING & SHORTENING...";
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.7";
    
    // Automatically use a free URL shortener API (no auth required)
    fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(uniqueLink)}`)
        .then(response => response.json())
        .then(data => {
            const finalLink = data.shorturl ? data.shorturl : uniqueLink;
            
            btn.innerText = "LINK GENERATED!";
            btn.style.background = "#33ff00";
            btn.style.color = "#000";
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.pointerEvents = "auto";
                btn.style.opacity = "1";
                btn.style.background = "#ff00ff";
                btn.style.color = "#fff";
            }, 2000);
            
            document.getElementById("link-container").style.display = "block";
            document.getElementById("prank-link").value = finalLink;
        })
        .catch(err => {
            // Fallback if the shortener fails
            console.error("Shortener failed, falling back", err);
            btn.innerText = "LINK GENERATED!";
            btn.style.background = "#33ff00";
            btn.style.color = "#000";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.pointerEvents = "auto";
                btn.style.opacity = "1";
                btn.style.background = "#ff00ff";
                btn.style.color = "#fff";
            }, 2000);
            document.getElementById("link-container").style.display = "block";
            document.getElementById("prank-link").value = uniqueLink;
        });
});

// Copy link functionality
document.getElementById("copy-link").addEventListener("click", (e) => {
    const linkInput = document.getElementById("prank-link");
    linkInput.select();
    document.execCommand("copy");
    
    const btn = e.target;
    btn.textContent = "COPIED!";
    anime({ targets: btn, scale: [0.9, 1.2, 1], rotate: [0, -10, 10, 0], duration: 400 });
    setTimeout(() => btn.textContent = "COPY", 1500);
});

// WhatsApp Share
document.getElementById("share-whatsapp").addEventListener("click", (e) => {
    const link = document.getElementById("prank-link").value;
    if(!link) return;
    const text = encodeURIComponent("Check out this hilarious message from me! 😂 " + link);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    
    anime({ targets: e.target, scale: [1, 1.3, 0.9, 1], color: ['#fff', '#25D366', '#fff'], duration: 600 });
});

// Telegram Share
document.getElementById("share-telegram").addEventListener("click", (e) => {
    const link = document.getElementById("prank-link").value;
    if(!link) return;
    const text = encodeURIComponent("Check out this hilarious message from me! 😂");
    window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${text}`, "_blank");
    
    anime({ targets: e.target, translateX: [0, 20, -20, 0], duration: 400 });
});

// Discord Share
document.getElementById("share-discord").addEventListener("click", (e) => {
    const linkInput = document.getElementById("prank-link");
    linkInput.select();
    document.execCommand("copy"); // Discord has no URL intent, so copy instead
    
    // Open Discord in a new tab (or app if they have handlers set up)
    window.open(`https://discord.com/channels/@me`, "_blank");
    
    anime({ targets: e.target, rotate: [0, 15, -15, 10, -10, 0], duration: 500 });
});

// Anime.js Stagger Grid Animation
const gridContainer = document.getElementById("intro-grid");
let columns = 0, rows = 0;

function createGrid() {
    if (!gridContainer) return;
    gridContainer.innerHTML = "";
    const size = 50; // 50px squares
    columns = Math.floor(window.innerWidth / size) + 1;
    rows = Math.floor(window.innerHeight / size) + 1;
    
    // Set explicit size for grid container items
    gridContainer.style.setProperty("--columns", columns);
    gridContainer.style.setProperty("--rows", rows);
    
    for (let i = 0; i < columns * rows; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        gridContainer.appendChild(tile);
    }
}

function playGridAnimation(callback) {
    if (!gridContainer) return;
    gridContainer.style.display = "flex";
    createGrid(); // Recreate matching current dimensions
    
    // Reset all
    anime.set(".tile", {
        scale: 0,
        backgroundColor: "#111"
    });
    
    // Play wave
    anime({
        targets: ".tile",
        scale: [
            {value: .1, easing: "easeOutSine", duration: 500},
            {value: 1, easing: "easeInOutQuad", duration: 1200}
        ],
        backgroundColor: [
            {value: "#33ff00", duration: 500},
            {value: "#114400", duration: 1000},
            {value: "#000", duration: 500}
        ],
        delay: anime.stagger(50, {grid: [columns, rows], from: "center"}),
        complete: function() {
            setTimeout(() => {
                 gridContainer.style.display = "none";
                 if (callback) callback();
            }, 500);
        }
    });
}

// --- RETRO MINI FIGURES GENERATOR ---
function spawnRetroFigures() {
    const numFigures = 15; 
    for(let i = 0; i < numFigures; i++) {
        setTimeout(createRandomInvader, Math.random() * 8000);
    }
}

function createRandomInvader() {
    const fig = document.createElement("div");
    fig.className = "retro-figure";
    
    const gridSize = 8;
    const colors = ['#33ff00', '#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    let pathData = '';
    for(let y = 0; y < gridSize; y++){
        for(let x = 0; x < Math.ceil(gridSize / 2); x++){
            if(Math.random() > 0.4) {
                pathData += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
                if (x !== gridSize - 1 - x) {
                    pathData += `<rect x="${gridSize - 1 - x}" y="${y}" width="1" height="1" fill="${color}"/>`;
                }
            }
        }
    }
    
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${gridSize} ${gridSize}">${pathData}</svg>`;
    const encodedSvg = 'data:image/svg+xml;base64,' + btoa(svgStr);
    
    fig.style.backgroundImage = `url('${encodedSvg}')`;
    
    const startY = Math.random() * window.innerHeight;
    const startX = Math.random() > 0.5 ? -100 : window.innerWidth + 100;
    const endX = startX < 0 ? window.innerWidth + 100 : -100;
    const endY = startY + (Math.random() * 200 - 100);
    const duration = Math.random() * 8000 + 4000;
    
    fig.style.left = startX + 'px';
    fig.style.top = startY + 'px';
    
    const scale = Math.random() * 1.5 + 0.5;
    fig.style.transform = `scale(${scale}) ${startX > 0 ? 'scaleX(-1)' : ''}`;
    
    document.body.appendChild(fig);
    
    anime({
        targets: fig,
        left: endX + 'px',
        top: endY + 'px',
        duration: duration,
        easing: 'linear',
        complete: () => {
            fig.remove();
            createRandomInvader();
        }
    });
}


function showEndScreen(victimName) {
    const endScreen = document.createElement("div");
    endScreen.id = "end-screen";
    endScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #000 25%, #111 25%, #111 50%, #000 50%, #000 75%, #111 75%, #111);
        background-size: 40px 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: 'Press Start 2P', monospace, cursive;
        color: #33ff00;
        text-align: center;
        flex-direction: column;
        gap: 30px;
        opacity: 0;
    `;
    
    endScreen.innerHTML = `
        <div style="font-size: 2em; color: #ff00ff; text-shadow: 0 0 10px #ff0000;">PRANK COMPLETE!</div>
        <div id="end-target-msg" style="font-size: 1.2em; color: #00ffff; text-shadow: 0 0 5px #00ffff;">
            <!-- XSS protection applied: Populated dynamically via textContent below -->
        </div>
        <div style="margin-top: 20px;">
            <button id="end-back-btn" class="btn-retro" style="background:#33ff00;color:#000;">PRANK SOMEONE ELSE</button>
        </div>
    `;
    
    endScreen.querySelector('#end-target-msg').textContent = `${victimName ? victimName.toUpperCase() : "TARGET"} HAS BEEN SUCCESSFULLY ANNOYED`;
    
    document.body.appendChild(endScreen);
    
    // Animate entrance
    if (typeof anime !== 'undefined') {
        anime({
            targets: endScreen,
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuad'
        });
    } else {
        endScreen.style.opacity = 1;
    }
    
    document.getElementById("end-back-btn").addEventListener("click", () => {
        if (typeof anime !== 'undefined') {
            anime({
                targets: endScreen,
                opacity: [1, 0],
                duration: 500,
                easing: 'easeInQuad',
                complete: () => {
                    endScreen.remove();
                    window.location.href = window.location.pathname;
                }
            });
        } else {
            endScreen.remove();
            window.location.href = window.location.pathname;
        }
    });
}
