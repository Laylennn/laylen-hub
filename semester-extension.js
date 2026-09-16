// Extends the Study Hub semester list through Year 3 Semester 3.
const studyHubExtraSemesters = [
  { id: 'Y2S2', label: 'Year 2 Semester 2', session: 'Future semester', status: 'future', courses: [] },
  { id: 'Y2S3', label: 'Year 2 Semester 3', session: 'Future semester', status: 'future', courses: [] },
  { id: 'Y3S1', label: 'Year 3 Semester 1', session: 'Future semester', status: 'future', courses: [] },
  { id: 'Y3S2', label: 'Year 3 Semester 2', session: 'Future semester', status: 'future', courses: [] },
  { id: 'Y3S3', label: 'Year 3 Semester 3', session: 'Final semester', status: 'future', courses: [] }
];

studyHubExtraSemesters.forEach(semester => {
  if (!baseSemesters.some(existing => existing.id === semester.id)) {
    baseSemesters.push(semester);
  }
});

const studyHubSemesterIds = baseSemesters.map(s => s.id);

function addSemesterOptions(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;
  studyHubSemesterIds.forEach(id => {
    if (![...select.options].some(option => option.value === id)) {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = id;
      select.appendChild(option);
    }
  });
}

['courseSemSelect', 'globalSemFilter', 'newSem'].forEach(addSemesterOptions);

const courseSubnav = document.getElementById('courseSubnav');
if (courseSubnav) {
  studyHubExtraSemesters.forEach(semester => {
    if (!courseSubnav.querySelector(`[data-semfilter="${semester.id}"]`)) {
      const button = document.createElement('button');
      button.className = 'chip';
      button.dataset.semfilter = semester.id;
      button.textContent = semester.id;
      button.onclick = () => setCourseFilter(semester.id);
      courseSubnav.appendChild(button);
    }
  });
}

// Google Drive folders. Files saved there are available across devices.
const studyHubMainDrive = 'https://drive.google.com/drive/folders/1S3ax_RXEeQ0hTqs3LyuiJwh3j2S6bCCE';
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

function openSemesterDrive(sem) {
  window.open(studyHubDriveFolders[sem] || studyHubMainDrive, '_blank', 'noopener,noreferrer');
}

// Show future semesters as Planned and add a Drive shortcut to every semester.
semesterHTML = function(s, compact = false) {
  const total = s.courses.reduce((a, c) => a + Number(c[2]), 0);
  const wrap = document.createElement('div');
  wrap.className = 'semester ' + (s.status === 'current' ? 'current' : '');
  const statusLabel = s.status === 'done' ? 'Completed' : s.status === 'current' ? 'Current' : 'Planned';
  wrap.innerHTML = `<div class="semhead"><div><h3>${s.label}</h3><div class="semdate">${s.session}</div></div><div style="display:flex;gap:5px;align-items:flex-start;flex-wrap:wrap"><span class="statusbadge ${s.status}">${statusLabel}</span><span class="creditbadge">${total} cr</span><button type="button" class="mini drive-sem-btn">☁️ Drive</button></div></div>`;
  wrap.querySelector('.drive-sem-btn').onclick = e => { e.stopPropagation(); openSemesterDrive(s.id); };
  s.courses.forEach(c => {
    const id = courseId(s.id, c[0]);
    const el = document.createElement('div');
    el.className = 'course';
    el.dataset.search = (c[0] + ' ' + c[1]).toLowerCase();
    el.dataset.id = id;
    el.innerHTML = `<div class="course-top"><span class="code">${esc(c[0])}</span><span class="credit">${c[2]} cr</span></div><div class="course-name">${esc(c[1])}</div><div class="pills"><span class="pill">${esc(c[3])}</span><span class="pill file">☁️ Drive</span><span class="pill task" id="taskcount-${cssSafe(id)}">0 tasks</span></div>`;
    el.onclick = () => openCourse({ sem: s.id, code: c[0], name: c[1], credit: c[2], type: c[3], id });
    wrap.appendChild(el);
  });
  if (!s.courses.length && !compact) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'No courses added yet.';
    wrap.appendChild(empty);
  }
  return wrap;
};

// Keep tasks and notes in the drawer, but use Drive as the primary file location.
const studyHubOpenCourseLocal = openCourse;
openCourse = function(c) {
  studyHubOpenCourseLocal(c);
  const panel = document.getElementById('d-files');
  if (!panel) return;
  panel.innerHTML = `
    <div class="section">
      <h3>☁️ Google Drive Cloud Files</h3>
      <p class="tiny" style="margin:6px 0 12px">Files saved here remain available after changing computer or browser.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn primary" id="openSemesterDriveBtn">Open ${esc(c.sem)} Drive Folder</button>
        <button class="btn light" id="openStudyHubDriveBtn">Open Main Study Hub Drive</button>
      </div>
      <div class="notice" style="margin-top:12px">Upload the file in Google Drive. Keep General access as <b>Restricted</b> so other people cannot see your course files.</div>
    </div>`;
  document.getElementById('openSemesterDriveBtn').onclick = () => openSemesterDrive(c.sem);
  document.getElementById('openStudyHubDriveBtn').onclick = () => window.open(studyHubMainDrive, '_blank', 'noopener,noreferrer');
};

function renderDriveFileCenter() {
  const list = document.getElementById('globalFileList');
  if (!list) return;
  const toolbar = document.querySelector('.filecenter-toolbar');
  if (toolbar) toolbar.style.display = 'none';
  const count = document.getElementById('fileCenterCount');
  if (count) count.textContent = 'Google Drive cloud storage';
  list.innerHTML = '';
  Object.entries(studyHubDriveFolders).forEach(([sem, url]) => {
    const row = document.createElement('div');
    row.className = 'file-row';
    row.innerHTML = `<div><div class="file-title">☁️ ${sem} Google Drive</div><div class="file-meta">Cloud files · available across devices</div></div><div class="actions"><button class="mini">Open Drive</button></div>`;
    row.querySelector('button').onclick = () => window.open(url, '_blank', 'noopener,noreferrer');
    list.appendChild(row);
  });
}

renderFileCenter = renderDriveFileCenter;

// Update wording so it is clear files are cloud-based.
const courseStorageText = document.querySelector('#courses .section-title .tiny');
if (courseStorageText) courseStorageText.textContent = 'Course files use Google Drive cloud storage.';
const storageInfo = document.getElementById('storageInfo');
if (storageInfo) storageInfo.textContent = '☁️ Google Drive connected · available across your devices';
const storageBar = document.getElementById('storageBar');
if (storageBar && storageBar.parentElement) storageBar.parentElement.style.display = 'none';

renderCourses();
renderDriveFileCenter();
