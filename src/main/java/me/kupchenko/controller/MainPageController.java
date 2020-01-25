package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.service.NoteService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@AllArgsConstructor
public class MainPageController {
    private NoteService noteService;

    @GetMapping("/")
    public String notesPage(Model model, NotesSearchDto searchDto) {
        NotesResponseDto notesResponseDto = noteService.searchUserNotes(0L, searchDto);
        notesResponseDto.getNotes()
                .stream()
                .findFirst()
                .ifPresent(noteDto -> {
                    NoteDto note = noteService.getNote(noteDto.getId());
                    model.addAttribute("note", note);
                });
        model.addAttribute("notes", notesResponseDto);
        return "index";
    }
}
