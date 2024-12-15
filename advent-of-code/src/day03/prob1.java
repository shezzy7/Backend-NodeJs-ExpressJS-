import java.io.*;

public class Prob1 {
    public static void main(String[] args) {
        // File input
        String fileName = "input1.txt"; // Replace with your .txt file name
        StringBuilder corruptedMemory = new StringBuilder();

        // Read the file content
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = reader.readLine()) != null) {
                corruptedMemory.append(line);
            }
        } catch (IOException e) {
            System.err.println("Error reading the file: " + e.getMessage());
            return;
        }

        int sum = 0; // Variable to store the sum of results
        String memory = corruptedMemory.toString();

        // Parse the corrupted memory for valid mul instructions
        for (int i = 0; i < memory.length(); i++) {
            if (i + 3 < memory.length() && memory.substring(i, i + 3).equals("mul")) {
                int start = i + 3;
                if (start < memory.length() && memory.charAt(start) == '(') {
                    int commaIndex = memory.indexOf(',', start);
                    int closeParenIndex = memory.indexOf(')', start);

                    // Ensure the structure is valid and indices exist
                    if (commaIndex > start && closeParenIndex > commaIndex) {
                        try {
                            // Extract and parse numbers
                            int x = Integer.parseInt(memory.substring(start + 1, commaIndex).trim());
                            int y = Integer.parseInt(memory.substring(commaIndex + 1, closeParenIndex).trim());

                            // Multiply and add to the sum
                            sum += x * y;
                            i = closeParenIndex; // Move the pointer past this instruction
                        } catch (NumberFormatException e) {
                            // Ignore invalid numbers and continue
                        }
                    }
                }
            }
        }

        // Print the total sum of results
        System.out.println("Total sum of valid mul results: " + sum);
    }
}
