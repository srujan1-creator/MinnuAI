// ================= AGENT PROFILES DATA =================
const agentData = {
    "arch-bot": {
        name: "Arch-Bot Alpha",
        badge: "ARCHITECT",
        badgeClass: "badge-architect",
        rating: "99.2%",
        desc: "System design specialist and cloud infrastructure optimizer. Arch-Bot Alpha designs microservices structures, configures CI/CD pipelines, and allocates container clusters based on target latency constraints.",
        capabilities: [
            "System Architecture Design",
            "AWS & GCP Cloud Cost Optimization",
            "Kubernetes Cluster Orchestration",
            "Microservices Dependency Auditing"
        ],
        avatarClass: "grad-1"
    },
    "pm-bot": {
        name: "PM-Bot Nexus",
        badge: "PRODUCT",
        badgeClass: "badge-product",
        rating: "98.5%",
        desc: "Product roadmap and agile sprint orchestrator. PM-Bot Nexus reads loose business objectives, resolves dependency chains, schedules development tasks, and generates comprehensive spec files for developers.",
        capabilities: [
            "Requirement Synthesis",
            "Agile Task Planning & Sprints Setup",
            "Cross-team Dependency Analysis",
            "Stakeholder Spec Validation"
        ],
        avatarClass: "grad-2"
    },
    "code-bot": {
        name: "Code-Bot Sigma",
        badge: "DEVELOPER",
        badgeClass: "badge-developer",
        rating: "97.9%",
        desc: "Lead Python developer and algorithm engineer. Code-Bot Sigma writes highly optimized APIs, integrates backend services, writes database queries, and executes refactoring scripts for performance optimization.",
        capabilities: [
            "FastAPI & Django App Engineering",
            "Relational & NoSQL Database Design",
            "Performance Code Profiling",
            "Automated Code Refactoring"
        ],
        avatarClass: "grad-3"
    },
    "guard-bot": {
        name: "Guard-Bot Delta",
        badge: "QA SYSTEM",
        badgeClass: "badge-qa",
        rating: "99.1%",
        desc: "Automated QA and integration testing engine. Guard-Bot Delta isolates runtime scripts, executes unit test suites, monitors CPU/memory logs, and verifies that code satisfies security guidelines.",
        capabilities: [
            "Pytest Automation Suite",
            "Fuzzing & Vulnerability Scans",
            "Performance Load Testing",
            "CI/CD Pipeline Verification Gates"
        ],
        avatarClass: "grad-4"
    }
};

// ================= TIMELINE NODES HTML TEMPLATES =================
const timelineTemplates = {
    agentA: `
        <div class="timeline-indicator">
            <div class="timeline-badge bg-badge-blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            </div>
            <div class="timeline-line"></div>
        </div>
        <div class="timeline-card card">
            <div class="timeline-card-header">
                <div>
                    <span class="agent-role">Agent A (Product Manager)</span>
                    <span class="requirement-tag">&bull; Requirement Definition</span>
                </div>
                <span class="timestamp">Just Now</span>
            </div>
            <div class="timeline-card-body">
                <h4>API Specification Requirements</h4>
                <ul class="specs-list">
                    <li>Endpoint: <code>/api/v1/coffee/order</code></li>
                    <li>Method: <strong>POST</strong></li>
                    <li>Input: JSON payload with client_id and client_secret</li>
                    <li>Output: JWT token with 1-hour expiration.</li>
                    <li>Error Handling: Standard 400/401 HTTP codes with structured JSON error response.</li>
                </ul>
            </div>
        </div>
    `,
    agentB: `
        <div class="timeline-indicator">
            <div class="timeline-badge bg-badge-red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
            </div>
            <div class="timeline-line"></div>
        </div>
        <div class="timeline-card card">
            <div class="timeline-card-header">
                <div>
                    <span class="agent-role">Agent B (Developer)</span>
                    <span class="requirement-tag">&bull; Implementation</span>
                </div>
                <span class="timestamp">Just Now</span>
            </div>
            <div class="timeline-card-body">
                <pre class="code-block-mock"><code>from fastapi import APIRouter, HTTP...
from pydantic import BaseModel
from datetime import datetime, time...
import jwt

router = APIRouter()
SECRET_KEY = "phoenix_core_secret"
ALGORITHM = "HS256"

class TokenRequest(BaseModel):
    client_id: str
    client_secret: str

@router.post("/api/v1/auth/token")
async def generate_token(request: T...
    if not verify_client(request.cl...
        raise HTTPException(
            status_code=401,
            detail={"error": "inval...
        )
    
    expires = datetime.utcnow() + t...
    payload = {"sub": request.clien...
    token = jwt.encode(payload, SEC...
    
    return {"access_token": token, ...</code></pre>
                <div class="code-footer">
                    <span class="code-status-text">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="status-check-icon">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Code implementation complete.
                    </span>
                    <button class="view-diff-btn">View Diff</button>
                </div>
            </div>
        </div>
    `,
    agentC: `
        <div class="timeline-indicator">
            <div class="timeline-badge bg-badge-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="9" y1="9" x2="15" y2="9"/>
                    <line x1="9" y1="13" x2="15" y2="13"/>
                    <line x1="9" y1="17" x2="13" y2="17"/>
                </svg>
            </div>
            <div class="timeline-line hidden"></div>
        </div>
        <div class="timeline-card card">
            <div class="timeline-card-header">
                <div>
                    <span class="agent-role">Agent C (QA Automation)</span>
                    <span class="requirement-tag">&bull; VerificationAM</span>
                </div>
                <span class="timestamp">Just Now</span>
            </div>
            <div class="timeline-card-body qa-refined-body">
                <h3>All Test Suites Passed</h3>
                <div class="qa-content-block">
                    <div class="qa-checkmark-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>
                    <p class="qa-details-text">
                        Executed 14 unit tests and 3 integration tests covering valid payloads, expired tokens, and malformed requests. No regressions detected.
                    </p>
                </div>
                <div class="qa-card-footer">
                    <span class="qa-footer-left">Coverage: 98.2%</span>
                    <span class="qa-footer-right">Duration: 1.2s</span>
                </div>
            </div>
        </div>
    `
};

document.addEventListener("DOMContentLoaded", () => {
    // Retrieve session or redirect
    let currentUser = null;
    try {
        currentUser = JSON.parse(localStorage.getItem("minnu_session"));
    } catch (e) {
        console.error("Failed to parse session:", e);
    }

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    // Helper to update UI with profile information
    function updateProfileUI(user) {
        if (!user) return;
        const profileNameInput = document.getElementById("profile-name-input");
        const profileRoleSelect = document.getElementById("profile-role-select");
        const sidebarNameElement = document.getElementById("active-user-name");
        const sidebarRoleElement = document.getElementById("active-user-role");
        const badgeElement = document.getElementById("profile-modal-badge");

        if (profileNameInput) profileNameInput.value = user.name || "";
        if (profileRoleSelect) profileRoleSelect.value = user.role || "Lead Orchestrator";
        if (sidebarNameElement) sidebarNameElement.textContent = user.name || "";
        if (sidebarRoleElement) sidebarRoleElement.textContent = user.role || "";
        
        // ---- Profile picture rendering ----
        const modalImg = document.getElementById("profile-modal-img");
        const modalPlaceholder = document.getElementById("profile-modal-placeholder");
        const profileBtnEls = document.querySelectorAll(".profile-btn-red");

        if (user.profile_pic) {
            // Show custom image in the modal avatar
            if (modalImg) {
                modalImg.src = user.profile_pic;
                modalImg.style.display = "block";
            }
            if (modalPlaceholder) modalPlaceholder.style.display = "none";

            // Replace the SVG in each header profile button with an image
            profileBtnEls.forEach(btn => {
                // Only inject once
                if (!btn.querySelector(".profile-pic-img")) {
                    btn.innerHTML = `<img class="profile-pic-img" src="${user.profile_pic}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` ;
                } else {
                    btn.querySelector(".profile-pic-img").src = user.profile_pic;
                }
            });
        } else {
            // Restore defaults
            if (modalImg) { modalImg.src = ""; modalImg.style.display = "none"; }
            if (modalPlaceholder) modalPlaceholder.style.display = "flex";
            profileBtnEls.forEach(btn => {
                if (btn.querySelector(".profile-pic-img")) {
                    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
                }
            });
        }
        // ---- End profile picture rendering ----

        if (badgeElement) {
            badgeElement.textContent = (user.role || "").toUpperCase();
            const roleLower = (user.role || "").toLowerCase();
            if (roleLower.includes("ai") || roleLower.includes("ml") || roleLower.includes("prompt") || roleLower.includes("learning") || roleLower.includes("nlp") || roleLower.includes("vision") || roleLower.includes("llm") || roleLower.includes("rag") || roleLower.includes("vector") || roleLower.includes("cognitive")) {
                badgeElement.style.background = "#e0f2f1";
                badgeElement.style.color = "#004d40";
            } else if (roleLower.includes("orchestrator") || roleLower.includes("security")) {
                badgeElement.style.background = "#fef2f2";
                badgeElement.style.color = "#ef4444";
            } else if (roleLower.includes("architect") || roleLower.includes("product")) {
                badgeElement.style.background = "#fef3c7";
                badgeElement.style.color = "#d97706";
            } else if (roleLower.includes("developer") || roleLower.includes("engineer") || roleLower.includes("synthesizer")) {
                if (roleLower.includes("devops") || roleLower.includes("cloud")) {
                    badgeElement.style.background = "#e0e7ff";
                    badgeElement.style.color = "#4338ca";
                } else {
                    badgeElement.style.background = "#dbeafe";
                    badgeElement.style.color = "#2563eb";
                }
            } else if (roleLower.includes("guard") || roleLower.includes("stability") || roleLower.includes("qa")) {
                badgeElement.style.background = "#d1fae5";
                badgeElement.style.color = "#059669";
            } else {
                badgeElement.style.background = "#f3f4f6";
                badgeElement.style.color = "#4b5563";
            }
        }
    }

    // Persist and apply theme
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (themeToggleBtn) themeToggleBtn.textContent = "Toggle Light Mode";
    } else {
        document.body.classList.remove("dark-theme");
        if (themeToggleBtn) themeToggleBtn.textContent = "Toggle Dark Mode";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            const isDark = document.body.classList.contains("dark-theme");
            themeToggleBtn.textContent = isDark ? "Toggle Light Mode" : "Toggle Dark Mode";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // Load persisted settings
    let geminiApiKey = localStorage.getItem("gemini_api_key") || "";
    let latencyTarget = parseInt(localStorage.getItem("latency_target")) || 42;
    let simSpeed = parseFloat(localStorage.getItem("sim_speed")) || 1.0;

    const geminiApiKeyInput = document.getElementById("gemini-api-key");
    if (geminiApiKeyInput) geminiApiKeyInput.value = geminiApiKey;

    const latencySlider = document.getElementById("latency-slider");
    const latencySliderVal = document.getElementById("latency-slider-val");
    if (latencySlider) {
        latencySlider.value = latencyTarget;
        if (latencySliderVal) latencySliderVal.textContent = `${latencyTarget} ms`;
        latencySlider.addEventListener("input", (e) => {
            const val = e.target.value;
            if (latencySliderVal) latencySliderVal.textContent = `${val} ms`;
        });
    }

    const simSpeedSelect = document.getElementById("sim-speed-select");
    if (simSpeedSelect) simSpeedSelect.value = simSpeed;

    const saveSettingsBtn = document.getElementById("save-settings-btn");
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener("click", () => {
            if (geminiApiKeyInput) {
                geminiApiKey = geminiApiKeyInput.value.trim();
                localStorage.setItem("gemini_api_key", geminiApiKey);
            }
            if (latencySlider) {
                latencyTarget = parseInt(latencySlider.value);
                localStorage.setItem("latency_target", latencyTarget);
            }
            if (simSpeedSelect) {
                simSpeed = parseFloat(simSpeedSelect.value);
                localStorage.setItem("sim_speed", simSpeed);
            }
            
            const successMsg = document.createElement("div");
            successMsg.style.color = "var(--green)";
            successMsg.style.fontSize = "0.78rem";
            successMsg.style.fontWeight = "600";
            successMsg.style.marginTop = "8px";
            successMsg.textContent = "Settings saved and synchronized successfully!";
            saveSettingsBtn.parentNode.appendChild(successMsg);
            setTimeout(() => successMsg.remove(), 2500);
        });
    }

    // Search & Filter
    const searchInput = document.getElementById("agent-search-input");
    const filterTabs = document.querySelectorAll(".filter-tab");
    const agentsList = document.getElementById("agents-list");
    
    function filterAgents() {
        if (!searchInput || !agentsList) return;
        const query = searchInput.value.toLowerCase();
        const activeTab = document.querySelector(".filter-tab.active");
        const category = activeTab ? activeTab.dataset.role : "all";
        
        const cards = agentsList.querySelectorAll(".agent-card");
        cards.forEach(card => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            const desc = card.querySelector(".agent-desc").textContent.toLowerCase();
            const categoryMatch = (category === "all" || card.dataset.category === category);
            const textMatch = (name.includes(query) || desc.includes(query));
            
            if (categoryMatch && textMatch) {
                card.style.display = "flex";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
            } else {
                card.style.opacity = "0";
                card.style.transform = "scale(0.95)";
                setTimeout(() => {
                    if (card.style.opacity === "0") {
                        card.style.display = "none";
                    }
                }, 200);
            }
        });
    }

    if (searchInput) searchInput.addEventListener("input", filterAgents);
    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            filterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            filterAgents();
        });
    });

    // Profile Modal
    const profileModal = document.getElementById("profile-modal");
    const profileCloseBtn = document.getElementById("profile-close-btn");
    const saveProfileBtn = document.getElementById("save-profile-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const profileNameInput = document.getElementById("profile-name-input");
    const profileRoleSelect = document.getElementById("profile-role-select");
    const profileBtns = document.querySelectorAll(".profile-btn-red");

    profileBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (profileModal) profileModal.classList.add("show");
        });
    });

    // Initialize Profile UI values
    updateProfileUI(currentUser);

    if (profileCloseBtn && profileModal) {
        profileCloseBtn.addEventListener("click", () => profileModal.classList.remove("show"));
    }

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener("click", () => {
            const nameVal = profileNameInput ? profileNameInput.value.trim() : "Admin Barista";
            const roleVal = profileRoleSelect ? profileRoleSelect.value : "Lead Orchestrator";
            
            saveProfileBtn.disabled = true;
            const originalText = saveProfileBtn.textContent;
            saveProfileBtn.textContent = "Saving...";

            fetch("/api/update_profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: currentUser.username,
                    name: nameVal,
                    role: roleVal,
                    profile_pic: pendingProfilePic !== null ? pendingProfilePic : (currentUser.profile_pic || null)
                })
            })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to update profile.");
                return data;
            })
            .then(data => {
                if (data.success) {
                    currentUser = data.user;
                    localStorage.setItem("minnu_session", JSON.stringify(currentUser));
                    pendingProfilePic = null;
                    updateProfileUI(currentUser);
                    console.log(`Saved profile: ${currentUser.name} (${currentUser.role})`);
                    if (profileModal) profileModal.classList.remove("show");
                } else {
                    throw new Error("Invalid response.");
                }
            })
            .catch(err => {
                console.error("Profile update error:", err);
                alert(err.message || "Failed to update profile. Please try again.");
            })
            .finally(() => {
                saveProfileBtn.disabled = false;
                saveProfileBtn.textContent = originalText;
            });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("minnu_session");
            window.location.href = "login.html";
        });
    }

    if (profileModal) {
        profileModal.addEventListener("click", (e) => {
            if (e.target === profileModal) profileModal.classList.remove("show");
        });
    }

    // ---- Profile Picture Upload Logic ----
    let pendingProfilePic = null; // holds Base64 string until Save is clicked

    const avatarContainer = document.getElementById("avatar-container");
    const profilePicInput = document.getElementById("profile-pic-input");

    if (avatarContainer && profilePicInput) {
        avatarContainer.addEventListener("click", () => {
            profilePicInput.click();
        });

        profilePicInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (ev) => {
                const base64 = ev.target.result;
                pendingProfilePic = base64;

                // Live preview in modal
                const modalImg = document.getElementById("profile-modal-img");
                const modalPlaceholder = document.getElementById("profile-modal-placeholder");
                if (modalImg) {
                    modalImg.src = base64;
                    modalImg.style.display = "block";
                }
                if (modalPlaceholder) modalPlaceholder.style.display = "none";
            };
            reader.readAsDataURL(file);
            // Reset so same file can be selected again
            profilePicInput.value = "";
        });
    }
    // ---- End Profile Picture Upload Logic ----

    // ================= 3. MODAL POPUP FOR AGENTS =================
    const modal = document.getElementById("agent-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalAvatar = document.getElementById("modal-avatar");
    const modalBadge = document.getElementById("modal-badge");
    const modalName = document.getElementById("modal-name");
    const modalRating = document.getElementById("modal-rating");
    const modalDescription = document.getElementById("modal-description");
    const modalCapabilities = document.getElementById("modal-capabilities");
    const modalDeployBtn = document.getElementById("modal-deploy-btn");

    let activeAgentKey = null;
    let agentWorkloadHistory = [];
    let agentModalInterval = null;

    function updateAgentModalChart() {
        const line = document.getElementById("agent-chart-line");
        const fill = document.getElementById("agent-chart-fill");
        if (!line || !fill) return;

        const maxVal = Math.max(...agentWorkloadHistory) || 1;
        const minVal = Math.min(...agentWorkloadHistory) || 0;
        const range = maxVal - minVal || 1;

        const points = agentWorkloadHistory.map((val, idx) => {
            const x = idx * (300 / (agentWorkloadHistory.length - 1));
            const y = 50 - ((val - minVal) / range) * 40; // fit to viewbox
            return { x, y };
        });

        const lineD = `M ${points.map((p, i) => (i === 0 ? "" : "L ") + `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}`;
        const fillD = `${lineD} L 300,60 L 0,60 Z`;

        line.setAttribute("d", lineD);
        fill.setAttribute("d", fillD);
    }

    if (agentsList) {
        agentsList.addEventListener("click", (e) => {
            const btn = e.target.closest(".view-profile-btn");
            if (!btn) return;
            
            const agentKey = btn.dataset.agent;
            const agent = agentData[agentKey];
            if (!agent) return;

            // Populate Modal Fields
            if (modalName) modalName.textContent = agent.name;
            if (modalBadge) {
                modalBadge.textContent = agent.badge;
                modalBadge.className = `badge ${agent.badgeClass}`;
            }
            if (modalRating) modalRating.textContent = agent.rating;
            if (modalDescription) modalDescription.textContent = agent.desc;
            
            // Avatar Style
            if (modalAvatar) {
                modalAvatar.textContent = agent.name.split(" ").map(n => n[0]).join("");
                modalAvatar.className = `modal-avatar ${agent.avatarClass}`;
            }
            
            // Populate Capabilities List
            if (modalCapabilities) {
                modalCapabilities.innerHTML = "";
                agent.capabilities.forEach(cap => {
                    const li = document.createElement("li");
                    li.textContent = cap;
                    modalCapabilities.appendChild(li);
                });
            }

            // Show Modal
            if (modal) modal.classList.add("show");

            // Start workload telemetry updates
            activeAgentKey = agentKey;
            agentWorkloadHistory = Array(12).fill(0).map(() => Math.floor(Math.random() * 40) + 20);
            
            const tasksEl = document.getElementById("modal-agent-tasks");
            const speedEl = document.getElementById("modal-agent-speed");
            
            function tickAgentMetrics() {
                if (!activeAgentKey) return;
                const activeTasks = Math.floor(Math.random() * 4) + 1;
                if (tasksEl) tasksEl.textContent = `${activeTasks} running`;
                
                const speed = Math.floor(Math.random() * 40) + 90;
                if (speedEl) speedEl.textContent = `${speed}ms`;
                
                const currentLoad = Math.floor(Math.random() * 50) + 30;
                agentWorkloadHistory.push(currentLoad);
                if (agentWorkloadHistory.length > 12) {
                    agentWorkloadHistory.shift();
                }
                updateAgentModalChart();
            }

            tickAgentMetrics();
            clearInterval(agentModalInterval);
            agentModalInterval = setInterval(tickAgentMetrics, 1500);
        });
    }

    function closeModal() {
        if (modal) modal.classList.remove("show");
        activeAgentKey = null;
        clearInterval(agentModalInterval);
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (modalDeployBtn) {
        modalDeployBtn.addEventListener("click", () => {
            closeModal();
            triggerMeshSimulationRedirect();
        });
    }

    // ================= 4. DEPLOY MESH LIVE SIMULATION =================
    let isSimulating = false;
    const deployMeshBtn = document.getElementById("deploy-mesh-btn");
    const timelineFlow = document.getElementById("timeline-flow");
    const activeMeshesMetric = document.querySelector(".metric-card:first-child .metric-value");
    const latencyMetric = document.querySelector(".metric-card:last-child .metric-value");
    const progressBarFill = document.querySelector(".progress-bar-fill");
    const timelineStatusMsg = document.getElementById("timeline-status-msg");

    const meshMonitorModal = document.getElementById("mesh-monitor-modal");
    const meshMonitorCloseBtn = document.getElementById("mesh-monitor-close-btn");
    const monitorProgressVal = document.getElementById("monitor-progress-val");
    const monitorThroughputVal = document.getElementById("monitor-throughput-val");
    const monitorErrorsVal = document.getElementById("monitor-errors-val");
    const monitorStatusBadge = document.getElementById("monitor-status-badge");
    const monitorStatusText = document.getElementById("monitor-status-text");
    const monitorPulseDot = document.getElementById("monitor-pulse-dot");
    const monitorConsoleLog = document.getElementById("monitor-console-log");
    const monitorAvatar = document.getElementById("monitor-avatar");
    const monitorChartLine = document.getElementById("monitor-chart-line");
    const monitorChartFill = document.getElementById("monitor-chart-fill");

    if (meshMonitorCloseBtn) {
        meshMonitorCloseBtn.addEventListener("click", () => {
            if (meshMonitorModal) meshMonitorModal.classList.remove("show");
        });
    }
    if (meshMonitorModal) {
        meshMonitorModal.addEventListener("click", (e) => {
            if (e.target === meshMonitorModal) {
                meshMonitorModal.classList.remove("show");
            }
        });
    }

    function triggerMeshSimulationRedirect() {
        // If not on meshes.html, store flag and redirect
        if (window.location.pathname.indexOf("meshes.html") === -1) {
            localStorage.setItem("start_mesh_simulation", "true");
            window.location.href = "meshes.html";
        } else {
            startDeploymentSimulation();
        }
    }

    if (deployMeshBtn) {
        deployMeshBtn.addEventListener("click", triggerMeshSimulationRedirect);
    }

    // Autostart simulation if flag is set (on meshes.html)
    if (localStorage.getItem("start_mesh_simulation") === "true") {
        localStorage.removeItem("start_mesh_simulation");
        setTimeout(startDeploymentSimulation, 500);
    }

    function startDeploymentSimulation() {
        if (isSimulating || !meshMonitorModal) return;
        isSimulating = true;

        // Reset and show Monitor Modal
        meshMonitorModal.classList.add("show");
        
        // Reset header status to Deploying (Red theme)
        if (monitorStatusBadge) {
            monitorStatusBadge.textContent = "DEPLOYING MESH";
            monitorStatusBadge.style.background = "var(--red-light)";
            monitorStatusBadge.style.color = "var(--red)";
        }
        if (monitorPulseDot) monitorPulseDot.style.backgroundColor = "var(--red)";
        if (monitorAvatar) monitorAvatar.style.background = "var(--brand-copper)";
        if (monitorStatusText) monitorStatusText.textContent = "Booting network gateway container...";
        
        if (monitorProgressVal) monitorProgressVal.textContent = "0%";
        if (monitorThroughputVal) monitorThroughputVal.textContent = "0 req/s";
        if (monitorErrorsVal) {
            monitorErrorsVal.textContent = "0.0%";
            monitorErrorsVal.style.color = "var(--green)";
        }
        if (monitorConsoleLog) monitorConsoleLog.innerHTML = "";

        // Init Chart History
        let monitorChartHistory = Array(15).fill(0);
        
        const logScripts = [
            { pct: 0, text: "[SYSTEM] Initializing mesh-alpha deployment script..." },
            { pct: 5, text: "[GATEWAY] Pulling Docker images from secure repository..." },
            { pct: 12, text: "[GATEWAY] Spawning Ingress controller gateway pod..." },
            { pct: 20, text: "[NETWORK] Handshaking secure vector-db cluster tunnels..." },
            { pct: 28, text: "[NETWORK] Verifying TLS certificates for EU-West and US-East region..." },
            { pct: 36, text: "[AGENT-A] Launching Product Architect persona..." },
            { pct: 45, text: "[AGENT-A] Specs generated: /api/v1/auth/token [POST] (status: 200 OK)" },
            { pct: 55, text: "[AGENT-B] Mounting volume schemas into compiler container..." },
            { pct: 65, text: "[AGENT-B] Running Code-Bot Sigma FastAPI compiling engine..." },
            { pct: 72, text: "[AGENT-B] Python FastAPI endpoint compilation complete." },
            { pct: 80, text: "[AGENT-C] Triggering Stability Guard verification suites..." },
            { pct: 88, text: "[AGENT-C] Running 7 automated inventory depletion unit tests..." },
            { pct: 95, text: "[AGENT-C] Coverage: 98.2%. Stability tests passed." },
            { pct: 100, text: "[SYSTEM] Integration complete. 6 meshes active. 99.9% health." }
        ];

        let currentProgress = 0;
        let loggedIndices = new Set();

        // Update button state if on page
        if (deployMeshBtn) {
            deployMeshBtn.disabled = true;
            deployMeshBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon animate-spin">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                    <path d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4z"/>
                </svg>
                Executing Mesh...
            `;
        }

        if (timelineStatusMsg) {
            timelineStatusMsg.style.opacity = "0";
            timelineStatusMsg.style.transform = "translateY(5px)";
        }
        if (timelineFlow) timelineFlow.innerHTML = "";
        if (activeMeshesMetric) activeMeshesMetric.innerHTML = `13 <span class="metric-sub">/ 15 capacity</span>`;
        if (progressBarFill) progressBarFill.style.width = "86%";
        if (latencyMetric) latencyMetric.innerHTML = `-- <span class="metric-sub">ms avg</span>`;

        const finalSimSpeed = simSpeed || 1.0;
        const targetLatency = latencyTarget || 42;
        const intervalTime = 120 / finalSimSpeed;

        const simInterval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 5) + 3;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(simInterval);
            }

            if (monitorProgressVal) monitorProgressVal.textContent = `${currentProgress}%`;

            const throughput = currentProgress === 100 ? 0 : Math.floor(Math.random() * 200) + 120;
            if (monitorThroughputVal) monitorThroughputVal.textContent = `${throughput} req/s`;

            const errorRate = currentProgress === 100 ? 0.0 : (Math.random() * 0.7);
            if (monitorErrorsVal) {
                monitorErrorsVal.textContent = `${errorRate.toFixed(2)}%`;
                monitorErrorsVal.style.color = errorRate > 0.4 ? "var(--red)" : "var(--green)";
            }

            if (monitorStatusText) {
                if (currentProgress < 20) monitorStatusText.textContent = "Booting network gateway container...";
                else if (currentProgress < 50) monitorStatusText.textContent = "Connecting regional mesh tunnels...";
                else if (currentProgress < 80) monitorStatusText.textContent = "Deploying active developer personas...";
                else if (currentProgress < 100) monitorStatusText.textContent = "Running test verification checks...";
                else monitorStatusText.textContent = "Deployment successful!";
            }

            logScripts.forEach((log, index) => {
                if (currentProgress >= log.pct && !loggedIndices.has(index)) {
                    loggedIndices.add(index);
                    const now = new Date();
                    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
                    
                    const logDiv = document.createElement("div");
                    let color = "#38bdf8";
                    if (log.text.includes("[SYSTEM]")) color = "#60a5fa";
                    else if (log.text.includes("[SUCCESS]")) color = "#4ade80";
                    
                    logDiv.innerHTML = `<span style="color: #64748b;">[${timeStr}]</span> <span style="color: ${color};">${log.text}</span>`;
                    if (monitorConsoleLog) {
                        monitorConsoleLog.appendChild(logDiv);
                        monitorConsoleLog.scrollTop = monitorConsoleLog.scrollHeight;
                    }
                }
            });

            monitorChartHistory.push(throughput);
            if (monitorChartHistory.length > 15) {
                monitorChartHistory.shift();
            }

            const maxThroughput = Math.max(...monitorChartHistory) || 1;
            const points = monitorChartHistory.map((val, idx) => {
                const x = idx * (700 / (monitorChartHistory.length - 1));
                const y = 100 - (val / maxThroughput) * 85;
                return { x, y };
            });

            const lineD = `M ${points.map((p, i) => (i === 0 ? "" : "L ") + `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}`;
            const fillD = `${lineD} L 700,120 L 0,120 Z`;

            if (monitorChartLine) monitorChartLine.setAttribute("d", lineD);
            if (monitorChartFill) monitorChartFill.setAttribute("d", fillD);

            if (currentProgress === 100) {
                if (monitorStatusBadge) {
                    monitorStatusBadge.textContent = "MESH ONLINE";
                    monitorStatusBadge.style.background = "var(--green-light)";
                    monitorStatusBadge.style.color = "var(--green)";
                }
                if (monitorPulseDot) monitorPulseDot.style.backgroundColor = "var(--green)";
                if (monitorAvatar) monitorAvatar.style.background = "var(--teal)";

                setTimeout(() => {
                    if (meshMonitorModal) meshMonitorModal.classList.remove("show");
                    
                    const tA = 1200 / finalSimSpeed;
                    const tB = 2500 / finalSimSpeed;
                    const tC = 2000 / finalSimSpeed;
                    const tFinish = 800 / finalSimSpeed;

                    setTimeout(() => {
                        if (timelineFlow) {
                            const nodeA = document.createElement("div");
                            nodeA.className = "timeline-node fade-in";
                            nodeA.id = "timeline-node-a";
                            nodeA.innerHTML = timelineTemplates.agentA;
                            timelineFlow.appendChild(nodeA);
                            timelineFlow.scrollTop = timelineFlow.scrollHeight;
                        }
                        
                        setTimeout(() => {
                            if (timelineFlow) {
                                const nodeB = document.createElement("div");
                                nodeB.className = "timeline-node fade-in";
                                nodeB.id = "timeline-node-b";
                                nodeB.innerHTML = timelineTemplates.agentB;
                                timelineFlow.appendChild(nodeB);
                                timelineFlow.scrollTo({ top: timelineFlow.scrollHeight, behavior: 'smooth' });
                            }

                            setTimeout(() => {
                                if (timelineFlow) {
                                    const nodeC = document.createElement("div");
                                    nodeC.className = "timeline-node fade-in";
                                    nodeC.id = "timeline-node-c";
                                    nodeC.innerHTML = timelineTemplates.agentC;
                                    timelineFlow.appendChild(nodeC);
                                    timelineFlow.scrollTo({ top: timelineFlow.scrollHeight, behavior: 'smooth' });
                                }

                                setTimeout(() => {
                                    if (latencyMetric) latencyMetric.innerHTML = `${targetLatency} <span class="metric-sub">ms avg</span>`;
                                    if (timelineStatusMsg) {
                                        timelineStatusMsg.style.opacity = "1";
                                        timelineStatusMsg.style.transform = "none";
                                    }
                                    
                                    if (deployMeshBtn) {
                                        deployMeshBtn.disabled = false;
                                        deployMeshBtn.innerHTML = `
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                                                <polygon points="5 3 19 12 5 21 5 3"/>
                                            </svg>
                                            Deploy Mesh
                                        `;
                                    }
                                    isSimulating = false;
                                }, tFinish);

                            }, tC);
                        }, tB);
                    }, tA);

                }, 1000 / finalSimSpeed);
            }
        }, intervalTime);
    }

    // ================= 5. FLOATING AI CHAT WIDGET LOGIC =================
    const chatToggleBtn = document.getElementById("chat-toggle-btn");
    const chatWindow = document.getElementById("chat-window");
    const chatMinimizeBtn = document.getElementById("chat-minimize-btn");
    const chatInput = document.getElementById("chat-input");
    const chatSendBtn = document.getElementById("chat-send-btn");
    const chatMessages = document.getElementById("chat-messages");

    if (chatToggleBtn) {
        const iconOpen = chatToggleBtn.querySelector(".chat-icon-open");
        const iconClose = chatToggleBtn.querySelector(".chat-icon-close");

        function toggleChat() {
            if (!chatWindow) return;
            chatWindow.classList.toggle("show");
            const isOpen = chatWindow.classList.contains("show");
            if (isOpen) {
                if (iconOpen) iconOpen.style.display = "none";
                if (iconClose) iconClose.style.display = "block";
                const pulseDot = chatToggleBtn.querySelector(".chat-pulse-dot");
                if (pulseDot) pulseDot.style.display = "none";
                setTimeout(() => { if (chatInput) chatInput.focus(); }, 300);
            } else {
                if (iconOpen) iconOpen.style.display = "block";
                if (iconClose) iconClose.style.display = "none";
            }
        }

        chatToggleBtn.addEventListener("click", toggleChat);
        if (chatMinimizeBtn) {
            chatMinimizeBtn.addEventListener("click", () => {
                if (chatWindow) chatWindow.classList.remove("show");
                if (iconOpen) iconOpen.style.display = "block";
                if (iconClose) iconClose.style.display = "none";
            });
        }
    }

    const qaAnswers = {
        "hello": "Hello! I am the Gemma 4 AI Assistant. How can I help you today with your coffee app, AI agents, or Python coding questions?",
        "hi": "Hello! I am the Gemma 4 AI Assistant. How can I help you today with your coffee app, AI agents, or Python coding questions?",
        "help": "You can ask me questions about the recipe formulas, how to run the barista script, how the multi-agent loop works, or how to toggle dark mode settings!",
        "gemma 4": "Gemma 4 is our signature beverage, priced at $6.50. It contains 30g Coffee Beans, 80ml Water, 150ml Oat Milk, 15ml Lavender Syrup, and 1g edible Gold Dust. Try ordering it in the app!",
        "gemma4": "Gemma 4 is our signature beverage, priced at $6.50. It contains 30g Coffee Beans, 80ml Water, 150ml Oat Milk, 15ml Lavender Syrup, and 1g edible Gold Dust. Try ordering it in the app!",
        "recipe": "Barista app menu includes: Espresso ($3.00), Americano ($3.50), Latte ($4.50), Cappuccino ($4.50), and Gemma 4 ($6.50). Recipe details are saved in prd_document.md.",
        "barista": "The Barista App is a Python command-line barista simulator written in barista_app.py. It tracks raw inventory weights and models ordering with scaling multipliers and extra shots.",
        "run": "To run the Python Barista App, open your terminal in the workspace directory and execute: `./python-embed/python.exe barista_app.py`.",
        "test": "We have 7 automated tests verified by Stability Guard. Run them with: `./python-embed/python.exe barista_app.py --test`.",
        "agent": "Minnu AI orchestrates a loop of specialist agents: Product Architect (Agent A), Code Synthesizer (Agent B), and Stability Guard (Agent C).",
        "pm": "Product Architect (Agent A) translates user requirements into specifications and creates prd_document.md.",
        "developer": "Code Synthesizer (Agent B) implements software functionality and writes barista_app.py.",
        "qa": "Stability Guard (Agent C) runs automated verification suites and creates qa_feedback.txt.",
        "deployment": "Click the 'Deploy Mesh' action button in the sidebar to simulate the multi-agent orchestration timeline in real-time!",
        "mesh": "Click the 'Deploy Mesh' action button in the sidebar to simulate the multi-agent orchestration timeline in real-time!",
        "settings": "Open the System Settings page to toggle Dark Mode, change latency thresholds, or set simulation speeds.",
        "theme": "Toggle Dark Mode/Light Mode in the Settings page!"
    };

    function displayBotResponse(matchedResponse) {
        if (!chatMessages) return;
        const loader = chatMessages.querySelector(".typing-indicator");
        if (loader) loader.remove();

        const msgDiv = document.createElement("div");
        msgDiv.className = "chat-msg bot-msg";
        const p = document.createElement("p");
        msgDiv.appendChild(p);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const words = matchedResponse.split(" ");
        let i = 0;
        function typeWord() {
            if (i < words.length) {
                p.innerHTML += (i === 0 ? "" : " ") + words[i];
                i++;
                chatMessages.scrollTop = chatMessages.scrollHeight;
                setTimeout(typeWord, 30);
            }
        }
        typeWord();
    }

    function getOfflineResponse(userText) {
        const text = userText.toLowerCase().trim();
        let matchedResponse = "";
        
        for (const key in qaAnswers) {
            if (text.includes(key)) {
                matchedResponse = qaAnswers[key];
                break;
            }
        }

        if (!matchedResponse) {
            const templates = [
                `Interesting question about "${userText}". Our Code-Bot Sigma agent is fully capable of refactoring this module in barista_app.py, subject to verification by Guard-Bot Delta.`,
                `Gemma 4 suggests that optimizing "${userText}" requires adjusting our active execution meshes. Try triggering a simulation run using 'Deploy Mesh'.`,
                `I recommend auditing the code blocks in barista_app.py regarding "${userText}". Let me know if you would like me to explain any specific barista functions!`,
                `Under our current session scope (mesh-alpha), "${userText}" falls under the verification guidelines of Stability Guard. All 7 unit tests are verified passing.`
            ];
            matchedResponse = templates[Math.floor(Math.random() * templates.length)];
        }
        return matchedResponse;
    }

    function handleBotResponse(userText) {
        if (geminiApiKey) {
            // Call live model gemini-2.5-flash
            fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are Gemma 4, a friendly and highly intelligent AI Barista Assistant in the Minnu AI Workspace. 
                            Your environment is an interactive coffee shop simulator (written in Python) and a multi-agent dashboard.
                            The menu contains:
                            - Espresso ($3.00): Coffee Beans (15g), Water (50ml).
                            - Americano ($3.50): Coffee Beans (15g), Water (200ml).
                            - Latte ($4.50): Coffee Beans (15g), Water (50ml), Milk (150ml).
                            - Cappuccino ($4.50): Coffee Beans (15g), Water (50ml), Milk (100ml).
                            - Gemma 4 (Signature, $6.50): Coffee Beans (30g), Water (80ml), Oat Milk (150ml), Lavender Syrup (15ml), Gold Dust (1g).
                            Answer the user's question. Keep your answer brief, elegant, and directly address their message. Do not output markdown codeblocks unless specifically requested.
                            User message: "${userText}"`
                        }]
                    }]
                })
            })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                return res.json();
            })
            .then(data => {
                let reply = "";
                try {
                    reply = data.candidates[0].content.parts[0].text;
                } catch (e) {
                    reply = "Received unexpected response format from Gemini API.";
                }
                displayBotResponse(reply);
            })
            .catch(err => {
                console.error("Gemini API Error:", err);
                const fallbackMsg = getOfflineResponse(userText);
                displayBotResponse(`❌ [Gemini API Error: ${err.message}. Falling back to offline assistant.]\n\n${fallbackMsg}`);
            });
            return;
        }

        const offlineReply = getOfflineResponse(userText);
        const matchedResponse = `🔑 [Offline Mode] Enter a Gemini API Key in the Settings page to unlock live, real-time responses!\n\n${offlineReply}`;
        setTimeout(() => { displayBotResponse(matchedResponse); }, 1000);
    }

    function sendMessage() {
        if (!chatInput || !chatMessages) return;
        const text = chatInput.value.trim();
        if (!text) return;

        const msgDiv = document.createElement("div");
        msgDiv.className = "chat-msg user-msg";
        const p = document.createElement("p");
        p.textContent = text;
        msgDiv.appendChild(p);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        chatInput.value = "";

        const loader = document.createElement("div");
        loader.className = "typing-indicator";
        loader.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        chatMessages.appendChild(loader);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        handleBotResponse(text);
    }

    if (chatSendBtn) chatSendBtn.addEventListener("click", sendMessage);
    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    }

    // ================= 6. DEPLOYMENTS REGISTRY MODAL LOGIC =================
    const deploymentsModal = document.getElementById("deployments-modal");
    const viewAllLinks = document.querySelectorAll(".view-all-link");
    const deploymentsCloseBtn = document.getElementById("deployments-close-btn");
    const redeployMeshBtn = document.getElementById("redeploy-mesh-btn");
    const deployFilterTabs = document.querySelectorAll("[data-deploy-filter]");
    const deploymentRows = document.querySelectorAll(".deployment-row-card");

    function openDeploymentsModal(e) {
        if (e) e.preventDefault();
        if (deploymentsModal) deploymentsModal.classList.add("show");
    }

    function closeDeploymentsModal() {
        if (deploymentsModal) deploymentsModal.classList.remove("show");
    }

    viewAllLinks.forEach(link => {
        link.addEventListener("click", openDeploymentsModal);
    });

    if (deploymentsCloseBtn) {
        deploymentsCloseBtn.addEventListener("click", closeDeploymentsModal);
    }

    if (deploymentsModal) {
        deploymentsModal.addEventListener("click", (e) => {
            if (e.target === deploymentsModal) {
                closeDeploymentsModal();
            }
        });
    }

    if (redeployMeshBtn) {
        redeployMeshBtn.addEventListener("click", () => {
            closeDeploymentsModal();
            triggerMeshSimulationRedirect();
        });
    }

    deployFilterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            deployFilterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filterValue = tab.getAttribute("data-deploy-filter");
            deploymentRows.forEach(row => {
                const rowStatus = row.getAttribute("data-deploy-status");
                if (filterValue === "all" || rowStatus === filterValue) {
                    row.style.display = "flex";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });

    // ================= 7. LIVE FLUCTUATING TELEMETRY ENGINE =================
    const sparklinePath = document.getElementById("sparkline-path");
    let latencyHistory = [40, 42, 38, 45, 41, 44, 42, 40, 43, 42];
    let activeMeshesCount = 12;
    let totalQueriesCount = 14802;
    let bannerChartHistory = [50, 45, 48, 38, 42, 28, 38, 24, 35, 26, 30];

    function updateTelemetry() {
        if (isSimulating) return;

        // 1. Latency fluctuation
        const baseLatency = latencyTarget;
        const fluctuation = Math.floor(Math.random() * 9) - 4;
        const currentLatency = Math.max(10, baseLatency + fluctuation);

        if (latencyMetric) {
            latencyMetric.innerHTML = `${currentLatency} <span class="metric-sub">ms avg</span>`;
        }

        // Push and slide history
        latencyHistory.push(currentLatency);
        if (latencyHistory.length > 11) {
            latencyHistory.shift();
        }

        // Draw sparkline SVG path
        if (sparklinePath) {
            const minVal = Math.min(...latencyHistory);
            const maxVal = Math.max(...latencyHistory);
            const range = maxVal - minVal || 1;
            
            const points = latencyHistory.map((val, idx) => {
                const x = idx * (100 / (latencyHistory.length - 1));
                const y = 25 - ((val - minVal) / range) * 20;
                return `${x.toFixed(1)},${y.toFixed(1)}`;
            });

            const pathD = `M ${points.map((p, i) => (i === 0 ? "" : "L ") + p).join(" ")}`;
            sparklinePath.setAttribute("d", pathD);
        }

        // 2. Active Meshes fluctuation
        if (Math.random() > 0.6) {
            const meshDrift = Math.floor(Math.random() * 3) - 1;
            activeMeshesCount = Math.max(10, Math.min(14, activeMeshesCount + meshDrift));
            if (activeMeshesMetric) {
                activeMeshesMetric.innerHTML = `${activeMeshesCount} <span class="metric-sub">/ 15 capacity</span>`;
            }

            if (progressBarFill) {
                const percentWidth = Math.round((activeMeshesCount / 15) * 100);
                progressBarFill.style.width = `${percentWidth}%`;
            }
        }

        // 3. Banner stats updates
        const cpuLoadEl = document.getElementById("load-cpu-val");
        const queriesEl = document.getElementById("load-queries-val");
        const tasksEl = document.getElementById("load-tasks-val");

        let cpuVal = 28;
        if (cpuLoadEl) {
            cpuVal = Math.floor(Math.random() * 21) + 20;
            cpuLoadEl.textContent = `${cpuVal}%`;
        }

        if (queriesEl) {
            totalQueriesCount += Math.floor(Math.random() * 3) + 1;
            queriesEl.textContent = totalQueriesCount.toLocaleString();
        }

        if (tasksEl) {
            const tasksVal = Math.floor(Math.random() * 3) + 3;
            tasksEl.textContent = `${tasksVal} Running`;
        }

        // 4. Banner Live Chart updates
        const bannerChartLine = document.getElementById("banner-chart-line");
        const bannerChartFill = document.getElementById("banner-chart-fill");

        if (bannerChartLine && bannerChartFill) {
            bannerChartHistory.push(cpuVal);
            if (bannerChartHistory.length > 11) {
                bannerChartHistory.shift();
            }

            const minChartVal = Math.min(...bannerChartHistory);
            const maxChartVal = Math.max(...bannerChartHistory);
            const chartRange = maxChartVal - minChartVal || 1;

            const chartPoints = bannerChartHistory.map((val, idx) => {
                const x = idx * (300 / (bannerChartHistory.length - 1));
                const y = 50 - ((val - minChartVal) / chartRange) * 35;
                return { x, y };
            });

            const linePathD = `M ${chartPoints.map((p, i) => (i === 0 ? "" : "L ") + `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}`;
            const fillPathD = `${linePathD} L 300,60 L 0,60 Z`;

            bannerChartLine.setAttribute("d", linePathD);
            bannerChartFill.setAttribute("d", fillPathD);
        }
    }

    // Run telemetry updates
    setInterval(updateTelemetry, 2500);

    // ================= 8. VIEW DIFF TOGGLE LOGIC =================
    const originalCode = `from fastapi import APIRouter, HTTP...
from pydantic import BaseModel
from datetime import datetime, time...
import jwt

router = APIRouter()
SECRET_KEY = "phoenix_core_secret"
ALGORITHM = "HS256"

class TokenRequest(BaseModel):
    client_id: str
    client_secret: str

@router.post("/api/v1/auth/token")
async def generate_token(request: T...
    if not verify_client(request.cl...
        raise HTTPException(
            status_code=401,
            detail={"error": "inval...
        )
    
    expires = datetime.utcnow() + t...
    payload = {"sub": request.clien...
    token = jwt.encode(payload, SEC...
    
    return {"access_token": token, ...`;

    const gitDiff = `<span style="color: #64748b;">@@ -115,14 +115,14 @@</span>
 class TokenRequest(BaseModel):
     client_id: str
     client_secret: str
 
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-@router.post("/api/v1/auth/token")</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-async def generate_token(request: T...</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-    if not verify_client(request.cl...</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-        raise HTTPException(</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-            status_code=401,</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-            detail={"error": "inval...</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-        )</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-    </span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-    expires = datetime.utcnow() + t...</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-    payload = {"sub": request.clien...</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-    token = jwt.encode(payload, SEC...</span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-    </span>
<span style="color: #f87171; background: rgba(248, 113, 113, 0.12); display: block; width: 100%; padding: 0 4px;">-    return {"access_token": token, ...</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+@router.post("/api/v1/auth/token")</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+async def generate_token(request: TokenRequest):</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+    if not verify_client(request.client_id, request.client_secret):</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+        raise HTTPException(</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+            status_code=401,</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+            detail={"error": "invalid_client_credentials"}</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+        )</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+    expires = datetime.utcnow() + timedelta(hours=1)</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+    payload = {"sub": request.client_id, "exp": expires}</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)</span>
<span style="color: #4ade80; background: rgba(74, 222, 128, 0.12); display: block; width: 100%; padding: 0 4px;">+    return {"access_token": token, "token_type": "bearer"}</span>`;

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".view-diff-btn");
        if (!btn) return;

        e.preventDefault();
        const card = btn.closest(".timeline-card");
        if (!card) return;

        const codeBlock = card.querySelector(".code-block-mock code");
        if (!codeBlock) return;

        const isShowingDiff = btn.getAttribute("data-state") === "diff";
        if (isShowingDiff) {
            codeBlock.innerText = originalCode;
            btn.textContent = "View Diff";
            btn.setAttribute("data-state", "code");
        } else {
            codeBlock.innerHTML = gitDiff;
            btn.textContent = "View Code";
            btn.setAttribute("data-state", "diff");
        }
    });

    // Redirections for task detail pages
    document.addEventListener("click", (e) => {
        const target = e.target.closest("[data-task]");
        if (target) {
            const taskId = target.getAttribute("data-task");
            if (taskId) {
                window.location.href = `task.html?task=${taskId}`;
            }
        }
    });

    // Navigation scales micro-animation
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            item.style.transform = "scale(0.92)";
            setTimeout(() => item.style.transform = "none", 150);
        });
    });
});
