package me.kupchenko.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import static me.kupchenko.util.Constant.DEFAULT_ROWS_NUMBER;
import static me.kupchenko.util.Constant.DEFAULT_START_PAGE;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotesSearchDto {
    private String text = "";
    @Min(value = 0, message = "Page number cannot be less then 0")
    private Integer page = DEFAULT_START_PAGE;
    @Min(value = 1, message = "Number of rows cannot be less then 1")
    @Max(value = 100, message = "Number of rows cannot be more then 100")
    private Integer rows = DEFAULT_ROWS_NUMBER;
}
