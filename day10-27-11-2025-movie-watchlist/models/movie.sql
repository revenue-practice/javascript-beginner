USE DATABASE day10_27_11_2025_movie_watchlist;
CREATE TABLE MOVIES (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    year VARCHAR(4),
    created_at VARCHAR(250)
);