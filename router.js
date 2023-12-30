const express = require("express");
const session = require("express-session");
const { getMoviesByGenre } = require("./fetchData");

const router = express.Router();

const credential = {
  email: "admin@gmail.com",
  password: "admin123",
};

//home route
router.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
    res.end();
  } else {
    res.render("index");
    res.end();
  }
});

//login user
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
    res.end();
  } else {
    res.render("login");
    res.end();
  }
});
router.post("/login", (req, res) => {
  if (req.body.email == credential.email) {
    if (req.body.password == credential.password) {
      req.session.isLoggedIn = true;
      req.session.user = req.body.email;
      res.redirect("/home");
      res.end();
    } else {
      res.render("login", { invalidPassword: "Invalid password" });
      res.end();
    }
  } else {
    res.render("login", { invalidEmail: "User not found at this email" });
    res.end();
  }
});
//home
router.get("/home", (req, res) => {
  if (req.session.user) {
    const genres = [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
    ];
    Promise.allSettled(genres.map((genreId) => getMoviesByGenre(genreId.id)))
      .then((resolves) => {
        let movieDataByGenre = [];
        resolves.forEach((element) => {
          if (element.status == "fulfilled") {
            movieDataByGenre.push(element.value);
          }
        });

        // movieDataByGenre is an array of arrays, each containing movie data for a specific genre
        res.render("home", { data: movieDataByGenre, genre: genres });
        res.end();
      })
      .catch((error) => {
        res.status(500).render("error", { error: error });
        res.end();
      });
    // res.render("home");
    // res.end();
  } else {
    res.redirect("/");
    res.end();
  }
});
//logout
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.send(error);
      res.end();
    } else {
      res.redirect("/");
      res.end();
    }
  });
});
module.exports = router;
