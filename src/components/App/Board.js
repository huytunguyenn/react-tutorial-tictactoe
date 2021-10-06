import React from "react";
import Square from './Square'

const boardSize = 27;

export default class Board extends React.Component {
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
