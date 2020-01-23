package me.kupchenko.controller;

import lombok.AllArgsConstructor;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.service.NoteService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@AllArgsConstructor
public class MainPageController {
    private NoteService noteService;

    @GetMapping("/")
    public String notesPage(Model model, @RequestParam(required = false) NotesSearchDto searchDto) {
        NotesResponseDto notesResponseDto = noteService.getNotesByUserId(0L);
        model.addAttribute("notesResponse", notesResponseDto);
        return "index";
    }
}
