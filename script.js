function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (column, row, player) => {
    if (board[row][column].getValue() === "") {
        board[row][column].addToken(player);
    } else {
        return
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard };
}

function Cell() {
  let value = "";

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function GameController(
  playerOneName = "Spiderman",
  playerTwoName = "Punisher"
) {
  const board = Gameboard();

  const WinCombination = [
    [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]], [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]],
    [[0,0], [1,1], [2,2]], [[0,2], [1,1], [2,0]]
  ]

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "0",
    },
  ];

  let winner = false

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const getWinner = () => winner

  const playRound = (column, row) => {
    if (winner) return; 

    board.dropToken(column, row, getActivePlayer().token);

    const checkWin = () => {
        const currentBoard = board.getBoard();
        for (let i = 0; i < WinCombination.length; i++){
            const combo = WinCombination[i];
            const [fil1, col1] = combo[0]
            const [fil2, col2] = combo[1]
            const [fil3, col3] = combo[2]

            const valor1 = currentBoard[fil1][col1].getValue();
            const valor2 = currentBoard[fil2][col2].getValue();
            const valor3 = currentBoard[fil3][col3].getValue();

            if (valor1 !== "" && valor1 === valor2 && valor2 === valor3){
                winner = true;
            } 
        }
    }
    checkWin();

    if (!winner) {
        switchPlayerTurn();
    }
};
  return {
    playRound,
    getWinner,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  let game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const reboot = document.querySelector(".reboot")

  const updateScreen = () => {

    boardDiv.textContent = "";


    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();


    if (game.getWinner()) {
        playerTurnDiv.textContent = `El ganador es: ${activePlayer.name}`;
    } else {
        playerTurnDiv.textContent = `turno de ${activePlayer.name}`;
    }
    


    board.forEach((row, rowIndex) => {
  row.forEach((cell, ColumnIndex) => {
    const cellButton = document.createElement("button");
    cellButton.classList.add("cell");
    cellButton.dataset.row = rowIndex;
    cellButton.dataset.column = ColumnIndex;
    cellButton.textContent = cell.getValue();

    if (game.getWinner()) {
        cellButton.disabled = true; 
    }

    boardDiv.appendChild(cellButton);
  });
});
  };

  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    if (!selectedColumn) return;

    game.playRound(selectedColumn, selectedRow);
    updateScreen();
  }

  function restartHandler() {
    game = GameController(); // 👈 pisa el game viejo con uno nuevo, mismo listener de siempre
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard); // se agrega UNA sola vez, para siempre
  reboot.addEventListener("click", restartHandler); // idem, una sola vez

  updateScreen();

}

ScreenController();
