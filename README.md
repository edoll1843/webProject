# 전공서적 쇼핑몰
1. 개발 환경에 대한 기술

 이번에 쇼핑몰을 구현하면서 사용한 기술은 node.js, MySQL, CSS, HTML, JavaScript, Bootstrap, Express로 총 7가지라 할 수 있다.
 
먼저 웹 페이지 디자인에는 HTML, CSS, JavaScript, Bootstrap을 사용하였다. 미리 준비한 CSS, Bootstrap 템플릿을 개발 디렉토리에 등록하고 HTML코드에 연결하여 해당 클래스가 필요할때마다 호출하는 방식으로 디자인했다. 정적 디자인이 아닌 함수나 반복문 같은 동적인 디자인이 필요할땐 웹 개발 환경이 node.js인 만큼 JavaScript를 활용했다. 

 이렇게 디자인한 프론트엔드 디자인 페이지를 Express 프레임워크를 이용하여 node.js와 연결하였다. Express가 미들웨어 컴포넌트 역할을 해주어서 ejs파일과 결합되도록 구현하였다. 
 
Node.js는 웹 서버의 백엔드 개발에 사용되었다. 로그인, 홈, 상품 조회, 판매 등등의 버튼을 클릭할 시 다른 페이지를 라우팅 해주고 MySQL 데이터베이스에 등록되어있는 DB 테이블을 연동하여 웹에 적용하고 HTML, CSS, JavaScript, Bootstrap을 사용하여 구현한 프론트엔드 웹 페이지 디자인을 웹에 연결하여 출력시켜주는 매개체 역할을 하였다. 백엔드 개발이지만 사실상 프론트엔드와 백엔드를 연결시켜주는 역할을 한 것 같다

2. 구현 과정 및 기능

2-1) 로그인, 회원가입

![KakaoTalk_20200916_191430381](https://user-images.githubusercontent.com/45708825/93431341-ff7d3a00-f8fe-11ea-9345-2349b9edcb67.png)
 
홈페이지 우측 상단의 Sign in을 클릭하면 로그인 화면이 나온다. 회원이 아닐경우 우측하단의 ‘회원이 아니신가요?’를 클릭하면 회원가입 페이지로 넘어간다.

![KakaoTalk_20200916_191448444](https://user-images.githubusercontent.com/45708825/93431345-00ae6700-f8ff-11ea-818d-edcb848e780b.png)
 
회원가입 페이지다. 데이터베이스에 등록될 7가지 속성인 id, name, passwd, tel, major address,
grade를 입력하면 데이터베이스에 해당 정보들이 등록된다. 
 
 ![KakaoTalk_20200916_191456229](https://user-images.githubusercontent.com/45708825/93431347-0146fd80-f8ff-11ea-93fa-0fd378f789a6.png)
 
JOIN버튼을 클릭한 결과 DB에 회원 1명이 추가되었다.
 
 ![KakaoTalk_20200916_191508186](https://user-images.githubusercontent.com/45708825/93431350-01df9400-f8ff-11ea-94bf-662566b2c505.png)
 
회원가입을 완료한 뒤 아이디와 비밀번호를 입력하고 LOGIN을 클릭하였다.
 
 ![KakaoTalk_20200916_191512137](https://user-images.githubusercontent.com/45708825/93431351-02782a80-f8ff-11ea-9807-dbaa302237ac.png)
 
로그인에 성공하였고 우측 상단에 입력한 아이디로 로그인하였음을 알려주는 환영 메시지도 출력된다.

우선 회원가입 기능은 2차 프로젝트에서 구현한 게시판의 쓰기 기능을 변형하여 구현하였다. 쓰기는 board 데이터베이스에 테이블을 추가하는 기능이고 회원가입은 User 데이터베이스에 테이블을 추가하는 기능으로 서로 유사하다고 판단했기 때문이다. routes폴더의 해당 js파일에서 호출되는 함수가 mysql과 getConnection()함수로 연결한 후 ejs파일에서 javaScript로 입력받은 정보들을 MySQL에 INSERT 메시지를 전달하여 DB에 등록한다.

로그인은 로그인 화면에서 입력한 ID와 PassWord를 DB에 등록되어있는 ID, Passwd와 비교하여 모두 일치시 로그인에 성공하도록 하는 함수를 구현하였다. 호출하는 함수는 use방식이고 DB의 정보를 불러올땐 body-parser를 이용한다. Bodyparser로 호출한 id와 passwd를 기반으로 SELECT 명령 SQL message를 전달하여 if else 비교 조건문을 시행한다. 아이디와 패스워드가 일치시에 해당 User_id DB로 로그인을 허락한다.

2-2~3) 회원정보 조회 및 관리(관리자, 구매자, 판매자), 회원 추방(추가기능1)

![KakaoTalk_20200916_191518408](https://user-images.githubusercontent.com/45708825/93431353-0310c100-f8ff-11ea-80c3-e37d7e92f1cb.png)

우선 관리자의 회원정보 조회다. 상단의 Manager를 클릭하면 Manager 로그인 화면이 아래와 같이 나온다.

![KakaoTalk_20200916_191532970](https://user-images.githubusercontent.com/45708825/93431357-03a95780-f8ff-11ea-9508-f0603d4a507c.png)

관리자의 아이디와 비밀번호로 로그인을 성공하면 아래와 같이 관리자의 회원정보 관리 페이지로 이동된다. 


![KakaoTalk_20200916_191538200](https://user-images.githubusercontent.com/45708825/93431360-0441ee00-f8ff-11ea-8adc-cea53ed0520e.png)



 
관리자 회원정보 관리 페이지에선 MySQL에 등록된 회원들의 정보가 모두 차례대로 출력된다. 위에서 회원가입한 회원의 정보가 출력되며 회원정보 삭제를 클릭하면 해당 테이블을 DB에서 삭제하는 Delete 기능까지 구현했다.
 
![KakaoTalk_20200916_191544410](https://user-images.githubusercontent.com/45708825/93431363-04da8480-f8ff-11ea-93a7-9928126baec5.png)


![KakaoTalk_20200916_191547858](https://user-images.githubusercontent.com/45708825/93431365-04da8480-f8ff-11ea-8349-a6fe868a7834.png)

회원정보 삭제를 클릭한 후 회원이 삭제된 모습이다.

![KakaoTalk_20200916_191550977](https://user-images.githubusercontent.com/45708825/93431367-05731b00-f8ff-11ea-8e2c-a8c38e6d92b8.png)

위 사진은 구매자, 판매자로 로그인한 경우의 회원정보 조회다. 페이지 우측 상단의 종 모양을 클릭하면 자신의 회원정보를 웹 페이지를 통해 확인할 수 있다.

위 기능들을 구현하면서 참고했던 기술은 게시판 글 조회, 삭제 기능이였다. 데이터베이스에 등록된 회원들의 정보, 본인의 회원정보를 웹에 표로 출력하는 기능이 거의 일치하기 때문이다. get방식으로 라우터함수를 호출한 후 user메소드를 이용하여 DB에 등록된 속성들을 불러왔다. 회원들은 회원마다 회원가입을 한 순서대로 고유한 번호인 user_id를 가지는데 user_id에 매칭되는 테이블 정보를 웹에 출력하는 방식이다. 관리자 모드에선 모든 user_id를 출력하고 구매자, 판매자의 경우는 본인의 정보만 출력한다.

회원정보 삭제는 post방식의 delete 함수를 짜서 구현하였다. 회원정보 삭제 버튼을 클릭하면 delete 함수를 post방식으로 호출하여 body-parser로 user_id를 불러온다. Sql message에 user_id와 DELETE명령을 입력하여 sql에 getConnection()함수를 이용하여 전달해서 해당 테이블을 삭제시킨다. 삭제가 완료되면 관리자 회원정보 조회 페이지로 redirect하여 삭제 결과를 바로 확인하도록 구현하였다.

2-4) 상품 추가/수정/삭제 (판매자)

![KakaoTalk_20200916_191555435](https://user-images.githubusercontent.com/45708825/93431368-060bb180-f8ff-11ea-89c3-a25e844dfaca.png)

상품 추가를 하고싶으면 Shop 메뉴중 upload product를 클릭하면 판매상품 등록 페이지로 이동된다. 

![KakaoTalk_20200916_191558819](https://user-images.githubusercontent.com/45708825/93431370-06a44800-f8ff-11ea-8df5-634a16d5ae12.png)

데이터베이스에 있는 i_book테이블에 들어갈 속성 정보들을 입력하는 페이지다. 이미지 업로드 기능까지 구현하여 서적의 대표사진을 선택하여 글을 등록할 수 있다.

판매글 올리기 버튼을 클릭한 뒤 데이터베이스를 확인해보면 아래와같이 i_book테이블이 하나 추가된 모습을 확인할 수 있다.

![KakaoTalk_20200916_191602322](https://user-images.githubusercontent.com/45708825/93431373-073cde80-f8ff-11ea-8284-f23900236687.png)

 
그리고 나서 상품 조회 페이지에 들어가면 아래와 같이 상품이 등록된 모습을 확인할 수 있다.

![KakaoTalk_20200916_191605262](https://user-images.githubusercontent.com/45708825/93431374-07d57500-f8ff-11ea-8471-99636c5b31ec.png) 

 상품 조회 페이지에서 푸른색으로 써있는 책 제목을 클릭하면 아래와 같이 책의 정보가 출력되며 판매상품 수정 및 삭제, 구매가 가능한 버튼이 준비되어있다.
 
![KakaoTalk_20200916_191609843](https://user-images.githubusercontent.com/45708825/93431376-07d57500-f8ff-11ea-977d-b6691ba389fa.png)
 
글 수정을 클릭하면 Book 테이블의 속성내용을 수정하는 페이지가 나타난다.

![KakaoTalk_20200916_191613606](https://user-images.githubusercontent.com/45708825/93431378-086e0b80-f8ff-11ea-9d3f-a7d9613686ba.png)
 
위와 같이 수정한 결과사진은 아래와 같다.
 
![KakaoTalk_20200916_191617707](https://user-images.githubusercontent.com/45708825/93431380-0906a200-f8ff-11ea-87d1-2be40908d2c9.png)

![KakaoTalk_20200916_191622838](https://user-images.githubusercontent.com/45708825/93431381-0906a200-f8ff-11ea-98f6-c75ea04e1160.png)

데이터베이스의 테이블도 변경되었다. 

삭제 버튼을 클릭하면 해당 판매상품이 DB에서 삭제된다. 아래의 사진은 삭제 후의 웹 페이지 결과 화면이다.

![KakaoTalk_20200916_191625480](https://user-images.githubusercontent.com/45708825/93431382-099f3880-f8ff-11ea-9d24-4c43e07a7ee3.png)


![KakaoTalk_20200916_191634101](https://user-images.githubusercontent.com/45708825/93431384-0a37cf00-f8ff-11ea-8768-837286faf2aa.png)

DB의 Book 테이블도 삭제되었다.

판매자 상품 추가 기능은 게시판 글 쓰기, 상품 수정은 글 수정, 상품 삭제는 역시 글 삭제 기능과 비슷하게 구현하였다.
회원가입 기능이 데이터베이스에 User 테이블에 속성을 입력 받아 추가하는 방식이었다면 판매자 상품 추가는 새로운 Book 테이블을 등록하는 방식이다.
판매자 상품 수정은 get방식으로 수정 정보를 입력받는 페이지를 연결시켜주는 함수를 호출하여 진행한다. 상품인 책마다 할당되는 고유 책 번호인 Book_id 속성을 qeury를 통해 받아들여서 해당 테이블을 MySQL에 Select 문을 메시지로 전달하여 입력받은 book의 속성들로 테이블을 수정한다.

삭제는 회원정보 삭제와 매우 흡사한 방식으로 구현하였다. 차이점은 회원정보 삭제는 user 테이블을 삭제하고 판매 상품 삭제는 Book 테이블을 삭제시킨다




2-5) 상품 조회 / 후기

홈페이지 우측상단의 Shop을 클릭하거나 Shop의 메뉴중 Product page를 클릭하면 현재 상픔등록된 책들을 조회할 수 있는 페이지가 준비돼있다.
아래의 사진은 판매자 상품 등록을 2차례 진행한 후 상품조회 페이지로 결과를 확인한 사진이다.

![KakaoTalk_20200916_191638230](https://user-images.githubusercontent.com/45708825/93431387-0ad06580-f8ff-11ea-8114-f396643fce26.png)

푸른색으로 표시된 책 제목을 클릭하면 데이터베이스에 등록된 Book 테이블의 정보를 상세히 확할 수 있는 페이지로 연결시켜준다.

![KakaoTalk_20200916_191641859](https://user-images.githubusercontent.com/45708825/93431389-0b68fc00-f8ff-11ea-8f45-55d4d1d41480.png) 

 
구매자는 상품에 대한 리뷰도 작성할 수 있다. 상단의 About내의 메뉴에서 Write Review를 클릭하면 Review를 작성할 수 있는 페이지로 이동한다.

![KakaoTalk_20200916_191645938](https://user-images.githubusercontent.com/45708825/93431390-0b68fc00-f8ff-11ea-81c8-8d15c531b1f3.png)



![KakaoTalk_20200916_191650020](https://user-images.githubusercontent.com/45708825/93431391-0c019280-f8ff-11ea-883d-4696d25af00a.png)

 
Review 작성페이지에서 내용을 입력하고 리뷰 올리기 버튼을 클릭하면 데이터베이스의 review 테이블에 속성들이 등록된다. review작성을 마치고 구매자들의 Review를 확인하고 싶으면 About 메뉴의 Review를 클릭하면 Review들을 확인할 수 있는 페이지에 연결시켜준다.

![KakaoTalk_20200916_191653328](https://user-images.githubusercontent.com/45708825/93431393-0d32bf80-f8ff-11ea-957a-24c1aff83cd2.png)
 
상품 조회 기능은 데이터베이스에 등록된 Book Table을 모두 웹에 출력해주는 방식이다. get방식으로 라우터함수를 호출하여 /product_page로 연결시켜주고 user메서드로 DB에 등록된 Book Table을 모두 받아와 javaScript 코드로 구현한 표로 출력시킨다.
Review 작성은 게시판 글 쓰기와 마찬가지로 mySQL에 INSERT 메시지를 전달하여 Review 테이블을 추가하는 방식이다. Review 확인 역시 DB에 등록된 Review 테이블을 모두 웹에 출력해주는 방식이다.






2-6) 상품 구매 / 구매내역확인 / 주문 취소, 교환, 반품(추가기능2)

상품 조회를 하다가 구매를 원하면 구매하기 버튼을 클릭하여 상품 구매가 완료된다.
 
![KakaoTalk_20200916_191656914](https://user-images.githubusercontent.com/45708825/93431395-0d32bf80-f8ff-11ea-9bc0-ff4c75df8f94.png)

구매하기 버튼을 클릭한 뒤 구매가 완료되면 자동으로 구매내역확인 페이지로 연결시켜준다. 구매내역 확인 페이지에서는 주문한 책의 주문번호, 주문시간, 주소, 가격등의 주문정보를 확인할 수 있으며 책 주문을 취소하거나 반품, 교환을 요청할 수 있는 버튼으로 주문상태를 변경할 수 있다.
 
![KakaoTalk_20200916_191701069](https://user-images.githubusercontent.com/45708825/93431398-0dcb5600-f8ff-11ea-820c-71ff0cf8c005.png) 
 
취소를 누르면 바로 Database의 order 테이블이 삭제되며 책 주문이 취소된다. 반품 혹은 교환을 클릭하면 책 주문상태를 취소시킨 후 다시 책 구매페이지로 redirect 시켜주어 다시 상품을 구매할 수 있도록 해준다.

![KakaoTalk_20200916_191704285](https://user-images.githubusercontent.com/45708825/93431401-0e63ec80-f8ff-11ea-953c-e16d9306db17.png) 

![KakaoTalk_20200916_191708411](https://user-images.githubusercontent.com/45708825/93431402-0efc8300-f8ff-11ea-8db6-61ec0d86cd32.png)

위 두 사진은 구매물품 취소를 클릭했을 경우의 결과사진이다. 주문내역 조회 페이지의 리스트가 삭제되었으며 데이터베이스의 order테이블도 지워진 모습이다.

상품 구매의 경우는 해당 책의 데이터베이스 Book 테이블의 속성을 읽어와 필요한 속성을 주문정보 데이터베이스 테이블인 order 테이블에 추가하여 새로운 주문내역인 order 테이블을 추가하는 방식으로 구현하였다.

라우터함수는 post방식으로 호출하여 buy 기능을 실행하도록 하였고 body-parser를 이용해 book 테이블의 속성을 읽어왔다. 읽어온 속성을 order 테이블에 INSERT MySQL 메시지를 전달하여 추가하였다.

구매내역확인은 이렇게 추가된 order 테이블들을 get방식의 함수를 호출하여 user메서드를 이용해 속성을 불러와 모두 웹에 출력하는 방식이다.
추가기능인 주문내역 취소, 반품, 교환은 Order 테이블을 DB에서 삭제하고 수정하는 방식으로 구현하였다.

2-7) 전공별 전공서적 분류(추가기능 3)

![KakaoTalk_20200916_191724624](https://user-images.githubusercontent.com/45708825/93431403-0f951980-f8ff-11ea-900a-9b5d35acbc80.png)
 
Book 테이블의 속성으로 들어가있는 Major를 기준으로 상품을 분류해주는 기능이다. ALL 버튼은 Default로 모든 상품을 보여준다. 그리고 나머지 전공의 버튼을 누르면 해당 전공의 서적만 출력해준다.

![KakaoTalk_20200916_191732620](https://user-images.githubusercontent.com/45708825/93431409-102db000-f8ff-11ea-9a70-a4b6c55e9bbc.png).  
 
컴공을 클릭한 사진이다. Major가 컴퓨터공학인 서적만 출력됐다.

![KakaoTalk_20200916_191738359](https://user-images.githubusercontent.com/45708825/93431413-10c64680-f8ff-11ea-850a-01996aff5ef2.png)
 
소프트를 클릭한 결과사진이다.

2-8 쇼핑카트 (추가기능4)

좌측 상단의 Shop 메뉴에서  Shopping Cart를 클릭하면 장바구니 관리 페이지로 이동할 수 있다.
 
![KakaoTalk_20200916_191742097](https://user-images.githubusercontent.com/45708825/93431419-11f77380-f8ff-11ea-9794-3edfbc072322.png)

 ![KakaoTalk_20200916_191745229](https://user-images.githubusercontent.com/45708825/93431423-12900a00-f8ff-11ea-8c1c-489cc7ca9192.png)
 
Cart에서 주소와 이름을 입력하면 order 테이블에 들어갈 주소와 id의 준비가 완료된다. 중앙 하단의 place order 버튼을 클릭하면 장바구니에 추가가 완료되고 continue shopping 버튼을 클릭하면 구매페이지로 이동되며 쇼핑을 계속할 수 있게 된다. 

3. UML 시퀀스 다이어그램

![KakaoTalk_20200916_191749773](https://user-images.githubusercontent.com/45708825/93431425-13c13700-f8ff-11ea-9c21-501f8fcd759c.png)

4. 팀원별 역할
이정호(100%) : 회원가입, 로그인(관리자 구매자 판매자), 회원정보조회(구매자, 판매자), 상품 추가/ 수정/ 삭제(판매자), 구매자 상품 후기

김광호(100%) : 회원관리, 추방 (관리자), 상품 조회, 구매, 구매내역확인, 주문 취소, 교환, 반품,
