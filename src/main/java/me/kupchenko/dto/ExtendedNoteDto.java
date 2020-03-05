package me.kupchenko.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.kupchenko.auth.service.dto.UserDto;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExtendedNoteDto {
	private Long id;
	private String title;
	private String content;
	private UserDto user;
}
