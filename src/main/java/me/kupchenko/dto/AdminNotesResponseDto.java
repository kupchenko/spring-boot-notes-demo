package me.kupchenko.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.kupchenko.auth.service.dto.UserDto;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminNotesResponseDto {
    private UserDto user;
    private List<NoteDto> notes;
    private ResponsePagination pagination;
}
