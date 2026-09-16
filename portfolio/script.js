const $ = (id) => document.getElementById(id);
const PROFILE_KEY = 'laylenPortfolioProfileV1';
const THEME_KEY = 'laylenPortfolioThemeV1';
const defaultProfile = {
  headline: 'I build practical business-tech solutions and I’m working toward ERP, Business Analysis and BI/Data roles.',
  email: 'your-email@example.com',
  linkedin: '',
  github: ''
};
function loadProfile(){try{return {...defaultProfile,...JSON.parse(localStorage.getItem(PROFILE_KEY)||'{}')}}catch{return {...defaultProfile}}}
function saveProfile(profile){localStorage.setItem(PROFILE_KEY,JSON.stringify(profile))}
function shortLink(url,fallback){if(!url)return fallback;try{return new URL(url).hostname.replace('www.','')}catch{return url}}
function applyProfile(){const p=loadProfile();$('heroTitle').textContent=p.headline;$('emailText').textContent=p.email||defaultProfile.email;$('emailLink').href='mailto:'+(p.email||defaultProfile.email);$('linkedinText').textContent=shortLink(p.linkedin,'Add LinkedIn URL');$('linkedinLink').href=p.linkedin||'#';$('githubText').textContent=shortLink(p.github,'Add GitHub URL');$('githubLink').href=p.github||'#'}
function openEditor(){const p=loadProfile();$('editHeadline').value=p.headline;$('editEmail').value=p.email;$('editLinkedin').value=p.linkedin;$('editGithub').value=p.github;$('modalBackdrop').hidden=false}
function closeEditor(){$('modalBackdrop').hidden=true}
$('editBtn').addEventListener('click',openEditor);
$('closeModal').addEventListener('click',closeEditor);
$('modalBackdrop').addEventListener('click',(e)=>{if(e.target===$('modalBackdrop'))closeEditor()});
$('saveProfile').addEventListener('click',()=>{saveProfile({headline:$('editHeadline').value.trim()||defaultProfile.headline,email:$('editEmail').value.trim()||defaultProfile.email,linkedin:$('editLinkedin').value.trim(),github:$('editGithub').value.trim()});applyProfile();closeEditor()});
$('resetProfile').addEventListener('click',()=>{localStorage.removeItem(PROFILE_KEY);applyProfile();openEditor()});
function setTheme(theme){document.documentElement.dataset.theme=theme;localStorage.setItem(THEME_KEY,theme);$('themeBtn').textContent=theme==='dark'?'☀':'☾'}
$('themeBtn').addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
setTheme(localStorage.getItem(THEME_KEY)||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
$('year').textContent=new Date().getFullYear();
applyProfile();