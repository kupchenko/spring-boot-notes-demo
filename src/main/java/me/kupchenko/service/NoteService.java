package me.kupchenko.service;

import me.kupchenko.dto.NoteDto;
import me.kupchenko.model.Note;
import me.kupchenko.model.Notes;

public interface NoteService {
    Note getNote(String id);

    Note createNote(NoteDto noteDto);

    Note replaceNote(String id, NoteDto noteDto);

    Note updateNote(String id, NoteDto noteDto);

    Note deleteNote(String id);

    Notes getNotes();
}
