# RestAPI Server 설치 및 실행 매뉴얼 (Windows 10/11)

본 프로젝트는 Node.js + Express + MongoDB를 사용한 학생 정보 관리 REST API 서버입니다.

---

## 1. 시스템 요구사항

- **운영체제**: Windows 10 또는 Windows 11
- **Node.js**: v18.0.0 이상
- **MongoDB**: v6.0 이상

---

## 2. Node.js 설치

### 다운로드 및 설치

1. [https://nodejs.org/](https://nodejs.org/) 접속
2. **LTS** 버전 다운로드 버튼 클릭
3. 다운로드한 `.msi` 파일 실행
4. 설치 마법사에 따라 설치 진행 (기본 설정 사용)

### 설치 확인

명령 프롬프트(cmd)를 열고 다음 명령어 입력:

```cmd
node --version
npm --version
```

버전이 출력되면 설치 완료

---

## 3. MongoDB 설치

### 다운로드 및 설치

1. [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) 접속
2. **Platform**: Windows 선택
3. **Download** 클릭
4. 다운로드한 `.msi` 파일 실행
5. **Complete** 설치 선택
6. **Install MongoDB as a Service** 옵션 체크 (중요!)
7. 설치 완료

### MongoDB 서비스 실행 확인

1. `Windows 키` + `R` → `services.msc` 입력 → Enter
2. 서비스 목록에서 **MongoDB** 찾기
3. 상태가 **실행 중**인지 확인
4. 실행 중이 아니면 우클릭 → **시작** 클릭

---

## 4. 프로젝트 설정

### 4.1 프로젝트 다운로드

1. 프로젝트 ZIP 파일 다운로드
2. 원하는 위치에 압축 해제 (예: `C:\Users\사용자명\Documents\RestAPI-Server`)

### 4.2 의존성 패키지 설치

1. **명령 프롬프트(cmd)** 실행
2. 프로젝트 폴더로 이동:
   ```cmd
   cd C:\Users\사용자명\Documents\RestAPI-Server
   ```
3. 패키지 설치:
   ```cmd
   npm install
   ```

### 4.3 HTML 데이터 파일 준비

1. 제공받은 초기 HTML 파일을 준비
2. `src\html` 폴더에 복사
3. 파일 이름을 **`hongik_dbms_table.html`** 로 변경

**파일 위치:**

```
RestAPI-Server/
└── src/
    └── html/
        └── hongik_dbms_table.html
```

---

## 5. 데이터베이스 초기화

명령 프롬프트에서 다음 명령어 실행:

```cmd
npm run seed
```

**실행 결과:**

```
시드값을 위한 데이터베이스에 연결되었습니다.
XX개의 데이터가 있습니다.
```

---

## 6. 서버 실행

명령 프롬프트에서 다음 명령어 실행:

```cmd
npm start
```

**실행 결과:**

```
Server running at http://localhost:8082
```

서버 종료: `Ctrl` + `C`

---

## 7. API 테스트

### 웹 브라우저에서 테스트

브라우저 주소창에 다음 URL 입력:

#### 학생 학위 조회

```
http://localhost:8082/students/degree?name=홍길동
```

#### 학생 이메일 조회

```
http://localhost:8082/students/email?name=홍길동
```

#### 학위별 학생 수 조회

```
http://localhost:8082/students/stat?degree=PhD
```

**degree 파라미터:**

- `PhD` - 박사 과정
- `Master` - 석사 과정
- `Undergraduate` - 학부생

### Postman으로 테스트 (PUT 요청용)

#### 학생 등록

- Method: `PUT`
- URL: `http://localhost:8082/students/register`
- Body (JSON):
  ```json
  {
    "name": "김철수",
    "email": "kim@example.com",
    "graduation": 2025
  }
  ```

---

## 8. API 엔드포인트 요약

| 메소드 | 엔드포인트           | 파라미터                             | 설명             |
| ------ | -------------------- | ------------------------------------ | ---------------- |
| GET    | `/students/degree`   | `name` (쿼리)                        | 학생 학위 조회   |
| GET    | `/students/email`    | `name` (쿼리)                        | 학생 이메일 조회 |
| GET    | `/students/stat`     | `degree` (쿼리)                      | 학위별 학생 수   |
| PUT    | `/students/register` | `name`, `email`, `graduation` (JSON) | 학생 등록        |

---

**대상 OS:** Windows 10/11
**프로젝트:** RestAPI Server (Node.js + Express + MongoDB)
