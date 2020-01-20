package me.kupchenko.service;

import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.dto.NotesSearchDto;
import me.kupchenko.dto.NotesResponseDto;

public interface NoteService {
    NoteDto getNote(Long id);

    NoteDto createNote(CreateNoteDto noteDto);

    NoteDto replaceNote(Long id, NoteDto noteDto);

    NoteDto updateNote(Long id, NoteDto noteDto);

    void deleteNote(Long id);

    NotesResponseDto getNotes();

    NotesResponseDto getNotesByUserId(Long userId);

    NotesResponseDto searchUserNotes(Long id, NotesSearchDto searchDto);
}
