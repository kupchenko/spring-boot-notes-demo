package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.service.NoteService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/notes")
public class NotesController {
    private NoteService noteService;

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public NotesResponseDto findNotes() {
        return noteService.getNotes();
    }

    @GetMapping(value = "/user/{id:[0-9]+}", produces = APPLICATION_JSON_VALUE)
    public NotesResponseDto searchUserNotes(@PathVariable Long id, @Valid NotesSearchDto searchDto) {
        log.info("Searching notes by search criteria: {}", searchDto);
        return noteService.searchUserNotes(id, searchDto);
    }
}
