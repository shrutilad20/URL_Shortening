package com.shortenURL.URL.controller;

import org.springframework.web.bind.annotation.*;

import com.shortenURL.URL.repository.UrlRepository;
import com.shortenURL.URL.model.Url;


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
    public String shortenUrl(@RequestBody String longUrl) {
        String shortCode = generateShortCode();
        Url url = new Url(longUrl, shortCode);
        urlRepository.save(url);
        return BASE_URL + shortCode;
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<?> redirectUrl(@PathVariable String shortCode) {
        Optional<Url> optionalUrl = urlRepository.findByShortCode(shortCode);
        if (optionalUrl.isPresent()) {
            Url url = optionalUrl.get();
            url.setClicks(url.getClicks() + 1);
            urlRepository.save(url);
            return ResponseEntity.status(302)
                    .header("Location", url.getLongUrl())
                    .build();
        }
        return ResponseEntity.notFound().build();
    }

    private String generateShortCode() {
        int length = 6;
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(length);
        for(int i = 0; i < length; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }
}
