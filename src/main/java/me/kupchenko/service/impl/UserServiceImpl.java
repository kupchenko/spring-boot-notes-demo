package me.kupchenko.service.impl;

import feign.Client;
import feign.Feign;
import feign.Logger;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.slf4j.Slf4jLogger;
import me.kupchenko.auth.service.dto.UserDto;
import me.kupchenko.client.UserClient;
import me.kupchenko.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.openfeign.support.SpringMvcContract;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserClient userClient;

    @Autowired
    public UserServiceImpl(Client client, @Value("${client.service.auth.url}") String authServiceUrl) {
        this.userClient = Feign.builder()
                .client(client)
                .contract(new SpringMvcContract())
                .encoder(new JacksonEncoder())
                .decoder(new JacksonDecoder())
                .logger(new Slf4jLogger(UserClient.class))
                .logLevel(Logger.Level.FULL)
                .target(UserClient.class, authServiceUrl);
    }

    @Override
    public UserDto findByUserName(String username) {
        return userClient.findUserByUsername(username);
    }

    @Override
    public UserDto findById(String id) {
        return userClient.findUserById(0L);
    }
}
