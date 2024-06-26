"use strict";

function Player (sign) {
    this.sign = sign;
    
    const getSign = () => {
        return this.sign;
    }

    return { getSign }
}

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""]

    const setField = (sign, index) => {
        if (index > board.length) return 
        board[index] = sign
    }

    const getField = (index) => {
        if (index > board.length) return 
        return board[index]
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = ""
        }
    }

    return { setField, getField, reset, board }
})()

const gameController = (() => {
    const playerX = new Player("X")
    const playerO = new Player("O")
    let round = 1
    let isOver = false

    const playRound = (index) => {
        if (index > 8) return

        if (gameBoard.board[index] !== '') return

        gameBoard.setField(getCurrentPlayerSign(), index)

        if (checkWinner()) {
            displayController.resultMessage(getCurrentPlayerSign())
            isOver = true;
            return
        }

        if (round === 9) {
            displayController.resultMessage("Draw")
            isOver = true
            return
        }

        round++
        displayController.changeMessage(`Player ${getCurrentPlayerSign()}'s turn`)
    }

    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (const condition of winConditions) {
            let [a, b, c] = condition

            if (gameBoard.board[a] && gameBoard.board[a] == gameBoard.board[b] && gameBoard.board[a] == gameBoard.board[c]) {
                return [a, b, c];       
            }
        }
        return;
    }

    const getCurrentPlayerSign = () => {
        if (round % 2 === 1) {
            return playerX.getSign()
        }
        return playerO.getSign()
    }
    
    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1
        isOver = false
    }

    return { playRound, getIsOver, reset }
})()

const displayController = (() => {
    const messageDiv = document.querySelector('.message')
    const fieldElements = document.querySelectorAll('.field')
    const resetBtn = document.querySelector('.restart-btn')

    fieldElements.forEach((field) => field.addEventListener('click', (e) => {
        if (gameController.getIsOver() || e.target.textContent !== '') return
        gameController.playRound(e.target.dataset.index)
        updateGameboard()
    }))

    resetBtn.addEventListener('click', () => {
        gameBoard.reset()
        gameController.reset()
        updateGameboard()
        changeMessage("Player X's Turn")
    })

    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i)
        }
    }

    const changeMessage = (message) => {
        messageDiv.textContent = message
    }

    const resultMessage = (winner) => {
        if (winner === "Draw") {
            changeMessage("It's a draw!")
        } else {
            changeMessage(`Player ${winner} has won!`)
        }
    } 

    return { changeMessage, resultMessage }
})()