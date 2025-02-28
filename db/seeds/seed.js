const db = require("../connection")

const seed = ({ topicData, userData, articleData, commentData }) => {
   return db.query("DROP TABLE IF EXISTS comments;")
  .then(()=>{
   return db.query("DROP TABLE IF EXISTS articles; ")
  })
  .then(()=>{
   return db.query("DROP TABLE IF EXISTS users; ")
  })
  .then(()=>{
    return db.query("DROP TABLE IF EXISTS topics; ")
  })
  .then(()=> {
    return db.query(`
      CREATE TABLE IF NOT EXISTS topics(
      slug VARCHAR(255) PRIMARY KEY,
      description VARCHAR(255),
      img_url VARCHAR(1000)
      )
      `)
  })
  .then(()=>{
   return db.query(`
   CREATE TABLE IF NOT EXISTS users (
   username VARCHAR(255) PRIMARY KEY,
   name VARCHAR(255),
   avatar_url VARCHAR(1000)
   )
   `)
  })
  .then(()=> {
    return db.query(`
      CREATE TABLE IF NOT EXISTS articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      topic VARCHAR(255) REFERENCES topics(slug),
      author VARCHAR(1000) NOT NULL REFERENCES  users(username),
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000)
      )
      `)
  })
  .then(()=>{
    return db.query(`
     CREATE TABLE IF NOT EXISTS comments (
     comment_id SERIAL PRIMARY KEY,
     body TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     article_id INT REFERENCES articles(article_id),
     author VARCHAR(1000) NOT NULL REFERENCES users(username),
     votes INT
     )
      `)
  })

}
module.exports = seed;
