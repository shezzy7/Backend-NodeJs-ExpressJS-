import java.io.*;
import java.util.*;

public class Day01 {
    public static void main(String[] args) {
        // Input file path
        String inputFilePath = "input.txt";
        String inputFilePath2 = "input2.txt";
        // List to store pairs of numbers
        List<int[]> numberPairs = new ArrayList<>();

        // Read the input file
        try (BufferedReader reader = new BufferedReader(new FileReader(inputFilePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Split the line by whitespace and parse numbers
                String[] parts = line.trim().split("\\s+");
                if (parts.length == 2) {
                    int num1 = Integer.parseInt(parts[0]);
                    int num2 = Integer.parseInt(parts[1]);
                    numberPairs.add(new int[]{num1, num2});
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading the input file: " + e.getMessage());
            return;
        }

        // Process the pairs
        System.out.println("Processing the number pairs:");
        List<Integer>ls = new ArrayList<>();
        List<Integer>ls2 = new ArrayList<>();
        for (int[] pair : numberPairs) {
           ls.add(pair[0]);
            ls2.add(pair[1]);
            // Add your processing logic here if needed
        }
        Collections.sort(ls);
        Collections.sort(ls2);

        int sum = 0;
        for(int i=0;i<ls.size();i++){
            int curSum = Math.abs(ls.get(i)-ls2.get(i));
            sum+=curSum;
        }
        System.out.println(sum);
    }
}
