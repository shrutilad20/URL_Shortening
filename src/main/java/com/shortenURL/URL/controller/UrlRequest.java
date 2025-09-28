package com.shortenURL.URL.controller;

public class UrlRequest {
    private String longUrl;
    private String customAlias; // optional

    public String getLongUrl() { return longUrl; }
    public void setLongUrl(String longUrl) { this.longUrl = longUrl; }

    public String getCustomAlias() { return customAlias; }
    public void setCustomAlias(String customAlias) { this.customAlias = customAlias; }
}
