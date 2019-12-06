package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.model.Note;
import me.kupchenko.service.NoteService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/note")
public class NoteController {

    private NoteService noteService;

    @GetMapping("/{id:[0-9]}")
    public Note getNote(@PathVariable Long id) {
        return noteService.getNote(id);
    }

    @PostMapping
    public Note createNote(NoteDto noteDto) {
        return noteService.createNote(noteDto);
    }

    @PutMapping("/{id:[0-9]}")
    public Note replaceNote(@PathVariable Long id, NoteDto noteDto) {
        return noteService.replaceNote(id, noteDto);
    }

    @PatchMapping("/{id:[0-9]}")
    public Note updateNote(@PathVariable Long id, NoteDto noteDto) {
        return noteService.updateNote(id, noteDto);
    }

    @DeleteMapping("/{id:[0-9]}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }
}
