import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db("reviews").collection("reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review){
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review,
            }

            return await reviews.insertOne(reviewDoc) // insert a document into the mongodb database
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({ _id: ObjectId(reviewId)}) 
            // id is not the movie id, this id is automatically create after we created the reviewDoc
        } catch (e) {
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, user, review) {
        //console.log("rev", reviewId)
        try {
            const updateResponse = await reviews.updateOne(
                { _id: ObjectId(reviewId)},
                { $set: { user: user, review: review}}
            )
            
            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
            })
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }

    static async getReviewsByMovieId(movieId) {
        //console.log("mov", movieId)
        try {
            // find any items return a cursor
            const cursor = await reviews.find({ 
                movieId: parseInt(movieId) // convert the string to Int
            })
            return cursor.toArray()
        } catch (e) {
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }
}