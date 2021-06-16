
const handleSignin = (req, res, db, bcrypt)=>{
    const {email, password} = req.body;
        if (!email || !password ){
        return res.status(400).json('incorrect form submission');
        }
            db.select('email' , 'hash').from('login')      //transaction isnt needed here as it is only used when u modify data in 2 different tables..but over here you are just making both the infromation from the tables display.
            .where({
                email: email
            })
            .then(data => {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if (isValid){
                    return db.select('*').from('users').where({
                        email: email
                    })
                    .then(user => {
                        res.json(user[0])
                    })
                .catch(err => res.status(400).json('unable to get user'));
                }
                return res.status(400).json('Wrong credentials entered');
            })
            .catch(err => res.status(400).json('wrong credentials entered'))
}

export default handleSignin;
