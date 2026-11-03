# Cloud Engineer Portfolio — React + Vite

GitHub Pages 기본 HTTPS 주소 `https://cdmi4613.github.io`에 게시하기 위한 반응형 포트폴리오입니다.

## 1. 로컬에서 실행 (Windows PowerShell / Git Bash)

```bash
npm install
npm run dev
```

브라우저에서 터미널에 표시된 localhost 주소를 엽니다.

## 2. 편집

- 텍스트 / 프로젝트 데이터: `src/data.js`
- 레이아웃 / 반응형 스타일: `src/styles.css`
- 화면 코드: `src/main.jsx`
- 아키텍처 SVG, 증빙 이미지: `public/media/`

현재 3개의 아키텍처 SVG는 개념 초안입니다. 실제 실습 환경을 대조하고 draw.io에서 만든 SVG로 교체하세요.

## 3. GitHub Actions 없이 배포

이 저장소는 기존 GitHub Pages `main / (root)` 설정을 **한 번만** `main /docs`로 변경하는 방식입니다.

```bash
npm run build
# 생성된 docs/index.html 확인
git add .
git commit -m "Build portfolio site"
git push origin main
```

GitHub 저장소 → Settings → Pages → Build and deployment → Deploy from a branch → **main /docs** → Save.

그 후 수정할 때마다 `npm run build` + `git add` + `git commit` + `git push`만 하면 됩니다. GitHub Actions 워크플로 파일은 만들지 않습니다. (GitHub Pages 자체의 게시 작업은 GitHub 내부에서 수행될 수 있습니다.)

`index.html`은 Vite 프로젝트의 소스 진입점으로 사용되며, 실제 게시되는 HTML은 `docs/index.html`입니다.

### 기존 파일과 합치기

이미 `D:\cloud_portfolio`에 Git 저장소와 테스트 `index.html`이 있다면, **이 압축파일 내부의 파일 및 폴더를 그 저장소 루트로 복사**하여 기존 테스트 `index.html`을 덮어씁니다. `.git` 폴더는 지우거나 덮어쓰지 마세요.

## 4. 이미지 준비 규격

| 종류 | 권장 원본 크기 | 비율 | 포맷 | 파일 이름 예시 |
|---|---|---|---|---|
| 아키텍처 다이어그램 | 가로 1600–2400px 상당 | 16:10 내외(구조 우선) | SVG 권장 | `eks-architecture.svg` |
| 프로젝트 목록 대표 시각화 | 1600 × 1000 px | 16:10 | WebP/PNG | 기본은 다이어그램 사용 |
| AWS 콘솔/터미널 검증 화면 | 1600 × 900 px | 16:9 | WebP 권장 | `eks-nodes.webp` |
| 코드 캡처 (필요시) | 1600 × 1000 px | 16:10 | WebP/PNG | 파일명 자유 (코드에 연결 필요) |
| 프로필 사진 (선택) | 800 × 800 px | 1:1 | WebP | 현재 UI에서는 사용 안 함 |
| OG 공유 썸네일 (추후) | 1200 × 630 px | 약 1.91:1 | PNG/JPG | 현재 UI에서는 사용 안 함 |

### 실제 검증 자료로 교체할 이미지 9개

- EKS: `eks-nodes.webp`, `eks-service.webp`, `eks-backup.webp`
- CI/CD: `cicd-actions.webp`, `cicd-ecr.webp`, `cicd-deploy.webp`
- 운영: `ops-asg.webp`, `ops-cloudwatch.webp`, `ops-logs.webp`

없으면 '실제 검증 화면 추가 예정' 자리 표시가 나타납니다. 캡처에 AWS 계정 ID, 공인 IP, 토큰, 비밀번호, 내부 호스트명 등 민감한 정보가 있으면 먼저 마스킹하세요.

### draw.io 다이어그램 내보내기

`파일 → 다른 이름으로 내보내기 → SVG`를 선택해 `public/media/eks-architecture.svg` 같은 이름으로 저장하세요. SVG 내 XML/수식에 외부 링크나 인증 정보가 포함되지 않도록 확인하세요.

## 5. 반응형 동작

- 데스크톱: 최대 1160px 폭의 콘텐츠, 스킬 4열, 프로젝트 2열 구성
- 태블릿: 스킬 2열, 텍스트 크기 조정
- 모바일(720px 이하): 햄버거 메뉴, 프로젝트 세로 배치, 증빙 이미지 단일 열
- 다이어그램: 크기 자동 맞춤 및 클릭 시 확대 보기

## 6. 주의

- 사용자에게 제공된 실습 기록을 근거로 기술 스택을 정리했습니다. **캡처와 상세 장애 해결 과정은 증빙 전까지 비워두었습니다.**
- 실제 수행하지 않은 테스트나 정량적 성과를 기재하지 마세요.
- 프로젝트 연도/기간 및 실무 성과는 최종 제출 전에 실제 기록과 대조하세요.
