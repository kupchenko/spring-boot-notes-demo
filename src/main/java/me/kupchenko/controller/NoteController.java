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

    @GetMapping("/{id}")
    public Note getNote(@PathVariable String id) {
        return noteService.getNote(id);
    }

    @PostMapping
    public Note createNote(NoteDto noteDto) {
        return noteService.createNote(noteDto);
    }

    @PutMapping("/{id}")
    public Note replaceNote(@PathVariable String id, NoteDto noteDto) {
        return noteService.replaceNote(id, noteDto);
    }

    @PatchMapping("/{id}")
    public Note updateNote(@PathVariable String id, NoteDto noteDto) {
        return noteService.updateNote(id, noteDto);
    }

    @DeleteMapping("/{id}")
    public Note deleteNote(@PathVariable String id) {
        return noteService.deleteNote(id);
    }
}
