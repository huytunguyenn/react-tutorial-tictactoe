import React, {useState} from "react";
import Board from './Board';

let boardSize = 27;
const lines = createWinLine(boardSize);


/**
 * tạo ra mảng tọa độ của cả bàn cờ (phục vụ cho việc hiển thị lịch sử theo dạng (dòng, cột)
 * @param size: kích thước bàn cờ
 * @returns {*[]}
 */
const creatLocation = (size) => {
    const locations = []
    for (let i = 0; i < size ; i++){
        for (let j =0;j<size; j++){
            locations.push([j + 1, i + 1])
        }
    }
    return locations
}


/**
 * setState cho người dùng sort moves theo tăng hay giảm
 * @param setIsDescending: setState
 * @param isDescending: đang sort giảm
 */
const sortMoves = (setIsDescending, isDescending) => {
    setIsDescending(!isDescending)
}


/**
 * nhảy đến 1 bước nào đó trong lịch sử
 * @param setStepNumber: setState
 * @param setXIsNext: kiểm tra bước hiện tại là người chơi nào (X hay 0)
 * @param step: bước hiện tại
 */
const jumpTo = (setStepNumber, setXIsNext, step) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)        // vì step 1 là X, 2 là O, 3 là X, v.v..
}


/**
 * xử lý sự kiện click vào 1 ô
 * @param history: toàn bộ
 * @param setHistory: setState
 * @param stepNumber: bước đi hiện tại
 * @param setStepNumber: setState
 * @param xIsNext: người chơi tiếp theo là ai
 * @param setXIsNext: setState
 * @param i: ô hiện tại
 */
const handleClick = (history, setHistory, stepNumber, setStepNumber, xIsNext, setXIsNext, i) => {
    const locations = creatLocation(boardSize)                      // tạo mảng tọa độ của tất cả các ô bàn cờ
    const currHist = history.slice(0, stepNumber + 1);              // lấy ra lịch sử từ đầu đến bước hiện tại (stepNumber) => để đảm bảo sau khi undo thì các history tương lai ko bị sai
    const current = currHist[currHist.length - 1];                  // hiện tại là cái mới nhất (ptủ cuối của mảng)
    const squares = current.squares.slice();                        // copy squares của state sang object mới => để React so sánh 2 cái mà cập nhật => immuatable

    if (calculateWinner(squares).winner || squares[i]) {            // nếu hết game hoặc đã đc ấn thì ko xử lý nữa
        return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(currHist.concat([{                                   // concat: kết hợp các mỏng lại rồi trả ra mảng đã kết hợp (khác vs push, ko thao tác lên dữ liệu gốc)
        squares: squares,
        location: locations[i]
    }]))
    setStepNumber(currHist.length)
    setXIsNext(!xIsNext)
}



export default function Game () {
    const [history, setHistory] = useState([
        {
            squares: Array(boardSize * boardSize).fill(null)       // mảng đại diện cho cả bàn cờ ở mỗi bước, ô nào đã được đi thì là 'X' hoặc 'O', chưa đi là null
        }
    ])
    const [stepNumber, setStepNumber] = useState(0)         // bước nào đang đc hiển thị
    const [xIsNext, setXIsNext] = useState(true)            // kiểm tra người chơi tiếp theo đi X hay O
    const [isDescending, setIsDescending] = useState(true)  // kiểm tra user sắp xếp thứ tự move theo tăng hay giảm

    const current = history[stepNumber];                 // bàn cờ hiện tại (để truyền vào Board)
    const winInfo = calculateWinner(current.squares);    // để hiển thị winner hay next player
    const winner = winInfo.winner
    const winLine = winInfo.line

    // dùng map(element, index) biến history thành các React element biểu diễn bằng các button trên màn hình
    const moves = history.map((step, move) => {
        const desc = move
            ? `Go to move #${move} - Location (col,row): (${history[move].location[0]}, ${history[move].location[1]})`
            : 'Go to game start';
        const check_curr = move === stepNumber   // dùng để bold bước hiện tại
        return (
            <li key={move}>
                <button onClick={() => jumpTo(setStepNumber, setXIsNext, move)}>
                    { check_curr ? <b> {desc} </b> : desc }
                </button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'The Winner: ' + winner;
    }
    else if (!current.squares.includes(null)) {         // tất cả các ô đều không null mà vẫn chưa vào vòng if(winner) => hòa
        status = 'Result: Draw'
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }


    return (
        <div className="game">
            <div className="game-board" >
                <Board
                    squares={current.squares}        // lịch sử đấu hiện tại (bàn cờ hiện tại để truyền vào Board)
                    onClick={(i) => handleClick(history, setHistory, stepNumber, setStepNumber, xIsNext, setXIsNext, i)}
                    winLine = {winLine}
                    boardSize= {boardSize}
                />
            </div>

            <div className="game-info">
                <div><b>{ status }</b></div>
                <button onClick={ () => sortMoves(setIsDescending, isDescending)}>
                    Sort moves#: {isDescending ? 'descending' : 'ascending ' }
                </button>
                <ol>{
                    isDescending
                        ? moves
                        : moves.splice(0,1).concat(moves.reverse())  // chức năng đảo ngược các moves
                }</ol>
            </div>
        </div>
    );

}


/**
 * tạo ra line thắng (i, j là dòng, cột trong vòng for)
 * các hàm createDiag, createRow, createCol có tác dụng tương tự
 * @param i: dòng
 * @param j: cột
 * @param res: mảng các line thắng (để push vào)
 */
function createAntiDiag(i, j, res){
    let a1,a2,a3,a4,a5
    a1 = boardSize * i + j
    a2 = a1 + boardSize - 1
    a3 = a2 + boardSize - 1
    a4 = a3 + boardSize - 1
    a5 = a4 + boardSize - 1
    res.push([a1, a2, a3, a4, a5])
}
function createDiag(i, j, res){
    let a1,a2,a3,a4,a5
    a1 = i * boardSize + j
    a2 = a1 + boardSize + 1
    a3 = a2 + boardSize + 1
    a4 = a3 + boardSize + 1
    a5 = a4 + boardSize + 1
    res.push([a1, a2, a3, a4, a5])
}
function createRow(row_num, res){
    let start = row_num * boardSize
    let a1,a2,a3,a4,a5
    while(start + 4 < (row_num + 1) * boardSize){
        a1 = start
        a2 = a1 + 1
        a3 = a2 + 1
        a4 = a3 + 1
        a5 = a4 + 1
        res.push([a1, a2, a3, a4, a5])
        start++
    }
}
function createCol(row_num, res){
    let start = row_num
    let a1,a2,a3,a4,a5
    while(start + 4 * boardSize <= row_num + boardSize * (boardSize - 1)){
        a1 = start
        a2 = a1 + boardSize
        a3 = a2 + boardSize
        a4 = a3 + boardSize
        a5 = a4 + boardSize
        res.push([a1, a2, a3, a4, a5])
        start += boardSize
    }
}


/**
 * tạo ra tất cả các win line của bàn cờ
 * @param boardSize: kích cỡ bàn cờ
 * @returns {*[]}
 */
function createWinLine(boardSize){
    let result = []

    for(let i = 0; i < boardSize; i++){
        createRow(i, result)
        createCol(i,result)
    }

    for(let i = 0; i<boardSize; i++){
        for(let j = 0; j<boardSize; j++){
            if(i + 4 < boardSize && j + 4 < boardSize) {
                createDiag(i, j, result)
            }
            if(j - 4 >= 0 && i + 4 < boardSize) {
                createAntiDiag(i, j, result)
            }
        }
    }
    return result
}


/**
 * tính toán người chiến thắng và win line là line nào, nếu chưa ai thắng thì trả ra null
 * @param squares: bàn cờ hiện tại
 * @returns {{winner: null, line: null}}
 */
function calculateWinner(squares) {
    let result = {
        winner: null,
        line: null
    }

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            result.winner = squares[a]
            result.line = lines[i]      // win line mà người chơi đi
        }
    }
    return result
}