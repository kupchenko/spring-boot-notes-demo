package me.kupchenko.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto {
    private Long id;
    @NotEmpty
    private String title;
    private String content;
    private LocalDateTime createdTs;
    private LocalDateTime updatedTs;
}
