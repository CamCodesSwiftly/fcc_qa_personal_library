/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
	/*
	 * ----[EXAMPLE TEST]----
	 * Each test should completely test the response of the API end-point including response status code!
	 */
	test("#example Test GET /api/books", function (done) {
		chai.request(server)
			.get("/api/books")
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isArray(res.body, "response should be an array");
				assert.property(
					res.body[0],
					"commentcount",
					"Books in array should contain commentcount"
				);
				assert.property(
					res.body[0],
					"title",
					"Books in array should contain title"
				);
				assert.property(
					res.body[0],
					"_id",
					"Books in array should contain _id"
				);
				done();
			});
	});
	/*
	 * ----[END of EXAMPLE TEST]----
	 */

	suite("Routing tests", function () {
		suite(
			"POST /api/books with title => create book object/expect book object",
			function () {
				test("Test POST /api/books with title", function (done) {
					chai.request(server)
						.post("/api/books")
						.send({
							title: "Endlich Nichtraucher!",
						}) // Provide the desired query parameters
						.end(function (err, res) {
							assert.equal(err, null); // No error should occur
							assert.equal(res.status, 200);
							// Check for existence of all fields
							assert.property(
								res.body,
								"_id",
								"res.json field _id does not exist"
							);
							assert.property(
								res.body,
								"title",
								"res.json field title does not exist"
							);
							// Check for correct values of title
							assert.equal(
								res.body.title,
								"Endlich Nichtraucher!",
								"req title and res title are not equal"
							);
							// console.log("output object: ");
							// console.log(res.body);
							done();
						});
				});

				test("Test POST /api/books with no title given", function (done) {
					chai.request(server)
						.post("/api/books")
						.send({
							title: "",
						}) // Provide the desired query parameters
						.end(function (err, res) {
							assert.equal(err, null); // No error should occur
							assert.equal(res.status, 200);
							// Check for correct error message
							assert.equal(
								res.text,
								"missing required field title",
								"req title and res title are not equal"
							);
							// console.log("output text: ");
							// console.log(res.text);
							done();
						});
				});
			}
		);

		suite("GET /api/books => array of books", function () {
			test("Test GET /api/books", function (done) {
				chai.request(server)
					.get("/api/books")
					// Provide the desired query parameters
					.end(function (err, res) {
						assert.equal(err, null); // No error should occur
						assert.equal(res.status, 200);
						// Check if response is an array
						assert.isArray(res.body, "no array was returned");

						//TODO: Some useful assertions
						// console.log(res.body);
						done();
					});
			});
		});

		suite("GET /api/books/[id] => book object with [id]", function () {
			test("Test GET /api/books/[id] with id not in db", function (done) {
				chai.request(server)
					.get("/api/books/asdpigowehig14")
					.end(function (err, res) {
						assert.equal(err, null); // No error should occur
						assert.equal(res.status, 200);
						// Check for correct error message
						assert.equal(
							res.text,
							"no book exists",
							"the id does not exist"
						);
						// console.log("output text: ");
						// console.log(res.text);
						done();
					});
			});

			test("Test GET /api/books/[id] with valid id in db", function (done) {
				chai.request(server)
					.get("/api/books/65ef2da40fac29acae53b4c4")
					.end(function (err, res) {
						assert.equal(err, null); // No error should occur
						assert.equal(res.status, 200);
						// Check for existence of title, _id and comments
						assert.property(
							res.body,
							"title",
							"no title field in return object"
						);
						assert.property(
							res.body,
							"_id",
							"no _id field in return object"
						);
						assert.property(
							res.body,
							"comments",
							"no comments field in return object"
						);
						//is comments an array?
						assert.isArray(
							res.body.comments,
							"comments is not an array"
						);
						// console.log(res.body);

						done();
					});
			});
		});

		// suite('POST /api/books/[id] => add comment/expect book object with id', function(){

		//   test('Test POST /api/books/[id] with comment', function(done){
		//     //done();
		//   });

		//   test('Test POST /api/books/[id] without comment field', function(done){
		//     //done();
		//   });

		//   test('Test POST /api/books/[id] with comment, id not in db', function(done){
		//     //done();
		//   });

		// });

		// suite('DELETE /api/books/[id] => delete book object id', function() {

		//   test('Test DELETE /api/books/[id] with valid id in db', function(done){
		//     //done();
		//   });

		//   test('Test DELETE /api/books/[id] with  id not in db', function(done){
		//     //done();
		//   });

		// });
	});
});
