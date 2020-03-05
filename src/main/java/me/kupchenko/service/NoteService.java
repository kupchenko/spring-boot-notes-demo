package me.kupchenko.service;

import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.ExtendedNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;

public interface NoteService {
    ExtendedNoteDto getNote(Long id);

    NoteDto createNote(CreateNoteDto noteDto);

    NoteDto replaceNote(Long userId, NoteDto noteDto);

    NoteDto updateNote(Long id, NoteDto noteDto);

    void deleteNote(Long userId, Long noteId);

    NotesResponseDto getNotes();

    NotesResponseDto getNotesByUserId(Long userId);

    NotesResponseDto searchUserNotes(Long id, NotesSearchDto searchDto);
}
