package me.kupchenko.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;

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

    public static Long extractUserId(Authentication auth) {
        OAuth2AuthenticationDetails oauthDetails = (OAuth2AuthenticationDetails) auth.getDetails();
        Map<String, Object> details = (Map<String, Object>) oauthDetails.getDecodedDetails();
        return Long.parseLong(details.get("user-id").toString());
    }
}
