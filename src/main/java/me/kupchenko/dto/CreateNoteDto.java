package me.kupchenko.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateNoteDto {
    @NotEmpty
    private String title;
    private String content;
    private String owner;
}
