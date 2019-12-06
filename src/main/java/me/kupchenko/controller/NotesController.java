package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import me.kupchenko.dto.NotesDto;
import me.kupchenko.service.NoteService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@AllArgsConstructor
@RequestMapping("/notes")
public class NotesController {
    private NoteService noteService;

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public NotesDto findNotes() {
        return noteService.getNotes();
    }

    @GetMapping(value = "/user/{id:[0-9]}", produces = APPLICATION_JSON_VALUE)
    public NotesDto findUserNotes(@PathVariable Long id) {
        return noteService.getNotesByUserId(id);
    }
}
