package me.kupchenko.client;

import me.kupchenko.auth.service.controller.UserController;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient("users")
public interface UserClient extends UserController {
}
