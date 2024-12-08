import java.io.*;
import java.util.*;

public class Day02 {
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
        HashMap<Integer,Integer> map = new HashMap<>();
        for(int i=0;i<ls.size();i++){
            int curNum = ls.get(i);
            for(int j=0;j<ls2.size();j++){
                if(curNum==ls2.get(j)){
                    map.put(curNum , map.getOrDefault(curNum, 0)+1 );
                }
            }
            
        }
        int res = 0;
        for(Integer key : map.keySet()){
            int cur = key*map.get(key);
            res+=cur;
        }
        System.out.println(res);
    }
}
