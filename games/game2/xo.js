    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    const winConditions = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    function handleClick(e) {
      const index = e.target.dataset.index;
      if (board[index] !== "" || !gameActive || currentPlayer !== "X") return;
      makeMove(index, "X");
      if (gameActive) setTimeout(computerMove, 400);
    }

    function makeMove(index, player) {
      board[index] = player;
      cells[index].textContent = player;
      cells[index].classList.add("filled");
      checkWinner();
    }

    function checkWinner() {
      for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
          gameActive = false;
          statusText.textContent =`Player ${board[a]} Wins!`;
          condition.forEach(i => cells[i].classList.add("winning"));
          return;
        }
      }

      if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a Draw!";
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = currentPlayer === "X" ? "Your turn (X)" : "Computer's turn (O)";
    }

    function computerMove() {
      if (!gameActive) return;
      let move = getSmartMove("O") || getSmartMove("X");
      if (move === null) {
        const empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
        move = empty[Math.floor(Math.random() * empty.length)];
      }
      makeMove(move, "O");
    }

    function getSmartMove(player) {
      for (let condition of winConditions) {
        const [a, b, c] = condition;
        const values = [board[a], board[b], board[c]];
        if (values.filter(v => v === player).length === 2 && values.includes("")) {
          return [a, b, c][values.indexOf("")];
        }
      }
      return null;
    }

    function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      statusText.textContent = "Your turn (X)";
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("filled", "winning");
      });
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetBtn.addEventListener("click", resetGame);