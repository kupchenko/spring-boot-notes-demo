package me.kupchenko.repository;

import me.kupchenko.model.Note;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends CrudRepository<Note, Long> {
    @Override
    List<Note> findAll();

    List<Note> findAllByUserId(Long id);

    @Query(value = "select new Note(n.id, n.title, concat(substring(n.content, 1, 20), '...'), n.user, n.createdTs, n.updatedTs)  " +
            "from Note n where (n.content LIKE :content or n.title LIKE :content) and n.user.id = :id")
    List<Note> searchNotes(String content, Long id, Pageable pageable);

    long countByUserId(Long id);

    @Query(value = "select count(n) from Note n where (n.content LIKE :content or n.title LIKE :content) and n.user.id = :id")
    long countTotalNotesByCriteria(String content, Long id);
}
