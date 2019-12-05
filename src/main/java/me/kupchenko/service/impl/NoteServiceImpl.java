package me.kupchenko.service.impl;

import me.kupchenko.dto.NoteDto;
import me.kupchenko.model.Note;
import me.kupchenko.model.Notes;
import me.kupchenko.service.NoteService;
import org.springframework.stereotype.Service;

@Service
public class NoteServiceImpl implements NoteService {
    @Override
    public Note getNote(String id) {
        return null;
    }

    @Override
    public Note createNote(NoteDto noteDto) {
        return null;
    }

    @Override
    public Note replaceNote(String id, NoteDto noteDto) {
        return null;
    }

    @Override
    public Note updateNote(String id, NoteDto noteDto) {
        return null;
    }

    @Override
    public Note deleteNote(String id) {
        return null;
    }

    @Override
    public Notes getNotes() {
        return null;
    }
}
