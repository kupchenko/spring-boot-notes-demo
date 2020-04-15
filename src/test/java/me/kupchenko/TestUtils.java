package me.kupchenko;

import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class TestUtils {
    public static <T> String getResourceFileAsString(Class<T> clazz, String filePath) throws IOException {
        InputStream resourceAsStream = clazz.getClassLoader().getResourceAsStream(filePath);
        return IOUtils.toString(resourceAsStream, StandardCharsets.UTF_8.name());
    }
}
