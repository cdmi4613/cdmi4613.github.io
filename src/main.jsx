import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Box, CheckCircle2, ChevronDown,
  Cloud, Code2, ExternalLink, Github, Layers3, Menu, Network, ShieldCheck, Terminal,
  Workflow, X, ZoomIn, Mail, Activity, Wrench, FileCode2
} from 'lucide-react'
import { profile, projects, skillGroups, experiences } from './data'
import './styles.css'

function IconTag({children}) { return <span className="pill">{children}</span> }
function SectionHead({eyebrow, title, description}) { return <div className="section-head"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div> }
function ImageFrame({src, alt, caption, className = ''}) {
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [src])
  return <figure className={`image-frame ${className}`}>
    {!failed ? <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} /> : <div className="media-fallback"><Code2 size={27}/><strong>이미지 준비 중</strong><span>{src.split('/').pop()}</span></div>}
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}
function EvidenceImage({name, title, command, project}) {
  const [failed, setFailed] = useState(false)
  const path = `/media/${name}`
  useEffect(() => setFailed(false), [name])
  return <div className="evidence-card">
    <div className="evidence-visual">
      {!failed ? <img loading="lazy" src={path} alt={`${project} ${title} 실제 검증 캡처`} onError={() => setFailed(true)} /> :
      <div className="empty-shot"><Terminal size={24}/><span>실제 검증 화면 추가 예정</span><code>{name}</code></div>}
    </div>
    <div className="evidence-text"><strong>{title}</strong><small>{command}</small></div>
  </div>
}
function Header({onHome}) {
  const [open, setOpen] = useState(false)
  const nav = [ ['소개','#about'], ['기술','#skills'], ['프로젝트','#projects'], ['경험','#experience'] ]
  const clickNav = () => { setOpen(false); onHome() }
  return <header className="site-header"><div className="container nav-inner">
    <a className="brand" href="#top" onClick={clickNav}><span className="brand-mark"><Layers3 size={17}/></span><span>CMI<span className="brand-dot">.</span> CLOUD</span></a>
    <button className="mobile-toggle" aria-label={open?'메뉴 닫기':'메뉴 열기'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
    <nav className={open?'nav-links open':'nav-links'}>{nav.map(([t,link])=><a key={t} href={link} onClick={clickNav}>{t}</a>)}<a href={profile.github} target="_blank" rel="noopener noreferrer" className="nav-github"><Github size={17}/> GitHub <ArrowUpRight size={14}/></a></nav>
  </div></header>
}
function Landing({onProject}) {
  return <>
    <section className="hero container" id="about"><div className="hero-copy">
      <span className="availability"><span className="live-dot"/> CLOUD ENGINEER PORTFOLIO</span>
      <p className="hero-overline">BUILD. OPERATE. IMPROVE.</p>
      <h1>서비스를 이해하고,<br/><span>안정적인 인프라를</span><br/>설계합니다.</h1>
      <p className="hero-description">{profile.introduction}</p>
      <div className="hero-actions"><a className="btn btn-primary" href="#projects">프로젝트 보기 <ArrowRight size={18}/></a><a className="btn btn-secondary" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub</a></div>
    </div><div className="hero-panel" aria-label="클라우드 엔지니어 핵심 역량 시각화"><div className="panel-top"><span className="tiny-dot"/><span className="tiny-dot"/><span className="tiny-dot"/><small>infrastructure.map</small></div><div className="stack-visual"><div className="stack-item"><Cloud/><span>Cloud Infrastructure</span><i>01</i></div><div className="stack-connect"/><div className="stack-item"><Box/><span>Container Platform</span><i>02</i></div><div className="stack-connect"/><div className="stack-item"><Workflow/><span>Deployment Automation</span><i>03</i></div><div className="stack-connect"/><div className="stack-item"><Activity/><span>Observability & Operations</span><i>04</i></div></div><div className="panel-bottom"><span>INFRASTRUCTURE / AUTOMATION / OPERATIONS</span><span className="status-green">● LEARNING & BUILDING</span></div></div></section>
    <div className="metric-strip"><div className="container metric-inner"><div><strong>03</strong><span>핵심 인프라 프로젝트</span></div><div><strong>IaC</strong><span>Terraform 기반 구성</span></div><div><strong>K8s</strong><span>컨테이너 플랫폼 실습</span></div><div><strong>Ops</strong><span>모니터링 및 문제 분석</span></div></div></div>
    <section className="section container" id="skills"><SectionHead eyebrow="01 / CAPABILITIES" title="기술 역량" description="개발 경험을 기반으로 인프라의 구축부터 운영까지 학습하고 적용한 기술입니다."/><div className="skill-grid">{skillGroups.map((g,i)=><article key={g.name} className="skill-card"><div className="skill-num">0{i+1}</div><h3>{g.name}</h3><div className="skill-items">{g.items.map(item=><span key={item}>{item}</span>)}</div></article>)}</div></section>
    <section className="section projects-section" id="projects"><div className="container"><SectionHead eyebrow="02 / SELECTED WORK" title="주요 프로젝트" description="아키텍처, 실제 구현, 운영 검증 및 개선 포인트를 중심으로 정리했습니다."/><div className="project-list">{projects.map(p=><article className="project-row" key={p.id}><div className="project-media" onClick={()=>onProject(p.id)} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&onProject(p.id)}><ImageFrame src={p.diagram} alt={`${p.title} 아키텍처 개념 초안`} /></div><div className="project-info"><div className="project-meta"><span>PROJECT {p.number}</span><span>{p.label}</span></div><h3>{p.title}</h3><p>{p.description}</p><div className="tag-cloud">{p.tags.slice(0,5).map(x=><IconTag key={x}>{x}</IconTag>)}</div><button className="text-link" onClick={()=>onProject(p.id)}>상세 프로젝트 보기 <ArrowUpRight size={18}/></button></div></article>)}</div></div></section>
    <section className="section container" id="experience"><SectionHead eyebrow="03 / EXPERIENCE" title="경험과 성장 과정" description="실무에서 시작해 백엔드와 클라우드 인프라까지 역량을 확장했습니다."/><div className="timeline">{experiences.map(e=><div key={e.org} className="timeline-item"><div className="timeline-period">{e.period}</div><div className="timeline-content"><h3>{e.org}</h3><strong>{e.role}</strong><p>{e.detail}</p></div></div>)}</div></section>
    <section className="contact-band" id="contact"><div className="container contact-inner"><div><span className="eyebrow">04 / CONNECT</span><h2>더 자세한 구현 기록은<br/>GitHub에서 확인할 수 있습니다.</h2></div><div className="contact-actions"><a className="btn btn-light" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={19}/> GitHub 방문 <ArrowUpRight size={18}/></a>{profile.email&&<a className="btn btn-outline-light" href={`mailto:${profile.email}`}><Mail size={18}/> 이메일</a>}</div></div></section>
  </>
}
function Detail({project:p,onBack}) {
  const [zoom,setZoom]=useState(false)
  useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});document.title=`${p.title} | Cloud Portfolio`},[p])
  return <main className="detail container"><button className="back-link" onClick={onBack}><ArrowLeft size={17}/> 전체 프로젝트로 돌아가기</button><div className="detail-hero"><span className="eyebrow">PROJECT {p.number} / {p.label.toUpperCase()}</span><h1>{p.title}</h1><p>{p.description}</p><div className="tag-cloud">{p.tags.map(x=><IconTag key={x}>{x}</IconTag>)}</div></div>
    <div className="detail-overview">{p.overview.map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div>
    <section className="detail-section"><div className="detail-title"><span>01</span><h2>프로젝트 목표</h2></div><div className="goal-grid">{p.goals.map((g,i)=><div className="goal-card" key={g}><CheckCircle2 size={19}/><p>{g}</p></div>)}</div></section>
    <section className="detail-section"><div className="detail-title"><span>02</span><h2>아키텍처 다이어그램</h2></div><p className="section-note">구조를 설명하기 위한 <strong>편집 가능한 SVG 개념 초안</strong>입니다. 실제 배포 구성과 대조한 뒤 최종 다이어그램으로 교체하세요.</p><button className="diagram-button" onClick={()=>setZoom(true)} aria-label="다이어그램 크게 보기"><ImageFrame src={p.diagram} alt={`${p.title} 시스템 아키텍처 다이어그램`} /><span className="zoom-cta"><ZoomIn size={17}/> 확대 보기</span></button></section>
    <section className="detail-section"><div className="detail-title"><span>03</span><h2>구축 및 구현 과정</h2></div><div className="step-list">{p.steps.map((s,i)=><div className="step-item" key={s.title}><span className="step-index">{String(i+1).padStart(2,'0')}</span><div><h3>{s.title}</h3><p>{s.detail}</p></div></div>)}</div></section>
    <section className="detail-section"><div className="detail-title"><span>04</span><h2>실행 및 검증 결과</h2></div><p className="section-note">이 영역은 예시 이미지가 아닌 <strong>본인의 실제 AWS 콘솔·터미널 캡처</strong>를 넣도록 비워두었습니다. 아래 파일명대로 <code>public/media/</code>에 파일을 추가하면 자동으로 표시됩니다.</p><div className="evidence-grid">{p.verifications.map(v=><EvidenceImage key={v.filename} name={v.filename} title={v.title} command={v.command} project={p.title}/>)}</div></section>
    <section className="detail-section"><div className="detail-title"><span>05</span><h2>트러블슈팅 및 개선</h2></div><div className="issue-grid"><div className="issue-card"><div className="issue-label"><Wrench size={17}/> 트러블슈팅 기록</div><p>{p.troubleshoot}</p></div><div className="issue-card"><div className="issue-label"><ShieldCheck size={17}/> 한계와 개선 방향</div><p>{p.limitation}</p></div></div></section>
    <div className="detail-end"><button className="btn btn-primary" onClick={onBack}><ArrowLeft size={17}/> 다른 프로젝트 보기</button></div>
    {zoom&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="아키텍처 확대"><button className="lightbox-close" aria-label="닫기" onClick={()=>setZoom(false)}><X size={25}/></button><img src={p.diagram} alt={`${p.title} 확대된 다이어그램`}/></div>}
  </main>
}
function App() {
  const [active,setActive]=useState(null)
  const navigate = id => { setActive(id); window.history.replaceState(null,'',id?`#project-${id}`:'#projects');window.scrollTo({top:0,behavior:'instant'}) }
  useEffect(()=>{let hash=location.hash.match(/^#project-(eks|cicd|operations)$/); if(hash)setActive(hash[1])},[])
  useEffect(()=>{document.title=active?`${projects.find(x=>x.id===active)?.title} | Cloud Portfolio`:'Cloud Infrastructure Engineer | Portfolio'},[active])
  const selected = projects.find(p=>p.id===active)
  return <><div id="top"/><Header onHome={()=>active&&setActive(null)}/><main>{selected?<Detail project={selected} onBack={()=>navigate(null)}/>:<Landing onProject={navigate}/>}</main><footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} CLOUD ENGINEER PORTFOLIO</span><span>Built with React & Vite · Hosted on GitHub Pages</span></div></footer></>
}
createRoot(document.getElementById('root')).render(<App/>)
