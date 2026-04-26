const currentPathLabel = document.getElementById("current-path");
const promptPath = document.getElementById("prompt-path");
const terminalOutput = document.getElementById("terminal-output");
const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");
const treeButtons = [...document.querySelectorAll("[data-command]")];
const PROFILE_IMAGE_PATH = (() => {
  const path = window.location.pathname;
  if (/\/resume\/1227(\/|$)/.test(path)) return "../../assets/profile.jpg";
  if (/\/resume(\/|$)/.test(path)) return "../assets/profile.jpg";
  return "./assets/profile.jpg";
})();

let currentDirectory = "/usr";
let isTyping = false;
const CAREER_TOKEN = "__CAREER_DURATION__";
const CAREER_START_DATE = { year: 2023, month: 3, day: 1 };
const TECH_BADGE_META = {
  Java: { logo: "openjdk", logoColor: "white" },
  "Spring Boot": { logo: "springboot", logoColor: "white" },
  "Spring Framework": { logo: "spring", logoColor: "white" },
  Oracle: { logo: "oracle", logoColor: "white" },
  MariaDB: { logo: "mariadb", logoColor: "white" },
  Linux: { logo: "linux", logoColor: "black" },
  JPA: { logoColor: "white" },
  SQL: { logo: "postgresql", logoColor: "white" },
  "Identity Verification": { logoColor: "white" },
  JavaScript: { logo: "javascript", logoColor: "black" },
  Python: { logo: "python", logoColor: "white" },
  "Next.js": { logo: "nextdotjs", logoColor: "white" },
  Bamboo: { logoColor: "white" },
  Bitbucket: { logo: "bitbucket", logoColor: "white" },
  Vue: { logo: "vuedotjs", logoColor: "white" },
  "Vue.js": { logo: "vuedotjs", logoColor: "white" },
  React: { logo: "react", logoColor: "61DAFB" },
  MyBatis: { logoColor: "white" },
  QueryDSL: { logoColor: "white" },
};
const LEVEL_COLOR_MAP = {
  고급: "22C55E",
  중급: "F59E0B",
  초급: "64748B",
};

const fileSystem = {
  "/": ["usr", "srv", "skills"],
  "/usr": ["about", "edu", "contact"],
  "/srv": ["work", "project"],
  "/skills": ["stack", "certification"],
};

const treeText = [
  "usr",
  "├── about",
  "├── edu",
  "└── contact",
  "srv",
  "├── work",
  "└── project",
  "skills",
  "├── stack",
  "└── certification",
].join("\n");

const entries = {
  "/usr/about": {
    meta: "usr/about",
    card: {
      name: "이슬기",
      alias: "Lee Seulki",
      roleLine: "$ whoami -> Backend Developer",
      summary:
        "백엔드 개발자 이슬기입니다. 문제 해결과 효율적인 코드 구현에 집중합니다. 대규모 트래픽 환경에서도 안정적인 트랜잭션 처리와 데이터 관리를 수행한 경험이 있으며 기술적 히스토리를 자산화 하는 데 강점이 있습니다.",
      meta: ["📍 Seoul, Korea", `💼 ${CAREER_TOKEN}`],
    },
  },
  "/srv/project": {
    meta: "srv/project",
    timelineTitle: "Project",
    timelineSubtitle: "시간순 주요 프로젝트",
    timeline: [
      {
        period: "2023.03 - 현재",
        company: "아톤",
        projects: [
          {
            period: "2025.12",
            title: "LGU+ PASS앱 이통사 신원확인시스템(MIS) 오픈",
            points: [
              "휴대폰 개통 시 신분증 확인과 안면인증을 통해 본인 여부를 정확히 확인하는 서비스",
              "LGU+ PASS앱을 통한 안면인증 서비스가 가능하도록 개발함"
            ],
            skills: ["Java", "Spring Boot", "JPA"],
          },
          {
            period: "2025.06",
            title: "LGU+ PASS앱 신분증 결제 서비스 오픈",
            points: [
              "신분증 확인과 결제를 동시에 진행할 수 있는 PASS 신분증 결제 서비스 오픈",
            ],
            skills: ["Java", "Spring Boot", "JPA"],
          },
          {
            period: "2023.10 - 2025.02",
            title: "LGU+ PASS앱 DBMS 이관 프로젝트",
            points: [
              "Oracle DBMS에서 MariaDB로의 데이터베이스 이관 작업을 수행",
              "SQL 문 분석 및 최적화, 데이터 마이그레이션 검증",
              "DBMS 전환으로 운영비 절감 및 성능 최적화",
            ],
            skills: [
              "Java",
              "Spring Boot",
              "Spring Framework",
              "MyBatis",
              "JPA",
              "Oracle",
              "MariaDB",
            ],
          },
        ],
      },
    ],
  },
  "/srv/work": {
    meta: "srv/work",
    timelineTitle: "Work",
    timelineSubtitle: "주요 업무 타임라인",
    timeline: [
      {
        period: "2023.03 - 현재",
        company: "(주) 아톤",
        projects: [
          {
            period: "2026.01 ~",
            title: "LGU+ PASS앱 부가서비스",
            points: ["PASS앱 내 제공되는 부가서비스의 서버 개발과 안정적인 운영 담당",
                     "신규 부가서비스 도입에 따른 CP사 API 연동 및 전문 개발",
                     "부가서비스 및 모바일 신분증 서비스 백오피스 개발",
                    ],
            skills: [
              "Java",
              "Spring Boot",
              "Spring Framework",
              "JPA",
              "Vue.js",
              "QueryDSL",
            ],
          },
          {
            period: "2024.03 ~ 2025.12",
            title: "LGU+ PASS앱 이벤트 페이지 개발 및 운영",
            points: [
              "PASS앱 내 전략파트너사 전용 이벤트 페이지 및 프로모션 백엔드 개발",
            ],
            skills: ["Java", "Spring Boot", "MyBatis", "Vue.js"],
          },
          {
            period: "2023.06 ~ 2025.12",
            title: "LGU+ PASS앱 모바일 신분증 서비스",
            points: ["PASS앱 내 제공되는 모바일신분증서비스(운전면허증, 주민등록증)의 서버 개발과 안정적인 운영 담당",
                     "대행사와 진행하는 대면/비대면 성인인증/신원인증 프로세스 개발 및 운영",
                     "LGU+ PASS앱 신분증 결제 서비스, 스마트 티켓 서비스 개발 및 운영"
                    ],
            skills: ["Java", "Spring Boot", "Spring Framework", "JPA"],
          },
          {
            period: "2023.03 ~ 2023.05",
            title: "(주) 아톤 인턴",
            points: [
              "Java 프로그래밍 기초 역량을 실무 API 개발에 적용하며 백엔드 개발자로서의 기반 마련",
            ],
            skills: ["Java"],
          },
        ],
      },
    ],
  },
  "/usr/edu": {
    meta: "usr/edu",
    timelineTitle: "Education",
    timelineSubtitle: "학력 및 교육 이수사항",
    timeline: [
      {
        period: "2022.08 - 2023.01",
        company: "실무 프로젝트 기반 금융데이터 분석가 양성과정",
        projects: [
          {
            period: "2022.08 - 2023.01",
            title: "서울산업진흥원 교육 이수",
            points: ["금융데이터 분석 실무 프로젝트 수행"],
            skills: ["Python"],
          },
        ],
      },
      {
        period: "2017.03 - 2022.02",
        company: "세종대학교 학사",
        projects: [
          {
            period: "2017.03 - 2022.02",
            title: "공학사(전자정보통신공학심화)",
            points: [
              "전자정보통신공학 전공으로 정보통신 인프라 및 네트워크 기반 지식 습득",
              "Java 및 Python 프로그래밍 언어 수업을 들으며 소프트웨어 역량을 확보",
            ],
            skills: [],
          },
        ],
      },
    ],
  },
  "/usr/contact": {
    meta: "usr/contact",
    lines: [
      "💌 seulki971227@kakao.com",
      "📱 +82 10-4845-9264",
    ],
  },
  "/skills/stack": {
    meta: "skills/stack",
    groups: [
      {
        label: "Languages",
        items: [
          { name: "Java", level: "고급" },
          { name: "JavaScript", level: "초급" },
          { name: "Python", level: "초급" },
        ],
      },
      {
        label: "Frameworks",
        items: [
          { name: "Spring Boot", level: "고급" },
          { name: "Spring Framework", level: "고급" },
          { name: "JPA", level: "고급" },
          { name: "MyBatis", level: "중급" },
          { name: "QueryDSL", level: "중급" },
          { name: "Vue.js", level: "초급" },
          { name: "React", level: "초급" },
          { name: "Next.js", level: "초급" },
        ],
      },
      {
        label: "Databases",
        items: [
          { name: "Oracle", level: "고급" },
          { name: "MariaDB", level: "고급" },
        ],
      },
      {
        label: "Devops",
        items: [
          { name: "Linux", level: "중급" },
          { name: "Bamboo", level: "초급" },
          { name: "Bitbucket", level: "초급" },
        ],
      },
    ],
  },
  "/skills/certification": {
    meta: "skills/certification",
    certs: [
      { date: "2022.06", text: "정보처리기사 취득" },
      { date: "2025.09", text: "SQLD 취득" },
      { date: "2026.02", text: "토익스피킹 IH 취득" },
    ],
  },
};

function resolvePath(input) {
  if (!input) return currentDirectory;
  if (input === "~") return "/usr";
  const isAbsolute = input.startsWith("/");
  const raw = isAbsolute ? input : `${currentDirectory}/${input}`;
  const tokens = raw.split("/").filter(Boolean);
  const parts = [];

  for (const token of tokens) {
    if (token === ".") continue;
    if (token === "..") {
      parts.pop();
      continue;
    }
    parts.push(token);
  }

  return `/${parts.join("/")}` || "/";
}

function compactPromptPath(path) {
  if (!path || path === "/") return "/";
  const max = 14;
  if (path.length <= max) return path;
  return `...${path.slice(-(max - 3))}`;
}

function setDirectory(path) {
  currentDirectory = path;
  currentPathLabel.textContent = `seulki@portfolio-node:${path}`;
  promptPath.textContent = compactPromptPath(path);
}

function formatSeoulTimestamp(date) {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const map = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}.${milliseconds}`;
}

function getSeoulDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const map = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)])
  );
  return { year: map.year, month: map.month, day: map.day };
}

function getDaysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function getCareerDurationText() {
  const now = getSeoulDateParts();
  const start = CAREER_START_DATE;

  let years = now.year - start.year;
  let months = now.month - start.month;
  let days = now.day - start.day;

  if (days < 0) {
    months -= 1;
    const prevMonth = now.month - 1 <= 0 ? 12 : now.month - 1;
    const prevMonthYear = prevMonth === 12 ? now.year - 1 : now.year;
    days += getDaysInMonth(prevMonthYear, prevMonth);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years < 0) return "0년 0개월 0일";
  return `${years}년 ${months}개월 ${days}일`;
}

function applyCareerToken(text) {
  return String(text ?? "").replaceAll(CAREER_TOKEN, getCareerDurationText());
}

function appendLine(text, className = "") {
  const line = document.createElement("p");
  line.className = `terminal-line ${className}`.trim();
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function appendLines(lines, className = "") {
  lines.forEach((line) => appendLine(line, className));
}

function appendBlock(title, items) {
  const wrapper = document.createElement("div");
  wrapper.className = "terminal-block";
  const heading = document.createElement("p");
  heading.className = "terminal-block-title";
  heading.textContent = title;
  wrapper.appendChild(heading);

  const list = document.createElement("ul");
  list.className = "terminal-block-list";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  wrapper.appendChild(list);
  terminalOutput.appendChild(wrapper);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function appendAsciiBox(lines, width = 60) {
  const border = `+${"-".repeat(width - 2)}+`;
  const paddedLines = lines.map((line) => {
    const text = String(line).slice(0, width - 4);
    return `| ${text.padEnd(width - 4, " ")} |`;
  });
  appendLines([border, ...paddedLines, border], "muted");
}

function appendAboutCard(entry) {
  const card = document.createElement("article");
  card.className = "about-card";
  const metaText = entry.card.meta.map((item) => applyCareerToken(item)).join("  ·  ");
  card.innerHTML = `
    <div class="about-avatar">
      <img
        class="about-avatar-img"
        src="${PROFILE_IMAGE_PATH}"
        alt="이슬기 프로필 사진"
      />
    </div>
    <div class="about-content">
      <h4>${entry.card.name} <span>${entry.card.alias}</span></h4>
      <p class="about-role">${entry.card.roleLine}</p>
      <p class="about-summary">${entry.card.summary}</p>
      <p class="about-meta">${metaText}</p>
    </div>
  `;
  terminalOutput.appendChild(card);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function appendCareerTimeline(entry) {
  const section = document.createElement("section");
  section.className = "career-section";

  const title = document.createElement("h3");
  title.className = "career-title";
  title.textContent = entry.timelineTitle || "Experience";
  section.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.className = "career-subtitle";
  subtitle.textContent = entry.timelineSubtitle || "시간순 주요 경력 및 프로젝트";
  section.appendChild(subtitle);

  const timeline = document.createElement("div");
  timeline.className = "career-timeline";

  const buildTechBadgeSrc = (name, level = null) => {
    const meta = TECH_BADGE_META[name] || { logoColor: "white" };
    const params = new URLSearchParams({
      style: "flat-square",
      logoColor: meta.logoColor || "white",
    });
    if (meta.logo) params.set("logo", meta.logo);
    if (level) {
      const color = LEVEL_COLOR_MAP[level] || "64748B";
      return `https://img.shields.io/badge/${encodeURIComponent(
        name
      )}-${encodeURIComponent(level)}-${color}?${params.toString()}`;
    }
    return `https://img.shields.io/badge/${encodeURIComponent(
      name
    )}-111827?${params.toString()}`;
  };

  const renderSkillBadges = (skills = []) => {
    if (!skills.length) return "";
    return `
      <div class="career-skill-badges">
        ${skills
          .map((skill) => {
            const src = buildTechBadgeSrc(skill);
            return `<img class="career-skill-badge" src="${src}" alt="${skill}" loading="lazy" />`;
          })
          .join("")}
      </div>
    `;
  };

  entry.timeline.forEach((item) => {
    const projectHtml = (item.projects || []).length
      ? item.projects
          .map(
            (project) => `
              <div class="career-project">
                <p class="career-project-period">${project.period}</p>
                <p class="career-card-title">${project.title}</p>
                <ul class="career-points">
                  ${project.points.map((point) => `<li>${point}</li>`).join("")}
                </ul>
                ${renderSkillBadges(project.skills)}
              </div>
            `
          )
          .join("")
      : `
          <p class="career-card-title">${item.title}</p>
          <ul class="career-points">
            ${(item.points || []).map((point) => `<li>${point}</li>`).join("")}
          </ul>
          ${renderSkillBadges(item.skills || [])}
        `;

    const row = document.createElement("article");
    row.className = "career-row";
    row.innerHTML = `
      <div class="career-marker"></div>
      <div class="career-main">
        <p class="career-period">${item.period}</p>
        <h4 class="career-company">${item.company}</h4>
        <div class="career-card">
          ${projectHtml}
        </div>
      </div>
    `;
    timeline.appendChild(row);
  });

  section.appendChild(timeline);
  terminalOutput.appendChild(section);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function appendStackMatrix(entry) {
  const section = document.createElement("section");
  section.className = "stack-section";

  const title = document.createElement("h3");
  title.className = "stack-title";
  title.textContent = "Skills";
  section.appendChild(title);

  (entry.groups || []).forEach((group) => {
    const row = document.createElement("article");
    row.className = "stack-row";

    const label = document.createElement("p");
    label.className = "stack-label";
    label.textContent = group.label;
    row.appendChild(label);

    const value = document.createElement("div");
    value.className = "stack-value";
    (group.items || []).forEach((item) => {
      const badge = document.createElement("img");
      badge.className = "stack-item-badge";
      badge.alt = `${item.name} ${item.level}`;
      badge.title = `${item.name} (${item.level})`;

      const meta = TECH_BADGE_META[item.name] || { logoColor: "white" };
      const params = new URLSearchParams({
        style: "flat-square",
        logoColor: meta.logoColor || "white",
      });
      if (meta.logo) params.set("logo", meta.logo);
      const color = LEVEL_COLOR_MAP[item.level] || "64748B";
      badge.src = `https://img.shields.io/badge/${encodeURIComponent(
        item.name
      )}-${encodeURIComponent(item.level)}-${color}?${params.toString()}`;
      badge.loading = "lazy";
      value.appendChild(badge);
    });

    row.appendChild(value);
    section.appendChild(row);
  });

  terminalOutput.appendChild(section);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function appendCertificationTable(entry) {
  const section = document.createElement("section");
  section.className = "cert-section";

  const title = document.createElement("h3");
  title.className = "cert-title";
  title.textContent = "Certification";
  section.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.className = "career-subtitle";
  subtitle.textContent = "자격증 및 어학";
  section.appendChild(subtitle);

  (entry.certs || []).forEach((cert) => {
    const row = document.createElement("article");
    row.className = "cert-row";
    row.innerHTML = `
      <p class="cert-date">${cert.date}</p>
      <p class="cert-text">${cert.text}</p>
    `;
    section.appendChild(row);
  });

  terminalOutput.appendChild(section);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function printEntry(entry) {
  if (entry.meta === "usr/about" && entry.card) {
    appendLine(`# ${entry.meta}`, "muted");
    appendAboutCard(entry);
    treeButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.dataset.command === `cat /${entry.meta}`
      );
    });
    return;
  }

  if (
    (entry.meta === "srv/project" ||
      entry.meta === "srv/work" ||
      entry.meta === "usr/edu") &&
    entry.timeline?.length
  ) {
    appendLine(`# ${entry.meta}`, "muted");
    appendCareerTimeline(entry);
    treeButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.dataset.command === `cat /${entry.meta}`
      );
    });
    return;
  }

  if (entry.meta === "usr/contact" && entry.lines?.length) {
    appendLine(`# ${entry.meta}`, "muted");
    entry.lines.forEach((line) => {
      appendLine(applyCareerToken(line));
    });
    treeButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.dataset.command === `cat /${entry.meta}`
      );
    });
    return;
  }

  if (entry.meta === "skills/stack" && entry.groups?.length) {
    appendLine(`# ${entry.meta}`, "muted");
    appendStackMatrix(entry);
    treeButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.dataset.command === `cat /${entry.meta}`
      );
    });
    return;
  }

  if (entry.meta === "skills/certification" && entry.certs?.length) {
    appendLine(`# ${entry.meta}`, "muted");
    appendCertificationTable(entry);
    treeButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.dataset.command === `cat /${entry.meta}`
      );
    });
    return;
  }

  if (entry.rawLines?.length) {
    appendLine(`# ${entry.meta}`, "muted");
    entry.rawLines.forEach((line, index) => {
      appendLine(applyCareerToken(line), index === 0 ? "muted" : "");
    });
    treeButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        button.dataset.command === `cat /${entry.meta}`
      );
    });
    return;
  }

  appendLine(`# ${entry.meta}`, "muted");
  appendLine(applyCareerToken(entry.title));
  appendLine(applyCareerToken(entry.summary), "muted");
  if (entry.tags?.length) {
    appendLine(`tags: ${entry.tags.map(applyCareerToken).join(" | ")}`, "muted");
  }
  entry.blocks.forEach((block) => {
    appendBlock(
      applyCareerToken(block.title),
      block.list.map((item) => applyCareerToken(item))
    );
  });

  treeButtons.forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.command === `cat /${entry.meta}`
    );
  });
}

function printDirectory(path) {
  const items = fileSystem[path] || [];
  appendLine(`opened directory: ${path}`, "muted");
  appendBlock(
    path,
    items.length ? items.map((item) => `${path}/${item}`) : ["(empty)"]
  );
  treeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.command === `cd ${path}`);
  });
}

function printSkillsBundle() {
  printEntry(entries["/skills/stack"]);
}

function printHelp() {
  appendLines(
    [
      "available commands:",
      "help",
      "pwd",
      "ls [path]",
      "cd <path>",
      "cat <path>",
      "tree",
      "skills",
      "whoami",
      "neofetch",
      "hire",
      "clear",
    ],
    "muted"
  );
}

function printLs(path) {
  if (!(path in fileSystem)) {
    appendLine(`ls: cannot access '${path}': No such file or directory`, "error");
    return;
  }

  appendLine(fileSystem[path].join("   ") || ".", "muted");
}

function printCat(path) {
  const entry = entries[path];
  if (!entry) {
    appendLine(`cat: ${path}: No such file or directory`, "error");
    return;
  }

  printEntry(entry);
}

function printNeofetch() {
  appendLines(
    [
      "name        : 이슬기",
      "role        : backend developer",
      `career      : ${getCareerDurationText()}`,
      "main stack  : Java / Spring Boot / RDBMS / Linux",
    ],
    "muted"
  );
}

function executeCommand(rawCommand) {
  const command = rawCommand.trim();
  if (!command) return;

  appendLine(`seulki@github-io:${currentDirectory}$ ${command}`, "command");

  if (command === "clear") {
    terminalOutput.innerHTML = "";
    return;
  }

  if (command === "help") {
    printHelp();
    return;
  }

  if (command === "pwd") {
    appendLine(currentDirectory);
    return;
  }

  if (command === "tree") {
    appendLine(treeText, "muted");
    return;
  }

  if (command === "skills") {
    appendLines(
      [
        "cat /skills/stack",
        "rendering backend/frontend/database/data_access stack...",
      ],
      "muted"
    );
    printSkillsBundle();
    return;
  }

  if (command === "whoami") {
    printCat("/usr/about");
    return;
  }

  if (command === "neofetch") {
    printNeofetch();
    return;
  }

  if (command === "hire --seulki") {
    appendLines(
      [
        "deploying offer pipeline...",
        "      *    .  *       .             *",
        "   .     *      BOOM!      *    .",
        "      \\  |  /       \\  |  /",
        "    ---  *  ---   ---  *  ---",
        "      /  |  \\       /  |  \\",
        "hire-event: confetti shipped for Lee Seulki ʕ⸝⸝•ﻌ•⸝⸝ʔ♡",
      ],
      "muted"
    );
    return;
  }// 2. hire 명령어만 입력했을 때 (리눅스 표준 가이드 스타일)
  else if (command === "hire") {
    appendLines(
      [
        "Usage: hire [options]",
        "",
        "Options:",
        "  --seulki    recruit the best backend developer",
        "",
        "Example:",
        "  hire --seulki"
      ],
      "error" // 에러나 경고 색상이 있다면 지정 (없으면 "muted")
    );
    return;
  }

  const [action, ...rest] = command.split(/\s+/);
  const arg = rest.join(" ").trim();

  if (action === "ls") {
    printLs(resolvePath(arg || currentDirectory));
    return;
  }

  if (action === "cd") {
    const target = resolvePath(arg || "/usr");
    if (!(target in fileSystem)) {
      appendLine(`cd: no such file or directory: ${arg}`, "error");
      return;
    }
    setDirectory(target);
    appendLine(`moved to ${target}`, "muted");
    printDirectory(target);
    return;
  }

  if (action === "cat") {
    printCat(resolvePath(arg));
    return;
  }

  appendLine(`${action}: command not found`, "error");
}

async function simulateCommand(command) {
  if (isTyping) return;
  isTyping = true;
  terminalInput.focus();
  terminalInput.value = "";

  try {
    for (const char of command) {
      terminalInput.value += char;
      await new Promise((resolve) => window.setTimeout(resolve, 24));
    }
    executeCommand(command);
  } catch (error) {
    appendLine(`runtime error: ${error.message}`, "error");
  } finally {
    terminalInput.value = "";
    isTyping = false;
  }
}

function initTerminal() {
  printEntry(entries["/usr/about"]);
  appendAsciiBox([
    "How to use (๑ᵔ⩊ᵔ๑)",
    "Type a command, or click the left file tree menu.",
    "$ cat /usr/about",
    "$ cat /srv/work",
    "$ cat /srv/project",
    "$ cat /skills/stack",
    "$ hire",
    "$ help",
  ]);
}

async function playBootSequence() {
  const bootStart = performance.now();
  const baseDate = new Date();
  const ascii = [
    "Lee Seulki",
    "Backend Developer",
    "portfolio boot ₒ₍₊˒₃˓₎ₒ▁▂▃▅▆▓▒░✩⃛",
  ];
  appendLine(":: Lee Seulki Portfolio :: waking up", "muted");
  appendAsciiBox(ascii, 70);
  await new Promise((resolve) => window.setTimeout(resolve, 270));

  const steps = [
    {
      delay: 0,
      logger: "portfolio.runtime",
      message: "mounting /usr/about profile card",
    },
    {
      delay: 480,
      logger: "portfolio.timeline",
      message: "loading /srv/work and /srv/project timeline",
    },
    {
      delay: 920,
      logger: "portfolio.skills",
      message: "warming badge cache for /skills/stack",
    },
  ];

  for (const step of steps) {
    const timestamp = formatSeoulTimestamp(
      new Date(baseDate.getTime() + step.delay)
    );
    const line = `${timestamp}  OK   1227 --- [portfolio] ${step.logger.padEnd(20, " ")} : ${step.message}`;
    appendLine(line, "muted");
    await new Promise((resolve) => window.setTimeout(resolve, 520));
  }

  const bootSeconds = ((performance.now() - bootStart) / 1000).toFixed(2);
  const finalTimestamp = formatSeoulTimestamp(new Date());
  appendLine(
    `${finalTimestamp}  DONE 1227 --- [portfolio] portfolio.ready       : Lee Seulki is ready in ${bootSeconds}s  / resume/1227  <3`,
    "muted"
  );
  appendLine("", "muted");
  await new Promise((resolve) => window.setTimeout(resolve, 900));
}

treeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("tree-dir")) {
      const group = button.closest(".tree-group");
      if (group) group.classList.toggle("is-collapsed");
    }
    simulateCommand(button.dataset.command);
  });
});

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isTyping) return;
  try {
    executeCommand(terminalInput.value);
  } catch (error) {
    appendLine(`runtime error: ${error.message}`, "error");
  }
  terminalInput.value = "";
});

terminalInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || isTyping) return;
  event.preventDefault();
  try {
    executeCommand(terminalInput.value);
  } catch (error) {
    appendLine(`runtime error: ${error.message}`, "error");
  }
  terminalInput.value = "";
});

window.addEventListener("load", async () => {
  setDirectory("/usr");
  terminalInput.disabled = true;
  await playBootSequence();
  initTerminal();
  terminalInput.disabled = false;
  terminalInput.focus();
});
