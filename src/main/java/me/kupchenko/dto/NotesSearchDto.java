package me.kupchenko.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotesSearchDto {
    private static final Integer DEFAULT_PAGE_NUMBER = 0;
    private static final Integer DEFAULT_ROWS_COUNT = 10;
    private String text;
    private Integer rows = DEFAULT_ROWS_COUNT;
    private Integer page = DEFAULT_PAGE_NUMBER;
}
