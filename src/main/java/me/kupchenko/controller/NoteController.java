package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.service.NoteService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/note")
public class NoteController {

    private NoteService noteService;

    @GetMapping("/{id:[0-9]+}")
    public NoteDto getNote(@PathVariable Long id) {
        return noteService.getNote(id);
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public NoteDto createNote(@RequestBody CreateNoteDto noteDto) {
        return noteService.createNote(noteDto);
    }

    @PutMapping(value = "/{id:[0-9]+}", consumes = APPLICATION_JSON_VALUE)
    public NoteDto replaceNote(@PathVariable Long id, @RequestBody NoteDto noteDto) {
        log.info("Updating note: {}", noteDto);
        return noteService.replaceNote(id, noteDto);
    }

    @PatchMapping("/{id:[0-9]+}")
    public NoteDto updateNote(@PathVariable Long id, NoteDto noteDto) {
        return noteService.updateNote(id, noteDto);
    }

    @DeleteMapping("/{id:[0-9]+}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }
}
