-- seed.sql

INSERT INTO categories (id, name, icon) VALUES
('11111111-1111-4111-8111-111111111111', 'JavaScript', 'js'),
('22222222-2222-4222-8222-222222222222', 'Rust', 'rust'),
('33333333-3333-4333-8333-333333333333', 'DevOps', 'cloud'),
('44444444-4444-4444-8444-444444444444', '시스템 설계', 'database'),
('55555555-5555-4555-8555-555555555555', '프론트엔드', null),
('66666666-6666-4666-8666-666666666666', '아키텍처', null),
('77777777-7777-4777-8777-777777777777', 'CSS', null),
('88888888-8888-4888-8888-888888888888', 'React', null),
('99999999-9999-4999-8999-999999999999', 'Wasm', null);

INSERT INTO posts (id, title, summary, content, category_id, thumbnail_url, read_time, author_name, author_avatar_url, is_featured, created_at) VALUES
(gen_random_uuid(), 'WebAssembly의 진화: 브라우저 그 너머로', 'WebAssembly가 서버 사이드 컴퓨팅을 어떻게 변화시키고 있는지, 고성능 애플리케이션을 가능하게 하며 현대 DevOps에서 컨테이너화 전략을 어떻게 재정의하는지 알아보세요.', '내용 생략...', '99999999-9999-4999-8999-999999999999', null, 12, 'Admin', null, true, '2023-11-01T00:00:00Z'),
(gen_random_uuid(), '모던 자바스크립트의 Async/Await 이해하기', '비동기 프로그래밍 패턴, 에러 처리 모범 사례, 그리고 이벤트 루프가 내부적으로 실제로 어떻게 작동하는지에 대한 심층 분석.', '내용 생략...', '55555555-5555-4555-8555-555555555555', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', 5, 'Sarah Chen', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', false, '2023-10-24T00:00:00Z'),
(gen_random_uuid(), '마이크로서비스 아키텍처 패턴', '실제 사례와 함께 Saga, CQRS, 이벤트 소싱 등 일반적인 마이크로서비스 패턴에 대한 포괄적인 가이드.', '내용 생략...', '66666666-6666-4666-8666-666666666666', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', 8, 'Mike Ross', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', false, '2023-10-22T00:00:00Z'),
(gen_random_uuid(), 'CSS Grid vs Flexbox: 상세 가이드', '언제 Grid를 쓰고 언제 Flexbox를 써야 하는지, 그리고 미디어 쿼리 지옥 없이 견고하고 반응형인 레이아웃을 위해 이들을 결합하는 방법.', '내용 생략...', '77777777-7777-4777-8777-777777777777', 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2', 6, 'Emma W.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', false, '2023-10-20T00:00:00Z'),
(gen_random_uuid(), 'React 성능 최적화하기', '병목 현상을 식별하는 기술, 메모이제이션을 효과적으로 사용하는 방법, 그리고 React 애플리케이션의 대규모 리스트를 위한 가상화.', '내용 생략...', '88888888-8888-4888-8888-888888888888', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee', 10, 'John D.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', false, '2023-10-18T00:00:00Z'),
(gen_random_uuid(), '초보자를 위한 쿠버네티스', '컨테이너에서 시작해 파드, 서비스, 그리고 디플로이먼트까지. 개발자를 위한 K8s 개념에 대한 친절한 소개.', '내용 생략...', '33333333-3333-4333-8333-333333333333', 'https://images.unsplash.com/photo-1518770660439-4636190af475', 12, 'Alex K.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', false, '2023-10-15T00:00:00Z'),
(gen_random_uuid(), 'WebAssembly의 미래', '왜 Wasm이 브라우저 밖에서 주목받고 있는지, WASI, 그리고 클라우드 컴퓨팅의 미래에 어떤 의미가 있는지 알아봅니다.', '내용 생략...', '99999999-9999-4999-8999-999999999999', 'https://images.unsplash.com/photo-1627398240449-04f59048ce0c', 7, 'David R.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', false, '2023-10-12T00:00:00Z');
