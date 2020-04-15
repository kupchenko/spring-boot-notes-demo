package me.kupchenko.exception;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Value;

@Value
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
public class NoteNotFoundException extends RuntimeException {
    private final String userId;
    private final Long noteId;
}
