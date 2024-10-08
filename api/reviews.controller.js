import ReviewsDAO from "../src/dao/reviewsDao.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = parseInt(req.body.movieId)
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    // Method to get a review by its ID
    static async apiGetReview(req, res, next) {
        try {
            let id = req.params.id || {}
            let review = await ReviewsDAO.getReview(id)
            if (!review) {
                res.status(404).json({ error: "Not found"})
                return
            }
            res.json(review)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    // Method to update a review by its ID
   static async apiUpdateReview(req, res, next) {
    try {
        const reviewId = req.params.id;
        const review = req.body.review;
        const user = req.body.user;

        const reviewResponse = await ReviewsDAO.updateReview(
            reviewId,
            user,
            review
        );

        const { error } = reviewResponse;
        if (error) {
            return res.status(400).json({ error });
        }

        if (reviewResponse.modifiedCount === 0) {
            throw new Error("Unable to update review");
        }

        res.json({ status: "success" });
    } catch (e) {
        // Ensure that headers are not sent multiple times
        if (!res.headersSent) {
            res.status(500).json({ error: e.message });
        }
    }
}


    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiGetReviews(req, res, next){
        try{
            const id = req.params.id || {} // movie id
            const reviews = await ReviewsDAO.getReviewsByMovieId(id)
            if (!reviews){
                res.status(400).json({error: "Not found"})
                return
            }
            res.json(reviews)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
}