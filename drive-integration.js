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

const studyHubMainDrive = 'https://drive.google.com/drive/folders/1S3ax_RXEeQ0hTqs3LyuiJwh3j2S6bCCE';

function driveUrlForSemester(sem) {
  return studyHubDriveFolders[sem] || studyHubMainDrive;
}

function driveUrlForCourse(course) {
  return studyHubCourseDriveFolders[course.code] || driveUrlForSemester(course.sem);
}

function openSemesterDrive(sem) {
  window.open(driveUrlForSemester(sem), '_blank', 'noopener,noreferrer');
}

function openCourseDrive(course) {
  window.open(driveUrlForCourse(course), '_blank', 'noopener,noreferrer');
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

// Keep the existing course drawer for tasks/notes, but make each course folder the primary file storage.
const studyHubOriginalOpenCourse = openCourse;
openCourse = function(c) {
  studyHubOriginalOpenCourse(c);
  const panel = document.getElementById('d-files');
  if (!panel) return;

  panel.querySelectorAll('[data-cloud-primary]').forEach(x => x.remove());
  const hasCourseFolder = Boolean(studyHubCourseDriveFolders[c.code]);
  const cloud = document.createElement('div');
  cloud.className = 'section';
  cloud.dataset.cloudPrimary = '1';
  cloud.innerHTML = `
    <h3>☁️ ${esc(c.code)} Cloud Folder</h3>
    <p class="tiny" style="margin:6px 0 12px">This course has its own Google Drive folder, so files stay organised and available on other computers.</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn primary" id="openCourseDrive">Open ${esc(c.code)} Folder</button>
      <button class="btn light" id="openSemesterDrive">Open ${esc(c.sem)} Folder</button>
    </div>
    <div class="notice" style="margin-top:12px">${hasCourseFolder ? 'Upload files here for this course only.' : 'This future/custom course does not have a dedicated folder yet, so it will use the semester folder for now.'} Keep Drive permission as <b>Restricted</b>.</div>
  `;
  panel.prepend(cloud);
  cloud.querySelector('#openCourseDrive').onclick = () => openCourseDrive(c);
  cloud.querySelector('#openSemesterDrive').onclick = () => openSemesterDrive(c.sem);

  // Hide the old browser-only upload UI so new files do not get trapped on one device.
  [...panel.children].forEach(child => {
    if (child === cloud) return;
    child.style.display = 'none';
  });
};

// File Center becomes a clean course-by-course cloud folder list.
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
      const card = document.createElement('div');
      card.className = 'file-row';
      card.innerHTML = `<div><div class="file-title">☁️ ${esc(c[0])} · ${esc(c[1])}</div><div class="file-meta">${esc(s.id)} · dedicated Google Drive folder</div></div><div class="actions"><button class="mini">Open Folder</button></div>`;
      card.querySelector('button').onclick = () => window.open(url, '_blank', 'noopener,noreferrer');
      list.appendChild(card);
    });
  });
}

renderFileCenter = renderDriveFileCenter;

// Replace browser storage wording with cloud wording.
refreshStorage = function() {
  const info = document.getElementById('storageInfo');
  if (info) info.textContent = '☁️ Google Drive connected · one folder per course';
  const bar = document.getElementById('storageBar');
  if (bar && bar.parentElement) bar.parentElement.style.display = 'none';
};

const courseLocalNote = document.querySelector('#courses .section-title .tiny');
if (courseLocalNote) courseLocalNote.textContent = 'Course files use dedicated Google Drive folders.';

// Re-render once so every semester card receives the Drive shortcut.
renderCourses();
renderDriveFileCenter();
refreshStorage();
