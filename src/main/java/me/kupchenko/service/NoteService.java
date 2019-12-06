package me.kupchenko.service;

import me.kupchenko.dto.NoteDto;
import me.kupchenko.model.Note;
import me.kupchenko.model.Notes;

public interface NoteService {
    Note getNote(Long id);

    Note createNote(NoteDto noteDto);

    Note replaceNote(Long id, NoteDto noteDto);

    Note updateNote(Long id, NoteDto noteDto);

    void deleteNote(Long id);

    Notes getNotes();
}
