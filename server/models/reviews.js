const db = require('../db/index.js');

function getReviews(data, callback) {
  // const page = query.page || 1;
  // const count = query.count || 5;
  // const sort = query.sort || 'newest';
  // const product_id = query.product_id || 797894;
  const product_id = 797894;
  const queryStringA = `SELECT * FROM reviews WHERE product_id = ${product_id} LIMIT 5 OFFSET 1`;
  const reviewObj = {product_id: product_id};
  reviewObj.results = [];
  db.query(queryStringA, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      console.log('get result ', result.rows);
      for (let i = 0; i < result.rows.length; i++) {
        tempObj = {};
        tempObj.review_id = result.rows[i].id;
        tempObj.rating = result.rows[i].rating;
        tempObj.summary = result.rows[i].summary;
        tempObj.recommended = result.rows[i].recommended;
        tempObj.response = result.rows[i].response;
        tempObj.body = result.rows[i].body;
        tempObj.date = result.rows[i].date;
        tempObj.reviewer_name = result.rows[i].reviewer_name;
        tempObj.helpfulness = result.rows[i].helpfulness;
        queryStringB = `SELECT * FROM photos WHERE review_id = ${result.rows[i].id}`;
        db.query(queryStringB, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            console.log('photos result is ', result.rows);
            tempObj.photos = result.rows;
            reviewObj.results.push(tempObj);
            console.log('obj is is ', reviewObj);
            // callback(null, reviewObj);
          }
        })
      }
      // callback(null, reviewObj);
    }
  });
}

// function getReviews(data, callback) {
//   // const page = query.page || 1;
//   // const count = query.count || 5;
//   // const sort = query.sort || 'newest';
//   // const product_id = query.product_id || 797894;
//   const product_id = 797894;
//   const queryStringA = `SELECT * FROM reviews WHERE product_id = ${product_id} AND reported = false LIMIT 5 OFFSET 1`;
//   db.query(queryStringA)
//     .then((result) => {
//       console.log('get result ', result.rows);

//         const queryStringB = `SELECT * FROM photos WHERE review_id IN (SELECT id FROM reviews WHERE product_id = ${product_id})`;
//         db.query(queryStringB)
//         .then(() => {
//           console.log('photos result is ', result.rows);
//         })
//       })
//       .catch((err) => {
//         return err;
//       });
//     return 0;
// }

// function getMeta() {
//   const ratingsObj = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0};
//   const recommendedObj = {"0": 0, "1": 0};
//   const characteristicsObj = {};
//   const product_id = 797894;
//   const queryStringA = `SELECT rating, recommended FROM reviews WHERE product_id = ${product_id}`;
//   return db.query(queryStringA)
//     .then((result) => {
//       metaObj.product_id = product_id;
//       console.log('meta queryA result is ', result);
//       // const ratingsObj = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0};
//       // const recommendedObj = {"0": 0, "1": 0};
//       for (let i  = 0; i < result.rows.length; i++) {
//         ratingsObj[result.rows[i].rating] += 1;
//         if (result.rows[i].recommended === false) {
//           recommendedObj["0"] += 1;
//         } else {
//           recommendedObj["1"] += 1;
//         }
//       }
//       console.log('objects', ratingsObj, recommendedObj);
//       const queryStringB = `SELECT id, name FROM characteristics WHERE product_id = ${product_id}`;
//       return db.query(queryStringB)
//         .then(() => {
//           const charList = [];
//           for (let i  = 0; i < result.rows.length; i++) {
//             charList.push(result.rows[i].id);
//             names.push(result.rows[i].name);
//             characteristicsObj[result.rows[i].name] = {};
//             characteristicsObj[result.rows[i].name].id = result.rows[i].id;
//           }
//           console.log(characteristicsObj);
//           console.log('charList is ', charList);
//         })
//     })
//     .catch((err) => {

//     });
// }

const getMeta = async (callback) => {
  const product_id = 797894;
  const queryStringA = `SELECT rating, recommended FROM reviews WHERE product_id = ${product_id}`;
  const metaObj = {product_id: product_id.toString()};
  const names = [];
  const avgs = [];
  const test = await db.query(queryStringA, (err, result) => {
    if (err) {
      console.log('error is ', err);
      callback(err, null);
    } else {
      metaObj.product_id = product_id;
      console.log('meta queryA result is ', result);
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
      console.log('objects', ratingsObj, recommendedObj);
      const characteristicsObj = {};
      const queryStringB = `SELECT id, name FROM characteristics WHERE product_id = ${product_id}`;
      db.query(queryStringB, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          const charList = [];
          for (let i  = 0; i < result.rows.length; i++) {
            charList.push(result.rows[i].id);
            names.push(result.rows[i].name);
            characteristicsObj[result.rows[i].name] = {};
            characteristicsObj[result.rows[i].name].id = result.rows[i].id;
          }
          console.log(characteristicsObj);
          let avgArray = [];
          for (let j = 0; j < charList.length; j++) {
            const id = charList[j];
            const queryStringC = `SELECT value FROM reviewcharacteristics WHERE characteristic_id = ${id}`;
            db.query(queryStringC, (err, result) => {
              if (err) {
                callback(err, null);
              } else {
                let total = 0;
                let count = 0;
                for (let k = 0; k < result.rows.length; k++) {
                  total += result.rows[k].value;
                  count = k;
                }
                let avg = total / count;
                avgArray.push(avg);
              }
              let i = 0;
              console.log('avg array ', avgArray);
              for (let key in characteristicsObj) {
                characteristicsObj[key].value = avgArray[i];
                i++;
              }
              metaObj.characteristics = characteristicsObj;
              // console.log('char object finished ', characteristicsObj);
              console.log('meta obj is ', metaObj);
            })
          }
          // callback(null, metaObj);
        }
      });
    }
  });
  // callback(null, metaObj);
}

function postReview(data, callback) {
  console.log('the data is ', data);
  const date = Math.floor(new Date().getTime() / 1000);
  console.log('date is ', typeof date.toString());
  const reported = false;
  const response = null;
  const helpfulness = 0;
  console.log(date);
  const queryStringA = `INSERT INTO reviews (product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (${data.product_id}, ${data.rating}, ${date}, '${data.summary}', '${data.body}', ${data.recommend}, ${reported}, '${data.name}', '${data.email}', '${response}', ${helpfulness})`;
  console.log('important query string', queryStringA);
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