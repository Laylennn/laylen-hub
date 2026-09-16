// Extends the Study Hub semester list through Year 3 Semester 3.
const studyHubExtraSemesters = [
  { id: 'Y2S2', label: 'Year 2 Semester 2', session: 'Future semester', status: 'future', courses: [] },
  { id: 'Y2S3', label: 'Year 2 Semester 3', session: 'Future semester', status: 'future', courses: [] },
  { id: 'Y3S1', label: 'Year 3 Semester 1', session: 'Future semester', status: 'future', courses: [] },
  { id: 'Y3S2', label: 'Year 3 Semester 2', session: 'Future semester', status: 'future', courses: [] },
  { id: 'Y3S3', label: 'Year 3 Semester 3', session: 'Final semester', status: 'future', courses: [] }
];

studyHubExtraSemesters.forEach(semester => {
  if (!baseSemesters.some(existing => existing.id === semester.id)) baseSemesters.push(semester);
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

const studyHubCourseDriveFolders = {
  UBMM1011: 'https://drive.google.com/drive/folders/14Fi9H4ZXb03iHnQ3ZdHpCKZ2z-HdNauO',
  UCCB1013: 'https://drive.google.com/drive/folders/1Fo96i1ULXEXim93hucATFOGDp4c-YPm7',
  UCCD1203: 'https://drive.google.com/drive/folders/1fnludjLPaGfatAyddN-3Zt7092RFcbfU',
  UCCM2433: 'https://drive.google.com/drive/folders/1XykC9ZhbLvU3yX_kKzOOOt1Tx4ewL8ej',
  UCCN1004: 'https://drive.google.com/drive/folders/1ytSpsYHl2Fvt8dbg4aK4J5vtZGOioT8t',
  UCCT1013: 'https://drive.google.com/drive/folders/1MYMOHTsLViwgc2jX5_0KU9dXLNv-syzI',
  MPU32143: 'https://drive.google.com/drive/folders/1tjv-dhY-4UKH4DoPub37-hI3K1IeWR6m',
  MPU33013: 'https://drive.google.com/drive/folders/1metJ-Tx4RUdV-E6srG4Us8zmkTZvbym5',
  UCCT2153: 'https://drive.google.com/drive/folders/1ZTDq-jm348CPQkKmio-z3WdAwdgrs291',
  MPU3182: 'https://drive.google.com/drive/folders/1sCzZ2WjaPuj9dUUa_45cpyThwODHH60L',
  UCCD1133: 'https://drive.google.com/drive/folders/1OOOU_Ik-RPQLCdVh302vUg2VaQHTX41l',
  UCCD3013: 'https://drive.google.com/drive/folders/1aanKQ1-FD_B-n_OjFxSeFXdP4f5EIA-4',
  UCCN1223: 'https://drive.google.com/drive/folders/1zMYV2rW33IHQSePDI_xl_kcIIOsiTcUw',
  UCCT1104: 'https://drive.google.com/drive/folders/11NtFqZwK3HTo54KPATQ2IrDorGiXK4JL',
  UCCT2103: 'https://drive.google.com/drive/folders/10S52QYkNsWztvW7zSIncqmuZknoJNa6N',
  UCCB1223: 'https://drive.google.com/drive/folders/14alxmToPBOE7yLRp1Hvm0YgNzyGjlJYH',
  UCCB3133: 'https://drive.google.com/drive/folders/173uw0afa8Lbc6yJYxy5R0DyX-CU4nbYB',
  UCCD2323: 'https://drive.google.com/drive/folders/1_JH5g30oSJY-wqINmYHUW7gwQqi-_Cxr',
  UCCD3253: 'https://drive.google.com/drive/folders/1Kms8Al7ymhPbKObd1Fg3mA6JFYnHy8s7',
  UCCT1113: 'https://drive.google.com/drive/folders/1dq0rvSKHDr85C5bOrcfLkFAacPeY0vty',
  UBMM2013: 'https://drive.google.com/drive/folders/1i088t3zWosELidGSt1gmFYInyeK4BU8Z'
};

function openSemesterDrive(sem) {
  window.open(studyHubDriveFolders[sem] || studyHubMainDrive, '_blank', 'noopener,noreferrer');
}
function openCourseDrive(c) {
  window.open(studyHubCourseDriveFolders[c.code] || studyHubDriveFolders[c.sem] || studyHubMainDrive, '_blank', 'noopener,noreferrer');
}

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
    el.innerHTML = `<div class="course-top"><span class="code">${esc(c[0])}</span><span class="credit">${c[2]} cr</span></div><div class="course-name">${esc(c[1])}</div><div class="pills"><span class="pill">${esc(c[3])}</span><span class="pill file">☁️ Course Folder</span><span class="pill task" id="taskcount-${cssSafe(id)}">0 tasks</span></div>`;
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

const studyHubOpenCourseLocal = openCourse;
openCourse = function(c) {
  studyHubOpenCourseLocal(c);
  const panel = document.getElementById('d-files');
  if (!panel) return;
  const hasOwnFolder = Boolean(studyHubCourseDriveFolders[c.code]);
  panel.innerHTML = `
    <div class="section">
      <h3>☁️ ${esc(c.code)} Cloud Folder</h3>
      <p class="tiny" style="margin:6px 0 12px">Each course has its own folder, so your files stay organised and available on other computers.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn primary" id="openCourseDriveBtn">Open ${esc(c.code)} Folder</button>
        <button class="btn light" id="openSemesterDriveBtn">Open ${esc(c.sem)} Folder</button>
      </div>
      <div class="notice" style="margin-top:12px">${hasOwnFolder ? 'Upload files for this course inside this folder.' : 'This future/custom course will use the semester folder until its own folder is created.'} Keep General access as <b>Restricted</b>.</div>
    </div>`;
  document.getElementById('openCourseDriveBtn').onclick = () => openCourseDrive(c);
  document.getElementById('openSemesterDriveBtn').onclick = () => openSemesterDrive(c.sem);
};

function renderDriveFileCenter() {
  const list = document.getElementById('globalFileList');
  if (!list) return;
  const toolbar = document.querySelector('.filecenter-toolbar');
  if (toolbar) toolbar.style.display = 'none';
  const count = document.getElementById('fileCenterCount');
  if (count) count.textContent = Object.keys(studyHubCourseDriveFolders).length + ' course folders';
  list.innerHTML = '';
  allSemesters().forEach(s => {
    s.courses.forEach(c => {
      const url = studyHubCourseDriveFolders[c[0]];
      if (!url) return;
      const row = document.createElement('div');
      row.className = 'file-row';
      row.innerHTML = `<div><div class="file-title">☁️ ${esc(c[0])} · ${esc(c[1])}</div><div class="file-meta">${esc(s.id)} · dedicated Google Drive folder</div></div><div class="actions"><button class="mini">Open Folder</button></div>`;
      row.querySelector('button').onclick = () => window.open(url, '_blank', 'noopener,noreferrer');
      list.appendChild(row);
    });
  });
}
renderFileCenter = renderDriveFileCenter;

const courseStorageText = document.querySelector('#courses .section-title .tiny');
if (courseStorageText) courseStorageText.textContent = 'Each course uses its own Google Drive folder.';
const storageInfo = document.getElementById('storageInfo');
if (storageInfo) storageInfo.textContent = '☁️ Google Drive connected · one folder per course';
const storageBar = document.getElementById('storageBar');
if (storageBar && storageBar.parentElement) storageBar.parentElement.style.display = 'none';

renderCourses();
renderDriveFileCenter();
