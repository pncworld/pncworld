const express = require('express'); // express 프레임워크 객체 생성
const sql = require('mssql');       // mssql 프레임워크 객체 생성
const app = express();              // express의 새 인스턴스 할당

// SQL 접속 설정
const pool = new sql.ConnectionPool({
  user     : 'pnc_srv',             // DB 사용자 이름
  password : '$$Eoflwl^(aktpdy)',   // DB 사용자의 암호
  server   : '222.231.31.115',      // DB 서버 주소, localhost : 로컬호스트
  database : 'PnCInt21_New',        // DB의 데이터베이스 이름
  options  : 
  {
  	encrypt : false,                // DB 서버 주소가 IP일 경우 에러 방지
    trustServerCertificate: true    // 자체 신뢰 서버 인증
  },
});

// 데이터베이스 연결
pool.connect((err) => {
  // 연결이 안될 경우 에러 내용 콘솔에 출력
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  // 연결에 성공할 경우 연결 성공 메시지 콘솔에 출력
  console.log('Connected to database!');
});

// Set up an endpoint to query the database
app.get('/about', (req, res) => {
 
  let sqlQuery = "select strname from mstStore where lngStoreGroup = 3257"

  console.log(sqlQuery)

  pool.request().query(sqlQuery, (err, result) => {
    if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
    }
    res.json(result.recordset);
  });
});  

// express 서버 시작
app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});