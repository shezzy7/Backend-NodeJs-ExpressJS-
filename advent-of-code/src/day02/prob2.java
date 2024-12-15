import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.*;
public class prob2 {
    //if ascending
    public static boolean isAscending(int nums[]){
        for(int i=0;i<nums.length-1;i++){
            if(nums[i]>=nums[i+1]){
                return false;
            }
        }
        return true;
    }
    //if descending
    public static boolean isDescending(int nums[]){
        for(int i=0;i<nums.length-1;i++){
            if(nums[i]<=nums[i+1] ){
                return false;
            }
        }
        return true;
    }


    public static boolean isSafe(int nums[]){
        boolean ascending = isAscending(nums);
        boolean descending = isDescending(nums);

        if(ascending){
            for(int i=0;i<nums.length-1;i++){
                int diff = nums[i+1]-nums[i];
                if(diff>3){
                    return false;
                }
            }
            return true;
        }
        else if(descending){
            for(int i=0;i<nums.length-1;i++){
                int diff = nums[i] - nums[i+1];
                if(diff>3){
                    return false;
                }
            }
            return true;
        }
        else{
            return false;
        }
    }
    public static void main(String[] args) {
        // File name (assumed to be in the same folder as the program)
        String fileName = "input.txt";

        // List to store the 2D array dynamically
        List<int[]> array2D = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Split the line into parts and parse them into integers
                String[] parts = line.split("\\s+");
                int[] row = new int[parts.length];
                for (int i = 0; i < parts.length; i++) {
                    row[i] = Integer.parseInt(parts[i]);
                }
                // Add the row to the list
                array2D.add(row);
            }

            // Print the 2D array
            System.out.println("The 2D array from the file is:");
            int n=0;
            for (int[] row : array2D) {
                boolean safe = isSafe(row);
                if(safe){
                    n++;
                }
                else{
                    for(int i=0;i<row.length;i++){
                        List<Integer> ls = new ArrayList<>(Arrays.asList(Arrays.stream(row).boxed().toArray(Integer[]::new)));
                        
                        ls.remove(i);
                        int[] array = ls.stream().mapToInt(Integer::intValue).toArray();
                      
                        safe = isSafe(array);
                        if(safe){
                            n++;
                            break;
                        }


                    }

                }
                
                
            }
            System.out.println(n);
        } catch (FileNotFoundException e) {
            System.err.println("Error: The file '" + fileName + "' was not found.");
        } catch (IOException e) {
            System.err.println("Error: An I/O error occurred while reading the file.");
        } catch (NumberFormatException e) {
            System.err.println("Error: The file contains invalid data that cannot be converted to integers.");
        }
    }
}
