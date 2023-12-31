package com.my.bookshare.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.my.bookshare.entity.BookEntity;

@Repository
public interface LentbookRepository extends JpaRepository<BookEntity, String> {

}
