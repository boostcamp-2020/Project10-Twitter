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
📁fe
├── 📄 README.md                  - 리드미 파일
│
├── 📁.storybook/                 - 스토리북 설정 폴더
│
├── 📁src/                        - 프론트 소스 폴더
│    ├── 📁components/            - 프론트 컴포넌트 폴더
│    │       ├── 📁atoms/         - atoms 컴포넌트 폴더
│    │       ├── 📁molecules/     - molecules 컴포넌트 폴더
│    │       └── 📁organisms/     - organisms 컴포넌트 폴더
│    │
│    ├── 📁graphql/               - graphQL 쿼리 폴더
│    │       ├── 📁auth/          - auth에 관한 graphQL 쿼리 폴더
│    │       ├── 📁custom/        - 두가지 이상의 쿼리문을 합친 graphQL 쿼리 폴더
│    │       ├── 📁image/         - image에 관한 graphQL 쿼리 폴더
│    │       ├── 📁notifications/ - notifications에 관한 graphQL 쿼리 폴더
│    │       ├── 📁tweet/         - tweet에 관한 graphQL 쿼리 폴더
│    │       └── 📁user/          - user에 관한 graphQL 쿼리 폴더
│    │
│    ├── 📁hook/                  - custom hook 폴더
│    │
│    ├── 📁libs/                  - 직접 구현한 library 폴더
│    │
│    ├── 📁page/                  - 페이지 폴더
│    │   ├── 📁[userId]/          - 사용자 페이지 폴더
│    │   │       └── 📁follow/    - 사용자의 follower / following 페이지 폴더
│    │   ├── 📁callback/          - github 로그인시 콜백 페이지 폴더
│    │   ├── 📁explore/           - 검색 페이지 폴더
│    │   ├── 📁login/             - 로그인 페이지 폴더
│    │   ├── 📁notifications/     - 사용자 알림 페이지 폴더
│    │   ├── 📁status/            - 글 상세 페이지 폴더
│    │   ├── 📄_app.tsx           - 모든 페이지를 담고 있는 최상위 컴포넌트
│    │   ├── 📄_document.tsx      - 시작점이 되는 index.html같은 파일
│    │   └── 📄index.tsx          - 홈 페이지 파일
│    │
│    ├── 📁styles/                - 프로젝트 전체에 적용되는 default css 파일
│    │
│    └── 📁types/                 - 공통으로 사용되는 타입을 정의해 놓은 폴더
```
