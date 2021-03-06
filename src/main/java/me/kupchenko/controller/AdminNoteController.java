package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.AdminNotesResponseDto;
import me.kupchenko.dto.ExtendedNoteDto;
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
@RequestMapping("/admin/notes")
public class AdminNoteController {

    private NoteService noteService;

    @GetMapping("/{noteId:[0-9]+}")
    public ExtendedNoteDto getNote(@PathVariable Long noteId) {
        return noteService.getNote(noteId);
    }

    @GetMapping(value = "/user/{userId:[0-9]+}", produces = APPLICATION_JSON_VALUE)
    public AdminNotesResponseDto searchUserNotes(@PathVariable String userId,
                                                 @Valid NotesSearchDto searchDto) {
        return noteService.searchAdminUserNotes(userId, searchDto);
    }
}
