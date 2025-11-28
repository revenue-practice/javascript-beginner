USE DATABASE day10_27_11_2025_movie_watchlist;
CREATE TABLE REVIEWS (
    id SERIAL PRIMARY KEY,
    rating INT,
    comment VARCHAR(100),
    created_at VARCHAR(50),
    updated_at VARCHAR(50),
    movie_id INTEGER, 
    FOREIGN KEY (movie_id) REFERENCES MOVIES(id)
);