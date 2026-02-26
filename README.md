This# DevLog (Next.js 풀스택 개발자 블로그)

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_&_Auth-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**아시아경제 메디컬 4기 프로젝트**의 일환으로 제작된 개발자 블로그 템플릿입니다. 최신 React 프레임워크인 Next.js의 App Router 방식을 채택하였으며, BaaS(Backend as a Service) 솔루션인 Supabase를 데이터베이스 및 인증 수단으로 연동하여 서버리스 기반의 빠르고 안전한 웹 서비스를 제공합니다.

---

## 🚀 주요 기능 (Key Features)

### 1. 인증 시스템 (Authentication)
* **회원가입/로그인**: Supabase Auth를 활용하여 별도의 백엔드 구축 없이 이메일/비밀번호 기반의 강력한 인증 시스템을 구현했습니다.
* **사용자 경험 개선**: 회원가입 시 번거로운 이메일 인증 절차를 생략하고 즉시 로그인할 수 있도록 설정하였으며, 사용자 로그인 상태에 따라 로그인/회원가입 버튼과 아바타/글쓰기/로그아웃 버튼이 동적으로 전환되는 네비게이션 바(Navbar)를 설계했습니다.
* **RLS (Row Level Security)**: 글 작성 등 데이터베이스 쓰기 작업은 인증된 사용자(Authenticated Users)만 가능하도록 Supabase 정책을 설정하여 보안을 강화했습니다.

### 2. 마크다운 글쓰기 에디터 (Blog Editor)
* **`@uiw/react-md-editor` 도입**: 개발자에게 친숙한 마크다운 문법으로 글을 작성할 수 있으며, 좌측 에디터와 우측 라이브 프리뷰(Live Preview) 기능을 제공해 직관적인 글쓰기 경험을 선사합니다.
* **자동 요약 및 썸네일**: 글 발행 시 본문에서 첫 100자 가량을 추출해 리스트용 서버 요약본(`summary`)으로 자동 저장하며, 읽는 시간(`read_time`)을 본문 길이에 비례해 자동 계산합니다.

### 3. 블로그 홈 및 콘텐츠 뷰어 (Content Viewer)
* **최신글/추천글 노출**: 데이터베이스에 저장된 게시글 데이터를 실시간으로 불러와 메인 화면에 그리드(Grid) 레이아웃으로 출력합니다. `is_featured` 속성에 따라 가장 상단에 추천 게시물을 크게 노출시킵니다.
* **카테고리 필터링**: 사용자가 원하는 주제의 게시글만 모아볼 수 있도록 동적인 카테고리 필터(`CategoryFilter`)를 구현했습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 가이드 |
| --- | --- |
| **Frontend Framework** | `Next.js 14+` (App Router 중심의 아키텍처) |
| **Language** | `TypeScript` (엄격한 타입 정의로 오류 최소화) |
| **Styling** | `Tailwind CSS` (유틸리티 클래스 기반 빠른 퍼블리싱), `Lucide React` (일관적인 뱃지 및 아이콘 적용) |
| **Backend & Database** | `Supabase` (PostgreSQL 기반 RDBMS, Auth, Storage) |
| **Markdown Editor** | `@uiw/react-md-editor` (Next.js 호환을 위한 동적 임포트 적용) |

---

## 📂 프로젝트 핵심 구조 (Directory Structure)

```bash
📦 ch.09_blog_final
 ┣ 📂 app
 ┃ ┣ 📂 auth              # 로그인, 회원가입 UI 및 인증을 담당하는 Server Actions
 ┃ ┣ 📂 write             # 마크다운 기반의 새 글 작성 페이지 및 발행 Actions
 ┃ ┣ 📜 layout.tsx        # 최상단 글로벌 레이아웃 설정
 ┃ ┗ 📜 page.tsx          # 홈 화면 (최신 글 목록, 카테고리 필터 등 메인 페이지)
 ┣ 📂 components
 ┃ ┣ 📜 Editor.tsx        # 마크다운 에디터 클라이언트 컴포넌트 (`next/dynamic` 분리)
 ┃ ┣ 📜 Navbar.tsx        # 인증 상태를 관리하는 동적 최상단 네비게이션
 ┃ ┣ 📜 PostCard.tsx      # 게시물 출력용 카드 UI
 ┃ ┗ 📜 ...               # 기능별 분리된 UI 요소들 모음
 ┣ 📂 supabase
 ┃ ┣ 📂 migrations        # Supabase 초기 테이블 생성 및 RLS 정책 SQL (posts, categories)
 ┃ ┗ 📜 seed.sql          # 개발 초기 더미(테스트) 데이터 스크립트
 ┗ 📂 utils/supabase
   ┣ 📜 client.ts         # 브라우저(Client-side) 전용 Supabase 클라이언트
   ┣ 📜 server.ts         # 서버 컴포넌트 및 Server Actions 전용 Supabase 클라이언트
   ┗ 📜 middleware.ts     # 사용자 세션 유지 관리 및 라우트 보호를 위한 미들웨어
```

---

## 🏃‍♂️ 로컬 개발 시작하기 (Getting Started)

프로젝트를 클론(Clone)하고 본인의 PC에서 실행하는 방법입니다.

### 1️⃣ 리포지토리 복제 & 패키지 설치
```bash
git clone https://github.com/seungwon2636/MDA04_code.git
cd MDA04_code
npm install
```

### 2️⃣ Supabase 환경 변수 세팅
프로젝트 최상단 폴더(루트 경로)에 `.env.local` 파일을 생성하고, 본인의 Supabase 프로젝트 대시보드(Settings > API)에서 발급받은 키를 아래 양식에 맞게 입력하세요.

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=당신의_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=당신의_supabase_anon_key
```

### 3️⃣ (선택) 데이터베이스 초기화 (Migrations & Seed)
로컬 데이터베이스 또는 본인의 원격 Supabase DB에 빈 테이블과 정책(RLS)을 생성해야 합니다. Supabase CLI가 설치되어 있다면 다음 명령어를 활용하세요.
*(Supabase Web 진입 후 SQL 에디터 창에서 `supabase/migrations/20241228000000_init_schema.sql` 내용을 직접 붙여넣어 실행하셔도 무방합니다.)*

### 4️⃣ 개발 서버 실행
```bash
npm run dev

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
