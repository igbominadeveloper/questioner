import question from '../models/Question';

class QuestionsController {
	static index(request, response){
		let data = question.all();
		return response.json({
			status: 200,
			data
		})
	}

	static show(request, response) {
		if(question){
			delete question.votes;
			delete question.createdOn;
			return response.json({
				status: 200,
				data: question
			});
			return response.json({
				status: 404,
				message: "Question not found"
			})
		}
	}

	static create(request, response) {
		if(request.body.title && request.body.body && request.body.meetup){
			let newQuestion = question.create(request.body);
			if(newQuestion instanceof Object){
				delete newQuestion.createdOn;
				delete newQuestion.votes;
				return response.json({
					status: 201,
					data: newQuestion
				});
				return response.json({
					status: 200,
					data: request.body
				});
			}
		}
		return response.json({
			status: 400,
			error: `Request missing complete payload. Confirm it includes - meetup, title and the body of a question`
		});
	}
}

export default QuestionsController;