package me.kupchenko.repository;

import me.kupchenko.model.Note;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends CrudRepository<Note, Long> {
    @Override
    List<Note> findAll();

    List<Note> findAllByUserId(Long id);

    List<Note> findAllByContentLikeAndUserIdOrderByUpdatedTsDesc(String content, Long id, Pageable pageable);
}
