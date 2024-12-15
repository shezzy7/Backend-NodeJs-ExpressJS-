import java.io.*;
import java.util.*;

public class Prob2 {

    // Method to count X-MAS pattern occurrences
    public static int countXMAS(char[][] grid) {
        int count = 0;
        int rows = grid.length;
        int cols = grid[0].length;

        // Traverse through the grid to find all "X-MAS" patterns
        for (int i = 0; i < rows - 2; i++) {  // Need at least 3 rows for "X-MAS"
            for (int j = 1; j < cols - 1; j++) {  // Need at least 3 columns for "X-MAS"
                
                // Forward X-MAS: Check for "M" at (i, j), "A" at (i+1, j), "S" at (i+2, j)
                // Arms of the X: "M" at (i+2, j-1), "A" at (i+1, j-2), "S" at (i, j-2)
                if (i + 2 < rows && j - 2 >= 0 && j + 1 < cols) {
                    if (grid[i][j] == 'M' && grid[i + 1][j] == 'A' && grid[i + 2][j] == 'S' &&
                        grid[i + 2][j - 1] == 'M' && grid[i + 1][j - 2] == 'A' && grid[i][j - 2] == 'S') {
                        count++;  // Increment for forward pattern
                    }
                }

                // Backward X-MAS: Check for "S" at (i, j), "A" at (i+1, j), "M" at (i+2, j)
                // Arms of the X: "S" at (i+2, j-1), "A" at (i+1, j-2), "M" at (i, j-2)
                if (i + 2 < rows && j - 2 >= 0 && j + 1 < cols) {
                    if (grid[i][j] == 'S' && grid[i + 1][j] == 'A' && grid[i + 2][j] == 'M' &&
                        grid[i + 2][j - 1] == 'S' && grid[i + 1][j - 2] == 'A' && grid[i][j - 2] == 'M') {
                        count++;  // Increment for backward pattern
                    }
                }
            }
        }
        return count;
    }

    // Method to read the grid from a file
    public static char[][] readGridFromFile(String filename) throws IOException {
        List<String> lines = new ArrayList<>();
        
        // Read the file line by line
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line);
            }
        }

        // Convert the list of lines into a 2D char array (grid)
        int rows = lines.size();
        int cols = lines.get(0).length();
        char[][] grid = new char[rows][cols];
        
        for (int i = 0; i < rows; i++) {
            grid[i] = lines.get(i).toCharArray();
        }

        return grid;
    }

    public static void main(String[] args) {
        try {
            // Read the grid from the input file
            char[][] grid = readGridFromFile("input2.txt");

            // Call the method to count X-MAS patterns
            int result = countXMAS(grid);

            // Output the result
            System.out.println("X-MAS pattern found " + result + " times.");
        } catch (IOException e) {
            System.out.println("Error reading the file: " + e.getMessage());
        }
    }
}
