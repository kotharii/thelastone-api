import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'a2c1d48b8896403c9f40757e52208961'
  });

const handleApiCall = (req, res) => {
    app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => {res.status(404).json('unable to work with API')})
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db.select('*').from('users').where({id})
    .increment('entries', 1).returning('entries')
    .then(entries => {
        res.json(entries[0]);   // refer to line 61's comment this has the same explanation.
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

export default { handleApiCall , handleImage };