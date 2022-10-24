import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req, res) {
  // Check HTTP request. Accept only POST Method
  if (req.method !== 'POST') {
    return;
  }
  //  Get data from req.body (Client Side) and Destructuring it
  const { name, email, password } = req.body;
  //   Validete data
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({ message: 'Validation error' });
    return;
  }

  await db.connect();
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User already exists.' });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'User created successfully',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default handler;
