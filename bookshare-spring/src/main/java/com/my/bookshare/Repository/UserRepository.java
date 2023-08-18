package com.my.bookshare.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.my.bookshare.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

	

}
