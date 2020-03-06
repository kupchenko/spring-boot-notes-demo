package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.ExtendedNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.service.NoteService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static me.kupchenko.util.WebUtils.extractUserId;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/note")
public class NoteController {

    private NoteService noteService;

    @GetMapping("/{id:[0-9]+}")
    public ExtendedNoteDto getNote(Authentication auth, @PathVariable Long id) {
        Long userId = extractUserId(auth);
        return noteService.getNote(userId, id);
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public NoteDto createNote(Authentication auth, @Valid @RequestBody CreateNoteDto noteDto) {
        Long userId = extractUserId(auth);
        noteDto.setOwner(userId);
        return noteService.createNote(noteDto);
    }

    @PutMapping(value = "/{id:[0-9]+}", consumes = APPLICATION_JSON_VALUE)
    public NoteDto replaceNote(Authentication auth, @PathVariable Long id, @Valid @RequestBody NoteDto noteDto) {
        noteDto.setId(id);
        log.info("Updating note: {}", noteDto);
        Long userId = extractUserId(auth);
        return noteService.replaceNote(userId, noteDto);
    }

    @PatchMapping("/{id:[0-9]+}")
    public NoteDto updateNote(@PathVariable Long id, NoteDto noteDto) {
        return noteService.updateNote(id, noteDto);
    }

    @DeleteMapping("/{id:[0-9]+}")
    public void deleteNote(Authentication auth, @PathVariable Long id) {
        Long userId = extractUserId(auth);
        noteService.deleteNote(userId, id);
    }
}
