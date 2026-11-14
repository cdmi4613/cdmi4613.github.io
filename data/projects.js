
/*
 * DM Portfolio — 프로젝트 데이터
 * 공개용 정보만 포함
 */

window.DM_PROJECTS = [
    {
        id: 'main',
        number: 'MAIN PROJECT',
        type: 'main',
        open: true,
        label: 'FEATURED / END-TO-END INFRASTRUCTURE',

        title: 'DM Ticket',
        subtitle: '대규모 동시 접속을 고려한 티켓 예매 인프라',
        lead: '대기열부터 좌석 선점, 결제, 운영 모니터링까지',

        description:
            'Redis 입장 제어 · MySQL 좌석 동시성 · Kubernetes 서비스 배포 · GitLab CI/CD · Prometheus/Grafana 운영 모니터링',

        tags: [
            'Kubernetes',
            'Docker',
            'GitLab CI/CD',
            'FastAPI',
            'MySQL',
            'Redis',
            'Prometheus',
            'Grafana',
            'Ansible'
        ],

        metrics: [
            ['입장 허용 인원', '3명'],
            ['좌석 임시 점유', '10분'],
        ],

        architecture:
            'images/architecture/main/main-architecture.png',

        architectureText:
            '애플리케이션 · 데이터베이스 · 대기열 · CI/CD · 모니터링 · 운영 점검',

        features: [
            {
                no: '01',
                icon: '↗',
                title: '트래픽 입장 제어',
                text: 'Redis Sorted Set + Lua 기반 대기열 · 동시 입장 3명 제한'
            },
            {
                no: '02',
                icon: '◎',
                title: '좌석 중복 예약 차단',
                text: 'MySQL 행 잠금 · HELD → CONFIRMED 상태 전이'
            },
            {
                no: '03',
                icon: '▣',
                title: '배포 파이프라인',
                text: 'GitLab Runner · 컨테이너 이미지 빌드 · Kubernetes 배포'
            },
            {
                no: '04',
                icon: '◉',
                title: '운영 가시성',
                text: 'Prometheus · Grafana · k6 · Ansible 상태 점검'
            }
        ],

        galleries: [
            {
                id: 'flow',
                label: '서비스 흐름',
                heading: '사용자 예매 흐름',
                summary: '대기열 진입부터 좌석 선점과 결제까지',
                items: [
                    [
                        '메인페이지.png',
                        '공연 메인 페이지',
                        '공연 탐색과 예매 진입 화면'
                    ],
                    [
                        '대기열화면.png',
                        '대기열 화면',
                        '입장 대기 순서와 진행 상태'
                    ],
                    [
                        '좌석선택.png',
                        '좌석 선택',
                        '예약 가능한 좌석 상태 확인'
                    ],
                    [
                        '좌석선택완료시점유_결제완료시좌석확정.png',
                        '좌석 점유와 확정',
                        '좌석확정 시 HELD · 결제 완료 시 CONFIRMED'
                    ],
                    [
                        '결제완료.png',
                        '결제 완료',
                        '최종 예매 완료 화면'
                    ]
                ]
            },

            {
                id: 'queue',
                label: 'Redis 대기열',
                heading: '접속 집중 대응',
                summary: '입장 인원 제어와 Redis 상태 확인',
                items: [
                    [
                        '3명이상_좌석선택진행시_대기열화면.png',
                        '대기열 진입',
                        '동시 입장 한도 초과 시 대기 처리'
                    ],
                    [
                        'redis-대기열에서 입장허가상태.png',
                        '입장 권한 부여',
                        'Redis 대기 상태에서 입장 허용으로 전환'
                    ],
                    [
                        '입장허용된사용자admitted.png',
                        'Admitted 상태',
                        '입장 허용 사용자 상태 확인'
                    ],
                    [
                        'redis데이터베이스.png',
                        'Redis 데이터',
                        '대기열 관련 데이터 확인'
                    ]
                ]
            },

            {
                id: 'database',
                label: 'DB 동시성',
                heading: '좌석 상태 일관성',
                summary: '동일 좌석 경쟁 요청과 DB 트랜잭션 확인',
                items: [
                    [
                        '예약 동시성 통합 테스트.png',
                        '동시 예약 통합 테스트',
                        '동일 좌석 요청에 201 / 409 응답'
                    ],
                    [
                        '중복방지됨.png',
                        '중복 예약 차단',
                        '경쟁 요청 중 한 건만 선점 성공'
                    ],
                    [
                        '좌석점유완료_로컬벤치mysql.png',
                        'MySQL 좌석 상태',
                        'DB에서 HELD 상태 확인'
                    ],
                    [
                        '결제후_안정성테스트.png',
                        '결제 후 상태 확인',
                        '결제 이후 좌석 상태 검증'
                    ]
                ]
            },

            {
                id: 'deployment',
                label: '배포 자동화',
                heading: '컨테이너 기반 배포',
                summary: 'GitLab 파이프라인과 Kubernetes 워크로드',
                items: [
                    [
                        '깃랩파이프라인.png',
                        'GitLab 파이프라인',
                        '자동화 파이프라인 실행 결과'
                    ],
                    [
                        '쿠버네티스배포완료.png',
                        'Kubernetes 배포',
                        '애플리케이션 워크로드 상태'
                    ],
                    [
                        '노드확인.png',
                        '노드 구성',
                        'kind 클러스터 노드 확인'
                    ]
                ]
            },

            {
                id: 'observability',
                label: '모니터링',
                heading: '서비스 운영 가시성',
                summary: '메트릭 수집 · 대시보드 · 부하 테스트',
                items: [
                    [
                        '그라파나_대쉬보드정리.png',
                        'Grafana 대시보드',
                        'RPS·응답시간 시각화'
                    ],
                    [
                        '프로메테우스확인.png',
                        'Prometheus',
                        '애플리케이션 메트릭 수집'
                    ],
                    [
                        'k6부하테스트결과.png',
                        'k6 부하 테스트',
                        '요청 처리 결과 확인'
                    ],
                    [
                        '오류율확인.png',
                        '오류율 확인',
                        '실행 결과의 실패 요청 분석'
                    ]
                ]
            }
        ],

        troubleshooting: [
            {
                issue: '동시 요청 시 동일 좌석 중복 점유 위험',
                solution:
                    'MySQL SELECT ... FOR UPDATE와 트랜잭션 기반 상태 변경',
                result: '한 요청 201 · 경쟁 요청 409'
            },
            {
                issue: '결제 중 좌석 상태 유지 및 반환',
                solution:
                    '10분 HELD · 결제 성공 시 확정 · 취소/만료 시 해제',
                result: '점유 취소 · 결제 실패 시나리오 통합 테스트 통과'
            }
        ],

        outcomes: [
            '동일 좌석 중복 예약 차단',
            '좌석 점유 · 취소 · 결제 실패 흐름 확인',
            'GitLab CI/CD와 Kubernetes 배포 구성',
            'Prometheus·Grafana 관측 환경',
            'Ansible 읽기 전용 운영 점검 10개 성공'
        ]
    },

    {
        id: 'sub01',
        number: 'SUB PROJECT 01',
        type: 'aws',
        open: false,
        label: 'AWS / COMPUTE & DELIVERY',

        title: 'AWS Auto Scaling & CodeDeploy',
        subtitle: 'EC2 기반 확장형 웹 인프라와 배포 자동화',
        lead: '인프라 확장과 애플리케이션 배포 흐름을 하나로',

        description:
            'Terraform 리소스 모듈화 · ALB 트래픽 분산 · EC2 Auto Scaling · CodePipeline/CodeDeploy 배포 흐름',

        tags: [
            'Terraform',
            'Amazon VPC',
            'Application Load Balancer',
            'EC2 Auto Scaling',
            'Amazon ECR',
            'CodePipeline',
            'CodeDeploy'
        ],

        architecture:
            'images/architecture/sub01/sub01-architecture.png',

        architectureText:
            'GitHub Actions → ECR → CodePipeline / CodeDeploy · ALB → EC2 Auto Scaling',

        features: [
            {
                no: '01',
                icon: '▥',
                title: 'Network',
                text: 'VPC · Public/Private Subnet · NAT · 보안 그룹'
            },
            {
                no: '02',
                icon: '↗',
                title: 'Compute Scaling',
                text: 'ALB 연결 · EC2 Auto Scaling (min 1 / desired 2 / max 3)'
            },
            {
                no: '03',
                icon: '▣',
                title: 'Continuous Delivery',
                text: 'GitHub Actions · ECR · CodePipeline · CodeDeploy'
            },
            {
                no: '04',
                icon: '⌘',
                title: 'Infrastructure as Code',
                text: 'Terraform 모듈 기반 리소스 구성'
            }
        ],

        process: [
            [
                '01',
                'Infrastructure',
                'Terraform 네트워크·ALB·ASG 리소스 모듈화'
            ],
            [
                '02',
                'Image Delivery',
                'GitHub Actions 기반 컨테이너 이미지 빌드 및 ECR 연동'
            ],
            [
                '03',
                'Deployment',
                'CodePipeline과 CodeDeploy 기반 배포 단계 구성'
            ],
            [
                '04',
                'Traffic Routing',
                'ALB를 통한 EC2 Auto Scaling 인스턴스 트래픽 분산'
            ]
        ],

        troubleshooting: [
            {
                issue: '리소스 간 배포 의존성',
                solution:
                    '네트워크 → 컴퓨팅 → 배포 서비스 순서로 모듈 및 참조 관계 정리',
                result: 'Terraform 및 배포 리소스 구성 코드 정리'
            }
        ],

        outcomes: [
            'Terraform 기반 VPC·ALB·ASG 구성',
            'EC2 Auto Scaling 최소 1 · 희망 2 · 최대 3 설정',
            'ECR · CodePipeline · CodeDeploy 연계 구성'
        ]
    },

    {
        id: 'sub02',
        number: 'SUB PROJECT 02',
        type: 'eks',
        open: false,
        label: 'AWS / KUBERNETES & DATA',

        title: 'AWS EKS & RDS Infrastructure',
        subtitle: '관리형 Kubernetes와 데이터 계층 연동',
        lead: '애플리케이션과 데이터 계층을 분리한 AWS 서비스 구조',

        description:
            'EKS 워크로드 · ALB Ingress · RDS Proxy/MySQL · Secrets Manager · GitOps 배포 구성. HPA·Rolling Update는 별도 EKS 실습 사례.',

        tags: [
            'Terraform',
            'Amazon EKS',
            'ALB Ingress',
            'Amazon RDS',
            'RDS Proxy',
            'Secrets Manager',
            'Argo CD'
        ],

        architecture:
            'images/architecture/sub02/sub02-architecture.png',

        architectureText:
            'ALB Ingress → EKS Frontend / Backend → RDS Proxy → RDS MySQL',

        features: [
            {
                no: '01',
                icon: '⬡',
                title: 'Managed Kubernetes',
                text: 'Amazon EKS · Node Group · Deployment · Service'
            },
            {
                no: '02',
                icon: '↗',
                title: 'Application Routing',
                text: 'AWS Load Balancer Controller · ALB Ingress'
            },
            {
                no: '03',
                icon: '▤',
                title: 'Database Access',
                text: 'RDS MySQL · RDS Proxy · Secrets Manager'
            },
            {
                no: '04',
                icon: '⟳',
                title: 'Deployment Workflow',
                text: 'GitHub Actions · ECR · Argo CD 구성'
            }
        ],

        process: [
            [
                '01',
                'EKS Foundation',
                'Terraform 기반 VPC·EKS·Node Group 정의'
            ],
            [
                '02',
                'Application Routing',
                'Frontend·Backend 워크로드 및 ALB Ingress 구성'
            ],
            [
                '03',
                'Database Connectivity',
                'RDS Proxy 경유 MySQL 연결 및 Secrets Manager 연계'
            ],
            [
                '04',
                'Deployment Resources',
                'CI/CD · Argo CD 구성과 별도 HPA 실습 정리'
            ]
        ],

        troubleshooting: [
            {
                issue: 'EKS 워크로드와 데이터베이스 연결 경로',
                solution:
                    'Ingress·Service·보안 그룹·RDS Proxy 연결 관계 분리',
                result: '서비스별 네트워크와 데이터 흐름을 아키텍처로 구조화'
            }
        ],

        outcomes: [
            'Terraform 기반 EKS·RDS 인프라 구성',
            'ALB Ingress · RDS Proxy · Secrets Manager 연동 설계',
            'GitHub Actions · Argo CD 배포 리소스 구성'
        ]
    }
];
