package utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class InputReader {
    public static List<String> readLines(String fileName) throws IOException {
        return Files.readAllLines(Paths.get("input/" + fileName));
    }
}
