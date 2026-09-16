// Google Drive cloud integration for cross-device course files.
const studyHubDriveFolders = {
  Y1S1: 'https://drive.google.com/drive/folders/14NwA1nZfa9_1sf8Bw4cR0_GTXvukU90a',
  Y1S2: 'https://drive.google.com/drive/folders/1tZuSZAJ6UZkcwAoyWKazQhnaA9wBbuUc',
  Y1S3: 'https://drive.google.com/drive/folders/1wiiIwgQ-nGSpj2WzU_s4bDO2hiLV68NX',
  Y2S1: 'https://drive.google.com/drive/folders/1J8p2PKj63Tc29E9JnkGiH50lIKIBekn2',
  Y2S2: 'https://drive.google.com/drive/folders/1kuRYvg0_E6em5LKWKdy20NkApQ1SxUx6',
  Y2S3: 'https://drive.google.com/drive/folders/13qBIaN4M5qos4vQKktwjKUCE6iyZhmx5',
  Y3S1: 'https://drive.google.com/drive/folders/1k8BYInu5f6EvPpKssAV-UM9swLyUfiuh',
  Y3S2: 'https://drive.google.com/drive/folders/16YdC7ID4KHUDXmNE5ZLczoSGpva8XAic',
  Y3S3: 'https://drive.google.com/drive/folders/1v5XFDneCGGKsUm0mqaENk-NVCt_06-zP'
};

const studyHubMainDrive = 'https://drive.google.com/drive/folders/1S3ax_RXEeQ0hTqs3LyuiJwh3j2S6bCCE';

function driveUrlForSemester(sem) {
  return studyHubDriveFolders[sem] || studyHubMainDrive;
}

function openSemesterDrive(sem) {
  window.open(driveUrlForSemester(sem), '_blank', 'noopener,noreferrer');
}

// Add a Google Drive button to every semester card, including future semesters.
const studyHubOriginalSemesterHTML = semesterHTML;
semesterHTML = function(s, compact = false) {
  const wrap = studyHubOriginalSemesterHTML(s, compact);
  wrap.dataset.sem = s.id;
  const actions = wrap.querySelector('.semhead > div:last-child');
  if (actions && !actions.querySelector('.drive-sem-btn')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mini drive-sem-btn';
    btn.textContent = '☁️ Drive';
    btn.title = `Open ${s.id} Google Drive folder`;
    btn.onclick = (event) => {
      event.stopPropagation();
      openSemesterDrive(s.id);
    };
    actions.appendChild(btn);
  }
  return wrap;
};

// Keep the existing course drawer for tasks/notes, but make Google Drive the primary file storage.
const studyHubOriginalOpenCourse = openCourse;
openCourse = function(c) {
  studyHubOriginalOpenCourse(c);
  const panel = document.getElementById('d-files');
  if (!panel) return;

  panel.querySelectorAll('[data-cloud-primary]').forEach(x => x.remove());
  const cloud = document.createElement('div');
  cloud.className = 'section';
  cloud.dataset.cloudPrimary = '1';
  cloud.innerHTML = `
    <h3>☁️ Google Drive Cloud Files</h3>
    <p class="tiny" style="margin:6px 0 12px">Files saved here stay available when you change computer or browser.</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn primary" id="openCourseDrive">Open ${esc(c.sem)} Drive Folder</button>
      <button class="btn light" id="openMainDrive">Open Study Hub Drive</button>
    </div>
    <div class="notice" style="margin-top:12px">Upload your course files inside Google Drive. Keep the Drive folder permission as <b>Restricted</b> for privacy.</div>
  `;
  panel.prepend(cloud);
  cloud.querySelector('#openCourseDrive').onclick = () => openSemesterDrive(c.sem);
  cloud.querySelector('#openMainDrive').onclick = () => window.open(studyHubMainDrive, '_blank', 'noopener,noreferrer');

  // Hide the old browser-only upload UI so new files do not get trapped on one device.
  [...panel.children].forEach(child => {
    if (child === cloud) return;
    child.style.display = 'none';
  });
};

// Turn File Center into a cloud-folder launcher instead of browser-only IndexedDB storage.
function renderDriveFileCenter() {
  const list = document.getElementById('globalFileList');
  if (!list) return;
  const toolbar = document.querySelector('.filecenter-toolbar');
  if (toolbar) toolbar.style.display = 'none';
  const count = document.getElementById('fileCenterCount');
  if (count) count.textContent = 'Google Drive cloud storage';
  list.innerHTML = '';

  Object.entries(studyHubDriveFolders).forEach(([sem, url]) => {
    const card = document.createElement('div');
    card.className = 'file-row';
    card.innerHTML = `<div><div class="file-title">☁️ ${sem} Google Drive</div><div class="file-meta">Cloud files · available across devices</div></div><div class="actions"><button class="mini">Open Drive</button></div>`;
    card.querySelector('button').onclick = () => window.open(url, '_blank', 'noopener,noreferrer');
    list.appendChild(card);
  });
}

renderFileCenter = renderDriveFileCenter;

// Replace browser storage wording with cloud wording.
refreshStorage = function() {
  const info = document.getElementById('storageInfo');
  if (info) info.textContent = '☁️ Google Drive connected · files available across your devices';
  const bar = document.getElementById('storageBar');
  if (bar && bar.parentElement) bar.parentElement.style.display = 'none';
};

const courseLocalNote = document.querySelector('#courses .section-title .tiny');
if (courseLocalNote) courseLocalNote.textContent = 'Course files use Google Drive cloud storage.';

// Re-render once so every semester card receives the Drive shortcut.
renderCourses();
renderDriveFileCenter();
refreshStorage();
