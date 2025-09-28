package com.shortenURL.URL.controller;

import org.springframework.web.bind.annotation.*;
import com.shortenURL.URL.repository.UrlRepository;
import com.shortenURL.URL.model.Url;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UrlController {

    private final UrlRepository urlRepository;
    private final String BASE_URL = "http://localhost:8080/";

    public UrlController(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestBody UrlRequest request) {
        String alias = request.getCustomAlias();
        if(alias != null && !alias.isEmpty()) {
            // Check if custom alias already exists
            if(urlRepository.existsByShortCode(alias)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Alias already taken");
            }
        } else {
            alias = generateRandomShortCode();
        }

        Url url = new Url(request.getLongUrl(), alias);
        urlRepository.save(url);
        return ResponseEntity.ok(BASE_URL + alias);
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<?> redirectUrl(@PathVariable String shortCode) {
        Optional<Url> optionalUrl = urlRepository.findByShortCode(shortCode);
        if(optionalUrl.isPresent()) {
            Url url = optionalUrl.get();
            url.setClicks(url.getClicks() + 1);
            urlRepository.save(url);
            return ResponseEntity.status(302)
                    .header("Location", url.getLongUrl())
                    .build();
        }
        return ResponseEntity.notFound().build();
    }

    private String generateRandomShortCode() {
        int length = 6;
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(length);
        for(int i = 0; i < length; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }
}
