package me.kupchenko.service.impl;

import feign.Client;
import feign.Contract;
import feign.Feign;
import feign.codec.Decoder;
import feign.codec.Encoder;
import me.kupchenko.auth.service.dto.UserDto;
import me.kupchenko.client.UserClient;
import me.kupchenko.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private UserClient userClient;

	@Autowired
	public UserServiceImpl(Decoder decoder, Encoder encoder, Client client, Contract contract) {
		this.userClient = Feign.builder().client(client)
				.encoder(encoder)
				.decoder(decoder)
				.contract(contract)
//				.requestInterceptor(new BasicAuthRequestInterceptor("admin", "admin"))
				.target(UserClient.class, "http://localhosts:8085");
	}

	@Override
	public UserDto findByUserName(String username) {
		return userClient.findUserByUsername(username);
	}

	@Override
	public UserDto findById(Long id) {
		return userClient.findUserByUsername(id.toString());
	}
}
