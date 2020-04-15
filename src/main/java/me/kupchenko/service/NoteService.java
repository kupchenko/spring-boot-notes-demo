package me.kupchenko.service;

import me.kupchenko.dto.AdminNotesResponseDto;
import me.kupchenko.dto.CreateNoteDto;
import me.kupchenko.dto.ExtendedNoteDto;
import me.kupchenko.dto.NoteDto;
import me.kupchenko.dto.NotesResponseDto;
import me.kupchenko.dto.NotesSearchDto;

public interface NoteService {
    ExtendedNoteDto getNote(String userId, Long id);

    NoteDto createNote(CreateNoteDto noteDto);

    NoteDto replaceNote(String userId, NoteDto noteDto);

    NoteDto updateNote(Long id, NoteDto noteDto);

    void deleteNote(String userId, Long noteId);

    NotesResponseDto getNotes();

    NotesResponseDto getNotesByUserId(String userId);

    NotesResponseDto searchUserNotes(String id, NotesSearchDto searchDto);

    //admin endpoints
    ExtendedNoteDto getNote(Long noteId);

    AdminNotesResponseDto searchAdminUserNotes(String userId, NotesSearchDto searchDto);
}
