# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## BTCN01: REACT TUTORIAL

(1) Hiển thị vị trí của mỗi bước đi dưới dạng (cột, dòng) trong lịch sử các bước đi

(2) In đậm bước hiện tại trong danh sách các bước đi

(3) Viết lại Board sử dụng hai vòng lặp để tạo ra Square thay vì hardcode như hiện nay

(4) Thêm toogle button cho phép sắp xếp các bước đi theo thứ tự tăng hoặc giảm

(5) Khi một người chơi thắng cuộc, highlight ba ô vuông dẫn đến chiến thắng

(6) Khi không ai thắng cuộc, hiển thị thông báo kết quả hòa

(7) Yêu cầu thêm Task #3 và #5: 5 ô liên tiếp là thắng, board sẽ có số lượng ô tùy ý

### _Solutions_

_nên làm theo thứ tự dễ tới khó: 6 -> 2 -> 3 -> 4 -> 1 -> 5 -> 7_

(6) Khi không ai thắng cuộc => kiểm tra nếu ko có ô nào trong bàn cờ null & chưa có người thắng => hòa

(2) Kiểm tra move == stepnumber thì bold cái description

(3) Board hình vuông, viết hàm truyền vào số ô cạnh  =>  mỗi Board lập 3 lần tạo rows, mỗi row lặp 3 lần tạo Square

(4) Tạo thêm button click vào thì gọi hàm reverse để đảo ngược moves thôi (vì ban đầu moves đã sắp xếp theo tăng dần rồi)

(1) Tạo 1 mảng là location theo (col, row) của 9 ô  => rồi truyền vào location ô đc click vào trong history đề hiển thị

(5) Trong hàm tính toán winner, thêm vào chỉ trả ra win line lúc thắng  => xong rồi truyền vào Board để highlight bằng css (như vậy chỉ highlight khi win chứ ko highlight lúc chưa win)

(7) Viết thêm hàm generate toàn bộ possible win line


## BTCN02: REFACTOR

(1) Cho phép người dùng cấu hình kích thước bàn chơi 

(2) Chuyển thành luật năm ô liên tiếp thì thắng

(3) Tổ chức thư mục và tách mỗi component thành từng tập tin riêng biệt

(4) Sử dụng toàn bộ function component


