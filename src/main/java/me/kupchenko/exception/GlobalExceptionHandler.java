package me.kupchenko.exception;

import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    //Method threw 'feign.FeignException$NotFound' exception.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        log.warn("Error while validation request body");
        Map<String, String> errors = ex.getBindingResult().getAllErrors().stream()
                .map(error -> ((FieldError) error))
                .collect(Collectors.toMap(DefaultMessageSourceResolvable::getDefaultMessage, FieldError::getField));
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(NoteNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNoteNotFoundException(NoteNotFoundException ex) {
        log.warn("Error while fetching note");
        Map<String, Object> errors = new HashMap<>();
        errors.put("message", "Note was not found for user");
        errors.put("userId", ex.getUserId());
        errors.put("noteId", ex.getNoteId());
        return ResponseEntity.badRequest().body(errors);
    }


    @ExceptionHandler(FeignException.NotFound.class)
    public ResponseEntity<Map<String, Object>> handleFeignExceptionNotFound(FeignException.NotFound ex) {
        log.warn("Error while fetching user from [{} {}]", ex.request().httpMethod().name(), ex.request().url());
        Map<String, Object> errors = new HashMap<>();
        errors.put("message", "User was not found");
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> defaultExceptionHandler(Exception e) {
        log.error("Unexpected error occurred with message: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
