// Add this line at the end of the file
export const shuffleArray = (array: any[]) => 
    [...array].sort(() => Math.random() - 0.5)
