package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.service.NoteService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping(value = "/user/{id:[0-9]+}/search", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public NotesResponseDto searchUserNotes(@PathVariable Long id, @RequestBody NotesSearchDto searchDto) {
        log.info("Searching notes by search criteria: {}", searchDto);
        NotesResponseDto notesResponseDto = noteService.searchUserNotes(id, searchDto);
        log.info("Note response {}", notesResponseDto.getPagination());
        return notesResponseDto;
    }

    @GetMapping(value = "/user/{id:[0-9]+}", produces = APPLICATION_JSON_VALUE)
    public NotesResponseDto findUserNotes(@PathVariable Long id) {
        return noteService.getNotesByUserId(id);
    }
}
