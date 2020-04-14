package me.kupchenko.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
public class WebUtils {
    public static void waitSeconds(int seconds) {
        try {
            TimeUnit.MILLISECONDS.sleep(seconds);
        } catch (InterruptedException e) {
            log.error(e.getMessage());
        }
    }

    public static Long extractUserId(JwtAuthenticationToken auth) {
        Map<String, Object> details = auth.getTokenAttributes();
        return Long.parseLong(details.get("user-id").toString());
    }
}
