package me.kupchenko.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static me.kupchenko.util.Constant.DEFAULT_ROWS_NUMBER;
import static me.kupchenko.util.Constant.DEFAULT_SEARCH_STRING;
import static me.kupchenko.util.Constant.DEFAULT_START_PAGE;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotesSearchDto {
    private String text = DEFAULT_SEARCH_STRING;
    private Integer page = DEFAULT_START_PAGE;
    private Integer rows = DEFAULT_ROWS_NUMBER;
}
