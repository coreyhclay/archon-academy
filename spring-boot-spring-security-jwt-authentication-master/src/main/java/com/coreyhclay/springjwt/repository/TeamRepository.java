package com.coreyhclay.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coreyhclay.springjwt.models.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    List<Team> findByPublished(boolean published);

    List<Team> findByTitleContaining(String title);
}
