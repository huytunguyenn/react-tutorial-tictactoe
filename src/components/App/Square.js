import '../../index.css';


/**
 * 1 ô trong bàn cờ
 * @param isWin: check if
 * @param onClick: hàm xử lý sự kiện click vào từng ô
 * @param value: giá trị bên trong 1 ô (X hoặc O)
 * @returns {JSX.Element}
 * @constructor
 */
export default function Square({isWin, onClick, value}) {
    const className = 'square' + (isWin ? ' highlight' : '')
    return (
        <button
            className={className}
            onClick={onClick}
        >
            {value}
        </button>
    );
}