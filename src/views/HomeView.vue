<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input
          type="text"
          v-model="username"
          placeholder="아이디"
          required
          class="input-field"
        />
      </div>
      <div class="form-group password-container">
        <input
          type="password"
          v-model="password"
          placeholder="비밀번호"
          required
          class="input-field"
        />
      </div>
      <button type="submit" class="login-button">로그인</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"; // axios import

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    async handleLogin() {
      // 로그인 요청 데이터
      const requestData = {
        // 서버가 요구하는 파라미터명에 맞게 조정
        P_USERID   : this.username, 
        P_PASSWORD : this.password
      };

      try {
        // HTTP POST 요청
        const response = await axios.post(
          "https://m.pncoffice.com/USP_AppLoginForIOS",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // 응답 성공 시 처리
        const responseData = response.data.recordsets[0];
        const statusCode = responseData[0].STATUS_CD;

          if (statusCode === "0000") {
              // 로그인 성공
              console.log("로그인 성공:", responseData);
              // alert("로그인 성공");
              // 로그인 성공 시 처리할 로직 추가
              this.$router.push('/about'); // 대시보드 페이지로 이동
          } else if (statusCode === "1002") {
              // 로그인 실패
              console.log("로그인 실패:", responseData);
              alert("로그인 실패");
              //alert("로그인 실패" + JSON.stringify(responseData, null, 2));
          } else {
              // 다른 상태 코드 처리 (필요에 따라 추가)
              console.log("알 수 없는 상태 코드:", responseData);
              alert("로그인 실패");
          }
      } catch (error) {
          // 오류 처리
          console.error("로그인 요청 실패:", error);
          alert("로그인 요청에 실패했습니다.");
      }
    },
  },
};
</script>

<style scoped>
/* 스타일은 이전과 동일 */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5faff;
}

.logo {
  margin-bottom: 20px;
  width: 150px;
}

.form-group {
  margin-bottom: 15px;
  position: relative;
  width: 100%;
  max-width: 320px;
}

.input-field {
  width: 100%;
  padding: 15px;
  border: 1px solid #d9e1ec;
  border-radius: 5px;
  background-color: #f5faff;
  font-size: 16px;
}

.password-container {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.login-button {
  width: 114%;
  max-width: 320px;
  background-color: #4a9eff;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #3a8bdd;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.checkbox-container input {
  margin-right: 10px;
}

.checkbox-container label {
  color: #888;
  font-size: 14px;
}
</style>
