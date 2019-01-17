import meetup from '../models/Meetup';

class meetupController {
  static index(request, response) {
    meetup.all()
    .then(result => {
      if(result.rowCount > 0) {
      return response.status(200).json({
        status: 200,
        data: result.rows[0]
      })
      }
      return response.status(404).json({
        status: 404,
        error: 'No Meetups available right now',
      });    
    })
  .catch(error => {
    return response.status(400).json({
      status: 400,
      error: error.message
    })
    })
  }

  static show(request, response) {
    meetup.find(request.params.id)
    .then(result => {
      if(result.rowCount > 0) {
        return response.status(200).json({
          status: 200,
          data: result.rows[0]
        })
      }
      return response.status(404).json({
        status: 404,
        error: `Meetup doesn't exist`,
      });
    })
    .catch(error => {
      return response.status(400).json({
        status: 400,
        error: error.message
      })
    })
  }

  static create(request, response) {
    meetup.create(request.body)
    .then(result => {
      if(result.rowCount > 0){
        const data = Object.assign({}, result);
        return response.status(201).json({
          status: 201,
          data,
        });
      }
      return response.status(500).json({
        status: 500,
        error: 'Meetup creation failed',
      })
    })
    .catch(error => {
      return response.status(400).json({
        status: 400,
        error: error.message,
      })
    })
  }

  static destroyAll(request, response) {
    meetup.deleteAll()
    .then(result => {
      return response.status(204).json({
        status: 204,
        message: 'Meetups Deleted',
      })      
    })
    .catch(error => {
      return response.status(400).json({
        status: 400,
        error: error.message,
      })
    })
  }

  static async upcoming(request, response) {
    try{
      const { rows } = await meetup.upcoming();
      if(rows.length > 0){
        const data = Object.assign({}, rows);
        data.map(row => {
          delete row.images;
          delete row.created_at;
          delete row.updated_at;
        })
        return response.status(200).json({
          status: 200,
          data: [data]
        })
      }
        return helper.checkErrorCode(response, { status: 404, message: `No Upcoming meetups` })
    } catch(error) {
        return helper.checkErrorCode(response, { status: 400, message: `Error occured` })
      }
  }

  static update(request, response) {
    const requestBody = request.body;
    meetup.find(request.params.id)
    .then(result => {
      if(result.rowCount > 0) {
        meetup.update(result, requestBody)
        .then(updated => {
          return response.status(202).json({
            status: 202,
            data: updated
          });
        })
      }
      return response.status(404).json({
        status: 404,
        error: `Meetup doesn't exist`,
      })
    })
    .catch(error => {
      return response.status(400).json({
        status: 400,
        error: error.message,
      })
    })
  }

  static destroy(request, response) {
    meetup.find(request.params.id)
    .then(result => {
      if(result.rowCount > 0) {
        return meetup.delete(result.id)
      }
      return response.status(404).json({
        status: 404,
        error: `Meetup doesn't exist`,
      })     
    })
    .then(deleted => {
      return response.status(204).json({
        status: 204,
        message: `Meetup deleted successfully` 
      })        
    })
    .catch(error => {
     return response.status(400).json({
       status: 400,
       error: error.message,
     })
    })
  }
}

export default meetupController;
