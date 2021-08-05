# 자란다 중간 제출 (8/4)

[🔗 7ill Resource 미팅 로그](https://bohyunkang.notion.site/7ill-Resource-2f8ec63f3a9048418eaa18269cc9bfb8)

## 현재까지 구현된 기능

[🔗 피그마 UI 디자인 시안](https://www.figma.com/file/BV3d2knhk0j275H0kLQnRs/%EC%9E%90%EB%9E%80%EB%8B%A4-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-UI-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=0%3A1)

![1](https://user-images.githubusercontent.com/65386533/128053217-7c095bfd-5cfb-4042-ad8b-69c78cfda60b.png)
![2](https://user-images.githubusercontent.com/65386533/128053224-f2ca802a-dd26-4d9b-8fd2-44f7423db479.png)
![3](https://user-images.githubusercontent.com/65386533/128053227-8ea0bf19-7717-4e85-a23d-ed7fd10200e5.png)

## 기능 분담

### 강보현, 박현정, 이다은

**[마크업, 스타일링]**

- [x] 로그인 페이지
- [x] 회원가입 페이지
- [x] 공통 컴포넌트
  - [x] header
  - [x] navbar
  - [x] input (radio, text)
  - [x] button
  - [x] modal

**[기능 구현]**

- [ ] 유효성 검사 (로그인/회원가입 페이지)
- [ ] `localStorage` 연동 (로그인/회원가입 페이지)
- [ ] 패스워드 해시 암호화 처리
- [ ] 모달 팝업 기능 구현
  - [ ] 다음 주소 API 연동
  - [ ] 신용카드

### 김남주, 박현찬, 조성상

**[마크업, 스타일링]**

- [x] 검색창, 유저 데이터 테이블, 필터
- [ ] 유저 데이터 테이블 스타일링

**[기능 구현]**

- [x] 검색어유무에 따른 유저 데이터 검색기능
- [x] 필터조건에 따른 유저 데이터 검색기능
- [x] 검색어 & 필터 조합에 따른 유저 데이터 검색기능
- [ ] 테스트 케이스 진행 중 [#7](https://github.com/SeongsangCHO/wanted-preonboarding-subject-3/issues/7)
      :모든 권한 클릭 해지 시, 전체 클릭 true (4 번조건에서 연결),에러: Email 검색조건
- [ ] 페이지네이션
- [ ] 계정 생성 연동
- [ ] 권한 수정
- [ ] `localStorage` 데이터 연동 (로그인/회원가입 페이지)

### 김민기, 한우빈

**[기능 구현]**

- [x] 유저 로그인 여부 판단 후 권한 부여
- [x] 계정 별 접근 제한 기능 구현
- [x] 접근 제한시 리다이렉트 기능 구현
- [x] 라우팅 상수 util 함수 작성
- [x] `localStorage` util 함수 작성
