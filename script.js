function GameBoard() {
    let rows = 3;
    let columns = 3;
    let board = [];

    const createBoard = () => {
        for (let i = 0; i < columns; i++){
            board[i] = []
            for (let j = 0; j < rows; j++){
                board[i].push(Cell())
            }
        }
    }

    const printBoard = () => {
        const arreglo = board.map(row => row.map(cell => cell.getValue()))
        console.log(arreglo)
    }

    return {createBoard, printBoard}
}

function Cell() {
    let value = 0

    const addValue = (token) => {
        value = token
    }

    const getValue =  () => {
        return value
    }

    return {addValue, getValue}
}

const newGame = GameBoard()

console.log("Hola mundo")
newGame.createBoard()
newGame.printBoard()