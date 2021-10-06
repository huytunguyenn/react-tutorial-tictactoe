import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/App/Game'

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);




// ========================================
// BTCN01
// 1. Hiển thị vị trí của mỗi bước đi dưới dạng (cột, dòng) trong lịch sử các bước đi.
// 2. In đậm bước hiện tại trong danh sách các bước đi.
// 3. Viết lại Board sử dụng hai vòng lặp để tạo ra Square thay vì hardcode như hiện nay.
// 4. Thêm toogle button cho phép sắp xếp các bước đi theo thứ tự tăng hoặc giảm.
// 5. Khi một người chơi thắng cuộc, highlight ba ô vuông dẫn đến chiến thắng.
// 6. Khi không ai thắng cuộc, hiển thị thông báo kết quả hòa.
// 7. Yêu cầu thêm Task #3: 5 ô liên tiếp là thắng, board sẽ có số lượng ô tùy ý

// nên làm theo thứ tự dễ tới khó: 6 -> 2 -> 3 -> 4 -> 1 -> 5
// SOLUTIONS
// 6. Khi không ai thắng cuộc => kiểm tra nếu ko có ô nào trong bàn cờ null & chưa có người thắng => hòa
// 2. Kiểm tra move == stepnumber thì bold cái description
// 3. Board hình vuông, viết hàm truyền vào số ô cạnh  =>  mỗi Board lập 3 lần tạo rows, mỗi row lặp 3 lần tạo Square
// 4. Tạo thêm button click vào thì gọi hàm reverse để đảo ngược moves thôi (vì ban đầu moves đã sắp xếp theo tăng dần rồi)
// 1. Tạo 1 mảng là location theo (col, row) của 9 ô  => rồi truyền vào location ô đc click vào trong history đề hiển thị
// 5. Trong hàm tính toán winner, thêm vào chỉ trả ra win line lúc thắng  => xong rồi truyền vào Board để highlight bằng css (như vậy chỉ highlight khi win chứ ko highlight lúc chưa win)
// 7. Viết thêm hàm generate toàn bộ possible win line

// BTCN02