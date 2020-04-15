package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.ExtendedNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.service.NoteService;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
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

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/notes")
public class NoteController {

    private NoteService noteService;

    @GetMapping(value = "/user", produces = APPLICATION_JSON_VALUE)
    public NotesResponseDto searchUserNotes(JwtAuthenticationToken auth,
                                            @Valid NotesSearchDto searchDto) {
        log.info("Searching notes for user {} by search criteria: {}", auth.getName(), searchDto);
        return noteService.searchUserNotes(auth.getName(), searchDto);
    }

    @GetMapping("/{id:[0-9]+}")
    public ExtendedNoteDto getNote(JwtAuthenticationToken auth, @PathVariable Long id) {
        return noteService.getNote(auth.getName(), id);
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public NoteDto createNote(JwtAuthenticationToken auth, @Valid @RequestBody CreateNoteDto noteDto) {
        noteDto.setOwner(auth.getName());
        return noteService.createNote(noteDto);
    }

    @PutMapping(value = "/{id:[0-9]+}", consumes = APPLICATION_JSON_VALUE)
    public NoteDto replaceNote(JwtAuthenticationToken auth, @PathVariable Long id, @Valid @RequestBody NoteDto noteDto) {
        noteDto.setId(id);
        log.info("Updating note: {}", noteDto);
        return noteService.replaceNote(auth.getName(), noteDto);
    }

    @PatchMapping("/{id:[0-9]+}")
    public NoteDto updateNote(@PathVariable Long id, NoteDto noteDto) {
        return noteService.updateNote(id, noteDto);
    }

    @DeleteMapping("/{id:[0-9]+}")
    public void deleteNote(JwtAuthenticationToken auth, @PathVariable Long id) {
        noteService.deleteNote(auth.getName(), id);
    }
}
