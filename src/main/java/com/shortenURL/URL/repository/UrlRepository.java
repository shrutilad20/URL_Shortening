package com.shortenURL.URL.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shortenURL.URL.model.Url;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<Url, Long> {
    Optional<Url> findByShortCode(String shortCode);
    boolean existsByShortCode(String shortCode);
}
