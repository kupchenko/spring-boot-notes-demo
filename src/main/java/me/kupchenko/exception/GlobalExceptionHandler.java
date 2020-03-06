package me.kupchenko.exception;

import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        log.warn("Error while validation request body");
        Map<String, String> errors = ex.getBindingResult().getAllErrors().stream()
                .map(error -> ((FieldError) error))
                .collect(Collectors.toMap(DefaultMessageSourceResolvable::getDefaultMessage, FieldError::getField));
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(NoteNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNoteNotFoundException(NoteNotFoundException ex) {
        log.warn("Error while fetching note");
        Map<String, Object> errors = new LinkedHashMap<>();
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

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<Map<String, Object>> handleFeignException(FeignException ex) {
        log.warn("Error while fetching data from another service [{} {}]", ex.request().httpMethod().name(), ex.request().url());
        Map<String, Object> errors = new LinkedHashMap<>();
        errors.put("message", "Unexpected error from external server");
        errors.put("request.method", ex.request().httpMethod().name());
        errors.put("request.url", ex.request().url());
        errors.put("response.status", ex.status());
        errors.put("response.body", ex.responseBody().map(ByteBuffer::array).map(String::new).orElse(""));
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> defaultExceptionHandler(Exception e) {
        log.error("Unexpected error occurred with message: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
