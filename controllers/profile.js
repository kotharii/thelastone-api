
const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id: id})      // since ES6 if the property and the value is same you can even writ just ".where({id})"
        .then(user => {
            if (user.length){   // means the same as if(user.length >= 1)
                res.json(user[0])  // we do the [0] in user[0] so that we dont get the user we want in an array... it returns the user otherwise in an array because we have selected one user from all users object.
            }  
            else {
                res.status(400).json('user not found');
            }
    }) 
    .catch(err => res.status(400).json('error getting user'));
}

export default handleProfile;