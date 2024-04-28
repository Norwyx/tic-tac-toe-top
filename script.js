"use strict";

const Player = (sign) => {
    this.sign = sign

    const getSign = () => {
        return this.sign
    }

    return { getSign }
}


