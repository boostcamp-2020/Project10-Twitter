## Twitter Clone Service 🐤

<div align='center'>

<img src="https://ifh.cc/g/GQfyo3.png"  width="200" alt="트위터 로고"/> <br />

</div>

Bwitter는 실시간으로 Follow 및 Follower와 소통이 가능한 Twitter를 Clone한 프로젝트 입니다. 

## 실행 스크립트
```
npm i

npm run dev #development
```

## 폴더 구조
```
📁be
├── 📄 README.md                 - 리드미 파일
│
├── 📁 src/                      - 소스 폴더
│   ├── 📁 libs/                 - 직접 구현한 라이브러리
│   ├── 📁 models/               - 모델 정의
│   ├── 📁 providers/            - 서버 기본 설정 제공
│   ├── 📁 resolvers/            - service와 schema 연결
│   ├── 📁 schema/               - db query schema 선언
│   ├── 📁 service/              - db query service 로직
│   └──📄 app.ts                 - 어플리케이션 파일
└── 📁uploads                    - 업로드 한 이미지가 저장된 폴더
```
