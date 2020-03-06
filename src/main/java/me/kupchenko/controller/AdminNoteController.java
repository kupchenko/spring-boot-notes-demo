package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.kupchenko.dto.AdminNotesResponseDto;
import me.kupchenko.dto.ExtendedNoteDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.service.NoteService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@AllArgsConstructor
@Secured("hasRole('ADMINj')")
@RequestMapping("/admin/note")
public class AdminNoteController {

    private NoteService noteService;

    @GetMapping("/{id:[0-9]+}")
    public ExtendedNoteDto getNote(@PathVariable Long id) {
        return noteService.getNote(id);
    }

    @GetMapping(value = "/user/{userId:[0-9]+}", produces = APPLICATION_JSON_VALUE)
    public AdminNotesResponseDto searchUserNotes(@PathVariable Long userId,
                                                 @Valid NotesSearchDto searchDto) {
        return noteService.searchAdminUserNotes(userId, searchDto);
    }
}
