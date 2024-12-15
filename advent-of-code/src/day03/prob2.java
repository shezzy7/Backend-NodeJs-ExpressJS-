import java.io.*;
public class Prob2 {
    
    public static void main(String[] args) {
        // File input
        String fileName = "input2.txt"; // Replace with your .txt file name
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
        boolean enabled = true;
        for(int i=0;i<memory.length();i++){
            if(i+6<memory.length() && memory.substring(i , i+6).equals("don't(")){
                enabled = false;
                i+=6;
            }
            else if(i+3<memory.length() && memory.substring(i,i+3).equals("do(")){
                enabled = true;
                i+=3;
            }
            else if(enabled && i+4<memory.length() && memory.substring(i , i+4).equals("mul(")){
                int start = i+4;
                

                    int commaIndex = memory.indexOf("," , start);
                    int closeParenIndex = memory.indexOf(")", start);
                    if(commaIndex>start && closeParenIndex>commaIndex){
                        try{
                        int x = Integer.parseInt(memory.substring(i+4,commaIndex));
                        int y = Integer.parseInt(memory.substring(commaIndex+1 , closeParenIndex));
                        sum += x*y;
                        }
                    
                
                catch(NumberFormatException e){

                }}
            }
        }
        System.out.println(sum);
    
    }
}