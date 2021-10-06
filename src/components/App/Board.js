import Square from './Square'


/**
 * tạo ra 1 ô cờ, nếu ô đó thuộc ô thắng thì đổi màu
 * @param squares: truyền vào squares[i] là nội dung ô đó (X, O hay null)
 * @param onClick: hàm xử lý sự kiện click vào ô đó
 * @param winLine: gồm winner và line thắng mà người đó đi, nếu chưa có ai thắng thì null
 * @param i: thứ tự ô đó
 * @returns {JSX.Element}
 */
const renderSquare = (squares, onClick, winLine, i) => {
    const isWin = winLine && winLine.includes(i)
    return (
        <Square
            value={squares[i]}
            onClick={() => onClick(i)}
            isWin = {isWin}
            key={i}
        />
    );
}


/**
 * tạo ra bàn cờ vs kích thước cho sẵn
 * 3 thuộc tính đầu tiên sử dụng cho hàm renderSquare
 * @param squares:
 * @param onClick:
 * @param winLine:
 * @param size: kích thước bàn cờ
 * @returns {*[]}
 */
const createSquareBoard = (squares, onClick, winLine, size) => {
    let rows = []
    for (let i = 0; i<size; i++){
        let row = []
        for (let j = 0; j<size; j++){
            row.push(renderSquare(squares, onClick, winLine,j + i*size))
        }
        rows.push(<div className="board-row" key={i}>{row}</div>)
    }
    return rows
}


/**
 * tạo ra 1 bàn cờ tại nước đi nào đó
 * @param winLine: bao gồm winner (người nào thắng, X hay O) và mảng tọa độ line thắng
 * @param squares: các ô của bàn cờ
 * @param onClick: sự kiện xử lý nhấn vào 1 ô
 * @param boardSize: kích cỡ bàn cờ
 * @returns {JSX.Element}
 * @constructor
 */
export default function Board ({winLine, squares, onClick, boardSize}) {
    return (
        <div>
            {createSquareBoard(squares, onClick, winLine, boardSize)}
        </div>
    );

}
