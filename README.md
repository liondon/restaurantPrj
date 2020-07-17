# Web App: My Favorite Restaurants

an Web app building with Node.js/Express, showing my favorite restaurants. 

## Features
- 使用者可以註冊帳號
- 使用者也可以透過 Facebook Login 直接登入
- 登入後，使用者可以建立並管理專屬他的一個餐廳清單
    - 使用者可以新增一家餐廳
    - 使用者可以修改一家餐廳的資訊
    - 使用者可以刪除一家餐廳
- 使用者可以在首頁看到所有餐廳與它們的簡單資料(餐廳名稱等)
- 使用者可以再點進去看餐廳的詳細資訊 (地址, 電話, 描述等)
- 使用者可以透過搜尋餐廳名稱來找到特定的餐廳

## Prerequisites

 - Node.js (npm)

## Getting Started

1. clone the project to your local machine:  
    `git clone https://github.com/liondon/restaurantPrj`  
   (Or simply download its .zip file and extract it)  
2. go into the project folder: `cd restaurantPrj`
3. run `npm install` under the project folder to install necessary packages for the app
4. run `node app.js` to start running the app
5. open the link: `http://localhost:3000` with your browser, then you can use the web app
6. press `ctrl + c` to stop running the app
7. run `npm run seed` to generate seed data.


## Seed data
1. user1
- email: user1@example.com
- password: 12345678
- got a list with restaurant #1, #2, #3

2. user2
- email: user2@example.com
- password: 12345678
- got a list with restaurant #4, #5, #6

## Acknowledgments
This is an assignment from AlphaCamp.
