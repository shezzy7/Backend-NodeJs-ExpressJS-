import java.io.*;

public class Prob1 {
    public static void main(String[] args) {
        // File input
        String fileName = "input1.txt"; // Replace with your .txt file name
        char[][] grid;

        // Read the grid from the file
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            int rows = 0;
            int cols = 0;
            StringBuilder gridBuilder = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                if (cols == 0) cols = line.length(); // Determine column size from the first row
                gridBuilder.append(line);
                rows++;
            }

            grid = new char[rows][cols];
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    grid[i][j] = gridBuilder.charAt(i * cols + j);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading the file: " + e.getMessage());
            return;
        }

        // Search for XMAS occurrences
        int totalCount = findWordOccurrences(grid, "XMAS");
        System.out.println("Total occurrences of XMAS: " + totalCount);
    }

    private static int findWordOccurrences(char[][] grid, String word) {
        int rows = grid.length;
        int cols = grid[0].length;
        int wordLength = word.length();
        int count = 0;

        // Directions: [rowOffset, colOffset]
        int[][] directions = {
            {0, 1},  // Right
            {1, 0},  // Down
            {1, 1},  // Down-Right (Diagonal)
            {1, -1}, // Down-Left (Diagonal)
            {0, -1}, // Left
            {-1, 0}, // Up
            {-1, -1}, // Up-Left (Diagonal)
            {-1, 1}  // Up-Right (Diagonal)
        };

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                for (int[] direction : directions) {
                    if (checkWord(grid, word, row, col, direction, wordLength)) {
                        count++;
                    }
                }
            }
        }

        return count;
    }

    private static boolean checkWord(char[][] grid, String word, int row, int col, int[] direction, int wordLength) {
        int rows = grid.length;
        int cols = grid[0].length;

        for (int i = 0; i < wordLength; i++) {
            int newRow = row + i * direction[0];
            int newCol = col + i * direction[1];

            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols || grid[newRow][newCol] != word.charAt(i)) {
                return false;
            }
        }

        return true;
    }
}
