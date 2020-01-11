package me.kupchenko.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static me.kupchenko.util.Constant.DEFAULT_ROWS_NUMBER;
import static me.kupchenko.util.Constant.DEFAULT_START_INDEX;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotesSearchDto {
    private String text;
    private Long start = DEFAULT_START_INDEX;
    private Long rows = DEFAULT_ROWS_NUMBER;

    public int getPageNumber() {
        return (getStart() <= 0) ? 0 : (int) (getRows() / getStart());
    }
}
