"use strict";

const Player = (sign) => {
    this.sign = sign

    const getSign = () => {
        return this.sign
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

    return { setField, getField, reset }
})()