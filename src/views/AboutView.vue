<template>
  <div id="dashboard">
    <!-- 상단 로고와 인사말 -->
    <header class="header">
      <div class="logo">
        <span>PNC manager</span>
      </div>
      <div class="greeting">
        <p>안녕하세요!</p>
        <p><strong>X)송도갈매기 본사</strong> 입니다.</p>
        <small>/최신 업데이트 2024.09.13 (금)</small>
      </div>
    </header>

    <!-- 매출 정보 영역 -->
    <div class="sales-info">
      <div class="sales-card">
        <p>일매출</p>
        <h3>0 원</h3>
        <small>전일 / 92,883,310원</small>
        <p class="comparison">전일대비 -92,883,310원</p>
      </div>
      <div class="sales-card">
        <p>주간매출</p>
        <h3>459,623,930 원</h3>
        <small>전주 / 512,733,260원</small>
        <p class="comparison">전주대비 -53,109,330원</p>
      </div>
      <div class="sales-card">
        <p>월매출</p>
        <h3>1,102,386,900 원</h3>
        <small>전월 / 1,145,798,182원</small>
        <p class="comparison">전월대비 -43,411,282원</p>
      </div>
    </div>
    
    <!-- 하단 네비게이션 바
    <nav class="bottom-nav">
      <div class="nav-item active">
        <i class="fas fa-home"></i>
        <p>홈</p>
      </div>
      <div class="nav-item">
        <i class="fas fa-bullhorn"></i>
        <p>공지사항</p>
      </div>
      <div class="nav-item">
        <i class="fas fa-calendar"></i>
        <p>매출조회</p>
      </div>
      <div class="nav-item">
        <i class="fas fa-shopping-cart"></i>
        <p>발주관리</p>
      </div>
    </nav>
     -->
    
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'DashboardPage',  // 컴포넌트 이름을 다단어로 변경
  data() {
    return {
      salesData: null, // 서버에서 받아온 데이터를 저장할 곳
    };
  },
  created() {
    this.fetchSalesData(); // 컴포넌트 생성 시 매출 데이터를 가져오는 함수 호출
  },
  methods: {
    async fetchSalesData() {
      try {
        const response = await axios.get(
          "https://m.pncoffice.com/USP_AppMainSalesReport"
        );
        console.log("매출 데이터:", response.data); // 받아온 데이터를 콘솔에 출력
        this.salesData = response.data; // 서버 응답 데이터를 salesData에 저장
      } catch (error) {
        console.error("매출 데이터를 가져오는 중 오류 발생:", error);
      }
    },
  },
};

</script>

<style scoped>
/* 상단 로고와 인사말 */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

.greeting {
  text-align: center;
}

.sales-info {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.sales-card {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 30%;
}

.sales-card h3 {
  color: #007bff;
  margin: 10px 0;
}

.comparison {
  color: #ff3b30;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #f5f5f5;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.nav-item {
  text-align: center;
}

.nav-item i {
  font-size: 20px;
}

.nav-item p {
  margin-top: 5px;
  font-size: 12px;
}

.active {
  color: #007bff;
}
</style>