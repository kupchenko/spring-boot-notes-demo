package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import me.kupchenko.model.Notes;
import me.kupchenko.service.NoteService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/notes")
public class NotesController {
    private NoteService noteService;

    @GetMapping
    public Notes findNotes() {
        return noteService.getNotes();
    }
}
