// To determine whether the square is colored light or dark
export const isLightSquare = (position, index) => {
    const row = position.split('')[1];
    const isEven = (n) => !(n % 2);

    // Needs visualizing and pen-paper
    if (isEven(row) && !isEven(index + 1)) {
        return true;
    }

    if (!isEven(row) && isEven(index + 1)) {
        return true;
    }

    return false;
}