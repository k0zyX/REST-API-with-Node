const express = require('express');
const router = express.Router();

// Models
const Movie = require("../models/Movie");

router.get('/', (req, res) => {
  const promise = Movie.find({ });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/top10', (req, res) => {
  const promise = Movie.find({ }).limit(10).sort({imdb_score: -1});

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id',(req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({message:"movie nat found"});
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

// Guncelleme
router.put('/:movie_id', (req, res) => {
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {new:true}
    );

  promise.then((movie) => {
    if(!movie)
      next({message:"movie nat found"});
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});


/*
Selimcan

router.put('/:movie_id', async (req, res) => {
    const update = await Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body
    )
    console.log(update)
    return req.json({"msg": update })
})

*/


// Selim tadında yazdığım kendi routerlarım
// Denendi çalışıyor

router.delete('/:movie_id', async (req, res) => {
  const promise = await Movie.findByIdAndRemove(
    req.params.movie_id
    )
    console.log(promise)
    return res.json({ "message": promise})
})

/*
Kurs kodu

router.delete('/:movie_id',(req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({message:"movie nat found"});
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});


*/

router.post('/', (req, res, next) => {
  const {title,imdb_score, category, country, year} = req.body;

  const movie = new Movie({
    title: title,
    imdb_score:imdb_score,
    category:category,
    country:country,
    year:year
  });

  movie.save((err,data) => {
    if(err){
      res.json(err);
    }
    else{
      res.json(data);
    }
  });
});

router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find({
    year: { "$gte": parseInt(start_year), "$lte" : parseInt(end_year)}
  });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
