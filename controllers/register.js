const handleRegister = (req, res, db, bcrypt)=>{
    const { name, email, password } = req.body;
    if (!email || !name || !password ){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash, 
            email: email
        })
        .into('login')
        .returning('email')
        .then(LoginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: LoginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)    //specially for the syntax.. it means that when all the things workout like adding the emails, hash to login and adding the name and everything to users table, if all this completely worksout then commit the changes(run and display)
        .catch(trx.rollback) //specially for the syntax.. it means that if even a single thing fail login table or users table then it will completely fail as it is a transaction and it will rollback a step.        
    }) 
    .catch(err => res.status(400).json('unable to register'))
}

export default handleRegister;

// changed from this 👇 to this 👆 as I was getting this error :-
        // {import register from './controllers/register.mjs';
        //        ^^^^^^^^
        // SyntaxError: The requested module './controllers/register.mjs' does not provide an export named 'default'}

// module.exports = {
//     handleRegister: handleRegister 
// };
