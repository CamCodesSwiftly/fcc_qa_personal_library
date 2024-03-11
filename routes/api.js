/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const { ObjectId } = require("mongodb");
module.exports = function (app) {
	let container = [
		{
			comments: ["first comment", "second comment", "third comment"],
			_id: "65ef2da40fac29acae53b4c4",
			title: "Sapiens",
			commentcount: 3,
			__v: 3,
		},
		{
			comments: ["Gandalf is a G"],
			_id: new ObjectId().toString(),
			title: "The Lord of the Rings",
			commentcount: 1,
			__v: 1,
		},
	];

	app.route("/api/books")
		.get(function (req, res) {
			//response will be array of book objects
			//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
			res.json(container);
		})

		.post(function (req, res) {
			//title provided?
			if (req.body.title === "undefined" || !req.body.title) {
				// console.log("verläufst du dich hier rein?");
				return res.send("missing required field title");
			}

			//save the book
			let generatedId = new ObjectId().toString();
			let book = {
				comments: [],
				_id: generatedId,
				title: req.body.title,
				commentcount: 0,
				__v: 0,
			};
			container.push(book);
			//response will contain new book object including atleast _id and title
			res.json({
				_id: generatedId,
				title: req.body.title,
			});
		})

		.delete(function (req, res) {
			//if successful response will be 'complete delete successful'
		});

	app.route("/api/books/:id")
		.get(function (req, res) {
			console.log("get :id route:");
			console.log(req.params.id);
			// console.log(container);
			let bookid = req.params.id;
			//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
			let foundBook;
			foundBook = container.find((book) => book._id === bookid);
			console.log(foundBook);
			if (foundBook === "undefined" || !foundBook) {
				console.log("the book does not exist");
				return res.send("no book exists");
			}

			return res.json(foundBook);
		})

		.post(function (req, res) {
			let bookid = req.params.id;
			let comment = req.body.comment;
			//json res format same as .get
		})

		.delete(function (req, res) {
			let bookid = req.params.id;
			//if successful response will be 'delete successful'
		});
};
