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

// Show future semesters as Planned instead of Current.
semesterHTML = function(s, compact = false) {
  const total = s.courses.reduce((a, c) => a + Number(c[2]), 0);
  const wrap = document.createElement('div');
  wrap.className = 'semester ' + (s.status === 'current' ? 'current' : '');
  const statusLabel = s.status === 'done' ? 'Completed' : s.status === 'current' ? 'Current' : 'Planned';
  wrap.innerHTML = `<div class="semhead"><div><h3>${s.label}</h3><div class="semdate">${s.session}</div></div><div style="display:flex;gap:5px;align-items:flex-start"><span class="statusbadge ${s.status}">${statusLabel}</span><span class="creditbadge">${total} cr</span></div></div>`;
  s.courses.forEach(c => {
    const id = courseId(s.id, c[0]);
    const el = document.createElement('div');
    el.className = 'course';
    el.dataset.search = (c[0] + ' ' + c[1]).toLowerCase();
    el.dataset.id = id;
    el.innerHTML = `<div class="course-top"><span class="code">${esc(c[0])}</span><span class="credit">${c[2]} cr</span></div><div class="course-name">${esc(c[1])}</div><div class="pills"><span class="pill">${esc(c[3])}</span><span class="pill file" id="count-${cssSafe(id)}">0 files</span><span class="pill task" id="taskcount-${cssSafe(id)}">0 tasks</span></div>`;
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

renderCourses();
