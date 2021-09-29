import React from 'react';  // nên xài, gần giống const React = require('react')
import ReactDOM from 'react-dom';
import './index.css';

const boardSize = 27;    // boardSize phải >= 5 (vì yêu cầu  5 ô là thắng)
const lines = createWinLine()

function Square(props) {  // ko chứa state, chỉ render => function component (ko có this)
    const className = 'square' + (props.isWin ? ' highlight' : '')
    return (
        <button
            className={className}
            onClick={props.onClick}  // ở đây sẽ gọi hàm onClick đc Board truyền thông qua props => Square ko cần làm gì cả, để cho thằng cha làm (có thể là Board hoặc Game gì đó ko cần biết)
        >
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    renderSquare(i) {
        const isWin = this.props.winLine && this.props.winLine.includes(i)      // check ở bước i có win chưa để highlight
        return (
            <Square
            value={this.props.squares[i]}         // 2 giá trị đc truyền xuống Square, giá trị i và hàm onClick
            onClick={() => this.props.onClick(i)} // khi onClick (của Square) kích hoạt thì hàm handleClick (của Game) đc gọi
            isWin = {isWin}
            key={i}
            />
        );
    }

    createSquareBoard(size){
        let rows = []
        for (let i = 0; i<size; i++){
            let row = []
            for (let j = 0; j<size; j++){
                row.push(this.renderSquare(j + i*size))
            }
            rows.push(<div className="board-row" key={i}>{row}</div>)
        }
        return rows
    }

    render() {
        return (
            <div>
                {this.createSquareBoard(boardSize)          /* SOLUTION TO TASK #3 */
                }
            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(boardSize * boardSize).fill(null)       // mảng gồm các squares cho mỗi bước
                }
            ],
            stepNumber: 0,      // bước nào đang đc hiển thị
            xIsNext: true,      // kiểm tra người chơi tiếp theo đi X hay O
            isDescending: true, // kiểm tra xem user có muốn sắp xếp thứ tự bước
        };
    }

    creatLocation(size){
        const locations = []
        for (let i = 0; i < size ; i++){
            for (let j =0;j<size; j++){
                locations.push([j + 1, i + 1])
            }
        }
        return locations
    }

    handleClick(i) {
        const locations = this.creatLocation(boardSize)     /* SOLUTION TO TASK #1: tạo ra tọa độ của 9 ô rồi truyền ô tương ứng với i (ô i là ô đc click) */

        const history = this.state.history.slice(0, this.state.stepNumber + 1);     // lấy ra lịch sử từ đầu đến stepnumber hiện tại => đảm bảo sau khi undo thì các history tương lai ko bị sai
        const current = history[history.length - 1];    // hiện tại là cái mới nhất
        const squares = current.squares.slice();        // copy squares của state sang object mới => để React so sánh 2 cái mà cập nhật => immuatable
        if (calculateWinner(squares).winner || squares[i]) {   // nếu hết game hoặc đã đc ấn thì ko xử lý nữa
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';    // const nhưng vẫn thay đổi đc vì giá trị tham chiếu object
        this.setState({                           // sau khi thay đổi thì truyền vô setState để thông báo React
            history: history.concat([{                  // concat: kết hợp các mỏng lại rồi trả ra mảng đã kết hợp (khác vs push, ko thao tác lên dữ liệu gốc)
                squares: squares,
                location: locations[i]
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,                          // để hiển thị jumpback to bước nào
            xIsNext: (step % 2) === 0,                 // vì step 1 là X, 2 là O, 3 là X, v.v..
        });
    }

    sortMoves(){
        this.setState({
            isDescending: !this.state.isDescending
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];     // bàn cờ hiện tại (để truyền vào Board)

        const winInfo = calculateWinner(current.squares);    // để hiển thị winner hay next player
        const winner = winInfo.winner
        const winLine = winInfo.line

        const moves = history.map((step, move) => {   // dùng map(element, index) biến history thành các React element biểu diễn bằng các button trên màn hình
            const desc = move
                ? `Go to move #${move} - Location (col,row): (${history[move].location[0]}, ${history[move].location[1]})`
                : 'Go to game start';
            const check_curr = move === this.state.stepNumber   /* SOLUTION TO TASK #2: kiểm tra nếu move = step hiện tại thì bold cái desc */
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        { check_curr ? <b> {desc} </b> : desc }
                    </button>
                </li>
            );
        });


        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else if (!current.squares.includes(null)) {   /* SOLUTION TO TASK #6: tất cả các ô đều không null mà vẫn chưa vào vòng if winner => hòa */
            status = 'Result: Draw'
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="game">
                <div className="game-board" >
                    <Board
                        squares={current.squares}               // truyền vào Board lịch sử đấu hiện tại
                        onClick={(i) => this.handleClick(i)}    // hàm onClick để Square xử lý
                        winLine = {winLine}                     // SOLUTION TO TASK #5
                    />
                </div>

                <div className="game-info">
                    <div><b>{ status }</b></div>
                    <button onClick={ () => this.sortMoves()}>
                        Sort moves#: {this.state.isDescending ? 'descending' : 'ascending ' }
                    </button>
                    <ol>{
                        this.state.isDescending
                            ? moves
                            : moves.splice(0,1).concat(moves.reverse())  // SOLUTION TO TASK #4
                    }</ol>
                </div>
            </div>
        );
    }
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

// ========================================


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

function createWinLine(){
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


function calculateWinner(squares, winSquares) {
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


// ========================================

// EXTRA TASKS
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