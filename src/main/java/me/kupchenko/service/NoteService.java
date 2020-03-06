package me.kupchenko.service;

import me.kupchenko.dto.AdminNotesResponseDto;
import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.ExtendedNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;

public interface NoteService {
    ExtendedNoteDto getNote(Long userId, Long id);

    NoteDto createNote(CreateNoteDto noteDto);

    NoteDto replaceNote(Long userId, NoteDto noteDto);

    NoteDto updateNote(Long id, NoteDto noteDto);

    void deleteNote(Long userId, Long noteId);

    NotesResponseDto getNotes();

    NotesResponseDto getNotesByUserId(Long userId);

    NotesResponseDto searchUserNotes(Long id, NotesSearchDto searchDto);

    //admin endpoints
    ExtendedNoteDto getNote(Long noteId);

    AdminNotesResponseDto searchAdminUserNotes(Long userId, NotesSearchDto searchDto);
}
