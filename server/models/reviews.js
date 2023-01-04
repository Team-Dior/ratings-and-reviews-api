const db = require('../db/index.js');

function getReviews(query, callback) {
  console.log('query in models is ', query);
  const page = Number(query.page) || 1;
  const count = Number(query.count) || 5;
  const sort = query.sort || 'newest';
  const product_id = Number(query.product_id) || 43050;
  console.log('types of ', typeof page, typeof count, typeof sort, typeof product_id);
  const queryStringA = `SELECT * FROM reviews WHERE product_id = ${product_id} AND reported = false LIMIT ${count} OFFSET ${page}`;
  const reviewObj = {product_id: product_id};
  reviewObj.results = [];
  return db.query(queryStringA, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      return Promise.all(result.rows.map(async (review) => {
        let tempObj = {};
        tempObj.review_id = review.id;
        tempObj.rating = review.rating;
        tempObj.summary = review.summary;
        tempObj.recommended = review.recommended;
        tempObj.response = review.response;
        tempObj.body = review.body;
        tempObj.date = review.date;
        tempObj.reviewer_name = review.reviewer_name;
        tempObj.helpfulness = review.helpfulness;
        tempObj.photos = [];

        console.log('reviews ', review.id);
        queryStringB = `SELECT * FROM photos WHERE review_id = ${review.id}`;
        await db.query(queryStringB)
          .then((res) => {
            tempObj.photos = res.rows;
            reviewObj.results.push(tempObj);
          })
          .catch((err) => {
            console.log('error is ', err);
          });
      }))
      .then((res) => {
        callback(null, reviewObj);
      })
      .catch((err) => {
        callback(err, null);
      });
    }
  });
}

function getMeta (query, callback) {
  const product_id = 797894;
  const queryStringA = `SELECT rating, recommended FROM reviews WHERE product_id = ${product_id}`;
  const metaObj = {product_id: product_id.toString()};
  db.query(queryStringA, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      metaObj.product_id = product_id;
      const ratingsObj = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0};
      const recommendedObj = {"0": 0, "1": 0};
      for (let i  = 0; i < result.rows.length; i++) {
        ratingsObj[result.rows[i].rating] += 1;
        if (result.rows[i].recommended === false) {
          recommendedObj["0"] += 1;
        } else {
          recommendedObj["1"] += 1;
        }
      }
      metaObj.ratings = ratingsObj;
      metaObj.recommended = recommendedObj;
      const queryStringB = `SELECT id, name FROM characteristics WHERE product_id = ${product_id}`;
      db.query(queryStringB, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          metaObj.characteristics = {};
          return Promise.all(result.rows.map( async (character) => {
            await db.query(`SELECT value FROM reviewcharacteristics WHERE characteristic_id = ${character.id}`)
              .then((res) => {
                let total = 0;
                for (let i = 0; i < res.rows.length; i++) {
                  total += res.rows[i].value;
                }
                metaObj.characteristics[character.name] = {
                  id: character.id,
                  value: total / res.rows.length,
                };
              });
          }))
            .then(res => {
              callback(null, metaObj);
            })
            .catch(err => {
              callback(err, null);
            })
        }
      });
    }
  });
}

function postReview(data, callback) {
  const date = Math.floor(new Date().getTime() / 1000);
  const reported = false;
  const response = null;
  const helpfulness = 0;
  const queryStringA = `INSERT INTO reviews (product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (${data.product_id}, ${data.rating}, ${date}, '${data.summary}', '${data.body}', ${data.recommend}, ${reported}, '${data.name}', '${data.email}', '${response}', ${helpfulness})`;
  db.query(queryStringA, (err, result) => {
    if (err) {
      console.log('error is in reviews ', err);
      callback(err, null);
    } else {
      console.log('sucessful post in reviews table');
      const queryStringB = `INSERT INTO photos (review_id, url) VALUES ((SELECT id FROM reviews WHERE date = ${date}), '${data.photos}')`;
      db.query(queryStringB, (err, result) => {
        if (err) {
          console.log('error is in photos ', err);
          callback(err, null);
        } else {
          console.log('sucessful post in photos table');
          const keyList = Object.keys(data.characteristics);
          const valueList = Object.values(data.characteristics);

          keyList.forEach(name => {
            console.log('test ', data.characteristics[name]);
            const queryStringC = `INSERT INTO reviewcharacteristics (characteristic_id, review_id, value) VALUES ((SELECT id FROM characteristics WHERE product_id = ${data.product_id} AND name = '${name}'), (SELECT id FROM reviews WHERE date = ${date}), ${data.characteristics[name]})`;
            db.query(queryStringC, (err, result) => {
              if (err) {
                console.log('error is in reviewcharacteristics ', err);
                callback(err, null);
              } else {
                console.log('sucessful post in reviewcharacteristics table');
                callback(null, result);
              }
            })
          })
        }
      })
    }
  });
}

function putHelpful(data, callback) {
  const queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${data.review_id}`;
  db.query(queryString, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

function putReport(data, callback) {
  const queryString = `UPDATE reviews SET reported = true WHERE id = ${data.review_id}`;
  db.query(queryString, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {getReviews, getMeta, postReview, putHelpful, putReport};