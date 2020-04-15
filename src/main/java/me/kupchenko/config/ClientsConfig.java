package me.kupchenko.config;

import feign.okhttp.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClientsConfig {
    @Bean
    public OkHttpClient client() {
        return new OkHttpClient();
    }
}
