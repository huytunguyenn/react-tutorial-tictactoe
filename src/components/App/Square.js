import '../../index.css';


/**
 * hàm nhậ
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Square(props) {
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