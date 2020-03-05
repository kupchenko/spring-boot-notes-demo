package me.kupchenko.service;

import me.kupchenko.auth.service.dto.UserDto;

public interface UserService {
	UserDto findByUserName(String username);
	UserDto findById(Long id);
}