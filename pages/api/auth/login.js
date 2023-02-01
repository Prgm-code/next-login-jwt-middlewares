import jwt from 'jsonwebtoken'
import  { serialize } from 'cookie'



export default async function  loginHandler(req, res) {
  console.log(req.body)

  const { username, password } = req.body

   // chek if the username and password are correct

    // if email exist in the database

    //   if password is correct

    //     return success

    //   else
     //    return error

    // else
  if (username === 'test' && password === 'test') {

    // create a token 
    const token = jwt.sign({ 
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      username: username,
      email: 'email@email.email'
    }, 'secret')

    const serialized  = serialize('myTokenName', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production',
      sameSite: 'strict',
      maxAge: 60 * 60,
      path: '/'
    }
    )


    res.setHeader('Set-Cookie', serialized)
    res.status(200).json({ message: 'Logged in!' })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }



 




}
  

