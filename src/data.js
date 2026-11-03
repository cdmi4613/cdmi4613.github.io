// 이 파일의 내용만 수정해도 주요 화면 텍스트를 변경할 수 있습니다.
// 검증되지 않은 실습 결과나 캡처는 만들지 않고 '추가 예정'으로 표시했습니다.
export const profile = {
  headline: '서비스를 이해하고, 안정적인 인프라를 설계합니다.',
  role: 'Cloud Infrastructure Engineer',
  introduction: '프론트엔드 실무에서 출발해 백엔드와 클라우드 인프라까지 학습 영역을 확장했습니다. AWS, Terraform, Kubernetes 실습을 통해 구축·배포·운영의 연결 구조를 이해하고 있습니다.',
  github: 'https://github.com/cdmi4613',
  email: '', // 공개를 원할 경우 이메일 주소 입력
}

export const skillGroups = [
  { name: 'Cloud & Networking', items: ['AWS EC2', 'VPC · Subnet', 'ALB · ASG', 'S3 · RDS', 'IAM · CloudWatch'] },
  { name: 'Container & Platform', items: ['Docker', 'Kubernetes', 'Amazon EKS', 'Nginx', 'EFS · StatefulSet'] },
  { name: 'IaC & Delivery', items: ['Terraform', 'GitHub Actions', 'Amazon ECR', 'AWS SSM', 'Git · Bash'] },
  { name: 'Development', items: ['Python · FastAPI', 'React', 'TypeScript', 'MySQL', 'REST API'] },
]

export const projects = [
  {
    id: 'eks', number: '01', label: 'Container Infrastructure', title: 'EKS 기반 Kubernetes 인프라 구축 및 운영',
    description: 'EKS 클러스터에 웹·API 애플리케이션과 상태 저장 워크로드를 배치하며 컨테이너 운영 구조를 실습했습니다.',
    tags: ['Amazon EKS', 'Kubernetes', 'ALB Controller', 'EFS', 'MySQL', 'CronJob'],
    overview: [ ['구분', '교육과정 인프라 실습'], ['참여 형태', '개인 실습'], ['핵심 관점', '컨테이너 운영 · 영구 스토리지 · 데이터 백업'] ],
    goals: ['EKS에서 웹 및 API 애플리케이션 실행', 'ALB Controller를 통한 외부 트래픽 진입 구성', 'EFS와 MySQL StatefulSet 활용', 'CronJob 기반 주기적 백업 구조 실습'],
    steps: [
      { title: '클러스터 및 노드 구성', detail: 'EKS 관리형 클러스터와 워커 노드 환경 구성' },
      { title: '애플리케이션 배포', detail: 'Nginx·FastAPI 컨테이너 및 Kubernetes 리소스 설정' },
      { title: '트래픽과 스토리지 연결', detail: 'ALB Controller, EFS, MySQL StatefulSet 구성' },
      { title: '백업 및 운영 점검', detail: 'CronJob 백업 구조와 Pod·서비스 상태 확인' },
    ],
    verifications: [
      { title: '노드·Pod 상태', command: 'kubectl get nodes && kubectl get pods -A', filename: 'eks-nodes.webp' },
      { title: '서비스 접근', command: 'Ingress / ALB 연결 확인', filename: 'eks-service.webp' },
      { title: '스토리지·백업', command: 'PVC / CronJob / Job 결과 확인', filename: 'eks-backup.webp' },
    ],
    troubleshoot: '실제 발생한 EKS 접속·DNS 또는 Pod 오류 중 원인과 해결을 재검증한 사례를 이 위치에 작성합니다.',
    limitation: '학습 실습 환경으로, 상용 환경 수준의 가용성·보안·부하 검증을 완료했다고 주장하지 않습니다.',
    diagram: '/media/eks-architecture.svg',
  },
  {
    id: 'cicd', number: '02', label: 'Infrastructure Automation', title: 'Terraform 기반 컨테이너 CI/CD 자동화',
    description: '코드 변경을 기준으로 Docker 이미지 빌드, ECR 저장, 프라이빗 EC2 배포를 연결한 자동화 파이프라인을 구현했습니다.',
    tags: ['Terraform', 'GitHub Actions', 'Docker', 'ECR', 'S3', 'SSM'],
    overview: [ ['구분', '개인 실습 프로젝트'], ['참여 형태', '개인'], ['핵심 관점', 'IaC · 재현 가능한 배포 · 프라이빗 서버 운영'] ],
    goals: ['Terraform 기반 AWS 인프라 구성', 'GitHub Actions의 Docker 이미지 빌드 자동화', '이미지 ECR Push 및 Compose 파일 S3 저장', 'SSM을 통한 Private EC2 배포'],
    steps: [
      { title: '인프라 코드화', detail: 'Terraform으로 EC2, 네트워크 및 배포 관련 자원 구성' },
      { title: '이미지 빌드', detail: 'GitHub Actions에서 Docker 이미지 빌드' },
      { title: '아티팩트 저장', detail: 'ECR 이미지 Push 및 S3 Compose 파일 업로드' },
      { title: '프라이빗 배포', detail: 'AWS SSM 명령으로 Private EC2에 배포' },
    ],
    verifications: [
      { title: 'CI/CD 실행', command: 'GitHub Actions workflow 결과', filename: 'cicd-actions.webp' },
      { title: '컨테이너 이미지', command: 'Amazon ECR 이미지 목록', filename: 'cicd-ecr.webp' },
      { title: '배포 결과', command: 'SSM 실행 결과 / docker ps', filename: 'cicd-deploy.webp' },
    ],
    troubleshoot: '빌드·인증·SSM 실행 등 실제 해결한 오류 사례를 확인 후 보강합니다.',
    limitation: '학습 프로젝트의 자동화 흐름이며 운영 배포 승인, 롤백, 비밀 관리 정책은 별도 개선 대상으로 정리합니다.',
    diagram: '/media/cicd-architecture.svg',
  },
  {
    id: 'operations', number: '03', label: 'Reliability & Observability', title: 'AWS 고가용성 인프라 및 모니터링 실습',
    description: 'ALB·ASG 중심의 서비스 인프라와 CloudWatch·CloudTrail·X-Ray 관찰성 기능을 실습했습니다.',
    tags: ['VPC', 'ALB', 'ASG', 'EC2', 'CloudWatch', 'CloudTrail', 'X-Ray'],
    overview: [ ['구분', 'AWS 인프라 운영 실습'], ['참여 형태', '개인 실습'], ['핵심 관점', '가용성 구조 · 로그 · 메트릭 · 추적'] ],
    goals: ['VPC 네트워크와 ALB·ASG 기반 웹 서비스 구조 이해', 'CloudWatch 지표와 로그 확인', 'CloudTrail API 활동 기록 확인', 'X-Ray 분산 추적 구조 실습'],
    steps: [
      { title: '네트워크 구성', detail: 'VPC·서브넷·라우팅 및 보안 그룹 설정' },
      { title: '서비스 계층 구축', detail: 'ALB와 Auto Scaling Group의 EC2 연결' },
      { title: '운영 데이터 수집', detail: 'CloudWatch 메트릭·로그와 CloudTrail 이벤트 점검' },
      { title: '요청 흐름 분석', detail: 'X-Ray를 이용한 추적 실습' },
    ],
    verifications: [
      { title: 'ALB / ASG 구성', command: 'Target health / EC2 상태 확인', filename: 'ops-asg.webp' },
      { title: '모니터링 화면', command: 'CloudWatch 지표와 로그', filename: 'ops-cloudwatch.webp' },
      { title: '감사·추적 기록', command: 'CloudTrail 이벤트 / X-Ray', filename: 'ops-logs.webp' },
    ],
    troubleshoot: '실제 수집된 로그와 오류 사례를 바탕으로 근거 화면을 추가합니다.',
    limitation: '다중 AZ 기반의 설계·실습 경험을 설명하며 정량적인 SLA·내결함성 입증 결과는 별도로 요구합니다.',
    diagram: '/media/ops-architecture.svg',
  },
]

export const experiences = [
  { period: '2024.09 — 2025.07', org: '그란코', role: 'IT 연구원 / 프론트엔드', detail: 'CRM 1.0 서비스 기획·UI/UX·React 개발, 실시간 데이터 API 연동, 대시보드 화면 구성, 프로젝트 매뉴얼 및 유지보수' },
  { period: '2026.06 — 2026.12', org: '메가존클라우드 교육과정', role: '하이브리드 클라우드 아키텍처 엔지니어', detail: 'AWS 인프라, Kubernetes, Terraform, CI/CD 및 운영·관찰성 실습 (진행 중)' },
  { period: '2025.12 — 2026.06', org: 'AIoT 산업솔루션 교육과정', role: 'Python · Backend · AI', detail: 'Python·MySQL·FastAPI 등 학습, YOLO11s 및 OpenCV 기반 스마트 횡단보도 MVP 개발' },
]
